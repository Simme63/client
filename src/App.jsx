import React from "react";
import "./App.css";
import Notes from "./components/Notes";
import LoginForm from "./components/LoginForm";
import NewUser from "./components/NewUser";
import { useAtom } from "jotai";
import { loggedInAtom, isEditingAtom, tokenAtom } from "./atoms";
import useFetchData from "./hooks/useFetchData";
import Delete from "./components/Delete";

function App() {
	const [token] = useAtom(tokenAtom);
	const { data, loading, error, fetchData } = useFetchData(() =>
		fetch("https://server-g4wwnccmm-simme63s-projects.vercel.app/0/api/notes", {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`, // Include the token in the Authorization header
				"Content-Type": "application/json",
			},
		})
	);
	const [loggedIn] = useAtom(loggedInAtom);
	const [isEditing, setIsEditing] = useAtom(isEditingAtom);

	return (
		<>
			{loggedIn ? (
				<>
					<div>
						{loading ? (
							<p>Loading...</p>
						) : error ? (
							<p>Error: {error}</p>
						) : (
							<ul>
								{data.map((item) => (
									<li
										key={item._id}
										style={{ listStyleType: "none" }}
									>
										<h5>{item.title}</h5>
										<div
											style={{
												width: "50vw",
												textWrap: "pretty",
											}}
										>
											{item.description}
										</div>
										<Delete item={item} />
										<button
											onClick={(e) => {
												handleEdit(e.target.id);
												setIsEditing(true);
											}}
											id={item._id}
										>
											Edit
										</button>
									</li>
								))}
							</ul>
						)}
						<Notes />
					</div>
				</>
			) : (
				<>
					<LoginForm />
					<NewUser />
				</>
			)}
		</>
	);
}

export default App;
