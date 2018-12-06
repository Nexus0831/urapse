import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

Vue.use(Vuex);
// const database = firebase.database();

export default new Vuex.Store({
  state: {
    mindMaps: [],
    alertId: '',
    isDialogOpen: false,
    isNodeDialogOpen: false,
    mapCreateFields: {
      key: '',
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
    SET_MINDMAPS: (state, mindMaps) => {
      state.mindMaps = mindMaps;
    },
    SET_ALERT_ID: (state, key) => {
      state.alertId = key;
    },
    SET_IS_DIALOG_OPEN: (state, isOpen) => {
      state.isDialogOpen = isOpen;
    },
    SET_IS_NODE_DIALOG_OPEN: (state, isOpen) => {
      state.isNodeDialogOpen = isOpen;
    },
    SET_MAP_CREATE_FIELDS_KEY: (state, key) => {
      state.mapCreateFields.key = key;
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
    mindMapRead: (context) => {
      const uid = context.state.user.uid;
      return firebase.database().ref(`/users/${uid}/mindMap`).once('value').then((snapshot) => {
        let mindMaps: Array<object> = [];

        snapshot.forEach((item) => {
          mindMaps.push(Object.assign({key: item.key}, item.val()));
        });

        context.commit('SET_MINDMAPS', mindMaps);
      }).catch(() => {
        context.commit('SET_MINDMAPS', []);
      });
    },
    mindMapCreate: (context) => {
      if (context.state.mapCreateFields.title !== '' && context.state.mapCreateFields.body !== '') {
        const uid = context.state.user.uid;
        const data = {
          title: context.state.mapCreateFields.title,
          body: context.state.mapCreateFields.body,
        };

        const database = firebase.database().ref(`/users/${uid}/mindMap`).push();
        database.update(data).then(() => {
          context.commit('SET_IS_DIALOG_OPEN', false);
          context.dispatch('mindMapFieldsClear');
          context.dispatch('mindMapRead').then();
        }) .catch((error) => {
          console.log(error);
        });
      } else {
        context.commit('SET_MAP_CREATE_FIELDS_VALIDATE', false);
      }
    },
    mindMapUpdate: (context, key) => {
      const uid = context.state.user.uid;
      firebase.database().ref(`/users/${uid}/mindMap/${key}`).update({
        title: context.state.mapCreateFields.title,
        body: context.state.mapCreateFields.body
      }).then(() => {
        context.commit('SET_IS_DIALOG_OPEN', false);
        context.dispatch('mindMapFieldsClear');
        context.dispatch('mindMapRead').then();
      }).catch((error) => {
        console.log(error);
      });
    },
    mindMapSubmit: (context) => {
      const key = context.state.mapCreateFields.key;

      if (key === '') {
        context.dispatch('mindMapCreate');
      } else {
        context.dispatch('mindMapUpdate', key);
      }
    },
    mindMapDelete: (context, key) => {
      const uid = context.state.user.uid;
      firebase.database().ref(`/users/${uid}/mindMap/${key}`).remove().then(() => {
        context.dispatch('mindMapRead').then();
      })
    },
    mindMapFieldsClear: (context) => {
      context.commit('SET_MAP_CREATE_FIELDS_KEY', '');
      context.commit('SET_MAP_CREATE_FIELDS_TITLE', '');
      context.commit('SET_MAP_CREATE_FIELDS_BODY', '');
      context.commit('SET_MAP_CREATE_FIELDS_VALIDATE', true);
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
