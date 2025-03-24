import axios from "axios";

const API_URL = "https://backend-5599.vercel.app/api/modules";

export const getModules = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createModule = async (moduleData) => {
  const response = await axios.post(`${API_URL}/create`, moduleData);
  return response.data;
};
