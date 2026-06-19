from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from config import settings, logger

SQLALCHEMY_DATABASE_URL = settings.database_url

# Automatic fix for Supabase IPv4 deprecation on old direct connection strings
if SQLALCHEMY_DATABASE_URL and "db.vmgkgmzeuzxyuziftnbx.supabase.co" in SQLALCHEMY_DATABASE_URL:
    SQLALCHEMY_DATABASE_URL = SQLALCHEMY_DATABASE_URL.replace(
        "db.vmgkgmzeuzxyuziftnbx.supabase.co:5432",
        "aws-0-us-west-1.pooler.supabase.com:6543"
    )
    if "postgres:" in SQLALCHEMY_DATABASE_URL and "postgres.vmgkgmzeuzxyuziftnbx:" not in SQLALCHEMY_DATABASE_URL:
        SQLALCHEMY_DATABASE_URL = SQLALCHEMY_DATABASE_URL.replace(
            "postgresql://postgres:",
            "postgresql://postgres.vmgkgmzeuzxyuziftnbx:"
        )

if SQLALCHEMY_DATABASE_URL and SQLALCHEMY_DATABASE_URL.startswith("postgresql://"):
    SQLALCHEMY_DATABASE_URL = SQLALCHEMY_DATABASE_URL.replace("postgresql://", "postgresql+psycopg2://", 1)

logger.info("Initializing database connection pool...")

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    pool_size=10,
    max_overflow=20,
    pool_pre_ping=True
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
