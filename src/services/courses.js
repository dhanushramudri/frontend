// src/services/courses.js

// Mock data for testing
const mockCourses = [
    {
      _id: "1",
      title: "Introduction to React",
      description: "Learn the basics of React and build your first application.",
      image: "https://via.placeholder.com/300",
      slides: [],
      videos: [],
      quizzes: [],
    },
    {
      _id: "2",
      title: "Advanced JavaScript",
      description: "Deep dive into advanced JavaScript concepts and techniques.",
      image: "https://via.placeholder.com/300",
      slides: [],
      videos: [],
      quizzes: [],
    },
  ];  
  // Fetch all courses
  export const getCourses = async () => {
    return mockCourses; // Replace with an actual API call
  };
  
  // Fetch a course by ID
  export const getCourseById = async (courseId) => {
    return mockCourses.find((course) => course._id === courseId); // Replace with an actual API call
  };