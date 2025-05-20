"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import FormInput from "../components/login/FormInput";
import Button from "../components/login/Button";
import authService from "../../services/auth-service";
import IconProvider from "../components/common/IconProvider";

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
        <div className="flex justify-center mb-6">
          <IconProvider icon="LockClosedIcon" className="w-12 h-12 text-[#00608C]" />
        </div>
        <h2 className="text-black text-2xl font-bold mb-6 text-center">Login</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded flex items-center">
            <IconProvider icon="ExclamationTriangleIcon" className="w-5 h-5 mr-2" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="relative">
            <FormInput label="Email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none mt-6">
              <IconProvider icon="EnvelopeIcon" className="h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="relative">
            <FormInput label="Password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none mt-6">
              <IconProvider icon="KeyIcon" className="h-5 w-5 text-gray-400" />
            </div>
          </div>

          <Button label={isLoading ? "Processing..." : "Login"} type="submit" disabled={isLoading} />
        </form>
        <p className="mt-4 text-sm text-center text-gray-600 flex items-center justify-center">
          <IconProvider icon="ArrowLeftIcon" className="w-4 h-4 mr-1" />
          Belum punya akun?{" "}
          <Link href="/register" className="text-[#00608C] hover:underline ml-1">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
