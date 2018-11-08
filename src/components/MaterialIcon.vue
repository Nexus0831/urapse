<template>
  <div id="icon">
    <i class="material-icons">{{ icon }}</i>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class MaterialIcon extends Vue {
  @Prop() private icon!: string;
}
</script>

<style scoped lang="stylus">

</style>
