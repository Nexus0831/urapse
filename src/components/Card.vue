<template>
  <div class="card">
    <div v-show="!isTitleEdit" class="card-title" @dblclick="titleEdit">{{ title }}</div>
    <input
      class="title-input"
      v-show="isTitleEdit"
      type="text"
      @blur="titleEdit"
      :value="title"
      autofocus
    />
    <div class="card-body" v-show="!isBodyEdit" @dblclick="bodyEdit">{{ body }}</div>
    <textarea
      class="body-input"
      v-show="isBodyEdit"
      @blur="bodyEdit"
      :value="body"
      autofocus
    >
    </textarea>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Card extends Vue {
  @Prop() private title!: string;
  @Prop() private body!: string;

  isTitleEdit: boolean = false;
  isBodyEdit: boolean = false;

  titleEdit() {
    this.isTitleEdit = !this.isTitleEdit;
  }

  bodyEdit() {
    this.isBodyEdit = !this.isBodyEdit;
  }
}
</script>

<style scoped lang="stylus">
  .card
    /*--- style ---*/
    background-color #424242
    height 180px
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
      0px 1px 1px 0px rgba(0, 0, 0, 0.14),
      0px 2px 1px -1px rgba(0, 0, 0, 0.12)
    border-radius 4px
    transition-duration .3s
    /*--- end --- */

    /*--- layout ---*/
    display grid
    grid-template-rows 16px 32px 8px 1fr 8px 32px 12px
    grid-template-columns 16px 1fr 16px
    /*position absolute*/
    /*--- end ---*/

    &:hover
      background-color #3b3b3b
      cursor pointer


  .card-title
    /*--- style ---*/
    font-size 24px
    font-weight 400
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
    user-select none
    /*--- end ---*/

    /*--- position ---*/
    grid-row 2 / 3
    grid-column 2 / 3
    /*--- end ---*/

    /*--- layout ---*/
    /*display flex*/
    /*align-items center*/
    padding-top 3px
    /*--- end ---*/

  .card-body
    /*--- style ---*/
    font-size 16px
    font-weight 400
    overflow hidden
    text-overflow ellipsis
    user-select none
    white-space pre-wrap
    /*--- end ---*/

    /*--- position ---*/
    grid-row 4 / 5
    grid-column 2 / 3
    /*--- end ---*/

  .title-input
    /*--- style ---*/
    background-color transparent
    color white
    font-size 24px
    font-weight 400
    outline none
    box-shadow none !important
    border none
    /*--- end ---*/

    /*--- position ---*/
    grid-row 2 / 3
    grid-column 2 / 3
    /*--- end ---*/

  .body-input
    /*--- style ---*/
    background-color transparent
    color white
    font-size 16px
    font-weight 400
    outline none
    box-shadow none !important
    border none
    resize none
    /*--- end ---*/

    /*--- position ---*/
    grid-row 4 / 5
    grid-column 2 / 3
  /*--- end ---*/
</style>
