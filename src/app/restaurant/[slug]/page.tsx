// src/app/restaurant/[slug]/page.tsx

import { client } from "../../../sanity/lib/client";
import { groq } from "next-sanity";
import Image from "next/image"; // 1. Import next/image

// Define the type for the fetched restaurant data
type RestaurantData = {
  _id: string;
  name: string;
  description: string;
  location: string;
  tags: string[];
  image: string;
};
console.log(process.env.NEXT_PUBLIC_SANITY_DATASET)

const query = groq`*[_type == "restaurant" && slug.current == $slug][0]{
  _id,
  name,
  description,
  location,
  tags,
  "image": mainImage.asset->url
}`;

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>; // It's a Promise now
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
      {restaurant.image && (
        // 3. Use the <Image> component
        <Image
          src={restaurant.image}
          alt={restaurant.name}
          width={800} // Add required width
          height={400} // Add required height
          className="w-full h-64 object-cover mb-4 rounded-lg"
        />
      )}
      <p className="text-gray-600 mb-2">{restaurant.location}</p>
      <p className="mt-4 text-gray-800 leading-relaxed">
        {restaurant.description}
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        {restaurant.tags.map((tag: string) => (
          <span
            key={tag}
            className="bg-gray-100 px-3 py-1 text-sm rounded-full text-gray-700"
          >
            #{tag}
          </span>
        ))}
      </div>
    </main>
  );
}
