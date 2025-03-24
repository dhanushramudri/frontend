import React from "react";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  // Fetch and parse data from localStorage
  const username = localStorage.getItem("name") || "Guest";
  const quizProgress = JSON.parse(localStorage.getItem("quiz_progress_guest")) || {};
  const slideProgress = JSON.parse(localStorage.getItem("progress_guest")) || {};

  let quizScore = 0, slideScore = 0, totalQuizzes = 0, totalSlides = 0;

  for (let value of Object.values(quizProgress)) {
    quizScore += value;
    totalQuizzes += 1;
  }
  
  for (let value of Object.values(slideProgress)) {
    slideScore += value;
    totalSlides += 1;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 md:p-10">
        <h2 className="text-3xl font-bold text-center text-blue-600">Dashboard</h2>
        <h1 className="text-xl text-gray-700 text-center mt-2">Hello, {username}</h1>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-blue-100 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-blue-700">Quiz Progress</h3>
            <p className="text-gray-800 mt-2 text-lg">{quizScore} out of {totalQuizzes * 20}</p>
          </div>
          <div className="p-6 bg-green-100 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-green-700">Slide Progress</h3>
            <p className="text-gray-800 mt-2 text-lg">{slideScore} out of {totalSlides * 10}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
