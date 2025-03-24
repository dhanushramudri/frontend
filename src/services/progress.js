import axios from "axios";

export const getProgress = async (userId) => {
  if (!userId) {
    console.error("Error: User ID is undefined. Cannot fetch progress.");
    return null;
  }

  try {
    const response = await axios.get(
      `https://backend-5599.vercel.app/api/progress/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching progress:", error);
    return null;
  }
};
