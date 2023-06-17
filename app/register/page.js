"use client";

import {
  faKey,
  faLockOpen,
  faPerson,
  faUnlock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import "./custom.css";
import { faEnvelope, faEye } from "@fortawesome/free-regular-svg-icons";
import { createNewUser } from "./api/auth/route";
import userInfoStore from "./../api/auth/userauthStore";
import { NextRequest } from "next/server";
import { useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter();
  const [error, setError] = useState(null);
  const { user, setUser } = userInfoStore();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [eyeOpen, setEyeOpen] = useState(false);
  const [eyeOpend, setEyeOpend] = useState(false);

  const handelRegistration = async (e) => {
    e.preventDefault();
    setError(null);
    if (e.target.password.value !== e.target.re_password.value)
      return setError({ message: "password mismatch" });
    setLoading(true);
    const newUser = await createNewUser(e);
    if (newUser.success) {
      //setLoading(false);
      //setUser(newUser);
      router.push("/register/val");
    } else {
      console.log(newUser);
      setLoading(false);
      setError(newUser);
    }
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const error = emailRegex.test(email);
    if (!error) {
      document.getElementById("email").classList.remove("input_holder_border");
      document.getElementById("email").classList.add("error_border");
    } else {
      document.getElementById("email").classList.remove("error_border");
      document.getElementById("email").classList.add("input_holder_border");
    }
  };
  const handlePasswordChange = (e) => {
    const ipassword = e.target.value;
    if (ipassword.length < 12) {
      document
        .getElementById("password")
        .classList.remove("input_holder_border");
      document.getElementById("password").classList.add("error_border");
    } else {
      document.getElementById("password").classList.remove("error_border");
      document.getElementById("password").classList.add("input_holder_border");
      setPassword(ipassword);
    }
  };
  const handleREPasswordChange = (e) => {
    const repassword = e.target.value;
    if (repassword !== password) {
      document
        .getElementById("re_password")
        .classList.remove("input_holder_border");
      document.getElementById("re_password").classList.add("error_border");
    } else {
      document.getElementById("re_password").classList.remove("error_border");
      document
        .getElementById("re_password")
        .classList.add("input_holder_border");
    }
  };
  return (
    <div className="rounded-lg border w-1/3 mx-auto mt-20 flex flex-col item-center justify-center p-8 mb-10">
      <h1 className="text-2xl text-center font-bold my-6">
        Please Complete Registration
      </h1>
      <p className="text-sm text-center mb-5">
        Get started with our app, just create an account and enjoy the
        experience.
      </p>
      <form onSubmit={handelRegistration}>
        <div className="flex flex-col gap-2 relative mb-6">
          <label className="font-bold">Username</label>
          <input
            className="input_holder input_holder_border"
            name="username"
            type="text"
            id="name"
            placeholder="some_user312"
          />
          <FontAwesomeIcon
            icon={faPerson}
            style={{
              width: "25px",
              height: "25px",
              color: "gray",
              position: "absolute",
              top: "43px",
              left: "23px",
            }}
          />
        </div>
        <div className="flex flex-col gap-2 relative mb-6">
          <label className="font-bold">Email</label>
          <input
            onChange={handleEmailChange}
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
            onChange={handlePasswordChange}
            className="input_holder input_holder_border"
            name="password"
            type={eyeOpen ? "text" : "password"}
            id="password"
            placeholder="'password' must be atleast 12 characters"
          />
          <FontAwesomeIcon
            icon={faUnlock}
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
        <div className="flex flex-col gap-2 relative mb-6">
          <label className="font-bold">Retype - Password</label>
          <input
            onChange={handleREPasswordChange}
            className="input_holder input_holder_border"
            name="re_password"
            type={eyeOpend ? "text" : "password"}
            id="re_password"
            placeholder="Confirm password"
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
              setEyeOpend(!eyeOpend);
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
        <div className="flex flex-col gap-2 relative mb-6">
          <label className="font-bold">Access Key</label>
          <input
            className="input_holder input_holder_border"
            name="access_key"
            type="password"
            id="access_key"
            placeholder="enter kanding code"
          />
          <FontAwesomeIcon
            icon={faKey}
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
        {error && <div className="error_container">{error}</div>}
        <div className="w-full flex item-center justify-center">
          {loading ? (
            <section className="dots-container mt-4 mb-4">
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
    </div>
  );
};

export default Register;
