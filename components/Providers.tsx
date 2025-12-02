'use client';

import { CartProvider } from '../contexts/CartContext';
import Header from './Header';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <Header />
      {children}
    </CartProvider>
  );
}

