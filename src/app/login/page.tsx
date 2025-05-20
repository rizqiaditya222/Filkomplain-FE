"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import FormInput from "../components/login/FormInput";
import Button from "../components/login/Button";
import authService from "../../services/auth-service";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await authService.login({
        email,
        password,
      });

      if (response.success) {
        router.push("/dashboard");
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-black text-2xl font-bold mb-6 text-center">Login</h2>

        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}

        <form onSubmit={handleSubmit}>
          <FormInput label="Email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <FormInput label="Password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button label={isLoading ? "Processing..." : "Login"} type="submit" disabled={isLoading} />
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Belum punya akun?{" "}
          <Link href="/register" className="text-[#00608C] hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
