"use client";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Removed unnecessary deletion of _getIconUrl as it does not exist on L.Icon.Default.prototype
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function LocationPicker({ onSelect }: { onSelect: (lat: number, lng: number) => void }) {
    useMapEvents({
        click(e) {
            onSelect(e.latlng.lat, e.latlng.lng);
        },
    });
    return null;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export default function LeafletMap({
    initialPosition,
    onSelect,
    marker,
}: {
    initialPosition: [number, number];
    onSelect: (lat: number, lng: number) => void;
    marker: { lat: number; lng: number } | null;
}) {
    return (
        <MapContainer center={initialPosition} zoom={5} style={{ height: "100%", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <LocationPicker onSelect={onSelect} />
            {marker && <Marker position={[marker.lat, marker.lng]} />}
        </MapContainer>
    );
}