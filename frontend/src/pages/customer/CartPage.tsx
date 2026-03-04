import { ChevronLeft, Minus, Plus, Trash2, ShoppingBag, Zap, Loader2, ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOrders } from "../../context/OrderContext";
import { useCart } from "../../context/CartContext";

const SUGGESTED_PRODUCTS = [
  { id: 'p1', name: 'Premium Case', price: 29.99, image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=200', variantLabel: 'Midnight Blue' },
  { id: 'p2', name: 'Glass Protector', price: 15.00, image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&q=80&w=200', variantLabel: '9H Tempered' },
];

const money = (n: number) => `$${n.toFixed(2)}`;

export default function CartPage() {
  const nav = useNavigate();
  const [isPlacing, setIsPlacing] = useState(false);
  
  const { addOrder } = useOrders();
  const { cart: lines, updateQty, removeFromCart, clearCart, addToCart } = useCart();

  // Calculations
  const subtotal = useMemo(() => lines.reduce((s, l) => s + l.price * l.qty, 0), [lines]);
  const shipping = lines.length > 0 ? 10 : 0;
  const tax = lines.length > 0 ? subtotal * 0.0725 : 0;
  const total = subtotal + shipping + tax;

  const handlePlaceOrder = async () => {
    if (lines.length === 0 || isPlacing) return;

    setIsPlacing(true);

    setTimeout(() => {
      addOrder([...lines], total);
      
      clearCart();
      nav("/customer/orders", { replace: true });
      setIsPlacing(false);
    }, 1000);
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
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
        <div className="h-24 w-24 rounded-full bg-blue-600/10 flex items-center justify-center mb-6 ring-1 ring-blue-500/20">
          <ShoppingBag className="h-10 w-10 text-blue-500" />
        </div>
        <h2 className="text-3xl font-black text-white">Your bag is empty</h2>
        <p className="text-slate-400 mt-3 max-w-xs">Looks like you haven't added anything to your bag yet.</p>
        <button
          onClick={() => nav("/")}
          className="mt-8 bg-blue-600 px-10 py-4 rounded-2xl font-bold text-white hover:bg-blue-500 transition-all active:scale-95 shadow-lg shadow-blue-600/20 flex items-center gap-2"
        >
          Start Shopping <ArrowRight size={18} />
        </button>
      </div>
    );
  }

  const summaryCard = (
    <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 p-6 backdrop-blur-sm lg:sticky lg:top-24">
      <h3 className="text-xl font-black text-white mb-6">Summary</h3>
      <div className="space-y-4">
        <div className="flex justify-between text-slate-400">
          <span>Subtotal</span>
          <span className="font-bold text-white">{money(subtotal)}</span>
        </div>
        <div className="flex justify-between text-slate-400">
          <span>Shipping</span>
          <span className="font-bold text-emerald-400">{money(shipping)}</span>
        </div>
        <div className="flex justify-between text-slate-400">
          <span>Tax</span>
          <span className="font-bold text-white">{money(tax)}</span>
        </div>
        <div className="h-px bg-white/10 my-2" />
        <div className="flex justify-between items-end">
          <span className="text-lg font-bold text-white">Total</span>
          <span className="text-3xl font-black text-blue-500">{money(total)}</span>
        </div>
      </div>

      <button
        disabled={isPlacing}
        onClick={handlePlaceOrder}
        className="mt-8 w-full flex items-center justify-center gap-3 rounded-2xl bg-blue-600 py-5 text-lg font-black text-white hover:bg-blue-500 transition-all active:scale-[0.98] disabled:opacity-50 shadow-xl shadow-blue-600/20"
      >
        {isPlacing ? (
          <>
            <Loader2 className="animate-spin" size={20} /> Processing...
          </>
        ) : (
          "Place Order"
        )}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 pb-24 lg:pb-12">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => nav(-1)} className="p-2 -ml-2 hover:bg-white/5 rounded-full text-white transition">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-lg font-black uppercase tracking-tight">Your Bag ({lines.length})</h1>
          <div className="w-8" />
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-[1fr,400px] gap-12">
          
          {/* List Section */}
          <div className="space-y-10">
            <div className="space-y-4">
              {lines.map((item) => (
                <div key={item.id} className="group relative rounded-3xl bg-white/5 border border-white/5 p-4 flex gap-5 transition-all hover:bg-white/[0.08]">
                  <div className="h-28 w-28 shrink-0 rounded-2xl overflow-hidden bg-slate-900 border border-white/10">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-black text-white text-lg leading-tight">{item.name}</h4>
                        <button onClick={() => removeFromCart(item.id)} className="text-slate-600 hover:text-rose-500 transition p-1">
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <p className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-tighter italic">{item.variantLabel}</p>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <span className="text-xl font-black text-blue-500">{money(item.price)}</span>
                      
                      <div className="flex items-center gap-3 bg-slate-900/50 rounded-2xl p-1 border border-white/5">
                        <button
                          onClick={() => item.qty > 1 && updateQty(item.id, item.qty - 1)}
                          className="h-9 w-9 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition disabled:opacity-20"
                          disabled={item.qty <= 1}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-4 text-center font-black text-white text-sm">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          className="h-9 w-9 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recommendations */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-yellow-500/10 text-yellow-500">
                  <Zap size={20} fill="currentColor" />
                </div>
                <h3 className="text-xl font-black text-white">Recommended for you</h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {SUGGESTED_PRODUCTS.map((p) => (
                  <div key={p.id} className="bg-white/5 border border-white/5 p-3 rounded-3xl flex items-center justify-between group hover:border-blue-500/30 transition-all">
                    <div className="flex items-center gap-4">
                      <img src={p.image} className="h-14 w-14 rounded-2xl object-cover grayscale group-hover:grayscale-0 transition-all" alt="" />
                      <div>
                        <div className="text-sm font-black text-white">{p.name}</div>
                        <div className="text-xs text-blue-400 font-bold">{money(p.price)}</div>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleQuickAdd(p)}
                      className="h-10 w-10 rounded-xl bg-white/5 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-all active:scale-90"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Summary */}
          <aside className="hidden lg:block">
            {summaryCard}
          </aside>
        </div>
      </main>

      {/* Mobile Footer */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-slate-950/90 backdrop-blur-xl border-t border-white/5 z-50">
        <button 
          disabled={isPlacing}
          onClick={handlePlaceOrder}
          className="w-full rounded-2xl bg-blue-600 py-4 font-black text-white shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3"
        >
          {isPlacing ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>Checkout &bull; {money(total)}</>
          )}
        </button>
      </div>
    </div>
  );
}