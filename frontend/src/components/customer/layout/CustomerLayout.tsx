import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Heart, House, ReceiptText, ShoppingBag, User } from "lucide-react";
import { IconButton } from "../ui/IconButton";

const navItems = [
  { id: "home", label: "Home", icon: House, href: "/customer/home" },
  {
    id: "wishlist",
    label: "Wishlist",
    icon: Heart,
    href: "/customer/wishlist",
  },
  {
    id: "orders",
    label: "Orders",
    icon: ReceiptText,
    href: "/customer/orders",
  },
  { id: "profile", label: "Profile", icon: User, href: "/customer/profile" },
] as const;

/* ---------------- TOP BAR ---------------- */

function TopBar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-30 bg-slate-950/90 backdrop-blur border-b border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => navigate("/customer/home")}
            className="flex items-center gap-2"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
              <ShoppingBag className="h-4 w-4 text-white shrink-0" />
            </span>
            <span className="text-lg font-bold tracking-tight">ShopEase</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-1">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.href)}
                  aria-current={active ? "page" : undefined}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition
                    ${
                      active
                        ? "bg-blue-600/20 text-blue-400"
                        : "text-slate-300 hover:bg-white/5 hover:text-white"
                    }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-2">
            <IconButton
              ariaLabel="Cart"
              onClick={() => navigate("/customer/cart")}
            >
              <ShoppingBag className="h-5 w-5 shrink-0" />
            </IconButton>
            <IconButton
              ariaLabel="Profile"
              onClick={() => navigate("/customer/profile")}
            >
              <User className="h-5 w-5 shrink-0" />
            </IconButton>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ---------------- BOTTOM NAV (MOBILE) ---------------- */

function BottomNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 md:hidden">
      <div className="mx-auto max-w-lg px-4 pb-4">
        <div className="rounded-2xl bg-slate-900/90 ring-1 ring-white/10 backdrop-blur">
          <div className="grid grid-cols-4">
            {navItems.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.href)}
                  aria-current={active ? "page" : undefined}
                  className={`flex flex-col items-center justify-center gap-1 py-3 text-[10px] font-semibold
                    ${
                      active
                        ? "text-blue-400"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  <span className="tracking-wide">
                    {item.label.toUpperCase()}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- LAYOUT ---------------- */

export function CustomerLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <TopBar />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24 md:pb-12">
        <div className="py-4">
          <Outlet />
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
