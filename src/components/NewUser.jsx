import React from "react";
import { useState } from "react";

const NewUser = () => {
	const [formData, setFormData] = useState({
		password: "",
		email: "",
		name: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const submitNewUser = async (e) => {
		e.preventDefault();
		if (
			formData.name === "" ||
			formData.email === "" ||
			formData.password === ""
		) {
			alert("Please fill out all fields");
			return;
		}
		try {
			const response = await fetch(
				"https://client-tau-one.vercel.app/api/auth/register",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(formData),
				}
			);
			const data = await response.json();
			console.log(data, response.status);
		} catch (error) {
			console.error("Failed to create user: ", error);
		}
	};

	return (
		<form onSubmit={submitNewUser}>
			<h2>Create New User</h2>
			<div style={{ marginBottom: "15px" }}>
				<label
					htmlFor="username"
					style={{
						display: "block",
						marginBottom: "5px",
					}}
				>
					Name:
				</label>
				<input
					type="text"
					id="newname"
					name="name"
					placeholder="Enter your name"
					value={formData.name}
					onChange={handleChange}
					style={{
						padding: "8px",
					}}
				/>
			</div>
			<div style={{ marginBottom: "15px" }}>
				<label
					htmlFor="email"
					style={{ display: "block", marginBottom: "5px" }}
				>
					Email:
				</label>
				<input
					type="email"
					id="newemail"
					name="email"
					placeholder="Enter your email"
					value={formData.email}
					onChange={handleChange}
					style={{
						padding: "8px",
					}}
				/>
			</div>
			<div style={{ marginBottom: "15px" }}>
				<label
					htmlFor="password"
					style={{ display: "block", marginBottom: "5px" }}
				>
					Password:
				</label>
				<input
					type="password"
					id="newpassword"
					name="password"
					placeholder="Enter your password"
					value={formData.password}
					onChange={handleChange}
					style={{
						padding: "8px",
					}}
				/>
			</div>
			<button type="submit">Create User</button>
		</form>
	);
};

export default NewUser;
