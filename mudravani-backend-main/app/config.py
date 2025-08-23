import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# --- Database ---
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/mudravaani")

# --- Security ---
JWT_SECRET = os.getenv("JWT_SECRET", "fallback-secret-key")
ALGORITHM = os.getenv("ALGORITHM", "HS256")

# --- Model (optional AI model path, default empty) ---
MODEL_PATH = os.getenv("MODEL_PATH", "")

# --- Email ---
EMAIL_SENDER = os.getenv("EMAIL_SENDER", "noreply@example.com")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD", "")

# --- Google OAuth ---
GOOGLE_OAUTH_CLIENT_ID = os.getenv("GOOGLE_OAUTH_CLIENT_ID", "")
GOOGLE_OAUTH_CLIENT_SECRET = os.getenv("GOOGLE_OAUTH_CLIENT_SECRET", "")
GOOGLE_REDIRECT_URI = os.getenv("GOOGLE_REDIRECT_URI", "http://localhost:5000/api/auth/google/callback")

# --- Frontend ---
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")
