<template>
  <div class="login">
    <button @click="googleLogin">login</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Component({
  methods: {
    googleLogin: () => {
      firebase.auth().languageCode = 'ja';
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then((result) => {
        console.log('ok');
        console.log(result.user);
      }).catch((error) => {
        console.log('error');
        console.log(error)
      })
    }
  }
})
export default class Login extends Vue {}
</script>

<style lang="stylus" scoped>
</style>
