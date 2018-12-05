<template>
  <svg
    width="150"
    height="150"
    viewBox="0 0 150 150"
    class="node"
    @click="$emit('click-action')"
  >
    <circle cx="50%" cy="50%" r="50%" cursor="pointer" :fill="node.backgroundColor"/>
    <text
      x="50%"
      y="50%"
      :fill="node.textColor"
      font-size="28"
      text-anchor="middle"
      dominant-baseline="central"
    >
      {{ node.title }}
    </text>
  </svg>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IdeaNode } from '../Interfaces/intarface';

@Component
export default class Node extends Vue {
  @Prop() private node!: IdeaNode;
}
</script>

<style lang="stylus" scoped>
.node
  /*animation rotate-anime 10s linear infinite*/
  position absolute
  filter drop-shadow(0px 3px 5px rgba(0, 0, 0, 0.2)) drop-shadow(0px 6px 10px rgba(0, 0, 0, 0.14)) drop-shadow(0px 1px 18px rgba(0, 0, 0, 0.12))

  @keyframes rotate-anime {
    0% {
      transform: rotate(0)
    }
    100% {
      transform: rotate(360deg)
    }
  }
</style>
