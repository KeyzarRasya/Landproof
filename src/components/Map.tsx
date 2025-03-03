import { useEffect } from "react";
import { LayerGroup, MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent, useMapEvents } from "react-leaflet";
import MapSearch from "./MapSearch";
import { LatLngExpression } from "leaflet";
import { Icon } from "@iconify/react"




function MapController() {
    const map = useMap()

    useEffect(() => {
        // go to user location on first initialization
        function flyToUser(loc: any) {
            map.flyTo(loc.latlng, 15)
            console.log(loc.latlng)
        }
        map.locate()
        map.addEventListener("locationfound", flyToUser)
        // map.removeEventListener("locationfound", flyToUser)

        return () => {
            map.removeEventListener("locationfound", flyToUser)
        }

    }, [map])



    return null
}

function MapLocationControl({ location }: { location: LatLngExpression }) {
    const map = useMap()
    if (location) map.flyTo(location)

    return null
}

function ShowLocation() {
    const map = useMap()

    // useMapEvents({ locationfound(e) { map.flyTo(e.latlng) } })
    function goToUserLocation() {
        map.locate()
    }

    return <div className="z-[99999] absolute bottom-0 bg-white rounded-md mb-4 ml-3">
        <button className="cursor-pointer text-blue-600 text-2xl pt-1.5 px-2" onClick={goToUserLocation}><Icon icon={"material-symbols:my-location"} /></button>
    </div>

}


export default function LeafletMap({ location }: { location: LatLngExpression }) {


    // const { addressSearch } = useGeoCoding()

    // addressSearch("Jakarta, indonesia").then((val) => console.log(val))

    return (
        <div className="w-full h-full relative">
            <MapContainer center={[-7.2521, 106.8269568]} zoom={13} scrollWheelZoom={false} style={{ height: "100%" }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <ShowLocation />

                <MapController />
                <MapLocationControl location={location} />
            </MapContainer>
        </div >
    )
}
