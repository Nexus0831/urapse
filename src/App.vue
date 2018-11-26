<template>
  <div id="app">
    <div id="nav">
      <div>
        <router-link to="/" class="title">Urapse</router-link>
      </div>
    </div>
    <router-view id="content"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

@Component
export default class App extends Vue {
  @Watch('$route')
  onRouteChange(to: object, from: object) {
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
#nav
  /* --- レイアウト --- */
  display flex
  justify-content center
  align-items center
  /* --- end --- */

  position fixed
  z-index 100
  width 100%
  height 50px
  background-color #303030

  /* --- 左下のエッジを斜めにする --- */
  /* background linear-gradient(45deg,  transparent 15px, #424242 15px) */
  /*background linear-gradient(45deg,  transparent 10px, rgba(0, 0, 0, 0) 10px)*/
  /*background-position bottom left, bottom right, top right, top left;*/
  /*background-repeat no-repeat;*/
  /*border-style hidden hidden solid*/
  /* --- end --- */

  /* --- gridのどこに配置するかを設定 --- */
  grid-row 1 / 2
  grid-column 1 / 4
  /* --- end --- */

  /* --- elevation --- */
  box-shadow 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
  0px 4px 5px 0px rgba(0, 0, 0, 0.14),
  0px 1px 10px 0px rgba(0, 0, 0, 0.12)
  /* --- end --- */
#content
  grid-row 3 / 4
  grid-column 2/ 3

.title
  font-size 24px
  font-weight 500
  color white
  text-decoration none

  &:hover
    cursor pointer

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
