"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import userInfoStore from "./../api/auth/userauthStore";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";
import {
  faGear,
  faLockOpen,
  faPaperclip,
} from "@fortawesome/free-solid-svg-icons";
import LogoutUser from "../api/auth/logout";
import { useRouter } from "next/navigation";
import chatStore from "../api/completion/chat/chatStore";
import useStore from "../api/alldata";
import { useState } from "react";

const BarDropbox = ({ drop, setDrop }) => {
  const router = useRouter();
  const {
    user,
    tokens,
    setUser,
    setAccessKey,
    getNewAccessKey,
  } = userInfoStore();
  const { setChats } = chatStore();
  const { updateTitle } = useStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    const logoutuser = await LogoutUser(tokens.access);

    if (logoutuser && logoutuser.success) {
      setDrop(false);
      setUser(null);
      setAccessKey(null);
      updateTitle(null);
      setChats([], false, [], true);
      setLoading(false);
      getNewAccessKey(true);
      setTimeout(() => {
        location.reload();
      }, 0);
    } else {
      setLoading(false);
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
    }
  };
  return (
    <div className={drop ? "drop_down drop_active" : "drop_down drop_inactive"}>
      <div className="flex flex-col items-center justify-center gap-3 mb-6">
        <FontAwesomeIcon
          icon={faCircleUser}
          style={{ width: "45px", height: "45px" }}
        />
        <p>{(user && user.user.username) || "no user"}</p>
      </div>
      <div className="drop_content_links ">
        <Link className="drop_link" href="#">
          <FontAwesomeIcon
            icon={faGear}
            style={{ width: "15px", height: "15px" }}
          />{" "}
          <span className="mx-4"> - </span>
          <p className="link_content">Settings</p>
        </Link>

        <Link className="drop_link" href="#">
          <FontAwesomeIcon
            icon={faLockOpen}
            style={{ width: "15px", height: "15px" }}
          />{" "}
          <span className="mx-4"> - </span>
          <p className="link_content">Privacy Policy</p>
        </Link>

        <Link className="drop_link" href="#">
          <FontAwesomeIcon
            icon={faPaperclip}
            style={{ width: "15px", height: "15px" }}
          />{" "}
          <span className="mx-4"> - </span>
          <p className="link_content">Terms of Use</p>
        </Link>

        <Link className="drop_link" href="#">
          <FontAwesomeIcon
            icon={faCircleUser}
            style={{ width: "15px", height: "15px" }}
          />{" "}
          <span className="mx-4"> - </span>
          <p className="link_content">About Us</p>
        </Link>
      </div>
      {user &&
        (loading ? (
          <div className="containery mt-7 mb-2">
            <div className="doty"></div>
            <div className="doty"></div>
            <div className="doty"></div>
            <div className="doty"></div>
            <div className="doty"></div>
          </div>
        ) : error ? (
          <div className="side_error text-gray-400 font-semibold text-sm mt-6 mb-1">
            Nework Error
          </div>
        ) : (
          <button
            onClick={handleLogout}
            className=" mt-5 rounded-md px-3 py-1 text-white text-sm bg-gray-800 hover:bg-gray-700"
          >
            logout
          </button>
        ))}
    </div>
  );
};

export default BarDropbox;
