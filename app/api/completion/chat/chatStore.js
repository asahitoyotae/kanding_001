import { create } from "zustand";

const chatStore = create((set, get) => ({
  chats: [],
  setChats: (chats, isNew, data, isFetch) => {
    if (isFetch) {
      return set({ chats: data });
    }
    if (isNew) {
      const newchats = [...get().chats];
      newchats.unshift({
        chat_id: data.chat_id,
        title: data.title,
        conv: chats,
      });
      set({ chats: newchats });
    } else {
      const newChat = [...get().chats];
      let index;
      newChat.map((e, i) => {
        if (e.chat_id === data.chat_id) index = i;
      });
      const newConv = { ...newChat[index] };
      newConv.conv.push(chats[0]);
      newConv.conv.push(chats[1]);

      newChat.splice(index, 1);
      newChat.unshift(newConv);
      set({ chats: newChat });
    }
  },
}));

export default chatStore;
