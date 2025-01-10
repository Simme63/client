import { useState } from 'react';
import axios from 'axios';
import { useAtom } from 'jotai';
import { userAtom, tokenAtom, isSubmittingAtom, responseMessageAtom } from '../atoms';
import useFetchData from './useFetchData';

const useFormHandlers = () => {

    const [user] = useAtom(userAtom);
    const [, setIsSubmitting] = useAtom(isSubmittingAtom);
    const [, setResponseMessage] = useAtom(responseMessageAtom);
    const [token] = useAtom(tokenAtom);
    console.log(token);


    const { fetchData } = useFetchData(() =>
        fetch("http://localhost:8000/api/notes", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`, // Include the token in the Authorization header
                "Content-Type": "application/json",
            },
        })
    );;

    const handleCreateNote = async (e, formData) => {
        console.log(user);
        console.log("Form", formData);
        e.preventDefault();
        setIsSubmitting(true);
        setResponseMessage("");
        try {
            const response = await fetch("http://localhost:8000/api/notes", {
                method: "POST",
                body: JSON.stringify({
                    title: formData.title,
                    description: formData.description,
                    userId: user._id,
                }),
                headers: {
                    "Authorization": `Bearer ${token}`, // Include the token in the Authorization header
                    "Content-Type": "application/json",
                },
            })
            if (response.status !== 201) {
                throw new Error("Failed to create note");
            }
            setResponseMessage("Note created successfully");
        } catch (error) {
            setResponseMessage(`Failed to create note: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEdit = (note) => {
        setFormData({
            title: note.title,
            description: note.description,
        });
    };

    const handleUpdateNote = async (id) => {
        setIsSubmitting(true);
        setResponseMessage("");
        try {
            const response = await fetch(`http://localhost:8000/api/notes/${id}`, {
                title: formData.title,
                description: formData.description,
            });
            if (response.status !== 200) {
                throw new Error("Failed to update note");
            }
            fetchData();
            setResponseMessage("Note updated successfully");
        } catch (error) {
            setResponseMessage(`Failed to update note: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleNewUser = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setResponseMessage("");

        try {
            const response = await axios.post(
                "http://localhost:8000/api/auth/register",
                formData
            );

            setResponseMessage("New user registered!");
            console.log("Response:", response.data);
            setLoggedIn(true);
            setToken(response.data.token);
            setUser(response.data.user._id);
            fetchData()
        } catch (error) {
            setResponseMessage(`Failed to register new user: ${error.message}`);
            console.error("Error:", error);
        } finally {
            setIsSubmitting(false);
        }

    };
    const handleLogin = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setResponseMessage("");

        try {
            console.log(formData);
            const response = await axios.post(
                "http://localhost:8000/api/auth/login",
                formData
            );

            setResponseMessage("Logged in!");
            console.log("Response:", response.data);
            setLoggedIn(true);
            setToken(response.data.token);
            setUser(response.data.user._id);
            fetchData();
        } catch (error) {
            setResponseMessage(`Failed to log in: ${error.message}`);
            console.error("Error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        handleCreateNote,
        handleEdit,
        handleUpdateNote,
        handleNewUser,
        handleLogin,
    };
};

export default useFormHandlers;