<template>
  <div id="home">
    <div class="card">
    </div>
    <div class="card">
    </div>
    <div class="card">
    </div>
    <div class="card">
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
  #home
    display grid

    @media (max-width 619px)
      grid-template-columns: 1fr;
      grid-row-gap: 20px;

    @media (min-width 620px)
      grid-template-columns: 49% 49%;
      grid-row-gap: 16px;
      grid-column-gap: 2%;

    @media (min-width 1024px)
      grid-template-columns: 32% 32% 32%;
      grid-row-gap: 20px;
      grid-column-gap: 2%;

  .card
    background-color #303030
    height 210px
</style>
