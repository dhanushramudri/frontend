import axios from "axios";

const API_URL = "https://backend-5599.vercel.app/api/quizzes";

// Fetch all quizzes
export const getQuizzes = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Create a new quiz
export const createQuiz = async (quizData) => {
  const response = await axios.post(`${API_URL}/create`, quizData);
  return response.data;
};

// Submit a quiz
export const submitQuiz = async (quizId, answers) => {
  try {
    const response = await axios.post(`${API_URL}/${quizId}/submit`, {
      answers,
    });
    return response.data;
  } catch (error) {
    console.error("Error submitting quiz:", error);
    throw error;
  }
};
