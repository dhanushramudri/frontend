import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GetModules = () => {
    const [modules, setModules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:5000/api/modules")
            .then((res) => {
                setModules(res.data);
                setLoading(false);
            })
            .catch((err) => {
                setError("Failed to fetch modules");
                setLoading(false);
            });
    }, []);

    if (loading) return <p className="text-center text-gray-500">Loading modules...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-4">Modules</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {modules.map((module) => (
                    <div
                        key={module._id}
                        className="p-4 border rounded-lg shadow-md bg-white cursor-pointer hover:bg-gray-100"
                        onClick={() => navigate(`/modules/${module._id}`)}
                    >
                        <h2 className="text-xl font-semibold">{module.title}</h2>
                        <p className="text-gray-600">{module.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GetModules;
