<template>
  <div id="app">
    <div id="nav">
    </div>
    <router-view/>
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
  background-color white
  grid-row 1 / 2
  grid-column 1 / 4
</style>
