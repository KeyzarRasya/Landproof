import { useCallback } from "react";

export default function useGeoCoding() {
    const addressSearch = useCallback((address: string) => {

        async function fetchLatlng() {


            const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`;
            const req = await fetch(url)

            try {
                if (!(req.ok && req.status === 200)) throw new Error("Something is wrong")
                const res = await req.json()
                if (res[0]) {
                    return [parseFloat(res[0].lat), parseFloat(res[0].lon)]
                } else {
                    return null
                }
            } catch (e) {
                console.error(e)
            }




        }

        return fetchLatlng()

    }, [])

    return {
        addressSearch
    }

}