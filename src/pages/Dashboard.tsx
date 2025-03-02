import { useParams } from "react-router";
import TopBar from "../components/TopBar";
import MapPage from "./MapPage";
import { useState } from "react";

export default function Dashboard() {

    type Section = "home" | "map"

    const [section, setSection] = useState<Section>("map")

    return (
        <div className="min-h-dvh">
            <TopBar />
            {section === "map" ? <MapPage /> : <div>Halo</div>}
        </div>
    )
}
