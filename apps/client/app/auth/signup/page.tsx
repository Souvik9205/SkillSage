"use client";
import React, { useState } from "react";
import { sendOTPAction, OTPVerificationAction } from "@/_actions/authActions";
import { useSearchParams, useRouter } from "next/navigation";
import { decryptCallback } from "@/hooks/encryption";
import { useAuth } from "@/hooks/useAuth";

function SignInPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [message, setMessage] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const encryptedCallback = searchParams.get("callback");
  const { setAuth } = useAuth();

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    const response = await sendOTPAction(email);
    console.log(response);
    if (response.status !== 200 || response.status !== 201) {
      setMessage(`Error: ${response.data || "Failed to send OTP"}`);
    } else {
      setMessage("OTP sent! Please check your email.");
      setOtpSent(true);
    }
  };

  const handleOTPVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    const response = await OTPVerificationAction(
      email,
      otp,
      name,
      password,
      avatar
    );
    console.log(response);
    if (response.status !== 200) {
      setMessage(
        `Error: ${response.data.message || "OTP verification failed"}`
      );
    } else {
      setMessage("Signed in successfully!");
      setAuth(response.data.accessToken, response.data.refreshToken);
      setTimeout(() => {
        router.push(decryptedCallback);
      }, 3000);
      const decryptedCallback = encryptedCallback
        ? decryptCallback(encryptedCallback)
        : "/";
      setTimeout(() => {
        router.push(decryptedCallback);
      }, 3000);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h1>Sign In</h1>
      <form onSubmit={handleSendOTP}>
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
        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          Send OTP
        </button>
      </form>

      <form onSubmit={handleOTPVerification}>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="otp">OTP:</label>
          <input
            id="otp"
            type="text"
            value={otp}
            placeholder="Enter the OTP"
            onChange={(e) => setOtp(e.target.value)}
            required
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            value={name}
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
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
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="avatar">Avatar URL (optional):</label>
          <input
            id="avatar"
            type="text"
            value={avatar}
            placeholder="Enter avatar URL"
            onChange={(e) => setAvatar(e.target.value)}
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          Verify OTP and Sign In
        </button>
      </form>
      {message && <p style={{ marginTop: "1rem" }}>{message}</p>}
    </div>
  );
}

export default SignInPage;
