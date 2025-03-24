import axios from "axios";

const API_URL = "https://backend-5599.vercel.app/api/progress";

export const getProgress = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching progress:", error);
    throw error;
  }
};
