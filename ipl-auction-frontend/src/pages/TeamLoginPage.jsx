import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function TeamLogin() {
  const [name, setName] = useState("");
    const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    const res = await API.post("/teams/login", { name,password });
    localStorage.setItem("team", JSON.stringify(res.data));
    navigate("/team/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="border rounded-xl p-8 w-[400px] shadow">
        <h1 className="text-2xl font-bold mb-6 text-blue text-center">
          Team Login
        </h1>

        <input
          placeholder="Enter Team Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full border px-4 py-3 rounded mb-4"
        />
        <input
          placeholder="Enter Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full border px-4 py-3 rounded mb-4"
        />

        <button
          onClick={login}
          className="w-full bg-blue text-white py-3 rounded font-semibold"
        >
          Login
        </button>
      </div>
    </div>
  );
}
