import { useEffect, useState } from "react";
import { axiosInstance } from "../config/axiosInstance";

export const useFetch = (url, refresh) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true); // ✅ Explicitly set loading state before fetching
            try {
                const response = await axiosInstance.get(url);
                setData(response.data);
            } catch (err) {
                setError(err.response ? err.response.data : err.message); // ✅ Better error handling
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [url, refresh]);

    return { data, isLoading, error }; // ✅ Returns an object for better readability
};
