<template>
  <div id="home">
    <div id="cards">
      <template v-for="item in testData">
        <Card :id="item.key" :key="item.key" :title="item.title" :body="item.body" />
      </template>
    </div>
    <!--<i class="material-icons" style="color: #FB8C00">add</i>-->
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
  grid-template-rows 40px 1fr
  grid-template-columns 1fr

#cards
  display grid
  grid-row 2 / 3
  grid-column 1 / 2

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
