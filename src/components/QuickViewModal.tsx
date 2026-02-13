import { X, ShoppingBag, Heart } from 'lucide-react';
import { Product } from '../data/products';
import { useShop } from '../context/ShopContext';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router';

interface QuickViewModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const [selectedSize, setSelectedSize] = useState(product.size[0]);
  const [selectedImage, setSelectedImage] = useState(0);

  const handleAddToCart = () => {
    addToCart(product, selectedSize);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative bg-card rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-border"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 left-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            <div className="grid md:grid-cols-2 gap-8 p-6">
              {/* Images */}
              <div className="space-y-4">
                <div className="aspect-[3/4] rounded-lg overflow-hidden bg-secondary">
                  <img
                    src={product.images[selectedImage]}
                    alt={product.nameAr}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex gap-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-1 aspect-square rounded overflow-hidden border-2 transition-colors ${
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
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-primary">{product.brandAr}</span>
                    {product.isLimited && (
                      <span className="bg-primary text-black text-xs px-3 py-1 rounded-full font-medium">
                        إصدار محدود
                      </span>
                    )}
                  </div>
                  <h2 className="text-3xl font-bold text-foreground mb-2">{product.nameAr}</h2>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-lg ${i < Math.floor(product.rating) ? 'text-primary' : 'text-muted'}`}>
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">({product.reviews} تقييم)</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-primary">{product.price} ر.س</span>
                  {product.originalPrice && (
                    <span className="text-xl text-muted-foreground line-through">
                      {product.originalPrice} ر.س
                    </span>
                  )}
                </div>

                <p className="text-muted-foreground leading-relaxed">{product.descriptionAr}</p>

                {/* Size Selection */}
                <div>
                  <label className="block text-sm font-medium mb-2">الحجم</label>
                  <div className="flex gap-2">
                    {product.size.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded border transition-colors ${
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

                {/* Stock Warning */}
                {product.stock < 10 && (
                  <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                    <p className="text-sm text-destructive">
                      ⚠ {product.stock} قطعة متبقية فقط - اطلب الآن!
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-primary hover:bg-primary/90 text-black py-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    إضافة للسلة
                  </button>
                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`w-14 h-14 rounded-lg flex items-center justify-center transition-colors ${
                      isInWishlist(product.id)
                        ? 'bg-primary text-black'
                        : 'bg-secondary hover:bg-primary hover:text-black'
                    }`}
                  >
                    <Heart className={`w-6 h-6 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <Link
                  to={`/product/${product.id}`}
                  onClick={onClose}
                  className="block text-center text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  عرض التفاصيل الكاملة ←
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
