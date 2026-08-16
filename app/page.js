"use client";
import { useState } from "react";

export default function Home() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [generated, setGenerated] = useState(false);

  return (
    <main className="min-h-screen bg-gray-100 p-4 max-w-md mx-auto">
      <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
        <h1 className="text-2xl font-bold text-gray-800 text-center">Affiliate Carousel Builder</h1>
        
        <input
          type="text"
          placeholder="Product Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded-md text-gray-900 placeholder-gray-500"
        />
        
        <input
          type="text"
          placeholder="Price (e.g. 499)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-2 border rounded-md text-gray-900 placeholder-gray-500"
        />
        
        <input
          type="text"
          placeholder="Product Image URL (.jpg/.png link)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full p-2 border rounded-md text-gray-900 placeholder-gray-500"
        />

        <button
          onClick={() => setGenerated(true)}
          className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700"
        >
          Generate Carousel
        </button>

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
