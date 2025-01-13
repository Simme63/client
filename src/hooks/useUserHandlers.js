import axios from 'axios';
import { useAtom } from 'jotai';
import { isSubmittingAtom, responseMessageAtom, tokenAtom } from '../atoms';
import useFetchData from './useFetchData';

const useUserHandlers = () => {
  const [, setIsSubmitting] = useAtom(isSubmittingAtom);
  const [, setResponseMessage] = useAtom(responseMessageAtom);
  const [token] = useAtom(tokenAtom);
  const { fetchData } = useFetchData(() =>
    fetch("https://server-g4wwnccmm-simme63s-projects.vercel.app/api/notes", {
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
      const response = await axios.post("https://server-g4wwnccmm-simme63s-projects.vercel.app/api/users", {
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