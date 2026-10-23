import React, { useState } from "react";
import {
  X,
  CheckCircle2,
  Download,
  ExternalLink,
  Key,
  ShieldCheck,
  CreditCard,
  Lock,
  Loader2,
} from "lucide-react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function ActionModal({ activeAction, onClose, user }) {
  if (!activeAction) return null;

  const { item, actionType } = activeAction;
  const isPaidItem = Number(item.price) > 0;

  // Paid access unlocks after payment verification
  const [hasPaid, setHasPaid] = useState(!isPaidItem);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentId, setPaymentId] = useState("");

  const targetUrl =
    actionType === "download"
      ? item.downloadUrl
      : actionType === "buy"
        ? item.buyUrl || item.downloadUrl
        : item.serviceUrl;

  const handleRazorpayPayment = () => {
    setIsProcessing(true);

    const options = {
      key: "rzp_test_TrIvQlnDaYxCw4", // Replace with your Test or Live Key from dashboard.razorpay.com
      amount: Math.round(Number(item.price) * 100), // Amount in paise/cents
      currency: "INR", // Change to "USD" if using international currency
      name: "SQB Tech",
      description: `Purchase: ${item.title}`,
      image: "/Logo.png",
      prefill: {
        name: user?.name || "",
        email: user?.email || "",
      },
      theme: {
        color: "#00d2ff",
      },
      handler: async function (response) {
        // Payment success callback from Razorpay
        setPaymentId(response.razorpay_payment_id);
        setHasPaid(true);
        setIsProcessing(false);

        // Record the transaction to Firestore under "orders"
        try {
          await addDoc(collection(db, "orders"), {
            userId: user?.uid || "guest",
            userEmail: user?.email,
            userName: user?.name,
            itemId: item.id,
            itemTitle: item.title,
            amount: item.price,
            paymentId: response.razorpay_payment_id,
            purchasedAt: serverTimestamp(),
          });
        } catch (err) {
          console.error("Order recording error: ", err);
        }
      },
      modal: {
        ondismiss: function () {
          setIsProcessing(false);
        },
      },
    };

    if (window.Razorpay) {
      const rzp = new window.Razorpay(options);
      rzp.open();
    } else {
      alert(
        "Payment gateway failed to load. Please check your internet connection.",
      );
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#0b1326] border border-cyan-500/40 p-6 sm:p-8 shadow-[0_0_50px_rgba(0,210,255,0.2)]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-400/40 flex items-center justify-center text-cyan-400 shrink-0">
            {hasPaid ? (
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            ) : (
              <Lock className="w-6 h-6 text-amber-400" />
            )}
          </div>
          <div>
            <span className="text-[11px] uppercase tracking-wider font-bold text-cyan-400">
              Authenticated Client: {user?.name}
            </span>
            <h3 className="text-xl font-black text-white">{item.title}</h3>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed mb-5">
          {item.description}
        </p>

        {/* Pricing & License Details Box */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 mb-6 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Project Type:</span>
            <span className="font-bold uppercase text-cyan-400">
              {item.category || item.type}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400">License Fee:</span>
            <span className="font-bold text-white text-base">
              {item.price === 0 ? "FREE" : `₹${item.price} / $${item.price}`}
            </span>
          </div>

          {hasPaid ? (
            <>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-1">
                  <Key className="w-3.5 h-3.5 text-amber-400" /> Activated
                  License:
                </span>
                <code className="px-2 py-0.5 rounded bg-slate-900 text-amber-300 font-mono">
                  SQB-PAID-
                  {paymentId ? paymentId.slice(-6).toUpperCase() : "AUTH"}
                </code>
              </div>
              <div className="pt-2 border-t border-slate-800">
                <span className="text-slate-400 block mb-1">
                  Download Source:
                </span>
                <code className="block p-2 rounded bg-slate-900 text-emerald-300 break-all text-[11px]">
                  Verified Direct Link Ready
                </code>
              </div>
            </>
          ) : (
            <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-300 text-xs">
              File download (ZIP/APK) is protected and unlocks immediately upon
              payment confirmation.
            </div>
          )}
        </div>

        {/* Action Button: Pay or Download */}
        <div>
          {!hasPaid ? (
            <button
              onClick={handleRazorpayPayment}
              disabled={isProcessing}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 shadow-[0_0_25px_rgba(245,158,11,0.35)] transition-all cursor-pointer"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Opening Secure Checkout...</span>
                </>
              ) : (
                <>
                  <CreditCard className="w-4 h-4" />
                  <span>
                    Pay Now to Unlock Download (
                    {item.price === 0 ? "Free" : `₹${item.price}`})
                  </span>
                </>
              )}
            </button>
          ) : (
            <a
              href={targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-400 to-cyan-500 hover:from-emerald-300 hover:to-cyan-400 text-slate-950 shadow-[0_0_25px_rgba(16,185,129,0.35)] transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Project Build / APK</span>
            </a>
          )}
        </div>

        <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
          <span>256-Bit Encrypted Payment Processing & Delivery</span>
        </div>
      </div>
    </div>
  );
}
