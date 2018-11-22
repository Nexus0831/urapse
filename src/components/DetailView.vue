<template>
  <div id="detail">
    <svg width="200" height="200" viewBox="0 0 200 200">
      <circle cx="100" cy="100" r="100" cursor="pointer" fill="#2196f3"/>
      <text
        x="50%"
        y="50%"
        fill="white"
        font-size="28"
        text-anchor="middle"
        dominant-baseline="central"
      >
        sample
      </text>
    </svg>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class DetailView extends Vue {
}
</script>

<style lang="stylus" scoped>

</style>
