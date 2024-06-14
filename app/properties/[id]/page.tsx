"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchProperty } from "@/utilis/requests";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import { PropertyProps } from "@/utilis/PropertycardProps";
import Spinner from "@/components/Spinner";
import PropertyImages from "@/components/PropertyImage";

export default function PropertyPage() {
  const { id } = useParams();
  const [property, setProperty] = useState<PropertyProps | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!id) return;
      try {
        const property = await fetchProperty(id);
        setProperty(property);
      } catch (error) {
        console.error("Error fetching property: ", error);
      } finally {
        setLoading(false);
      }
    };
    if (property === null) {
      fetchPropertyData();
    }
  }, [id, property]);
  if (!property && !loading) {
    return (
      <h1 className="text-center text-2xl font-bod mt-10">
        Property Not Found
      </h1>
    );
  }
  return (
    <>
      {loading && <Spinner loading={loading} />}
      {!loading && property && (
        <>
          <PropertyHeaderImage image={property.images[0]} property={property} />
          <PropertyImages images={property?.images} />
        </>
      )}
    </>
  );
}
