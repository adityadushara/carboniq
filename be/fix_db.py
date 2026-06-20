import psycopg2

db_url = "postgresql://postgres:watercooler%40123@db.vmgkgmzeuzxyuziftnbx.supabase.co:5432/postgres"

conn = psycopg2.connect(db_url)
conn.autocommit = True
cur = conn.cursor()

columns_to_add = [
    "ALTER TABLE community_posts ADD COLUMN IF NOT EXISTS author_name VARCHAR;",
    "ALTER TABLE community_posts ADD COLUMN IF NOT EXISTS content VARCHAR;",
    "ALTER TABLE community_posts ADD COLUMN IF NOT EXISTS likes INTEGER DEFAULT 0;",
]

for q in columns_to_add:
    try:
        cur.execute(q)
        print(f"Success: {q}")
    except Exception as e:
        print(f"Error on {q}: {e}")

cur.close()
conn.close()
