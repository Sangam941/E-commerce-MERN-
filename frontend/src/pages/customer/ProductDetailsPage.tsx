import { ChevronLeft, Heart, Share2, ShoppingBag, Star } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { products } from "../../data/customerDummy";
import { IconButton } from "../../components/customer/ui/IconButton";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function ProductDetailsPage() {
  const nav = useNavigate();
  const { productId } = useParams();
  const product = useMemo(
    () => products.find((p) => p.id === productId) ?? products[0],
    [productId],
  );

  const [activeIdx, setActiveIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [wished, setWished] = useState(false);

  const img = product.images[clamp(activeIdx, 0, product.images.length - 1)];

  const gallerySection = (
    <>
      <div className="rounded-3xl overflow-hidden ring-1 ring-white/10 bg-white/5">
        <div className="relative aspect-[16/10] md:aspect-square bg-slate-900">
          <img
            src={img}
            alt={product.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-2">
            {product.images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveIdx(i)}
                className={[
                  "h-2 w-2 rounded-full transition",
                  i === activeIdx ? "bg-blue-500" : "bg-white/20",
                ].join(" ")}
                aria-label={`Show image ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
        {product.images.map((u, i) => (
          <button
            key={u + i}
            type="button"
            onClick={() => setActiveIdx(i)}
            className={[
              "shrink-0 h-14 w-14 md:h-20 md:w-20 rounded-2xl overflow-hidden ring-1",
              i === activeIdx ? "ring-blue-500" : "ring-white/10",
            ].join(" ")}
            aria-label={`Thumbnail ${i + 1}`}
          >
            <img src={u} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </>
  );

  const detailsSection = (
    <div className="md:sticky md:top-24">
      <div className="flex flex-wrap items-center gap-2 md:gap-3 mt-3 md:mt-0">
        <div className="rounded-lg bg-blue-600/20 ring-1 ring-blue-500/30 px-3 py-1 text-[11px] font-extrabold tracking-wide text-blue-300">
          AUDIO PRO ELITE
        </div>
        <div className="rounded-lg bg-emerald-600/20 ring-1 ring-emerald-500/30 px-3 py-1 text-[11px] font-extrabold tracking-wide text-emerald-300">
          IN STOCK
        </div>
      </div>

      <div className="mt-3 text-xl md:text-2xl lg:text-3xl font-black leading-tight">
        {product.name}
      </div>

      <div className="mt-2 flex items-center gap-2 text-sm text-slate-300">
        <div className="flex items-center gap-1 text-blue-300">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={[
                "h-4 w-4",
                i < Math.round(product.rating)
                  ? "fill-blue-500 text-blue-500"
                  : "text-slate-500",
              ].join(" ")}
            />
          ))}
        </div>
        <div className="font-semibold text-slate-200">
          {product.rating.toFixed(1)}
        </div>
        <div className="text-slate-400">
          ({product.reviewCount.toLocaleString()} Reviews)
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-end gap-3">
        <div className="text-2xl md:text-3xl font-black">
          ${product.price.toFixed(2)}
        </div>
        {product.compareAtPrice ? (
          <div className="pb-1 text-slate-500 line-through">
            ${product.compareAtPrice.toFixed(2)}
          </div>
        ) : null}
        <button
          type="button"
          onClick={() => setWished((v) => !v)}
          className="md:ml-auto inline-flex items-center gap-2 rounded-2xl bg-white/5 ring-1 ring-white/10 px-4 py-2 font-semibold hover:bg-white/10"
        >
          <Heart
            className={[
              "h-5 w-5",
              wished ? "fill-rose-500 text-rose-500" : "text-slate-200",
            ].join(" ")}
          />
          <span className="text-sm">{wished ? "Saved" : "Save"}</span>
        </button>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 md:gap-4 text-sm">
        <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-4">
          <div className="text-[11px] font-semibold tracking-widest text-slate-500">
            SKU NUMBER
          </div>
          <div className="mt-1 font-bold">{product.sku}</div>
        </div>
        <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-4">
          <div className="text-[11px] font-semibold tracking-widest text-slate-500">
            QUANTITY
          </div>
          <div className="mt-2 inline-flex w-full items-center justify-between rounded-2xl bg-slate-900/60 ring-1 ring-white/10 px-3 py-2">
            <button
              type="button"
              onClick={() => setQty((q) => clamp(q - 1, 1, 99))}
              className="h-8 w-8 rounded-xl bg-white/5 ring-1 ring-white/10 hover:bg-white/10 font-black"
            >
              –
            </button>
            <div className="text-base font-black">{qty}</div>
            <button
              type="button"
              onClick={() => setQty((q) => clamp(q + 1, 1, 99))}
              className="h-8 w-8 rounded-xl bg-white/5 ring-1 ring-white/10 hover:bg-white/10 font-black"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* CTA - visible on desktop, hidden on mobile (fixed bar below) */}
      <div className="hidden md:grid mt-6 grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => nav("/customer/cart")}
          className="rounded-2xl bg-white/5 ring-1 ring-white/10 py-4 font-bold hover:bg-white/10 transition"
        >
          Add to Cart
        </button>
        <button
          type="button"
          onClick={() => nav("/customer/cart")}
          className="rounded-2xl bg-blue-600 py-4 font-bold hover:bg-blue-500 transition"
        >
          Buy Now
        </button>
      </div>
    </div>
  );

  return (
    <div className="-mx-4 sm:mx-0">
      <div className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60 border-b border-white/5 md:border-0">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => nav(-1)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-200 hover:text-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="text-sm md:text-base font-bold tracking-wide">
              Product Details
            </div>
            <div className="flex items-center gap-2">
              <IconButton ariaLabel="Share" onClick={() => void 0}>
                <Share2 className="h-5 w-5" />
              </IconButton>
              <div className="relative">
                <IconButton
                  ariaLabel="Cart"
                  onClick={() => nav("/customer/cart")}
                >
                  <ShoppingBag className="h-5 w-5" />
                </IconButton>
                <div className="absolute -right-1 -top-1 h-5 min-w-5 rounded-full bg-blue-600 px-1 text-[11px] font-extrabold grid place-items-center">
                  2
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-4 md:mt-6 grid md:grid-cols-2 lg:grid-cols-[1fr,minmax(380px,1fr)] gap-6 lg:gap-10">
          <div className="min-w-0">{gallerySection}</div>
          <div className="min-w-0">{detailsSection}</div>
        </div>

        <div className="mt-8 md:mt-10">
          <div className="text-lg md:text-xl font-black">
            Product Description
          </div>
          <p className="mt-2 text-sm md:text-base leading-relaxed text-slate-300">
            Experience sound like never before with the {product.name}.
            Featuring industry-leading Active Noise Cancellation (ANC), 40mm
            custom dynamic drivers, and a massive 50-hour battery life. Perfect
            for commuters, audiophiles, and everyday listeners.
          </p>
          <ul className="mt-4 space-y-3 text-sm md:text-base text-slate-200">
            {product.shortSpecs.map((s) => (
              <li key={s} className="flex items-start gap-3">
                <span className="mt-1 h-5 w-5 shrink-0 rounded-full bg-blue-600/20 ring-1 ring-blue-500/30 grid place-items-center text-blue-300">
                  ✓
                </span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 md:mt-8 grid sm:grid-cols-2 gap-4 rounded-3xl bg-white/5 ring-1 ring-white/10 p-4 md:p-5">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 shrink-0 rounded-2xl bg-slate-900/60 ring-1 ring-white/10 grid place-items-center">
              🚚
            </div>
            <div>
              <div className="font-black">Free Express Shipping</div>
              <div className="text-sm text-slate-400">
                Delivered by Thursday, Oct 24th
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 shrink-0 rounded-2xl bg-slate-900/60 ring-1 ring-white/10 grid place-items-center">
              ↩
            </div>
            <div>
              <div className="font-black">30‑Day Easy Returns</div>
              <div className="text-sm text-slate-400">
                Free return labels provided for all orders
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 md:mt-8 rounded-3xl bg-white/5 ring-1 ring-white/10 p-5 md:p-6">
          <div className="text-lg md:text-xl font-black">Customer Reviews</div>
          <div className="mt-4 flex items-end gap-4">
            <div className="text-4xl md:text-5xl font-black leading-none">
              {product.rating.toFixed(1)}
            </div>
            <div>
              <div className="flex items-center gap-1 text-blue-300">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={[
                      "h-4 w-4",
                      i < Math.round(product.rating)
                        ? "fill-blue-500 text-blue-500"
                        : "text-slate-500",
                    ].join(" ")}
                  />
                ))}
              </div>
              <div className="mt-1 text-sm text-slate-400">
                {product.reviewCount.toLocaleString()} reviews
              </div>
            </div>
          </div>

          <div className="mt-5 space-y-3 text-sm max-w-md">
            {[
              { stars: 5, pct: 80 },
              { stars: 4, pct: 10 },
              { stars: 3, pct: 5 },
              { stars: 2, pct: 3 },
              { stars: 1, pct: 2 },
            ].map((r) => (
              <div key={r.stars} className="flex items-center gap-3">
                <div className="w-3 text-slate-400">{r.stars}</div>
                <div className="h-2 flex-1 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-blue-600"
                    style={{ width: `${r.pct}%` }}
                  />
                </div>
                <div className="w-10 text-right text-slate-400">{r.pct}%</div>
              </div>
            ))}
          </div>
        </div>

        <div className="h-24 md:h-12" />
      </div>

      {/* Mobile fixed CTA - hidden on desktop */}
      <div className="fixed inset-x-0 bottom-0 z-40 md:hidden">
        <div className="mx-auto w-full max-w-lg px-4 pb-4">
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => nav("/customer/cart")}
              className="rounded-2xl bg-white/5 ring-1 ring-white/10 py-4 font-bold hover:bg-white/10 transition"
            >
              Add to Cart
            </button>
            <button
              type="button"
              onClick={() => nav("/customer/cart")}
              className="rounded-2xl bg-blue-600 py-4 font-bold hover:bg-blue-500 transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
