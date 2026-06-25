import os
import uuid
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from supabase import create_client, Client
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session
from app.database import get_db
from app import models

security = HTTPBearer()

from app.config import settings
url: str = settings.supabase_url
key: str = settings.supabase_key
supabase: Client = create_client(url, key)

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security), db: Session = Depends(get_db)):
    token = credentials.credentials
    try:
        user_response = supabase.auth.get_user(token)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(e),
            headers={"WWW-Authenticate": "Bearer"},
        )

    if not user_response.user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

    try:
        # Synchronize user to local DB
        user_id = uuid.UUID(user_response.user.id)
        db_user = db.query(models.User).filter(models.User.id == user_id).first()
        if not db_user:
            db_user = models.User(id=user_id, email=user_response.user.email)
            db.add(db_user)
            db.commit()
    except (ValueError, SQLAlchemyError) as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=f"User database is unavailable: {e}",
        )

    return user_response.user
