const transformPayloadAnnouncement = payload=>{
/**
    {
        "id": "c9278997",
        "title": "BODFJK",
        "eventDate": "20/03/2023",
        "eventTime": "03:31",
        "message": "LOL",
        "options": "1",
        "date": "31/03/2023", //"No Date"
        "time": "00:31",
        "recipients": "Everyone"
      }
     */
      let {message:body, title, eventDate,eventTime,isEvent,date:scheduleDate ,group, groupName, convId} = payload
    
      let output ={body,title,eventDate,eventTime,isEvent,scheduleDate, group ,groupName, convId};
      if(scheduleDate=="No Date"){
        delete output.scheduleDate;
      }

      return output;
}

export const Table = {
  namespaced: true,
  state: {
    itemTable: {
      announcements: [
      ],
      reminders: [
      ],
    },
  },
  actions:{
    
    async addAnnouncements(ctx, payload){
      console.log(ctx);
      const finalPl = transformPayloadAnnouncement(payload);
      finalPl.admin = ctx.getters.currentAdminName;
      await ctx.getters.api.post("/announcement", finalPl)
      //ctx.commit("addAnnouncements",payload);

    },

    async removeAnnouncement(ctx, payload) {
      await ctx.getters.api.patch("/announcement", payload)
    },

    async editAnnouncement(ctx, payload) {
      payload.admin = ctx.getters.currentAdminName;
      await ctx.getters.api.patch("/announcement", payload)
    },

    async addReminders({commit}, payload){
      commit("addReminders",payload);
    }
  },
  mutations: {
    clearAnnouncements(state, _){
      console.log(_);
      state.itemTable.announcements = [];
    },
    // mountedAnnouncements(state, payload){
    //   state.itemTable.announcements.push(payload);
    // },
    addAnnouncements(state, payload) {
      console.log(payload);
      
      state.itemTable.announcements.push(payload);
    },
    addReminders(state, payload) {
      state.itemTable.reminders.push(payload);
    },
    updateAnnouncementsItem(state, payload) {
      const { id } = payload;
      const itemToUpdate = state.itemTable.announcements.findIndex((item) => {
        return item.id === id;
      });

      state.itemTable.announcements[itemToUpdate] = payload;
    },
    updateRemindersItem(state, payload) {
      const { id } = payload;
      const itemToUpdate = state.itemTable.reminders.findIndex((item) => {
        return item.id === id;
      });

      state.itemTable.reminders[itemToUpdate] = payload;
    },
    deleteAnnouncementsItem(state, payload) {
      const { id } = payload;
      const tableItem = state.itemTable.announcements.findIndex((item) => {
        return item.id === id;
      });

      state.itemTable.announcements.splice(tableItem, 1);
    },
    deleteRemindersItem(state, payload) {
      const { id } = payload;
      const tableItem = state.itemTable.reminders.findIndex((item) => {
        return item.id === id;
      });

      state.itemTable.reminders.splice(tableItem, 1);
    },
  },
  getters: {
    currentAdminName(state, getters, rootState) {
      return rootState.currentAdmin?.name
    },
    api(state, getters, rootState){
      return rootState.api;
    },
    getAnnouncementData(state) {
      return state.itemTable.announcements;
    },
    getRemindersData(state) {
      return state.itemTable.reminders;
    },
    retrieveAnnouncementsItem: (state) => (id) => {
      return state.itemTable.announcements.find((item) => {
        return item.id === id;
      });
    },
    retrieveRemindersItem: (state) => (id) => {
      return state.itemTable.reminders.find((item) => {
        return item.id === id;
      });
    },
  },
};
