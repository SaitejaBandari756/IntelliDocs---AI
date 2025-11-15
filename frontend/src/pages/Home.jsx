import React from "react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <section className="relative h-screen w-full bg-[#0b0f19] text-white flex flex-col items-center justify-center overflow-hidden">

      <div className="absolute w-[600px] h-[600px] bg-blue-600 rounded-full blur-[180px] opacity-20 top-[-150px] left-[-150px]" />
      <div className="absolute w-[600px] h-[600px] bg-purple-600 rounded-full blur-[180px] opacity-20 bottom-[-150px] right-[-150px]" />

      <h1 className="text-6xl font-extrabold mb-6 text-center tracking-tight">
        <span className="text-blue-400">IntelliDocs</span>
        <br />
        AI Document Intelligence
      </h1>

      <p className="text-gray-300 max-w-xl text-center text-lg mb-10 leading-relaxed">
        Upload documents, analyze content, and extract insights instantly using next-gen AI.
      </p>

      <button
        onClick={() => navigate("/Landing")}
        className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
      >
        Get Started ↓
      </button>
    </section>
  );
}
