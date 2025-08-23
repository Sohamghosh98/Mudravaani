# from fastapi import APIRouter, Depends
# from fastapi.responses import StreamingResponse
# from app.auth import get_current_user
# from app.utils import body
# import cv2
# import numpy as np
# import mediapipe as mp
# from tensorflow.keras.models import Sequential
# from tensorflow.keras.layers import LSTM, Dense, Dropout
# import asyncio
# from app.config import MODEL_PATH

# router = APIRouter()

# # MediaPipe setup
# mp_holistic = mp.solutions.holistic
# mp_drawing = mp.solutions.drawing_utils

# # LSTM model setup
# actions = np.array(['hello', 'thanks', 'iloveyou', 'goodbye', 'please', 'sorry'])
# model = Sequential()
# model.add(LSTM(64, return_sequences=True, activation='tanh', input_shape=(30, 1662)))
# model.add(Dropout(0.2))
# model.add(LSTM(128, return_sequences=True, activation='tanh'))
# model.add(Dropout(0.33))
# model.add(LSTM(64, return_sequences=False, activation='tanh'))
# model.add(Dropout(0.2))
# model.add(Dense(64, activation='LeakyReLU'))
# model.add(Dense(32, activation='LeakyReLU'))
# model.add(Dense(actions.shape[0], activation='softmax'))
# model.load_weights(MODEL_PATH)

# # YOLOv5 video globals
# video_camera = None
# global_frame = None
# image, pred_img, original, crop_bg, label = None, None, None, None, None
# body.cap.release()

# # MediaPipe detection
# def mediapipe_detection(image, model):
#     image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
#     image.flags.writeable = False
#     results = model.process(image)
#     image.flags.writeable = True
#     image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
#     return image, results

# # Draw landmarks
# def draw_styled_landmarks(image, results):
#     mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_holistic.POSE_CONNECTIONS,
#                              mp_drawing.DrawingSpec(color=(80,22,10), thickness=2, circle_radius=4),
#                              mp_drawing.DrawingSpec(color=(80,44,121), thickness=2, circle_radius=2))
#     mp_drawing.draw_landmarks(image, results.left_hand_landmarks, mp_holistic.HAND_CONNECTIONS,
#                              mp_drawing.DrawingSpec(color=(121,22,76), thickness=2, circle_radius=4),
#                              mp_drawing.DrawingSpec(color=(121,44,250), thickness=2, circle_radius=2))
#     mp_drawing.draw_landmarks(image, results.right_hand_landmarks, mp_holistic.HAND_CONNECTIONS,
#                              mp_drawing.DrawingSpec(color=(245,117,66), thickness=2, circle_radius=4),
#                              mp_drawing.DrawingSpec(color=(245,66,230), thickness=2, circle_radius=2))

# # Extract keypoints
# def extract_keypoints(results):
#     pose = np.array([[res.x, res.y, res.z, res.visibility] for res in results.pose_landmarks.landmark]).flatten() if results.pose_landmarks else np.zeros(33 * 4)
#     face = np.array([[res.x, res.y, res.z] for res in results.face_landmarks.landmark]).flatten() if results.face_landmarks else np.zeros(468 * 3)
#     lh = np.array([[res.x, res.y, res.z] for res in results.left_hand_landmarks.landmark]).flatten() if results.left_hand_landmarks else np.zeros(21 * 3)
#     rh = np.array([[res.x, res.y, res.z] for res in results.right_hand_landmarks.landmark]).flatten() if results.right_hand_landmarks else np.zeros(21 * 3)
#     return np.concatenate([pose, face, lh, rh])

# # Probability visualization
# colors = [(245,117,16), (117,245,16), (16,117,245), (245,117,16), (117,245,16), (16,117,245)]
# def prob_viz(res, actions, input_frame, colors):
#     output_frame = input_frame.copy()
#     for num, prob in enumerate(res):
#         cv2.rectangle(output_frame, (0,60+num*40), (int(prob*100), 90+num*40), colors[num], -1)
#         cv2.putText(output_frame, actions[num], (0, 85+num*40), cv2.FONT_HERSHEY_SIMPLEX, 1, (255,255,255), 2, cv2.LINE_AA)
#     return output_frame

# # YOLOv5 video streaming
# async def gen_vid():
#     global image, pred_img, original, crop_bg, label
#     while True:
#         try:
#             image, pred_img, original, crop_bg, name = body.collectData()
#             if name:
#                 label = name
#             else:
#                 label = "--"
#             frame = cv2.imencode('.jpg', image)[1].tobytes()
#             if frame:
#                 yield (b'--frame\r\n'
#                        b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
#             await asyncio.sleep(0.033)
#         except Exception as e:
#             print(f"Video stream error: {e}")
#             break

# # LSTM video streaming
# async def generate_frames():
#     sequence, sentence, predictions, threshold = [], [], [], 0.9
#     cap = cv2.VideoCapture(0)
#     cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
#     cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)
    
#     async with mp_holistic.Holistic(min_detection_confidence=0.5, min_tracking_confidence=0.5) as holistic:
#         while cap.isOpened():
#             ret, frame = cap.read()
#             if not ret:
#                 break
#             image, results = mediapipe_detection(frame, holistic)
#             draw_styled_landmarks(image, results)
#             keypoints = extract_keypoints(results)
#             sequence.append(keypoints)
#             sequence = sequence[-30:]
#             if len(sequence) == 30:
#                 res = model.predict(np.expand_dims(sequence, axis=0))[0]
#                 predictions.append(np.argmax(res))
#                 if np.unique(predictions[-10:])[0] == np.argmax(res) and res[np.argmax(res)] > threshold:
#                     current_prediction = actions[np.argmax(res)]
#                     if not sentence or current_prediction != sentence[-1]:
#                         sentence.append(current_prediction)
#                 if len(sentence) > 5:
#                     sentence = sentence[-5:]
#                 image = prob_viz(res, actions, image, colors)
#             cv2.rectangle(image, (0,0), (640, 40), (245, 117, 16), -1)
#             cv2.putText(image, ' '.join(sentence), (3,30), 
#                         cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2, cv2.LINE_AA)
#             ret, buffer = cv2.imencode('.jpg', image)
#             frame = buffer.tobytes()
#             yield (b'--frame\r\n'
#                    b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
#             await asyncio.sleep(0.033)

# @router.get("/label")
# async def label_text():
#     return {"label": label or "--"}

# @router.get("/translate")
# async def translate(current_user: dict = Depends(get_current_user)):
#     body.cap = cv2.VideoCapture(0, cv2.CAP_DSHOW)
#     return {"message": "Translation started"}

# @router.get("/video")
# async def video(current_user: dict = Depends(get_current_user)):
#     return StreamingResponse(gen_vid(), media_type="multipart/x-mixed-replace; boundary=frame")

# @router.get("/lstm_video")
# async def lstm_video(current_user: dict = Depends(get_current_user)):
#     return StreamingResponse(generate_frames(), media_type="multipart/x-mixed-replace; boundary=frame")