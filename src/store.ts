import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase/app';
import 'firebase/auth';

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
    signIn: (context) => {
      firebase.auth().languageCode = 'ja';
      const provider = new firebase.auth.GoogleAuthProvider();

      firebase.auth().signInWithPopup(provider).then((result) => {
        console.log(`user: ${result.user}`);
        context.commit('SET_USER', result.user);
      }).catch((error) => {
        console.log(error);
      })
    },
    checkSignIn: (context) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          console.log('no login');
          context.commit('SET_IS_SIGN_IN', false);
        } else {
          console.log(`login: ${user.displayName}`);
          context.commit('SET_USER', user);
          context.commit('SET_IS_SIGN_IN', true);
        }
      });
    }
  },
});
