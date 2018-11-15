import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    testData: [
      {
        key: '12345',
        title: 'Urapse Mind Map',
        body: 'Lizards \n are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
        nodes: [{}, {}, {}],
      },
      {
        key: '67890',
        title: 'プロジェクト演習2',
        body: 'Lizards \n are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
        nodes: [{}, {}, {}],
      },
    ],
    alertId: '',
    isDialogOpen: false,
    dialogForm: {
      title: '',
      body: '',
    },
  },
  mutations: {
    SET_ALERT_ID: (state, key) => {
      state.alertId = key;
    },
    SET_IS_DIALOG_OPEN: (state, isOpen) => {
      state.isDialogOpen = isOpen;
    },
    SET_DIALOG_FORM_TITLE: (state, title) => {
      state.dialogForm.title = title;
    },
    SET_DIALOG_FORM_BODY: (state, body) => {
      state.dialogForm.body = body;
    },
  },
  actions: {
  },
});
