// const useDeleteNote = async (id) => {
//     try {
//         const response = await fetch(
//             `http://localhost:8000/api/notes/${id}`,
//             { method: "DELETE" }
//         );
//         if (!response.ok) {
//             throw new Error("Network response was not ok.");
//         }
//         console.log("Note deleted successfully");
//         fetchData();
//     } catch (error) {
//         console.error("Error deleting the note:", error.message);
//     }
//     return { useDeleteNote };
// };
// export default useDeleteNote;
import { useCallback } from 'react';
import axios from 'axios';
import { tokenAtom } from '../atoms';
import { useAtom } from 'jotai';
import useFetchData from './useFetchData';

const useDeleteNote = () => {
  const [token] = useAtom(tokenAtom);
  const { fetchData } = useFetchData(() =>
    fetch("http://localhost:8000/api/notes", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`, // Include the token in the Authorization header
        "Content-Type": "application/json",
      },
    })
  );
  const deleteNote = useCallback(async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/notes/${id}`);
      if (response.status !== 200) {
        throw new Error("Network response was not ok.");
      }
      console.log("Note deleted successfully");
      fetchData();
    } catch (error) {
      console.error("Error deleting the note:", error.message);
    }
  }, [fetchData]);

  return { deleteNote };
};



export default useDeleteNote;