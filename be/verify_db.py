from database import engine
from sqlalchemy import text
from sqlalchemy.exc import OperationalError

try:
    with engine.connect() as conn:
        result = conn.execute(text('SELECT 1')).scalar()
        print('Connection successful:', result)
except OperationalError as e:
    print('Connection failed:', e)
