"use client";

import React, { useEffect, useRef } from "react";
import QRCode from "qrcode";

type Props = {
  searchParams?: { u?: string };
};

export default function QRPage({ searchParams }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // If a URL is passed via ?u=, use it; otherwise, fall back to the most recent tunnel URL.
  const fallbackUrl = "https://seeks-productivity-imports-math.trycloudflare.com";
  const url = (searchParams?.u && decodeURIComponent(searchParams.u)) || fallbackUrl;

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(
        canvasRef.current,
        url,
        {
          width: 320,
          margin: 2,
          color: {
            dark: "#000000",
            light: "#FFFFFF",
          },
        },
        (error) => {
          if (error) console.error("QR generation error:", error);
        }
      );
    }
  }, [url]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-[#0a0a0f] to-[#1a1a2e]">
      <div className="glass-card glass-glow p-8 rounded-2xl text-center space-y-6 max-w-md">
        <div>
          <h1 className="heading-lg mb-2">📱 Scan to open</h1>
          <p className="body-sm opacity-70">Point your phone camera at the QR code</p>
        </div>
        
        <div className="mx-auto w-[320px] h-[320px] bg-white rounded-2xl p-4 flex items-center justify-center">
          <canvas ref={canvasRef} className="max-w-full max-h-full" />
        </div>
        
        <div className="space-y-2">
          <p className="body-sm opacity-80 break-all font-mono text-xs bg-white/5 p-3 rounded-lg">
            {url}
          </p>
          <p className="text-xs opacity-60">
            💡 Tip: Change URL with ?u= parameter
          </p>
        </div>
      </div>
    </div>
  );
}
