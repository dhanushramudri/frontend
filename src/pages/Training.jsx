import { useEffect, useState } from "react";

// User components
import GetModules from "../components/getcomp/GetModules.jsx";
import GetQuizz from "../components/getcomp/GetQuizz.jsx";
import GetSlides from "../components/getcomp/GetSlides.jsx";
import Navbar from "../components/Navbar"; // Ensure Navbar is included

const Training = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modules, setModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return;
        }

        const response = await fetch(
          "https://backend-5599.vercel.app/api/auth/me",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await fetch(
          "https://backend-5599.vercel.app/api/modules"
        );
        const data = await response.json();
        setModules(data);
      } catch (error) {
        console.error("Error fetching modules:", error);
      }
    };

    fetchModules();
  }, []);

  const handleModuleSelect = async (moduleId) => {
    setSelectedModule(moduleId);

    try {
      const quizzesResponse = await fetch(
        `https://backend-5599.vercel.app/api/modules/${moduleId}/quizzes`
      );
      const quizzesData = await quizzesResponse.json();
      setQuizzes(quizzesData);

      const slidesResponse = await fetch(
        `https://backend-5599.vercel.app/api/modules/${moduleId}/slides`
      );
      const slidesData = await slidesResponse.json();
      setSlides(slidesData);
    } catch (error) {
      console.error("Error fetching quizzes or slides:", error.message);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading...
      </div>
    );

  return (
    <>
      <div className="flex flex-col items-center p-5 bg-gray-100 min-h-screen lg:ml-64 pt-24">
        {/* Adjusted padding-top (pt-24) to prevent overlap with navbar */}
        <div className="w-full max-w-6xl bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Training Portal
          </h2>

          <div>
            {!selectedModule ? (
              <GetModules
                modules={modules}
                onSelectModule={handleModuleSelect}
              />
            ) : (
              <div>
                <button
                  onClick={() => setSelectedModule(null)}
                  className="mb-6 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                >
                  ← Back to Modules
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <GetQuizz quizzes={quizzes} />
                  <GetSlides slides={slides} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Training;
