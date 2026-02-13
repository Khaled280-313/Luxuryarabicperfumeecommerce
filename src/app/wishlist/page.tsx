'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import { Heart, ArrowLeft } from 'lucide-react';
import ProductCard from '@/components/ProductCard';

export default function WishlistPage() {
    const { wishlist } = useShop();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return <div className="min-h-screen pt-20" />;
    }

    if (wishlist.length === 0) {
        return (
            <div className="min-h-screen pt-20 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto px-4">
                    <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                        <Heart className="w-12 h-12 text-muted-foreground" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-3">قائمة الأمنيات فارغة</h2>
                    <p className="text-gray mb-8">لم تقم بإضافة أي منتجات لقائمة الأمنيات بعد</p>
                    <Link
                        href="/shop"
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
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">قائمة الأمنيات</h1>
                    <p className="text-gray">{wishlist.length} منتج</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {wishlist.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
}
