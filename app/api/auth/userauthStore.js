import { create } from "zustand";
import axios from "axios";

const userInfoStore = create((set, get) => ({
  user: null,
  tokens: null,
  setUser: (data) => {
    set({ user: data });
  },
  setAccessKey: (tokens) => {
    set({ tokens: tokens });
  },
  getNewAccessKey: () => {
    const oldtokens = { ...get().tokens };
    const getTime = 4500 * 60;
    const url = "https://kanding-server.onrender.com/api/users/newaccess";
    const interval = setInterval(async () => {
      const getKey = async () => {
        try {
          const res = await axios.post(
            url,
            {},
            { headers: { "auth-refresh": oldtokens.refresh } }
          );
          const data = res.data;
          oldtokens.access = data.access;
          console.log("new access key", get().tokens);
          set({ tokens: oldtokens });
        } catch (error) {
          console.log("error getting access key", error);
          setTimeout(() => {
            console.log("error getting new key trying again");
            getKey();
          }, 3000);
        }
      };
      getKey();
    }, getTime);
  },
}));

export default userInfoStore;
