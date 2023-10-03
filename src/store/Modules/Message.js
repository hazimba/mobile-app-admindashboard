import { formatTimeFromDate } from "../../assets/Utilities/helperFunction";
import axios from 'axios';
export const Message = {
  namespaced: true,
  state: {
    contactList: {
      // admin: [
      //   {
      //     id: "1",
      //     name: "Admin 1",
      //     message: [
      //       {
      //         time: "13/12/2022 21:22:33",
      //         message: "Hi will like to know what to bring for the outing",
      //         stateChat: "receiver",
      //       },
      //       {
      //         time: "13/12/2022 21:22:33",
      //         message: "Just the essentials...towels, cloths and etc",
      //         stateChat: "sender",
      //       },
      //       {
      //         time: "9/1/2023 14:00:33",
      //         message: "also extra shoes!!",
      //         stateChat: "sender",
      //       },
      //     ],
      //     countNewMessage: 2,
      //   },
      //   {
      //     id: "2",
      //     name: "Admin 2",
      //     message: [
      //       {
      //         time: "16/12/2022 05:53:40",
      //         message: "Hi will like to know what to bring for the outing",
      //         stateChat: "receiver",
      //       },
      //       {
      //         time: "16/12/2022 05:53:40",
      //         message: "Just the essentials...towels, cloths and etc",
      //         stateChat: "sender",
      //       },
      //       {
      //         time: "16/1/2023 05:53:40",
      //         message: "also extra shoes!!",
      //         stateChat: "sender",
      //       },
      //     ],
      //     countNewMessage: 5,
      //   },
      //   {
      //     id: "3",
      //     name: "Admin 3",
      //     message: [
      //       {
      //         time: "15/12/2022 13:32:34",
      //         message: "Hi will like to know what to bring for the outing",
      //         stateChat: "receiver",
      //       },
      //       {
      //         time: "15/12/2022 13:32:34",
      //         message: "Just the essentials...towels, cloths and etc",
      //         stateChat: "sender",
      //       },
      //       {
      //         time: "7/1/2023 13:32:34",
      //         message: "also extra shoes!!",
      //         stateChat: "sender",
      //       },
      //     ],
      //     countNewMessage: 0,
      //   },
      //   {
      //     id: "4",
      //     name: "Admin 4",
      //     message: [
      //       {
      //         time: "14/12/2022 13:32:34",
      //         message: "Hi will like to know what to bring for the outing",
      //         stateChat: "receiver",
      //       },
      //       {
      //         time: "14/12/2022 13:32:34",
      //         message: "Just the essentials...towels, cloths and etc",
      //         stateChat: "sender",
      //       },
      //       {
      //         time: "14/12/2022 13:32:34",
      //         message: "also extra shoes!!",
      //         stateChat: "sender",
      //       },
      //     ],
      //     countNewMessage: 0,
      //   },
      //   {
      //     id: "5",
      //     name: "Admin 5",
      //     message: [],
      //     countNewMessage: 0,
      //   },
      //   {
      //     id: "6",
      //     name: "Admin 6",
      //     message: [],
      //     countNewMessage: 0,
      //   },
      // ],
      admin: [],
      programmeStaff: [
        {
          id: "1",
          name: "Staff 1",
          message: [
            {
              time: "13/12/2022 21:22:33",
              message: "Hi will like to know what to bring for the outing",
              stateChat: "receiver",
            },
            {
              time: "13/12/2022 21:22:33",
              message: "Just the essentials...towels, cloths and etc",
              stateChat: "sender",
            },
            {
              time: "13/12/2022 21:22:33",
              message: "also extra shoes!!",
              stateChat: "sender",
            },
          ],
          countNewMessage: 2,
        },
        {
          id: "2",
          name: "Staff 2",
          message: [
            {
              time: "16/12/2022 05:53:40",
              message: "Hi will like to know what to bring for the outing",
              stateChat: "receiver",
            },
            {
              time: "16/12/2022 05:53:40",
              message: "Just the essentials...towels, cloths and etc",
              stateChat: "sender",
            },
            {
              time: "16/12/2022 05:53:40",
              message: "also extra shoes!!",
              stateChat: "sender",
            },
          ],
          countNewMessage: 5,
        },
        {
          id: "3",
          name: "Staff 3",
          message: [
            {
              time: "15/12/2022 07:32:34",
              message: "Hi will like to know what to bring for the outing",
              stateChat: "receiver",
            },
            {
              time: "15/12/2022 07:32:34",
              message: "Just the essentials...towels, cloths and etc",
              stateChat: "sender",
            },
            {
              time: "15/12/2022 07:32:34",
              message: "also extra shoes!!",
              stateChat: "sender",
            },
          ],
          countNewMessage: 0,
        },
        {
          id: "4",
          name: "Staff 4",
          message: [],
          countNewMessage: 0,
        },
        {
          id: "5",
          name: "Staff 5",
          message: [],
          countNewMessage: 0,
        },
      ],
    },
  },
  getters: {
    getAdminMessage(state){
      return state.contactList.admin;
    },
    getTotalCountMessage(state) {
      const total = [];
      state.contactList.admin.forEach((item) =>
        total.push(item.countNewMessage)
      );
      state.contactList.programmeStaff.forEach((item) =>
        total.push(item.countNewMessage)
      );

      return total.reduce((totalValue, newValue) => totalValue + newValue);
    },
    getAdminTotalCountMessage(state) {
      return state.contactList.admin
        .filter((item) => item.message.length !== 0)
        .map((item) => {
          const checkedTime = item.message.at(-1).time || "15/12/2022 07:32:34";

          return {
            ...item,
            message: {
              ...item.message.at(-1),
              time: formatTimeFromDate(checkedTime),
            },
          };
        });
    },
    getProgrammeStaffTotalCountMessage(state) {
      return state.contactList.programmeStaff
        .filter((item) => item.message.length !== 0)
        .map((item) => {
          const checkedTime = item.message.at(-1).time || "15/12/2022 07:32:34";

          return {
            ...item,
            message: {
              ...item.message.at(-1),
              time: formatTimeFromDate(checkedTime),
            },
          };
        });
    },
  },
  mutations: {
    setAdminContactList(state, payload) {
      //state.contactList.admin = payload;
      state.contactList.admin.push(payload);
    },
    // pushAdminContactList(state, payload){
    //   state.contactList.admin.push(payload);
    // },
    sendAdminMessage(state, payload) {

      const messageIndex = state.contactList.admin.findIndex((item) => {
        return item.id === payload.id;
      });

      if (messageIndex === -1) {
        return;
      }

      console.log("THIS PAYLOAD", payload)
      state.contactList.admin[messageIndex]?.message?.push(payload.message);
      // make axios call


      // const chat = state.contactList.admin.find((item) => {
      //   return item.id === payload.id;
      // });

      // if (!chat) {
      //   return;
      // }


      //chat.message.push(payload.msg);
    },
    sendProgrammeStaffMessage(state, payload) {
      // make axios call
      const chat = state.contactList.programmeStaff.filter((item) => {
        return item.id === payload.id;
      });

      if (chat.length === 0) {
        return;
      }

      //chat[0].message.push(payload.message);
    },
  },
  actions: {
    async sendAdminMessage(ctx, payload) {
      const pl = {
        chatRoomId: payload.chatRoomId,
        senderId: payload.senderId,
        msg: payload.msg,
        admin: payload.admin
      }
      
      await axios.post("/api/chat", pl);
    }
  },
};
