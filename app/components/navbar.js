"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faBars, faHome } from "@fortawesome/free-solid-svg-icons";
import userInfoStore from "../api/auth/userauthStore";
import "./custom_navbar.css";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import BarDropbox from "./barDropbox";
import React, { useState } from "react";

const Navbar = () => {
  const [drop, setDrop] = useState(false);
  const { user } = userInfoStore();

  return (
    <>
      <nav className="my_navbar">
        <div className="user_container">
          {user ? (
            <>
              <div>
                <FontAwesomeIcon
                  icon={faCircleUser}
                  style={{ width: "25px", height: "25px" }}
                />
              </div>
              <div>{user.user.username}</div>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-md px-4 py-1 bg-orange-500 text-sm text-white font-semibold ml-2"
              >
                login
              </Link>
              <Link
                href="/register"
                className="rounded-md px-4 py-1 bg-teal-500 text-sm text-white font-semibold ml-2"
              >
                register
              </Link>
            </>
          )}
        </div>
        <div className="nav_component">
          <Link className="home_icon" href="/">
            <FontAwesomeIcon
              icon={faHome}
              style={{ width: "16px", height: "16px" }}
            />
            <div className="home_label">home</div>
          </Link>
          <Link className="filter_icon" href="#">
            <FontAwesomeIcon
              icon={faFilter}
              style={{ width: "16px", height: "16px" }}
            />
            <div className="filter_label">soon to open</div>
          </Link>
          <button
            onClick={() => {
              setDrop(!drop);
            }}
          >
            <FontAwesomeIcon
              icon={faBars}
              style={{ width: "16px", height: "16px" }}
            />
          </button>
        </div>
      </nav>
      <BarDropbox drop={drop} setDrop={setDrop} />
      {drop && (
        <div onClick={() => setDrop(!drop)} className="click_outside"></div>
      )}{" "}
    </>
  );
};

export default Navbar;
