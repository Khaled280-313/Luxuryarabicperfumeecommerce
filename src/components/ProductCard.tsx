'use client';

import Link from 'next/link';
import { Heart, Eye, ShoppingBag } from 'lucide-react';
import { Product } from '@/lib/data/products';
import { useShop } from '@/context/ShopContext';
import { useState } from 'react';
import { motion } from 'motion/react';
import QuickViewModal from './QuickViewModal';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { toggleWishlist, isInWishlist, addToCart } = useShop();
  const [showQuickView, setShowQuickView] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, product.size[0]);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="group relative bg-card rounded-lg overflow-hidden border border-border hover:border-primary/30 transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link href={`/product/${product.id}`} className="block">
          {/* Image Container */}
          <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
            <img
              src={product.image}
              alt={product.nameAr}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
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
              {product.originalPrice && (
                <span className="bg-destructive text-white text-xs px-3 py-1 rounded-full font-medium">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% خصم
                </span>
              )}
            </div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              className="absolute top-3 right-3 flex flex-col gap-2"
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleWishlist(product);
                }}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isInWishlist(product.id)
                  ? 'bg-primary text-black'
                  : 'bg-white/90 text-black hover:bg-primary'
                  }`}
              >
                <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowQuickView(true);
                }}
                className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Eye className="w-5 h-5 text-black" />
              </button>
            </motion.div>

            {/* Quick Add Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
              className="absolute bottom-3 left-3 right-3"
            >
              <button
                onClick={handleQuickAdd}
                className="w-full bg-primary hover:bg-primary/90 text-black py-3 rounded-full font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <ShoppingBag className="w-4 h-4" />
                إضافة للسلة
              </button>
            </motion.div>
          </div>

          {/* Product Info */}
          <div className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-primary">{product.brandAr}</span>
              {product.stock < 10 && (
                <span className="text-xs text-destructive">
                  {product.stock} متبقي فقط
                </span>
              )}
            </div>

            <h3 className="font-semibold text-foreground line-clamp-1">{product.nameAr}</h3>

            <p className="text-sm text-muted-foreground line-clamp-2">{product.descriptionAr}</p>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <span className="text-xs text-primary">★</span>
                <span className="text-sm font-medium text-foreground">{product.rating}</span>
                <span className="text-xs text-muted-foreground">({product.reviews})</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <span className="text-2xl font-bold text-primary">{product.price} ر.س</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {product.originalPrice} ر.س
                </span>
              )}
            </div>
          </div>
        </Link>
      </motion.div>

      <QuickViewModal
        product={product}
        isOpen={showQuickView}
        onClose={() => setShowQuickView(false)}
      />
    </>
  );
}
