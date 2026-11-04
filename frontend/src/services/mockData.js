// Realistic, luxury salon marketplace sample data for SalonX

export const SALON_CATEGORIES = [
  { id: 'all', name: 'All Services', icon: 'Sparkles' },
  { id: 'haircut', name: 'Haircut', icon: 'Scissors', description: 'Precision cuts & styling' },
  { id: 'hairstyling', name: 'Hair Styling', icon: 'Wind', description: 'Blowouts & bridal hairstyles' },
  { id: 'haircolour', name: 'Hair Colour', icon: 'Palette', description: 'Balayage, highlights & tints' },
  { id: 'facial', name: 'Facial & Skin', icon: 'Smile', description: 'Hydra-facials & organic peels' },
  { id: 'makeup', name: 'Makeup', icon: 'Brush', description: 'Bridal, party & editorial glam' },
  { id: 'spa', name: 'Spa & Wellness', icon: 'Flower2', description: 'Aromatherapy & massages' },
  { id: 'beard', name: 'Beard Grooming', icon: 'Flame', description: 'Hot towel shaves & beard trims' },
  { id: 'nails', name: 'Nails & Gel', icon: 'Heart', description: 'Gel extensions & luxury pedicures' }
];

export const MOCK_SALONS = [
  {
    id: 'salon-1',
    name: 'The Luxe Atelier',
    tagline: 'Haute Coiffure & Bespoke Esthetics',
    description: 'The Luxe Atelier is an editorial sanctuary combining Parisian styling discipline with cutting-edge Japanese hair restorative therapy. Featuring private VIP suites, organic French botanicals, and bespoke consultations by globally certified master colorists.',
    rating: 4.9,
    reviewCount: 348,
    distanceKm: 1.2,
    address: '42 Lavelle Boulevard, 2nd Floor, Indiranagar',
    city: 'Bengaluru',
    lat: 12.9716,
    lng: 77.5946,
    gender: 'Unisex', // Men, Women, Unisex
    startingPrice: 850,
    isOpenNow: true,
    openingHours: '09:00 AM - 09:00 PM',
    verified: true,
    featured: true,
    badge: 'Premier Luxe',
    coverImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1000&q=80'
    ],
    amenities: ['Valet Parking', 'Espresso Bar', 'Private VIP Suite', 'High-Speed Wi-Fi', 'Cruelty-Free Products'],
    services: [
      {
        id: 'srv-101',
        name: 'Signature Precision Cut & Sculpting',
        category: 'haircut',
        gender: 'Unisex',
        price: 1250,
        originalPrice: 1500,
        durationMinutes: 45,
        description: 'Bespoke precision haircut including detox scalp massage, dual wash, and editorial blowout finish.',
        popular: true
      },
      {
        id: 'srv-102',
        name: 'French Balayage & Gloss Therapy',
        category: 'haircolour',
        gender: 'Women',
        price: 4800,
        originalPrice: 5500,
        durationMinutes: 120,
        description: 'Hand-painted Parisian balayage customized to skin undertones with Olaplex molecular bond builder and high-gloss toner.',
        popular: true
      },
      {
        id: 'srv-103',
        name: 'Hydra-Oxygenating Skin Rebirth',
        category: 'facial',
        gender: 'Unisex',
        price: 3200,
        originalPrice: 3800,
        durationMinutes: 60,
        description: 'Medical-grade hydra-dermabrasion infused with hyaluronic acid, LED light therapy, and collagen infusion.',
        popular: true
      },
      {
        id: 'srv-104',
        name: 'Artisanal Hot Towel Beard Sculpt',
        category: 'beard',
        gender: 'Men',
        price: 850,
        originalPrice: 1000,
        durationMinutes: 30,
        description: 'Straight-razor detailing, essential oil hot towel compress, and organic cedarwood conditioning balm.'
      },
      {
        id: 'srv-105',
        name: 'Velvet Gel French Manicure',
        category: 'nails',
        gender: 'Women',
        price: 1400,
        originalPrice: 1700,
        durationMinutes: 50,
        description: 'Cuticle revival, dead-sea salt scrub, hand massage, and long-lasting non-toxic UV gel finish.'
      },
      {
        id: 'srv-106',
        name: 'Deep Tissue Botanical Head & Neck Spa',
        category: 'spa',
        gender: 'Unisex',
        price: 2100,
        originalPrice: 2400,
        durationMinutes: 50,
        description: 'Warm ayurvedic herbal oil application with pressure-point release therapy for intense mental decompression.'
      }
    ],
    stylists: [
      {
        id: 'sty-1',
        name: 'Alexander Wright',
        title: 'Creative Art Director',
        experience: '12+ Years',
        speciality: 'Precision Cutting & Sculpting',
        rating: 4.96,
        reviewCount: 180,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        available: true
      },
      {
        id: 'sty-2',
        name: 'Rajesh Varma',
        title: 'Master Colorist',
        experience: '9 Years',
        speciality: 'French Balayage & Ombre',
        rating: 4.92,
        reviewCount: 142,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
        available: true
      },
      {
        id: 'sty-3',
        name: 'Elena Rostova',
        title: 'Lead Skin Esthetician',
        experience: '8 Years',
        speciality: 'Hydra-dermabrasion & Peels',
        rating: 4.88,
        reviewCount: 96,
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
        available: true
      }
    ],
    reviews: [
      {
        id: 'rev-1',
        userName: 'Pooja Hegde',
        userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: '2 days ago',
        serviceName: 'French Balayage & Gloss Therapy',
        comment: 'Hands down the most luxurious salon experience in the city. Rajesh understood exactly what tone I wanted without brassiness. The coffee and ambiance are on another level!'
      },
      {
        id: 'rev-2',
        userName: 'Vikramaditya Rao',
        userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: '1 week ago',
        serviceName: 'Artisanal Hot Towel Beard Sculpt',
        comment: 'Impeccable hygiene and attention to detail. The hot towel treatment and straight razor glide were completely painless and relaxing.'
      }
    ]
  },
  {
    id: 'salon-2',
    name: 'Maison Noir Gentlemen’s Parlour',
    tagline: 'Old-School Craftsmanship, Modern Precision',
    description: 'An exclusive men’s grooming sanctuary dressed in dark oak and brushed brass. Specialized in bespoke fades, beard architectural shaping, and classic wet shaves accompanied by artisanal grooming tonics.',
    rating: 4.85,
    reviewCount: 219,
    distanceKm: 2.4,
    address: '18 Richmond Road, Near Central Square',
    city: 'Bengaluru',
    lat: 12.9654,
    lng: 77.6012,
    gender: 'Men',
    startingPrice: 650,
    isOpenNow: true,
    openingHours: '08:30 AM - 08:30 PM',
    verified: true,
    featured: true,
    badge: 'Gentlemen Choice',
    coverImage: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=1000&q=80'
    ],
    amenities: ['Vintage Leather Seating', 'Single Malt Lounge', 'Steam Towel Bar', 'Shoeshine Service'],
    services: [
      {
        id: 'srv-201',
        name: 'The Executive Scissor Cut',
        category: 'haircut',
        gender: 'Men',
        price: 900,
        originalPrice: 1100,
        durationMinutes: 40,
        description: 'Precision scissor and taper work tailored to face structure, finished with eucalyptus sea-salt spray.',
        popular: true
      },
      {
        id: 'srv-202',
        name: 'Royal Shave & Face Therapy',
        category: 'beard',
        gender: 'Men',
        price: 750,
        originalPrice: 950,
        durationMinutes: 35,
        description: 'Double hot towel lather, single feather-blade shave, cold compression and mint after-balm.'
      },
      {
        id: 'srv-203',
        name: 'Charcoal Charcoal Detox Beard Facial',
        category: 'facial',
        gender: 'Men',
        price: 1800,
        originalPrice: 2200,
        durationMinutes: 45,
        description: 'Unclogs deep pores underneath facial hair, blackhead extraction, and ultrasonic serum infusion.'
      }
    ],
    stylists: [
      {
        id: 'sty-21',
        name: 'Marcus Vance',
        title: 'Master Barber',
        experience: '10 Years',
        speciality: 'Skin Fades & Beard Architecture',
        rating: 4.95,
        reviewCount: 165,
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80',
        available: true
      },
      {
        id: 'sty-22',
        name: 'Devraj Kapoor',
        title: 'Senior Stylist',
        experience: '6 Years',
        speciality: 'Classic Scissor Tapers',
        rating: 4.82,
        reviewCount: 94,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
        available: true
      }
    ],
    reviews: [
      {
        id: 'rev-21',
        userName: 'Siddharth Nair',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: '3 days ago',
        serviceName: 'The Executive Scissor Cut',
        comment: 'Best barber in town without question. The attention Marcus pays to lines and blending is unmatched.'
      }
    ]
  },
  {
    id: 'salon-3',
    name: 'Aura Bloom Organic Salon & Spa',
    tagline: 'Clean Beauty, Ethical Ingredients, Total Radiance',
    description: 'An eco-luxe botanical salon dedicated to toxin-free haircare, vegan facials, and ayurvedic scalp therapies. Flooded with natural greenery, soft sand tones, and serene minimalist aesthetics.',
    rating: 4.92,
    reviewCount: 412,
    distanceKm: 3.1,
    address: '104 Koregaon Heights, Vittal Mallya Road',
    city: 'Bengaluru',
    lat: 12.9735,
    lng: 77.5998,
    gender: 'Women',
    startingPrice: 1100,
    isOpenNow: true,
    openingHours: '09:30 AM - 08:00 PM',
    verified: true,
    featured: true,
    badge: 'Eco-Luxury',
    coverImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=1000&q=80'
    ],
    amenities: ['100% Organic Products', 'Herbal Tea Bar', 'Aroma Diffusers', 'Quiet Zen Zone'],
    services: [
      {
        id: 'srv-301',
        name: 'Botanical Keratin Infusion & Glass Hair',
        category: 'hairstyling',
        gender: 'Women',
        price: 3900,
        originalPrice: 4600,
        durationMinutes: 90,
        description: 'Formaldehyde-free organic smoothing treatment that restores silkiness and reflects glass-like shine.',
        popular: true
      },
      {
        id: 'srv-302',
        name: 'Rose Quartz Guasha Radiance Facial',
        category: 'facial',
        gender: 'Women',
        price: 2600,
        originalPrice: 3100,
        durationMinutes: 60,
        description: 'Lymphatic drainage massage using cold crystal tools, organic damask rose oil, and peptide mask.',
        popular: true
      },
      {
        id: 'srv-303',
        name: 'Bridal Editorial Glam Makeup',
        category: 'makeup',
        gender: 'Women',
        price: 6500,
        originalPrice: 7500,
        durationMinutes: 90,
        description: 'High-definition bridal makeup with custom mink lashes, airbrush base, and waterproof radiance seal.'
      }
    ],
    stylists: [
      {
        id: 'sty-31',
        name: 'Meera Sen',
        title: 'Celebrity Makeup & Skin Artist',
        experience: '11 Years',
        speciality: 'Editorial Glam & Botanical Skin',
        rating: 4.97,
        reviewCount: 230,
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
        available: true
      },
      {
        id: 'sty-32',
        name: 'Tara D’Souza',
        title: 'Hair Transformation Specialist',
        experience: '7 Years',
        speciality: 'Botanical Keratin & Curls',
        rating: 4.89,
        reviewCount: 118,
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
        available: true
      }
    ],
    reviews: [
      {
        id: 'rev-31',
        userName: 'Ananya Deshmukh',
        userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: '5 days ago',
        serviceName: 'Rose Quartz Guasha Radiance Facial',
        comment: 'My skin literally glowed for a week! The calm scent of lavender and the delicate touch of Meera were absolute perfection.'
      }
    ]
  },
  {
    id: 'salon-4',
    name: 'Solfège Hair & Wellness Lab',
    tagline: 'Sound, Symmetry, Style',
    description: 'A revolutionary salon concept integrating binaural sound frequencies with bespoke hair contouring. Every hair design is calibrated to facial geometry and lifestyle rhythm.',
    rating: 4.78,
    reviewCount: 167,
    distanceKm: 4.5,
    address: '77 Defence Colony, 100 Feet Road',
    city: 'Bengaluru',
    lat: 12.9782,
    lng: 77.6415,
    gender: 'Unisex',
    startingPrice: 750,
    isOpenNow: false,
    openingHours: '10:00 AM - 08:30 PM',
    verified: true,
    featured: false,
    badge: 'Trending Now',
    coverImage: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=80'
    ],
    amenities: ['Noise Cancelling Headphones', 'Ergonomic Wash Pods', 'Vegan Cafe'],
    services: [
      {
        id: 'srv-401',
        name: 'Geometric Hair Cut & Styling',
        category: 'haircut',
        gender: 'Unisex',
        price: 1100,
        originalPrice: 1300,
        durationMinutes: 45,
        description: 'Precision angle cutting for low-maintenance effortless everyday motion.'
      },
      {
        id: 'srv-402',
        name: 'Scalp Detox & Micro-Needle Therapy',
        category: 'spa',
        gender: 'Unisex',
        price: 2800,
        originalPrice: 3400,
        durationMinutes: 60,
        description: 'Deep follicle purifying treatment with peptide growth factor infusion.'
      }
    ],
    stylists: [
      {
        id: 'sty-41',
        name: 'Arjun Menon',
        title: 'Creative Stylist',
        experience: '6 Years',
        speciality: 'Geometric cuts & Texture styling',
        rating: 4.85,
        reviewCount: 89,
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
        available: true
      }
    ],
    reviews: [
      {
        id: 'rev-41',
        userName: 'Kunal Singhania',
        userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        rating: 4.8,
        date: '2 weeks ago',
        serviceName: 'Geometric Hair Cut & Styling',
        comment: 'Great haircut experience with customized audio during the shampoo. Super chill atmosphere.'
      }
    ]
  },
  {
    id: 'salon-5',
    name: 'Noir & Blanc Nail Studio',
    tagline: 'Haute Nail Architecture & Pedicure Sanctuary',
    description: 'High-fashion nail atelier specializing in Japanese builder gels, Russian dry manicure techniques, and minimalist chrome artistry. Every utensil is autoclave medical-sterilized.',
    rating: 4.95,
    reviewCount: 290,
    distanceKm: 1.8,
    address: '9 Cunningham Crescent, Vasanth Nagar',
    city: 'Bengaluru',
    lat: 12.9866,
    lng: 77.5925,
    gender: 'Women',
    startingPrice: 950,
    isOpenNow: true,
    openingHours: '10:00 AM - 08:00 PM',
    verified: true,
    featured: false,
    badge: 'Nail Specialist',
    coverImage: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1000&q=80'
    ],
    amenities: ['Autoclave Sterilization', 'Reclining Foot Pods', 'Champagne Mimosa Bar'],
    services: [
      {
        id: 'srv-501',
        name: 'Russian Dry Manicure & Biab Overlay',
        category: 'nails',
        gender: 'Women',
        price: 1850,
        originalPrice: 2200,
        durationMinutes: 60,
        description: 'E-file precise cuticle cleanup with Builder In A Bottle strengthening layer that lasts 4+ weeks.',
        popular: true
      },
      {
        id: 'srv-502',
        name: 'Caviar & Gold Luxury Pedicure',
        category: 'nails',
        gender: 'Women',
        price: 2400,
        originalPrice: 2800,
        durationMinutes: 75,
        description: 'Warm milk soak, 24k gold leaf scrub, paraffin dip, hot stone foot massage.'
      }
    ],
    stylists: [
      {
        id: 'sty-51',
        name: 'Chloe Zhang',
        title: 'Master Nail Artist',
        experience: '9 Years',
        speciality: 'Russian Manicure & Japanese Gel',
        rating: 4.98,
        reviewCount: 210,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        available: true
      }
    ],
    reviews: [
      {
        id: 'rev-51',
        userName: 'Divya Reddy',
        userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: '3 days ago',
        serviceName: 'Russian Dry Manicure & Biab Overlay',
        comment: 'Cleanest cuticles of my life. 3 weeks later and not a single chip. Chloe is a wizard.'
      }
    ]
  },
  {
    id: 'salon-6',
    name: 'Opulence Ayurvedic Spa & Wellness',
    tagline: 'Ancient Indian Rituals, Timeless Rejuvenation',
    description: 'An oasis of tranquility offering Shirodhara, authentic Swedish & Balinese body therapies, and herbal steam baths in quiet teakwood pavilions surrounded by water fountains.',
    rating: 4.88,
    reviewCount: 195,
    distanceKm: 5.2,
    address: '33 Palace Road, High Grounds',
    city: 'Bengaluru',
    lat: 12.9922,
    lng: 77.5878,
    gender: 'Unisex',
    startingPrice: 1500,
    isOpenNow: true,
    openingHours: '08:00 AM - 09:30 PM',
    verified: true,
    featured: true,
    badge: 'Luxury Wellness',
    coverImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=1000&q=80'
    ],
    amenities: ['Couples Suites', 'Herbal Steam Chamber', 'Organic Botanical Baths', 'Sound Bath'],
    services: [
      {
        id: 'srv-601',
        name: 'Royal Shirodhara & Scalp Awakening',
        category: 'spa',
        gender: 'Unisex',
        price: 3200,
        originalPrice: 3800,
        durationMinutes: 60,
        description: 'Continuous stream of medicated warm herbal oil poured rhythmically over the forehead for deep neurological stillness.'
      },
      {
        id: 'srv-602',
        name: 'Full Body Aromatherapy Bliss',
        category: 'spa',
        gender: 'Unisex',
        price: 2900,
        originalPrice: 3500,
        durationMinutes: 75,
        description: 'Swedish long gliding strokes combined with cold-pressed ylang-ylang and sandalwood essential oils.'
      }
    ],
    stylists: [
      {
        id: 'sty-61',
        name: 'Guruprasad Nambiar',
        title: 'Master Ayurvedic Therapist',
        experience: '14 Years',
        speciality: 'Shirodhara & Marma Point Therapy',
        rating: 4.94,
        reviewCount: 140,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
        available: true
      }
    ],
    reviews: [
      {
        id: 'rev-61',
        userName: 'Rhea Chakraborty',
        userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: '1 week ago',
        serviceName: 'Royal Shirodhara & Scalp Awakening',
        comment: 'Cured my insomnia after just one session. Unbelievable peaceful vibe.'
      }
    ]
  }
];

export const MOCK_COUPONS = [
  {
    code: 'SALONX50',
    discountPercent: 50,
    maxDiscount: 500,
    minBookingAmount: 800,
    description: '50% OFF up to ₹500 on your first booking with SalonX'
  },
  {
    code: 'LUXE20',
    discountPercent: 20,
    maxDiscount: 800,
    minBookingAmount: 1500,
    description: '20% OFF up to ₹800 on Premier Luxe salons'
  },
  {
    code: 'GLOWUP',
    discountAmount: 300,
    minBookingAmount: 1200,
    description: 'Flat ₹300 OFF on all skin & facial packages'
  }
];

export const DEMO_USERS = {
  customer: {
    id: 'usr-customer-1',
    name: 'Priya Sharma',
    email: 'priya@example.com',
    role: 'CUSTOMER',
    phone: '+91 98765 43210',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    savedAddresses: [
      { id: 'addr-1', label: 'Home', address: 'Apartment 402, Prestige Palms, Indiranagar', city: 'Bengaluru' },
      { id: 'addr-2', label: 'Work', address: 'WeWork Galaxy, Residency Road', city: 'Bengaluru' }
    ],
    loyaltyPoints: 480
  },
  salonOwner: {
    id: 'usr-owner-1',
    name: 'Alexander Wright',
    email: 'owner@luxe.com',
    role: 'SALON_OWNER',
    phone: '+91 98111 22334',
    salonId: 'salon-1',
    salonName: 'The Luxe Atelier',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },
  staff: {
    id: 'usr-staff-1',
    name: 'Rajesh Varma',
    email: 'rajesh@luxe.com',
    role: 'STAFF',
    phone: '+91 98222 33445',
    salonId: 'salon-1',
    salonName: 'The Luxe Atelier',
    speciality: 'Master Colorist',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  },
  admin: {
    id: 'usr-admin-1',
    name: 'Victoria Vance',
    email: 'admin@salonx.com',
    role: 'ADMIN',
    phone: '+91 98000 11223',
    title: 'SalonX Platform Lead',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
  }
};

export const INITIAL_BOOKINGS = [
  {
    id: 'SX-89241',
    salonId: 'salon-1',
    salonName: 'The Luxe Atelier',
    salonAddress: '42 Lavelle Boulevard, 2nd Floor, Indiranagar',
    salonCover: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80',
    customerId: 'usr-customer-1',
    customerName: 'Priya Sharma',
    customerPhone: '+91 98765 43210',
    services: [
      { id: 'srv-101', name: 'Signature Precision Cut & Sculpting', price: 1250, durationMinutes: 45 },
      { id: 'srv-105', name: 'Velvet Gel French Manicure', price: 1400, durationMinutes: 50 }
    ],
    stylistId: 'sty-1',
    stylistName: 'Alexander Wright',
    stylistAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    date: 'Tomorrow, 03:30 PM',
    rawDate: '2026-11-04',
    rawTime: '15:30',
    totalDuration: 95,
    subtotal: 2650,
    discount: 500,
    taxes: 180,
    totalAmount: 2330,
    paymentMethod: 'ONLINE_RAZORPAY',
    paymentStatus: 'PAID',
    status: 'CONFIRMED', // CONFIRMED, COMPLETED, CANCELLED
    notes: 'Please keep water ready with lemon slice.',
    createdAt: '2026-11-03T18:20:00.000Z'
  },
  {
    id: 'SX-77412',
    salonId: 'salon-3',
    salonName: 'Aura Bloom Organic Salon & Spa',
    salonAddress: '104 Koregaon Heights, Vittal Mallya Road',
    salonCover: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
    customerId: 'usr-customer-1',
    customerName: 'Priya Sharma',
    customerPhone: '+91 98765 43210',
    services: [
      { id: 'srv-302', name: 'Rose Quartz Guasha Radiance Facial', price: 2600, durationMinutes: 60 }
    ],
    stylistId: 'sty-31',
    stylistName: 'Meera Sen',
    stylistAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    date: 'Saturday, 11:00 AM',
    rawDate: '2026-11-07',
    rawTime: '11:00',
    totalDuration: 60,
    subtotal: 2600,
    discount: 300,
    taxes: 190,
    totalAmount: 2490,
    paymentMethod: 'ONLINE_RAZORPAY',
    paymentStatus: 'PAID',
    status: 'CONFIRMED',
    createdAt: '2026-11-02T12:00:00.000Z'
  },
  {
    id: 'SX-64109',
    salonId: 'salon-1',
    salonName: 'The Luxe Atelier',
    salonAddress: '42 Lavelle Boulevard, 2nd Floor, Indiranagar',
    salonCover: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80',
    customerId: 'usr-customer-1',
    customerName: 'Priya Sharma',
    customerPhone: '+91 98765 43210',
    services: [
      { id: 'srv-103', name: 'Hydra-Oxygenating Skin Rebirth', price: 3200, durationMinutes: 60 }
    ],
    stylistId: 'sty-3',
    stylistName: 'Elena Rostova',
    stylistAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    date: '24 Oct 2026, 04:00 PM',
    rawDate: '2026-10-24',
    rawTime: '16:00',
    totalDuration: 60,
    subtotal: 3200,
    discount: 500,
    taxes: 216,
    totalAmount: 2916,
    paymentMethod: 'PAY_AT_SALON',
    paymentStatus: 'PAID',
    status: 'COMPLETED',
    createdAt: '2026-10-22T10:15:00.000Z'
  }
];

export const TIME_SLOTS = [
  { time: '09:30 AM', period: 'Morning', available: true },
  { time: '10:30 AM', period: 'Morning', available: true },
  { time: '11:30 AM', period: 'Morning', available: false },
  { time: '12:30 PM', period: 'Afternoon', available: true },
  { time: '01:30 PM', period: 'Afternoon', available: true },
  { time: '02:30 PM', period: 'Afternoon', available: false },
  { time: '03:30 PM', period: 'Afternoon', available: true },
  { time: '04:30 PM', period: 'Evening', available: true },
  { time: '05:30 PM', period: 'Evening', available: true },
  { time: '06:30 PM', period: 'Evening', available: true },
  { time: '07:30 PM', period: 'Evening', available: false },
  { time: '08:00 PM', period: 'Evening', available: true }
];
