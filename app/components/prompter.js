"use client";
import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import useStore from "../api/alldata";
import Typewriter from "typewriter-effect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import chatStore from "./../api/completion/chat/chatStore";

const OpenRes = ({ userData, gptData }) => {
  const { chats, setChats } = chatStore();
  const {
    updateTitle,
    title,
    setWaiting,
    animateThinking,
    setAnimateThinking,
    showBot,
    setShowBot,
    content,
    setContent,
  } = useStore();
  let [newMessage, setnewMessage] = useState("");
  let [done, setDone] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (gptData.content) {
      setAnimateThinking(true);
      gptData.content = gptData.content.replace(/Assistant:|assistant:/, "");
      const changeData = () => {
        let textArray = gptData.content.split("```");
        let textContent = "";
        textArray.forEach((item, index) => {
          if (index % 2 === 0) {
            item = item.trim();
            const innerArray = item.split("`");
            let innerText = "";
            innerArray.forEach((element, i) => {
              if (i % 2 === 0) {
                innerText += `${element}`;
              } else {
                innerText += `<span class='text-white py-1 px-2 rounded-lg mx-1 bg-gray-700'>${element}</span>`;
              }
            });
            textContent += `<pre class='custom-pre'><p class='leading-7'>${innerText}</p></pre>`;
          } else {
            item = item.trim();
            textContent += `<div class='relative'><pre class='bg-gray-700 rounded-lg text-white p-2 my-2 w-full overflow-x-auto'><code>${item}</code></pre></div>`;
          }
        });

        setContent(textContent);
      };
      changeData();
    }
  }, [gptData.content]);

  useEffect(() => {
    setDone(true);
    if (userData.content) {
      const interval = setInterval(() => {
        setnewMessage((newMessage += " ."));
        if (newMessage.length >= 8) {
          newMessage = "";
        }

        if (animateThinking) {
          clearInterval(interval);
        }
      }, 300);
      return () => {
        clearInterval(interval);
      };
    }
  }, [userData.content, animateThinking]);

  const [currentChat, setCurrentChat] = useState([]);
  const [newTitle, setnewTitle] = useState(false);
  useEffect(() => {
    if (newTitle) return setnewTitle(false);
    if (title) {
      chats.map((e, index) => {
        if (chats[index].chat_id === title) {
          setCurrentChat(chats[index].conv);
        }
      });
    } else {
      setCurrentChat([]);
    }
  }, [title]);

  useLayoutEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    };
    setTimeout(() => {
      scrollToBottom();
      setnewTitle(false);
    }, 0);
  }, [userData.content, currentChat, title]);

  const [copyAccess, setCopyAccess] = useState();
  const [copied, setcopied] = useState(false);
  const copyToClipboard = (text, ind, index) => {
    setCopyAccess(`${index}-${ind}`);
    navigator.clipboard
      .write(text)
      .then(() => {
        setcopied(true);
      })
      .catch(() => {
        setcopied(true);
      });
  };

  return (
    <div id="container" className="mt-16">
      {currentChat.map((item, index) => {
        return (
          <div key={`${index}-${item.id}`} className="w-full">
            {item.role === "user" ? (
              <div className="p-8 w-full grid grid-cols-10">
                <div
                  className="col-span-1"
                  style={{
                    minWidth: "70px",
                    maxWith: "70px",
                    width: "70px",
                    height: "70px",
                  }}
                >
                  <img src="/user.png" alt="user" />
                </div>
                <div className="col-span-9">
                  <pre className="custom-pre">
                    <p>{item.content}</p>
                  </pre>
                </div>
              </div>
            ) : (
              <div
                className={
                  item.content.includes("Sorry! an Error has occured")
                    ? "shadow-lg shadow-red-400 border-2 border-red-400 rounded-lg p-8 w-full grid grid-cols-10 gap-2 "
                    : "shadow-lg border rounded-lg p-8 w-full grid grid-cols-10 "
                }
              >
                <div
                  className="col-span-1"
                  style={{
                    minWidth: "70px",
                    maxWith: "70px",
                    width: "70px",
                    height: "70px",
                  }}
                >
                  <img src="/goat.png" alt="user" />
                </div>
                <div className="w-full col-span-9">
                  {item.content.split("```").map((text, ind) => {
                    if (ind % 2 == 0) {
                      text = text.trim();
                      return (
                        <pre key={`b${ind}-${index}-`} className="custom-pre ">
                          <p className=" leading-7 ">
                            {text.split("`").map((item, i) => {
                              if (i % 2 === 0) {
                                return item;
                              } else {
                                return (
                                  <span
                                    key={`e${i}-${ind}-`}
                                    className=" text-white py-1 px-2 rounded-lg mx-1 bg-gray-700"
                                  >
                                    {item}
                                  </span>
                                );
                              }
                            })}
                          </p>
                        </pre>
                      );
                    } else {
                      return (
                        <div
                          key={`r${ind}-${index}`}
                          className="relative my-2 bg-gray-700 rounded-lg text-white p-2"
                        >
                          <pre className="overflow-x-auto">
                            <code className="">{text.trim()}</code>
                          </pre>
                          {copied && copyAccess == `${index}-${ind}` ? (
                            <div className="absolute p-1 top-1 right-3 rounded-md">
                              <FontAwesomeIcon
                                icon={faCheck}
                                style={{ color: "lightGreen" }}
                              />
                            </div>
                          ) : (
                            <button
                              onClick={() => copyToClipboard(text, ind, index)}
                              className="absolute p-1 top-1 right-3 rounded-md"
                            >
                              <FontAwesomeIcon
                                icon={faCopy}
                                style={{ color: "white" }}
                              />
                            </button>
                          )}
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}
      {showBot && done && userData.content && (
        <div className="p-8 w-full grid grid-cols-10">
          <div
            className="mr-10 col-span-1"
            style={{
              minWidth: "70px",
              maxWith: "70px",
              width: "70px",
              height: "70px",
            }}
          >
            <img src="/user.png" alt="user" />
          </div>
          <div className="col-span-9">
            <pre className="custom-pre">
              <p>{userData.content}</p>
            </pre>
          </div>
        </div>
      )}
      {done && showBot && (
        <div className="shadow-lg border rounded-lg p-8 w-full grid grid-cols-10 ">
          <div
            className="mr-10 col-span-1"
            style={{
              minWidth: "70px",
              maxWith: "70px",
              width: "70px",
              height: "70px",
            }}
          >
            <img src="/goat.png" alt="goat" />
          </div>
          {!gptData.content ? (
            newMessage
          ) : (
            <div className="col-span-9">
              <Typewriter
                style={{ border: "none" }}
                onInit={(typewriter) => {
                  typewriter
                    .changeDelay(15)
                    .callFunction(() => {
                      document.querySelector(".Typewriter__cursor").remove();
                    })
                    .typeString(content)
                    .callFunction(async () => {
                      const isNew = !title ? true : false;
                      setChats(
                        [
                          { role: userData.role, content: userData.content },
                          { ...gptData.data.res },
                        ],
                        isNew,
                        {
                          chat_id: gptData.data.chat_id,
                          title: gptData.data.title,
                        },
                        false
                      );

                      setWaiting(false);
                      if (!title) {
                        setnewTitle(true);

                        updateTitle(gptData.data.chat_id);
                        chats.map((e, index) => {
                          if (e.chat_id === gptData.data.chat_id) {
                            setCurrentChat(chats[index].conv);
                          }
                        });
                        setTimeout(() => {
                          setDone(false);
                          setShowBot(false);
                          setnewMessage("");
                        }, 0);
                      } else {
                        setDone(false);
                        setShowBot(false);
                        setnewMessage("");
                      }
                    })
                    .start();
                }}
              />
            </div>
          )}
        </div>
      )}
      <div className="mt-10" ref={messagesEndRef}></div>
    </div>
  );
};

export default OpenRes;
