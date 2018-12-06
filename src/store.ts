import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    mindMaps: [],
    nodes: [],
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
      key: '',
      title: '',
      backgroundColor: '',
      textColor: '',
      link: '',
      validate: true
    },
    user: {
      uid: ''
    },
    isSignIn: false,
  },
  mutations: {
    SET_MINDMAPS: (state, mindMaps) => {
      state.mindMaps = mindMaps;
    },
    SET_NODES: (state, nodes) => {
      state.nodes = nodes;
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
    SET_NODE_CREATE_FIELDS_KEY: (state, key) => {
      state.nodeCreateFields.key = key;
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
      const uid: string = context.state.user.uid;
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
        const uid: string = context.state.user.uid;
        const data: object = {
          title: context.state.mapCreateFields.title,
          body: context.state.mapCreateFields.body,
        };

        firebase.database().ref(`/users/${uid}/mindMap`).push().update(data).then(() => {
          context.commit('SET_IS_DIALOG_OPEN', false);
          context.dispatch('mindMapFieldsClear').then();
          context.dispatch('mindMapRead').then();
        });
      } else {
        context.commit('SET_MAP_CREATE_FIELDS_VALIDATE', false);
      }
    },
    mindMapUpdate: (context, key) => {
      const uid: string = context.state.user.uid;
      firebase.database().ref(`/users/${uid}/mindMap/${key}`).update({
        title: context.state.mapCreateFields.title,
        body: context.state.mapCreateFields.body,
      }).then(() => {
        context.commit('SET_IS_DIALOG_OPEN', false);
        context.dispatch('mindMapFieldsClear');
        context.dispatch('mindMapRead').then();
      });
    },
    mindMapSubmit: (context) => {
      const key: string = context.state.mapCreateFields.key;

      if (key === '') {
        context.dispatch('mindMapCreate');
      } else {
        context.dispatch('mindMapUpdate', key);
      }
    },
    mindMapDelete: (context, key) => {
      const uid: string = context.state.user.uid;
      firebase.database().ref(`/users/${uid}/mindMap/${key}`).remove().then(() => {
        context.dispatch('mindMapRead').then();
      });
    },
    mindMapFieldsClear: (context) => {
      context.commit('SET_MAP_CREATE_FIELDS_KEY', '');
      context.commit('SET_MAP_CREATE_FIELDS_TITLE', '');
      context.commit('SET_MAP_CREATE_FIELDS_BODY', '');
      context.commit('SET_MAP_CREATE_FIELDS_VALIDATE', true);
    },
    nodeRead: (context, key) => {
      const uid: string = context.state.user.uid;
      return firebase.database().ref(`/users/${uid}/mindMap/${key}/nodes`).once('value').then((snapshot) => {
        let nodes: Array<object> = [];

        snapshot.forEach((item) => {
          nodes.push(Object.assign({key: item.key}, item.val()));
        });

        context.commit('SET_NODES', nodes);
      }).catch(() => {
        context.commit('SET_NODES', []);
      });
    },
    nodeCreate: (context, key) => {
      if (
        context.state.nodeCreateFields.title !== ''
        &&
        context.state.nodeCreateFields.backgroundColor !== ''
        &&
        context.state.nodeCreateFields.textColor !== ''
      ) {
        const uid: string = context.state.user.uid;
        const data: object = {
          title: context.state.nodeCreateFields.title,
          backgroundColor: context.state.nodeCreateFields.backgroundColor,
          textColor: context.state.nodeCreateFields.textColor,
          link: context.state.nodeCreateFields.link,
        };

        firebase.database().ref(`/users/${uid}/mindMap/${key}/nodes`).push().update(data).then(() => {
          context.commit('SET_IS_NODE_DIALOG_OPEN', false);
          context.dispatch('nodeFieldsClear');
          context.dispatch('nodeRead', key);
        })
      } else {
        context.commit('SET_NODE_CREATE_FIELDS_VALIDATE', false);
      }
    },
    nodeUpdate: (context, mindMapKey) => {
      const uid: string = context.state.user.uid;

      firebase.database().ref(`/users/${uid}/mindMap/${mindMapKey}/nodes/${context.state.nodeCreateFields.key}`).update({
        title: context.state.nodeCreateFields.title,
        backgroundColor: context.state.nodeCreateFields.backgroundColor,
        textColor: context.state.nodeCreateFields.textColor,
        link: context.state.nodeCreateFields.link,
      }).then(() => {
        context.commit('SET_IS_NODE_DIALOG_OPEN', false);
        context.dispatch('nodeFieldsClear').then();
        context.dispatch('nodeRead', mindMapKey).then();
      });
    },
    nodeSubmit: (context, mindMapKey) => {
      const key: string = context.state.nodeCreateFields.key;

      if (key === '') {
        context.dispatch('nodeCreate', mindMapKey);
      } else {
        context.dispatch('nodeUpdate', mindMapKey);
      }
    },
    nodeFieldsClear: (context) => {
      context.commit('SET_NODE_CREATE_FIELDS_KEY', '');
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
