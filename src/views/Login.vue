<template>
  <div class="login">
    <button @click="signIn">login</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapActions } from 'vuex';

@Component({
  methods: {
    ...mapActions([
      'signIn'
    ]),
  },
})
export default class Login extends Vue {
  // mounted() {
  //   this.$store.dispatch('checkSignIn');
  // }

  // created() {
  //   this.$store.dispatch('checkSignIn');
  //   console.log(`check: ${this.$store.state.isSignIn}`);
  //
  //   if (this.$store.state.isSignIn) {
  //     // すでにログインしていたら
  //     this.$router.push('/');
  //   }
  // }
}
</script>

<style lang="stylus" scoped>
</style>
