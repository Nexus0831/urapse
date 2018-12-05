<template>
  <button class="fab">
    <i class="material-icon">{{ icon }}</i>
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class FloatingActionButton extends Vue {
  @Prop private icon!: string;
  @Prop() private rippleColor!: string;
  @Prop() private hoverColor!: string;
  @Prop() private backgroundColor!: string;

  mounted() {
    this.$el.style.backgroundColor = this.backgroundColor;
  }

  hoverIn() {
    this.$el.style.backgroundColor = this.hoverColor;
  }

  hoverOut() {
    this.$el.style.backgroundColor = this.backgroundColor;
  }
}
</script>

<style lang="stylus" scoped>
.fab
  /*--- style ---*/
  margin 8px
  width 56px
  height 56px
  padding 0
  font-size 0.875em
  box-sizing border-box
  min-height 36px
  transition background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms
  box-shadow 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 6px 10px 0px rgba(0, 0, 0, 0.14),
    0px 1px 18px 0px rgba(0, 0, 0, 0.12)
  font-weight 500
  line-height 1.5
  border-radius 50%
  letter-spacing 0.02857em
  text-transform uppercase
  /*--- end ---*/
</style>
