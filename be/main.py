from fastapi import FastAPI, Depends, HTTPException, status, UploadFile, File, Request
from fastapi.middleware.cors import CORSMiddleware
import bleach
from config import settings, logger
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
import models
from database import engine, get_db
from sqlalchemy.orm import Session
from auth import get_current_user
from ocr import analyze_receipt
from coach import ChatRequest, generate_coach_response

# Create tables via Alembic, skipping models.Base.metadata.create_all for prod safety

app = FastAPI(title="CARBONIQ API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.strip() for origin in settings.frontend_url.split(",")],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

@app.get("/")
def read_root(request: Request):
    logger.info("Root endpoint accessed")
    return {"message": "Welcome to CARBONIQ API"}

@app.get("/health")
def health_check(db: Session = Depends(get_db)):
    try:
        # Simple query to ensure DB connection is working
        db.execute("SELECT 1")
        return {"status": "ok", "database": "connected"}
    except Exception as e:
        return {"status": "error", "database": str(e)}

@app.get("/me")
def get_me(user = Depends(get_current_user)):
    return {"user": user}

@app.post("/api/ocr/scan")
@limiter.limit("5/minute")
def scan_receipt(request: Request, file: UploadFile = File(...), user = Depends(get_current_user)):
    # This route is now protected
    contents = file.file.read()
    result = analyze_receipt(contents, file.content_type)
    
    if not result:
        raise HTTPException(status_code=400, detail="Could not extract data from the image")
        
    return result

@app.post("/api/coach/chat")
@limiter.limit("5/minute")
def coach_chat(request: Request, body: ChatRequest, user = Depends(get_current_user)):
    response_text = generate_coach_response(body)
    return {"response": response_text}

from schemas import ActivityCreate, ActivityResponse, GoalCreate, GoalResponse, GoalUpdate, CommunityPostCreate, CommunityPostResponse
import uuid

@app.post("/api/activities", response_model=ActivityResponse)
@limiter.limit("60/minute")
def create_activity(request: Request, activity: ActivityCreate, db: Session = Depends(get_db), user = Depends(get_current_user)):
    user_id = uuid.UUID(user.id)

    db_activity = models.CarbonActivity(
        user_id=user_id,
        activity_type=activity.activity_type,
        description=activity.description,
        emissions_kg=activity.emissions_kg
    )
    db.add(db_activity)
    db.commit()
    db.refresh(db_activity)
    return db_activity

@app.get("/api/activities", response_model=list[ActivityResponse])
@limiter.limit("60/minute")
def get_activities(request: Request, db: Session = Depends(get_db), user = Depends(get_current_user)):
    user_id = uuid.UUID(user.id)
    activities = db.query(models.CarbonActivity).filter(models.CarbonActivity.user_id == user_id).order_by(models.CarbonActivity.date.desc()).all()
    return activities

@app.get("/api/goals", response_model=list[GoalResponse])
@limiter.limit("60/minute")
def get_goals(request: Request, db: Session = Depends(get_db), user = Depends(get_current_user)):
    user_id = uuid.UUID(user.id)
    return db.query(models.Goal).filter(models.Goal.user_id == user_id).all()

@app.post("/api/goals", response_model=GoalResponse)
@limiter.limit("60/minute")
def create_goal(request: Request, goal: GoalCreate, db: Session = Depends(get_db), user = Depends(get_current_user)):
    user_id = uuid.UUID(user.id)
    db_goal = models.Goal(
        user_id=user_id,
        title=goal.title,
        description=goal.description,
        target_value=goal.target_value,
        unit=goal.unit
    )
    db.add(db_goal)
    db.commit()
    db.refresh(db_goal)
    return db_goal

@app.patch("/api/goals/{goal_id}", response_model=GoalResponse)
@limiter.limit("60/minute")
def update_goal(request: Request, goal_id: uuid.UUID, goal: GoalUpdate, db: Session = Depends(get_db), user = Depends(get_current_user)):
    user_id = uuid.UUID(user.id)
    db_goal = db.query(models.Goal).filter(models.Goal.id == goal_id, models.Goal.user_id == user_id).first()
    if not db_goal:
        raise HTTPException(status_code=404, detail="Goal not found")
    
    db_goal.current_value = goal.current_value
    if db_goal.current_value >= db_goal.target_value:
        db_goal.status = "Completed"
    db.commit()
    db.refresh(db_goal)
    return db_goal

@app.get("/api/community", response_model=list[CommunityPostResponse])
@limiter.limit("60/minute")
def get_community_posts(request: Request, db: Session = Depends(get_db), user = Depends(get_current_user)):
    return db.query(models.CommunityPost).order_by(models.CommunityPost.created_at.desc()).all()

@app.post("/api/community", response_model=CommunityPostResponse)
@limiter.limit("60/minute")
def create_community_post(request: Request, post: CommunityPostCreate, db: Session = Depends(get_db), user = Depends(get_current_user)):
    user_id = uuid.UUID(user.id)
    clean_content = bleach.clean(post.content)
    db_post = models.CommunityPost(
        user_id=user_id,
        content=clean_content,
        author_name=post.author_name
    )
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post

@app.post("/api/community/{post_id}/like")
@limiter.limit("60/minute")
def like_community_post(request: Request, post_id: uuid.UUID, db: Session = Depends(get_db), user = Depends(get_current_user)):
    db_post = db.query(models.CommunityPost).filter(models.CommunityPost.id == post_id).first()
    if not db_post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    db_post.likes += 1
    db.commit()
    db.refresh(db_post)
    return {"likes": db_post.likes}
