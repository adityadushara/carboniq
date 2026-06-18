from pydantic_settings import BaseSettings
from pydantic import Field
from typing import List

class Settings(BaseSettings):
    supabase_url: str = Field(..., env="SUPABASE_URL")
    supabase_key: str = Field(..., env="SUPABASE_KEY")
    database_url: str = Field(..., env="DATABASE_URL")
    gemini_api_key: str = Field(..., env="GEMINI_API_KEY")
    frontend_url: str = Field(default="http://localhost:3000", env="FRONTEND_URL")

    class Config:
        env_file = ".env"

settings = Settings()

import logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")
logger = logging.getLogger("carboniq")
