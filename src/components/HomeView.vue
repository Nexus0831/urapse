<template>
  <div id="home">
    <CreateButton @click-action="openDialog"/>
    <div id="cards">
      <template v-for="item in testData">
        <Card
          :id="item.key"
          :key="item.key"
          :keyNumber="item.key"
          :title="item.title"
          :body="item.body"
        />
      </template>
    </div>
    <transition name="dialog">
      <DialogForm v-if="isDialogOpen"/>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mapState } from 'vuex';
import Card from './Card.vue';
import CreateButton from './CreateButton.vue';
import DialogForm from './DialogForm.vue';

@Component({
  components: {
    Card,
    CreateButton,
    DialogForm
  },
  computed: {
    ...mapState([
      'testData',
      'isDialogOpen'
    ]),
  }
})
export default class HomeView extends Vue {
  openDialog() {
    this.$store.commit('SET_IS_DIALOG_OPEN', true);
  }

  created() {
    // console.log('home created');
    if (!this.$store.state.isSignIn) {
      this.$router.push('/login');
    }
    // console.log('home end');
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
#home
  display grid
  grid-template-rows 52px 1fr
  grid-template-columns 1fr

#cards
  display grid
  grid-row 2 / 3
  grid-column 1 / 2

  @media (max-width 619px)
    grid-template-columns: 1fr;
    grid-row-gap: 20px;

  @media (min-width 619px)
    grid-template-columns: 49% 49%;
    grid-row-gap: 16px;
    grid-column-gap: 2%;

  @media (min-width 1024px)
    grid-template-columns: 32% 32% 32%;
    grid-row-gap: 20px;
    grid-column-gap: 2%;
</style>
