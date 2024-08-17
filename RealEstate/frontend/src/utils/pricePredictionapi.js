import axios from 'axios';

export const getPredictedPrice = async (propertyDetails) => {
  try {
    const response = await axios.post('http://127.0.0.1:5000/predict', propertyDetails, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data; // This will return the JSON with the predicted price
  } catch (error) {
    console.error('Error fetching predicted price:', error.response?.data || error.message);
    throw error;
  }
};
