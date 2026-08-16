"use client";
import { useState, useRef } from "react";
import { toPng } from "html-to-image";

export default function Home() {
  const [title, setTitle] = useState("Georgette Embroidery Kurti");
  const [price, setPrice] = useState("466");
  const [garmentImage, setGarmentImage] = useState(null);

  // Models with preset poses
  const models = [
    { id: 1, name: "Pose 1 (Outdoor)", url: "https://i.ibb.co/6P0x9Mv/model1.jpg" },
    { id: 2, name: "Pose 2 (Indoor)", url: "https://i.ibb.co/mFHn0Xy/model2.jpg" }
  ];
  const [selectedModel, setSelectedModel] = useState(models[0].url);

  // Overlay Adjustments
  const [top, setTop] = useState(30);
  const [scale, setScale] = useState(100);

  const cardRef = useRef(null);

  const handleGarmentUpload = (e) => {
    const file = e.target.files[0];
    if (file) setGarmentImage(URL.createObjectURL(file));
  };

  const downloadCarouselCard = async () => {
    if (!cardRef.current) return;
    try {
      const dataUrl = await toPng(cardRef.current, { cacheBust: true });
      const link = document.createElement("a");
      link.download = "carousel-post.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      alert("Download error, try again.");
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-4 max-w-md mx-auto font-sans">
      <div className="bg-white p-5 rounded-2xl shadow-lg space-y-4">
        <h1 className="text-xl font-bold text-gray-900 text-center">
          100% Free AI Model Carousel
        </h1>

        {/* Dress Image Upload */}
        <div className="border-2 border-dashed border-purple-400 p-3 rounded-xl text-center bg-purple-50">
          <label className="block text-xs font-bold text-purple-900 mb-1 cursor-pointer">
            📸 Meesho Dress Photo Upload Karein:
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleGarmentUpload}
            className="w-full text-xs text-gray-500 file:mr-2 file:py-1 file:px-3 file:rounded-full file:border-0 file:bg-purple-600 file:text-white"
          />
        </div>

        {/* Model Pose Selector */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-700">Choose AI Model Pose:</label>
          <div className="grid grid-cols-2 gap-2">
            {models.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedModel(m.url)}
                className={`py-1.5 px-2 rounded-lg text-xs font-bold border ${
                  selectedModel === m.url
                    ? "bg-purple-600 text-white border-purple-600"
                    : "bg-gray-50 text-gray-700"
                }`}
              >
                {m.name}
              </button>
            ))}
          </div>
        </div>

        {/* Manual Adjust Controls */}
        {garmentImage && (
          <div className="p-3 bg-gray-50 rounded-xl space-y-2 border">
            <p className="text-[11px] font-bold text-gray-600 uppercase">Dress Fitting Adjusters:</p>
            <div className="flex items-center gap-2">
              <span className="text-xs">Position:</span>
              <input
                type="range"
                min="10"
                max="60"
                value={top}
                onChange={(e) => setTop(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs">Size:</span>
              <input
                type="range"
                min="50"
                max="150"
                value={scale}
                onChange={(e) => setScale(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
        )}

        {/* Text Inputs */}
        <div className="space-y-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Product Title"
            className="w-full p-2 border rounded-lg text-sm text-gray-900"
          />
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            className="w-full p-2 border rounded-lg text-sm text-gray-900"
          />
        </div>

        {/* Canvas Render Area */}
        <div ref={cardRef} className="border rounded-2xl p-4 bg-white text-center shadow-md relative overflow-hidden">
          <span className="text-[10px] font-extrabold bg-purple-600 text-white px-2 py-0.5 rounded-full absolute top-3 right-3 z-10">
            OFFICIAL POST
          </span>

          {/* Model & Dress Composite Box */}
          <div className="relative w-full h-80 my-2 rounded-xl overflow-hidden bg-gray-200">
            {/* AI Model Background */}
            <img src={selectedModel} alt="AI Model" className="w-full h-full object-cover" />

            {/* Overlay Garment */}
            {garmentImage && (
              <img
                src={garmentImage}
                alt="Dress"
                style={{
                  position: "absolute",
                  top: `${top}%`,
                  left: "50%",
                  transform: `translateX(-50%) scale(${scale / 100})`,
                  mixBlendMode: "multiply", // Blends dress with model lighting natively
                  maxHeight: "60%",
                  objectFit: "contain",
                }}
              />
            )}
          </div>

          <h2 className="font-bold text-gray-900 text-sm">{title}</h2>
          <p className="text-purple-700 font-extrabold text-sm">Only ₹{price}</p>
        </div>

        {/* Export Button */}
        <button
          onClick={downloadCarouselCard}
          className="w-full bg-emerald-600 text-white font-bold py-3 rounded-xl shadow hover:bg-emerald-700 transition"
        >
          📥 Download High Quality Post
        </button>
      </div>
    </main>
  );
}
