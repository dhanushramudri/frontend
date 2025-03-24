import axios from "axios";

export const getProgress = async (userId) => {
  if (!userId) {
    console.error("Error: User ID is undefined. Cannot fetch progress.");
    return null;
  }

  try {
    const response = await axios.get(`http://localhost:5000/api/progress/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching progress:", error);
    return null;
  }
};
