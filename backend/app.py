from fastapi import FastAPI, UploadFile, File
from PIL import Image
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import io

from predictor import predict

app = FastAPI(title="Brain Tumor Detection API")
app.mount(
    "/gradcam",
    StaticFiles(directory="../reports"),
    name="gradcam"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message": "Brain Tumor Detection API Running"
    }

@app.get("/health")
def health():
    return {
        "status": "OK"
    }

@app.post("/predict")
async def predict_image(file: UploadFile = File(...)):

    image_bytes = await file.read()

    image = Image.open(io.BytesIO(image_bytes))

    result = predict(image)

    return result