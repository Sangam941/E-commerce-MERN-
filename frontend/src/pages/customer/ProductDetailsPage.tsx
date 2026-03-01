import { ChevronLeft, Heart, Share2, ShoppingBag, Star } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { products } from "../../data/customerDummy";
import { IconButton } from "../../components/customer/ui/IconButton";
import { useCart } from "../../context/CartContext";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function ProductDetailsPage() {
  const nav = useNavigate();
  const { productId } = useParams();

  const { addToCart, cart} = useCart()

  const product = useMemo(
    () => products.find((p) => p.id === productId) ?? products[0],
    [productId],
  );

  const [activeIdx, setActiveIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [wished, setWished] = useState(false);

  const cartCount = useMemo(() => 
    cart.reduce((acc, item) => acc + item.qty, 0),
    [cart]
  )

  const handleAddToCart = (goToCart: boolean) => {
    addToCart({
      id: `${product.id}-default`,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      qty: qty,
      variantLabel: "Standard Edition",
    });

     if(goToCart) {
      nav("/customer/cart");
    }else {
      alert(`Added ${qty} item(s) to your bag!`)
    }
  }

 

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

      <div className="mt-3 text-xl md:text-2xl lg:text-3xl font-black leading-tight text-white">
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

      <div className="mt-4 flex flex-wrap items-end gap-3 text-white">
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
          className="md:ml-auto inline-flex items-center gap-2 rounded-2xl bg-white/5 ring-1 ring-white/10 px-4 py-2 font-semibold hover:bg-white/10 transition-colors"
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
          <div className="mt-1 font-bold text-white">{product.sku}</div>
        </div>
        <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-4">
          <div className="text-[11px] font-semibold tracking-widest text-slate-500">
            QUANTITY
          </div>
          <div className="mt-2 inline-flex w-full items-center justify-between rounded-2xl bg-slate-900/60 ring-1 ring-white/10 px-3 py-2">
            <button
              type="button"
              onClick={() => setQty((q) => clamp(q - 1, 1, 99))}
              className="h-8 w-8 rounded-xl bg-white/5 ring-1 ring-white/10 hover:bg-white/10 font-black text-white"
            >
              –
            </button>
            <div className="text-base font-black text-white">{qty}</div>
            <button
              type="button"
              onClick={() => setQty((q) => clamp(q + 1, 1, 99))}
              className="h-8 w-8 rounded-xl bg-white/5 ring-1 ring-white/10 hover:bg-white/10 font-black text-white"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* CTA - visible on desktop, hidden on mobile */}
      <div className="hidden md:grid mt-6 grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => handleAddToCart(false)} // Add and stay
          className="rounded-2xl bg-white/5 ring-1 ring-white/10 py-4 font-bold text-white hover:bg-white/10 transition active:scale-95"
        >
          Add to Cart
        </button>
        <button
          type="button"
          onClick={() => handleAddToCart(true)} // Add and go to Cart
          className="rounded-2xl bg-blue-600 py-4 font-bold text-white hover:bg-blue-500 transition shadow-lg shadow-blue-600/20 active:scale-95"
        >
          Buy Now
        </button>
      </div>
    </div>
  );

  return (
    <div className="-mx-4 sm:mx-0">
      {/* Header with Dynamic Badge */}
      <div className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur border-b border-white/5 md:border-0">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <button type="button" onClick={() => nav(-1)} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-200">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="text-sm md:text-base font-bold tracking-wide">Product Details</div>
            <div className="flex items-center gap-2">
              <IconButton ariaLabel="Share" onClick={() => void 0}><Share2 className="h-5 w-5" /></IconButton>
              <div className="relative">
                <IconButton ariaLabel="Cart" onClick={() => nav("/customer/cart")}>
                  <ShoppingBag className="h-5 w-5" />
                </IconButton>
                {/* DYNAMIC BADGE */}
                {cartCount > 0 && (
                  <div className="absolute -right-1 -top-1 h-5 min-w-5 rounded-full bg-blue-600 px-1 text-[11px] font-extrabold grid place-items-center">
                    {cartCount}
                  </div>
                )}
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
        {/* ... (keep description and reviews sections) ... */}
      </div>

      {/* 5. REFINED MOBILE FIXED CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 md:hidden p-4">
        <div className="mx-auto w-full max-w-lg">
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleAddToCart(false)}
              className="rounded-2xl bg-slate-900/90 backdrop-blur ring-1 ring-white/10 py-4 font-bold text-white transition active:scale-95"
            >
              Add to Cart
            </button>
            <button
              type="button"
              onClick={() => handleAddToCart(true)}
              className="rounded-2xl bg-blue-600 py-4 font-bold text-white shadow-xl shadow-blue-600/30 transition active:scale-95"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
