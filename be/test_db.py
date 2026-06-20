import psycopg2
import sys
from config import settings

pooler_url = settings.database_url
if pooler_url and pooler_url.startswith("postgresql+psycopg2://"):
    pooler_url = pooler_url.replace("postgresql+psycopg2://", "postgresql://", 1)

try:
    conn = psycopg2.connect(pooler_url)
    print("SUCCESS")
    conn.close()
    sys.exit(0)
except Exception as e:
    print(f"FAILED: {e}")
    sys.exit(1)
