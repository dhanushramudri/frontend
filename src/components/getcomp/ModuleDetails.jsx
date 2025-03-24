import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import GetSlides from "./GetSlides";
import GetQuizz from "./GetQuizz";
import { useAuth } from "../../context/AuthContext";

const ModuleDetails = () => {
    const { id } = useParams();
    const { user } = useAuth(); 
    const [module, setModule] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [progress, setProgress] = useState({ slides: {}, quizzes: {} });

    const userId = user?.id || "guest"; 

    useEffect(() => {
        const fetchModuleDetails = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/modules/${id}`);
                setModule(res.data);
            } catch (err) {
                setError("Failed to fetch module details");
            } finally {
                setLoading(false);
            }
        };

        fetchModuleDetails();
        fetchProgress();
    }, [id]);

    const fetchProgress = () => {
        const slideProgress = JSON.parse(localStorage.getItem(`progress_${userId}`)) || {};
        const quizProgress = JSON.parse(localStorage.getItem(`quiz_progress_${userId}`)) || {};
        setProgress({ slides: slideProgress, quizzes: quizProgress });
    };

    if (loading) return <p className="text-center text-gray-500 text-lg font-semibold">Loading module...</p>;
    if (error) return <p className="text-center text-red-500 text-lg font-semibold">{error}</p>;

    return (
        <div className="container mx-auto px-4 py-6 max-w-7xl min-h-screen lg:ml-64 pt-24">
            <div className="bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-4xl font-bold text-center text-blue-600 mb-4">{module.title}</h1>
                <p className="text-gray-700 text-center mb-6 text-lg">{module.description}</p>
            </div>

            {/* Slides Section */}
            <section className="my-8">
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">📑 Slides</h2>
                {module.slides.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {module.slides.map((slide) => (
                            <GetSlides
                                key={slide._id}
                                slide={slide}
                                moduleId={id}
                                userId={userId}
                                progress={progress.slides[slide._id] || 0}
                                fetchProgress={fetchProgress}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-lg">No slides available</p>
                )}
            </section>

            {/* Quizzes Section */}
            <section className="my-8">
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">📝 Quizzes</h2>
                {module.quizzes.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {module.quizzes.map((quiz) => (
                            <GetQuizz
                                key={quiz._id}
                                quiz={quiz}
                                moduleId={id}
                                userId={userId}
                                progress={progress.quizzes[quiz._id] || 0}
                                fetchProgress={fetchProgress}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-lg">No quizzes available</p>
                )}
            </section>
        </div>
    );
};

export default ModuleDetails;
