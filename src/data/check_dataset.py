from pathlib import Path

train_path = Path("dataset/Training")
test_path = Path("dataset/Testing")

print("=" * 40)
print("TRAINING DATA")
print("=" * 40)

for folder in sorted(train_path.iterdir()):
    if folder.is_dir():
        print(f"{folder.name:<15} : {len(list(folder.glob('*')))} images")

print("\n" + "=" * 40)
print("TESTING DATA")
print("=" * 40)

for folder in sorted(test_path.iterdir()):
    if folder.is_dir():
        print(f"{folder.name:<15} : {len(list(folder.glob('*')))} images")