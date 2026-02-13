import { Link } from 'react-router';
import { CheckCircle, ArrowLeft, Package } from 'lucide-react';
import { motion } from 'motion/react';

export default function OrderSuccess() {
  const orderNumber = Math.random().toString(36).substring(2, 10).toUpperCase();

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="w-16 h-16 text-primary" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-4xl font-bold text-white mb-4">تم تأكيد طلبك بنجاح!</h1>
          <p className="text-xl text-gray mb-2">شكراً لثقتك بنا</p>
          <p className="text-gray mb-8">
            رقم الطلب: <span className="text-primary font-mono font-semibold">#{orderNumber}</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card border border-border rounded-lg p-8 mb-8"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <Package className="w-12 h-12 text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-3">ماذا بعد؟</h3>
          <p className="text-gray leading-relaxed mb-6">
            سنقوم بمعالجة طلبك وشحنه في أقرب وقت ممكن. ستصلك رسالة تأكيد عبر البريد الإلكتروني
            تحتوي على تفاصيل الطلب ورقم التتبع.
          </p>

          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-secondary rounded-lg p-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-primary font-bold">1</span>
              </div>
              <p className="text-gray">تأكيد الطلب</p>
            </div>
            <div className="bg-secondary rounded-lg p-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-primary font-bold">2</span>
              </div>
              <p className="text-gray">التجهيز والشحن</p>
            </div>
            <div className="bg-secondary rounded-lg p-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-primary font-bold">3</span>
              </div>
              <p className="text-gray">التوصيل 2-3 أيام</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-black px-8 py-3 rounded-full font-semibold transition-colors"
          >
            العودة للرئيسية
            <ArrowLeft className="w-5 h-5 rotate-180" />
          </Link>
          <Link
            to="/shop"
            className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-black px-8 py-3 rounded-full font-semibold transition-colors"
          >
            مواصلة التسوق
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
