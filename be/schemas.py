from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from uuid import UUID

class ActivityCreate(BaseModel):
    activity_type: str
    description: str
    emissions_kg: float = Field(ge=0, description="Emissions must be non-negative")

class ActivityResponse(BaseModel):
    id: UUID
    user_id: UUID
    activity_type: str
    description: str
    emissions_kg: float
    date: datetime

    class Config:
        from_attributes = True

class GoalCreate(BaseModel):
    title: str
    description: str
    target_value: float = Field(ge=0)
    unit: str

class GoalResponse(BaseModel):
    id: UUID
    user_id: UUID
    title: str
    description: str
    target_value: float
    current_value: float
    unit: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True

class GoalUpdate(BaseModel):
    current_value: float = Field(ge=0)

class CommunityPostCreate(BaseModel):
    content: str
    author_name: str

class CommunityPostResponse(BaseModel):
    id: UUID
    user_id: UUID
    author_name: str
    content: str
    likes: int
    created_at: datetime

    class Config:
        from_attributes = True
