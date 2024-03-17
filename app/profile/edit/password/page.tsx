"use client";

import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";

const changePassword = async ({ password, newPassword, confirmPassword }) => {
  const res = await fetch("/api/profile/changepassword", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, newPassword, confirmPassword }),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message);
  }

  return res.json();
};
function ChangePassword() {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    mutation.mutate({ password, newPassword, confirmPassword });
  };
  const mutation = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      alert("Password Changed");
      setPassword("");
      setNewPassword("");
      setConfirmPassword("");
    },
    onError: (error) => {
      console.error("An error occurred:", error);
      alert("An error occurred. Please try again.");
    },
  });

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white px-2 py-6 sm:p-20 w-full md:w-[600px] rounded-2xl shadow-lg">
        <div className="block pl-2 font-semibold text-xl text-gray-700">
          <h2 className="leading-relaxed">Change Password</h2>
          <p className="text-sm text-gray-500 font-normal">
            Enter your current and new password.
          </p>
        </div>

        <form className="space-y-6 py-8" onSubmit={handleSubmit}>
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="peer w-full border-2 py-8 px-2 border-gray-800 text-gray-900 focus:outline-none focus:border-rose-600"
              required
            />
            <label
              htmlFor="current-password"
              className={`absolute left-3 top-8 text-gray-600 text-md peer-focus:top-0 transition-all ${
                password ? "-top-0" : ""
              }`}
            >
              Current Password
            </label>
          </div>
          <div className="relative">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="peer w-full border-2 py-8 px-2 border-gray-800 text-gray-900 focus:outline-none focus:border-rose-600"
              required
            />
            <label
              htmlFor="new-password"
              className={`absolute left-3 top-8 text-gray-600 text-md peer-focus:top-0 transition-all ${
                newPassword ? "-top-0" : ""
              }`}
            >
              New Password
            </label>
          </div>
          <div className="relative">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="peer w-full border-2 py-8 px-2 border-gray-800 text-gray-900 focus:outline-none focus:border-rose-600"
              required
            />
            <label
              htmlFor="confirm-password"
              className={`absolute left-3 top-8 text-gray-600 text-md peer-focus:top-0 transition-all ${
                confirmPassword ? "-top-0" : ""
              }`}
            >
              Confirm New Password
            </label>
          </div>
          <button className="border border-black px-4 py-3 rounded-2xl w-full bg-gradient-to-br text-white from-red-500 to bg-violet-500">
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
