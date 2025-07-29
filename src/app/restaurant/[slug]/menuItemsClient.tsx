"use client";
import { useCartStore } from "@/lib/store/cartStore";
import { FaTrash, FaMinus, FaPlus } from "react-icons/fa6";
import Image from "next/image";

type MenuItem = {
  title: string;
  description: string;
  price: number;
  image: string;
};

type RestaurantData = {
  _id: string;
  name: string;
  description: string;
  location: string;
  tags: string[];
  image: string;
  menu: MenuItem[];
};

export default function MenuItemsClient({
  restaurant,
}: {
  restaurant: RestaurantData;
}) {
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const decreaseQuantity = useCartStore((state) => state.decrement);
  const cartItems = useCartStore((state) => state.items);

  return (
    <main className="p-6 text-black min-h-screen">
      <h1 className="text-3xl font-bold mb-8">{restaurant.name}</h1>
      <p className="text-gray-600 mb-2">{restaurant.location}</p>
      <p className="mt-4 text-gray-800 leading-relaxed">
        {restaurant.description}
      </p>

      <h2 className="text-xl font-bold my-8">Menu</h2>
      <div className="mt-6 flex gap-4 flex-wrap">
        {restaurant.menu.map((item, index) => {
          const cartItem = cartItems.find((i) => i.title === item.title);
          const quantity = cartItem?.quantity ?? 0;
          console.log(quantity)
          return (
            <div key={index} className="relative">
              <Image
                src={item.image}
                alt={item.title}
                width={200}
                height={200}
                className="rounded-lg w-48 h-48 object-cover"
              />

              <div className="absolute right-2 bottom-2 flex gap-1 items-center">
                {quantity > 1 ? (
                  <button
                    onClick={() => {
                      decreaseQuantity(item.title);
                      console.log(`${item.title} quantity:`, quantity - 1);
                    }}
                    className="w-8 h-8 bg-white rounded-full flex justify-center items-center"
                  >
                    <FaMinus />
                  </button>
                ) : quantity === 1 ? (
                  <button
                    onClick={() => {
                      removeFromCart(item.title);
                      console.log(`${item.title} removed from cart`);
                    }}
                    className="w-8 h-8 bg-white rounded-full flex justify-center items-center"
                  >
                    <FaTrash />
                  </button>
                ) : null}
                {quantity > 0 && (
  <span className="bg-black text-white px-2 py-1 rounded text-sm font-bold">
    {quantity}
  </span>
)}

                <button
                  onClick={() => {
                    addToCart({ ...item, quantity: 1 });
                    console.log(`${item.title} quantity:`, quantity + 1);
                  }}
                  className="w-8 h-8 bg-white rounded-full flex justify-center items-center"
                >
                  <FaPlus />
                </button>
              </div>

              <h3 className="mt-2 font-semibold">{item.title}</h3>
              <p className="text-sm font-medium mt-1">${item.price.toFixed(2)}</p>
            </div>
          );
        })}
      </div>
    </main>
  );
}
