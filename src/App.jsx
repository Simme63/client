import { useAtom } from "jotai";
import "./App.css";
import { isEditingAtom, loggedInAtom, tokenAtom } from "./atoms";
import Delete from "./components/Delete";
import LoginForm from "./components/LoginForm";
import NewUser from "./components/NewUser";
import Notes from "./components/Notes";
import useFetchData from "./hooks/useFetchData";
import useFormHandlers from "./hooks/useFormHandlers";

function App() {
	const [token] = useAtom(tokenAtom);
	const { handleEdit } = useFormHandlers();
	const { data, loading, error } = useFetchData(() =>
		fetch("http://localhost:5000/api/notes", {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`, // Include the token in the Authorization header
				"Content-Type": "application/json",
			},
		})
	);
	const [loggedIn] = useAtom(loggedInAtom);
	const [, setIsEditing] = useAtom(isEditingAtom);

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
