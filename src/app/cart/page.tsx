/* eslint-disable */
"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();

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
          <h2 id="summary-heading" className="text-lg font-medium text-gray-900 dark:text-white">
            Order summary
          </h2>

          <dl className="mt-6 space-y-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center justify-between">
              <dt>Subtotal</dt>
              <dd className="font-medium text-gray-900 dark:text-white">₹{totalPrice}</dd>
            </div>
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
              <dd className="font-medium text-gray-900 dark:text-white">₹{Math.round(totalPrice * 0.18)}</dd>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-800 pt-4 text-base font-medium text-gray-900 dark:text-white">
              <dt>Order total</dt>
              <dd>₹{totalPrice + Math.round(totalPrice * 0.18)}</dd>
            </div>
          </dl>

          <div className="mt-6">
            <button
              type="button"
              className="w-full rounded-md border border-transparent bg-black px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-gray-50 dark:bg-white dark:text-black dark:hover:bg-gray-200 transition-colors"
            >
              Checkout
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
