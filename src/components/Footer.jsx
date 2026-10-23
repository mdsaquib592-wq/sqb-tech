import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#03060c] border-t border-slate-800/80 py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <img
            src="/Logo.png"
            alt="Tech SQB"
            className="w-10 h-10 rounded-lg object-contain bg-black border border-cyan-500/30"
            onError={(e) => (e.target.style.display = "none")}
          />
          <div>
            <p className="text-white font-bold text-sm">Tech SQB</p>
            <p className="text-[11px] text-slate-500">
              Enterprise Software Products &amp; Full-Stack Web Services
            </p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          <a
            href="#software-slider"
            className="hover:text-cyan-400 transition-colors"
          >
            Software (10)
          </a>
          <a
            href="#services-slider"
            className="hover:text-cyan-400 transition-colors"
          >
            Services (10)
          </a>
          <a href="#about" className="hover:text-cyan-400 transition-colors">
            About &amp; Founder
          </a>
          <a href="#contact" className="hover:text-cyan-400 transition-colors">
            Contact Us
          </a>
          <a href="#top" className="hover:text-cyan-400 transition-colors">
            Back to Top ↑
          </a>
        </div>

        <p className="text-slate-500">
          © {new Date().getFullYear()} Tech SQB. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
