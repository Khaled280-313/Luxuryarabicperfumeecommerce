import { Link, useNavigate } from 'react-router';
import { useShop } from '../context/ShopContext';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useShop();
  const navigate = useNavigate();

  const subtotal = getCartTotal();
  const shipping = subtotal >= 500 ? 0 : 30;
  const total = subtotal + shipping;
  const freeShippingProgress = Math.min((subtotal / 500) * 100, 100);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-12 h-12 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">سلة التسوق فارغة</h2>
          <p className="text-gray mb-8">لم تقم بإضافة أي منتجات بعد</p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-black px-8 py-3 rounded-full font-semibold transition-colors"
          >
            تسوق الآن
            <ArrowLeft className="w-5 h-5 rotate-180" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-white mb-8">سلة التسوق</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {/* Free Shipping Progress */}
            {subtotal < 500 && (
              <div className="bg-card border border-border rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-foreground">
                    أضف <span className="text-primary font-semibold">{500 - subtotal} ر.س</span> للحصول
                    على الشحن المجاني
                  </p>
                  <span className="text-sm text-primary font-medium">{Math.round(freeShippingProgress)}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${freeShippingProgress}%` }}
                    className="bg-primary h-full"
                  />
                </div>
              </div>
            )}

            {cart.map((item) => (
              <motion.div
                key={`${item.id}-${item.selectedSize}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-card border border-border rounded-lg p-4 flex gap-4"
              >
                <Link to={`/product/${item.id}`} className="flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.nameAr}
                    className="w-24 h-24 object-cover rounded"
                  />
                </Link>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex-1">
                      <Link
                        to={`/product/${item.id}`}
                        className="font-semibold text-white hover:text-primary transition-colors line-clamp-1"
                      >
                        {item.nameAr}
                      </Link>
                      <p className="text-sm text-muted-foreground">{item.brandAr}</p>
                      <p className="text-sm text-muted-foreground mt-1">الحجم: {item.selectedSize}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id, item.selectedSize)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                        className="w-8 h-8 bg-secondary hover:bg-primary hover:text-black rounded flex items-center justify-center transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-lg font-medium w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                        disabled={item.quantity >= item.stock}
                        className="w-8 h-8 bg-secondary hover:bg-primary hover:text-black rounded flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-left">
                      <p className="text-xl font-bold text-primary">{item.price * item.quantity} ر.س</p>
                      {item.quantity > 1 && (
                        <p className="text-xs text-muted-foreground">{item.price} ر.س للقطعة</p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-6">ملخص الطلب</h3>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray">المجموع الفرعي</span>
                  <span className="font-semibold text-white">{subtotal} ر.س</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray">الشحن</span>
                  {shipping === 0 ? (
                    <span className="font-semibold text-primary">مجاناً</span>
                  ) : (
                    <span className="font-semibold text-white">{shipping} ر.س</span>
                  )}
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-white">الإجمالي</span>
                    <span className="text-2xl font-bold text-primary">{total} ر.س</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-primary hover:bg-primary/90 text-black py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all hover:scale-105 mb-4"
              >
                إتمام الطلب
                <ArrowLeft className="w-5 h-5 rotate-180" />
              </button>

              <Link
                to="/shop"
                className="block text-center text-primary hover:text-primary/80 transition-colors"
              >
                مواصلة التسوق
              </Link>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-border space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary">✓</span>
                  </div>
                  <span>دفع آمن ومشفر</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary">✓</span>
                  </div>
                  <span>شحن سريع وموثوق</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary">✓</span>
                  </div>
                  <span>إرجاع مجاني خلال 14 يوم</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
