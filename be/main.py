from fastapi import FastAPI, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from config import settings, logger
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from database import get_db
from sqlalchemy.orm import Session
from sqlalchemy import text
from auth import get_current_user

# Import routers
from routers import activities, goals, community, coach_router, ocr_router

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

app.include_router(activities.router)
app.include_router(goals.router)
app.include_router(community.router)
app.include_router(coach_router.router)
app.include_router(ocr_router.router)
from routers import forecasting
app.include_router(forecasting.router)

@app.get("/")
def read_root(request: Request):
    logger.info("Root endpoint accessed")
    return {"message": "Welcome to CARBONIQ API"}

@app.get("/health")
def health_check(db: Session = Depends(get_db)):
    try:
        db.execute(text("SELECT 1"))
        return {"status": "ok", "database": "connected"}
    except Exception as e:
        return {"status": "error", "database": str(e)}

@app.get("/me")
def get_me(user = Depends(get_current_user)):
    return {"user": user}
