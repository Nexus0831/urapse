<template>
  <div id="home">
    <div class="create-container">
      <div class="create-button">
        <i class="material-icons">add</i>
        Create New MindMap
      </div>
    </div>
    <div id="cards">
      <template v-for="item in testData">
        <Card :id="item.key" :key="item.key" :title="item.title" :body="item.body" />
      </template>
    </div>
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
  grid-template-rows 52px 1fr
  grid-template-columns 1fr

.create-container
  /*--- position ---*/
  grid-row 1 / 2
  grid-column 1 / 2
  /*--- end ---*/

  /*--- layout ---*/
  display flex
  justify-content center
  /*--- end ---*/

.create-button
  /*--- style ---*/
  font-size 20px
  font-weight 400
  height 40px
  width 260px
  border-radius 4px
  transition background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms
  text-transform uppercase
  /*--- end ---*/

  /*--- layout ---*/
  display flex
  justify-content center
  align-items center
  /*--- end ---*/

  &:hover
    background-color rgba(255, 255, 255, 0.08)
    cursor pointer

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
