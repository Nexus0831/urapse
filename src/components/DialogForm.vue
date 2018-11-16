<template>
  <div id="dialog-form" @click.self="dialogClose">
    <div class="surface">
      <div class="dialog-form-title">Create Mind Map</div>
      <div class="dialog-form-title error" v-if="!createFields.validate">
        Heyブラザー！TitleとBodyが空だぜ！
      </div>
      <div class="dialog-form-input">
        <MaterialInput idName="create-title" labelText="Title" @change-action="titleChangeAction"/>
      </div>
      <div class="dialog-form-input">
        <MaterialInput idName="create-body" labelText="Body" @change-action="bodyChangeAction"/>
      </div>
      <div class="button-container">
        <Button
          buttonText="CANCEL"
          style="color: #FFF"
          rippleColor="rgba(255, 255, 255, 0.5)"
          hoverColor="rgba(255, 255, 255, 0.08)"
          @click-action="dialogClose"
        />
        <Button
          buttonText="SUBMIT"
          style="color: #e91e63"
          rippleColor="rgba(233, 30, 99, 0.5)"
          hoverColor="rgba(233, 30, 99, 0.2)"
          @click-action="mindMapCreate"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { mapActions, mapState } from 'vuex';
import MaterialInput from '@/components/MaterialInput.vue';
import Button from '@/components/Button.vue';

@Component({
  components: {
    MaterialInput,
    Button
  },
  computed: {
    ...mapState([
      'createFields'
    ]),
  },
  methods: {
    ...mapActions([
      'mindMapCreate'
    ]),
  }
})
export default class DialogForm extends Vue {
  dialogClose() {
    this.$store.commit('SET_IS_DIALOG_OPEN', false);
  }

  titleChangeAction(title: string) {
    this.$store.commit('SET_CREATE_FIELDS_TITLE', title);
  }

  bodyChangeAction(body: string) {
    this.$store.commit('SET_CREATE_FIELDS_BODY', body);
  }
}
</script>

<style lang="stylus" scoped>
#dialog-form
  /*--- style ---*/
  position fixed
  left 0
  top 0
  background-color rgba(0, 0, 0, 0.3)
  width 100%
  height calc(100vh + 20px)
  z-index 100
  /*--- end ---*/

  /*--- layout ---*/
  display flex
  justify-content center
  align-items center
  /*--- end ---*/

  &:hover
    cursor default

  .surface
    /*--- style ---*/
    background-color #424242
    max-height: calc(100% - 96px);
    width 80%
    max-width 600px
    box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2),
      0px 24px 38px 3px rgba(0, 0, 0, 0.14),
      0px 9px 46px 8px rgba(0, 0, 0, 0.12);
    border-radius 4px
    margin 48px
    position relative
    overflow-y auto
    /*--- end --- */

    /*--- layout ---*/
    display flex
    flex-direction column
    /*--- end ---*/

  .dialog-form-title
    /*--- style ---*/
    font-size 1.25rem
    font-weight 500
    letter-spacing: 0.0075em;
    line-height 1.6
    margin 0
    padding 24px 24px 20px
    text-align center
    /*--- end ---*/

  .error
    /*--- style ---*/
    color #B00020
    /*--- end ---*/

  .dialog-form-input
    /*--- style ---*/
    padding 0 24px 24px
    /*--- end ---*/

  .button-container
    /*--- style ---*/
    margin 8px 12px
    /*--- end ---*/

    /*--- layout ---*/
    display flex
    align-items center
    justify-content flex-end
    /*--- end ---*/

.dialog-enter-active, .dialog-leave-active
  will-change opacity
  transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

.dialog-enter, .dialog-leave-to
  opacity: 0
</style>
