<template>
  <div id="icon">
    <div
      class="icon-graphy"
      @click.stop="(event) => rippleEvent(event, rippleColor)"
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
    rippleEvent: (event, rippleColor) => {
      rippleEffect(event, rippleColor);
    }
  },
})
export default class MaterialIcon extends Vue {
  @Prop() private icon!: string;
  @Prop() private rippleColor!: string;
  // @Prop() private bgColor!: string;
  //
  // styles(): object {
  //   return { bgColor: this.bgColor };
  // }
}
</script>

<style scoped lang="stylus">

#icon
  user-select none

.icon-graphy
  /*--- attr ---*/
  /*--- end ---*/

  /*--- style ---*/
  border-radius 50%
  transition all 0.3s
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
    /*background-color bgColor*/
    background-color rgba(255, 255, 255, 0.08)
    cursor pointer
</style>
