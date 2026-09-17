import { Product, Review, Coupon } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'gh-phone-01',
    name: 'Apple iPhone 16 Pro Max 256GB - Desert Titanium',
    brand: 'Apple',
    category: 'Smartphones',
    price: 184999,
    originalPrice: 199999,
    discountPercent: 8,
    rating: 4.9,
    reviewCount: 142,
    stock: 12,
    description: 'Forged in titanium with the boundary-breaking A18 Pro chip, 48MP Fusion camera with 5x telephoto zoom, Camera Control button, and our longest battery life ever on iPhone.',
    features: [
      'Grade 5 Titanium design with textured matte glass back',
      'Super Retina XDR 6.9-inch display with ProMotion up to 120Hz',
      'A18 Pro chip with 6-core GPU delivering console-level gaming',
      '48MP Fusion camera with 4K 120 fps Dolby Vision recording',
      'Action button & dedicated touch-sensitive Camera Control'
    ],
    specs: {
      'Display': '6.9" Super Retina XDR OLED (2868 x 1320)',
      'Processor': 'Apple A18 Pro (3nm)',
      'Storage / RAM': '256GB / 8GB RAM',
      'Main Camera': '48MP Main + 48MP Ultra Wide + 12MP 5x Telephoto',
      'Battery': '4,685 mAh with MagSafe Fast Wireless Charging',
      'OS': 'iOS 18',
      'Weight': '227g',
      'Warranty': '1 Year Official Apple Warranty'
    },
    imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&auto=format&fit=crop&q=80'
    ],
    variants: [
      { id: 'v-desert', name: 'Desert Titanium', colorHex: '#c7b299', inStock: true },
      { id: 'v-natural', name: 'Natural Titanium', colorHex: '#9f9a94', inStock: true },
      { id: 'v-black', name: 'Black Titanium', colorHex: '#2b2b2b', inStock: true }
    ],
    warranty: '1 Year Official Brand Warranty',
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: true,
    isSpecialOffer: true,
    offerEnds: '2026-10-01T00:00:00Z'
  },
  {
    id: 'gh-phone-02',
    name: 'Samsung Galaxy S24 Ultra 5G (12GB/256GB)',
    brand: 'Samsung',
    category: 'Smartphones',
    price: 156000,
    originalPrice: 175000,
    discountPercent: 11,
    rating: 4.8,
    reviewCount: 98,
    stock: 18,
    description: 'Meet Galaxy S24 Ultra with built-in S Pen, titanium exterior, Gorilla Armor anti-reflective glass, and Galaxy AI built right into your day.',
    features: [
      'Galaxy AI: Circle to Search, Live Call Translate, and Note Assist',
      '200MP wide camera with AI Zoom and Quad Telephoto system',
      'Snapdragon 8 Gen 3 for Galaxy processor with 1.9x vapor chamber',
      'Flat 6.8" QHD+ Dynamic AMOLED 2X 120Hz display with 2600 nits'
    ],
    specs: {
      'Display': '6.8" Dynamic AMOLED 2X, 120Hz, HDR10+, 2600 nits',
      'Processor': 'Snapdragon 8 Gen 3 (4 nm)',
      'Storage / RAM': '256GB / 12GB RAM',
      'Camera': '200MP + 50MP Periscope + 10MP Tele + 12MP Ultra-wide',
      'Battery': '5000 mAh with 45W wired charging',
      'OS': 'Android 14, One UI 6.1 (7 OS upgrades)',
      'Weight': '232g',
      'Warranty': '1 Year Samsung Bangladesh Warranty'
    },
    imageUrl: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80'
    ],
    variants: [
      { id: 'v-gray', name: 'Titanium Gray', colorHex: '#737478', inStock: true },
      { id: 'v-black', name: 'Titanium Black', colorHex: '#1f1f21', inStock: true },
      { id: 'v-violet', name: 'Titanium Violet', colorHex: '#483c52', inStock: true }
    ],
    warranty: '1 Year Samsung Bangladesh Official Warranty',
    isFeatured: true,
    isBestSeller: true
  },
  {
    id: 'gh-laptop-01',
    name: 'MacBook Pro 16" M3 Max (36GB Unified / 1TB SSD)',
    brand: 'Apple',
    category: 'Laptops',
    price: 389000,
    originalPrice: 415000,
    discountPercent: 6,
    rating: 4.95,
    reviewCount: 64,
    stock: 5,
    description: 'The ultimate pro laptop. With M3 Max, 16-core CPU, 40-core GPU, up to 22 hours of battery life, and a stunning Liquid Retina XDR display in Space Black.',
    features: [
      'Apple M3 Max chip with 14-core CPU and 30-core GPU',
      '16.2-inch Liquid Retina XDR display with 1600 nits peak brightness',
      'Up to 22 hours battery life on a single charge',
      'Space Black finish with breakthrough anodization seal reducing fingerprints',
      'Six-speaker sound system with force-cancelling woofers'
    ],
    specs: {
      'Display': '16.2" Liquid Retina XDR (3456 x 2234), 120Hz ProMotion',
      'Processor': 'Apple M3 Max (14-core CPU, 30-core GPU)',
      'Memory': '36GB Unified Memory',
      'Storage': '1TB NVMe Superfast SSD',
      'Ports': '3x Thunderbolt 4, HDMI, SDXC card slot, MagSafe 3',
      'Weight': '2.14 kg',
      'Warranty': '1 Year Apple International Warranty'
    },
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&auto=format&fit=crop&q=80'
    ],
    variants: [
      { id: 'v-spaceblack', name: 'Space Black', colorHex: '#1e2124', inStock: true },
      { id: 'v-silver', name: 'Silver', colorHex: '#e1e2e4', inStock: true }
    ],
    warranty: '1 Year Apple International Warranty',
    isFeatured: true,
    isBestSeller: true
  },
  {
    id: 'gh-laptop-02',
    name: 'ASUS ROG Zephyrus G16 OLED Gaming Laptop (RTX 4080)',
    brand: 'ASUS',
    category: 'Laptops',
    price: 310000,
    originalPrice: 335000,
    discountPercent: 7,
    rating: 4.85,
    reviewCount: 42,
    stock: 7,
    description: 'Precision aluminum CNC chassis packing Intel Core Ultra 9 and NVIDIA GeForce RTX 4080 with a mind-blowing 2.5K 240Hz ROG Nebula OLED display.',
    features: [
      'Intel Core Ultra 9 185H processor with AI Boost NPU',
      'NVIDIA GeForce RTX 4080 Laptop GPU (12GB GDDR6)',
      'ROG Nebula 16" 2.5K (2560 x 1600) 240Hz 0.2ms OLED',
      'Slash Lighting matrix on the CNC milled lid'
    ],
    specs: {
      'Display': '16.0" 2.5K OLED, 240Hz, 0.2ms, G-Sync, 100% DCI-P3',
      'Processor': 'Intel Core Ultra 9 185H (16 Cores, 22 Threads)',
      'Graphics': 'NVIDIA GeForce RTX 4080 12GB GDDR6',
      'Memory / Storage': '32GB LPDDR5X / 1TB PCIe 4.0 NVMe SSD',
      'Battery': '90WHrs 4-cell Li-ion',
      'Weight': '1.85 kg',
      'Warranty': '2 Years Asus Global Warranty'
    },
    imageUrl: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=80'
    ],
    variants: [
      { id: 'v-eclipse', name: 'Eclipse Gray', colorHex: '#3b3d40', inStock: true },
      { id: 'v-platinum', name: 'Platinum White', colorHex: '#e8eaed', inStock: false }
    ],
    warranty: '2 Years Asus Bangladesh Warranty',
    isFeatured: true,
    isNewArrival: true
  },
  {
    id: 'gh-audio-01',
    name: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones',
    brand: 'Sony',
    category: 'Audio',
    price: 36500,
    originalPrice: 42000,
    discountPercent: 13,
    rating: 4.9,
    reviewCount: 312,
    stock: 24,
    description: 'Industry-leading noise canceling with two processors and eight microphones. Exceptional sound quality engineered with 30mm precision carbon fiber drivers.',
    features: [
      'Auto NC Optimizer dynamically adjusts noise canceling to your environment',
      'Crystal clear hands-free calling with 4 beamforming mics and AI reduction',
      'Up to 30-hour battery life with fast 3-min charge for 3 hours playback',
      'Speak-to-Chat automatically pauses playback when you start speaking'
    ],
    specs: {
      'Type': 'Over-ear Closed Dynamic',
      'Driver Unit': '30mm Carbon Fiber Composite',
      'Battery Life': '30 Hours (NC ON) / 40 Hours (NC OFF)',
      'Connectivity': 'Bluetooth 5.2, LDAC, Multipoint, 3.5mm AUX',
      'Weight': '250g',
      'Warranty': '1 Year Official Sony Warranty'
    },
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&auto=format&fit=crop&q=80'
    ],
    variants: [
      { id: 'v-black', name: 'Matte Black', colorHex: '#1c1c1c', inStock: true },
      { id: 'v-silver', name: 'Silver Platinum', colorHex: '#d8d4cd', inStock: true },
      { id: 'v-midnight', name: 'Midnight Blue', colorHex: '#1b263b', inStock: true }
    ],
    warranty: '1 Year Official Sony Warranty',
    isFeatured: true,
    isBestSeller: true,
    isSpecialOffer: true,
    offerEnds: '2026-09-30T00:00:00Z'
  },
  {
    id: 'gh-audio-02',
    name: 'Apple AirPods Pro (2nd Gen) with USB-C MagSafe Case',
    brand: 'Apple',
    category: 'Audio',
    price: 27500,
    originalPrice: 32000,
    discountPercent: 14,
    rating: 4.88,
    reviewCount: 420,
    stock: 35,
    description: 'Powered by the Apple H2 chip, AirPods Pro offer up to 2x more Active Noise Cancellation, Adaptive Audio, Transparency mode, and Personalized Spatial Audio.',
    features: [
      'Apple H2 headphone chip delivering smarter noise cancellation',
      'USB-C MagSafe Charging Case with speaker and lanyard loop',
      'Up to 6 hours listening time (30 hours total with case)',
      'Dust, sweat, and water resistant (IP54)'
    ],
    specs: {
      'Chip': 'Apple H2 chip, Apple U1 chip in case',
      'Noise Control': 'Active Noise Cancellation, Adaptive Audio, Transparency',
      'Battery': '6 hours single charge, 30 hours with case',
      'Charging': 'USB-C, MagSafe, Apple Watch charger, Qi certified',
      'Warranty': '1 Year Apple Warranty'
    },
    imageUrl: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=800&auto=format&fit=crop&q=80'
    ],
    variants: [
      { id: 'v-white', name: 'Gloss White', colorHex: '#ffffff', inStock: true }
    ],
    warranty: '1 Year Apple Official Warranty',
    isFeatured: true,
    isBestSeller: true
  },
  {
    id: 'gh-audio-03',
    name: 'Marshall Emberton II Portable Bluetooth Speaker',
    brand: 'Marshall',
    category: 'Audio',
    price: 18500,
    originalPrice: 21500,
    discountPercent: 14,
    rating: 4.79,
    reviewCount: 88,
    stock: 15,
    description: 'Emberton II delivers Marshall signature 360° True Stereophonic sound, 30+ hours of portable playtime, and tough IP67 dust and water resistance.',
    features: [
      '30+ hours of portable playtime on a single charge',
      'True Stereophonic multi-directional sound experience',
      'Rugged IP67 dust and waterproof construction',
      'Stack Mode to link multiple Emberton II speakers'
    ],
    specs: {
      'Power Output': 'Two 10 W Class D amplifiers',
      'Frequency Range': '60 Hz – 20,000 Hz',
      'Battery': '30+ hours, 3 hours full charge',
      'Connectivity': 'Bluetooth 5.1 (10m range)',
      'Weight': '0.7 kg',
      'Warranty': '1 Year Marshall Warranty'
    },
    imageUrl: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&auto=format&fit=crop&q=80'
    ],
    variants: [
      { id: 'v-brass', name: 'Black and Brass', colorHex: '#1a1816', inStock: true },
      { id: 'v-cream', name: 'Cream', colorHex: '#ece5d8', inStock: true }
    ],
    warranty: '1 Year Brand Warranty',
    isSpecialOffer: true
  },
  {
    id: 'gh-watch-01',
    name: 'Apple Watch Ultra 2 GPS + Cellular (Titanium Case)',
    brand: 'Apple',
    category: 'Wearables',
    price: 108000,
    originalPrice: 120000,
    discountPercent: 10,
    rating: 4.92,
    reviewCount: 76,
    stock: 9,
    description: 'The most capable Apple Watch ever. Featuring the bright S9 SiP chip, Double Tap gesture, precision dual-frequency GPS, and up to 72 hours of battery in Low Power Mode.',
    features: [
      '49mm corrosion-resistant aerospace titanium case',
      '3000-nit Always-On Retina display with sapphire crystal',
      'S9 SiP with revolutionary Double Tap gesture control',
      '100m water resistance, certified to EN13319 for diving'
    ],
    specs: {
      'Case Size': '49mm Titanium',
      'Display': 'Always-On Retina OLED, 3000 nits',
      'Battery': '36 hours normal use, up to 72 hours low power mode',
      'Sensors': 'ECG, Blood Oxygen, Depth Gauge, Water Temp, Crash Detection',
      'Connectivity': 'LTE Cellular, Wi-Fi 4, Bluetooth 5.3, Dual-frequency GPS',
      'Warranty': '1 Year Apple Official Warranty'
    },
    imageUrl: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&auto=format&fit=crop&q=80'
    ],
    variants: [
      { id: 'v-trail', name: 'Trail Loop (Blue/Black)', colorHex: '#253549', inStock: true },
      { id: 'v-ocean', name: 'Ocean Band (Orange)', colorHex: '#e65c00', inStock: true }
    ],
    warranty: '1 Year Apple Official Warranty',
    isFeatured: true,
    isNewArrival: true
  },
  {
    id: 'gh-watch-02',
    name: 'Samsung Galaxy Watch 7 (44mm Bluetooth + LTE)',
    brand: 'Samsung',
    category: 'Wearables',
    price: 34500,
    originalPrice: 39000,
    discountPercent: 12,
    rating: 4.75,
    reviewCount: 58,
    stock: 20,
    description: 'Powered by 3nm Exynos processor, Galaxy Watch 7 brings enhanced BioActive sensor with Energy Score, sleep apnea detection, and dual-frequency GPS tracking.',
    features: [
      '3nm Exynos W1000 processor for blazing responsiveness',
      'Energy Score & Personalized Sleep Insights backed by Galaxy AI',
      'Sapphire Crystal Glass display with Armor Aluminum frame',
      '5ATM + IP68 Water and Dust Resistance'
    ],
    specs: {
      'Display': '1.5" Super AMOLED, 480 x 480, Always-on',
      'Processor': 'Exynos W1000 (3 nm)',
      'Memory': '2GB RAM + 32GB Storage',
      'Battery': '425 mAh with WPC Wireless Charging',
      'Sensors': 'BioActive Sensor, Heart Rate, ECG, BIA Body Composition',
      'Warranty': '1 Year Samsung Bangladesh Warranty'
    },
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80'
    ],
    variants: [
      { id: 'v-green', name: 'Forest Green', colorHex: '#2d4739', inStock: true },
      { id: 'v-silver', name: 'Silver Mist', colorHex: '#c2c5c8', inStock: true }
    ],
    warranty: '1 Year Samsung Bangladesh Warranty'
  },
  {
    id: 'gh-periph-01',
    name: 'Logitech MX Master 3S Wireless Performance Mouse',
    brand: 'Logitech',
    category: 'Keyboards & Mice',
    price: 11999,
    originalPrice: 13999,
    discountPercent: 14,
    rating: 4.93,
    reviewCount: 520,
    stock: 45,
    description: 'An icon remastered. With Quiet Clicks and 8,000 DPI track-on-glass sensor, MX Master 3S offers unparalleled precision, tactility, and MagSpeed electromagnetic scrolling.',
    features: [
      '8,000 DPI optical sensor tracks anywhere, even on bare glass',
      'Quiet Click switches deliver a soft tactile feel with 90% less noise',
      'MagSpeed scroll wheel scrolls 1,000 lines per second in silence',
      'Connect up to 3 devices via Bluetooth or Logi Bolt receiver'
    ],
    specs: {
      'Sensor': 'Darkfield high precision (200 - 8000 DPI)',
      'Buttons': '7 buttons (Left/Right, Back/Forward, App-Switch, Wheel mode, Middle)',
      'Battery': 'Rechargeable Li-Po 500 mAh (Up to 70 days on full charge)',
      'Wireless Range': '10 meters (Logi Bolt & Bluetooth LE)',
      'Weight': '141g',
      'Warranty': '1 Year Logitech Bangladesh Warranty'
    },
    imageUrl: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80'
    ],
    variants: [
      { id: 'v-graphite', name: 'Graphite', colorHex: '#333333', inStock: true },
      { id: 'v-pale-gray', name: 'Pale Gray', colorHex: '#d8d8d8', inStock: true }
    ],
    warranty: '1 Year Logitech Warranty',
    isBestSeller: true
  },
  {
    id: 'gh-periph-02',
    name: 'Keychron Q1 Pro Wireless Custom Mechanical Keyboard',
    brand: 'Keychron',
    category: 'Keyboards & Mice',
    price: 24500,
    originalPrice: 27000,
    discountPercent: 9,
    rating: 4.87,
    reviewCount: 84,
    stock: 11,
    description: 'Fully aluminum CNC 75% layout QMK/VIA custom mechanical keyboard. Featuring Bluetooth 5.1, double-gasket acoustic design, hot-swappable Keychron K Pro Banana/Red switches.',
    features: [
      'Precision full CNC machined 6063 aluminum body',
      'Double-Gasket mount design reduces acoustic resonance',
      'QMK & VIA fully programmable keys, macros, and RGB layers',
      'Seamless Bluetooth 5.1 wireless + Type-C wired dual connectivity'
    ],
    specs: {
      'Layout': '75% Compact (81 Keys)',
      'Body Material': 'Full CNC Machined Aluminum',
      'Switches': 'Keychron K Pro Pre-lubed Mechanical (Hot-swappable)',
      'Keycaps': 'KSA Profile Double-shot PBT',
      'Battery': '4000 mAh (Up to 300 hours with RGB off)',
      'Weight': '1.73 kg',
      'Warranty': '1 Year Official Warranty'
    },
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80'
    ],
    variants: [
      { id: 'v-carbon', name: 'Carbon Black (Red Switch)', colorHex: '#212121', inStock: true },
      { id: 'v-silver-blue', name: 'Silver Navy (Banana Switch)', colorHex: '#1e3250', inStock: true }
    ],
    warranty: '1 Year Brand Warranty',
    isFeatured: true
  },
  {
    id: 'gh-gaming-01',
    name: 'Razer DeathAdder V3 Pro Ultra-lightweight Wireless Mouse',
    brand: 'Razer',
    category: 'Gaming',
    price: 16800,
    originalPrice: 19500,
    discountPercent: 14,
    rating: 4.89,
    reviewCount: 165,
    stock: 22,
    description: 'Refined in collaboration with world champions, this 63g ultra-lightweight ergonomic mouse features Focus Pro 30K Optical Sensor and Gen-3 Optical Switches.',
    features: [
      'Ultra-lightweight 63g design with zero deadweight',
      'Razer Focus Pro 30K Optical Sensor with 99.8% resolution accuracy',
      'Optical Mouse Switches Gen-3 with zero debounce delay (90M clicks)',
      'Razer HyperSpeed Wireless up to 90 hours battery'
    ],
    specs: {
      'Weight': '63 grams',
      'Sensor': 'Focus Pro 30,000 DPI Optical',
      'Acceleration': '70G Max Acceleration, 750 IPS',
      'Switches': 'Optical Gen-3 (0.2ms actuation)',
      'Battery Life': 'Up to 90 hours USB-C rechargeable',
      'Warranty': '2 Years Official Razer Warranty'
    },
    imageUrl: 'https://images.unsplash.com/photo-1626880816705-183ce5245281?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1626880816705-183ce5245281?w=800&auto=format&fit=crop&q=80'
    ],
    variants: [
      { id: 'v-black', name: 'Pro Matte Black', colorHex: '#111111', inStock: true },
      { id: 'v-white', name: 'Pro Pure White', colorHex: '#f5f5f5', inStock: true }
    ],
    warranty: '2 Years Razer Official Warranty',
    isBestSeller: true
  },
  {
    id: 'gh-gaming-02',
    name: 'Sony PlayStation DualSense Edge Wireless Controller',
    brand: 'Sony',
    category: 'Gaming',
    price: 24500,
    originalPrice: 28000,
    discountPercent: 13,
    rating: 4.82,
    reviewCount: 94,
    stock: 14,
    description: 'Get an edge in gameplay with remappable buttons, tunable triggers and sticks, swappable stick caps, back buttons, and DualSense haptic feedback.',
    features: [
      'Ultra-customizable controls: remappable inputs and adjustable stick sensitivity',
      'Replaceable stick modules (sold separately) for long-term durability',
      'Adjustable trigger dead zones and travel distances',
      'Includes braided USB cable with lockable connector housing'
    ],
    specs: {
      'Compatibility': 'PS5, PC (Windows), Mac, iOS, Android',
      'Connectivity': 'Bluetooth 5.1 & Type-C wired',
      'Haptics': 'Dual actuators haptic feedback & Adaptive Triggers',
      'Weight': '335g',
      'Warranty': '1 Year Sony Official Warranty'
    },
    imageUrl: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&auto=format&fit=crop&q=80'
    ],
    variants: [
      { id: 'v-edge-white', name: 'Signature White & Gloss Black', colorHex: '#ffffff', inStock: true }
    ],
    warranty: '1 Year Official Sony Warranty'
  },
  {
    id: 'gh-power-01',
    name: 'Anker 737 Power Bank (PowerCore 24K, 140W Output)',
    brand: 'Anker',
    category: 'Power & Charging',
    price: 14500,
    originalPrice: 17000,
    discountPercent: 15,
    rating: 4.94,
    reviewCount: 280,
    stock: 32,
    description: 'Equipped with Power Delivery 3.1 and bi-directional technology to quickly recharge the 24,000mAh portable charger or get a 140W ultra-powerful charge for MacBook and phones.',
    features: [
      'Ultra-powerful 140W two-way fast charging with PD 3.1',
      'Smart digital display shows output/input power and estimated recharge time',
      'Massive 24,000mAh capacity recharges iPhone 15 almost 5 times',
      'ActiveShield 2.0 real-time temperature monitoring 3,000,000 times/day'
    ],
    specs: {
      'Capacity': '24,000 mAh (86.4 Wh)',
      'Total Output': '140W Max across 2x USB-C + 1x USB-A',
      'Input': '140W Max fast recharge (full in 52 minutes)',
      'Display': 'TFT Color Smart Display with power curves',
      'Weight': '630g',
      'Warranty': '18 Months Anker Official Warranty'
    },
    imageUrl: 'https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=800&auto=format&fit=crop&q=80'
    ],
    variants: [
      { id: 'v-dark-gray', name: 'Midnight Charcoal', colorHex: '#2d3136', inStock: true }
    ],
    warranty: '18 Months Anker Official Warranty',
    isBestSeller: true,
    isSpecialOffer: true,
    offerEnds: '2026-09-28T00:00:00Z'
  },
  {
    id: 'gh-power-02',
    name: 'Baseus 100W GaN5 Pro 4-Port Fast Desktop Charger',
    brand: 'Baseus',
    category: 'Power & Charging',
    price: 6499,
    originalPrice: 7999,
    discountPercent: 19,
    rating: 4.76,
    reviewCount: 110,
    stock: 50,
    description: 'Compact Gallium Nitride (GaN5) technology delivering up to 100W power through 2 USB-C and 2 USB-A ports. Charge laptop, phone, tablet, and earbuds simultaneously.',
    features: [
      '100W full-speed power through single Type-C port',
      'GaN5 Pro generation chip with lower temperature & 50% smaller size',
      'BPS II dynamic power distribution for 4 devices safely',
      'Includes 100W Type-C to Type-C fast charging cable (1.5m)'
    ],
    specs: {
      'Input': 'AC 100-240V, 50/60Hz',
      'Output Ports': '2x USB-C (100W max) + 2x USB-A (60W max)',
      'Technology': 'GaN5 Pro, PD 3.0, QC 4.0+, PPS, FCP',
      'Safety': 'Over-voltage, over-current, electrostatic, short-circuit protection',
      'Warranty': '1 Year Baseus Warranty'
    },
    imageUrl: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&auto=format&fit=crop&q=80'
    ],
    variants: [
      { id: 'v-black', name: 'Piano Black', colorHex: '#141414', inStock: true },
      { id: 'v-white', name: 'Frost White', colorHex: '#f7f7f7', inStock: true }
    ],
    warranty: '1 Year Official Warranty'
  },
  {
    id: 'gh-home-01',
    name: 'Xiaomi Smart Air Purifier 4 Pro with OLED Touchscreen',
    brand: 'Xiaomi',
    category: 'Smart Home',
    price: 24900,
    originalPrice: 28500,
    discountPercent: 13,
    rating: 4.81,
    reviewCount: 78,
    stock: 16,
    description: 'High-efficiency 3-in-1 filter capturing 99.97% of 0.3μm particles, high-precision laser particle sensor, negative air ionization, and low noise 33.7dB operation.',
    features: [
      'CADR up to 500m³/h, suitable for large rooms up to 60m²',
      'High-precision dual-effect laser sensor for PM2.5 & PM10',
      'Smart app control with Xiaomi Home, Google Assistant, and Alexa',
      'OLED touchscreen showing air quality index in real-time'
    ],
    specs: {
      'Coverage Area': '35 - 60 m²',
      'CADR (Particles)': '500 m³/h',
      'Noise Level': '≤65 dB(A) max, 33.7 dB night mode',
      'Connectivity': 'Wi-Fi IEEE 802.11 b/g/n 2.4GHz',
      'Dimensions': '275 × 275 × 680 mm (6.8 kg)',
      'Warranty': '1 Year Xiaomi Official Warranty'
    },
    imageUrl: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&auto=format&fit=crop&q=80'
    ],
    variants: [
      { id: 'v-white', name: 'Polar White', colorHex: '#ffffff', inStock: true }
    ],
    warranty: '1 Year Xiaomi Warranty'
  },
  {
    id: 'gh-phone-03',
    name: 'Google Pixel 9 Pro 5G (16GB/128GB)',
    brand: 'Google',
    category: 'Smartphones',
    price: 132000,
    originalPrice: 145000,
    discountPercent: 9,
    rating: 4.86,
    reviewCount: 62,
    stock: 11,
    description: 'Engineered by Google with Tensor G4 chip and Google AI at its core. Features a 50MP triple pro camera, Super Actua display, and 7 years of Pixel drops & security updates.',
    features: [
      'Google Tensor G4 chip with advanced Gemini Nano integration',
      'Super Actua 6.3" LTPO OLED display with up to 3000 nits peak',
      'Magic Editor, Best Take, Video Boost, and Add Me photo AI features',
      '7 years of guaranteed OS updates and feature drops'
    ],
    specs: {
      'Display': '6.3" LTPO OLED, 120Hz, HDR10+, 3000 nits peak',
      'Processor': 'Google Tensor G4 (4nm) + Titan M2 security',
      'RAM / Storage': '16GB LPDDR5X / 128GB UFS 3.1',
      'Cameras': '50MP Main + 48MP 5x Telephoto + 48MP Ultra-wide with Macro',
      'Battery': '4,700 mAh, 27W wired + 21W wireless fast charging',
      'Weight': '199g',
      'Warranty': '1 Year Official Warranty'
    },
    imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80'
    ],
    variants: [
      { id: 'v-obsidian', name: 'Obsidian Black', colorHex: '#222326', inStock: true },
      { id: 'v-porcelain', name: 'Porcelain White', colorHex: '#f3f2ee', inStock: true },
      { id: 'v-rose', name: 'Rose Quartz', colorHex: '#ebd0ce', inStock: true }
    ],
    warranty: '1 Year Brand Warranty',
    isNewArrival: true
  },
  {
    id: 'gh-laptop-03',
    name: 'Dell XPS 15 9530 OLED (Core i9-13900H / RTX 4070)',
    brand: 'Dell',
    category: 'Laptops',
    price: 295000,
    originalPrice: 320000,
    discountPercent: 8,
    rating: 4.77,
    reviewCount: 38,
    stock: 4,
    description: 'Crafted with CNC machined aluminum and carbon fiber palm rest, this Dell XPS 15 features an InfinityEdge 3.5K OLED touchscreen, 13th Gen Intel Core i9, and RTX 4070.',
    features: [
      '15.6" 3.5K (3456 x 2160) InfinityEdge OLED Touchscreen, 400 nits',
      '13th Gen Intel Core i9-13900H 14 Cores (up to 5.4 GHz Turbo)',
      'NVIDIA GeForce RTX 4070 with 8GB GDDR6',
      'Quad-speaker design with Waves Nx 3D audio'
    ],
    specs: {
      'Display': '15.6" 3.5K OLED Touch, 100% DCI-P3, DisplayHDR 500',
      'Processor': 'Intel Core i9-13900H (14 Cores, 20 Threads)',
      'Memory': '32GB DDR5-4800MHz',
      'Storage': '1TB M.2 PCIe NVMe SSD',
      'Weight': '1.92 kg',
      'Warranty': '2 Years Dell Bangladesh Warranty'
    },
    imageUrl: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=800&auto=format&fit=crop&q=80'
    ],
    variants: [
      { id: 'v-platinum-silver', name: 'Platinum Silver / Black Palmrest', colorHex: '#797c80', inStock: true }
    ],
    warranty: '2 Years Dell Bangladesh Warranty'
  },
  {
    id: 'gh-audio-04',
    name: 'Bose QuietComfort Ultra Wireless Noise Cancelling Earbuds',
    brand: 'Bose',
    category: 'Audio',
    price: 32999,
    originalPrice: 36999,
    discountPercent: 11,
    rating: 4.84,
    reviewCount: 92,
    stock: 19,
    description: 'Groundbreaking spatial audio and world-class quiet. CustomTune technology personalizes noise cancellation and sound performance to fit your ears shape.',
    features: [
      'Bose Immersive Audio pushes boundaries of what it means to listen',
      'World-class noise cancellation with CustomTune personalized audio',
      'Up to 6 hours playtime (up to 4 with Immersive Audio turned on)',
      'IPX4 sweat and water-resistant rating with 9 eartip fit combinations'
    ],
    specs: {
      'Connectivity': 'Bluetooth 5.3 with Snapdragon Sound (aptX Adaptive)',
      'Microphones': '4 mics in each earbud',
      'Battery': '6 hours listening, case holds 3 extra charges (24h total)',
      'Controls': 'Touch controls for volume, mode switching, tracks',
      'Warranty': '1 Year Bose Warranty'
    },
    imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80'
    ],
    variants: [
      { id: 'v-black', name: 'Black', colorHex: '#191919', inStock: true },
      { id: 'v-white-smoke', name: 'White Smoke', colorHex: '#edeae6', inStock: true }
    ],
    warranty: '1 Year Brand Warranty',
    isNewArrival: true
  },
  {
    id: 'gh-gaming-03',
    name: 'SteelSeries Arctis Nova Pro Wireless Multi-System Headset',
    brand: 'SteelSeries',
    category: 'Gaming',
    price: 38500,
    originalPrice: 43000,
    discountPercent: 10,
    rating: 4.91,
    reviewCount: 118,
    stock: 8,
    description: 'Almighty Audio with premium high-fidelity drivers, Sonar Software spatial EQ, Active Noise Cancellation, and Infinity Power System with hot-swappable dual batteries.',
    features: [
      'Infinity Power System with 2 hot-swappable batteries for non-stop gaming',
      'Multi-System Connect OLED Base Station: switch between PC and Console',
      'AI-powered ClearCast Gen 2 bidirectional microphone eliminates keystroke noise',
      'Simultaneous 2.4GHz ultra-low latency wireless and Bluetooth'
    ],
    specs: {
      'Drivers': '40mm Neodymium High Fidelity Drivers (10–40,000 Hz)',
      'Wireless Range': '12 meters / 40 feet (2.4GHz Quantum 2.0)',
      'Battery Life': '44 Hours (22h per battery pack, unlimited with hot swap)',
      'Weight': '338g',
      'Warranty': '1 Year SteelSeries Warranty'
    },
    imageUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80'
    ],
    variants: [
      { id: 'v-stealth-black', name: 'Stealth Black', colorHex: '#181818', inStock: true }
    ],
    warranty: '1 Year Official Warranty',
    isFeatured: true
  },
  {
    id: 'gh-power-03',
    name: 'Ugreen Nexode 145W Power Bank 25,000mAh with Fast PD',
    brand: 'Ugreen',
    category: 'Power & Charging',
    price: 11500,
    originalPrice: 13500,
    discountPercent: 15,
    rating: 4.83,
    reviewCount: 140,
    stock: 28,
    description: 'High-speed PD 3.0 145W dual-port output can charge a 2023 MacBook Air to 100% in 90 minutes. Certified 25000mAh battery flight-approved for airlines.',
    features: [
      '145W maximum fast charging output (PD 3.0 / QC 3.0)',
      'Dual USB-C and single USB-A for charging 3 gadgets at high speed',
      'Smart LED digital readout shows exact battery percentage',
      'Flight-approved 90Wh capacity compliant with TSA regulations'
    ],
    specs: {
      'Capacity': '25,000 mAh (90Wh)',
      'USB-C1 Output': '100W Max',
      'USB-C2 Output': '45W Max',
      'Recharge Time': 'About 2 hours with 65W wall charger',
      'Weight': '505g',
      'Warranty': '1 Year Ugreen Warranty'
    },
    imageUrl: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&auto=format&fit=crop&q=80'
    ],
    variants: [
      { id: 'v-space-gray', name: 'Space Gray Metallic', colorHex: '#4a4d52', inStock: true }
    ],
    warranty: '1 Year Official Warranty'
  },
  {
    id: 'gh-watch-03',
    name: 'Garmin Fenix 7 Pro Solar Sapphire Multisport GPS Watch',
    brand: 'Garmin',
    category: 'Wearables',
    price: 98000,
    originalPrice: 110000,
    discountPercent: 11,
    rating: 4.96,
    reviewCount: 45,
    stock: 6,
    description: 'Conquer every hour with solar charging sapphire lens, built-in LED flashlight, Hill Score, Endurance Score, and TopoActive multi-continent worldwide mapping.',
    features: [
      'Power Sapphire solar charging lens extends battery life up to 22 days',
      'Built-in multi-LED flashlight with variable intensities & red strobe',
      'Next-generation Gen 5 wrist-based optical heart rate sensor',
      'Multi-band GNSS with SatIQ technology delivers superior accuracy'
    ],
    specs: {
      'Case Size': '47mm Titanium Bezel',
      'Display': '1.3" Sunlight-visible Transflective MIP (260 x 260)',
      'Battery': 'Up to 22 days smartwatch mode with solar',
      'Water Rating': '10 ATM (100 meters)',
      'Weight': '73g with silicone band',
      'Warranty': '2 Years Garmin Warranty'
    },
    imageUrl: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80'
    ],
    variants: [
      { id: 'v-carbon-gray', name: 'Carbon Gray DLC Titanium', colorHex: '#2b2c2e', inStock: true }
    ],
    warranty: '2 Years Official Warranty',
    isFeatured: true
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-01',
    productId: 'gh-phone-01',
    userName: 'Tanvir Hossain',
    rating: 5,
    date: '2026-08-20',
    comment: 'Received authentic iPhone 16 Pro Max within 24 hours in Dhanmondi, Dhaka. Camera Control button is incredible and battery easily lasts 2 days!',
    verifiedPurchase: true
  },
  {
    id: 'rev-02',
    productId: 'gh-phone-01',
    userName: 'Sadia Rahman',
    rating: 5,
    date: '2026-08-14',
    comment: 'Desert titanium looks stunning in person. Paid via bKash, seamless transaction and customer care confirmed the order right away.',
    verifiedPurchase: true
  },
  {
    id: 'rev-03',
    productId: 'gh-audio-01',
    userName: 'Mahmudul Hasan',
    rating: 5,
    date: '2026-08-10',
    comment: 'Sony WH-1000XM5 ANC cuts out Dhaka traffic noise completely while commuting. Best purchase of 2026.',
    verifiedPurchase: true
  },
  {
    id: 'rev-04',
    productId: 'gh-laptop-01',
    userName: 'Kazi Farhan',
    rating: 5,
    date: '2026-07-28',
    comment: 'MacBook Pro M3 Max handles 8K video exports in DaVinci Resolve without even spinning the fans audibly. GadgetHub is 100% genuine.',
    verifiedPurchase: true
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'GADGET10',
    discountType: 'percentage',
    discountValue: 10,
    minOrderAmount: 1000,
    description: '10% off on all gadgets up to ৳2,000 discount',
    expiryDate: '2026-12-31'
  },
  {
    code: 'DHAKA50',
    discountType: 'fixed',
    discountValue: 500,
    minOrderAmount: 5000,
    description: '৳500 flat discount on orders above ৳5,000',
    expiryDate: '2026-11-30'
  },
  {
    code: 'EID2026',
    discountType: 'percentage',
    discountValue: 15,
    minOrderAmount: 15000,
    description: '15% Mega Discount for orders over ৳15,000',
    expiryDate: '2026-10-31'
  }
];
