import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase/app';
import 'firebase/auth';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    mindMaps: [
      {
        key: '12345',
        title: 'Urapse Mind Map',
        body: 'Lizards \n are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
        nodes: [
          {
            key: 'a',
            title: 'idea 1',
            color: '#2196f3',
            textColor: 'white',
          },
          {
            key: 'b',
            title: 'idea 2',
            color: '#e91e63',
            textColor: 'white',
          },
          {
            key: 'c',
            title: 'idea 3',
            color: '#8bc34a',
            textColor: 'black',
          },
          {
            key: 'd',
            title: 'idea 4',
            color: '#ffeb3b',
            textColor: 'black',
          },
          {
            key: 'e',
            title: 'idea 5',
            color: '#f44336',
            textColor: 'white',
          },
          {
            key: 'f',
            title: 'idea 6',
            color: '#3f51b5',
            textColor: 'white',
          },
        ],
      },
      {
        key: '67890',
        title: 'プロジェクト演習2',
        body: 'Lizards \n are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
        nodes: [
          {
            key: 'g',
            title: 'idea 7',
            color: '#2196f3',
            textColor: 'white',
          },
          {
            key: 'h',
            title: 'idea 8',
            color: '#e91e63',
            textColor: 'white',
          },
          {
            key: 'i',
            title: 'idea 9',
            color: '#8bc34a',
            textColor: 'black',
          },
          {
            key: 'j',
            title: 'idea 10',
            color: '#ffeb3b',
            textColor: 'black',
          },
        ],
      },
    ],
    alertId: '',
    isDialogOpen: false,
    createFields: {
      title: '',
      body: '',
      validate: true
    },
    user: {},
    isSignIn: false,
  },
  mutations: {
    SET_ALERT_ID: (state, key) => {
      state.alertId = key;
    },
    SET_IS_DIALOG_OPEN: (state, isOpen) => {
      state.isDialogOpen = isOpen;
    },
    SET_CREATE_FIELDS_TITLE: (state, title) => {
      state.createFields.title = title;
    },
    SET_CREATE_FIELDS_BODY: (state, body) => {
      state.createFields.body = body;
    },
    SET_CREATE_FIELDS_VALIDATE: (state, validate) => {
      state.createFields.validate = validate;
    },
    SET_USER: (state, user) => {
      state.user = user;
    },
    SET_IS_SIGN_IN: (state, isSignIn) => {
      state.isSignIn = isSignIn;
    },
  },
  getters: {
    getMindMap: (state) => (key: string) => {
      const mindMap = state.mindMaps.filter(mindMap => mindMap.key === key);
      return mindMap[0];
    }
  },
  actions: {
    mindMapCreate: (context) => {
      if (context.state.createFields.title !== '' && context.state.createFields.body !== '') {
        console.log(context.state.createFields.title);
        console.log(context.state.createFields.body);
        context.commit('SET_IS_DIALOG_OPEN', false);
        context.commit('SET_CREATE_FIELDS_TITLE', '');
        context.commit('SET_CREATE_FIELDS_BODY', '');
        context.commit('SET_CREATE_FIELDS_VALIDATE', true);
      } else {
        context.commit('SET_CREATE_FIELDS_VALIDATE', false);
      }
    },
    signIn: (context, router) => {
      firebase.auth().languageCode = 'ja';
      const provider = new firebase.auth.GoogleAuthProvider();

      firebase.auth().signInWithPopup(provider).then((result) => {
        context.commit('SET_USER', result.user);
        router.push('/');
      }).catch((error) => {});
    },
  },
});
