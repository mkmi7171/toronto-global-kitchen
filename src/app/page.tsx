import { sanity } from "../lib/sanity";
import { restaurantsQuery } from "../lib/queries";
import Link from "next/link";

type Restaurant = {
  _id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  location: string;
  tags: string[];
};
export default async function Home() {
  const restaurants = await sanity.fetch(restaurantsQuery);

  return (
    <main className="p-6 text-black min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Restaurants in Toronto</h1>

      {restaurants.length === 0 ? (
        <p>No restaurants found.</p>
      ) : (
        <ul className="grid gap-6 grid-cols-1 md:grid-cols-3">
          {restaurants.map((r: Restaurant) => (
            <li
              key={r._id}
              className=" rounded-lg overflow-hidden bg-zinc-50 bg-white"
            >
              <Link href={`/restaurant/${r.slug}`}>
                {r.image && (
                  <img
                    src={r.image}
                    alt={r.name}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h2 className="text-xl font-semibold">{r.name}</h2>
                  <p className="text-gray-600 text-sm">{r.location}</p>
                  <p className="mt-2 text-gray-800">{r.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {r.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="bg-gray-100 px-3 py-1 text-xs rounded-full text-gray-700"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
