import matplotlib.pyplot as plt
from torchvision import datasets, transforms

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor()
])

dataset = datasets.ImageFolder(
    "dataset/Training",
    transform=transform
)

class_names = dataset.classes

plt.figure(figsize=(12, 8))

for i in range(8):
    image, label = dataset[i]

    image = image.permute(1, 2, 0)

    plt.subplot(2, 4, i + 1)
    plt.imshow(image)
    plt.title(class_names[label])
    plt.axis("off")

plt.tight_layout()

plt.savefig("reports/sample_images.png", dpi=300)
print("Saved to reports/sample_images.png")