import { create } from "zustand";
import axios from "axios";
const useStore = create((set, get) => ({
  data: [],
  title: null,
  engine: "gpt-3.5-turbo",
  waiting: false,
  animateThinking: false,
  showBot: false,
  content: "asdf asf sa fs fs fsa fs fas fas fas f",
  theme: "light-theme",
  authTokens: null,
  setAutTokens: async (e) => {
    const headers = { "Content-Type": "application/json" };
    const body = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/token/",
        body,
        { headers }
      );
      const data = await response.data;
      return set({ authTokens: data });
    } catch (error) {
      console.log(error);
    }
  },
  setTheme: (text) => {
    set({ theme: text });
  },
  setContent: (content) => {
    set({ content });
  },
  setShowBot: (value) => {
    set({ showBot: value });
  },
  setAnimateThinking: (value) => {
    set({ animateThinking: value });
  },
  setWaiting: (value) => {
    set({ waiting: value });
  },
  updateData: (newData, deleted = false, deleteItem = false) => {
    if (deleted) {
      return set({ data: [] });
    }
    if (deleteItem) {
      localStorage.setItem("dataSavefromKanding", JSON.stringify(newData));
      return set({ data: newData });
    }
    let oldData = get().data;
    oldData.push(newData);
    set({ data: oldData });
    localStorage.setItem("dataSavefromKanding", JSON.stringify(oldData));
  },
  updateTitle: (text) => {
    set({ title: text });
  },
  setEngine: (text) => {
    set({ engine: text });
  },
}));

export default useStore;
