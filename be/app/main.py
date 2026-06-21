from fastapi import FastAPI, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings, logger
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from app.database import get_db, engine
from sqlalchemy.orm import Session
from sqlalchemy import text
from sqlalchemy.exc import OperationalError
from app.auth import get_current_user
from contextlib import asynccontextmanager

# Import routers
from app.routers import activities, goals, community, coach_router, ocr_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    masked_url = engine.url.render_as_string(hide_password=True)
    logger.info(f"Effective DATABASE_URL: {masked_url}")
    host = engine.url.host
    logger.info(f"Database Host: {host}")
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))
            logger.info("Database Connected: True")
    except Exception as e:
        logger.error("Database Connected: False")
        logger.error(f"Error connecting to database: {e}")
    yield

app = FastAPI(title="CARBONIQ API", lifespan=lifespan)

# Configure CORS
origins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://carboniq-one.vercel.app"
]
if settings.frontend_url:
    origins.extend([origin.strip() for origin in settings.frontend_url.split(",")])

app.add_middleware(
    CORSMiddleware,
    allow_origins=list(set(origins)),
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
from app.routers import forecasting
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
