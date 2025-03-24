import { useState } from "react";

const CreateSlides = () => {
    const [moduleId, setModuleId] = useState("");  // Ensure a valid module ID
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [media, setMedia] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch("http://localhost:5000/api/modules/add-slide", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ moduleId, title, content, media }),
        });

        const data = await res.json();
        if (res.ok) {
            alert("✅ Slide created successfully!");
            setTitle("");
            setContent("");
            setMedia("");
            setModuleId("");
        } else {
            alert("❌ Error: " + data.message);
        }
    };

    return (
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Create New Slide</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" value={moduleId} onChange={(e) => setModuleId(e.target.value)} placeholder="Module ID" required
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Slide Title" required
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Slide Content" required
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"></textarea>
                <input type="text" value={media} onChange={(e) => setMedia(e.target.value)} placeholder="Media URL (optional)"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                    Create Slide
                </button>
            </form>
        </div>
    );
};

export default CreateSlides;
