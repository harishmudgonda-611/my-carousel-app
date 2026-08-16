'use client';
import React, { useState } from 'react';

export default function Home() {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [generatedSlides, setGeneratedSlides] = useState([]);

  const handleGenerate = () => {
    if (!productName || !price || !imageUrl) {
      alert('Kripya saari details bharein!');
      return;
    }
    
    const slides = [
      { id: 1, title: productName, subtitle: `Only ₹${price}`, img: imageUrl, type: 'Front View' },
      { id: 2, title: 'Premium Quality', subtitle: 'Comfortable & Stylish', img: imageUrl, type: 'Detail View' },
      { id: 3, title: 'Limited Stock', subtitle: 'Order Now via Link', img: imageUrl, type: 'CTA' }
    ];
    
    setGeneratedSlides(slides);
  };

  return (
    <main className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md my-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Affiliate Carousel Builder</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <input
            type="text"
            placeholder="Product Title"
            className="border p-2 rounded"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Price (e.g. 499)"
            className="border p-2 rounded"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            type="text"
            placeholder="Product Image URL"
            className="border p-2 rounded"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>

        <button
          onClick={handleGenerate}
          className="bg-blue-600 text-white px-6 py-2 rounded mb-6"
        >
          Generate Carousel
        </button>

        {generatedSlides.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {generatedSlides.map((slide) => (
              <div key={slide.id} className="border rounded-lg p-4 bg-gray-50 text-center">
                <span className="text-xs bg-gray-200 px-2 py-1 rounded">{slide.type}</span>
                <img src={slide.img} alt={slide.title} className="w-full h-48 object-cover my-2 rounded" />
                <h3 className="font-semibold">{slide.title}</h3>
                <p className="text-gray-600">{slide.subtitle}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
