<template>
  <div id="material-field">
    <label
      :for="idName"
      class="material-input-label"
      :class="{focus: isFocus, float: isFloat}"
    >
      {{ labelText }}
    </label>
    <div class="material-field-input" :class="{focus: isFocus}">
      <input
        :id="idName"
        class="material-input"
        type="text"
        v-model="valueText"
        @change="$emit('change-action', valueText)"
        @focus="inputFocus"
        @blur="inputBlur"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class MaterialInput extends Vue {
  @Prop() private idName!: string;
  @Prop() private labelText!: string;

  isFocus: boolean = false;
  isFloat: boolean = false;
  valueText: string = '';

  inputFocus() {
    if (this.valueText === '') {
      this.isFocus = true;
      this.isFloat = true;
    } else {
      this.isFocus = true;
    }
  }

  inputBlur() {
    if (this.valueText === '') {
      this.isFocus = false;
      this.isFloat = false;
    } else {
      this.isFocus = false;
    }
  }
}
</script>

<style lang="stylus" scoped>
#material-field
  width 100%
  border 0
  display inline-flex
  padding 0
  position relative
  min-width 0
  flex-direction column
  vertical-align top

  .material-input-label
    transition color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,
      transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms
    top 0
    left 0
    position absolute
    transform translate(0, 24px) scale(1)
    transform-origin top left
    color rgba(255, 255, 255, 0.7)
    padding 0
    font-size 1rem
    line-height 1

  .material-input-label.focus
    color #e91e63

  .material-input-label.float
    transform translate(0, 1.5px) scale(0.75)
    transform-origin top left

  label + .material-field-input
    margin-top 16px

  .material-field-input
    position relative
    color #fff
    cursor text
    display inline-flex
    font-size 1rem
    line-height 1.1875em
    align-items center

    &:before
      left 0
      right 0
      bottom 0
      content "\00a0"
      position absolute
      transition border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms
      border-bottom 1px solid rgba(255, 255, 255, 0.7)
      pointer-events none

    &:after
      left 0
      right 0
      bottom 0
      content ""
      position absolute
      transform scaleX(0)
      transition transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms
      border-bottom 2px solid #e91e63
      pointer-events none

  .material-field-input.focus
    &:after
      transform scaleX(1)

  .material-input
    outline none
    font inherit
    color currentColor
    width 100%
    border 0
    margin 0
    padding 6px 0 7px
    display block
    min-width 0
    box-sizing content-box
    background none
    -webkit-tap-highlight-color transparent
</style>
