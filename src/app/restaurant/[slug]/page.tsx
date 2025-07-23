import React from "react"
import { groq } from "next-sanity"
import { sanity } from '../../../lib/sanity'
import Image from "next/image";

type Props = {
  params: { slug: string };
};
const query = groq`*[_type == "restaurant" && slug.current == $slug][0]{
  _id,
  name,
  "slug": slug.current,
  "image": image.asset->url,
  description,
  location,
  tags
}`;
export default async function RestaurantPage({ params }: Props) {
      const restaurant = await sanity.fetch(query, { slug: params.slug });

      if (!restaurant) return <div>Restaurant not found</div>;

  return (
    <div className="space-y-4 py-8 px-4 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold">{restaurant.name}</h1>
      {restaurant.image && (
        <Image
          src={restaurant.image}
          alt={restaurant.name}
          width={800}
          height={600}
          className="rounded-xl"
        />
      )}
      <p className="text-lg text-gray-700">{restaurant.description}</p>
      <p className="text-sm text-gray-500">📍 {restaurant.location}</p>
      <div className="flex gap-2 mt-2">
        {restaurant.tags?.map((tag: string) => (
          <span
            key={tag}
            className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}