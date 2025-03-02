
import { LatLngExpression } from "leaflet";
import useGeoCoding from "../hooks/useGeocoding"


export default function MapSearch({ setLocation }: {
    setLocation: React.Dispatch<React.SetStateAction<LatLngExpression>>
}) {
    // addresss = address to latlng
    // reverse = latlng to address
    // const [mode, setMode] = useState("address")

    const { addressSearch } = useGeoCoding()

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = new FormData(e.target as HTMLFormElement); // Get form data
        const data = Object.fromEntries(formData.entries());

        addressSearch(data["query"] as string).then((val) => {
            if (val) setLocation([...val] as LatLngExpression)
        }).catch((e) => {
            console.error(e)
        })

    }

    return (
        <div className="z-[99999] flex border bg-white rounded-lg px-8 py-2 gap-3 absolute top-0 left-1/2 -translate-x-1/2 mt-3">
            <form onSubmit={onSubmit}>
                <input type="text" name="query" id="search-query" placeholder="Cari Alamat" className="focus:border-none focus:outline-none" />
                <button className="cursor-pointer" type="submit">Search</button>
            </form>
        </div>
    )
}
