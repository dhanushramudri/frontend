import React, { useState, useEffect } from "react";

const GetQuizz = ({ quiz, userId, moduleId, progress, fetchProgress }) => {
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [feedback, setFeedback] = useState(null);

    const handleSubmit = () => {
        if (!selectedAnswer) {
            alert("Please select an answer!");
            return;
        }

        const correctAnswer = quiz.questions[0].answer;
        if (selectedAnswer === correctAnswer) {
            setFeedback("correct");
        } else {
            setFeedback("incorrect");
        }

        try {
            let savedProgress = JSON.parse(localStorage.getItem(`quiz_progress_${userId}`)) || {};
            savedProgress[quiz._id] = selectedAnswer === correctAnswer ? 20 : 0;
            localStorage.setItem(`quiz_progress_${userId}`, JSON.stringify(savedProgress));

            fetchProgress();
        } catch (error) {
            console.error("Error updating progress:", error);
        }
    };

    return (
        <div className="p-4 border rounded shadow bg-white">
            <h2 className="text-xl font-semibold">{quiz.title}</h2>
            <p className="text-gray-600">{quiz.questions[0].question}</p>

            {quiz.questions[0].options.map((option, index) => (
                <div key={index} className="mt-2">
                    <input
                        type="radio"
                        id={`option-${index}`}
                        name="quiz"
                        value={option}
                        onChange={(e) => setSelectedAnswer(e.target.value)}
                    />
                    <label className={`ml-2 ${feedback && option === selectedAnswer ? (option === quiz.questions[0].answer ? "text-green-600 font-bold" : "text-red-600 font-bold") : "text-gray-600"}`}>
                        {option}
                    </label>
                </div>
            ))}

            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSubmit} disabled={progress >= 20}>
                {progress >= 20 ? "Completed" : "Submit Answer"}
            </button>
        </div>
    );
};

export default GetQuizz;
