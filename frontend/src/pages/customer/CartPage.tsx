import { ChevronLeft, Minus, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { CartLine } from "../../data/customerDummy";
import { initialCart } from "../../data/customerDummy";

function money(n: number) {
  return `$${n.toFixed(2)}`;
}

export default function CartPage() {
  const nav = useNavigate();
  const [lines, setLines] = useState<CartLine[]>(() => initialCart);

  const subtotal = useMemo(
    () => lines.reduce((s, l) => s + l.price * l.qty, 0),
    [lines],
  );
  const shipping = 0;
  const tax = 7.25;
  const total = subtotal + shipping + tax;

  const orderSummary = (showButton: boolean) => (
    <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 p-5 md:p-6 lg:sticky lg:top-24">
      <div className="flex items-center justify-between text-slate-300">
        <div>Subtotal</div>
        <div>{money(subtotal)}</div>
      </div>
      <div className="mt-3 flex items-center justify-between text-slate-300">
        <div>Shipping Fee</div>
        <div className="text-emerald-400">
          {shipping === 0 ? "Free" : money(shipping)}
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between text-slate-300">
        <div>Tax</div>
        <div>{money(tax)}</div>
      </div>
      <div className="mt-4 h-px bg-white/10" />
      <div className="mt-4 flex items-end justify-between">
        <div className="text-xl md:text-2xl font-black">Total</div>
        <div className="text-2xl md:text-3xl font-black text-blue-500">
          {money(total)}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
        <span className="inline-block">🔒</span>
        <span className="tracking-widest">SECURE SSL ENCRYPTED CHECKOUT</span>
      </div>
      {showButton && (
        <button
          type="button"
          className="mt-5 w-full rounded-2xl bg-blue-600 py-4 text-base md:text-lg font-black hover:bg-blue-500 transition"
        >
          Place Order
        </button>
      )}
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
            <div className="text-xl md:text-2xl font-black tracking-tight">
              My Cart
            </div>
            <div className="w-10" />
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-4 md:mt-6 grid lg:grid-cols-[1fr,minmax(340px,400px)] gap-6 lg:gap-8">
          {/* Left: cart items, shipping, payment */}
          <div className="min-w-0 space-y-6 md:space-y-8">
            <div className="space-y-4">
              {lines.map((l) => (
                <div
                  key={l.id}
                  className="rounded-3xl bg-white/5 ring-1 ring-white/10 p-4"
                >
                  <div className="flex gap-4">
                    <div className="h-16 w-16 md:h-20 md:w-20 rounded-2xl overflow-hidden bg-slate-900 ring-1 ring-white/10 shrink-0">
                      <img
                        src={l.image}
                        alt={l.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-base md:text-lg font-black leading-tight">
                        {l.name}
                      </div>
                      <div className="mt-1 text-sm text-slate-400">
                        {l.variantLabel}
                      </div>
                      <div className="mt-2 text-lg md:text-xl font-extrabold text-blue-500">
                        {money(l.price)}
                      </div>
                    </div>
                    <div className="shrink-0">
                      <div className="inline-flex items-center gap-3 rounded-2xl bg-slate-900/60 ring-1 ring-white/10 px-3 py-2">
                        <button
                          type="button"
                          onClick={() =>
                            setLines((prev) =>
                              prev.map((x) =>
                                x.id === l.id
                                  ? { ...x, qty: Math.max(1, x.qty - 1) }
                                  : x,
                              ),
                            )
                          }
                          className="h-8 w-8 rounded-xl bg-white/5 ring-1 ring-white/10 hover:bg-white/10 grid place-items-center"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <div className="w-5 text-center font-black">
                          {l.qty}
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            setLines((prev) =>
                              prev.map((x) =>
                                x.id === l.id ? { ...x, qty: x.qty + 1 } : x,
                              ),
                            )
                          }
                          className="h-8 w-8 rounded-xl bg-white/5 ring-1 ring-white/10 hover:bg-white/10 grid place-items-center"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <div className="text-xl md:text-2xl font-black">
                Shipping Address
              </div>
              <div className="mt-3 rounded-3xl bg-white/5 ring-1 ring-white/10 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-12 w-12 shrink-0 rounded-2xl bg-slate-900/60 ring-1 ring-white/10 grid place-items-center">
                      🗺
                    </div>
                    <div className="min-w-0">
                      <div className="font-black">Home Address</div>
                      <div className="text-sm text-slate-400">
                        123 Apple Street, Cupertino, CA 95014
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="text-blue-400 font-semibold hover:text-blue-300 shrink-0"
                  >
                    Change
                  </button>
                </div>
              </div>
            </div>

            <div>
              <div className="text-xl md:text-2xl font-black">
                Payment Method
              </div>
              <div className="mt-3 rounded-3xl bg-white/5 ring-1 ring-white/10 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-12 w-12 shrink-0 rounded-2xl bg-slate-900/60 ring-1 ring-white/10 grid place-items-center">
                      💳
                    </div>
                    <div>
                      <div className="font-black">Visa Ending in 4242</div>
                      <div className="text-sm text-slate-400">
                        Expires 12/26
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="text-blue-400 font-semibold hover:text-blue-300 shrink-0"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>

            {/* Order summary - mobile (no button, fixed bar below) */}
            <div className="lg:hidden">{orderSummary(false)}</div>
          </div>

          {/* Right: order summary sidebar - desktop (with button) */}
          <div className="hidden lg:block">{orderSummary(true)}</div>
        </div>

        <div className="h-24 lg:h-12" />
      </div>

      {/* Mobile fixed CTA - hidden on desktop */}
      <div className="fixed inset-x-0 bottom-0 z-40 lg:hidden">
        <div className="mx-auto w-full max-w-lg px-4 pb-4">
          <button
            type="button"
            className="w-full rounded-2xl bg-blue-600 py-4 text-lg font-black hover:bg-blue-500 transition"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
