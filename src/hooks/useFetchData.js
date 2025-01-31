import { useAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";
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
	}, [user, fetchFn]);

	useEffect(() => {
		fetchData(() => {
			console.log("Hello im a token:", token);
			fetch("http://localhost:5000/api/notes/", {
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`, // Include the token in the Authorization header
					"Content-Type": "application/json",
				},
			});
		});
	}, [token, fetchData]);
	console.log(data);

	return { data, loading, error, fetchData };
};

export default useFetchData;
