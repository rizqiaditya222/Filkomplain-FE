"use client";

import { useState } from "react";
import Link from "next/link";
import FormInput from "../components/login/FormInput";
import Button from "../components/login/Button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-black text-2xl font-bold mb-6 text-center">Login</h2>
        <form>
          <FormInput label="Email" name="email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
          <FormInput label="Password" name="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          <Link href={"/dashboard"}><Button label="Login" type="submit" /></Link>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Belum punya akun? <Link href="/register" className="text-blue-600 hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
}
