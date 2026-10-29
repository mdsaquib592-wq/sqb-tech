// src/components/ProductModal.jsx
import React from "react";

export default function ProductModal({ product, onClose }) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-cyan-500/30 rounded-2xl p-6 shadow-2xl shadow-cyan-500/10 text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition"
        >
          ✕
        </button>

        {/* Badge & Category */}
        <div className="flex items-center gap-3 mb-3">
          <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-full">
            {product.category}
          </span>
          {product.badge && (
            <span className="px-3 py-1 text-xs font-semibold bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-full">
              {product.badge}
            </span>
          )}
        </div>

        {/* Title & Version */}
        <h2 className="text-2xl font-bold tracking-tight text-white mb-1">
          {product.title}{" "}
          <span className="text-sm font-normal text-slate-400">
            ({product.version})
          </span>
        </h2>

        <p className="text-slate-300 text-sm mb-6 leading-relaxed">
          {product.description}
        </p>

        {/* Specs Grid */}
        <div className="grid grid-cols-3 gap-3 bg-slate-950/60 border border-slate-800 rounded-xl p-4 mb-6 text-center">
          <div>
            <div className="text-xs text-slate-400">OS / Platform</div>
            <div className="text-sm font-semibold text-cyan-300">
              {product.os}
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-400">Package Size</div>
            <div className="text-sm font-semibold text-cyan-300">
              {product.size}
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-400">Rating</div>
            <div className="text-sm font-semibold text-amber-400">
              ★ {product.rating}
            </div>
          </div>
        </div>

        {/* Pricing & Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <div>
            <span className="text-xs text-slate-400 block">Price</span>
            <span className="text-xl font-bold text-white">
              {product.price === 0 ? "Free" : `₹${product.price}`}
            </span>
          </div>

          <div className="flex gap-3">
            {product.downloadUrl && product.downloadUrl !== "#" && (
              <a
                href={product.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 text-sm font-medium bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-cyan-500/30 rounded-xl transition"
              >
                Live Preview / Demo
              </a>
            )}
            <a
              href={product.buyUrl}
              className="px-5 py-2.5 text-sm font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 rounded-xl shadow-lg shadow-cyan-500/20 transition"
            >
              {product.isFreeDownload ? "Download Now" : "Buy License"}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
