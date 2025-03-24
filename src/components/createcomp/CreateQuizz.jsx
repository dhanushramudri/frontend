import { useState } from "react";

const CreateQuiz = () => {
  const [moduleId, setModuleId] = useState(""); // Ensure this is a valid module ID
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""], answer: "" },
  ]);

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[oIndex] = value;
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: ["", "", "", ""], answer: "" },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(
      "https://backend-5599.vercel.app/api/modules/add-quiz",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ moduleId, title, questions }),
      }
    );

    const data = await res.json();
    if (res.ok) {
      alert("✅ Quiz created successfully!");
      setTitle("");
      setModuleId("");
      setQuestions([{ question: "", options: ["", "", "", ""], answer: "" }]);
    } else {
      alert("❌ Error: " + data.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">
        Create New Quiz
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={moduleId}
          onChange={(e) => setModuleId(e.target.value)}
          placeholder="Module ID"
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Quiz Title"
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {questions.map((q, qIndex) => (
          <div key={qIndex} className="border p-4 rounded-md">
            <input
              type="text"
              value={q.question}
              onChange={(e) =>
                handleQuestionChange(qIndex, "question", e.target.value)
              }
              placeholder="Question"
              required
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            />

            {q.options.map((opt, oIndex) => (
              <input
                key={oIndex}
                type="text"
                value={opt}
                onChange={(e) =>
                  handleOptionChange(qIndex, oIndex, e.target.value)
                }
                placeholder={`Option ${oIndex + 1}`}
                required
                className="w-full px-3 py-2 border rounded-md mt-2"
              />
            ))}

            <input
              type="text"
              value={q.answer}
              onChange={(e) =>
                handleQuestionChange(qIndex, "answer", e.target.value)
              }
              placeholder="Correct Answer"
              required
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 mt-2"
            />
          </div>
        ))}

        <button
          type="button"
          onClick={addQuestion}
          className="bg-gray-600 text-white py-2 px-4 rounded-md"
        >
          ➕ Add Question
        </button>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Create Quiz
        </button>
      </form>
    </div>
  );
};

export default CreateQuiz;
