
import streamlit as st
from PIL import Image

st.set_page_config(
    page_title="BrainTumorAI",
    page_icon="🧠",
    layout="centered"
)

st.title("🧠 BrainTumorAI")
st.write("AI-powered brain MRI image classification")

st.warning(
    "This tool is for educational purposes only "
    "and cannot provide a medical diagnosis."
)

uploaded_file = st.file_uploader(
    "Upload a brain MRI image",
    type=["png", "jpg", "jpeg"]
)

if uploaded_file:
    image = Image.open(uploaded_file).convert("RGB")
    st.image(image, caption="Uploaded MRI", width=400)

    if st.button("Analyze MRI", type="primary"):
        st.info(
            "Image uploaded successfully. "
            "Connect your existing prediction function here."
        )
