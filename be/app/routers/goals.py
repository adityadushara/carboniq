from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
import uuid
from app import models
from app.database import get_db
from app.auth import get_current_user
from app.schemas import GoalCreate, GoalResponse, GoalUpdate

router = APIRouter(prefix="/api/goals", tags=["Goals"])

@router.get("", response_model=list[GoalResponse])
def get_goals(request: Request, db: Session = Depends(get_db), user = Depends(get_current_user)):
    user_id = uuid.UUID(user.id)
    return db.query(models.Goal).filter(models.Goal.user_id == user_id).all()

@router.post("", response_model=GoalResponse)
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

@router.patch("/{goal_id}", response_model=GoalResponse)
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
