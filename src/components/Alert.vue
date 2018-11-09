<template>
  <div id="alert">
    <div class="surface">
      <div class="alert-title">Use Google's location service?</div>
      <div class="alert-body">
        Let Google help apps determine location.
        This means sending anonymous location data to Google, even when no apps are running.
      </div>
      <div class="button-container">
        <Button
          buttonText="DELETE"
          style="color: #B00020"
          rippleColor="rgba(176, 0, 32, 0.5)"
          hoverColor="rgba(176, 0, 32, 0.2)"
          :clickFunction="alertAction"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Button from '@/components/Button.vue';

@Component({
  components: {
    Button
  },
})
export default class Alert extends Vue {
  @Prop() private alertAction!: Function;
}

</script>

<style lang="stylus" scoped>
#alert
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

.surface
  /*--- style ---*/
  background-color #424242
  height 212px
  max-height: calc(100% - 96px);
  width 80%
  max-width 600px
  box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2),
    0px 24px 38px 3px rgba(0, 0, 0, 0.14),
    0px 9px 46px 8px rgba(0, 0, 0, 0.12);
  border-radius 4px
  transition all .3s
  /*--- end --- */

  /*--- layout ---*/
  display grid
  grid-template-rows 24px 32px 24px 1fr 24px 32px 24px
  grid-template-columns 24px 1fr 24px
  /*--- end ---*/

.alert-title
  /*--- style ---*/
  font-size 1.25rem
  font-weight 500
  letter-spacing: 0.0075em;
  line-height 1.6
  /*--- end ---*/

  /*--- position ---*/
  grid-row 2 / 3
  grid-column 2 / 3
  /*--- end ---*/

.alert-body
  /*--- style ---*/
  color rgba(255, 255, 255, 0.7)
  font-size 1rem
  font-weight 400
  letter-spacing: 0.00938em;
  line-height 1.5
  /*--- end ---*/

  /*--- position ---*/
  grid-row 4 / 5
  grid-column 2 / 3
  /*--- end ---*/

.button-container
  /*--- layout ---*/
  display flex
  align-items center
  flex-direction row-reverse
  /*--- end ---*/

  /*--- position ---*/
  grid-row 6 / 7
  grid-column 2 / 3
  /*--- end ---*/
</style>
