"use client";
import { useState } from "react";

export default function Home() {
  const [meeshoUrl, setMeeshoUrl] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);

  const handleAutoFetch = async () => {
    if (!meeshoUrl) return alert("Pehle Meesho link paste karein!");
    setLoading(true);
    try {
      const res = await fetch("/api/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: meeshoUrl }),
      });
      const data = await res.json();

      if (data.image) setImageUrl(data.image);
      if (data.title) setTitle(data.title.split("|")[0].trim());
      
      const priceMatch = meeshoUrl.match(/₹\s*(\d+)/) || data.title?.match(/₹\s*(\d+)/);
      if (priceMatch) setPrice(priceMatch[1]);

      setGenerated(true);
    } catch (err) {
      alert("Error fetching details. Manually details fill karein.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-4 max-w-md mx-auto">
      <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
        <h1 className="text-2xl font-bold text-gray-800 text-center">Affiliate Carousel Builder</h1>
        
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Meesho Share Link Paste Karein:</label>
          <input
            type="text"
            placeholder="Paste full Meesho link/text here..."
            value={meeshoUrl}
            onChange={(e) => setMeeshoUrl(e.target.value)}
            className="w-full p-2 border rounded-md text-gray-900 border-blue-400"
          />
          <button
            onClick={handleAutoFetch}
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded-md font-semibold hover:bg-green-700"
          >
            {loading ? "Fetching Real Image..." : "Auto-Fetch & Generate"}
          </button>
        </div>

        <hr className="my-4" />

        <div className="space-y-3">
          <p className="text-xs text-gray-500 font-bold">MANUAL EDIT (IF NEEDED):</p>
          <input
            type="text"
            placeholder="Product Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded-md text-gray-900"
          />
          <input
            type="text"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border rounded-md text-gray-900"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full p-2 border rounded-md text-gray-900"
          />
        </div>

        {generated && (
          <div className="mt-6 space-y-6">
            <div className="border rounded-lg p-4 bg-gray-50 text-center relative">
              <span className="text-xs bg-gray-200 px-2 py-1 rounded absolute top-2 right-2 text-gray-700">Front View</span>
              {imageUrl && <img src={imageUrl} alt="Product" className="w-full h-64 object-cover rounded-md mb-2" />}
              <h2 className="font-bold text-gray-900">{title || "Product Title"}</h2>
              <p className="text-gray-600">Only ₹{price || "0"}</p>
            </div>

            <div className="border rounded-lg p-4 bg-gray-50 text-center relative">
              <span className="text-xs bg-gray-200 px-2 py-1 rounded absolute top-2 right-2 text-gray-700">Detail View</span>
              {imageUrl && <img src={imageUrl} alt="Product" className="w-full h-64 object-cover rounded-md mb-2" />}
              <h2 className="font-bold text-gray-900">Premium Quality</h2>
              <p className="text-gray-600">Comfortable & Stylish</p>
            </div>

            <div className="border rounded-lg p-4 bg-gray-50 text-center relative">
              <span className="text-xs bg-gray-200 px-2 py-1 rounded absolute top-2 right-2 text-gray-700">CTA</span>
              {imageUrl && <img src={imageUrl} alt="Product" className="w-full h-64 object-cover rounded-md mb-2" />}
              <h2 className="font-bold text-gray-900">Limited Stock</h2>
              <p className="text-gray-600">Order Now via Link</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
