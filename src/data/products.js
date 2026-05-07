export const products = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 199.99,
    category: "Electronics",
    description: "High-quality wireless headphones with noise cancellation technology. Features 30-hour battery life, premium sound quality, and comfortable over-ear design for extended wear.",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500"
    ],
    rating: 4.5,
    reviews: 128,
    inStock: true,
    features: [
      "Active Noise Cancellation",
      "30-hour battery life",
      "Bluetooth 5.0",
      "Built-in microphone",
      "Foldable design"
    ],
    specifications: {
      "Brand": "AudioTech",
      "Model": "AT-1000",
      "Color": "Matte Black",
      "Weight": "250g"
    }
  },
  {
    id: 2,
    name: "Smart Watch Pro",
    price: 349.99,
    category: "Electronics",
    description: "Advanced smartwatch with health monitoring, GPS tracking, and a stunning AMOLED display. Water-resistant up to 50 meters and perfect for fitness enthusiasts.",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
      "https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=500"
    ],
    rating: 4.7,
    reviews: 256,
    inStock: true,
    features: [
      "Heart rate monitoring",
      "GPS tracking",
      "Water resistant (50m)",
      "5-day battery life",
      "Sleep tracking"
    ],
    specifications: {
      "Brand": "TechWear",
      "Model": "TW-Pro",
      "Display": "1.4\" AMOLED",
      "OS": "WearOS"
    }
  },
  {
    id: 3,
    name: "Leather Messenger Bag",
    price: 129.99,
    category: "Accessories",
    description: "Handcrafted genuine leather messenger bag. Perfect for work or casual use with multiple compartments for optimal organization.",
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500"
    ],
    rating: 4.3,
    reviews: 89,
    inStock: true,
    features: [
      "Genuine leather",
      "Padded laptop compartment",
      "Multiple pockets",
      "Adjustable strap",
      "Magnetic closure"
    ],
    specifications: {
      "Material": "Full-grain leather",
      "Dimensions": "15\" x 11\" x 4\"",
      "Weight": "1.2kg",
      "Color": "Brown"
    }
  },
  {
    id: 4,
    name: "Minimalist Running Shoes",
    price: 159.99,
    category: "Fashion",
    description: "Lightweight running shoes with responsive cushioning and breathable mesh upper. Designed for both performance and style.",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
      "https://images.unsplash.com/photo-1539185441755-1e1726f053a4?w=500"
    ],
    rating: 4.6,
    reviews: 312,
    inStock: true,
    features: [
      "Responsive cushioning",
      "Breathable mesh",
      "Flexible sole",
      "Reflective details",
      "Ortholite insole"
    ],
    specifications: {
      "Brand": "RunFit",
      "Type": "Road Running",
      "Drop": "8mm",
      "Weight": "240g"
    }
  },
  {
    id: 5,
    name: "Stainless Steel Water Bottle",
    price: 34.99,
    category: "Accessories",
    description: "Double-walled vacuum insulated water bottle. Keeps drinks cold for 24 hours or hot for 12 hours. Eco-friendly and BPA free.",
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500",
      "https://images.unsplash.com/photo-1570831739435-6601aa3fa4fb?w=500"
    ],
    rating: 4.4,
    reviews: 167,
    inStock: true,
    features: [
      "24h cold / 12h hot",
      "BPA free",
      "Leak proof",
      "Wide mouth",
      "Powder coated"
    ],
    specifications: {
      "Capacity": "750ml",
      "Material": "18/8 Stainless Steel",
      "Weight": "340g",
      "Height": "26cm"
    }
  },
  {
    id: 6,
    name: "Wireless Charging Pad",
    price: 49.99,
    category: "Electronics",
    description: "Fast wireless charging pad compatible with all Qi-enabled devices. Features intelligent temperature control and foreign object detection.",
    images: [
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500",
      "https://images.unsplash.com/photo-1622445275468-afa2c0e40bec?w=500"
    ],
    rating: 4.2,
    reviews: 93,
    inStock: false,
    features: [
      "15W fast charging",
      "Qi certified",
      "LED indicator",
      "Case friendly",
      "Overcharge protection"
    ],
    specifications: {
      "Input": "5V/2A, 9V/2A",
      "Output": "15W max",
      "Cable": "USB-C 1.5m",
      "Dimensions": "100mm x 100mm x 7mm"
    }
  },
  {
    id: 7,
    name: "Organic Cotton T-Shirt",
    price: 39.99,
    category: "Fashion",
    description: "Premium organic cotton t-shirt with a modern fit. Ethically made with sustainable materials and eco-friendly dyes.",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500"
    ],
    rating: 4.5,
    reviews: 201,
    inStock: true,
    features: [
      "100% organic cotton",
      "Pre-shrunk",
      "Eco-friendly dyes",
      "Reinforced seams",
      "Tagless label"
    ],
    specifications: {
      "Material": "Organic Cotton",
      "Fit": "Regular",
      "Weight": "180gsm",
      "Sizes": "XS-3XL"
    }
  },
  {
    id: 8,
    name: "Bluetooth Portable Speaker",
    price: 79.99,
    category: "Electronics",
    description: "Compact Bluetooth speaker with incredible 360° sound quality. IPX7 waterproof rating, perfect for outdoor adventures and pool parties.",
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500",
      "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=500"
    ],
    rating: 4.6,
    reviews: 178,
    inStock: true,
    features: [
      "360° sound",
      "IPX7 waterproof",
      "12-hour battery",
      "Built-in mic",
      "Party mode"
    ],
    specifications: {
      "Brand": "SoundWave",
      "Power": "20W",
      "Bluetooth": "5.2",
      "Weight": "540g"
    }
  },
  // ── NEW CARD 1 ──
  {
    id: 9,
    name: "Mechanical Gaming Keyboard",
    price: 119.99,
    category: "Electronics",
    description: "Tactile mechanical keyboard with RGB backlighting and anti-ghosting technology. Built for precision gaming and comfortable all-day typing.",
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500",
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=500"
    ],
    rating: 4.7,
    reviews: 344,
    inStock: true,
    features: [
      "RGB per-key lighting",
      "Anti-ghosting",
      "Tactile blue switches",
      "Detachable USB-C cable",
      "Aluminum top frame"
    ],
    specifications: {
      "Brand": "KeyForge",
      "Layout": "TKL",
      "Switch": "Blue Mechanical",
      "Weight": "820g"
    }
  },
  // ── NEW CARD 2 ──
  {
    id: 10,
    name: "Slim Leather Wallet",
    price: 49.99,
    category: "Accessories",
    description: "Ultra-slim genuine leather bifold wallet with RFID blocking technology. Fits up to 8 cards and cash without the bulk.",
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500",
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=500"
    ],
    rating: 4.5,
    reviews: 215,
    inStock: true,
    features: [
      "RFID blocking",
      "Genuine leather",
      "8 card slots",
      "Bill compartment",
      "Gift box included"
    ],
    specifications: {
      "Material": "Full-grain leather",
      "Dimensions": "11cm x 9cm x 0.8cm",
      "Weight": "60g",
      "Color": "Dark Brown"
    }
  }
];

export const categories = ["All", "Electronics", "Fashion", "Accessories"];

export const featuredProducts = products.filter(p => p.rating >= 4.5).slice(0, 4);