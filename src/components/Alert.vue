<template>
  <div id="alert">
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import rippleEffect from '@/functions/ripple';

@Component
export default class Alert extends Vue {
}

</script>

<style lang="stylus" scoped>
#alert
  position fixed
  left 0
  top 0
  background-color rgba(0, 0, 0, 0.5)
  width 100%
  height calc(100vh + 20px)
  z-index 100
</style>
