"use client";
import { useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker } from "react-map-gl";
import { setKey, setLanguage, setRegion, fromAddress } from "react-geocode";
import Spinner from "./Spinner";
import Image from "next/image";
import pin from "@/assets/images/pin.svg";
import { PropertyProps } from "@/utilis/PropertycardProps";
type Props = {
  property: PropertyProps;
};
interface Config {
  latitude: any;
  longitude: any;
  zoom: number;
  width: string;
  height: string;
}
export default function PropertyMap({ property }: Props) {
  const [lat, setLat] = useState<any>();
  const [lng, setLng] = useState<any>();
  const [viewPort, setViewPort] = useState<Config>({
    latitude: 0,
    longitude: 0,
    zoom: 12,
    width: "100%",
    height: "500px",
  });
  const [loading, setLoading] = useState(true);
  const [geocodeError, setGeocodeError] = useState(false);

  setKey(process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY || ""); // Your API key here.
  setLanguage("en"); // Default language for responses.
  setRegion("us"); // Default region for responses.
  useEffect(() => {
    try {
      const fetchCoords = async () => {
        const res = await fromAddress(
          `${property.location.street} ${property.location.city}  ${property.location.zipcode}`
        );
        // check for results
        if (res.results.length === 0) {
          // no results found
          setGeocodeError(true);
          setLoading(false);
          return;
        }
        const { lat, lng } = res?.results[0].geometry.location;
        setLat(lat);
        setLng(lng);
        setViewPort({
          ...viewPort,
          latitude: lat,
          longitude: lng,
        });
        setLoading(false);
      };
      fetchCoords();
    } catch (error) {
      console.log(error);
      setGeocodeError(true);
      setLoading(false);
    }
  }, []);
  if (loading) return <Spinner loading={loading} />;
  //   handling the error
  if (geocodeError) {
    return <div className="text-xl">No Location data found</div>;
  }
  return (
    !loading && (
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        initialViewState={{
          longitude: lng,
          latitude: lat,
          zoom: 15,
        }}
        mapLib={import("mapbox-gl")}
        style={{ width: "100%", height: 500 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Marker longitude={lng} latitude={lat} anchor="bottom">
          <Image src={pin} alt="location" width={40} height={40} />
        </Marker>
      </Map>
    )
  );
}
