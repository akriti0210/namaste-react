import { useEffect, useState } from "react";
import { MENU_API } from "./constants";

const useRestaurantMenu = (resId) => {

    const [resInfo, setResInfo] = useState(null);

    useEffect(() => {
        fetchMenu();
        // re-run if restaurant id changes
    }, [resId]);

    const fetchMenu = async () => {
        try {
            const data = await fetch(
                "https://cuisinix-backend.onrender.com/api/listRestaurantMenu/" + resId
            );

            // Read as text first to guard against empty / non‑JSON responses
            const text = await data.text();

            if (!text) {
                console.error("Empty response from menu API");
                setResInfo(null);
                return;
            }

            const json = JSON.parse(text);

            setResInfo(json?.data ?? null);
        } catch (err) {
            console.error("Error fetching / parsing menu API", err);
            setResInfo(null);
        }
    };

    return resInfo;
}

export default useRestaurantMenu

