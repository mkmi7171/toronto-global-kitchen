

import { client } from "../../../sanity/lib/client";
import { groq } from "next-sanity";
import Image from "next/image"; 
import Link from "next/link";

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
  menu: MenuItem[]
};

const query = groq`*[_type == "restaurant" && slug.current == $slug][0]{
  _id,
  name,
  description,
  location,
  tags,
  "image": mainImage.asset->url,
   menu[] {
    title,
    description,
    price,
    "image": image.asset->url
  }
}`;

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const restaurant: RestaurantData = await client.fetch(query, {
    slug,
  });

  if (!restaurant) {
    return (
      <main className="p-6 text-black min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Restaurant not found</h1>
      </main>
    );
  }

  return (
    <main className="p-6 text-black min-h-screen">
      <h1 className="text-3xl font-bold mb-8">{restaurant.name}</h1>
      <p className="text-gray-600 mb-2">{restaurant.location}</p>
      <p className="mt-4 text-gray-800 leading-relaxed">
        {restaurant.description}
      </p>
      <h2 className="text-xl font-bold my-8">Menu</h2>
      <div className="mt-6 flex gap-2">
      {restaurant.menu.map((item:MenuItem, index: number) => (
    <div key={index} className="">
      <div className="relative">
      <Image
        src={item.image}
        alt={item.title}
        width={200}
        height={200}
        className="rounded-lg w-48 h-48 object-cover"
      />
      <Link className="w-8 h-8 rounded-full bg-white flex justify-center absolute right-2 bottom-2" href={""}><span className="my-auto">+</span></Link>
      </div>
      <h3 className="mt-2 font-semibold">{item.title}</h3>
      <p className="text-sm font-medium mt-1">${item.price.toFixed(2)}</p>
    </div>
  ))}
      </div>
    </main>
  );
}
