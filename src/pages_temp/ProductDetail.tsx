import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { products, reviews } from '../data/products';
import { useShop } from '../context/ShopContext';
import { Heart, Star, ShoppingBag, Truck, ShieldCheck, CreditCard, ChevronRight, Minus, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import ProductCard from '../components/ProductCard';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product?.size[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'notes' | 'reviews'>('description');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">المنتج غير موجود</h2>
          <Link to="/shop" className="text-primary hover:text-primary/80">
            العودة للمتجر
          </Link>
        </div>
      </div>
    );
  }

  const productReviews = reviews.filter((r) => r.productId === product.id);
  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity);
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Breadcrumb */}
      <div className="bg-secondary border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">
              الرئيسية
            </Link>
            <ChevronRight className="w-4 h-4 rotate-180" />
            <Link to="/shop" className="hover:text-primary transition-colors">
              المتجر
            </Link>
            <ChevronRight className="w-4 h-4 rotate-180" />
            <span className="text-foreground">{product.nameAr}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Images */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="aspect-[3/4] rounded-lg overflow-hidden bg-secondary"
            >
              <img
                src={product.images[selectedImage]}
                alt={product.nameAr}
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <img src={image} alt={`${product.nameAr} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-primary">{product.brandAr}</span>
                <div className="flex gap-2">
                  {product.isLimited && (
                    <span className="bg-primary text-black text-xs px-3 py-1 rounded-full font-medium">
                      إصدار محدود
                    </span>
                  )}
                  {product.isBestseller && (
                    <span className="bg-white text-black text-xs px-3 py-1 rounded-full font-medium">
                      الأكثر مبيعاً
                    </span>
                  )}
                </div>
              </div>
              <h1 className="text-4xl font-bold text-white mb-3">{product.nameAr}</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating) ? 'text-primary fill-current' : 'text-muted'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-foreground font-medium">{product.rating}</span>
                <span className="text-sm text-muted-foreground">({product.reviews} تقييم)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 pb-6 border-b border-border">
              <span className="text-4xl font-bold text-primary">{product.price} ر.س</span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-muted-foreground line-through">
                    {product.originalPrice} ر.س
                  </span>
                  <span className="bg-destructive text-white text-sm px-3 py-1 rounded-full font-medium">
                    وفر {product.originalPrice - product.price} ر.س
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-gray leading-relaxed">{product.descriptionAr}</p>

            {/* Size Selection */}
            <div>
              <label className="block text-sm font-medium mb-3">الحجم</label>
              <div className="flex gap-3">
                {product.size.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3 rounded-lg border transition-colors ${
                      selectedSize === size
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border hover:border-primary'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium mb-3">الكمية</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 bg-secondary hover:bg-primary hover:text-black rounded-lg flex items-center justify-center transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-xl font-medium w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-10 h-10 bg-secondary hover:bg-primary hover:text-black rounded-lg flex items-center justify-center transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Stock Warning */}
            {product.stock < 10 && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                <p className="text-destructive font-medium">
                  ⚠ {product.stock} قطعة متبقية فقط - اطلب الآن قبل نفاد الكمية!
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-primary hover:bg-primary/90 text-black py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all hover:scale-105"
              >
                <ShoppingBag className="w-5 h-5" />
                إضافة للسلة
              </button>
              <button
                onClick={() => toggleWishlist(product)}
                className={`w-14 h-14 rounded-lg flex items-center justify-center transition-all hover:scale-105 ${
                  isInWishlist(product.id)
                    ? 'bg-primary text-black'
                    : 'bg-secondary hover:bg-primary hover:text-black'
                }`}
              >
                <Heart className={`w-6 h-6 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Truck className="w-6 h-6 text-primary" />
                </div>
                <p className="text-xs text-muted-foreground">شحن مجاني</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                </div>
                <p className="text-xs text-muted-foreground">منتج أصلي</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <CreditCard className="w-6 h-6 text-primary" />
                </div>
                <p className="text-xs text-muted-foreground">دفع آمن</p>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-secondary rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-3">طرق الدفع المتاحة:</p>
              <div className="flex flex-wrap items-center gap-3">
                <div className="bg-background px-3 py-2 rounded text-xs font-medium">VISA</div>
                <div className="bg-background px-3 py-2 rounded text-xs font-medium">Mastercard</div>
                <div className="bg-background px-3 py-2 rounded text-xs font-medium">MADA</div>
                <div className="bg-background px-3 py-2 rounded text-xs font-medium">Apple Pay</div>
                <div className="bg-background px-3 py-2 rounded text-xs font-medium text-primary">
                  الدفع عند الاستلام
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mb-16">
          <div className="border-b border-border mb-6">
            <div className="flex gap-8">
              {[
                { key: 'description', label: 'الوصف' },
                { key: 'notes', label: 'النوتات العطرية' },
                { key: 'reviews', label: `التقييمات (${productReviews.length})` },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`pb-4 font-medium transition-colors relative ${
                    activeTab === tab.key ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.key && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="max-w-4xl">
            {activeTab === 'description' && (
              <div className="space-y-4">
                <p className="text-gray leading-relaxed">{product.descriptionAr}</p>
                <p className="text-gray leading-relaxed">
                  يتميز هذا العطر بتركيبة فريدة تجمع بين الأصالة والحداثة، مصنوع من أجود المكونات الطبيعية
                  المختارة بعناية. يدوم لفترة طويلة ويترك انطباعاً لا يُنسى.
                </p>
              </div>
            )}

            {activeTab === 'notes' && (
              <div className="space-y-8">
                {/* Fragrance Pyramid */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-card border border-border rounded-lg p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <span className="text-2xl">🌸</span>
                    </div>
                    <h4 className="font-semibold text-white mb-3">النوتات العليا</h4>
                    <ul className="space-y-2">
                      {product.topNotesAr.map((note, i) => (
                        <li key={i} className="text-sm text-gray flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                          {note}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-card border border-border rounded-lg p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <span className="text-2xl">💐</span>
                    </div>
                    <h4 className="font-semibold text-white mb-3">نوتات القلب</h4>
                    <ul className="space-y-2">
                      {product.middleNotesAr.map((note, i) => (
                        <li key={i} className="text-sm text-gray flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                          {note}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-card border border-border rounded-lg p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <span className="text-2xl">🌿</span>
                    </div>
                    <h4 className="font-semibold text-white mb-3">النوتات القاعدية</h4>
                    <ul className="space-y-2">
                      {product.baseNotesAr.map((note, i) => (
                        <li key={i} className="text-sm text-gray flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                          {note}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {productReviews.length > 0 ? (
                  productReviews.map((review) => (
                    <div key={review.id} className="bg-card border border-border rounded-lg p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-semibold text-white mb-1">{review.author}</p>
                          <div className="flex items-center gap-2">
                            <div className="flex gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating ? 'text-primary fill-current' : 'text-muted'
                                  }`}
                                />
                              ))}
                            </div>
                            {review.verified && (
                              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                                مشتري مؤكد
                              </span>
                            )}
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">{review.date}</span>
                      </div>
                      <p className="text-gray leading-relaxed">{review.commentAr}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray py-8">لا توجد تقييمات بعد</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-white mb-8">منتجات مشابهة</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky Add to Cart - Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 z-40">
        <button
          onClick={handleAddToCart}
          className="w-full bg-primary hover:bg-primary/90 text-black py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
        >
          <ShoppingBag className="w-5 h-5" />
          إضافة للسلة - {product.price} ر.س
        </button>
      </div>
    </div>
  );
}
