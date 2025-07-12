import React from "react";

interface CouponCardProps {
  code: string;
  description: string;
  discount?: string;
  validUntil?: string;
}

const CouponCard: React.FC<CouponCardProps> = ({ code, description, discount, validUntil }) => {
  return (
    <section className="mb-6">
      <h2 className="font-bold text-lg mb-2">Cupom Whosfy</h2>
      <div className="relative w-full overflow-hidden rounded-2xl shadow-xl border border-black/5 dark:border-white/10 bg-card">
        <div className="absolute inset-0 bg-yellow-400" />
        <div className="relative px-6 pt-6 pb-2 flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-gray-700 uppercase">Cupom Whosfy</span>
          </div>
        </div>
        <div className="relative w-full px-6 pb-4">
          <div className="flex flex-col justify-center gap-3">
            <div className="text-2xl font-bold text-black tracking-tight leading-none">{discount || "Desconto"}</div>
            <div className="text-black text-base leading-relaxed">{description}</div>
            <div className="w-full mt-2">
              <span className="bg-white/90 px-4 py-2 rounded-lg font-mono text-lg font-bold tracking-wide text-center truncate block w-full text-black">{code}</span>
            </div>
          </div>
        </div>
        {validUntil && (
          <div className="text-xs text-gray-700 px-6 pb-2">Válido até: {new Date(validUntil).toLocaleDateString()}</div>
        )}
        <div className="relative bg-white/90 px-6 py-3 flex items-center justify-between gap-2">
          <button className="flex items-center gap-1 text-pink-600 hover:text-pink-700 font-semibold text-base focus:outline-none" aria-label="Gostei" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart w-5 h-5 fill-pink-600"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
            <span>12</span>
          </button>
          <button className="text-sm text-gray-700 hover:underline" aria-label="Ver detalhes do cupom" type="button">Ver detalhes</button>
        </div>
      </div>
    </section>
  );
};

export default CouponCard; 