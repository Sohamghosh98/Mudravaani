from fastapi import APIRouter, Depends, HTTPException
from ..models import UserUpdate
from ..db import update, show
from ..auth import get_current_user

router = APIRouter()

@router.post("/update")
async def update_profile(data: UserUpdate, current_user: dict = Depends(get_current_user)):
    if await update(data.name, current_user["email"], data.disability, data.role, data.dob, data.slink, data.llink, data.glink, data.bio, data.gender):
        userinfo = await show(current_user["email"])
        return {"userinfo": userinfo, "message": "Profile updated"}
    raise HTTPException(status_code=400, detail="Update failed")

@router.get("/profile")
async def profile(current_user: dict = Depends(get_current_user)):
    userinfo = await show(current_user["email"])
    if userinfo:
        return userinfo
    raise HTTPException(status_code=404, detail="User not found")