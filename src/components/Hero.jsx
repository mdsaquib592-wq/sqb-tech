import React from "react";
import { Download, Globe, Lock, ArrowRight, Shield, Cpu } from "lucide-react";

export default function Hero({ user, onOpenAuth }) {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-slate-800/80"
    >
      {/* Glowing Cyan Spotlight Effect matching SQB Tech Logo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[420px] bg-gradient-to-b from-cyan-500/25 via-blue-600/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-400/30 text-cyan-300 text-xs font-semibold">
              <Shield className="w-3.5 h-3.5 text-cyan-400" />
              <span>OFFICIAL SQB TECH DIGITAL MARKETPLACE</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
              Next-Gen{" "}
              <span className="bg-gradient-to-r from-white via-slate-200 to-cyan-400 bg-clip-text text-transparent">
                Software Products
              </span>{" "}
              &amp; Scalable{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Web Services
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Explore our curated horizontal catalog of enterprise desktop
              software and full-stack web engineering services. Sign in to your{" "}
              <span className="text-white font-semibold">SQB Tech</span> account
              to unlock instant installers, license keys, and direct service
              ordering.
            </p>

            {/* Primary CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#software-slider"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-400 to-blue-600 text-slate-950 shadow-[0_0_30px_rgba(0,210,255,0.45)] hover:scale-[1.02] transition-all"
              >
                <Download className="w-4 h-4" />
                Explore Software Slider
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#services-slider"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-slate-900/90 hover:bg-slate-800 text-white border border-slate-700 hover:border-cyan-400/50 transition-all"
              >
                <Globe className="w-4 h-4 text-cyan-400" />
                Browse Web Services
              </a>
            </div>

            {/* Security Gate Notice Banner */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800">
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  {user ? (
                    <strong className="text-emerald-400">
                      Unlocked: You can now download &amp; purchase directly!
                    </strong>
                  ) : (
                    <>
                      Authentication Gate Active:{" "}
                      <button
                        onClick={() => onOpenAuth("register")}
                        className="text-cyan-400 underline hover:text-cyan-300 font-semibold"
                      >
                        Login or Register
                      </button>{" "}
                      required before downloading or buying.
                    </>
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Metallic Logo Showcase Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl p-1 bg-gradient-to-b from-cyan-400/50 via-blue-600/20 to-slate-900 shadow-[0_0_60px_rgba(0,210,255,0.2)]">
              <div className="bg-black rounded-[22px] p-6 sm:p-8 flex flex-col items-center text-center relative overflow-hidden">
                <div className="w-full h-72 sm:h-80 md:h-96 flex items-center justify-center rounded-2xl bg-slate-950 border border-cyan-500/30 overflow-hidden mb-6 relative group shadow-inner">
                  <img
                    src="/Hero.png"
                    alt="SQB Tech Platform Showcase"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                  {/* Fallback if Logo.png isn't copied into /public yet */}
                  <div className="hidden flex-col items-center justify-center p-6 text-center">
                    <Cpu className="w-14 h-14 text-cyan-400 mb-3 animate-pulse" />
                    <span className="text-3xl font-black tracking-wider bg-gradient-to-b from-white via-slate-300 to-slate-500 bg-clip-text text-transparent">
                      SQB Tech
                    </span>
                    <span className="text-[11px] text-cyan-400 mt-1">
                      Place your founder.jpg inside the /public folder
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 w-full text-center">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/90">
                    <p className="text-xl font-black text-cyan-400">10+</p>
                    <p className="text-[11px] text-slate-400">Software Apps</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/90">
                    <p className="text-xl font-black text-white">10+</p>
                    <p className="text-[11px] text-slate-400">Web Services</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/90">
                    <p className="text-xl font-black text-emerald-400">100%</p>
                    <p className="text-[11px] text-slate-400">Verified Links</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
