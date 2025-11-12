import { generateRandomId, getCurrentDate } from '@/utils/index';
import { getRelativeInfo, getGiftInfo } from './func';

/**
 * 格式化辅助方法——名字格式化
 */
const formatName = ({ name, sceneType }) => {
  const cutLen = sceneType === '0' ? 9 : 18;
  return name.length > cutLen ? `${name.slice(0, cutLen)}...` : name;
};

/**
 * 格式化辅助方法——某一条聊天消息格式化
 */
const formatChatItem = ({ chatItem, giftListAll, sceneType }) => {
  const chatMsg = {
    id: generateRandomId(),
    userName: formatName({ name: chatItem.miaoName, sceneType }),
    content: chatItem.miaoContent,
    headImg: chatItem.miaoTxUrl,
    photoUrl: chatItem.miaoTpUrl,
    vipLevel: chatItem.vipLevel,
    currentStatus: chatItem.miaoPosition,
    deskNum: chatItem.miaoTableNumber,
    sendDate: chatItem.sentTime,
    ...getRelativeInfo(chatItem.miaoType), // 获取亲友信息
    ...getGiftInfo({
      giftId: chatItem.miaoLiwuId,
      sceneType,
      giftListAll,
    }), // 获取发礼物信息
  };

  // 红包口袋特殊处理
  if (chatMsg.giftType === 'hbkd') {
    chatMsg.giftName = `${chatMsg.content}元${chatMsg.giftName}`;
    chatMsg.content = '';
  }

  return chatMsg;
};

/**
 * 格式化辅助方法——获取排名信息
 */
const getRankText = ({
  rank, rankCity, rankCountry, rankProvince,
}) => {
  const rankInfo = {
    city: `本市排名：${rankCity}`,
    country: `全国排名：${rankCountry}`,
    province: `本省排名: ${rankProvince}`,
  };
  return rankInfo[rank];
};

let cardChat = null;
/**
 * 获取卡片消息
 * cardJson: 与主持人相关的卡片数组，目前只有一项卡片 type为hostCard
 */
export const getCardChat = ({
  cardJson, avatar, name, rankCity, rankCountry, rankProvince,
}) => {
  if (cardChat) {
    return {
      ...cardChat,
      id: generateRandomId(),
    };
  }
  const {
    type, phone, introduce, rank, cardBg, textColor,
  } = cardJson[0];
  cardChat = {
    id: generateRandomId(),
    advertiseType: type,
    advertiseContent: {
      avatar,
      emcee_name: name,
      rank: getRankText({
        rank,
        rankCity,
        rankCountry,
        rankProvince,
      }),
      phone,
      introduce,
      cardBg,
      textColor,
    },
  };
  return cardChat;
};

/**
 * 格式化ws服务器传过来的聊天消息
 */
export const formatChat = ({ chat, giftListAll, sceneType }) => {
  const chatMsg = {
    id: generateRandomId(),
    userName: formatName({ name: chat.miaoName, sceneType }),
    content: chat.miaoBless,
    headImg: chat.miaoHeadUrl,
    photoUrl: chat.miaoTuUrl,
    vipLevel: chat.miaoVipLevel,
    currentStatus: chat.miaoPosition,
    deskNum: chat.miaoTableNumber,
    sendDate: getCurrentDate(),
    ...getRelativeInfo(chat.miaoType), // 获取亲友信息
    ...getGiftInfo({
      giftId: chat.miaoLwId,
      sceneType,
      giftListAll,
    }), // 获取发礼物信息
  };

  return chatMsg;
};

/**
 * 格式化服务端传过来的聊天记录
 */
export const formatChatList = ({ chatList, giftListAll, sceneType }) => {
  const formattedChatList = [];
  chatList.forEach((chatItem) => {
    // 格式化某一条聊天信息
    formattedChatList.push(
      formatChatItem({
        chatItem,
        giftListAll,
        sceneType,
      }),
    );
  });
  return formattedChatList;
};
