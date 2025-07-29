
"useClient";
import { client } from "../../../sanity/lib/client";
import { groq } from "next-sanity";
import MenuItemsClient from "./menuItemsClient";

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
    <MenuItemsClient restaurant={restaurant} />
  );
}
