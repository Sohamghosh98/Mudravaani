import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import bcrypt
from datetime import datetime
from typing import Optional

# --- Load environment variables ---
load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
MONGO_DB = os.getenv("MONGO_DB", "login_info")
MONGO_COLLECTION = os.getenv("MONGO_COLLECTION", "login0")

# --- MongoDB connection ---
try:
    print(f"Connecting to MongoDB with URI: {MONGO_URI}")
    client = AsyncIOMotorClient(MONGO_URI)
    db = client.get_database("mudravaani")   # ✅ use your db name
    users_col = db["login0"]
    print("✅ MongoDB connection established")
except Exception as e:
    print(f"❌ MongoDB connection error: {e}")
    raise


# --- User validation (Login) ---
async def validate(email: str, password: str):
    try:
        if not email or not password:
            print("Validation error: Missing email or password")
            return None

        user = await users_col.find_one({"email": email})
        if not user:
            print(f"Validation failed: User not found ({email})")
            return None

        stored_hash = user.get("password", "")
        if not stored_hash:
            print(f"Validation failed: No password stored for {email}")
            return None

        if bcrypt.checkpw(password.encode("utf-8"), stored_hash.encode("utf-8")):
            print(f"Validation success for {email}")
            return user
        else:
            print(f"Validation failed: Incorrect password for {email}")
            return None

    except Exception as e:
        print(f"Validation error: {e}")
        return None


# --- Insert new user (Signup) ---
async def insert(
    name: str,
    email: str,
    password: str,
    disability: str,
    role: str,
    dob: str,
    slink: str,
    glink: str,
    llink: str,
    bio: str,
    gender: str
):
    try:
        if not all([name, email, password, disability, role, gender]):
            print(f"Insert error: Missing required fields for {email}")
            return False

        if dob:
            try:
                datetime.strptime(dob, "%Y-%m-%d")
            except ValueError:
                print(f"Insert error: Invalid dob format {dob}, expected YYYY-MM-DD")
                return False

        if await check(email):
            print(f"Insert error: Email {email} already exists")
            return False

        hashed_password = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())

        query = {
            "name": name,
            "email": email,
            "password": hashed_password.decode("utf-8"),
            "disability": disability,
            "role": role,
            "dob": dob or "",
            "slink": slink or "https://www.facebook.com/",
            "glink": glink or "https://www.github.com/",
            "llink": llink or "https://www.linkedin.com/",
            "bio": bio or "",
            "gender": gender or "",
        }

        await users_col.insert_one(query)
        print(f"✅ User {email} inserted successfully")
        return True

    except Exception as e:
        print(f"Insert error: {e}")
        return False


# --- Check if user exists ---
async def check(email: str):
    try:
        if not email:
            return False
        data = await users_col.find_one({"email": email})
        return bool(data)
    except Exception as e:
        print(f"Check error: {e}")
        return False


# --- Update user profile ---
async def update(
    name: str,
    email: str,
    disability: str,
    role: str,
    dob: Optional[str],
    slink: Optional[str],
    llink: Optional[str],
    glink: Optional[str],
    bio: Optional[str],
    gender: Optional[str]
):
    try:
        if not email or not await check(email):
            print(f"Update error: Invalid email or user not found ({email})")
            return False

        if dob:
            try:
                datetime.strptime(dob, "%Y-%m-%d")
            except ValueError:
                print(f"Update error: Invalid dob format {dob}, expected YYYY-MM-DD")
                return False

        update_data = {
            "name": name,
            "disability": disability,
            "role": role,
            "dob": dob,
            "slink": slink,
            "llink": llink,
            "glink": glink,
            "bio": bio,
            "gender": gender
        }

        update_data = {k: v for k, v in update_data.items() if v is not None}

        result = await users_col.update_one({"email": email}, {"$set": update_data})

        if result.modified_count == 0:
            print(f"Update warning: No fields changed for {email}")
            return False

        print(f"✅ User {email} updated successfully")
        return True

    except Exception as e:
        print(f"Update error: {e}")
        return False


# --- Update password ---
async def updatepwd(email: str, password: str):
    try:
        if not email or not password:
            print("Update password error: Missing email or password")
            return False

        if not await check(email):
            print(f"Update password error: User not found ({email})")
            return False

        hashed_password = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())

        result = await users_col.update_one(
            {"email": email},
            {"$set": {"password": hashed_password.decode("utf-8")}}
        )

        if result.modified_count == 0:
            print(f"Update password warning: No changes made for {email}")
            return False

        print(f"✅ Password updated successfully for {email}")
        return True

    except Exception as e:
        print(f"Update password error: {e}")
        return False


# --- Show user info (excluding password) ---
async def show(email: str):
    try:
        if not email:
            return False
        data = await users_col.find_one({"email": email}, {"_id": 0, "password": 0})
        if not data:
            print(f"Show error: No user found for {email}")
            return False
        return data
    except Exception as e:
        print(f"Show error: {e}")
        return False
