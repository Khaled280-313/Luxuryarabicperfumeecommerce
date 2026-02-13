'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { products } from '@/lib/data/products';
import ProductCard from '@/components/ProductCard';
import { ArrowLeft, Sparkles, ShieldCheck, Truck, CreditCard, Star, Mail } from 'lucide-react';
import { useState } from 'react';

export default function Home() {
    const [email, setEmail] = useState('');
    const bestSellers = products.filter((p) => p.isBestseller).slice(0, 4);
    const limitedEdition = products.filter((p) => p.isLimited).slice(0, 3);

    const handleNewsletterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('شكراً لاشتراكك في النشرة البريدية!');
        setEmail('');
    };

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1541643600914-78b084683601?w=1920"
                        alt="Hero"
                        className="w-full h-full object-cover opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                </div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="relative z-10 text-center px-4 max-w-4xl mx-auto"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mb-6 inline-block"
                    >
                        <span className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-6 py-2 rounded-full text-sm font-medium">
                            <Sparkles className="w-4 h-4" />
                            مجموعة 2026 الفاخرة
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
                    >
                        رائحة الفخامة
                        <br />
                        <span className="text-primary">رائحة التميز</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="text-xl text-gray mb-8 max-w-2xl mx-auto leading-relaxed"
                    >
                        اكتشف مجموعتنا الحصرية من العطور الشرقية الفاخرة المصنوعة من أجود المكونات الطبيعية
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <Link
                            href="/shop"
                            className="bg-primary hover:bg-primary/90 text-black px-8 py-4 rounded-full font-semibold flex items-center gap-2 transition-all hover:scale-105"
                        >
                            تسوق الآن
                            <ArrowLeft className="w-5 h-5 rotate-180" />
                        </Link>
                        <Link
                            href="/shop?limited=true"
                            className="border-2 border-primary text-primary hover:bg-primary hover:text-black px-8 py-4 rounded-full font-semibold transition-all hover:scale-105"
                        >
                            الإصدارات المحدودة
                        </Link>
                    </motion.div>

                    {/* Scroll Indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2, repeat: Infinity, duration: 2 }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2"
                    >
                        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center pt-2">
                            <div className="w-1 h-2 bg-primary rounded-full animate-bounce" />
                        </div>
                    </motion.div>
                </motion.div>
            </section>

            {/* Trust Badges */}
            <section className="py-12 border-y border-border bg-secondary">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Truck className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="font-semibold text-foreground mb-2">شحن مجاني</h3>
                            <p className="text-sm text-muted-foreground">للطلبات فوق 500 ر.س</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-center"
                        >
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <ShieldCheck className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="font-semibold text-foreground mb-2">منتجات أصلية</h3>
                            <p className="text-sm text-muted-foreground">ضمان 100% للجودة</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-center"
                        >
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CreditCard className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="font-semibold text-foreground mb-2">دفع آمن</h3>
                            <p className="text-sm text-muted-foreground">عدة طرق للدفع</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="text-center"
                        >
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Star className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="font-semibold text-foreground mb-2">أفضل الأسعار</h3>
                            <p className="text-sm text-muted-foreground">عروض حصرية يومياً</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Best Sellers */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl font-bold text-white mb-4">الأكثر مبيعاً</h2>
                        <p className="text-xl text-gray max-w-2xl mx-auto">
                            اكتشف عطورنا الأكثر شعبية التي أحبها عملاؤنا
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {bestSellers.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mt-12"
                    >
                        <Link
                            href="/shop"
                            className="inline-flex items-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-black px-8 py-3 rounded-full font-semibold transition-all"
                        >
                            عرض جميع المنتجات
                            <ArrowLeft className="w-5 h-5 rotate-180" />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Limited Edition */}
            <section className="py-20 bg-secondary border-y border-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <span className="inline-block bg-primary/10 border border-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                            حصرياً
                        </span>
                        <h2 className="text-4xl font-bold text-white mb-4">إصدار محدود</h2>
                        <p className="text-xl text-gray max-w-2xl mx-auto">
                            مجموعة حصرية من العطور الفاخرة - كمية محدودة
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {limitedEdition.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Brand Story */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="inline-block text-primary text-sm font-medium mb-4">قصتنا</span>
                            <h2 className="text-4xl font-bold text-white mb-6">
                                تراث عريق من الفخامة والأصالة
                            </h2>
                            <p className="text-gray text-lg leading-relaxed mb-6">
                                منذ تأسيسنا، ونحن نسعى لتقديم أرقى العطور الشرقية المستوحاة من تراثنا الغني. نجمع بين
                                الحرفية التقليدية والابتكار الحديث لنقدم لكم تجربة عطرية لا تُنسى.
                            </p>
                            <p className="text-gray text-lg leading-relaxed mb-8">
                                كل عطر نصنعه هو قصة فريدة، مصنوع بعناية فائقة من أجود المكونات الطبيعية النادرة من
                                جميع أنحاء العالم.
                            </p>
                            <Link
                                href="/about"
                                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors"
                            >
                                اقرأ المزيد عن قصتنا
                                <ArrowLeft className="w-5 h-5 rotate-180" />
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="aspect-square rounded-lg overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800"
                                    alt="Brand Story"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-6 -left-6 bg-primary text-black p-8 rounded-lg">
                                <div className="text-4xl font-bold mb-1">15+</div>
                                <div className="text-sm font-medium">سنة من الخبرة</div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Customer Reviews */}
            <section className="py-20 bg-secondary border-y border-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl font-bold text-white mb-4">آراء العملاء</h2>
                        <p className="text-xl text-gray">ماذا يقول عملاؤنا عنا</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                name: 'أحمد الشمري',
                                rating: 5,
                                comment: 'جودة استثنائية وخدمة ممتازة. أفضل متجر عطور في الخليج!',
                            },
                            {
                                name: 'فاطمة العلي',
                                rating: 5,
                                comment: 'عطور فاخرة بأسعار معقولة. التوصيل سريع والتغليف راقي جداً.',
                            },
                            {
                                name: 'محمد السعيد',
                                rating: 5,
                                comment: 'تشكيلة رائعة من العطور الأصلية. سأوصي بهم لجميع أصدقائي.',
                            },
                        ].map((review, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-card border border-border rounded-lg p-6"
                            >
                                <div className="flex gap-1 mb-4">
                                    {[...Array(review.rating)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 text-primary fill-current" />
                                    ))}
                                </div>
                                <p className="text-gray leading-relaxed mb-4">{review.comment}</p>
                                <p className="text-white font-semibold">{review.name}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-12 text-center"
                    >
                        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Mail className="w-8 h-8 text-primary" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-4">اشترك في نشرتنا البريدية</h2>
                        <p className="text-gray text-lg mb-8 max-w-2xl mx-auto">
                            احصل على آخر العروض والإصدارات الحصرية مباشرة إلى بريدك الإلكتروني
                        </p>
                        <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex gap-3">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="بريدك الإلكتروني"
                                required
                                className="flex-1 bg-background border border-border rounded-full px-6 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                            />
                            <button
                                type="submit"
                                className="bg-primary hover:bg-primary/90 text-black px-8 py-3 rounded-full font-semibold transition-colors whitespace-nowrap"
                            >
                                اشترك الآن
                            </button>
                        </form>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
