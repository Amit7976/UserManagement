import { UseFormSetValue } from "react-hook-form";
import { UserFormData } from "@/lib/types/formSchema";

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const fetchLocationDetails = async (
  lat: number,
  lng: number,
  setValue: UseFormSetValue<UserFormData>
) => {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
    );
    const json = await res.json();
    const addr = json.address || {};

    setValue("address.city", addr.city || addr.town || addr.village || "");
    setValue("address.zipcode", addr.postcode || "");
    setValue("address.geo.lat", lat.toString());
    setValue("address.geo.lng", lng.toString());
  } catch (e) {
    console.error("Reverse geocoding failed", e);
  }
};
