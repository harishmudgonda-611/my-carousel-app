"use client";
import { useState } from "react";

export default function Home() {
  const [title, setTitle] = useState("Georgette Embroidery Kurti");
  const [price, setPrice] = useState("466");
  const [dressFile, setDressFile] = useState(null);
  const [apiUrl, setApiUrl] = useState("");
  const [resultImage, setResultImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const models = [
    { id: 1, name: "Pose 1 (Outdoor)", url: "https://i.ibb.co/6P0x9Mv/model1.jpg" },
    { id: 2, name: "Pose 2 (Indoor)", url: "https://i.ibb.co/mFHn0Xy/model2.jpg" }
  ];
  const [selectedModel, setSelectedModel] = useState(models[0].url);

  const handleProcessAI = async () => {
    if (!apiUrl) return alert("Pehle Python Open-Source API URL dalein!");
    if (!dressFile) return alert("Dress Image upload karein!");

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("dress_img", dressFile);

      // Fetch model blob
      const modelRes = await fetch(selectedModel);
      const modelBlob = await modelRes.blob();
      formData.append("model_img", modelBlob, "model.jpg");

      const response = await fetch(`${apiUrl}/api/vton`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.processed_dress) {
        setResultImage(`data:image/png;base64,${data.processed_dress}`);
      } else {
        alert("Processing Error!");
      }
    } catch (err) {
      alert("AI Server Connection Failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-4 max-w-md mx-auto font-sans">
      <div className="bg-white p-5 rounded-2xl shadow-lg space-y-4">
        <h1 className="text-xl font-bold text-gray-900 text-center">
          Open-Source Custom AI Engine
        </h1>

        {/* Python Backend URL */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-700">Open-Source Python Server URL:</label>
          <input
            type="text"
            value={apiUrl}
            onChange={(e) => setApiUrl(e.target.value)}
            placeholder="https://xxxx.ngrok-free.app"
            className="w-full p-2 border rounded-lg text-xs text-gray-900 bg-gray-50"
          />
        </div>

        {/* Dress File Upload */}
        <div className="border-2 border-dashed border-purple-400 p-3 rounded-xl text-center bg-purple-50">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setDressFile(e.target.files[0])}
            className="w-full text-xs text-gray-500"
          />
        </div>

        {/* Action Button */}
        <button
          onClick={handleProcessAI}
          disabled={loading}
          className="w-full bg-purple-600 text-white font-bold py-3 rounded-xl shadow hover:bg-purple-700 transition"
        >
          {loading ? "⚙️ Open-Source AI Processing..." : "✨ Run Custom AI Try-On"}
        </button>

        {/* Display Canvas */}
        <div className="border rounded-2xl p-4 bg-white text-center shadow-md relative overflow-hidden">
          <div className="relative w-full h-80 my-2 rounded-xl overflow-hidden bg-gray-200">
            <img src={resultImage || selectedModel} alt="AI Result" className="w-full h-full object-cover" />
          </div>
          <h2 className="font-bold text-gray-900 text-sm">{title}</h2>
          <p className="text-purple-700 font-extrabold text-sm">Only ₹{price}</p>
        </div>
      </div>
    </main>
  );
}
