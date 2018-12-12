<template>
  <!--<svg-->
    <!--width="150"-->
    <!--height="150"-->
    <!--viewBox="0 0 150 150"-->
    <!--class="node"-->
    <!--@click="$emit('click-action')"-->
  <!--&gt;-->
    <!--<circle cx="50%" cy="50%" r="50%" cursor="pointer" :fill="node.backgroundColor"/>-->
    <!--<text-->
      <!--x="50%"-->
      <!--y="50%"-->
      <!--:fill="node.textColor"-->
      <!--font-size="28"-->
      <!--text-anchor="middle"-->
      <!--dominant-baseline="central"-->
    <!--&gt;-->
      <!--{{ node.title }}-->
    <!--</text>-->
  <!--</svg>-->
  <div
    class="node"
    @click="$emit('click-action')"
  >
    <div class="node-box" :style="boxStyle"></div>
    <div class="node-text" :style="textStyle">
      {{ node.title }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IdeaNode } from '../Interfaces/intarface';

@Component
export default class Node extends Vue {
  @Prop() private node!: IdeaNode;

  boxStyle = {
    backgroundColor: this.node.backgroundColor,
  };

  textStyle = {
    color: this.node.textColor,
  }
}
</script>

<style lang="stylus" scoped>
.node
  /*animation rotate-anime 10s linear infinite*/
  /*--- layout ---*/
  display flex
  justify-content center
  align-items center
  /*--- end ---*/
  position absolute

  &:hover
    cursor pointer

  .node-box
    border-radius 50%
    width 20px
    height 20px
    box-shadow 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 6px 10px 0px rgba(0, 0, 0, 0.14),
    0px 1px 18px 0px rgba(0, 0, 0, 0.12)

  .node-text
    font-size 18px
    font-weight 400
    padding-left 10px

@keyframes rotate-anime {
  0% {
    transform: rotate(0)
  }
  100% {
    transform: rotate(360deg)
  }
}
</style>
