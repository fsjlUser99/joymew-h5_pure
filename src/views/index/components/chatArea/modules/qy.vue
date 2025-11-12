<template>
  <div class="chatList">
    <vue-scroll
      ref="vueScrollRef"
      :ops="{ bar: { opacity: 0 } }"
    >
      <div
        class="messageItem"
        v-for="item in chatList"
        :id="item.id"
        :key="item.id"
      >
        <cardMsg
          v-if="item.advertiseType === 'hostCard'"
          :message="item"
        />
        <msg
          v-else
          :message="item"
        />
      </div>
    </vue-scroll>
  </div>
</template>

<script>
import store from '@/store/index';
import msg from './components/msg/qy.vue';
import cardMsg from './components/cardMsg/qy.vue';

let timer = null;
export default {
  name: 'QyChat',
  components: {
    msg,
    cardMsg,
  },
  computed: {
    chatList() {
      return store.state.chat.chatList;
    },
  },
  watch: {
    chatList() {
      if (this.chatList.length > 0) {
        this.scrollToBottom(this.chatList[this.chatList.length - 1].id, 0.3);
      }
    },
  },
  created() {
    store.dispatch('chat/getChatList');
  },
  methods: {
    /**
     * 给n秒时间渲染页面，然后滚动到底部
     */
    scrollToBottom(bottomDomId, n) {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        this.$refs.vueScrollRef.scrollIntoView(`#${bottomDomId}`, 1000);
      }, n * 1000);
    },
  },
};
</script>

<style lang="less" scoped>
.chatList {
  position: absolute;
  width: 100%;
  height: 100%;
  padding-left: 18px;
  .messageItem {
    position: relative;
    width: 100%;
    margin: 11px 0;
  }
}
</style>
