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
            backgroundColor: '#2196f3',
            textColor: 'white',
            link: '',
          },
          {
            key: 'b',
            title: 'idea 2',
            backgroundColor: '#e91e63',
            textColor: 'white',
            link: '',
          },
          {
            key: 'c',
            title: 'idea 3',
            backgroundColor: '#8bc34a',
            textColor: 'black',
            link: '',
          },
          {
            key: 'd',
            title: 'idea 4',
            backgroundColor: '#ffeb3b',
            textColor: 'black',
            link: '',
          },
          {
            key: 'e',
            title: 'idea 5',
            backgroundColor: '#f44336',
            textColor: 'white',
            link: '',
          },
          {
            key: 'f',
            title: 'idea 6',
            backgroundColor: '#3f51b5',
            textColor: 'white',
            link: '',
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
            backgroundColor: '#2196f3',
            textColor: 'white',
            link: '',
          },
          {
            key: 'h',
            title: 'idea 8',
            backgroundColor: '#e91e63',
            textColor: 'white',
            link: '',
          },
          {
            key: 'i',
            title: 'idea 9',
            backgroundColor: '#8bc34a',
            textColor: 'black',
            link: '',
          },
          {
            key: 'j',
            title: 'idea 10',
            backgroundColor: '#ffeb3b',
            textColor: 'black',
            link: '',
          },
        ],
      },
    ],
    alertId: '',
    isDialogOpen: false,
    isNodeDialogOpen: false,
    mapCreateFields: {
      title: '',
      body: '',
      validate: true
    },
    nodeCreateFields: {
      title: '',
      backgroundColor: '',
      textColor: '',
      link: '',
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
    SET_IS_NODE_DIALOG_OPEN: (state, isOpen) => {
      state.isNodeDialogOpen = isOpen;
    },
    SET_MAP_CREATE_FIELDS_TITLE: (state, title) => {
      state.mapCreateFields.title = title;
    },
    SET_MAP_CREATE_FIELDS_BODY: (state, body) => {
      state.mapCreateFields.body = body;
    },
    SET_MAP_CREATE_FIELDS_VALIDATE: (state, validate) => {
      state.mapCreateFields.validate = validate;
    },
    SET_NODE_CREATE_FIELDS_TITLE: (state, title) => {
      state.nodeCreateFields.title = title;
    },
    SET_NODE_CREATE_FIELDS_BACKGROUND_COLOR: (state, backgroundColor) => {
      state.nodeCreateFields.backgroundColor = backgroundColor;
    },
    SET_NODE_CREATE_FIELDS_TEXT_COLOR: (state, textColor) => {
      state.nodeCreateFields.textColor = textColor;
    },
    SET_NODE_CREATE_FIELDS_LINK: (state, link) => {
      state.nodeCreateFields.link = link;
    },
    SET_NODE_CREATE_FIELDS_VALIDATE: (state, validate) => {
      state.nodeCreateFields.link = validate;
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
      if (context.state.mapCreateFields.title !== '' && context.state.mapCreateFields.body !== '') {
        console.log(context.state.mapCreateFields.title);
        console.log(context.state.mapCreateFields.body);
        context.commit('SET_IS_DIALOG_OPEN', false);
        context.commit('SET_MAP_CREATE_FIELDS_TITLE', '');
        context.commit('SET_MAP_CREATE_FIELDS_BODY', '');
        context.commit('SET_MAP_CREATE_FIELDS_VALIDATE', true);
      } else {
        context.commit('SET_MAP_CREATE_FIELDS_VALIDATE', false);
      }
    },
    nodeCreate: (context) => {
      if (
        context.state.nodeCreateFields.title !== ''
        &&
        context.state.nodeCreateFields.backgroundColor !== ''
        &&
        context.state.nodeCreateFields.textColor !== ''
      ) {
        console.log(context.state.nodeCreateFields.title);
        console.log(context.state.nodeCreateFields.backgroundColor);
        console.log(context.state.nodeCreateFields.textColor);
        console.log(context.state.nodeCreateFields.link);
        context.commit('SET_IS_NODE_DIALOG_OPEN', false);
        context.dispatch('nodeFieldsClear');
      } else {
        context.commit('SET_NODE_CREATE_FIELDS_VALIDATE', false);
      }
    },
    nodeFieldsClear: (context) => {
      context.commit('SET_NODE_CREATE_FIELDS_TITLE', '');
      context.commit('SET_NODE_CREATE_FIELDS_BACKGROUND_COLOR', '');
      context.commit('SET_NODE_CREATE_FIELDS_TEXT_COLOR', '');
      context.commit('SET_NODE_CREATE_FIELDS_LINK', '');
      context.commit('SET_NODE_CREATE_FIELDS_VALIDATE', true);
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
