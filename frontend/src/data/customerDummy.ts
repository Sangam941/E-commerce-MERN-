export type CategoryId = 'all' | 'electronics' | 'fashion' | 'home' | 'sports' | 'accessories' | 'furniture'

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
  { id: 'furniture', label: 'Furniture' },
  { id: 'sports', label: 'Sports' },
]

export const products: Product[] = [
  
  {
    id: 'p26',
    name: 'AeroPods Wireless Earbuds',
    categoryId: 'electronics',
    categoryLabel: 'Electronics',
    price: 120,
    compareAtPrice: 150,
    rating: 4.6,
    reviewCount: 312,
    isInStock: true,
    badge: 'SALE',
    images: ['https://images.unsplash.com/photo-1590658006821-04e6d3d5f1a2?auto=format&fit=crop&w=1200&q=70'],
    shortSpecs: ['Active Noise Cancellation', '24h Battery', 'Bluetooth 5.3'],
    sku: 'ELEC-POD-AERO',
  },

  {
    id: 'p27',
    name: 'QuantumX Gaming Mouse',
    categoryId: 'electronics',
    categoryLabel: 'Electronics',
    price: 59,
    rating: 4.8,
    reviewCount: 150,
    isInStock: true,
    images: ['https://images.unsplash.com/photo-1587202372775-e229f172b9f8?auto=format&fit=crop&w=1200&q=70'],
    shortSpecs: ['12K DPI Sensor', 'RGB Lighting', 'Ergonomic Design'],
    sku: 'ELEC-MSE-QUANTUM',
  },

  {
    id: 'p28',
    name: 'SmartHome LED Strip',
    categoryId: 'home',
    categoryLabel: 'Home & Living',
    price: 45,
    rating: 4.4,
    reviewCount: 214,
    isInStock: true,
    images: ['https://images.unsplash.com/photo-1593642532400-2682810df593?auto=format&fit=crop&w=1200&q=70'],
    shortSpecs: ['16M Colors', 'App Control', 'Energy Efficient'],
    sku: 'HOME-LIGHT-STRIP',
  },

  {
    id: 'p29',
    name: 'Bamboo Laundry Basket',
    categoryId: 'home',
    categoryLabel: 'Home & Living',
    price: 60,
    rating: 4.5,
    reviewCount: 90,
    isInStock: true,
    images: ['https://images.unsplash.com/photo-1595847637813-35a8bff24e2b?auto=format&fit=crop&w=1200&q=70'],
    shortSpecs: ['Eco-friendly', 'Removable Liner', 'Minimalist Design'],
    sku: 'HOME-BASK-BAMBOO',
  },

  {
    id: 'p30',
    name: 'OrthoSupport Office Chair',
    categoryId: 'furniture',
    categoryLabel: 'Furniture',
    price: 260,
    rating: 4.7,
    reviewCount: 134,
    isInStock: true,
    images: ['https://images.unsplash.com/photo-1589571894960-20bbe2828a27?auto=format&fit=crop&w=1200&q=70'],
    shortSpecs: ['Lumbar Support', 'Mesh Back', 'Adjustable Height'],
    sku: 'FUR-CHR-ORTHO',
  },

  {
    id: 'p31',
    name: 'Minimal Nordic Bookshelf',
    categoryId: 'furniture',
    categoryLabel: 'Furniture',
    price: 199,
    rating: 4.3,
    reviewCount: 76,
    isInStock: true,
    images: ['https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=1200&q=70'],
    shortSpecs: ['5-tier shelf', 'Solid Wood', 'Scandinavian Style'],
    sku: 'FUR-SHLF-NORDIC',
  },

  {
    id: 'p32',
    name: 'FlexPro Resistance Bands Set',
    categoryId: 'sports',
    categoryLabel: 'Sports',
    price: 40,
    rating: 4.8,
    reviewCount: 310,
    isInStock: true,
    images: ['https://images.unsplash.com/photo-1583454110181-77aa7d49bbf0?auto=format&fit=crop&w=1200&q=70'],
    shortSpecs: ['5 Strength Levels', 'Non-slip', 'Portable Bag Included'],
    sku: 'SPORT-RB-SET',
  },

  {
    id: 'p33',
    name: 'AirMesh Running Shoes',
    categoryId: 'sports',
    categoryLabel: 'Sports',
    price: 95,
    compareAtPrice: 120,
    rating: 4.7,
    reviewCount: 420,
    isInStock: true,
    badge: 'SALE',
    images: ['https://images.unsplash.com/photo-1600180758890-6b94519a2321?auto=format&fit=crop&w=1200&q=70'],
    shortSpecs: ['Breathable Mesh', 'Soft Cushioning', 'Lightweight'],
    sku: 'SPORT-SHOE-AIR',
  },

  {
    id: 'p34',
    name: 'Vintage Leather Wallet',
    categoryId: 'accessories',
    categoryLabel: 'Accessories',
    price: 55,
    rating: 4.9,
    reviewCount: 133,
    isInStock: true,
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=70'],
    shortSpecs: ['Genuine Leather', 'Slim Design', 'RFID Protection'],
    sku: 'ACC-WLT-LEATH',
  },

  {
    id: 'p35',
    name: 'Urban Trail Hiking Boots',
    categoryId: 'sports',
    categoryLabel: 'Sports',
    price: 160,
    rating: 4.6,
    reviewCount: 67,
    isInStock: true,
    images: ['https://images.unsplash.com/photo-1528701800489-20be3c2efc9e?auto=format&fit=crop&w=1200&q=70'],
    shortSpecs: ['Waterproof', 'High-Traction Sole', 'Premium Durability'],
    sku: 'SPORT-BOOT-URBAN',
  },

  {
    id: 'p36',
    name: 'Luxe Wool Throw Blanket',
    categoryId: 'home',
    categoryLabel: 'Home & Living',
    price: 90,
    rating: 4.8,
    reviewCount: 256,
    isInStock: true,
    images: ['https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=1200&q=70'],
    shortSpecs: ['100% Merino Wool', 'Handwoven', 'Ultra-soft'],
    sku: 'HOME-THROW-LUXE',
  },

  {
    id: 'p37',
    name: 'Sleek Steel Water Bottle',
    categoryId: 'accessories',
    categoryLabel: 'Accessories',
    price: 35,
    rating: 4.4,
    reviewCount: 165,
    isInStock: true,
    images: ['https://images.unsplash.com/photo-1602148711675-ffdce24444ff?auto=format&fit=crop&w=1200&q=70'],
    shortSpecs: ['Double-wall vacuum', '24h Cold', '12h Hot'],
    sku: 'ACC-BTL-STEEL',
  },

  {
    id: 'p38',
    name: 'Galaxy Smart Lamp',
    categoryId: 'home',
    categoryLabel: 'Home & Living',
    price: 110,
    rating: 4.7,
    reviewCount: 99,
    isInStock: true,
    images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=70'],
    shortSpecs: ['Touch Control', 'Color Changing', 'USB Powered'],
    sku: 'HOME-LAMP-GALAXY',
  },

  {
    id: 'p39',
    name: 'CarbonFit Smart Scale',
    categoryId: 'electronics',
    categoryLabel: 'Electronics',
    price: 65,
    rating: 4.5,
    reviewCount: 187,
    isInStock: true,
    images: ['https://images.unsplash.com/photo-1577985051167-0d49e11a6c3b?auto=format&fit=crop&w=1200&q=70'],
    shortSpecs: ['Body Fat %', 'BMI tracking', 'Bluetooth Sync'],
    sku: 'ELEC-SCALE-CARBON',
  },

  {
    id: 'p40',
    name: 'Artisan Ceramic Vase',
    categoryId: 'home',
    categoryLabel: 'Home & Living',
    price: 48,
    rating: 4.6,
    reviewCount: 52,
    isInStock: true,
    images: ['https://images.unsplash.com/photo-1505575967455-40e256fcd23c?auto=format&fit=crop&w=1200&q=70'],
    shortSpecs: ['Handcrafted', 'Matte Finish', 'Eco-friendly'],
    sku: 'HOME-DEC-VASE',
  },

  {
    id: 'p41',
    name: 'SonicWave Portable Speaker',
    categoryId: 'electronics',
    categoryLabel: 'Electronics',
    price: 99,
    rating: 4.7,
    reviewCount: 210,
    isInStock: true,
    images: ['https://images.unsplash.com/photo-1580894908361-967195b84285?auto=format&fit=crop&w=1200&q=70'],
    shortSpecs: ['Deep Bass', '12h Battery', 'Water-resistant'],
    sku: 'ELEC-SPK-WAVE',
  },

  {
    id: 'p42',
    name: 'Contour Memory Foam Pillow',
    categoryId: 'home',
    categoryLabel: 'Home & Living',
    price: 50,
    rating: 4.8,
    reviewCount: 301,
    isInStock: true,
    images: ['https://images.unsplash.com/photo-1602810318383-e386cc2a3f25?auto=format&fit=crop&w=1200&q=70'],
    shortSpecs: ['Orthopedic Support', 'Soft Cover', 'Anti-allergy'],
    sku: 'HOME-PILLOW-MEM',
  },

  {
    id: 'p43',
    name: 'EverFit Yoga Mat',
    categoryId: 'sports',
    categoryLabel: 'Sports',
    price: 45,
    rating: 4.6,
    reviewCount: 260,
    isInStock: true,
    images: ['https://images.unsplash.com/photo-1599443015571-7ebf82aefab8?auto=format&fit=crop&w=1200&q=70'],
    shortSpecs: ['Non-slip Surface', 'Extra Thick', 'Lightweight'],
    sku: 'SPORT-YOGA-MAT',
  },

  {
    id: 'p44',
    name: 'ZenSound White Noise Machine',
    categoryId: 'electronics',
    categoryLabel: 'Electronics',
    price: 70,
    rating: 4.4,
    reviewCount: 130,
    isInStock: true,
    images: ['https://images.unsplash.com/photo-1599328834431-c682744276ed?auto=format&fit=crop&w=1200&q=70'],
    shortSpecs: ['10 Soothing Sounds', 'Timer', 'USB Powered'],
    sku: 'ELEC-NOISE-ZEN',
  },

  {
    id: 'p45',
    name: 'Traveler Sling Bag',
    categoryId: 'accessories',
    categoryLabel: 'Accessories',
    price: 80,
    rating: 4.5,
    reviewCount: 175,
    isInStock: true,
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=70'],
    shortSpecs: ['Crossbody', 'Water-resistant', 'Multiple pockets'],
    sku: 'ACC-BAG-SLING',
  },

  {
    id: 'p46',
    name: 'Premium Linen Curtains',
    categoryId: 'home',
    categoryLabel: 'Home & Living',
    price: 130,
    rating: 4.8,
    reviewCount: 80,
    isInStock: true,
    images: ['https://images.unsplash.com/photo-1578898887932-dce23a53c15f?auto=format&fit=crop&w=1200&q=70'],
    shortSpecs: ['Light Filtering', 'Natural Linen', 'Machine Washable'],
    sku: 'HOME-CRTN-LINEN',
  },

  {
    id: 'p47',
    name: 'GlideX Hair Dryer',
    categoryId: 'electronics',
    categoryLabel: 'Electronics',
    price: 150,
    compareAtPrice: 180,
    rating: 4.7,
    reviewCount: 99,
    isInStock: true,
    badge: 'SALE',
    images: ['https://images.unsplash.com/photo-1584956868513-4bce0b5ec3ac?auto=format&fit=crop&w=1200&q=70'],
    shortSpecs: ['Ionic Tech', 'Silent Motor', '3 Heat Settings'],
    sku: 'ELEC-DRY-GLIDE',
  },

  {
    id: 'p48',
    name: 'Midnight Leather Backpack',
    categoryId: 'accessories',
    categoryLabel: 'Accessories',
    price: 180,
    rating: 4.9,
    reviewCount: 112,
    isInStock: true,
    images: ['https://images.unsplash.com/photo-1585386959984-a4155228f810?auto=format&fit=crop&w=1200&q=70'],
    shortSpecs: ['Handcrafted', 'Premium Leather', 'Laptop Section'],
    sku: 'ACC-BACK-MID',
  },

  {
    id: 'p49',
    name: 'SmartHome Air Purifier',
    categoryId: 'electronics',
    categoryLabel: 'Electronics',
    price: 220,
    rating: 4.6,
    reviewCount: 150,
    isInStock: true,
    images: ['https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=1200&q=70'],
    shortSpecs: ['HEPA Filter', 'Silent Mode', 'App Monitoring'],
    sku: 'ELEC-AIR-SMART',
  },

  {
    id: 'p50',
    name: 'CloudStep Foam Slippers',
    categoryId: 'home',
    categoryLabel: 'Home & Living',
    price: 40,
    rating: 4.7,
    reviewCount: 210,
    isInStock: true,
    images: ['https://images.unsplash.com/photo-1596075780750-8122454f6f62?auto=format&fit=crop&w=1200&q=70'],
    shortSpecs: ['Memory Foam', 'Soft Lining', 'Anti-slip'],
    sku: 'HOME-SLP-FOAM',
  }
];

export const initialWishlist = new Set<string>(['p5'])

export const initialCart: CartLine[] = [
  // {
  //   id: 'c1',
  //   productId: 'p6',
  //   name: 'Organic Cotton T‑Shirt',
  //   variantLabel: 'Size: M • Color: White',
  //   price: 29,
  //   image: 'https://images.unsplash.com/photo-1520975682031-aab88cc99c22?auto=format&fit=crop&w=1200&q=70',
  //   qty: 1,
  // },
  // {
  //   id: 'c2',
  //   productId: 'p7',
  //   name: 'Slim Fit Jeans',
  //   variantLabel: 'Size: 32 • Color: Indigo',
  //   price: 59,
  //   image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1200&q=70',
  //   qty: 1,
  // },
]

