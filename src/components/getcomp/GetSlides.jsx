import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const GetSlides = ({ slide, moduleId, userId, progress, fetchProgress }) => {
    const [loading, setLoading] = useState(false);

    const handleCompleteSlide = () => {
        if (loading) return;
        setLoading(true);

        try {
            let savedProgress = JSON.parse(localStorage.getItem(`progress_${userId}`)) || {};
            savedProgress[slide._id] = slide.percentage || 10;
            localStorage.setItem(`progress_${userId}`, JSON.stringify(savedProgress));

            toast.success("Slide marked as complete!");
            fetchProgress();
        } catch (error) {
            console.error("Error updating progress:", error);
            toast.error("Failed to update progress. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 border rounded shadow bg-white">
            <h2 className="text-xl font-semibold">{slide.title}</h2>
            <p className="text-gray-600">{slide.content}</p>

            {slide.media && (
                <img
                    src={slide.media}
                    alt={slide.title || "Slide media"}
                    className="w-full h-40 object-cover mt-2 rounded"
                />
            )}

            <button
                className={`mt-4 px-4 py-2 rounded text-white ${loading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"}`}
                onClick={handleCompleteSlide}
                disabled={loading || progress >= 10}
            >
                {progress >= 10 ? "Completed" : loading ? "Marking..." : "Complete Slide"}
            </button>
        </div>
    );
};

export default GetSlides;
