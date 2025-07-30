"use client";

import { useCartStore } from "@/lib/store/cartStore";
import Image from "next/image";
import { FaTrash } from "react-icons/fa6";
import { ChangeEvent } from "react";

type CartModalProps = {
  onClose: () => void;
  position: { top: number; left: number };
};

export default function CartModal({ onClose, position }: CartModalProps) {
  const items = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const increment = useCartStore((state) => state.increment);
  const decrement = useCartStore((state) => state.decrement);

  const handleQuantityChange = (e: ChangeEvent<HTMLSelectElement>, title: string) => {
    const newQuantity = parseInt(e.target.value);
    const currentItem = items.find((item) => item.title === title);
    if (!currentItem) return;

    const diff = newQuantity - currentItem.quantity;
    if (diff > 0) {
      for (let i = 0; i < diff; i++) increment(title);
    } else if (diff < 0) {
      for (let i = 0; i < Math.abs(diff); i++) decrement(title);
    }
  };

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div
      className="absolute bg-white shadow-lg rounded-lg w-80 p-4 z-50 max-h-[80vh] overflow-y-auto"
      style={{
        top: position.top,
        left: position.left,
        position: "fixed",
      }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Your Cart</h2>
        <button onClick={onClose} className="text-gray-500 text-sm">
          Close
        </button>
      </div>

      {items.length === 0 ? (
        <p className="text-gray-700">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {items.map((item) => (
              <li key={item.title} className="flex gap-3 items-center">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={50}
                  height={50}
                  className="rounded w-12 h-12 object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                  <select
                    className="mt-1 text-sm"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(e, item.title)}
                  >
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((qty) => (
                      <option key={qty} value={qty}>
                        {qty}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  className="text-red-500"
                  onClick={() => removeFromCart(item.title)}
                >
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-4 border-t pt-4">
            <div className="flex justify-between font-semibold text-gray-800 mb-2">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className="w-full bg-blue-600 text-white py-2 rounded">
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}