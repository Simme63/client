import axios from 'axios';
import { useAtom } from 'jotai';
import { isSubmittingAtom, responseMessageAtom, tokenAtom } from '../atoms';
import useFetchData from './useFetchData';

const useUserHandlers = () => {
  const [, setIsSubmitting] = useAtom(isSubmittingAtom);
  const [, setResponseMessage] = useAtom(responseMessageAtom);
  const [token] = useAtom(tokenAtom);
  const { fetchData } = useFetchData(() =>
    fetch("http://localhost:5000/api/notes", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`, // Include the token in the Authorization header
        "Content-Type": "application/json",
      },
    })
  );;


  const handleCreateUser = async (formData) => {
    setIsSubmitting(true);
    setResponseMessage("");
    try {
      const response = await axios.post("http://localhost:5000/api/auth/users", {
        username: formData.username,
        password: formData.password,
      });
      if (response.status !== 201) {
        throw new Error("Failed to create user");
      }
      fetchData();
      setResponseMessage("User created successfully");
    } catch (error) {
      setResponseMessage(`Failed to create user: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { handleCreateUser };
};

export default useUserHandlers;