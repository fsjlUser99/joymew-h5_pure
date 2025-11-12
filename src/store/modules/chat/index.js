import { getChatMessage } from '@/api/chat/index';
import store from '@/store';
import { formatChatList, formatChat, getCardChat } from './utils';
import { createCardChatTask, canSendCardChat } from './utils/cardChat';

const CARD_CHAT_TIMER = 10; // 消息记录不更新后CARD_CHAT_TIMER秒发送一次卡片消息

const state = {
  chatList: [], // 聊天记录(包括发送礼物记录、聊天记录)
};

const mutations = {
  initChatList: (state, data) => {
    state.chatList = data;
    // 如果可以发卡片消息，则创建个n秒后发送一次卡片消息的任务
    if (canSendCardChat()) {
      createCardChatTask(CARD_CHAT_TIMER);
    }
  },
  addChat: (state, data) => {
    if (state.chatList.length > 30) {
      state.chatList.shift();
    }
    state.chatList.push(
      formatChat({
        chat: data,
        giftListAll: store.state.live.giftListAll,
        sceneType: store.state.live.sceneType,
      }),
    );
    // 如果可以发卡片消息，则创建个n秒后发送一次卡片消息的任务
    if (canSendCardChat()) {
      createCardChatTask(CARD_CHAT_TIMER);
    }
  },
  /**
   * 添加卡片消息
   */
  addCardChat: (state) => {
    const {
      card_json, avatar, emcee_name, rank_city, rank_country, rank_province,
    } = store.state.user.emceeInfo;
    state.chatList.push(
      getCardChat({
        cardJson: card_json,
        avatar,
        name: emcee_name,
        rankCity: rank_city,
        rankCountry: rank_country,
        rankProvince: rank_province,
      }),
    );
  },
};

const actions = {
  async getChatList(ctx) {
    try {
      const res = await getChatMessage();
      // 监听礼物列表获取到后再设置chatList...
      if (store.state.live.giftListAll.length > 0) {
        // 根据giftListAll设置chatList
        ctx.commit(
          'initChatList',
          formatChatList({
            chatList: res.chat_list,
            giftListAll: store.state.live.giftListAll,
            sceneType: store.state.live.sceneType,
          }),
        );
      } else {
        // 监听giftListAll有值后再根据它设置chatList...
        const unsuscribe = store.subscribe((mutation, state) => {
          if (mutation.type === 'live/setGiftList' && state.live.giftListAll.length > 0) {
            ctx.commit(
              'initChatList',
              formatChatList({
                chatList: res.chat_list,
                giftListAll: state.live.giftListAll,
                sceneType: state.live.sceneType,
              }),
            );
          }
          unsuscribe();
        });
      }
    } catch (err) {
      console.log(err);
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
