<template>
  <div id="app">
    <HeaderNav class="header-nav"/>
    <router-view class="content"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import HeaderNav from '@/components/HeaderNav.vue';

@Component({
  components: {
    HeaderNav
  },
})
export default class App extends Vue {
  @Watch('$route')
  onRouteChange(to: object, from: object) {
    this.$store.dispatch('checkSignIn');
  }

  // 再読み込み時にも実行する為
  created() {
    this.$store.dispatch('checkSignIn');
  }
}
</script>

<style lang="stylus">
#app
  height 100%
  display grid
  grid-template-rows 50px 20px 1fr
  grid-template-columns 24px 1fr 24px
  font-family: 'Roboto', 'Noto Sans JP', sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  color #FFF

  @media(max-width 619px)
    /*grid-template-rows 50px 1fr*/
    grid-template-columns 16px 1fr 16px

  .header-nav
    /* --- position --- */
    grid-row 1 / 2
    grid-column 1 / 4
    /* --- end --- */

  .content
    grid-row 3 / 4
    grid-column 2/ 3

.ripple
  display block
  position absolute
  border-radius 50%
  transform scale(0)
  z-index 1
  animation ripple 0.4s linear

@keyframes ripple {
  to {
    opacity 0
    transform scale(2.5)
  }
}
</style>
