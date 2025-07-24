// src/app/restaurant/[slug]/page.tsx

import { client } from "../../../sanity/lib/client";
import { groq } from "next-sanity";

interface RestaurantPageProps {
  params: {
    slug: string;
  };
}

// Define the type for the fetched restaurant data
type RestaurantData = {
  _id: string;
  name: string;
  slug: { current: string }; // Slugs are usually objects with a 'current' field
  description: string;
  location: string;
  tags: string[];
  image: string; // Simplified: Assuming image is fetched as a direct URL string
};

const query = groq`*[_type == "restaurant" && slug.current == $slug][0]{
  _id,
  name,
  slug,
  description,
  location,
  tags,
  "image": mainImage.asset->url // Fetch the image URL directly
}`;

export default async function Page({
  params,
}: RestaurantPageProps): Promise<React.JSX.Element> {
  const restaurant: RestaurantData = await client.fetch(query, {
    slug: params.slug,
  });

  if (!restaurant) {
    return (
      <main className="p-6 text-black min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Restaurant not found.</h1>
      </main>
    );
  }

  return (
    <main className="p-6 text-black min-h-screen">
      <h1 className="text-3xl font-bold mb-8">{restaurant.name}</h1>
      {restaurant.image && (
        <img
          src={restaurant.image} // Using plain <img>
          alt={restaurant.name}
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