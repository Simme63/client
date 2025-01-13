import React from "react";
import useFetchData from "../hooks/useFetchData";

const Delete = ({ item }) => {
	const { fetchData } = useFetchData();

	const deleteNote = async (id) => {
		try {
			const response = await fetch(
				`https://server-g4wwnccmm-simme63s-projects.vercel.app/0/api/notes/${id}`,
				{ method: "DELETE" }
			);
			if (response.status !== 200) {
				throw new Error("Network response was not ok.");
			}
			console.log("Note deleted successfully");
			fetchData();
		} catch (error) {
			console.error("Error deleting the note:", error.message);
		}
	};

	return (
		<button
			onClick={(e) => {
				deleteNote(e.target.id);
			}}
			id={item._id}
		>
			Delete
		</button>
	);
};

export default Delete;
