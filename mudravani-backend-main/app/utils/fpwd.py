from email.message import EmailMessage
import smtplib
import random
import os
from dotenv import load_dotenv
import jwt
from datetime import datetime, timedelta
from ..config import EMAIL_SENDER, EMAIL_PASSWORD, JWT_SECRET

load_dotenv()

sender = EMAIL_SENDER
pwd = EMAIL_PASSWORD
jwt_secret = JWT_SECRET
receiver = ""
otp = ""

def sendmail(email):
    global receiver
    receiver = email
    reset_token = jwt.encode(
        {"email": email, "exp": datetime.utcnow() + timedelta(minutes=30)},
        jwt_secret,
        algorithm="HS256"
    )
    reset_url = f"http://localhost:5173/reset-password?token={reset_token}"
    subject = "Password Reset Request"
    msg = f"Hello, \n\nPlease click the link to reset your password: {reset_url}\n\nThank You,\nTeam MudraVaani"
    
    message = EmailMessage()
    message['From'] = sender
    message['To'] = receiver
    message['Subject'] = subject
    message.set_content(msg)
    
    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.ehlo()
        server.starttls()
        server.login(sender, pwd)
        server.sendmail(sender, receiver, message.as_string())
        return True
    except Exception as e:
        print(f"Email error: {e}")
        return False
    finally:
        server.quit()

def otp(email):
    global receiver, otp_value
    receiver = email
    otp_value = str(random.randint(100000, 999999))
    
    subject = "OTP for Account Creation"
    msg = f"Hello, \n\nYour OTP is {otp_value}.\n\nThank You,\nTeam MudraVaani"
    
    message = EmailMessage()
    message['From'] = sender
    message['To'] = receiver
    message['Subject'] = subject
    message.set_content(msg)
    
    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.ehlo()
        server.starttls()
        server.login(sender, pwd)
        server.sendmail(sender, receiver, message.as_string())
        print(f"OTP {otp_value} sent to {receiver}")
        return True
    except Exception as e:
        print(f"OTP error: {e}")
        return False
    finally:
        server.quit()
        
def get_otp():
    return otp_value