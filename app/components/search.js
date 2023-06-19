"use client";

import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { generateChatResponse } from "../api/completion/chat/route";
import useStore from "../api/alldata";
import { useRouter } from "next/navigation";
import userInfoStore from "./../api/auth/userauthStore";
import chatStore from "./../api/completion/chat/chatStore";
import "./custom_navbar.css";

const AskSomething = React.memo(({ handleUserData, handleGptData }) => {
  const { user, tokens } = userInfoStore();
  const router = useRouter();
  let [searchInput, setSearchInput] = useState("");
  const { title, engine, waiting, setWaiting, setAnimateThinking } = useStore();
  const { chats } = chatStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      e.target.search.value === "" ||
      e.target.search.value.trim().length < 1
    ) {
      return;
    }
    if (!user && !tokens.access) {
      return router.push("/login");
    }
    if (waiting) {
      return;
    }
    e.target.search.style.height = "24px";
    let messagesArray = [];
    let dummy = [];

    if (title === null) {
      messagesArray.push({ role: "user", content: searchInput });
    } else {
      for (let i = 0; i < chats.length; i++) {
        if (chats[i].chat_id === title) {
          dummy = chats[i].conv;
        }
      }
      for (let j = dummy.length - 1; j >= 0; j--) {
        if (messagesArray.length < 9) {
          messagesArray.unshift(dummy[j]);
        }
      }
      messagesArray.push({ role: "user", content: searchInput });
    }

    messagesArray.unshift({
      role: "system",
      content: "always use code blocks in writing programming languages",
    });

    // let prompt = `always use code blocks in writing programming languages. this is our last conversation: (${history}) user: ${searchInput}\n assistant: `;

    let newtitle = searchInput.trim();
    if (newtitle.length > 20) {
      newtitle = newtitle.slice(0, 20);
      newtitle += "...";
    }
    setAnimateThinking(false);
    handleUserData({
      title: title || null,
      role: "user",
      content: searchInput.trim(),
    });
    setSearchInput("");
    setWaiting(true);
    const response = await generateChatResponse(
      messagesArray,
      engine,
      title,
      tokens
    );
    handleGptData({
      title: title || searchInput,
      role: response.res.role,
      content: response.res.content,
      data: response,
    });
  };

  const handleKeyDown = (e) => {
    if (e.shiftKey && e.key == "Enter") {
    } else if (e.key === "Enter") {
      if (waiting) {
        e.preventDefault();
        return;
      } else {
        e.preventDefault();
        document.querySelector('button[type="submit"]').click();
      }
    }
  };

  const handleInputChange = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`;

    setSearchInput(e.target.value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-1/2 fixed bottom-10 start_of_left"
    >
      <div className="w-full p-4 border rounded-lg flex shadow-lg bg-white flex-grow">
        <label htmlFor="search"></label>
        <textarea
          className="flex-1 outline-none resize-none"
          type="text"
          onKeyDown={handleKeyDown}
          name="search"
          onInput={handleInputChange}
          value={searchInput}
          rows={1}
          placeholder="Ask me goat questions..."
        />
        {!waiting && (
          <button className="px-4 " type="submit">
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        )}
      </div>
    </form>
  );
});

AskSomething.displayName = "AskSomething";

export default AskSomething;
