// src/pages/LoginPage.tsx
import { Button } from "@/components/ui/button";
import { login, isLoggedIn } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/favorites");
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      login("TokenIsValid");
      navigate("/");
    } else {
      setError("Username atau password salah");
    }
  };

  return (
    <div className="p-4 flex flex-col items-center justify-center h-[80vh]">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <div>
          <label className="block text-sm mb-1">Username</label>
          <input
            className="w-full border px-3 py-2 rounded text-black"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="admin"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            className="w-full border px-3 py-2 rounded text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="admin"
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </div>
  );
}
