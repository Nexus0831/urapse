<template>
  <div id="login">
    <!-- <button @click="signIn">login</button> -->
    <ContainedButton
      buttonText="LOGIN is GOOGLE"
      style="color: #FFF"
      rippleColor="rgba(255, 255, 255, 0.5)"
      hoverColor="#a31545"
      backgroundColor="#e91e63"
      @click-action="test"
    />
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { mapActions } from 'vuex';
  import ContainedButton from '@/components/ContainedButton.vue';

  @Component({
    components: {
      ContainedButton
    },
    methods: {
      ...mapActions([
        'signIn'
      ]),
      test: () => {
        console.log('login');
      }
    },
  })
  export default class Login extends Vue {
    // mounted() {
    //   this.$store.dispatch('checkSignIn');
    // }

    // 開発のため言ったんコメントアウト
    // created() {
    //   if (this.$store.state.isSignIn) {
    //     // すでにログインしていたら
    //     this.$router.push('/');
    //   }
    // }
  }
</script>

<style lang="stylus" scoped>
  #login
    /*--- style ---*/
    height 100%
    width 100%
    /*--- end ---*/
    /*--- layout ---*/
    display flex
    justify-content center
    align-items center
    flex-direction column
  /*--- end ---*/
</style>
