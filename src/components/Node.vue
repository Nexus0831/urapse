<template>
  <div
    class="node run-anime"
    @click="$emit('click-action')"
  >
    <div class="circle" :style="{backgroundColor: node.backgroundColor}"></div>
    <template v-if="node.link === ''">
      <div class="node-text" :style="{color: node.textColor}">
        {{ node.title }}
      </div>
    </template>
    <template v-else>
      <a @click.stop :href="node.link" target="_blank" class="node-text" :style="{color: node.textColor}">
        {{ node.title }}
      </a>
    </template>
  </div>
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
  /*--- layout ---*/
  display flex
  justify-content center
  align-items center
  /*--- end ---*/
  position absolute

  &:hover
    cursor pointer

  .circle
    border-radius 50%
    width 30px
    height 30px
    box-shadow 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 6px 10px 0px rgba(0, 0, 0, 0.14),
    0px 1px 18px 0px rgba(0, 0, 0, 0.12)

  .node-text
    font-size 18px
    font-weight 400
    padding-left 10px

.run-anime
  animation rotate-anime 180s linear infinite

@keyframes rotate-anime {
  100% {
    transform: rotate(-360deg)
  }
}
</style>
