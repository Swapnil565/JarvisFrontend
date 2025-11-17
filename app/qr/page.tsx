import React from "react";

type Props = {
  searchParams?: { u?: string };
};

export default function QRPage({ searchParams }: Props) {
  // If a URL is passed via ?u=, use it; otherwise, fall back to the most recent tunnel URL.
  const fallbackUrl = "https://seeks-productivity-imports-math.trycloudflare.com";
  const url = (searchParams?.u && decodeURIComponent(searchParams.u)) || fallbackUrl;
  const encoded = encodeURIComponent(url);

  // Google Chart API to render a QR code image for the URL
  const qrSrc = `https://chart.googleapis.com/chart?cht=qr&chs=320x320&chl=${encoded}&choe=UTF-8`;

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-black/40">
      <div className="glass-card glass-glow p-6 rounded-2xl text-center space-y-4">
        <h1 className="text-2xl font-semibold">Scan to open on phone</h1>
        <p className="text-sm opacity-80 break-all">{url}</p>
        <div className="mx-auto w-[320px] h-[320px] bg-white rounded-xl flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={qrSrc}
            alt={`QR code for ${url}`}
            width={320}
            height={320}
            className="rounded-lg"
          />
        </div>
        <p className="text-xs opacity-70">
          Tip: If the link changes, append ?u= to this page with the new URL to regenerate the QR.
        </p>
      </div>
    </div>
  );
}
