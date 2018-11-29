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
    },
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
    getUser: () => {
      return new Promise(((resolve, reject) => {
        firebase.auth().onAuthStateChanged((user) => {
          console.log('get user');
          if (user) {
            resolve(user);
          } else {
            reject(Error('no login'))
          }
        });
      }));
    },
    checkSignIn: async (context) => {
      // let flag = false;
      console.log('checkSignIn start');
      // await firebase.auth().onAuthStateChanged((user) => {
      //   console.log('get user');
      //   if (user) {
      //     context.commit('SET_USER', user);
      //     context.commit('SET_IS_SIGN_IN', true);
      //     // flag = true;
      //     console.log('ok login');
      //   } else {
      //     context.commit('SET_IS_SIGN_IN', false);
      //     // flag = false;
      //     console.log('no login');
      //   }
      // });
      await context.dispatch('getUser').then((user) => {
        context.commit('SET_USER', user);
        context.commit('SET_IS_SIGN_IN', true);
        // flag = true;
        console.log('ok login');
      }).catch(() => {
        context.commit('SET_IS_SIGN_IN', false);
        //     // flag = false;
        console.log('no login');
      });
      console.log('checkSignIn end');

      // return flag;

      // console.log('checkSignIn start');
      // const user = await firebase.auth().currentUser;
      // console.log('get user');
      // if (!user) {
      //   context.commit('SET_IS_SIGN_IN', false);
      //   // flag = false;
      //   console.log('no login');
      // } else {
      //   context.commit('SET_USER', user);
      //   context.commit('SET_IS_SIGN_IN', true);
      //   // flag = true;
      //   console.log('ok login');
      // }
      //
      // console.log('checkSignIn end');

      // return await new Promise((resolve, reject) => {
      //   console.log('checkSignIn start');
      //   const user = firebase.auth().currentUser;
      //   console.log('get user');
      //   if (!user) {
      //     context.commit('SET_IS_SIGN_IN', false);
      //     // flag = false;
      //     console.log('no login');
      //   } else {
      //     context.commit('SET_USER', user);
      //     context.commit('SET_IS_SIGN_IN', true);
      //     // flag = true;
      //     console.log('ok login');
      //   }
      // }).then();
    },
  },
});
