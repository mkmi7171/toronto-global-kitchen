export const restaurantsQuery = `*[_type == "restaurant"]{
  _id,
  name,
  "slug": slug.current,
  "image": image.asset->url,
  description,
  location,
  tags
}`;
