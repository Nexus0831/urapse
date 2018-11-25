<template>
  <div class="detail">
    <DetailView />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DetailView from '@/components/DetailView.vue'; // @ is an alias to /src

@Component({
  components: {
    DetailView,
  },
})
export default class Detail extends Vue {}
</script>
