from fastapi import APIRouter, HTTPException, Depends
from ..models import UserLogin, UserSignUp, PasswordReset, PasswordChange
from ..db import validate, insert, updatepwd, check, show
from ..config import JWT_SECRET, ALGORITHM
import jwt
from datetime import datetime, timedelta
from ..auth import get_current_user

router = APIRouter()


@router.post("/validate")
async def validate_sign(user: UserLogin):
    user_data = await validate(user.email, user.password)
    if user_data:
        token = jwt.encode(
            {"email": user.email, "exp": datetime.utcnow() + timedelta(hours=1)},
            JWT_SECRET,
            algorithm=ALGORITHM
        )
        userinfo = await show(user.email)
        return {"accept": "success", "userinfo": userinfo, "token": token}
    raise HTTPException(status_code=401, detail="Invalid credentials")


@router.post("/signup")
async def signup(user: UserSignUp):
    if user.name and user.email and user.password and user.disability and user.role and user.gender:
        if await check(user.email):
            raise HTTPException(status_code=409, detail="Email already exists")
        
        # directly insert user without OTP
        if await insert(
            user.name,
            user.email,
            user.password,
            user.disability,
            user.role,
            user.dob,
            user.slink,
            user.glink,
            user.llink,
            user.bio,
            user.gender
        ):
            token = jwt.encode(
                {"email": user.email, "exp": datetime.utcnow() + timedelta(hours=1)},
                JWT_SECRET,
                algorithm=ALGORITHM
            )
            return {"accept": "success", "message": "Account created", "token": token}
        raise HTTPException(status_code=500, detail="Failed to create account")
    
    raise HTTPException(status_code=400, detail="Missing required fields")


@router.post("/forgotpass")
async def forgotpass(data: PasswordReset):
    if await check(data.email):
        # implement your password reset logic (send email, etc.)
        return {"accept": "sent", "message": "Password reset email sent"}
    raise HTTPException(status_code=404, detail="Email not found")


@router.post("/changepass")
async def changepass(data: PasswordChange, current_user: dict = Depends(get_current_user)):
    if await updatepwd(current_user["email"], data.password):
        return {"message": f"Password updated for {current_user['email']}"}
    raise HTTPException(status_code=400, detail="Update failed")


@router.post("/admin-guest-login")
async def admin_guest_login():
    email = "mudravaanithetranslator@gmail.com"
    role = "admin"

    payload = {
        "email": email,
        "role": role,
        "exp": datetime.utcnow() + timedelta(hours=12)  
    }
    token = jwt.encode(payload, JWT_SECRET, algorithm="HS256")

    return {
        "access_token": token,
        "token_type": "bearer",
        "email": email,
        "role": role
    }


@router.post("/logout")
async def logout(current_user: dict = Depends(get_current_user)):
    return {"message": "Successfully logged out"}
