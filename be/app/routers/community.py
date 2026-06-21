from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
import uuid
import bleach
import models
from database import get_db
from auth import get_current_user
from schemas import CommunityPostCreate, CommunityPostResponse

router = APIRouter(prefix="/api/community", tags=["Community"])

@router.get("", response_model=list[CommunityPostResponse])
def get_community_posts(request: Request, db: Session = Depends(get_db), user = Depends(get_current_user)):
    return db.query(models.CommunityPost).order_by(models.CommunityPost.created_at.desc()).all()

@router.post("", response_model=CommunityPostResponse)
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

@router.post("/{post_id}/like")
def like_community_post(request: Request, post_id: uuid.UUID, db: Session = Depends(get_db), user = Depends(get_current_user)):
    db_post = db.query(models.CommunityPost).filter(models.CommunityPost.id == post_id).first()
    if not db_post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    db_post.likes += 1
    db.commit()
    db.refresh(db_post)
    return {"likes": db_post.likes}
