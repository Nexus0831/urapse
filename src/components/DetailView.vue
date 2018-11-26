<template>
  <div id="detail">
    <template v-for="(item, index) in ideas">
      <svg width="150" height="150" viewBox="0 0 150 150" :key="index" class="rotate">
        <circle cx="50%" cy="50%" r="50%" cursor="pointer" :fill="item.color"/>
        <text
          x="50%"
          y="50%"
          :fill="item.textColor"
          font-size="28"
          text-anchor="middle"
          dominant-baseline="central"
        >
          {{ item.title }}
        </text>
      </svg>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class DetailView extends Vue {
  ideas = [
    {
      title: 'idea 1',
      color: '#2196f3',
      textColor: 'white',
    },
    {
      title: 'idea 2',
      color: '#e91e63',
      textColor: 'white',
    },
    {
      title: 'idea 3',
      color: '#8bc34a',
      textColor: 'black',
    },
    {
      title: 'idea 4',
      color: '#ffeb3b',
      textColor: 'black',
    },
    {
      title: 'idea 5',
      color: '#f44336',
      textColor: 'white',
    },
    {
      title: 'idea 6',
      color: '#3f51b5',
      textColor: 'white',
    },
  ];

  created() {
    if (!this.$store.state.isSignIn) {
      // すでにログインしていたら
      this.$router.push('/login');
    }
  }

  mounted() {
    const rotates: HTMLCollection = this.$el.getElementsByClassName('rotate');
    const len: number = rotates.length;
    const deg: number = 360.0 / len;
    const red: number = (deg * Math.PI / 180.0);
    const circleR: number = 100 * 2.5;

    Array.prototype.forEach.call(rotates, (item: HTMLElement, index: number) => {
      const rotate: HTMLElement = item as HTMLElement;
      const x: number = Math.cos(red * index) * circleR + circleR;
      const y: number = Math.sin(red * index) * circleR + circleR;
      rotate.style.left = `${x}`;
      rotate.style.top = `${y}`;
      console.log(`x: ${x}, y: ${y}`);
    });
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
