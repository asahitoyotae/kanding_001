"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faEye } from "@fortawesome/free-regular-svg-icons";
import { faLockOpen } from "@fortawesome/free-solid-svg-icons";
import "../register/custom.css";
import getAcess from "./api/auth/route";
import userInfoStore from "./../api/auth/userauthStore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import chatStore from "../api/completion/chat/chatStore";

const LogIn = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setUser, setAccessKey, getNewAccessKey } = userInfoStore();
  const { setChats } = chatStore();
  const router = useRouter();
  const [eyeOpen, setEyeOpen] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError(null);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailError = emailRegex.test(e.target.email.value);

    if (!emailError) {
      setError({ message: "invalid email" });
      return;
    }
    // if (e.target.password.value.length <= 0) {
    //   setError({ message: "provide password" });
    //   return;
    // }
    setLoading(true);
    const iuser = await getAcess(e);
    console.log("user", iuser);
    if (iuser.success) {
      setUser(iuser);
      setAccessKey(iuser.tokens);
      getNewAccessKey();
      setChats([], false, iuser.prev_chats, true);
      router.push("/");
    } else {
      setLoading(false);
      setError(iuser);
    }
  };
  return (
    <div className="rounded-lg border w-1/3 mx-auto mt-20 flex flex-col item-center justify-center p-8 mb-10">
      <h1 className="text-2xl text-center font-bold my-6">Please Login</h1>
      <p className="text-sm text-center mb-10">
        Get started with our app, just login with your account and enjoy the
        experience.
      </p>
      <form onSubmit={handleLogin}>
        <div className="flex flex-col gap-2 relative mb-6">
          <label className="font-bold">Email</label>
          <input
            className="input_holder  input_holder_border"
            name="email"
            type="text"
            id="email"
            placeholder="some_email@example.com"
          />
          <FontAwesomeIcon
            icon={faEnvelope}
            style={{
              width: "25px",
              height: "25px",
              color: "gray",
              position: "absolute",
              top: "42px",
              left: "23px",
            }}
          />
        </div>
        <div className="flex flex-col gap-2 relative mb-6">
          <label className="font-bold">Password</label>
          <input
            className="input_holder input_holder_border"
            name="password"
            type={eyeOpen ? "text" : "password"}
            id="password"
            placeholder="Enter password "
          />
          <FontAwesomeIcon
            icon={faLockOpen}
            style={{
              width: "25px",
              height: "25px",
              color: "gray",
              position: "absolute",
              top: "42px",
              left: "23px",
            }}
          />
          <FontAwesomeIcon
            onClick={() => {
              setEyeOpen(!eyeOpen);
            }}
            icon={faEye}
            style={{
              width: "25px",
              height: "25px",
              color: "gray",
              position: "absolute",
              top: "42px",
              right: "23px",
              cursor: "pointer",
            }}
          />
        </div>
        {error && <div className="error_container">{error}</div>}
        <div className="w-full flex item-center justify-center">
          {loading ? (
            <section className="dots-container mt-4 mb-5">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </section>
          ) : (
            <button className="rounded-lg text-white px-10 py-3 bg-blue-500 hover:bg-blue-600">
              Submit
            </button>
          )}
        </div>
      </form>
      <div className=" my-5 flex text-sm ">
        <p>no account yet?</p>
        <Link className="text-blue-500 ml-2 underline" href="/register">
          register
        </Link>
      </div>
    </div>
  );
};

export default LogIn;
