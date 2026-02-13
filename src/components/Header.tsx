import { Link } from 'react-router';
import { ShoppingBag, Heart, Search, Menu, X } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Header() {
  const { getCartCount, wishlist } = useShop();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center">
              <span className="text-black font-bold text-xl">ع</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-white">عطور الشرق</span>
              <span className="text-[10px] text-primary tracking-widest">ORIENTAL PERFUMES</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm text-foreground hover:text-primary transition-colors">
              الرئيسية
            </Link>
            <Link to="/shop" className="text-sm text-foreground hover:text-primary transition-colors">
              المتجر
            </Link>
            <Link to="/shop?category=men" className="text-sm text-foreground hover:text-primary transition-colors">
              رجالي
            </Link>
            <Link to="/shop?category=women" className="text-sm text-foreground hover:text-primary transition-colors">
              نسائي
            </Link>
            <Link to="/shop?limited=true" className="text-sm text-primary hover:text-primary/80 transition-colors">
              إصدار محدود
            </Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-secondary rounded-full transition-colors">
              <Search className="w-5 h-5 text-foreground" />
            </button>
            <Link to="/wishlist" className="p-2 hover:bg-secondary rounded-full transition-colors relative">
              <Heart className="w-5 h-5 text-foreground" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -left-1 bg-primary text-black text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link to="/cart" className="p-2 hover:bg-secondary rounded-full transition-colors relative">
              <ShoppingBag className="w-5 h-5 text-foreground" />
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -left-1 bg-primary text-black text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                  {getCartCount()}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 hover:bg-secondary rounded-full transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-foreground" />
              ) : (
                <Menu className="w-5 h-5 text-foreground" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-background"
          >
            <nav className="flex flex-col px-4 py-4 gap-4">
              <Link
                to="/"
                className="text-sm text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                الرئيسية
              </Link>
              <Link
                to="/shop"
                className="text-sm text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                المتجر
              </Link>
              <Link
                to="/shop?category=men"
                className="text-sm text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                رجالي
              </Link>
              <Link
                to="/shop?category=women"
                className="text-sm text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                نسائي
              </Link>
              <Link
                to="/shop?limited=true"
                className="text-sm text-primary hover:text-primary/80 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                إصدار محدود
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
