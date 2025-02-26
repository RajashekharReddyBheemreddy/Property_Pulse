import fetchProperties from "@/utilis/requests";
import FeaturedPropertyCard from "./FeaturedPropertyCard";

export default async function FeaturedProperties() {
  const properties = await fetchProperties({
    showFeatured: true,
  });
  console.log(properties);
  return (
    properties.length > 0 && (
      <section className="bg-blue-50 px-4 pt-6 pb-10">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
            Featured Properties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {properties.map((property: any) => (
              <FeaturedPropertyCard property={property} key={property._id} />
            ))}
          </div>
        </div>
      </section>
    )
  );
}
