import { useState, useEffect, useCallback } from "react";
import { useAtom } from "jotai";
import { tokenAtom, userAtom } from "../atoms";

const useFetchData = (fetchFn) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [token] = useAtom(tokenAtom);
    const [user] = useAtom(userAtom);

    const fetchData = useCallback(async () => {

        if (!user) return;
        setLoading(true);
        try {
            const response = await fetchFn();
            setData(await response.json());
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, [user, token]);

    useEffect(() => {
        fetchData(() =>
            fetch("http://localhost:8000/api/notes", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`, // Include the token in the Authorization header
                    "Content-Type": "application/json"
                },
            }));
    }, [token]);

    return { data, loading, error, fetchData };
};

export default useFetchData;