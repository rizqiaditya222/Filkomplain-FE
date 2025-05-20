"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import FormInput from "../components/login/FormInput";
import Button from "../components/login/Button";
import authService from "../../services/auth-service";

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await authService.register({
        username,
        email,
        password,
      });

      if (response.success) {
        setSuccess(response.message || "Registration successful!");
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred during registration");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-black text-2xl font-bold mb-6 text-center">Register</h2>

        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}
        {success && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">{success}</div>}

        <form onSubmit={handleSubmit}>
          <FormInput label="Username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <FormInput label="Email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <FormInput label="Password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button label={isLoading ? "Processing..." : "Register"} type="submit" disabled={isLoading} />
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Sudah punya akun?{" "}
          <Link href="/login" className="text-[#00608C] hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
