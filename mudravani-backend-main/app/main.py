from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth_routes, profile_routes, video_routes
from app.config import FRONTEND_URL  # ✅ imported from config.py

app = FastAPI()

# Allowed origins
origins = [
    FRONTEND_URL,
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(auth_routes.router, prefix="/api/auth")
app.include_router(profile_routes.router, prefix="/api/profile")
# app.include_router(video_routes.router, prefix="/api/video")

@app.get("/")
async def root():
    return {"message": "Welcome to the FastAPI app"}
