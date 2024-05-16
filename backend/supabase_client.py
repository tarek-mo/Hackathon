# supabase_client.py
import os
from dotenv import load_dotenv
from supabase import create_client, Client

# Load environment variables from .env.local
load_dotenv(dotenv_path='.env.local')

# Get Supabase URL and API key from environment variables
url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_ANON")

# Initialize the Supabase client
supabase: Client = create_client(url, key)
