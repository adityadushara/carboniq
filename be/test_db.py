import psycopg2
import sys

pooler_url = "postgresql://postgres.vmgkgmzeuzxyuziftnbx:tw0wgGqob7DwmPvI@aws-0-ap-south-1.pooler.supabase.com:6543/postgres"

try:
    conn = psycopg2.connect(pooler_url)
    print("SUCCESS")
    conn.close()
    sys.exit(0)
except Exception as e:
    print(f"FAILED: {e}")
    sys.exit(1)
