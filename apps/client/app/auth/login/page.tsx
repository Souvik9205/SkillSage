"use client";
import React, { useState } from "react";
import { loginAction } from "@/_actions/authActions";
import { useSearchParams, useRouter } from "next/navigation";
import { decryptCallback } from "@/hooks/encryption";
import { useAuth } from "@/hooks/useAuth";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const encryptedCallback = searchParams.get("callback");
  const { setAuth } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const response = await loginAction(email, password);
    console.log(response);
    if (response.status !== 200) {
      setMessage(`Error: ${response.data.message}`);
    } else {
      setMessage("Logged in successfully!");
      const decryptedCallback = encryptedCallback
        ? decryptCallback(encryptedCallback)
        : "/";
      setAuth(response.data.accessToken, response.data.refreshToken);
      setTimeout(() => {
        router.push(decryptedCallback);
      }, 3000);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          Login
        </button>
      </form>
      {message && <p style={{ marginTop: "1rem" }}>{message}</p>}
      <div style={{ marginTop: "1rem" }}>
        <p>
          Don't have an account?{" "}
          <button
            onClick={() =>
              router.push(
                `/auth/signup?callback=${encodeURIComponent(encryptedCallback!)}`
              )
            }
            style={{
              color: "blue",
              textDecoration: "underline",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
