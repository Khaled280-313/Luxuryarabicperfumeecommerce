import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { SlidersHorizontal, X } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { motion, AnimatePresence } from 'motion/react';

export default function Shop() {
  const [searchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('category') || 'all');
  const [selectedFragrance, setSelectedFragrance] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [showLimitedOnly, setShowLimitedOnly] = useState(searchParams.get('limited') === 'true');
  const [sortBy, setSortBy] = useState('featured');

  const brands = Array.from(new Set(products.map((p) => p.brandAr)));
  const fragranceTypes = [
    { value: 'woody', label: 'خشبي' },
    { value: 'floral', label: 'زهري' },
    { value: 'oriental', label: 'شرقي' },
    { value: 'fresh', label: 'منعش' },
    { value: 'citrus', label: 'حمضي' },
    { value: 'spicy', label: 'حار' },
  ];

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Fragrance type filter
    if (selectedFragrance !== 'all') {
      filtered = filtered.filter((p) => p.fragranceType === selectedFragrance);
    }

    // Brand filter
    if (selectedBrand !== 'all') {
      filtered = filtered.filter((p) => p.brandAr === selectedBrand);
    }

    // Price range filter
    filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Limited edition filter
    if (showLimitedOnly) {
      filtered = filtered.filter((p) => p.isLimited);
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.reverse();
        break;
      default:
        // Featured - keep original order
        break;
    }

    return filtered;
  }, [selectedCategory, selectedFragrance, selectedBrand, priceRange, showLimitedOnly, sortBy]);

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedFragrance('all');
    setSelectedBrand('all');
    setPriceRange([0, 2000]);
    setShowLimitedOnly(false);
  };

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">المتجر</h1>
            <p className="text-gray">
              {filteredAndSortedProducts.length} منتج
              {selectedCategory !== 'all' && (
                <span>
                  {' '}
                  -{' '}
                  {selectedCategory === 'men'
                    ? 'رجالي'
                    : selectedCategory === 'women'
                    ? 'نسائي'
                    : 'للجنسين'}
                </span>
              )}
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-secondary border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-primary"
            >
              <option value="featured">مميز</option>
              <option value="newest">الأحدث</option>
              <option value="price-low">السعر: من الأقل للأعلى</option>
              <option value="price-high">السعر: من الأعلى للأقل</option>
              <option value="rating">الأعلى تقييماً</option>
            </select>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden bg-secondary border border-border rounded-lg px-4 py-2 flex items-center gap-2 text-foreground"
            >
              <SlidersHorizontal className="w-5 h-5" />
              فلترة
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <AnimatePresence>
            {(showFilters || isDesktop) && (
              <motion.aside
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className={`${
                  showFilters ? 'fixed' : 'hidden'
                } lg:block lg:sticky top-24 left-0 right-0 bottom-0 lg:relative z-40 lg:w-64 flex-shrink-0 h-fit`}
              >
                <div className="bg-card border border-border rounded-lg p-6 max-h-[calc(100vh-6rem)] overflow-y-auto">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-white">التصفية</h3>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={clearFilters}
                        className="text-sm text-primary hover:text-primary/80 transition-colors"
                      >
                        مسح الكل
                      </button>
                      <button onClick={() => setShowFilters(false)} className="lg:hidden">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Category */}
                    <div>
                      <label className="block text-sm font-medium mb-3">الفئة</label>
                      <div className="space-y-2">
                        {[
                          { value: 'all', label: 'الكل' },
                          { value: 'men', label: 'رجالي' },
                          { value: 'women', label: 'نسائي' },
                          { value: 'unisex', label: 'للجنسين' },
                        ].map((cat) => (
                          <button
                            key={cat.value}
                            onClick={() => setSelectedCategory(cat.value)}
                            className={`w-full text-right px-3 py-2 rounded transition-colors ${
                              selectedCategory === cat.value
                                ? 'bg-primary/10 text-primary'
                                : 'hover:bg-secondary'
                            }`}
                          >
                            {cat.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Fragrance Type */}
                    <div>
                      <label className="block text-sm font-medium mb-3">نوع العطر</label>
                      <div className="space-y-2">
                        <button
                          onClick={() => setSelectedFragrance('all')}
                          className={`w-full text-right px-3 py-2 rounded transition-colors ${
                            selectedFragrance === 'all'
                              ? 'bg-primary/10 text-primary'
                              : 'hover:bg-secondary'
                          }`}
                        >
                          الكل
                        </button>
                        {fragranceTypes.map((type) => (
                          <button
                            key={type.value}
                            onClick={() => setSelectedFragrance(type.value)}
                            className={`w-full text-right px-3 py-2 rounded transition-colors ${
                              selectedFragrance === type.value
                                ? 'bg-primary/10 text-primary'
                                : 'hover:bg-secondary'
                            }`}
                          >
                            {type.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Brand */}
                    <div>
                      <label className="block text-sm font-medium mb-3">العلامة التجارية</label>
                      <div className="space-y-2">
                        <button
                          onClick={() => setSelectedBrand('all')}
                          className={`w-full text-right px-3 py-2 rounded transition-colors ${
                            selectedBrand === 'all'
                              ? 'bg-primary/10 text-primary'
                              : 'hover:bg-secondary'
                          }`}
                        >
                          الكل
                        </button>
                        {brands.map((brand) => (
                          <button
                            key={brand}
                            onClick={() => setSelectedBrand(brand)}
                            className={`w-full text-right px-3 py-2 rounded transition-colors ${
                              selectedBrand === brand
                                ? 'bg-primary/10 text-primary'
                                : 'hover:bg-secondary'
                            }`}
                          >
                            {brand}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Price Range */}
                    <div>
                      <label className="block text-sm font-medium mb-3">
                        السعر: {priceRange[0]} - {priceRange[1]} ر.س
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="2000"
                        step="100"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                        className="w-full accent-primary"
                      />
                    </div>

                    {/* Limited Edition */}
                    <div>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={showLimitedOnly}
                          onChange={(e) => setShowLimitedOnly(e.target.checked)}
                          className="w-5 h-5 accent-primary"
                        />
                        <span className="text-sm">إصدار محدود فقط</span>
                      </label>
                    </div>
                  </div>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredAndSortedProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl text-gray mb-4">لا توجد منتجات متطابقة مع البحث</p>
                <button
                  onClick={clearFilters}
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  مسح جميع الفلاتر
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAndSortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}