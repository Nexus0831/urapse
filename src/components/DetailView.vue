<template>
  <div id="detail">
    <div class="node-container">
      <template v-for="item in nodes">
        <Node
          :key="item.key"
          :node="item"
          @click-action="dialogEditOpen(item.key)"
        />
      </template>
    </div>
    <FAB
      icon="add"
      style="color: #FFF"
      rippleColor="rgba(255, 255, 255, 0.2)"
      hoverColor="#ab003c"
      backgroundColor="#f50057"
      @click-action="dialogOpen"
    />
    <transition name="fade">
      <DialogForm
        v-if="isNodeDialogOpen"
        formTitle="Node"
        validMessage="Heyブラザー！TitleとBodyが空だぜ！"
        :validate="nodeCreateFields.validate"
        :fields="fields"
        @submit-action="submitAction"
        @dialog-close="dialogClose"
      />
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import { mapActions, mapState } from 'vuex';
import { MindMap, IdeaNode } from '@/Interfaces/intarface';
import Node from '@/components/Node.vue';
import FAB from '@/components/FloatingActionButton.vue';
import DialogForm from '@/components/DialogForm.vue';

@Component({
  components: {
    DialogForm,
    Node,
    FAB
  },
  computed: {
    ...mapState([
      'nodes',
      'isNodeDialogOpen',
      'nodeCreateFields'
    ]),
  },
  methods: {
    ...mapActions([
      'nodeCreate'
    ]),
  }
})
export default class DetailView extends Vue {
  fields = [
    {
      label: 'Title',
      value: '',
      changeAction: (title: string) => {
        this.$store.commit('SET_NODE_CREATE_FIELDS_TITLE', title);
      },
    },
    {
      label: 'BackgroundColor',
      value: '',
      changeAction: (backgroundColor: string) => {
        this.$store.commit('SET_NODE_CREATE_FIELDS_BACKGROUND_COLOR', backgroundColor);
      },
    },
    {
      label: 'TextColor',
      value: '',
      changeAction: (textColor: string) => {
        this.$store.commit('SET_NODE_CREATE_FIELDS_TEXT_COLOR', textColor);
      },
    },
    {
      label: 'Link',
      value: '',
      changeAction: (link: string) => {
        this.$store.commit('SET_NODE_CREATE_FIELDS_LINK', link);
      },
    },
  ];

  mounted() {
    this.$store.dispatch('nodeRead', this.$route.params.id).then(() => {
      this.positionSort();
    });
    this.$store.watch(
      state => state.nodes,
      () => {
        this.positionSort();
      },
    );
  }

  // update() {
  //   this.positionSort();
  // }

  positionSort() {
    if (this.$store.state.nodes.length !== 0) {
      const nodes: HTMLCollection = this.$el.getElementsByClassName('node');
      const angle: number = 2 * Math.PI / nodes.length;
      const circleR: number = 100 * 2.5;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      Array.prototype.forEach.call(nodes, (item: HTMLElement, index: number) => {
        const node: HTMLElement = item as HTMLElement;
        const x: number = Math.cos(angle * index) * circleR + (centerX - node.clientWidth / 2);
        const y: number = Math.sin(angle * index) * circleR + (centerY - node.clientHeight / 2);
        node.style.left = `${x}px`;
        node.style.top = `${y}px`;
      });
    }
  }

  submitAction() {
    this.$store.dispatch('nodeSubmit', this.$route.params.id);
  }

  dialogOpen() {
    this.fields.forEach((e) => {
      e.value = '';
    });
    this.$store.commit('SET_IS_NODE_DIALOG_OPEN', true);
  }

  dialogEditOpen(key: string) {
    const node = this.$store.state.nodes.filter((e: IdeaNode) => e.key === key)[0];
    this.fields[0].value = node.title;
    this.fields[1].value = node.backgroundColor;
    this.fields[2].value = node.textColor;
    this.fields[3].value = node.link;
    this.$store.commit('SET_NODE_CREATE_FIELDS_KEY', key);
    this.$store.commit('SET_IS_NODE_DIALOG_OPEN', true);
  }

  dialogClose() {
    this.$store.commit('SET_IS_NODE_DIALOG_OPEN', false);
    this.$store.dispatch('nodeFieldsClear');
  }
}
</script>

<style lang="stylus" scoped>
#detail
  display flex
  justify-content center
  align-items center
  height 100%

  .node-container
    animation rotate 60s linear infinite
    display flex
    justify-content center
    align-items center
    width 100%
    height 100%

@keyframes rotate {
  100% { transform: rotate(360deg); }
}
</style>
