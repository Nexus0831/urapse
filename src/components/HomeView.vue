<template>
  <div id="home">
    <Card :id="testData.key" :title="testData.title" :body="testData.body" />
    <Card :id="testData.key" :title="testData.title" :body="testData.body" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mapState } from 'vuex';
import Card from './Card.vue';

@Component({
  components: {
  Card,
  },
  computed: {
  ...mapState([
    'testData'
    ]),
  }
  })
export default class HomeView extends Vue {
  // @Prop() private mindMap!: object;

  // mounted() {
  //   console.log(this.$store.state.title);
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
#home
  display grid

  @media (max-width 619px)
    grid-template-columns: 1fr;
    grid-row-gap: 20px;

  @media (min-width 619px)
    grid-template-columns: 49% 49%;
    grid-row-gap: 16px;
    grid-column-gap: 2%;

  @media (min-width 1024px)
    grid-template-columns: 32% 32% 32%;
    grid-row-gap: 20px;
    grid-column-gap: 2%;
</style>
