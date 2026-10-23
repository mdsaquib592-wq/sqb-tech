import React, { useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  ShoppingCart,
  Lock,
  Star,
  ExternalLink,
  HardDrive,
  Clock,
  CheckCircle2,
  Search,
} from "lucide-react";

export default function HorizontalSlider({
  id,
  title,
  subtitle,
  badgeText,
  items,
  type,
  user,
  onProtectedAction,
}) {
  const sliderRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const scrollSlider = (direction) => {
    if (!sliderRef.current) return;
    const scrollAmount = 380; // Width of 1 card + gap
    sliderRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section id={id} className="py-16 border-b border-slate-800/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header + Search + Left/Right Slider Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3">
              <span>{badgeText}</span>
              <span className="text-white bg-cyan-500/20 px-2 py-0.5 rounded-full">
                {filteredItems.length} Listed
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {title}
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-1 max-w-2xl">
              {subtitle}
            </p>
          </div>

          {/* Search & Arrow Buttons */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={`Filter ${type === "software" ? "software" : "services"}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-900/90 border border-slate-700 focus:border-cyan-400 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 outline-none w-44 sm:w-56"
              />
            </div>

            <button
              onClick={() => scrollSlider("left")}
              aria-label="Scroll Left"
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-cyan-500/20 border border-slate-700 hover:border-cyan-400 text-white transition-all cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollSlider("right")}
              aria-label="Scroll Right"
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-cyan-500/20 border border-slate-700 hover:border-cyan-400 text-white transition-all cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel Container */}
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-6 pt-2"
        >
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="min-w-[320px] sm:min-w-[350px] max-w-[350px] snap-start rounded-2xl bg-gradient-to-b from-[#0d1528] to-[#080d1a] border border-slate-800 hover:border-cyan-400/60 transition-all duration-300 flex flex-col justify-between p-6 group shadow-lg hover:shadow-[0_0_30px_rgba(0,210,255,0.12)]"
            >
              {/* Top Metadata */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                    #{index + 1} • {item.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-semibold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-md">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    {item.rating}
                  </span>
                </div>

                {/* Title & Badge */}
                <div className="mb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-cyan-400 font-semibold">
                      {type === "software"
                        ? `Version ${item.version}`
                        : item.badge}
                    </span>
                    {item.badge && type === "software" && (
                      <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mt-1">
                    {item.title}
                  </h3>
                </div>

                <p className="text-slate-400 text-xs leading-relaxed mb-5 line-clamp-3">
                  {item.description}
                </p>

                {/* Technical Specs Box */}
                <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs mb-6">
                  {type === "software" ? (
                    <>
                      <div className="flex items-center gap-1.5 text-slate-300">
                        <HardDrive className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span className="truncate">{item.size}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">{item.os}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-1.5 text-slate-300">
                        <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span className="truncate">{item.deliveryTime}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">{item.billing}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Bottom Pricing & Protected Action Buttons */}
              <div className="pt-4 border-t border-slate-800/80">
                <div className="flex items-baseline justify-between mb-4">
                  <div>
                    <span className="text-[11px] text-slate-400 block">
                      {type === "software"
                        ? "Full License"
                        : "Starting Package"}
                    </span>
                    <span className="text-2xl font-black text-white">
                      {item.price === 0 ? "FREE" : `$${item.price}`}
                    </span>
                  </div>

                  <span className="text-[11px] flex items-center gap-1 text-slate-400">
                    {!user && <Lock className="w-3 h-3 text-amber-400" />}
                    {user ? "Direct Link Ready" : "Login Required"}
                  </span>
                </div>

                {/* Action Buttons */}
                {type === "software" ? (
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      onClick={() => onProtectedAction(item, "download")}
                      className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-all cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-cyan-400" />
                      Download
                    </button>
                    <button
                      onClick={() => onProtectedAction(item, "buy")}
                      className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-bold text-xs bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 shadow-[0_0_15px_rgba(0,210,255,0.3)] transition-all cursor-pointer"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      {item.price === 0 ? "Get Key" : "Buy Now"}
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => onProtectedAction(item, "service")}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 shadow-[0_0_20px_rgba(0,210,255,0.3)] transition-all cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Order &amp; Launch Service Link
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
