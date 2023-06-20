"use client";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import chatStore from "../api/completion/chat/chatStore";
import useStore from "../api/alldata";
import userInfoStore from "../api/auth/userauthStore";
import { deleteAllChat, deleteSingleChat } from "../api/completion/chat/route";
import "./custom_navbar.css";

const Sidebar = () => {
  const { chats, setChats } = chatStore();
  const { updateTitle, title, waiting } = useStore();
  const { tokens } = userInfoStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [singleLoading, setSingleLoading] = useState(false);
  const [toDelete, settoDelete] = useState(null);

  const handleDeleteThreads = async () => {
    if (waiting || chats.length === 0) {
      return;
    }
    setLoading(true);
    const res = await deleteAllChat(tokens.access);
    if (res.success) {
      setChats([], false, [], true);
      setLoading(false);
      updateTitle(null);
    } else {
      setError(true);
      console.log(res);
      setLoading(false);
      setTimeout(() => {
        setError(false);
      }, 2000);
    }
  };

  const handleSingleDelete = async (selected) => {
    if (waiting && selected === title) {
      return;
    }
    setSingleLoading(true);
    settoDelete(selected);
    const del = await deleteSingleChat(tokens.access, selected);
    if (del.success) {
      const data = [...chats];
      const index = data.findIndex((chat) => chat.chat_id === selected);
      if (index === -1) {
        return;
      } else {
        data.splice(index, 1);
        await setChats([], false, data, true);
        setSingleLoading(false);
        if (title === selected) {
          updateTitle(null);
        }
      }
    } else {
      setSingleLoading(false);
    }
  };
  return (
    <div className="mt-20 pb-24 w-1/6 px-4 flex flex-col text-sm fixed top-0 left-0 h-full">
      <h1 className="mb-9 text-center text-2xl font-bold">Kanding</h1>
      <button
        onClick={() => {
          if (waiting) {
            return;
          }
          updateTitle(null);
        }}
        className=" duration-500 ease-in-out hover:duration-500 ease-in-out mb-8 mt-2 rounded-md w-full py-5 border text-left pl-9 hover:bg-green-200"
      >
        <FontAwesomeIcon icon={faMessage} />
        <span className="ml-9">New thread</span>
      </button>
      <div
        className={
          loading || error
            ? "flex-1 item-center justify-center"
            : "flex-1 overflow-y-auto"
        }
      >
        {loading ? (
          <div className="containery">
            <div className="doty"></div>
            <div className="doty"></div>
            <div className="doty"></div>
            <div className="doty"></div>
            <div className="doty"></div>
          </div>
        ) : error ? (
          <div className="text-center font-semibold side_error text-gray-500 ">
            Network Error
          </div>
        ) : (
          chats.map((e, index) => {
            return (
              <div
                key={e.chat_id}
                onClick={() => {
                  if (waiting) {
                    return;
                  }
                  updateTitle(e.chat_id);
                }}
                className="chat_choice duration-500 ease-in-out my-1 rounded-md w-full py-5 border text-left pl-3 cursor-pointer hover:bg-gray-200 hover:duration-500 ease-in-out"
              >
                {singleLoading && toDelete === e.chat_id ? (
                  <div className="loader"></div>
                ) : (
                  <>
                    <p>{e.title}</p>
                    <div className="del_choice">
                      <FontAwesomeIcon
                        onClick={(event) => {
                          event.stopPropagation();
                          handleSingleDelete(e.chat_id);
                        }}
                        icon={faTrashCan}
                      />
                    </div>
                  </>
                )}
              </div>
            );
          })
        )}
      </div>

      <button
        onClick={handleDeleteThreads}
        className="duration-500 ease-in-out hover:duration-500 ease-in-out my-1 rounded-md w-full py-5 border text-left pl-9 hover:bg-red-200"
      >
        <FontAwesomeIcon icon={faTrashCan} />
        <span className="ml-9">Delete Threads</span>
      </button>
      <button className="duration-500 ease-in-out hover:duration-500 ease-in-out my-1 rounded-md w-full py-5 border text-left pl-9 hover:bg-blue-200">
        <FontAwesomeIcon icon={faPaperclip} />
        <span className="ml-9">Costumize</span>
      </button>
    </div>
  );
};

export default Sidebar;
