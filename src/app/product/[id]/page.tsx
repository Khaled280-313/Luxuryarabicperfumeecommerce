import { getProductById, getReviewsByProductId, getRelatedProducts } from '@/actions/products';
import ProductDetailContent from '@/components/ProductDetailContent';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: { id: string } }) {
    const product = await getProductById(params.id);
    if (!product) {
        return {
            title: 'المنتج غير موجود',
        };
    }
    return {
        title: `${product.nameAr} | Luxury Arabic Perfume`,
        description: product.descriptionAr,
    };
}

export default async function ProductPage({ params }: { params: { id: string } }) {
    const product = await getProductById(params.id);

    if (!product) {
        return (
            <div className="min-h-screen pt-20 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">المنتج غير موجود</h2>
                    <Link href="/shop" className="text-primary hover:text-primary/80">
                        العودة للمتجر
                    </Link>
                </div>
            </div>
        );
    }

    const reviews = await getReviewsByProductId(product.id);
    const relatedProducts = await getRelatedProducts(product.id, product.category);

    return <ProductDetailContent product={product} reviews={reviews} relatedProducts={relatedProducts} />;
}
