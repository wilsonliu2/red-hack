import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({ user: "", password: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      navigate("/feed");
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        formData,
      );
      console.log(response);
      if (response.status == 200) {
        setMessage("Sucess");

        localStorage.setItem("jwtToken", response.data.jwtToken);
        navigate("/feed");
      }
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    }

    console.log(formData);
  };

  return (
    <>
      <div className="flex h-screen items-center justify-center bg-lighter-base-color">
        <form
          className="max-w-sm space-y-6 rounded-md bg-white p-8 shadow-md"
          onSubmit={handleSubmit}
        >
          <h2 className="mb-4 text-center text-2xl font-thin">Login</h2>
          <input
            name="user"
            placeholder="Email or Username"
            value={formData.user}
            onChange={handleChange}
            className="w-full rounded-md border px-4 py-2 shadow-sm"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded-md border px-4 py-2 shadow-sm"
          />
          <button
            type="submit"
            className="w-full rounded-md bg-base-color py-2 text-white shadow-md transition-all duration-300 hover:scale-105"
          >
            Login
          </button>
          {message && <h1 className="text-center text-green-500">{message}</h1>}
          {error && <h1 className="text-center text-red-600">{error}</h1>}
        </form>
      </div>
    </>
  );
};

export default Login;
