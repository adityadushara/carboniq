from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
import uuid
import models
from database import get_db
from auth import get_current_user

router = APIRouter(prefix="/api/forecasting", tags=["Forecasting"])

@router.get("")
def get_forecast(request: Request, db: Session = Depends(get_db), user = Depends(get_current_user)):
    user_id = uuid.UUID(user.id)
    # Get user's activities
    activities = db.query(models.CarbonActivity).filter(models.CarbonActivity.user_id == user_id).all()
    
    # Simple linear regression or rolling average mock for forecasting
    total_emissions = sum(a.emissions_kg for a in activities)
    count = len(activities)
    avg_per_activity = total_emissions / count if count > 0 else 10.0
    
    # Assuming 30 activities a month on average
    projected_next_month = avg_per_activity * 30
    
    return {
        "current_total": total_emissions,
        "projected_next_month": projected_next_month,
        "trend": "down" if projected_next_month < (total_emissions / max(1, count/30)) else "up"
    }
