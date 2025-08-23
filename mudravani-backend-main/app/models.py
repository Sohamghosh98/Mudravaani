from pydantic import BaseModel, EmailStr
from typing import Optional

# ✅ For login
class UserLogin(BaseModel):
    email: EmailStr
    password: str


# ✅ For signup
class UserSignUp(BaseModel):
    name: str
    email: EmailStr
    password: str
    disability: str
    role: str
    gender: str
    dob: Optional[str] = None
    slink: Optional[str] = "https://www.facebook.com/"
    llink: Optional[str] = "https://www.linkedin.com/"
    glink: Optional[str] = "https://www.github.com/"
    bio: Optional[str] = ""


# ✅ For OTP verification during signup
class UserOTP(UserSignUp):
    otp: str


# ✅ For updating profile
class UserUpdate(BaseModel):
    name: Optional[str] = None
    role: Optional[str] = None
    disability: Optional[str] = None
    dob: Optional[str] = None
    bio: Optional[str] = None
    slink: Optional[str] = None
    llink: Optional[str] = None
    glink: Optional[str] = None
    gender: Optional[str] = None


# ✅ For requesting password reset (send email)
class PasswordReset(BaseModel):
    email: EmailStr


# ✅ For setting a new password
class PasswordChange(BaseModel):
    password: str
