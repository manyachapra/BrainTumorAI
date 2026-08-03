import torch
import torch.nn as nn
import torch.optim as optim
from torchvision import datasets, transforms, models
from torch.utils.data import DataLoader
from pathlib import Path
from tqdm import tqdm

Path("saved_models").mkdir(exist_ok=True)

# -----------------------------
# Device Configuration
# -----------------------------
device = torch.device("mps" if torch.backends.mps.is_available() else "cpu")
print(f"Using Device: {device}")

# -----------------------------
# Image Transforms
# -----------------------------
train_transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.RandomHorizontalFlip(),
    transforms.RandomRotation(10),
    transforms.ToTensor(),
    transforms.Normalize(
        [0.485, 0.456, 0.406],
        [0.229, 0.224, 0.225]
    )
])

test_transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        [0.485, 0.456, 0.406],
        [0.229, 0.224, 0.225]
    )
])

# -----------------------------
# Dataset
# -----------------------------
train_dataset = datasets.ImageFolder(
    "dataset/Training",
    transform=train_transform
)

test_dataset = datasets.ImageFolder(
    "dataset/Testing",
    transform=test_transform
)

train_loader = DataLoader(
    train_dataset,
    batch_size=32,
    shuffle=True
)

test_loader = DataLoader(
    test_dataset,
    batch_size=32,
    shuffle=False
)

train_loader = DataLoader(
    train_dataset,
    batch_size=32,
    shuffle=True,
    num_workers=0
)

test_loader = DataLoader(
    test_dataset,
    batch_size=32,
    shuffle=False,
    num_workers=0
)

print("Classes:", train_dataset.classes)

# -----------------------------
# Load ResNet50
# -----------------------------
weights = models.ResNet50_Weights.DEFAULT
model = models.resnet50(weights=weights)

# Freeze pretrained layers
# Freeze everything
for param in model.parameters():
    param.requires_grad = False

# Unfreeze the last residual block
for param in model.layer4.parameters():
    param.requires_grad = True

# Unfreeze the classifier
for param in model.fc.parameters():
    param.requires_grad = True

# Replace last layer
model.fc = nn.Linear(model.fc.in_features, 4)

model = model.to(device)

print(model.fc)

# -----------------------------
# Loss & Optimizer
# -----------------------------
criterion = nn.CrossEntropyLoss()

optimizer = optim.Adam(
    filter(lambda p: p.requires_grad, model.parameters()),
    lr=1e-4
)

print("Model Ready!")

# -----------------------------
# Training Loop
# -----------------------------
num_epochs = 10

best_accuracy = 0

for epoch in range(num_epochs):

    # Training Mode
    model.train()

    running_loss = 0
    correct = 0
    total = 0

    for images, labels in tqdm(train_loader, desc=f"Epoch {epoch+1}/{num_epochs}"):

        images = images.to(device)
        labels = labels.to(device)

        # Clear old gradients
        optimizer.zero_grad()

        # Forward pass
        outputs = model(images)

        # Calculate loss
        loss = criterion(outputs, labels)

        # Backpropagation
        loss.backward()

        # Update weights
        optimizer.step()

        running_loss += loss.item()

        _, predicted = torch.max(outputs, 1)

        total += labels.size(0)
        correct += (predicted == labels).sum().item()

    train_accuracy = 100 * correct / total
    epoch_loss = running_loss / len(train_loader)

    # -----------------------------
    # Validation
    # -----------------------------
    model.eval()

    correct = 0
    total = 0

    with torch.no_grad():

        for images, labels in test_loader:

            images = images.to(device)
            labels = labels.to(device)

            outputs = model(images)

            _, predicted = torch.max(outputs, 1)

            total += labels.size(0)

            correct += (predicted == labels).sum().item()

    test_accuracy = 100 * correct / total

    print(
      f"Epoch [{epoch+1}/{num_epochs}] "
      f"Loss: {epoch_loss:.4f} "
      f"Train Acc: {train_accuracy:.2f}% "
      f"Test Acc: {test_accuracy:.2f}%"
   )

    # Save Best Model
    if test_accuracy > best_accuracy:

        best_accuracy = test_accuracy

        torch.save(
            model.state_dict(),
            "saved_models/best_model.pth"
        )

        print("✅ Best model saved!")