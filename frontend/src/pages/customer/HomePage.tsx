import {
  SlidersHorizontal,
  Tag,
  Shirt,
  House,
  Dumbbell,
  Watch,
  Search,
} from "lucide-react";
import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import type { CategoryId, CartLine } from "../../data/customerDummy";
import { categories, products } from "../../data/customerDummy";
import { ProductCard } from "../../components/customer/catalog/ProductCard";
import FilterButton from "../../components/customer/catalog/filterButton";
import type {FilterCriteria} from '../../components/customer/catalog/filterButton'
import SortButton from "../../components/customer/catalog/SortButton";
import type { SortOption } from "../../components/customer/catalog/SortButton";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";


const iconByCategory: Partial<Record<CategoryId, ReactNode>> = {
  electronics: <Tag className="h-4 w-4" />,
  fashion: <Shirt className="h-4 w-4" />,
  accessories: <Watch className="h-4 w-4" />,
  home: <House className="h-4 w-4" />,
  sports: <Dumbbell className="h-4 w-4" />,
};



export default function HomePage() {
  const nav = useNavigate();
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<CategoryId>("all");
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();

  const [advancedFilters, setAdvancedFilters] = useState<FilterCriteria>({
    category: '',
    maxPrice: 1000,
    onlySale: false,
    onlyInStock: false,
    minRating: 0,
  })

  const [sortBy, setSortBy] = useState<SortOption>("featured")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    let result = products.filter((p) => {
      const matchesQuery = q ? p.name.toLowerCase().includes(q) : true;
      
      const matchesTab = cat === "all" ? true : p.categoryId === cat;

      const matchesSale = advancedFilters.onlySale ? (p.badge === 'SALE' || !!p.compareAtPrice) : true;
      
      const matchesStock = advancedFilters.onlyInStock ? p.isInStock : true;

      const matchesPrice = p.price <= (advancedFilters.maxPrice || Infinity)

      return matchesQuery && matchesTab && matchesSale && matchesStock && matchesPrice;
    });

    switch(sortBy) {
      case "price-low":
        return [...result].sort((a, b) => a.price - b.price);
      case "price-high":
        return [...result].sort((a,b) => b.price - a.price);
      case "rating" :
        return [...result].sort((a,b) => (b.rating ?? 0) - (a.rating ?? 0))
      default:
        return result;
    }

  }, [cat, query,  advancedFilters, sortBy]);

  return (
    <div className="pb-4">
      {/* Search Bar */}
      <div className="mt-2 rounded-2xl bg-white/5 ring-1 ring-white/10 px-4 py-3">
        <div className="flex items-center gap-3">
          <Search className="h-5 w-5 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full bg-transparent outline-none placeholder:text-slate-500"
          />
        </div>
      </div>

      {/* // Promo Banner */}
      <div className="mt-4 rounded-3xl overflow-hidden ring-1 ring-white/10 bg-white/5">
        <div className="relative aspect-[16/10] sm:aspect-[16/9] md:aspect-[4/3] bg-slate-900">
          <img
            alt="Promo banner"
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1400&q=70"
            className="h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-end">
            <div className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight">
              Summer Sale - 50% Off
            </div>
            <div className="mt-1 sm:mt-2 text-slate-200/90 text-xs sm:text-sm md:text-base">
              Upgrade your lifestyle with our exclusive collection.
            </div>
            <button
              type="button"
              onClick={() => nav("/customer/product/p1")}
              className="mt-3 sm:mt-5 w-full rounded-2xl bg-blue-600 py-3 sm:py-4 text-sm sm:text-base font-bold hover:bg-blue-500 transition"
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="mt-5 flex gap-3 overflow-x-auto pb-2">
        {categories.map((c) => {
          const active = c.id === cat;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setCat(c.id)}
              className={[
                "shrink-0 rounded-2xl px-4 sm:px-5 py-2 sm:py-3 text-sm sm:text-base font-semibold ring-1 ring-white/10 transition",
                active
                  ? "bg-blue-600 text-white"
                  : "bg-white/5 text-slate-200 hover:bg-white/10",
              ].join(" ")}
            >
              <span className="inline-flex items-center gap-2">
                {c.id !== "all" ? (
                  <span className="opacity-90">{iconByCategory[c.id]}</span>
                ) : null}
                {c.label}
              </span>
            </button>
          );
        })}
      </div>

        
     

      {/* Filter & Sort */}
      <div className="mt-4 grid grid-cols-2 gap-4 sm:gap-6">
        <button
          type="button"
          className="rounded-2xl bg-white/5 ring-1 ring-white/10 px-3 sm:px-4 py-3 sm:py-4 text-left hover:bg-white/10 transition"
        >
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <SlidersHorizontal className="h-4 sm:h-5 w-4 sm:w-5" />
            <div className="font-semibold text-sm sm:text-base">
              < FilterButton  filters={advancedFilters} setFilters={setAdvancedFilters}/>
            </div>
          </div>
        </button>
        <button
          type="button"
          className="rounded-2xl bg-white/5 ring-1 ring-white/10 px-3 sm:px-4 py-3 sm:py-4 text-left hover:bg-white/10 transition"
        >
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <div className="font-semibold text-sm sm:text-base">
              <SortButton currentSort={sortBy} onSortChange={setSortBy} />
            </div>
          </div>
        </button>
      </div>

      {/* Products Grid */}
      <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
        {filtered.map((p) => {
          const wished = isInWishlist(p.id);
          return (
            <ProductCard
              key={p.id}
              product={p}
              wished={wished}
              onToggleWish={() => {
                if (wished) {
                  removeFromWishlist(p.id);
                } else {
                  const item: CartLine = {
                    id: p.id,
                    productId: p.id,
                    name: p.name,
                    variantLabel: "",
                    price: p.price,
                    image: p.images[0] ?? "",
                    qty: 1,
                  };
                  addToWishlist(item);
                }
              }}
              onAddToCart={() => {
                const item: CartLine = {
                  id: p.id,
                  productId: p.id,
                  name: p.name,
                  variantLabel: "",
                  price: p.price,
                  image: p.images[0] ?? "",
                  qty: 1,
                };
                addToCart(item);
                nav("/customer/cart");
              }}
              onOpen={() => nav(`/customer/product/${p.id}`)}
            />
          );
        })}
      </div>


    </div>
  );
}
