/* eslint-disable */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { validateCoupon, processCheckout } from "./actions";
import { Tag, Loader2, X } from "lucide-react";

export default function CartPage() {
  const router = useRouter();
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{code: string, discount: number} | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [loading, setLoading] = useState({ apply: false, checkout: false });

  const handleApplyCoupon = async () => {
    if (!couponCode) return;
    setLoading(prev => ({ ...prev, apply: true }));
    setCouponError(null);

    const res = await validateCoupon(couponCode, totalPrice);
    if (res.error) {
      setCouponError(res.error);
      setAppliedCoupon(null);
    } else if (res.success) {
      setAppliedCoupon({ code: res.coupon.code, discount: res.discountAmount || 0 });
      setCouponCode('');
    }
    
    setLoading(prev => ({ ...prev, apply: false }));
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError(null);
  };

  const handleCheckout = async () => {
    setLoading(prev => ({ ...prev, checkout: true }));
    setCouponError(null);

    const res = await processCheckout(totalPrice, appliedCoupon?.code);
    
    if (res.error) {
      setCouponError(res.error);
      if (res.error.includes('Coupon')) {
        setAppliedCoupon(null); // Invalidated coupon at checkout
      }
      setLoading(prev => ({ ...prev, checkout: false }));
    } else {
      // Success! Clear cart and redirect to account page
      clearCart();
      router.push('/account?success=order_placed');
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 min-h-[60vh] flex flex-col items-center justify-center">
        <svg className="w-24 h-24 text-gray-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <circle cx="8" cy="21" r="1" />
          <circle cx="19" cy="21" r="1" />
          <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">Your cart is empty</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-center max-w-md">
          Looks like you haven't added anything to your cart yet. Let's get you back to shopping.
        </p>
        <Link href="/" className="inline-flex justify-center rounded-md border border-transparent bg-black px-8 py-3 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 dark:bg-white dark:text-black dark:hover:bg-gray-200">
          Continue Shopping
        </Link>
      </div>
    );
  }

  const tax = Math.round((totalPrice - (appliedCoupon?.discount || 0)) * 0.18);
  const finalTotal = totalPrice - (appliedCoupon?.discount || 0) + tax;

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-10">Shopping Cart</h1>

      <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
        <section aria-labelledby="cart-heading" className="lg:col-span-7">
          <h2 id="cart-heading" className="sr-only">Items in your shopping cart</h2>

          <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-800 border-t border-b border-gray-200 dark:border-gray-800">
            {items.map((item, itemIdx) => (
              <li key={item.id.toString()} className="flex py-6 sm:py-10">
                <div className="flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48 bg-gray-100"
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                  <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                    <div>
                      <div className="flex justify-between">
                        <h3 className="text-sm">
                          <Link href="#" className="font-medium text-gray-700 dark:text-gray-200 hover:text-gray-800 dark:hover:text-white">
                            {item.name}
                          </Link>
                        </h3>
                      </div>
                      <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">₹{item.price}</p>
                    </div>

                    <div className="mt-4 sm:mt-0 sm:pr-9">
                      <label htmlFor={`quantity-${itemIdx}`} className="sr-only">
                        Quantity, {item.name}
                      </label>
                      <select
                        id={`quantity-${itemIdx}`}
                        name={`quantity-${itemIdx}`}
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                        className="max-w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-900 py-1.5 text-left text-base font-medium leading-5 text-gray-700 dark:text-gray-300 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <option key={num} value={num}>
                            {num}
                          </option>
                        ))}
                      </select>

                      <div className="absolute right-0 top-0">
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                        >
                          <span className="sr-only">Remove</span>
                          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Order summary */}
        <section
          aria-labelledby="summary-heading"
          className="mt-16 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8 border border-gray-200 dark:border-gray-800"
        >
          <h2 id="summary-heading" className="text-lg font-medium text-gray-900 dark:text-white mb-6">
            Order summary
          </h2>

          {/* Coupon Code Section */}
          <div className="mb-6 border-b border-gray-200 dark:border-gray-800 pb-6">
            {!appliedCoupon ? (
              <div>
                <label htmlFor="coupon" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Have a coupon code?
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      id="coupon"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      placeholder="Enter code"
                      className="w-full pl-9 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-black uppercase font-mono text-sm"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    disabled={loading.apply || !couponCode}
                    className="px-4 py-2 bg-gray-200 dark:bg-zinc-700 text-gray-900 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-zinc-600 transition-colors font-medium text-sm disabled:opacity-50 flex items-center justify-center min-w-[80px]"
                  >
                    {loading.apply ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Apply'}
                  </button>
                </div>
                {couponError && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">{couponError}</p>
                )}
              </div>
            ) : (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-3 rounded-md flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-green-600 dark:text-green-500" />
                  <span className="font-mono font-medium text-green-800 dark:text-green-400">{appliedCoupon.code}</span>
                  <span className="text-sm text-green-600 dark:text-green-500 font-medium">Applied!</span>
                </div>
                <button 
                  onClick={removeCoupon}
                  className="p-1 hover:bg-green-100 dark:hover:bg-green-800 rounded-md text-green-600 dark:text-green-400 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          <dl className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center justify-between">
              <dt>Subtotal</dt>
              <dd className="font-medium text-gray-900 dark:text-white">₹{totalPrice.toFixed(2)}</dd>
            </div>
            
            {appliedCoupon && (
              <div className="flex items-center justify-between text-green-600 dark:text-green-400">
                <dt>Discount ({appliedCoupon.code})</dt>
                <dd className="font-medium">-₹{appliedCoupon.discount.toFixed(2)}</dd>
              </div>
            )}

            <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-800 pt-4">
              <dt className="flex items-center text-sm">
                <span>Shipping estimate</span>
              </dt>
              <dd className="font-medium text-gray-900 dark:text-white">Calculated at checkout</dd>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-800 pt-4">
              <dt className="flex text-sm">
                <span>Tax estimate</span>
              </dt>
              <dd className="font-medium text-gray-900 dark:text-white">₹{tax.toFixed(2)}</dd>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-800 pt-4 text-base font-medium text-gray-900 dark:text-white">
              <dt>Order total</dt>
              <dd>₹{finalTotal.toFixed(2)}</dd>
            </div>
          </dl>

          <div className="mt-6">
            <button
              type="button"
              onClick={handleCheckout}
              disabled={loading.checkout}
              className="w-full flex items-center justify-center gap-2 rounded-md border border-transparent bg-black px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-gray-50 dark:bg-white dark:text-black dark:hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              {loading.checkout ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" /> Processing...
                </>
              ) : 'Checkout securely'}
            </button>
            {couponError && loading.checkout === false && (
              <p className="mt-3 text-sm text-center text-red-600 dark:text-red-400">{couponError}</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
