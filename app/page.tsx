'use client';

import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { Product } from '../contexts/CartContext';
import { fetchProducts } from '../lib/api';
import Link from 'next/link';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      try {
        const data = await fetchProducts();
        // Show only first 8 products on home page
        setProducts(data.slice(0, 8));
      } catch (err) {
        console.error('Error loading products:', err);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to QualityBearings
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Discover our wide range of quality products
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-xl text-gray-600">Loading products...</div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center">
            <Link
              href="/products"
              className="inline-block bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-lg"
            >
              View All Products
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
