import axios from "axios";

export const generateChatResponse = async (prompt, model, chatId, tokens) => {
  const url = "http://localhost:8000/api/chat/completion";

  const header = {
    "auth-token": tokens.access,
  };
  const body = {
    model: model,
    messages: prompt,
    chatId: chatId,
  };
  try {
    const response = await axios.post(url, body, { headers: header });
    const data = response.data;
    return data;
  } catch (error) {
    return {
      res: {
        role: "assistant",
        content: "Network Error please try again later",
      },
      chat_id:
        chatId ||
        `Network_Error-${Math.random() * 100}-${Math.random() * 1000}`,
      title:
        prompt[1].content.slice(0, 20) +
        (prompt[1].content.length > 20 ? "..." : ""),
    };
  }
};

export const deleteAllChat = async (access) => {
  const url = "http://localhost:8000/api/chat/delete";
  const header = { "auth-token": access };

  try {
    const response = await axios.post(url, {}, { headers: header });
    const data = response.data;
    return data;
  } catch (error) {
    return { error: error, success: false };
  }
};

export const deleteSingleChat = async (access, chat_id) => {
  const url = "http://localhost:8000/api/chat/single-delete";
  const header = {
    "auth-token": access,
  };
  const body = {
    chat_id: chat_id,
  };
  try {
    const res = await axios.post(url, body, { headers: header });
    const data = res.data;
    return data;
  } catch (error) {
    console.log(error);
    return { success: false, error: error };
  }
};
