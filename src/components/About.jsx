import React from "react";
import {
  Target,
  Award,
  Code2,
  Globe,
  Sparkles,
  CheckCircle,
  ExternalLink,
} from "lucide-react";

export default function About() {
  return (
    <section
      id="about"
      className="py-20 border-b border-slate-800/80 relative overflow-hidden bg-[#050811]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>WHO WE ARE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Engineering High-Performance Digital Solutions
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-4 leading-relaxed">
            At Tech SQB, we bridge the gap between heavy desktop applications
            and agile, cloud-native web architectures, empowering businesses
            worldwide with production-ready software and custom engineering.
          </p>
        </div>

        {/* Company Pillars */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 rounded-2xl bg-[#0b1222] border border-slate-800 hover:border-cyan-400/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center text-cyan-400 mb-4">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Our Mission</h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              To deliver dependable, zero-bloat desktop software tools alongside
              full-cycle custom web engineering that scales businesses with
              speed and security.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0b1222] border border-slate-800 hover:border-cyan-400/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-blue-500/15 border border-blue-400/30 flex items-center justify-center text-blue-400 mb-4">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Technical Excellence
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Every build undergoes strict vulnerability mitigation, speed
              audits, and cross-platform verification before rolling out to our
              clients.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0b1222] border border-slate-800 hover:border-cyan-400/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center text-cyan-400 mb-4">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Global Support
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Supplying verified license activations, automated software
              updates, and ongoing direct technical SLAs to companies worldwide.
            </p>
          </div>
        </div>

        {/* Founder Spotlight Card */}
        <div className="rounded-3xl p-1 bg-gradient-to-r from-cyan-500/40 via-blue-600/30 to-slate-800">
          <div className="bg-[#090e1c] rounded-[22px] p-8 sm:p-12">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-4 flex flex-col items-center text-center">
                {/* Founder Image Frame with Glowing Cyan Border */}
                <div className="relative w-44 h-44 rounded-2xl overflow-hidden border-2 border-cyan-400/70 p-1 bg-black mb-4 shadow-[0_0_25px_rgba(0,210,255,0.25)] group">
                  <img
                    src="/founder.jpg"
                    alt="Founder & CEO"
                    className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      // Fallback if image isn't in /public yet
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                  {/* Fallback Display if image is missing */}
                  <div className="hidden w-full h-full rounded-xl bg-gradient-to-br from-slate-900 to-black items-center justify-center border border-cyan-500/20">
                    <span className="text-4xl font-black bg-gradient-to-r from-white via-slate-200 to-cyan-400 bg-clip-text text-transparent">
                      SQB
                    </span>
                  </div>
                </div>

                {/* Founder Full Name */}
                <h3 className="text-2xl font-black tracking-tight bg-gradient-to-r from-white via-slate-100 to-cyan-200 bg-clip-text text-transparent">
                  Md Saquib Alam
                </h3>

                {/* Title & Role */}
                <h4 className="text-sm font-bold text-slate-300 mt-1">
                  Founder &amp; Chief Architect
                </h4>

                {/* Company Subtitle */}
                <p className="text-xs text-cyan-400 font-semibold tracking-wider uppercase mt-0.5">
                  Tech SQB
                </p>
              </div>

              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 text-cyan-400 text-xs font-bold uppercase">
                  <Award className="w-3.5 h-3.5" /> Founder's Vision
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  "Software shouldn't just look sleek—it must run flawlessly
                  under pressure."
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Tech SQB was launched with a single focus: giving businesses
                  immediate access to enterprise-grade desktop utilities and web
                  solutions without complicated procurement cycles or clunky
                  software bloat.
                </p>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800">
                  <div>
                    <span className="text-2xl font-black text-cyan-400">
                      100+
                    </span>
                    <p className="text-xs text-slate-400 mt-0.5">Deployments</p>
                  </div>
                  <div>
                    <span className="text-2xl font-black text-white">
                      99.9%
                    </span>
                    <p className="text-xs text-slate-400 mt-0.5">Uptime SLA</p>
                  </div>
                  <div>
                    <span className="text-2xl font-black text-emerald-400">
                      24/7
                    </span>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Support Desk
                    </p>
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
