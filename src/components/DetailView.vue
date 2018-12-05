<template>
  <div id="detail">
    <template v-if="typeof mindMap !== 'undefined'">
      <template v-for="item in mindMap.nodes">
        <Node :key="item.key" :node="item"/>
      </template>
      <FAB
        buttonText="LOGIN is GOOGLE"
        style="color: #FFF"
        rippleColor="rgba(255, 255, 255, 0.5)"
        hoverColor="#a31545"
        backgroundColor="#e91e63"
        @click.capture="() => console.log('test')"
      />
    </template>
    <h1 v-else>マインドマップが見つかりません</h1>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Node from '@/components/Node.vue';
import FAB from '@/components/FloatingActionButton.vue';

@Component({
  components: {
    Node,
    FAB
  }
})
export default class DetailView extends Vue {
  mindMap: object = {};

  created() {
    this.mindMap = this.$store.getters.getMindMap(this.$route.params.id);
  }

  mounted() {
    if (typeof this.mindMap !== 'undefined') {
      const nodes: HTMLCollection = this.$el.getElementsByClassName('node');
      const len: number = nodes.length;
      const deg: number = 360.0 / len;
      const red: number = (deg * Math.PI / 180.0);
      const circleR: number = 100 * 2.5;

      Array.prototype.forEach.call(nodes, (item: HTMLElement, index: number) => {
        const rotate: HTMLElement = item as HTMLElement;
        const x: number = Math.cos(red * index) * circleR + circleR;
        const y: number = Math.sin(red * index) * circleR + circleR;
        rotate.style.left = `${x}`;
        rotate.style.top = `${y}`;
      });
    }
  }
}
</script>

<style lang="stylus" scoped>
#detail
  display flex
  justify-content center
  align-items center
  height 100%

  .rotate
    /*animation rotate-anime 10s linear infinite*/
    position absolute
    filter drop-shadow(0px 3px 5px rgba(0, 0, 0, 0.2)) drop-shadow(0px 6px 10px rgba(0, 0, 0, 0.14)) drop-shadow(0px 1px 18px rgba(0, 0, 0, 0.12))

  @keyframes rotate-anime {
    0% {
      transform: rotate(0)
    }
    100% {
      transform: rotate(360deg)
    }
  }
</style>
