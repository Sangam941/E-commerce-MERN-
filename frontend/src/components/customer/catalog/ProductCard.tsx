import { Heart, ShoppingCart } from "lucide-react";
import type { Product, CartLine } from "../../../data/customerDummy";
import { IconButton } from "../ui/IconButton";

type MaybeProduct = Product | CartLine;

type Props = {
  product: MaybeProduct;
  wished: boolean;
  onToggleWish: () => void;
  onAddToCart: () => void;
  onOpen: () => void;
};

export function ProductCard({ product, wished, onToggleWish, onAddToCart, onOpen }: Props) {
  const image = Array.isArray((product as Product).images) ? (product as Product).images[0] : (product as CartLine).image;
  const name = (product as any).name ?? "";
  const price = (product as any).price ?? 0;
  const categoryLabel = (product as any).categoryLabel ?? "";
  const badge = (product as any).badge ?? undefined;

  return (
    <div className="rounded-2xl md:rounded-3xl bg-white/5 ring-1 ring-white/10 overflow-hidden hover:ring-white/20 transition">
      <div className="relative aspect-[4/3] w-full bg-slate-900">
        <img src={image} alt={name} className="h-full w-full object-cover opacity-95" loading="lazy" />

        <div className="absolute right-3 top-3 z-10">
          <IconButton ariaLabel={wished ? "Remove from wishlist" : "Add to wishlist"} onClick={onToggleWish} className="bg-slate-950/40">
            <Heart className={["h-5 w-5", wished ? "fill-rose-500 text-rose-500" : "text-slate-200"].join(" ")} />
          </IconButton>
        </div>

        {badge ? <div className="absolute left-3 top-3 rounded-lg bg-blue-600 px-2 py-1 text-xs font-bold">{badge}</div> : null}

        <button type="button" onClick={onOpen} className="absolute inset-0 z-0" aria-label={`Open ${name}`} />
      </div>

      <div className="p-3 sm:p-4">
        <div className="text-[10px] sm:text-xs text-slate-400">{categoryLabel}</div>
        <div className="mt-1 line-clamp-1 text-sm sm:text-base font-bold">{name}</div>

        <div className="mt-2 flex items-end justify-between gap-2">
          <div className="text-blue-500 text-base sm:text-lg font-extrabold">${price.toFixed(2)}</div>
          <IconButton ariaLabel="Add to cart" onClick={onAddToCart} className="bg-blue-600 hover:bg-blue-500">
            <ShoppingCart className="h-5 w-5" />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
