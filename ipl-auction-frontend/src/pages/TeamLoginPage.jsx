import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function TeamLogin() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/teams/login", { name, password });
      localStorage.setItem("team", JSON.stringify(res.data));
      navigate("/team/dashboard");
    } catch (err) {
      alert("Invalid Team Name or Password");
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-white flex items-center justify-center">
      
      {/* Background Diagonal Stripes */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[200%] h-40 bg-blue-500 rotate-[-8deg] -top-20 -left-1/4" />
        <div className="absolute w-[200%] h-32 bg-red-500 rotate-[-8deg] top-24 -left-1/4" />
        <div className="absolute w-[200%] h-32 bg-yellow-400 rotate-[-8deg] top-48 -left-1/4" />
        <div className="absolute w-[200%] h-32 bg-green-500 rotate-[-8deg] top-72 -left-1/4" />
      </div>

      {/* Side Chevrons */}
      <div className="hidden lg:flex absolute left-0 h-full items-center">
        <div className="w-16 h-80 bg-red-500 skew-x-[-20deg] mr-2"></div>
        <div className="w-16 h-80 bg-blue-500 skew-x-[-20deg]"></div>
      </div>

      <div className="hidden lg:flex absolute right-0 h-full items-center">
        <div className="w-16 h-80 bg-green-500 skew-x-[20deg] mr-2"></div>
        <div className="w-16 h-80 bg-yellow-400 skew-x-[20deg]"></div>
      </div>

      {/* Login Card */}
      <div className="w-[380px] bg-black/80 backdrop-blur-xl rounded-2xl p-8 shadow-2xl text-white">
        <h1 className="text-3xl font-extrabold text-center mb-8 bg-gradient-to-r from-blue-400 via-red-400 to-yellow-400 bg-clip-text text-transparent">
          TEAM LOGIN
        </h1>

        <form onSubmit={login} className="space-y-5">
          
          {/* Team Name */}
          <div className="flex items-center bg-white/10 rounded-lg px-4 py-3">
            <span className="mr-3">👤</span>
            <input
              type="text"
              placeholder="Team Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-transparent outline-none w-full placeholder:text-gray-300"
              required
            />
          </div>

          {/* Password */}
          <div className="flex items-center bg-white/10 rounded-lg px-4 py-3">
            <span className="mr-3">🔒</span>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent outline-none w-full placeholder:text-gray-300"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 hover:opacity-90 transition"
          >
            LOGIN
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/admin")}
            className="text-sm text-white/50 hover:text-white transition"
          >
            Admin Access
          </button>
        </div>
      </div>
    </div>
  );
}
