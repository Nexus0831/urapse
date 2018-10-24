<template>
  <div class="card">
  </div>
</template>

<script>
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Card extends Vue {
}
</script>

<style scoped lang="stylus">
  .card
    /*--- style ---*/
    background-color #424242
    height 210px
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
      0px 1px 1px 0px rgba(0, 0, 0, 0.14),
      0px 2px 1px -1px rgba(0, 0, 0, 0.12)
    border-radius 4px
    /*--- end --- */

    /*--- layout ---*/
    display grid
    grid-template-rows 12px 32px 8px 1fr 8px 32px 12px
    grid-template-columns 16px 1fr 16px
    /*--- end ---*/
</style>
