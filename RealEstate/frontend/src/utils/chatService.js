import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Update this if your Flask server is running on a different port

export const sendMessage = async (message) => {
  try {
    const response = await axios.post(`${API_URL}/chat`, { message });
    return response.data.response;
  } catch (error) {
    console.error('Error in sendMessage:', error);
    throw error; // Rethrow the error so it can be handled in the component
  }
};