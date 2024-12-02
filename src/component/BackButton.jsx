import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
    const navigate = useNavigate();

    return (
        <button
            className="bg-black text-white px-4 py-2 rounded shadow hover:bg-gray-800 transition"
            onClick={() => navigate(-1)} 
        >
            Back
        </button>
    );
};

export default BackButton;
