'use client';

import React from 'react';
import { ShoppingCart } from 'lucide-react';

const Cart: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <div className="p-3 rounded-xl bg-orange-500/10">
          <ShoppingCart className="w-8 h-8 text-orange-500" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Shopping Cart</h1>
          <p className="text-accent-light/60 dark:text-accent-dark/60">Review and checkout your selected domains</p>
        </div>
      </div>
      
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <div className="p-6 rounded-full bg-orange-500/10 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
            <ShoppingCart className="w-10 h-10 text-orange-500" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
          <p className="text-accent-light/60 dark:text-accent-dark/60">
            Add some domains to your cart to get started
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart; 