import torch
import torch.nn as nn
from torchvision import datasets, transforms, models
from torch.utils.data import DataLoader
from sklearn.metrics import classification_report, confusion_matrix
import matplotlib.pyplot as plt
import numpy as np
from pathlib import Path

# Device
device = torch.device("mps" if torch.backends.mps.is_available() else "cpu")

# Transform
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        [0.485,0.456,0.406],
        [0.229,0.224,0.225]
    )
])

# Dataset
test_dataset = datasets.ImageFolder(
    "dataset/Testing",
    transform=transform
)

test_loader = DataLoader(
    test_dataset,
    batch_size=32,
    shuffle=False,
    num_workers=0
)

# Model
weights = models.ResNet50_Weights.DEFAULT
model = models.resnet50(weights=None)
model.fc = nn.Linear(model.fc.in_features, 4)

model.load_state_dict(torch.load(
    "saved_models/best_model.pth",
    map_location=device
))

model.to(device)
model.eval()

y_true = []
y_pred = []

with torch.no_grad():

    for images, labels in test_loader:

        images = images.to(device)

        outputs = model(images)

        _, predicted = torch.max(outputs,1)

        y_true.extend(labels.numpy())
        y_pred.extend(predicted.cpu().numpy())

print(classification_report(
    y_true,
    y_pred,
    target_names=test_dataset.classes
))

cm = confusion_matrix(y_true, y_pred)

plt.figure(figsize=(8,6))
plt.imshow(cm,cmap="Blues")

plt.xticks(np.arange(4),test_dataset.classes,rotation=45)
plt.yticks(np.arange(4),test_dataset.classes)

plt.xlabel("Predicted")
plt.ylabel("Actual")
plt.title("Confusion Matrix")

for i in range(4):
    for j in range(4):
        plt.text(j,i,str(cm[i,j]),ha="center",va="center")

Path("reports").mkdir(exist_ok=True)

plt.tight_layout()
plt.savefig("reports/confusion_matrix.png")

print("Confusion matrix saved!")