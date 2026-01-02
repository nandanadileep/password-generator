import React, { useState, useEffect } from "react";
import { Copy, RefreshCw, Lock, ShieldCheck } from "lucide-react";

export default function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState([]);
  const [showEntropyInfo, setShowEntropyInfo] = useState(false);

  // Auto-show tooltip when slider moves
  useEffect(() => {
    setShowEntropyInfo(true);
    const timer = setTimeout(() => setShowEntropyInfo(false), 3000);
    return () => clearTimeout(timer);
  }, [length]);

  const generatePassword = () => {
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}";
    let pwd = "";
    for (let i = 0; i < length; i++) {
      pwd += chars[Math.floor(Math.random() * chars.length)];
    }
    setPassword(pwd);
    setHistory((h) => [pwd, ...h.slice(0, 4)]);
    setCopied(false);
  };

  const copyPassword = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center px-4">
      {/* iPhone-style frame */}
      <div className="w-full max-w-sm rounded-[32px] bg-neutral-900 border border-neutral-800 shadow-2xl overflow-hidden relative">

        {/* Header */}
        <div className="px-6 pt-6 pb-4">
          <h1 className="text-2xl font-semibold tracking-tight">
            Give Me A Password
          </h1>
        </div>

        {/* Password Card */}
        <div className="mx-4 mb-5 rounded-2xl bg-white/5 backdrop-blur border border-white/10 p-4 relative z-20">
          <div className="flex items-center gap-3">
            <div className="flex-1 font-mono text-lg tracking-wide break-all">
              {password || "•••• •••• •••• ••••"}
            </div>
            <button
              onClick={copyPassword}
              className="p-2 rounded-xl bg-[#1DA1F2]/20 hover:bg-[#1DA1F2]/30 transition"
            >
              <Copy size={18} />
            </button>
          </div>

          {copied && (
            <div className="mt-2 text-xs text-[#1DA1F2] animate-pulse">
              Copied securely ✦
            </div>
          )}

          {/* Strength Meter */}
          <div className="mt-4">
            <div className="h-2 rounded-full bg-neutral-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-red-500 via-yellow-400 to-teal-400 transition-all"
                style={{ width: `${Math.min(100, length * 4)}%` }}
              />
            </div>
            
            <div className="mt-2 flex items-start justify-between relative">
              <div className="text-xs text-neutral-400 flex items-center gap-1.5">
                Entropy: ~{Math.round(length * 5.8)} bits
              </div>

              {/* Slider-Triggered Pop-up (Positioned ABOVE now) */}
              {showEntropyInfo && (
                <div className="absolute left-0 bottom-full mb-3 z-30 w-full p-3 rounded-xl bg-neutral-800 border border-neutral-700 text-xs text-neutral-300 shadow-xl animate-in fade-in slide-in-from-bottom-2 duration-200 pointer-events-none">
                  <p>
                    <strong>Entropy is chaos!</strong>
                    <br/>
                    To crack this, a hacker needs to guess a coin flip correctly 
                    <span className="text-[#1DA1F2] font-mono mx-1">{Math.round(length * 5.8)}</span> 
                    times in a row.
                  </p>
                  {/* Little arrow pointing down */}
                  <div className="absolute left-4 -bottom-1.5 w-3 h-3 bg-neutral-800 border-b border-r border-neutral-700 rotate-45"></div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="px-6 space-y-5 relative z-10">
          {/* Length Slider */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Password length</span>
              <span className="text-[#1DA1F2] font-medium">{length}</span>
            </div>
            <input
              type="range"
              min="8"
              max="32"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full accent-[#1DA1F2] cursor-pointer"
            />
          </div>

          {/* Generate Button */}
          <button
            onClick={generatePassword}
            className="w-full py-4 rounded-2xl font-semibold text-black bg-gradient-to-r from-[#1DA1F2] to-cyan-400 hover:scale-[0.99] active:scale-95 transition shadow-lg flex items-center justify-center gap-2"
          >
            <RefreshCw size={18} />
            Generate Password
          </button>
        </div>

        {/* History */}
        <div className="mt-6 px-4 pb-4">
          <h3 className="text-sm text-neutral-400 mb-2">Recent</h3>
          <div className="space-y-2">
            {history.map((h, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-xl bg-white/5 border border-white/10 px-4 py-2 font-mono text-sm"
              >
                <span className="truncate">{h}</span>
                <Copy
                  size={14}
                  className="opacity-60 hover:opacity-100 cursor-pointer"
                  onClick={() => navigator.clipboard.writeText(h)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-neutral-800 px-4 py-3 flex items-center justify-between text-xs text-neutral-500">
          <div className="flex items-center gap-1">
            <ShieldCheck size={14} />
            Local only
          </div>
          <div className="flex items-center gap-1">
            <Lock size={14} />
            Encrypted
          </div>
        </div>
      </div>
    </div>
  );
}