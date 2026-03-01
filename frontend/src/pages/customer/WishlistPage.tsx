import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { ProductCard } from "../../components/customer/catalog/ProductCard";
import { useNavigate } from "react-router-dom";
import { HeartOff } from "lucide-react";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const nav = useNavigate();

  return (
    <div className="pb-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-black">My Wishlist</h1>
        <span className="text-sm text-slate-400 bg-white/5 px-3 py-1 rounded-full ring-1 ring-white/10">
          {wishlist.length} Items
        </span>
      </div>

      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 rounded-3xl bg-white/5 ring-1 ring-white/10 border-dashed border-2 border-white/5">
          <HeartOff className="h-12 w-12 text-slate-600 mb-4" />
          <div className="text-xl font-bold text-slate-300">Your wishlist is empty</div>
          <p className="text-slate-500 mb-6">Save items you love to find them later.</p>
          <button 
            onClick={() => nav("/customer/home")}
            className="bg-blue-600 px-6 py-2 rounded-xl font-bold hover:bg-blue-500 transition"
          >
            Explore Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {wishlist.map((p) => (
            <ProductCard
              key={p.id}
              product={p as any}
              wished={true} // It's in the wishlist page, so it's always true
              onToggleWish={() => removeFromWishlist(p.id)}
              onAddToCart={() => {
                addToCart(p as any);
                nav("/customer/cart");
              }}
              onOpen={() => nav(`/customer/product/${p.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}