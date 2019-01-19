import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import config from './config/firebase';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import './registerServiceWorker';

Vue.config.productionTip = false;
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.commit('SET_USER', user);
    store.commit('SET_IS_SIGN_IN', true);

    if (router.currentRoute.path === '/login') {
      router.push('/');
    }
  } else {
    store.commit('SET_IS_SIGN_IN', false);
    router.push('/login');
  }
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
