'use server';

import { supabase } from '@/lib/supabase';
import { products as mockProducts } from '@/lib/data/products';

export async function getProducts() {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
        console.warn('Supabase credentials not found, serving mock data.');
        return mockProducts;
    }

    const { data, error } = await supabase.from('products').select('*');

    if (error) {
        console.error('Error fetching products:', error);
        return mockProducts; // Fallback to mock data on error
    }

    return data.length > 0 ? data : mockProducts;
}

export async function getProductById(id: string) {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
        return mockProducts.find((p) => p.id === id);
    }

    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching product:', error);
        return mockProducts.find((p) => p.id === id);
    }

    return data;
}

export async function getReviewsByProductId(productId: string) {
    // In a real app, fetch from Supabase 'reviews' table
    const { reviews } = await import('@/lib/data/products');
    return reviews.filter((r) => r.productId === productId);
}

export async function getRelatedProducts(productId: string, category: string) {
    const products = await getProducts();
    return products
        .filter((p) => p.id !== productId && p.category === category)
        .slice(0, 4);
}
