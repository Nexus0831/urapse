<template>
  <div id="home">
    <Card :mindMap="testDate">
    </Card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Card from './Card.vue';

@Component({
  components: {
  Card,
  },
  })
export default class HelloWorld extends Vue {
  // @Prop() private mindMap!: object;
  testDate = {
    key: '12345',
    title: 'Card Title',
    body: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
    nodes: [{}, {}, {}],
  };
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
