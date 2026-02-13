export interface Product {
  id: string;
  name: string;
  nameAr: string;
  brand: string;
  brandAr: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  description: string;
  descriptionAr: string;
  category: 'men' | 'women' | 'unisex';
  fragranceType: 'woody' | 'floral' | 'oriental' | 'fresh' | 'citrus' | 'spicy';
  size: string[];
  stock: number;
  rating: number;
  reviews: number;
  isLimited?: boolean;
  isBestseller?: boolean;
  topNotes: string[];
  middleNotes: string[];
  baseNotes: string[];
  topNotesAr: string[];
  middleNotesAr: string[];
  baseNotesAr: string[];
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  comment: string;
  commentAr: string;
  date: string;
  verified: boolean;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Oud Royale',
    nameAr: 'عود ملكي',
    brand: 'Maison Luxe',
    brandAr: 'ميزون لوكس',
    price: 1299,
    originalPrice: 1599,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800',
    images: [
      'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800',
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800',
      'https://images.unsplash.com/photo-1588405748880-12d1d2a59bd9?w=800',
    ],
    description: 'A luxurious blend of rare oud and amber, crafted for royalty.',
    descriptionAr: 'مزيج فاخر من العود النادر والعنبر، مصنوع للملوك.',
    category: 'unisex',
    fragranceType: 'oriental',
    size: ['50ml', '100ml', '200ml'],
    stock: 8,
    rating: 4.9,
    reviews: 247,
    isLimited: true,
    isBestseller: true,
    topNotes: ['Saffron', 'Cardamom', 'Bergamot'],
    middleNotes: ['Oud', 'Rose', 'Jasmine'],
    baseNotes: ['Amber', 'Musk', 'Sandalwood'],
    topNotesAr: ['زعفران', 'هيل', 'برغموت'],
    middleNotesAr: ['عود', 'ورد', 'ياسمين'],
    baseNotesAr: ['عنبر', 'مسك', 'صندل'],
  },
  {
    id: '2',
    name: 'Desert Rose',
    nameAr: 'وردة الصحراء',
    brand: 'Attar Al Sharq',
    brandAr: 'عطر الشرق',
    price: 899,
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800',
    images: [
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800',
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=800',
    ],
    description: 'Delicate rose petals meet warm amber in this feminine masterpiece.',
    descriptionAr: 'بتلات الورد الرقيقة تلتقي بالعنبر الدافئ في هذه التحفة الأنثوية.',
    category: 'women',
    fragranceType: 'floral',
    size: ['50ml', '100ml'],
    stock: 15,
    rating: 4.8,
    reviews: 189,
    isBestseller: true,
    topNotes: ['Rose', 'Peony', 'Litchi'],
    middleNotes: ['Turkish Rose', 'Peach', 'Magnolia'],
    baseNotes: ['Amber', 'Vanilla', 'Patchouli'],
    topNotesAr: ['ورد', 'فاوانيا', 'ليتشي'],
    middleNotesAr: ['ورد تركي', 'خوخ', 'ماغنوليا'],
    baseNotesAr: ['عنبر', 'فانيليا', 'باتشولي'],
  },
  {
    id: '3',
    name: 'Black Musk',
    nameAr: 'مسك أسود',
    brand: 'Noir Essence',
    brandAr: 'نوار إسانس',
    price: 1099,
    image: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=800',
    images: [
      'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=800',
      'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=800',
    ],
    description: 'Intense and mysterious, a signature scent for the modern gentleman.',
    descriptionAr: 'عطر قوي وغامض، رائحة مميزة للرجل العصري.',
    category: 'men',
    fragranceType: 'woody',
    size: ['50ml', '100ml', '150ml'],
    stock: 12,
    rating: 4.7,
    reviews: 156,
    isBestseller: true,
    topNotes: ['Black Pepper', 'Lavender', 'Grapefruit'],
    middleNotes: ['Musk', 'Vetiver', 'Cedar'],
    baseNotes: ['Leather', 'Tonka Bean', 'Oakmoss'],
    topNotesAr: ['فلفل أسود', 'لافندر', 'جريب فروت'],
    middleNotesAr: ['مسك', 'فيتيفر', 'أرز'],
    baseNotesAr: ['جلد', 'تونكا', 'طحلب البلوط'],
  },
  {
    id: '4',
    name: 'Amber Nights',
    nameAr: 'ليالي العنبر',
    brand: 'Maison Luxe',
    brandAr: 'ميزون لوكس',
    price: 1450,
    image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=800',
    images: [
      'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=800',
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800',
    ],
    description: 'A warm embrace of amber and vanilla, perfect for evening wear.',
    descriptionAr: 'عناق دافئ من العنبر والفانيليا، مثالي للمساء.',
    category: 'unisex',
    fragranceType: 'oriental',
    size: ['75ml', '150ml'],
    stock: 5,
    rating: 4.9,
    reviews: 203,
    isLimited: true,
    topNotes: ['Orange Blossom', 'Cinnamon'],
    middleNotes: ['Amber', 'Incense', 'Myrrh'],
    baseNotes: ['Vanilla', 'Benzoin', 'Labdanum'],
    topNotesAr: ['زهر البرتقال', 'قرفة'],
    middleNotesAr: ['عنبر', 'بخور', 'مر'],
    baseNotesAr: ['فانيليا', 'بنزوين', 'لبدانوم'],
  },
  {
    id: '5',
    name: 'Ocean Breeze',
    nameAr: 'نسيم المحيط',
    brand: 'Azure Collection',
    brandAr: 'مجموعة أزور',
    price: 749,
    image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=800',
    images: [
      'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=800',
      'https://images.unsplash.com/photo-1610439092477-aa5c4beac541?w=800',
    ],
    description: 'Fresh and invigorating, capturing the essence of the sea.',
    descriptionAr: 'منعش ومنشط، يجسد جوهر البحر.',
    category: 'men',
    fragranceType: 'fresh',
    size: ['50ml', '100ml'],
    stock: 20,
    rating: 4.6,
    reviews: 134,
    topNotes: ['Sea Salt', 'Mint', 'Lemon'],
    middleNotes: ['Marine Notes', 'Lavender', 'Rosemary'],
    baseNotes: ['Driftwood', 'Musk', 'Amber'],
    topNotesAr: ['ملح البحر', 'نعناع', 'ليمون'],
    middleNotesAr: ['نوتات بحرية', 'لافندر', 'إكليل الجبل'],
    baseNotesAr: ['خشب مجروف', 'مسك', 'عنبر'],
  },
  {
    id: '6',
    name: 'Jasmine Garden',
    nameAr: 'حديقة الياسمين',
    brand: 'Fleur de Luxe',
    brandAr: 'زهرة لوكس',
    price: 950,
    image: 'https://images.unsplash.com/photo-1587556930832-f79e8e0c6b6a?w=800',
    images: [
      'https://images.unsplash.com/photo-1587556930832-f79e8e0c6b6a?w=800',
      'https://images.unsplash.com/photo-1615632047171-4abbbb056949?w=800',
    ],
    description: 'Pure jasmine blossoms in a bottle, elegant and timeless.',
    descriptionAr: 'زهور الياسمين النقية في زجاجة، أنيقة وخالدة.',
    category: 'women',
    fragranceType: 'floral',
    size: ['50ml', '100ml'],
    stock: 18,
    rating: 4.8,
    reviews: 178,
    topNotes: ['Jasmine', 'Neroli', 'Green Tea'],
    middleNotes: ['White Jasmine', 'Lily', 'Tuberose'],
    baseNotes: ['White Musk', 'Cedarwood', 'Honey'],
    topNotesAr: ['ياسمين', 'نيرولي', 'شاي أخضر'],
    middleNotesAr: ['ياسمين أبيض', 'زنبق', 'تيوبروز'],
    baseNotesAr: ['مسك أبيض', 'خشب الأرز', 'عسل'],
  },
  {
    id: '7',
    name: 'Spice Route',
    nameAr: 'طريق التوابل',
    brand: 'Orient Express',
    brandAr: 'أورينت إكسبرس',
    price: 1199,
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800',
    images: [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800',
      'https://images.unsplash.com/photo-1557170334-a9632ea8952f?w=800',
    ],
    description: 'An exotic journey through ancient spice markets.',
    descriptionAr: 'رحلة غريبة عبر أسواق التوابل القديمة.',
    category: 'unisex',
    fragranceType: 'spicy',
    size: ['50ml', '100ml', '200ml'],
    stock: 10,
    rating: 4.7,
    reviews: 142,
    isLimited: true,
    topNotes: ['Cardamom', 'Pink Pepper', 'Coriander'],
    middleNotes: ['Saffron', 'Cinnamon', 'Nutmeg'],
    baseNotes: ['Oud', 'Patchouli', 'Amber'],
    topNotesAr: ['هيل', 'فلفل وردي', 'كزبرة'],
    middleNotesAr: ['زعفران', 'قرفة', 'جوزة الطيب'],
    baseNotesAr: ['عود', 'باتشولي', 'عنبر'],
  },
  {
    id: '8',
    name: 'White Gardenia',
    nameAr: 'غاردينيا بيضاء',
    brand: 'Fleur de Luxe',
    brandAr: 'زهرة لوكس',
    price: 1050,
    image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800',
    images: [
      'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800',
      'https://images.unsplash.com/photo-1528991435120-e73e05a58897?w=800',
    ],
    description: 'Creamy gardenia petals with a touch of sophistication.',
    descriptionAr: 'بتلات الغاردينيا الكريمية مع لمسة من الرقي.',
    category: 'women',
    fragranceType: 'floral',
    size: ['50ml', '100ml'],
    stock: 14,
    rating: 4.8,
    reviews: 167,
    topNotes: ['Gardenia', 'Pear', 'Coconut'],
    middleNotes: ['Tuberose', 'Ylang-Ylang', 'Orange Blossom'],
    baseNotes: ['Sandalwood', 'Musk', 'Vanilla'],
    topNotesAr: ['غاردينيا', 'كمثرى', 'جوز الهند'],
    middleNotesAr: ['تيوبروز', 'يلانج يلانج', 'زهر البرتقال'],
    baseNotesAr: ['صندل', 'مسك', 'فانيليا'],
  },
];

export const reviews: Review[] = [
  {
    id: '1',
    productId: '1',
    author: 'أحمد الشمري',
    rating: 5,
    comment: 'Exceptional quality! The scent lasts all day.',
    commentAr: 'جودة استثنائية! الرائحة تدوم طوال اليوم.',
    date: '2026-02-01',
    verified: true,
  },
  {
    id: '2',
    productId: '1',
    author: 'فاطمة العلي',
    rating: 5,
    comment: 'Absolutely luxurious. Worth every riyal!',
    commentAr: 'فاخر للغاية. يستحق كل ريال!',
    date: '2026-01-28',
    verified: true,
  },
  {
    id: '3',
    productId: '2',
    author: 'نورة المطيري',
    rating: 5,
    comment: 'My new signature scent. Elegant and sophisticated.',
    commentAr: 'عطري المميز الجديد. أنيق ومتطور.',
    date: '2026-02-05',
    verified: true,
  },
  {
    id: '4',
    productId: '3',
    author: 'محمد السعيد',
    rating: 5,
    comment: 'Perfect for business meetings. Very professional.',
    commentAr: 'مثالي لاجتماعات العمل. احترافي جداً.',
    date: '2026-02-10',
    verified: true,
  },
];
