import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    testData: {
      key: '12345',
      title: 'Card Title aaaaaaaaaaaaaaa',
      body: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
      nodes: [{}, {}, {}],
    },
  },
  mutations: {

  },
  actions: {

  },
});
