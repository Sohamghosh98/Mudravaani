from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import jwt
from .config import JWT_SECRET, ALGORITHM
from .db import users_col

security = HTTPBearer()

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[ALGORITHM])
        email = payload.get("email")
        
        if not email:
            raise HTTPException(status_code=401, detail="Invalid Token")
        
        user = await users_col.find_one({"email":email},{"_id":0})
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        return user
    
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired already")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid Token")