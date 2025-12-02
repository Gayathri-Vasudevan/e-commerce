'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '../../../contexts/CartContext';
import { useCart } from '../../../contexts/CartContext';
import { fetchProduct } from '../../../lib/api';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = Number(params.id);
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProduct() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchProduct(productId);
        if (data) {
          setProduct(data);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError('Failed to load product');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (productId) {
      loadProduct();
    }
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-xl text-gray-600">Loading product...</div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col justify-center items-center min-h-[400px]">
          <div className="text-xl text-red-600 mb-4">
            {error || 'Product not found'}
          </div>
          <Link
            href="/products"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/products"
        className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
      >
        ← Back to Products
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative h-96 w-full bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-8"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {product.title}
          </h1>
          <div className="mb-4">
            <span className="text-4xl font-bold text-blue-600">
              ${product.price.toFixed(2)}
            </span>
          </div>
          <div className="mb-4">
            <span className="inline-block bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm capitalize">
              {product.category}
            </span>
          </div>
          {product.rating && (
            <div className="mb-6 flex items-center">
              <span className="text-yellow-500 text-xl">★</span>
              <span className="text-lg text-gray-700 ml-2">
                {product.rating.rate} ({product.rating.count} reviews)
              </span>
            </div>
          )}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Description
            </h2>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>
          <button
            onClick={handleAddToCart}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-lg"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

