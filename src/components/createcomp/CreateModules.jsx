import { useState } from "react";

const CreateModules = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [response, setResponse] = useState(null); // ✅ Store API response

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch("http://localhost:5000/api/modules/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, description }),
        });

        const data = await res.json();
        setResponse(data); // ✅ Store response in state

        if (res.ok) {
            alert("✅ Module created successfully!");
            console.log("📌 Response Data:", data); // ✅ Print full response in console
            setTitle("");
            setDescription("");
        } else {
            alert("❌ Error: " + data.message);
        }
    };

    return (
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Create New Module</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Module Title"
                    required
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Module Description"
                    required
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                ></textarea>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                    Create Module
                </button>
            </form>

            {/* ✅ Show API Response in Browser */}
            {response && (
                <div className="mt-4 p-4 bg-gray-100 text-gray-700 rounded-md">
                    <h3 className="text-lg font-semibold">Module ID</h3>
                    <pre className="bg-white p-2 rounded-md border border-gray-300 text-sm">
                        {JSON.stringify(response._id, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
};

export default CreateModules;
