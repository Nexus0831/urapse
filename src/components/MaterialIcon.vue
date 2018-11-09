<template>
  <div id="icon">
    <div
      class="icon-graphy"
      @click.stop="(event) => clickAction(event, rippleColor, action)"
      @mouseover="hoverIn"
      @mouseout="hoverOut"
    >
      <i class="material-icons">{{ icon }}</i>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import rippleEffect from '@/functions/ripple';

@Component({
  methods: {
    clickAction(event, rippleColor, action) {
      rippleEffect(event, rippleColor);
      action();
    },
  },
})
export default class MaterialIcon extends Vue {
  @Prop() private icon!: string;
  @Prop() private rippleColor!: string;
  @Prop() private hoverColor!: string;

  action() {
    this.$emit('click-action');
  }

  hoverIn() {
    this.$el.style.backgroundColor = this.hoverColor;
  }

  hoverOut() {
    this.$el.style.backgroundColor = 'transparent';
  }
}
</script>

<style scoped lang="stylus">

#icon
  user-select none
  border-radius 50%
  transition all 0.3s

.icon-graphy
  /*--- attr ---*/
  /*--- end ---*/

  /*--- style ---*/
  border-radius 50%
  height 40px
  width 40px
  overflow hidden
  position relative
  /*--- end ---*/

  /*--- layout ---*/
  display flex
  justify-content center
  align-items center
  /*--- end ---*/

  &:hover
    cursor pointer
</style>
