import { useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import UploadCard from "./components/UploadCard";
import ImagePreview from "./components/ImagePreview";
import PredictionCard from "./components/PredictionCard";
import ConfidenceBar from "./components/ConfidenceBar";
import LoadingSpinner from "./components/LoadingSpinner";

const API_URL = "http://127.0.0.1:8000/predict";
const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

function App() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileSelect = (file) => {
    setError(null);
    setResult(null);

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Please upload a valid image file (PNG, JPG, or WebP).");
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handlePredict = async () => {
    if (!image) {
      setError("Please select an MRI image first.");
      return;
    }

    setError(null);
    setLoading(true);

    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = await axios.post(API_URL, formData);
      setResult(response.data);
    } catch (err) {
      if (err.response) {
        setError("Prediction failed. The server returned an error.");
      } else if (err.request) {
        setError(
          "Could not connect to the server. Make sure the backend is running on port 8000."
        );
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050a18]">
      <Navbar />

      {loading && <LoadingSpinner />}

      {/* Hero Section */}
      <div className="pt-24 pb-8 text-center px-4">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
          Brain Tumor{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">
            Detection
          </span>
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Upload an MRI scan and our deep learning model will classify it with
          high accuracy using ResNet50 architecture.
        </p>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Column — Upload */}
          <div className="space-y-6">
            <div className="bg-slate-800/40 backdrop-blur-sm rounded-3xl border border-slate-700/50 p-6 sm:p-8 shadow-xl shadow-black/10">
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-cyan-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Upload MRI Scan
              </h3>

              <UploadCard
                onFileSelect={handleFileSelect}
                fileName={image?.name}
              />

              {/* Error Message */}
              {error && (
                <div className="mt-4 flex items-start gap-3 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm animate-fade-in-up">
                  <svg
                    className="w-5 h-5 shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p>{error}</p>
                </div>
              )}

              {/* Predict Button */}
              <button
                id="predict-button"
                onClick={handlePredict}
                disabled={!image || loading}
                className={`
                  mt-6 w-full py-3.5 rounded-xl text-sm font-semibold tracking-wide uppercase
                  transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer
                  ${
                    image && !loading
                      ? "bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98]"
                      : "bg-slate-700/50 text-slate-500 cursor-not-allowed"
                  }
                `}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Analyze Scan
              </button>
            </div>

            {/* Image Preview */}
            {preview && (
              <div className="bg-slate-800/40 backdrop-blur-sm rounded-3xl border border-slate-700/50 p-6 sm:p-8 shadow-xl shadow-black/10">
                <ImagePreview preview={preview} />
              </div>
            )}
          </div>

          {/* Right Column — Results */}
          <div>
            {result ? (
              <div className="bg-slate-800/40 backdrop-blur-sm rounded-3xl border border-slate-700/50 p-6 sm:p-8 shadow-xl shadow-black/10 space-y-6">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-cyan-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  Analysis Results
                </h3>

                <PredictionCard result={result} />
                <ConfidenceBar confidence={result?.confidence} />
              </div>
            ) : (
              <div className="bg-slate-800/40 backdrop-blur-sm rounded-3xl border border-slate-700/50 p-6 sm:p-8 flex flex-col items-center justify-center min-h-[400px] text-center shadow-xl shadow-black/10">
                <div className="w-20 h-20 rounded-2xl bg-slate-700/30 flex items-center justify-center mb-4">
                  <svg
                    className="w-10 h-10 text-slate-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-400 mb-2">
                  No Results Yet
                </h3>
                <p className="text-slate-500 text-sm max-w-xs">
                  Upload an MRI scan and click &ldquo;Analyze Scan&rdquo; to see
                  the prediction results.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-slate-800 text-center">
          <p className="text-slate-500 text-sm">
            Built with ResNet50 · PyTorch · FastAPI · React
          </p>
          <p className="text-slate-600 text-xs mt-1">
            95%+ Accuracy on Brain Tumor MRI Dataset
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;