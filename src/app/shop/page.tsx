import { getProducts } from '@/actions/products';
import ShopContent from '@/components/ShopContent';

export const metadata = {
    title: 'المتجر | Luxury Arabic Perfume',
    description: 'تسوق أفضل العطور العربية الفاخرة.',
};

export default async function ShopPage() {
    const products = await getProducts();

    return <ShopContent initialProducts={products} />;
}
