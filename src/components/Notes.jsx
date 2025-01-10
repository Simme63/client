import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { isEditingAtom } from "../atoms";
import useFormHandlers from "../hooks/useFormHandlers";
import { createNote } from "../requests/requests";

const Notes = () => {
	const [isEditing, setIsEditing] = useAtom(isEditingAtom);
	const { handleCreateNote, handleUpdateNote } = useFormHandlers();
	const [formData, setFormData] = useState({
		title: "",
		description: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const newNote = {
			title: formData.title,
			description: formData.description,
		};

		const res = await createNote(newNote);
		console.log(res);
	};

	useEffect(() => {}, []);
	return (
		<div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
			<h2>Note!</h2>
			<form onSubmit={() => handleSubmit()}>
				<div style={{ marginBottom: "15px" }}>
					<label
						htmlFor="title"
						style={{ display: "block", marginBottom: "5px" }}
					>
						Title:
					</label>
					<input
						type="text"
						id="title"
						name="title"
						value={formData.title}
						onChange={handleChange}
						style={{ width: "100%", padding: "8px" }}
					/>
				</div>
				<div style={{ marginBottom: "15px" }}>
					<label
						htmlFor="description"
						style={{ display: "block", marginBottom: "5px" }}
					>
						Description:
					</label>
					<textarea
						id="description"
						name="description"
						value={formData.description}
						onChange={handleChange}
						style={{ width: "100%", padding: "8px" }}
					/>
				</div>
				<button
					type="submit"
					style={{ padding: "10px 15px" }}
					//disabled={isSubmitting}
					onClick={() => {}}
				>
					{
						"Submit" /* {isSubmitting
						? "Submitting..."
						: isEditing
						? "Update Note"
						: "Submit"} */
					}
				</button>
			</form>
			{/* {responseMessage && (
				<p style={{ marginTop: "20px" }}>{responseMessage}</p>
			)} */}
		</div>
	);
};

export default Notes;
