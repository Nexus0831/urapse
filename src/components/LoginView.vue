<template>
  <div id="login">
    <ContainedButton
      buttonText="LOGIN is GOOGLE"
      style="color: #FFF"
      rippleColor="rgba(255, 255, 255, 0.5)"
      hoverColor="#a31545"
      backgroundColor="#e91e63"
      @click-action="signInAction"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ContainedButton from '@/components/ContainedButton.vue';

@Component({
  components: {
    ContainedButton
  },
})
export default class Login extends Vue {
  signInAction() {
    this.$store.dispatch('signIn', this.$router).then();
  }
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
