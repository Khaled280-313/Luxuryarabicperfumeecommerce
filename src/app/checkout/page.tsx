'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useShop } from '@/context/ShopContext';
import { CreditCard, Truck, MapPin, Phone, Mail, User, Lock, Check } from 'lucide-react';
import Image from 'next/image';

export default function CheckoutPage() {
    const { cart, getCartTotal, clearCart } = useShop();
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);

    const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod' | 'apple' | 'tabby'>('card');
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        city: '',
        address: '',
        buildingNumber: '',
        district: '',
        postalCode: '',
        notes: '',
    });

    useEffect(() => {
        setIsClient(true);
    }, []);

    const subtotal = getCartTotal();
    const shipping = subtotal >= 500 ? 0 : 30;
    const total = subtotal + shipping;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate order processing
        setTimeout(() => {
            clearCart();
            router.push('/order-success');
        }, 1000);
    };

    if (!isClient) {
        return <div className="min-h-screen pt-20" />;
    }

    if (cart.length === 0) {
        router.push('/cart');
        return null;
    }

    return (
        <div className="min-h-screen pt-20 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-4xl font-bold text-white mb-8">إتمام الطلب</h1>

                <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
                    {/* Checkout Form */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Contact Information */}
                        <div className="bg-card border border-border rounded-lg p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                                    <span className="text-black font-bold">1</span>
                                </div>
                                <h2 className="text-xl font-bold text-white">معلومات التواصل</h2>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">الاسم الكامل *</label>
                                    <div className="relative">
                                        <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full bg-background border border-border rounded-lg pr-11 pl-4 py-3 text-foreground focus:outline-none focus:border-primary"
                                            placeholder="أدخل اسمك الكامل"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">رقم الجوال *</label>
                                    <div className="relative">
                                        <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full bg-background border border-border rounded-lg pr-11 pl-4 py-3 text-foreground focus:outline-none focus:border-primary"
                                            placeholder="05xxxxxxxx"
                                            dir="ltr"
                                        />
                                    </div>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium mb-2">البريد الإلكتروني *</label>
                                    <div className="relative">
                                        <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full bg-background border border-border rounded-lg pr-11 pl-4 py-3 text-foreground focus:outline-none focus:border-primary"
                                            placeholder="example@email.com"
                                            dir="ltr"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Shipping Address */}
                        <div className="bg-card border border-border rounded-lg p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                                    <span className="text-black font-bold">2</span>
                                </div>
                                <h2 className="text-xl font-bold text-white">العنوان الوطني</h2>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">المدينة *</label>
                                    <div className="relative">
                                        <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                        <select
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full bg-background border border-border rounded-lg pr-11 pl-4 py-3 text-foreground focus:outline-none focus:border-primary"
                                        >
                                            <option value="">اختر المدينة</option>
                                            <option value="riyadh">الرياض</option>
                                            <option value="jeddah">جدة</option>
                                            <option value="dammam">الدمام</option>
                                            <option value="makkah">مكة المكرمة</option>
                                            <option value="madinah">المدينة المنورة</option>
                                            <option value="khobar">الخبر</option>
                                            <option value="tabuk">تبوك</option>
                                            <option value="other">مدينة أخرى</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">الحي *</label>
                                        <input
                                            type="text"
                                            name="district"
                                            value={formData.district}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary"
                                            placeholder="اسم الحي"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">رقم المبنى</label>
                                        <input
                                            type="text"
                                            name="buildingNumber"
                                            value={formData.buildingNumber}
                                            onChange={handleInputChange}
                                            className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary"
                                            placeholder="رقم المبنى"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">اسم الشارع / العنوان التفصيلي *</label>
                                    <textarea
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        required
                                        rows={2}
                                        className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary resize-none"
                                        placeholder="اسم الشارع، معلم قريب..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">الرمز البريدي</label>
                                    <input
                                        type="text"
                                        name="postalCode"
                                        value={formData.postalCode}
                                        onChange={handleInputChange}
                                        className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary"
                                        placeholder="12345"
                                        dir="ltr"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">ملاحظات إضافية (اختياري)</label>
                                    <textarea
                                        name="notes"
                                        value={formData.notes}
                                        onChange={handleInputChange}
                                        rows={2}
                                        className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary resize-none"
                                        placeholder="أي ملاحظات خاصة بالتوصيل..."
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="bg-card border border-border rounded-lg p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                                    <span className="text-black font-bold">3</span>
                                </div>
                                <h2 className="text-xl font-bold text-white">طريقة الدفع</h2>
                            </div>

                            <div className="space-y-3">
                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod('card')}
                                    className={`w-full p-4 rounded-lg border-2 transition-all text-right ${paymentMethod === 'card'
                                            ? 'border-primary bg-primary/5'
                                            : 'border-border hover:border-primary/50'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'card' ? 'border-primary' : 'border-border'
                                                }`}
                                        >
                                            {paymentMethod === 'card' && <div className="w-3 h-3 rounded-full bg-primary" />}
                                        </div>
                                        <CreditCard className="w-5 h-5 text-primary" />
                                        <div className="flex-1">
                                            <p className="font-medium text-white">بطاقة ائتمانية / مدى</p>
                                            <div className="flex gap-2 mt-1">
                                                <span className="text-xs bg-white text-black px-1 rounded font-bold">VISA</span>
                                                <span className="text-xs bg-white text-black px-1 rounded font-bold">MADA</span>
                                            </div>
                                        </div>
                                    </div>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod('apple')}
                                    className={`w-full p-4 rounded-lg border-2 transition-all text-right ${paymentMethod === 'apple'
                                            ? 'border-primary bg-primary/5'
                                            : 'border-border hover:border-primary/50'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'apple' ? 'border-primary' : 'border-border'
                                                }`}
                                        >
                                            {paymentMethod === 'apple' && <div className="w-3 h-3 rounded-full bg-primary" />}
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium text-white">أبل باي (Apple Pay)</p>
                                        </div>
                                    </div>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod('tabby')}
                                    className={`w-full p-4 rounded-lg border-2 transition-all text-right ${paymentMethod === 'tabby'
                                            ? 'border-primary bg-primary/5'
                                            : 'border-border hover:border-primary/50'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'tabby' ? 'border-primary' : 'border-border'
                                                }`}
                                        >
                                            {paymentMethod === 'tabby' && <div className="w-3 h-3 rounded-full bg-primary" />}
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium text-white">تابي (Tabby)</p>
                                            <p className="text-xs text-muted-foreground">قسم فاتورتك على 4 دفعات بدون فوائد</p>
                                        </div>
                                    </div>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod('cod')}
                                    className={`w-full p-4 rounded-lg border-2 transition-all text-right ${paymentMethod === 'cod'
                                            ? 'border-primary bg-primary/5'
                                            : 'border-border hover:border-primary/50'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'cod' ? 'border-primary' : 'border-border'
                                                }`}
                                        >
                                            {paymentMethod === 'cod' && <div className="w-3 h-3 rounded-full bg-primary" />}
                                        </div>
                                        <Truck className="w-5 h-5 text-primary" />
                                        <div className="flex-1">
                                            <p className="font-medium text-white">الدفع عند الاستلام</p>
                                            <p className="text-sm text-muted-foreground">ادفع نقداً عند استلام الطلب</p>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* Security Badge */}
                        <div className="flex items-center justify-center gap-2 text-sm text-gray">
                            <Lock className="w-4 h-4" />
                            <span>جميع المعاملات آمنة ومشفرة</span>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:sticky lg:top-24 h-fit">
                        <div className="bg-card border border-border rounded-lg p-6">
                            <h3 className="text-xl font-bold text-white mb-6">ملخص الطلب</h3>

                            {/* Cart Items */}
                            <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                                {cart.map((item) => (
                                    <div key={`${item.id}-${item.selectedSize}`} className="flex gap-3">
                                        <div className="relative w-16 h-16 flex-shrink-0">
                                            <Image
                                                src={item.image}
                                                alt={item.nameAr}
                                                fill
                                                className="object-cover rounded"
                                            />
                                            <span className="absolute -top-2 -right-2 bg-primary text-black w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold z-10">
                                                {item.quantity}
                                            </span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-white line-clamp-1">{item.nameAr}</p>
                                            <p className="text-xs text-muted-foreground">{item.selectedSize}</p>
                                            <p className="text-sm font-semibold text-primary mt-1">
                                                {item.price * item.quantity} ر.س
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-3 mb-6 pt-6 border-t border-border">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray">المجموع الفرعي</span>
                                    <span className="font-semibold text-white">{subtotal} ر.س</span>
                                </div>

                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray">الشحن</span>
                                    {shipping === 0 ? (
                                        <span className="font-semibold text-primary">مجاناً</span>
                                    ) : (
                                        <span className="font-semibold text-white">{shipping} ر.س</span>
                                    )}
                                </div>

                                <div className="border-t border-border pt-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-lg font-semibold text-white">الإجمالي</span>
                                        <span className="text-2xl font-bold text-primary">{total} ر.س</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-primary hover:bg-primary/90 text-black py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all hover:scale-105"
                            >
                                <Check className="w-5 h-5" />
                                تأكيد الطلب
                            </button>

                            {/* Trust Badges */}
                            <div className="mt-6 pt-6 border-t border-border space-y-3">
                                <div className="flex items-center gap-2 text-xs text-gray">
                                    <Check className="w-4 h-4 text-primary" />
                                    <span>دفع آمن 100%</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray">
                                    <Check className="w-4 h-4 text-primary" />
                                    <span>شحن سريع 2-3 أيام</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray">
                                    <Check className="w-4 h-4 text-primary" />
                                    <span>إرجاع مجاني خلال 14 يوم</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
