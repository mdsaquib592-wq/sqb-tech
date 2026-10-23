import React, { useState } from "react";
import { PlusCircle, Link as LinkIcon, Check, Loader2 } from "lucide-react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function AdminPanel() {
  const [kind, setKind] = useState("software");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [savedMsg, setSavedMsg] = useState(false);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!title || !url) return;

    setLoading(true);
    try {
      if (kind === "software") {
        await addDoc(collection(db, "software_products"), {
          type: "software",
          title,
          version: "v1.0.0",
          category: category || "Custom Software",
          price: Number(price) || 0,
          isFreeDownload: true,
          size: "65 MB",
          os: "Windows / Mac",
          rating: "5.0",
          description: description || "Official Tech SQB release.",
          downloadUrl: url,
          buyUrl: url,
          badge: "New Release",
          createdAt: serverTimestamp(),
        });
      } else {
        await addDoc(collection(db, "web_services"), {
          type: "service",
          title,
          deliveryTime: "5 - 7 Days",
          category: category || "Web Service",
          price: Number(price) || 199,
          billing: "Per Project",
          rating: "5.0",
          description: description || "Tech SQB engineering service.",
          serviceUrl: url,
          badge: "Custom Service",
          createdAt: serverTimestamp(),
        });
      }

      setTitle("");
      setCategory("");
      setPrice("");
      setUrl("");
      setDescription("");
      setSavedMsg(true);
      setTimeout(() => setSavedMsg(false), 3000);
    } catch (err) {
      console.error("Error adding document: ", err);
      alert("Failed to add item to database. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-10 bg-slate-900/60 border-b border-cyan-500/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-[#0b1326] border border-cyan-500/40 p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-cyan-400" />
                Live Database Link Manager
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Items added here are saved permanently in Firestore and appear
                instantly on all screens in real time.
              </p>
            </div>
            {savedMsg && (
              <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/30">
                <Check className="w-4 h-4" /> Published to Database!
              </span>
            )}
          </div>

          <form onSubmit={handleAdd} className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Select Destination
              </label>
              <select
                value={kind}
                onChange={(e) => setKind(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white outline-none"
              >
                <option value="software">Software Products Slider</option>
                <option value="service">Web Services Slider</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g., SQB NetGuard Enterprise"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Category
              </label>
              <input
                type="text"
                placeholder="e.g., Cybersecurity / SaaS"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Price (USD)
              </label>
              <input
                type="number"
                placeholder="49.99"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Direct Download / Service / Checkout URL *
              </label>
              <div className="relative">
                <LinkIcon className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="url"
                  required
                  placeholder="https://example.com/downloads/file.exe"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white outline-none"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Short Description
              </label>
              <input
                type="text"
                placeholder="Brief summary of features or deliverables..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-400 to-blue-600 text-slate-950 hover:opacity-95 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Syncing with Database...</span>
                  </>
                ) : (
                  <span>
                    Publish to{" "}
                    {kind === "software"
                      ? "Software Slider"
                      : "Web Services Slider"}
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
