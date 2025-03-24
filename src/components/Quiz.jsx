import { useState } from "react";
import { Button } from "./ui/button";
import { submitQuiz } from "../services/quizzes";
import RadioGroup from "./RadioGroup"; // Ensure this exists
import Checkbox from "./Checkbox"; // Ensure this exists

const Quiz = ({ quiz, onSubmit }) => {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await submitQuiz(quiz._id, answers);
      setResult(response);
      onSubmit(response);
    } catch (error) {
      console.error("Error submitting quiz:", error);
      setError("Failed to submit quiz. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return <div>No questions available for this quiz.</div>;
  }

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      {quiz.questions.map((question, index) => (
        <div key={question.id || `question-${index}`} className="mb-4">
          <h3 className="font-bold">{question.question}</h3>
          {question.type === "multiple-choice" && (
            <RadioGroup
              options={question.options || []}
              selected={answers[question.id]}
              onChange={(value) => handleAnswerChange(question.id, value)}
            />
          )}
          {question.type === "checkbox" && (
            <Checkbox
              options={question.options || []}
              selected={answers[question.id]}
              onChange={(value) => handleAnswerChange(question.id, value)}
            />
          )}
        </div>
      ))}
      
      <Button onClick={handleSubmit} disabled={isSubmitting} className="mt-4">
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {result && (
        <div className="mt-4 bg-gray-100 p-4 rounded-md">
          <h3 className="font-bold">Result: {result.score}%</h3>
          <p>{result.feedback}</p>
        </div>
      )}
    </div>
  );
};

export default Quiz;
