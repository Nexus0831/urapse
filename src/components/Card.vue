<template>
  <div class="card" @click="rippleEvent" @dblclick="clickAction">
    <div v-if="!isTitleEdit" class="card-title" @click="toggleTitleEdit">
      {{ title }}
    </div>
    <input
      class="title-input"
      v-if="isTitleEdit"
      type="text"
      @blur="toggleTitleEdit"
      :value="title"
      v-focus
    />
    <div class="card-body" v-if="!isBodyEdit" @click="toggleBodyEdit">{{ body }}</div>
    <textarea
      class="body-input"
      v-if="isBodyEdit"
      @blur="toggleBodyEdit"
      :value="body"
      v-focus
    >
    </textarea>
    <div class="icon-container">
      <MaterialIcon
        icon="delete"
        style="color: #B00020"
        rippleColor="rgba(176, 0, 32, 0.5)"
        hoverColor="rgba(176, 0, 32, 0.2)"
        @click-action="alertOpen"
      />
    </div>
    <transition name="alert">
      <Alert
        :title="title"
        v-if="alertId === keyNumber"
        @alert-action="itemDelete"
      />
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mapState } from 'vuex';
import rippleEffect from '@/functions/ripple';
import MaterialIcon from './MaterialIcon.vue';
import Alert from './Alert.vue';

@Component({
  components: {
    MaterialIcon,
    Alert
  },
  directives: {
    focus: {
      inserted: (el) => {
        el.focus()
      }
    }
  },
  computed: {
    ...mapState([
      'alertId'
    ]),
  },
  methods: {
    rippleEvent: (event) => {
      rippleEffect(event, "rgba(32, 32, 32, 0.5)");
    }
  }
})
export default class Card extends Vue {
  @Prop() private title!: string;
  @Prop() private body!: string;
  @Prop() private keyNumber!: string;

  isTitleEdit: boolean = false;
  isBodyEdit: boolean = false;

  clickAction() {
    this.$router.push({ path: `/detail/${this.keyNumber}` });
  }

  alertOpen() {
    this.$store.commit('SET_ALERT_ID', this.keyNumber);
  }

  toggleTitleEdit() {
    this.isTitleEdit = !this.isTitleEdit;
  }

  toggleBodyEdit() {
    this.isBodyEdit = !this.isBodyEdit;
  }

  itemDelete() {
    this.$store.dispatch('mindMapDelete', this.keyNumber).then();
  }
}
</script>

<style lang="stylus">
  .card
    /*--- style ---*/
    background-color #424242
    height 180px
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
      0px 1px 1px 0px rgba(0, 0, 0, 0.14),
      0px 2px 1px -1px rgba(0, 0, 0, 0.12)
    border-radius 4px
    transition all .3s
    overflow hidden
    position relative
    /*--- end --- */

    /*--- layout ---*/
    display grid
    grid-template-rows 16px 32px 8px 1fr 12px 32px 8px
    grid-template-columns 16px 1fr 16px
    /*position absolute*/
    /*--- end ---*/

    &:hover
      background-color #3b3b3b
      cursor pointer


  .card-title
    /*--- style ---*/
    font-size 24px
    font-weight 400
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
    user-select none
    z-index 10
    /*--- end ---*/

    /*--- position ---*/
    grid-row 2 / 3
    grid-column 2 / 3
    /*--- end ---*/

    /*--- layout ---*/
    /*display flex*/
    /*align-items center*/
    padding-top 3px
    /*--- end ---*/

  .card-body
    /*--- style ---*/
    font-size 16px
    font-weight 400
    overflow hidden
    text-overflow ellipsis
    user-select none
    white-space pre-wrap
    z-index 10
    /*--- end ---*/

    /*--- position ---*/
    grid-row 4 / 5
    grid-column 2 / 3
    /*--- end ---*/

  .title-input
    /*--- style ---*/
    background-color transparent
    color white
    font-size 24px
    font-weight 400
    outline none
    box-shadow none !important
    border none
    z-index 10
    /*--- end ---*/

    /*--- position ---*/
    grid-row 2 / 3
    grid-column 2 / 3
    /*--- end ---*/

  .body-input
    /*--- style ---*/
    background-color transparent
    color white
    font-size 16px
    font-weight 400
    outline none
    box-shadow none !important
    border none
    resize none
    z-index 10
    /*--- end ---*/

    /*--- position ---*/
    grid-row 4 / 5
    grid-column 2 / 3
    /*--- end ---*/

  .icon-container
    /*--- style ---*/
    display flex
    align-items center
    flex-direction row-reverse
    /*--- end ---*/

    /*--- position ---*/
    grid-row 6 / 7
    grid-column 2 / 3
    /*--- end ---*/
</style>
