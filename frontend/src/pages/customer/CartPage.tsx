import { ChevronLeft, Minus, Plus, Trash2, ShoppingBag, Zap, Loader2 } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOrders } from "../../context/OrderContext";
import { useCart } from "../../context/CartContext";

// Example product data for the "Add Products" section
const SUGGESTED_PRODUCTS = [
  { id: 'p1', name: 'Premium Case', price: 29.99, image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=200', variantLabel: 'Midnight Blue' },
  { id: 'p2', name: 'Glass Protector', price: 15.00, image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&q=80&w=200', variantLabel: '9H Tempered' },
];

function money(n: number) {
  return `$${n.toFixed(2)}`;
}

export default function CartPage() {
  const nav = useNavigate();
  const [isPlacing, setIsPlacing] = useState(false);
  const { addOrder } = useOrders();
  const { cart: lines, updateQty, removeFromCart, clearCart, addToCart } = useCart();

  const subtotal = useMemo(
    () => lines.reduce((s, l) => s + l.price * l.qty, 0),
    [lines],
  );

  const shipping = lines.length > 0 ? 10 : 0;
  const tax = lines.length > 0 ? subtotal * 0.0725 : 0;
  const total = subtotal + shipping + tax;

  const handlePlaceOrder = async () => {
    if (lines.length === 0 || isPlacing) return;

    setIsPlacing(true);

    // Simulate a brief processing delay for better UX
    setTimeout(() => {
      const newOrder = {
        id: `ORD-${Math.random().toString(36).substring(2, 11).toUpperCase()}`,
        date: new Date().toISOString(),
        items: [...lines],
        total: total,
        status: 'Processing' as const,
      };

      addOrder(newOrder);
      clearCart();
      nav("/customer/orders", { replace: true });
      setIsPlacing(false);
    }, 800);
  };

  const handleQuickAdd = (product: typeof SUGGESTED_PRODUCTS[0]) => {
    addToCart({
      id: `${product.id}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      qty: 1,
      variantLabel: product.variantLabel
    });
  };

  if (lines.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
        <div className="h-20 w-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
          <ShoppingBag className="h-10 w-10 text-slate-500" />
        </div>
        <h2 className="text-2xl font-black text-white">Your cart is empty</h2>
        <p className="text-slate-400 mt-2">Add some items to get started!</p>
        <button
          onClick={() => nav("/")}
          className="mt-6 bg-blue-600 px-8 py-3 rounded-2xl font-bold text-white hover:bg-blue-500 transition-all active:scale-95"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  const orderSummary = (showButton: boolean) => (
    <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 p-5 md:p-6 lg:sticky lg:top-24">
      <h3 className="text-lg font-black text-white mb-4">Order Summary</h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between text-slate-400 text-sm">
          <div>Subtotal</div>
          <div className="font-bold text-slate-200">{money(subtotal)}</div>
        </div>
        <div className="flex items-center justify-between text-slate-400 text-sm">
          <div>Shipping Fee</div>
          <div className="text-emerald-400 font-bold">{money(shipping)}</div>
        </div>
        <div className="flex items-center justify-between text-slate-400 text-sm">
          <div>Estimated Tax</div>
          <div className="font-bold text-slate-200">{money(tax)}</div>
        </div>
      </div>
      <div className="mt-4 h-px bg-white/10" />
      <div className="mt-4 flex items-end justify-between">
        <div className="text-xl font-black text-white">Total</div>
        <div className="text-2xl font-black text-blue-500">{money(total)}</div>
      </div>
      {showButton && (
        <button
          disabled={isPlacing}
          onClick={handlePlaceOrder}
          className="mt-6 w-full flex items-center justify-center gap-2 rounded-2xl bg-blue-600 py-4 text-lg font-black text-white hover:bg-blue-500 transition active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPlacing ? (
            <>
              <Loader2 className="animate-spin" /> Processing...
            </>
          ) : "Place Order"}
        </button>
      )}
    </div>
  );

  return (
    <div className="pb-32 lg:pb-10">
      <div className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur border-b border-white/5 py-3">
        <div className="mx-auto max-w-7xl px-4 flex items-center justify-between">
          <button onClick={() => nav(-1)} className="p-2 hover:bg-white/5 rounded-full transition text-white">
            <ChevronLeft />
          </button>
          <div className="text-xl font-black text-white">My Bag ({lines.length})</div>
          <div className="w-10" />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6">
        <div className="grid lg:grid-cols-[1fr,380px] gap-8">
          <div className="space-y-8">
            <div className="space-y-4">
              {lines.map((l) => (
                <div key={l.id} className="rounded-3xl bg-white/5 ring-1 ring-white/10 p-4 flex gap-4 transition-all hover:bg-white/[0.07]">
                  <img src={l.image} alt={l.name} className="h-24 w-24 rounded-2xl object-cover bg-slate-900 ring-1 ring-white/5" />
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <h4 className="font-black text-white truncate text-lg">{l.name}</h4>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{l.variantLabel}</p>
                    <p className="mt-1 text-blue-500 font-black text-lg">{money(l.price)}</p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button 
                      onClick={() => removeFromCart(l.id)}
                      className="p-2 text-slate-500 hover:text-rose-500 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                    <div className="flex items-center gap-3 bg-slate-900/80 rounded-2xl p-1.5 ring-1 ring-white/10">
                      <button
                        onClick={() => l.qty > 1 && updateQty(l.id, l.qty - 1)}
                        className="h-8 w-8 rounded-xl bg-white/5 grid place-items-center hover:bg-white/10 transition text-white disabled:opacity-30"
                        disabled={l.qty <= 1}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-4 text-center font-black text-white">{l.qty}</span>
                      <button
                        onClick={() => updateQty(l.id, l.qty + 1)}
                        className="h-8 w-8 rounded-xl bg-white/5 grid place-items-center hover:bg-white/10 transition text-white"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <div className="flex items-center gap-2 mb-4 text-white">
                <Zap className="text-yellow-400 fill-yellow-400" size={20} />
                <h3 className="text-xl font-black">Quick Add-ons</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SUGGESTED_PRODUCTS.map((p) => (
                  <div key={p.id} className="bg-white/5 ring-1 ring-white/10 p-3 rounded-3xl flex items-center justify-between group hover:ring-blue-500/50 transition-all">
                    <div className="flex items-center gap-3">
                      <img src={p.image} className="h-14 w-14 rounded-2xl object-cover bg-slate-800" alt="" />
                      <div>
                        <div className="text-sm font-black text-white">{p.name}</div>
                        <div className="text-xs text-blue-400 font-bold">{money(p.price)}</div>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleQuickAdd(p)}
                      className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center hover:bg-blue-500 active:scale-90 transition shadow-lg shadow-blue-600/20"
                    >
                      <Plus className="text-white" size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden lg:block">{orderSummary(true)}</div>
        </div>
      </div>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 p-4 bg-slate-950/90 backdrop-blur-xl border-t border-white/10">
        <button 
          disabled={isPlacing}
          onClick={handlePlaceOrder} 
          className="w-full rounded-2xl bg-blue-600 py-4 text-lg font-black text-white shadow-xl shadow-blue-600/20 active:scale-95 disabled:opacity-50"
        >
          {isPlacing ? "Processing Order..." : `Checkout — ${money(total)}`}
        </button>
      </div>
    </div>
  );
}