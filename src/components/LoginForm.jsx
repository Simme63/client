import { useSetAtom } from "jotai";
import React, { useState } from "react";
import { tokenAtom, userAtom } from "../atoms";

const LoginForm = () => {
	const setToken = useSetAtom(tokenAtom);
	const setUser = useSetAtom(userAtom);

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

	const handleLogin = async (e) => {
		e.preventDefault();
		if (formData.email === "" || formData.password === "") {
			alert("Please fill out all fields");
			return;
		}

		try {
			const response = await fetch(
				"https://server-wheat-alpha.vercel.app/api/auth/login",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(formData),
				}
			);
			const data = await response.json();
			setToken(data.token);
			setUser(data.user);
		} catch (error) {
			console.error("Failed to login: ", error);
		}
	};

	return (
		<div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
			<h2>Login</h2>
			<form onSubmit={handleLogin}>
				<div style={{ marginBottom: "15px" }}>
					<label
						htmlFor="username"
						style={{ display: "block", marginBottom: "5px" }}
					>
						Email:
					</label>
					<input
						type="text"
						id="email"
						name="email"
						placeholder="Enter your email"
						value={formData.email}
						onChange={handleChange}
						style={{ width: "100%", padding: "8px" }}
					/>
				</div>
				<label
					htmlFor="password"
					style={{ display: "block", marginBottom: "5px" }}
				>
					Password:
				</label>
				<input
					type="password"
					id="password"
					name="password"
					placeholder="Enter your password"
					value={formData.password}
					onChange={handleChange}
					style={{ width: "100%", padding: "8px" }}
				/>
				<button
					type="submit"
					style={{ padding: "10px 15px" }}
					//disabled={isSubmitting}
				>
					{"Login" /* {isSubmitting ? "Logging in..." : "Login"} */}
				</button>
			</form>
			{/* {responseMessage && (
				<p style={{ marginTop: "20px" }}>{responseMessage}</p>
			)} */}
		</div>
	);
};

export default LoginForm;
