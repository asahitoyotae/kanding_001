"use client";

import Image from "next/image";
import "./globals.css";
import Sidebar from "./components/sidebar";
import OpenRes from "./components/prompter";
import AskSomething from "./components/search";
import { useEffect, useState } from "react";
import useStore from "./api/alldata";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuildingShield, faChess } from "@fortawesome/free-solid-svg-icons";
import { generateChatResponse } from "./api/completion/chat/route";
import { useRouter } from "next/navigation";
import userInfoStore from "./api/auth/userauthStore";

const Home = () => {
  const router = useRouter();
  const { user, access_key } = userInfoStore();
  const [userData, setUserData] = useState({});
  const [gptData, setGptData] = useState({});
  const {
    engine,
    setEngine,
    data,
    title,
    waiting,
    setWaiting,
    setShowBot,
    theme,
  } = useStore();
  useEffect(() => {
    if (!user && !access_key) {
      router.push("/login");
    }
  }, []);
  const handleUserData = (data) => {
    setShowBot(true);
    setUserData(data);
    setGptData({});
  };

  const handleGptData = (data) => {
    setGptData(data);
  };

  const handleEngineChange = (model) => {
    setEngine(model);
  };

  const callFornineoneone = async (e) => {
    e.preventDefault();
    if (waiting) {
      return;
    }
    let textToPass = e.target.innerText;
    let history = "";
    let filteredData = data.filter((item) => {
      return item.title == title;
    });
    for (
      let i = filteredData.length < 3 ? 0 : filteredData.length - 3;
      i < filteredData.length;
      i++
    ) {
      history += `user: ${filteredData[i].user.content}\n asistant: ${filteredData[i].bot.content}\n`;
    }
    let prompt = `this is our last conversation: (${history}) user: ${textToPass}\n assistant: `;

    let newtitle = textToPass.trim();
    if (newtitle.length > 20) {
      newtitle = newtitle.slice(0, 20);
      newtitle += "...";
    }

    handleUserData({
      title: title || newtitle,
      role: "user",
      content: textToPass,
    });
    setWaiting(true);
    const response = await generateChatResponse(prompt, engine);
    handleGptData({
      title: title || textToPass,
      role: "gpt",
      content: response.content,
    });
  };

  return (
    <main className="mt-16 pb-44">
      <Sidebar />
      <div className="ml-96 pr-56 items-center gap-5 mt-9 relative">
        <h1 className="text-center font-bold text-5xl p-3">Kanding</h1>
        <h1 className="text-center font-bold text-3xl ">
          The AI search engine for goat developers
        </h1>
        <div className=" mt-10 flex justify-between w-full px-56">
          <button
            onClick={() => handleEngineChange("gpt-3.5-turbo")}
            className={
              engine === "gpt-3.5-turbo"
                ? "rounded-2xl px-4 py-2 text-sm bg-gray-700 text-white"
                : "border rounded-2xl px-4 py-2 text-sm hover:bg-gray-50"
            }
          >
            GPT-Turbo
          </button>
          <button
            onClick={() => handleEngineChange("8K context")}
            className={
              engine === "8K context"
                ? "rounded-2xl px-4 py-2 text-sm bg-gray-700 text-white"
                : "border rounded-2xl px-4 py-2 text-sm hover:bg-gray-50"
            }
          >
            GPT-4
          </button>
          <button
            onClick={() => handleEngineChange("text-davinci-003")}
            className={
              engine === "text-davinci-003"
                ? "rounded-2xl px-4 py-2 text-sm bg-gray-700 text-white"
                : "border rounded-2xl px-4 py-2 text-sm hover:bg-gray-50"
            }
          >
            text-davinci-003
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2 w-full text-center mt-10">
          <div>
            <span className="mr-9">
              <FontAwesomeIcon icon={faChess} />
            </span>
            <span>Examples</span>
          </div>
          <div>
            <span className="mr-9">
              <FontAwesomeIcon icon={faBuildingShield} />
            </span>
            <span>Limitations</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-20 w-full text-center">
          <div>
            <p
              onClick={callFornineoneone}
              className="border rounded-xl  px-6 py-3 w-full my-2 cursor-pointer border bg-white"
            >
              unsay may na una, ang manok or ang itlog?
            </p>
            <p
              onClick={callFornineoneone}
              className="border rounded-xl  px-6 py-3 w-full my-2 cursor-pointer border bg-white"
            >
              pilay kanding sa bukid? gi hiktan oh gi buhian?
            </p>
          </div>
          <div>
            <div className="border rounded-xl  px-6 py-3 w-full my-2 cursor-pointer border bg-white">
              dili makablo mo timpla og kape.
            </div>
            <div className="border rounded-xl  px-6 py-3 w-full my-2 cursor-pointer border bg-white">
              kung walay internet walay ayo.
            </div>
          </div>
        </div>
        <OpenRes userData={userData} gptData={gptData} />
        <AskSomething
          handleUserData={handleUserData}
          handleGptData={handleGptData}
        />
      </div>
    </main>
  );
};

export default Home;
