import { PropertyProps } from "./PropertycardProps";

const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;
// fetch all properties
export default async function fetchProperties({ showFeatured = false } = {}) {
  try {
    // check for domain
    if (!apiDomain) {
      return [];
    }
    const res = await fetch(
      `${apiDomain}/properties${showFeatured ? "/featured" : ""}`,
      { cache: "no-store" }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch Data");
    }
    return res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}
// fetch single property
export async function fetchProperty(id: any) {
  try {
    if (!apiDomain) {
      return null;
    }
    const res = await fetch(`${apiDomain}/properties/${id}`);

    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}
export const getRateDisplay = (property: PropertyProps) => {
  const { rates } = property;
  if (rates.monthly) {
    return `${rates.monthly.toLocaleString()}/mo`;
  } else if (rates.weekly) {
    return `${rates.weekly.toLocaleString()}/wk`;
  } else if (rates.nightly) {
    return `${rates.nightly.toLocaleString()}/night`;
  }
};
