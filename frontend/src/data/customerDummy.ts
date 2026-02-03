export type CategoryId = 'all' | 'electronics' | 'fashion' | 'home' | 'sports' | 'accessories'

export type Product = {
  id: string
  name: string
  categoryId: CategoryId
  categoryLabel: string
  price: number
  compareAtPrice?: number
  rating: number
  reviewCount: number
  isInStock: boolean
  badge?: 'SALE' | 'NEW'
  images: string[]
  shortSpecs: string[]
  sku: string
}

export type CartLine = {
  id: string
  productId: string
  name: string
  variantLabel: string
  price: number
  image: string
  qty: number
}

export const categories: Array<{ id: CategoryId; label: string }> = [
  { id: 'all', label: 'All Items' },
  { id: 'electronics', label: 'Electronics' },
  { id: 'fashion', label: 'Fashion' },
  { id: 'accessories', label: 'Accessories' },
  { id: 'home', label: 'Home & Living' },
  { id: 'sports', label: 'Sports' },
]

export const products: Product[] = [
  {
    id: 'p1',
    name: 'SonicFlow Premium Wireless ANC Headphones',
    categoryId: 'electronics',
    categoryLabel: 'Electronics',
    price: 299,
    compareAtPrice: 349,
    rating: 4.8,
    reviewCount: 1240,
    isInStock: true,
    badge: 'SALE',
    images: [
      'https://images.unsplash.com/photo-1518441312535-3b0a3b3e7b3f?auto=format&fit=crop&w=1200&q=70',
      'https://images.unsplash.com/photo-1524678714210-9917a6c619c2?auto=format&fit=crop&w=1200&q=70',
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=70',
      'https://images.unsplash.com/photo-1518441312535-3b0a3b3e7b3f?auto=format&fit=crop&w=1200&q=70',
    ],
    shortSpecs: [
      'Hybrid Active Noise Cancelling',
      'Bluetooth 5.3 with multipoint connection',
      'Premium Vegan Leather cushions',
    ],
    sku: 'SF-WL-BLK-2024',
  },
  {
    id: 'p2',
    name: 'Wireless Headphones Pro',
    categoryId: 'electronics',
    categoryLabel: 'Electronics',
    price: 199,
    rating: 4.8,
    reviewCount: 120,
    isInStock: true,
    images: ['https://images.unsplash.com/photo-1518441312535-3b0a3b3e7b3f?auto=format&fit=crop&w=1200&q=70'],
    shortSpecs: ['Deep bass', 'Fast charging', 'Comfy pads'],
    sku: 'WH-PRO-001',
  },
  {
    id: 'p3',
    name: 'Minimalist Watch',
    categoryId: 'accessories',
    categoryLabel: 'Accessories',
    price: 89,
    rating: 4.5,
    reviewCount: 85,
    isInStock: true,
    badge: 'SALE',
    images: ['https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=1200&q=70'],
    shortSpecs: ['Stainless steel', 'Leather strap', 'Water resistant'],
    sku: 'MW-LEATHER-042',
  },
  {
    id: 'p4',
    name: 'Eco‑Steel Bottle',
    categoryId: 'home',
    categoryLabel: 'Home & Living',
    price: 35,
    rating: 4.9,
    reviewCount: 230,
    isInStock: true,
    images: ['https://images.unsplash.com/photo-1526401485004-2aa7f3b7f4aa?auto=format&fit=crop&w=1200&q=70'],
    shortSpecs: ['BPA-free', 'Keeps cold 24h', 'Leak-proof'],
    sku: 'BOTTLE-STEEL-024',
  },
  {
    id: 'p5',
    name: 'Velocity Runners',
    categoryId: 'sports',
    categoryLabel: 'Sports',
    price: 125,
    rating: 4.7,
    reviewCount: 42,
    isInStock: true,
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=70'],
    shortSpecs: ['Lightweight', 'Breathable mesh', 'Cushioned sole'],
    sku: 'RUNNER-VEL-07',
  },
]

export const initialWishlist = new Set<string>(['p5'])

export const initialCart: CartLine[] = [
  {
    id: 'c1',
    productId: 'p6',
    name: 'Organic Cotton T‑Shirt',
    variantLabel: 'Size: M • Color: White',
    price: 29,
    image: 'https://images.unsplash.com/photo-1520975682031-aab88cc99c22?auto=format&fit=crop&w=1200&q=70',
    qty: 1,
  },
  {
    id: 'c2',
    productId: 'p7',
    name: 'Slim Fit Jeans',
    variantLabel: 'Size: 32 • Color: Indigo',
    price: 59,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1200&q=70',
    qty: 1,
  },
]

