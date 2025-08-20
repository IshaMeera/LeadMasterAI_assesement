import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosEye } from "react-icons/io";
import { TbEyeClosed } from "react-icons/tb";

const Registeer = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Register failed");
      }
      const data = await res.json();
      console.log("Register successful:", data);

      alert(`${data.message}!`);
      window.location.href = '/login';
    } catch (err) {
      console.log("Error during register:", err);
      setError(err.message || "An error occurred during Register");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-black to-gray-800">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-white tracking-wide">
          Create Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-700 rounded-xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-700 rounded-xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
          <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-700 rounded-xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
          <button
            type="button"
              onClick={()=> setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            >
            {showPassword ? <TbEyeClosed size={18} /> : <IoIosEye size={18} />}
          </button>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg transition-all transform hover:scale-105"
          >
            Register
          </button>
        </form>
         <p className="mt-6 text-center text-gray-400">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-blue-500 hover:underline cursor-pointer"
        >
          Login
        </Link>
      </p>
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default Registeer;
