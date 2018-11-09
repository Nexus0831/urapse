<template>
  <button class="text-button"></button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import rippleEffect from '@/functions/ripple';

@Component
export default class Button extends Vue {
  @Prop private text!: string;
}

</script>

<style lang="stylus" scoped>

</style>
