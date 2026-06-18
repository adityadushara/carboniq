from sqlalchemy import Column, Integer, String, Float, DateTime, Boolean, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from database import Base
import uuid
from sqlalchemy.dialects.postgresql import UUID

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String, unique=True, index=True)
    full_name = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    activities = relationship("CarbonActivity", back_populates="user")

class CarbonActivity(Base):
    __tablename__ = "carbon_activities"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    activity_type = Column(String, index=True) # e.g., transport, food, electricity
    description = Column(String)
    emissions_kg = Column(Float)
    date = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="activities")

class Goal(Base):
    __tablename__ = "goals"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    title = Column(String)
    description = Column(String)
    target_value = Column(Float)
    current_value = Column(Float, default=0.0)
    unit = Column(String)
    status = Column(String, default="In Progress") # e.g., "In Progress", "Completed", "At Risk"
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User")

class CommunityPost(Base):
    __tablename__ = "community_posts"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    author_name = Column(String) # Stored for convenience, or we could join User
    content = Column(String)
    likes = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User")
