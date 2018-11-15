<template>
  <div id="dialog-form">
    <div class="surface">
      <div class="dialog-form-title">Create Mind Map</div>
      <div class="dialog-form-input">
        <MaterialInput idName="create-title" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import MaterialInput from '@/components/MaterialInput.vue';

@Component({
  components: {
    MaterialInput,
  }
})
export default class DialogForm extends Vue {
}
</script>

<style lang="stylus" scoped>
#dialog-form
  /*--- style ---*/
  position fixed
  left 0
  top 0
  background-color rgba(0, 0, 0, 0.3)
  width 100%
  height calc(100vh + 20px)
  z-index 100
  /*--- end ---*/

  /*--- layout ---*/
  display flex
  justify-content center
  align-items center
  /*--- end ---*/

  &:hover
    cursor default

  .surface
    /*--- style ---*/
    background-color #424242
    max-height: calc(100% - 96px);
    width 80%
    max-width 600px
    box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2),
      0px 24px 38px 3px rgba(0, 0, 0, 0.14),
      0px 9px 46px 8px rgba(0, 0, 0, 0.12);
    border-radius 4px
    margin 48px
    position relative
    overflow-y auto
    /*--- end --- */

    /*--- layout ---*/
    display flex
    flex-direction column
    /*--- end ---*/

  .dialog-form-title
    /*--- style ---*/
    font-size 1.25rem
    font-weight 500
    letter-spacing: 0.0075em;
    line-height 1.6
    margin 0
    padding 24px 24px 20px
    text-align center
    /*--- end ---*/

  .dialog-form-input
    /*--- style ---*/
    padding 0 24px 24px
    /*--- end ---*/
</style>
