import React from "react";
import {
  LogIn,
  UserCheck,
  LogOut,
  PlusCircle,
  Code2,
  Sparkles,
  ShieldAlert,
  Info,
  MessageSquare,
} from "lucide-react";

export default function Navbar({
  user,
  isAdmin,
  onOpenAuth,
  onLogout,
  onToggleAdmin,
  showAdmin,
}) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#050811]/100 border-b border-cyan-500/20 shadow-[0_4px_30px_rgba(0,210,255,0.08)]">
      <div className="w-full px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Seamless Borderless Logo with Professional Slogan */}
        {/* Seamless Logo & Slogan (No Hover Animation, Blended Background) */}
        <a href="#top" className="flex items-center select-none -ml-2 sm:-ml-1">
          <div className="flex flex-col items-start justify-center">
            {/* Logo Image */}
            <div className="h-11 sm:h-12 flex items-center bg-transparent">
              <img
                src="/Logo.png"
                alt="Tech SQB Logo"
                className="h-full w-auto object-contain mix-blend-screen bg-transparent"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              <div className="hidden items-center text-xl font-black bg-gradient-to-r from-white via-slate-200 to-cyan-400 bg-clip-text text-transparent">
                Tech SQB
              </div>
            </div>

            {/* Slogan */}
            <span className="text-[9.5px] sm:text-[10px] font-bold uppercase tracking-[0.24em] bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 bg-clip-text text-transparent pl-0.5 mt-0.5">
              SOFTWARE &amp; WEB SOLUTIONS
            </span>
          </div>
        </a>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
          <a
            href="#software-slider"
            className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
          >
            <Code2 className="w-4 h-4 text-cyan-400" />
            Software Products (10)
          </a>
          <a
            href="#services-slider"
            className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            Web Services (10)
          </a>
          <a
            href="#about"
            className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
          >
            <Info className="w-4 h-4 text-cyan-400" />
            About
          </a>
          <a
            href="#contact"
            className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
          >
            <MessageSquare className="w-4 h-4 text-cyan-400" />
            Contact
          </a>

          {/* Admin Link Manager (Only shown to Master Admin) */}
          {isAdmin && (
            <button
              onClick={onToggleAdmin}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                showAdmin
                  ? "bg-amber-500/20 border-amber-400 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                  : "bg-cyan-500/10 border-cyan-400/50 hover:bg-cyan-500/20 text-cyan-300"
              }`}
            >
              <PlusCircle className="w-3.5 h-3.5" />
              {showAdmin ? "Hide Link Manager" : "Admin Link Manager"}
            </button>
          )}
        </nav>

        {/* Auth Profile / Login Button */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3 bg-slate-900/90 border border-cyan-500/30 px-3.5 py-2 rounded-xl">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                  isAdmin
                    ? "bg-gradient-to-br from-amber-400 to-orange-500 text-black"
                    : "bg-gradient-to-br from-cyan-500 to-blue-600 text-black"
                }`}
              >
                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>

              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-white leading-none">
                  {user.name}
                </p>
                {isAdmin ? (
                  <p className="text-[10px] text-amber-400 flex items-center gap-1 mt-0.5 font-bold">
                    <ShieldAlert className="w-3 h-3" /> Master Admin
                  </p>
                ) : (
                  <p className="text-[10px] text-emerald-400 flex items-center gap-1 mt-0.5">
                    <UserCheck className="w-3 h-3" /> Client Member
                  </p>
                )}
              </div>

              <button
                onClick={onLogout}
                title="Logout"
                className="ml-2 p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => onOpenAuth("login")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-[0_0_25px_rgba(0,210,255,0.4)] transition-all cursor-pointer"
            >
              <LogIn className="w-4 h-4" />
              <span>Login / Register</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
