import React, { useState } from 'react'
import LeafletMap from '../components/Map'
import { LatLngExpression } from 'leaflet'
import MapSearch from '../components/MapSearch'



export default function MapPage() {
    const [location, setLocation] = useState<LatLngExpression>([-7.2521, 106.8269568])
    return (
        <div className="w-full h-dvh relative">
            <LeafletMap location={location} />
            <MapSearch setLocation={setLocation} />
        </div>
    )
}
