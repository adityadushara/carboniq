from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
import uuid
from app import models
from app.database import get_db
from app.auth import get_current_user
from app.schemas import ActivityCreate, ActivityResponse

router = APIRouter(prefix="/api/activities", tags=["Activities"])

@router.post("", response_model=ActivityResponse)
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

@router.get("", response_model=list[ActivityResponse])
def get_activities(request: Request, db: Session = Depends(get_db), user = Depends(get_current_user)):
    user_id = uuid.UUID(user.id)
    activities = db.query(models.CarbonActivity).filter(models.CarbonActivity.user_id == user_id).order_by(models.CarbonActivity.date.desc()).all()
    return activities
