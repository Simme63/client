import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
});

const createNote = async (note) => {
    try {
        const response = await api.post('/notes', note);
        if (response.status !== 201) {
            throw new Error('Network response was not ok.');
        }
        console.log('Note created successfully');
        return response;
    } catch (error) {
        console.error('Error creating the note:', error.message);
    }
};

export { createNote };