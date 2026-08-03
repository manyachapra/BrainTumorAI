import torch
import torch.nn as nn
import numpy as np
import cv2
from PIL import Image
from pathlib import Path

from torchvision import models, transforms

from pytorch_grad_cam import GradCAM
from pytorch_grad_cam.utils.image import show_cam_on_image

# -----------------------------
# Device
# -----------------------------
device = torch.device("mps" if torch.backends.mps.is_available() else "cpu")

# -----------------------------
# Load Model
# -----------------------------
model = models.resnet50(weights=None)

model.fc = nn.Linear(
    model.fc.in_features,
    4
)

model.load_state_dict(
    torch.load(
        "saved_models/best_model.pth",
        map_location=device
    )
)

model.to(device)
model.eval()

target_layers = [model.layer4[-1]]

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        [0.485, 0.456, 0.406],
        [0.229, 0.224, 0.225]
    )
])

image_path = "sample_images/image.png"

original_image = Image.open(image_path).convert("RGB")

input_tensor = transform(original_image).unsqueeze(0).to(device)

# -----------------------------
# Predict Class
# -----------------------------
with torch.no_grad():
    output = model(input_tensor)

    probabilities = torch.softmax(output, dim=1)

    confidence, predicted_class = torch.max(probabilities, dim=1)

predicted_class = predicted_class.item()
confidence = confidence.item()

class_names = [
    "Glioma",
    "Meningioma",
    "No Tumor",
    "Pituitary"
]

print(f"Prediction : {class_names[predicted_class]}")
print(f"Confidence : {confidence * 100:.2f}%")

# -----------------------------
# Grad-CAM
# -----------------------------
cam = GradCAM(
    model=model,
    target_layers=target_layers
)

grayscale_cam = cam(
    input_tensor=input_tensor
)[0]

# -----------------------------
# Convert Original Image
# -----------------------------
display_image = original_image.resize((224,224))

rgb_image = np.array(display_image).astype(np.float32) / 255.0

visualization = show_cam_on_image(
    rgb_image,
    grayscale_cam,
    use_rgb=True
)

# -----------------------------
# Save Result
# -----------------------------
Path("reports").mkdir(exist_ok=True)

output_path = f"reports/{class_names[predicted_class]}_gradcam.png"

Image.fromarray(visualization).save(output_path)

print(f"Grad-CAM saved to: {output_path}")



