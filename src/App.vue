<template>
  <div id="app">
    <div id="nav">
    </div>
    <router-view id="content"/>
  </div>
</template>
<style lang="stylus">
#app
  height 100%
  display grid
  grid-template-rows 60px 1fr
  grid-template-columns 24px 1fr 24px
  font-family: 'Roboto', 'Noto Sans JP', sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  color #FFF

  @media(max-width 619px)
    /*grid-template-rows 50px 1fr*/
    grid-template-columns 16px 1fr 16px
#nav
  position fixed
  z-index 100
  width 100%
  height 60px
  /*position fixed*/
  /* --- 左下のエッジを斜めにする --- */
  background linear-gradient(45deg,  transparent 15px, #FFEA00 15px)
  /*background linear-gradient(45deg,  transparent 10px, rgba(0, 0, 0, 0) 10px)*/
  background-position bottom left, bottom right, top right, top left;
  background-repeat no-repeat;
  /*border-style hidden hidden solid*/
  /* --- end --- */
  /* --- gridのどこに配置するかを設定 --- */
  grid-row 1 / 2
  grid-column 1 / 4
  /* --- end --- */
#content
  grid-row 2 / 3
  grid-column 2/ 3
</style>
