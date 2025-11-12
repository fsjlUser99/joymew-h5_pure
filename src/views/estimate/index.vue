<template>
  <div class="estimate-wrap">
    <div class="estimate">
      <div class="estimate-card">
        <div class="card-host publicHvCenter">
          <div
            class="host-img"
            :style="{ backgroundImage: 'url(' + hostHeadImg + ')' }"
          />
          <div
            v-tap="{ methods: showQrcode }"
            class="host-name publicHvCenter"
          >
            <div>{{ hostName }}</div>
            <div
              v-if="comment_json"
              class="qrcode"
            />
            <div
              v-if="comment_json"
              class="more"
            />
          </div>
          <div class="host-nobility">
            {{ hostNobility }}
          </div>
          <div class="satisfied-degree publicHvCenter">
            <label>{{ flagName }}</label>
            <div class="star-wrap">
              <rateStar
                :rate="flag"
                :edit="!commented"
                @change="clickstar"
              />
            </div>
          </div>
        </div>
        <div class="border-wrap publicVCenter">
          <div
            v-for="item in 26"
            :key="item"
            class="border"
          />
        </div>
        <div
          v-if="!commented"
          class="card-tags publicVCenter"
        >
          <div class="tags-title publicHvCenter">
            —— 请选择标签 ——
          </div>
          <div class="tags publicVCenter">
            <div
              v-for="(item, index) in tags"
              :key="index"
              v-tap="{ methods: selectTag, p: { pItem: item, pIndex: index } }"
              class="tag publicHvCenter"
              :class="{ selected: item.selected }"
            >
              {{ item.info }}
            </div>
          </div>
          <textarea
            v-model="content"
            placeholder="司仪小哥那么辛苦，鼓励一下吧，给主持人评价还可获得抽奖机会哦~"
            class="textarea"
          />
        </div>
        <div
          v-if="commented"
          class="card-tags publicVCenter"
        >
          <div class="comment-item">
            <div class="my-c">
              <img
                :src="myCommentInfo.avatar"
                class="my-avator"
              />
              <div class="nameAnddate">
                <div class="name">
                  {{ myCommentInfo.nickname }}
                </div>
                <div class="date">
                  {{ myCommentInfo.comment_time }}
                </div>
              </div>
            </div>
            <div class="content">
              {{ myCommentInfo.content }}
            </div>
            <div
              v-if="myCommentInfo.chat_list.length > 0"
              class="sub-comment"
            >
              <div
                v-for="(item, index) in myCommentInfo.chat_list"
                :key="index"
                class="sub-item"
              >
                <div class="sub-name">
                  {{ item.type === '5' ? '我' : item.nickname }}:
                </div>
                <div class="sub-content">
                  {{ item.content }}
                </div>
              </div>
            </div>
            <div class="reply-btn publicVCenter">
              回复TA
            </div>
          </div>
        </div>
        <div class="btn-wrap publicVCenter">
          <div
            v-if="!commented"
            class="submit publicHvCenter"
          >
            打赏
          </div>
          <div
            v-if="!commented"
            v-tap="{ methods: commitComment }"
            class="submit publicHvCenter"
          >
            提交评价
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="step3"
      class="leave-wrap"
    >
      <div class="leave-modal publicHvCenter">
        <div class="emjoy" />
        <div class="leave publicHvCenter">
          <div>司仪小哥哥这么辛苦</div>
          <div>确认要离?</div>
        </div>
        <div class="btn-group publicVCenter">
          <div class="btnItem btn-leave publicHvCenter">
            狠心离开
          </div>
          <div class="btnItem btn-encourage publicHvCenter">
            继续鼓励
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="step1"
      class="feedback-wrap"
    >
      <div class="feedback-modal publicHvCenter">
        <div class="thanks publicHvCenter">
          感谢您的评价!
        </div>
        <div class="tips">
          司仪小哥哥这么辛苦，打赏鼓励一下吗?
        </div>
        <div class="btn-group publicVCenter">
          <div class="btnItem btn-leave publicHvCenter">
            取消
          </div>
          <div class="btnItem btn-encourage publicHvCenter">
            鼓励他
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="pay-wrap" v-if="step2">
        <div class="pay-modal">
            <div class="end-poem">
                <div class="p1">婚礼完美落幕</div>
                <div class="p2">我们始终相信，婚纱是属于每一个女人的童话</div>
                <div class="p3">资深主持人<div class="viewider"></div>已在婚礼一线奋战2012天</div>
            </div>
            <div class="charge-wrap">
                <div v-for="(item, index) in charges" :key="index">
                    <div class="charge" :class="{chargeSelected: item.selected}" v-if="!item.cus">
                        <div class="solid">打赏</div>
                        <div class="money" v-if="!item.cus">
                            <div class="unit">￥</div>
                            {{item.price}}
                        </div>
                    </div>
                    <div class="charge" :class="{chargeSelected: item.selected}" v-if="item.cus">
                        <div class="money cusmoney" :class="{focusmoney: cusfocus}">
                            <div v-if="moneyInput && !cusfocus"> </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="director">司仪小哥哥这么辛苦，打赏鼓励一下吗?</div>
            <div class="charge-btn">确认打赏</div>
        </div>
    </div> -->
    <div
      v-if="qrcode"
      class="qrcode-wrap publicHvCenter"
    >
      <div class="qrcode-modal publicVCenter">
        <img
          :src="comment_json"
          class="qrcode-cus"
        />
        <div class="save">
          如有主持需求，请长按二维码添加主持人微信。
        </div>
      </div>
      <div
        v-tap="{ methods: hideQrcode }"
        class="qrcode-close"
      />
    </div>
  </div>
</template>
<script>
import { getHostInfo, commitComment } from '@/api/comment/index';
import rateStar from './components/rateStar.vue';

const flagName = ['', '非常差', '差', '一般', '满意', '超赞'];
export default {
  name: 'Estimate',
  components: {
    rateStar,
  },
  data() {
    return {
      comment_json: '',
      hostHeadImg: require('../../assets/image/defaultHeadImg.png'),
      hostName: 'huige9999',
      hostNobility: '主持人',
      flagName: '',
      flag: 0,
      commented: false,
      myCommentInfo: null,
      tags: [],
      content: '',
      step1: false,
      step2: false,
      step3: false,
      qrcode: false,
    };
  },
  created() {
    this.getBaseInfo();
  },
  methods: {
    clickstar(e) {
      this.flag = e;
      this.flagName = flagName[e];
    },
    selectTag(e) {
      console.log(e.p);
      if (this.commented) {
        return;
      }
      const i = e.p.pIndex;
      this.tags[i].selected = !this.tags[i].selected;
    },
    getBaseInfo() {
      getHostInfo()
        .then((res) => {
          if (res.labelList) {
            this.tags = res.labelList.map((item) => {
              return {
                info: item.bg_name,
                id: item.id,
                selected: false,
              };
            });
          }
          if (res.splidInfo) {
            const tmpSplidInfo = res.splidInfo;
            this.hostHeadImg = tmpSplidInfo.avator;
            this.hostName = tmpSplidInfo.emcee_name;
            this.hostNobility = '主持人';
            this.phoneNumber = tmpSplidInfo.phonenumber;
            this.comment_json = tmpSplidInfo.comment_json;
          }
          if (res.myCommentInfo) {
            const tmpComment = res.data.myCommentInfo;
            const choose = tmpComment.label.split(',');
            this.tags = res.data.labelList.map((item) => {
              let tagid = false;
              if (choose.indexOf(item.id.toString()) > -1) {
                tagid = true;
              }
              return {
                info: item.bg_name,
                id: item.id,
                selected: tagid,
              };
            });
            this.commented = true;
            this.flag = tmpComment.satisfaction;
            this.flagName = flagName[tmpComment.satisfaction];
            this.content = tmpComment.content;
            this.myCommentInfo = tmpComment;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    showQrcode() {
      if (!this.comment_json) {
        return;
      }
      this.qrcode = true;
    },
    hideQrcode() {
      this.qrcode = false;
    },
    commitComment() {
      const label = this.tags
        .filter((item) => item.selected)
        .map((item) => item.id)
        .join(',');
      if (!this.content || this.content.trim().length < 1) {
        this.$toast.center('评价一下吧!');
        return;
      }
      if (!this.flag) {
        this.$toast.center('给主持人打个星吧!');
        return;
      }
      if (this.flag <= 3 && this.content.trim().length < 10) {
        this.$toast.center('您的评价不足10个字，详细的说明能帮助主持人更好的为您服务。');
        return;
      }
      commitComment({
        content: this.content,
        label,
        satisfaction: this.flag,
      }).then((res) => {
        console.log(res);
        this.$toast.center('评价成功!');
        this.step1 = true;
        this.commented = true;
      }).catch((err) => {
        console.log(err);
        this.$toast.center('评价失败!');
      });
    },
  },
};
</script>
<style lang="less" scoped>
.estimate-wrap {
  position: absolute;
  width: 100%;
  height: 100%;
  .estimate {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    background-color: #edeeee;
    padding-top: 32px;
    .estimate-card {
      width: 682px;
      background-color: #fff;
      padding-bottom: 40px;
      margin: 0 auto;
      border-radius: 12px;
      .card-host {
        padding-top: 60px;
        padding-bottom: 60px;
        width: 100%;
        height: 35%;
        flex-direction: column;
        .host-img {
          width: 148px;
          height: 148px;
          background-position: center;
          background-size: 100% 100%;
          border-radius: 50%;
        }
        .host-name {
          font-size: 36px;
          margin-top: 20px;
          color: #333333;
          font-weight: 400;
          .qrcode {
            width: 40px;
            height: 40px;
            margin-left: 16px;
            background-size: 100% 100%;
            background-image: url('https://static.joymew.com/joymewMp/joymewIndex/estimate/comment-qrcode.png');
            animation: swing 1s linear infinite;
          }
          .more {
            width: 10px;
            height: 18px;
            margin-left: 8px;
            background-size: 100% 100%;
            background-image: url('https://static.joymew.com/joymewMp/joymewIndex/estimate/comment-more.png');
          }
        }
        .host-nobility {
          margin-top: 4px;
          font-size: 24px;
          color: #333333;
          font-weight: 400;
        }
        .satisfied-degree {
          margin-top: 20px;
          color: #ff8d19;
          font-size: 24px;
          .star-wrap {
            margin-left: 20px;
          }
        }
      }
      .border-wrap {
        margin: 0 auto;
        width: 616px;
        height: 2px;
        justify-content: space-between;
        flex-wrap: nowrap;
        .border {
          width: 18px;
          flex-grow: 0;
          height: 2px;
          background: #dddddd;
        }
      }
      .card-tags {
        width: 100%;
        height: 65%;
        justify-content: space-between;
        flex-direction: column;
        padding-top: 40px;
        padding-bottom: 90px;
        .tags-title {
          margin: 0 auto;
          font-size: 24px;
          font-weight: 400;
          color: #383838;
        }
        .tags {
          justify-content: space-around;
          flex-wrap: wrap;
          padding: 30px;
          .tag {
            margin-top: 20px;
            margin-left: 10px;
            margin-right: 10px;
            height: 56px;
            padding: 10px 20px;
            border-radius: 28px;
            border: 2px solid #eeeeee;
            color: #999999;
            &.selected {
              border: 2px solid #de2748;
              color: #de2748;
            }
          }
        }
        textarea {
          width: 580px;
          height: 250px;
          padding: 18px 30px;
          font-size: 24px;
          color: #333;
          border: 2px solid #eeeeee;
          margin-top: 28px;
          outline: none;
        }
        .comment-item {
          margin: 0 auto;
          width: 616px;
          display: flex;
          flex-direction: column;
          .my-c {
            display: flex;
            justify-content: flex-start;
            .my-avator {
              width: 68px;
              height: 68px;
              border-radius: 50%;
              margin-right: 16px;
            }
            .nameAnddate {
              display: flex;
              flex-direction: column;
              .name {
                font-size: 26px;
                color: #333;
              }
              .date {
                font-size: 24px;
                color: #999999;
              }
            }
          }
          .content {
            font-size: 32px;
            margin-top: 22px;
          }
          .sub-comment {
            margin-top: 20px;
            background: #f5f5f3;
            border-radius: 4px;
            padding: 10px;
            padding-left: 24px;
            font-size: 24px;
            .sub-item {
              margin-top: 8px;
              .sub-name {
                margin-right: 20px;
                max-width: 200px;
                color: #333;
                font-weight: bold;
              }
              .sub-content {
                color: #666;
              }
            }
          }
          .reply-btn {
            width: 100%;
            height: 50px;
            background: #f5f5f3;
            border-radius: 4px;
            font-size: 24px;
            justify-content: flex-start;
            padding-left: 24px;
            margin-top: 20px;
          }
        }
      }
      .btn-wrap {
        justify-content: space-around;
        .submit {
          width: 230px;
          height: 80px;
          background: linear-gradient(180deg, #ff869c 0%, #dc2244 100%);
          border-radius: 40px;
          font-size: 32px;
          color: #fff;
        }
      }
    }
    @keyframes swing {
      20% {
        -webkit-transform: rotate3d(0, 0, 1, 15deg);
        transform: rotate3d(0, 0, 1, 15deg);
      }

      40% {
        -webkit-transform: rotate3d(0, 0, 1, -10deg);
        transform: rotate3d(0, 0, 1, -10deg);
      }

      60% {
        -webkit-transform: rotate3d(0, 0, 1, 5deg);
        transform: rotate3d(0, 0, 1, 5deg);
      }

      80% {
        -webkit-transform: rotate3d(0, 0, 1, -5deg);
        transform: rotate3d(0, 0, 1, -5deg);
      }

      to {
        -webkit-transform: rotate3d(0, 0, 1, 0deg);
        transform: rotate3d(0, 0, 1, 0deg);
      }
    }
  }
  .leave-wrap {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 100;
    .leave-modal {
      position: absolute;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 538px;
      height: 546px;
      background: #ffffff;
      border-radius: 16px;
      flex-direction: column;
      .emjoy {
        width: 184px;
        height: 188px;
        background-image: url('https://ustatic.hudongmiao.com/joymewMp/joymewIndex/estimatehappy.png');
        background-size: 100% 100%;
      }
      .leave {
        width: 100%;
        margin-top: 20px;
        padding: 0 30px;
        font-size: 32px;
        font-weight: 400;
        color: #333333;
        letter-spacing: 5px;
        flex-direction: column;
      }
      .btn-group {
        width: 100%;
        justify-content: space-around;
        .btnItem {
          margin-top: 40px;
          width: 218px;
          height: 72px;
          border-radius: 50px;
          &.btn-leave {
            color: #a42c21;
            background: linear-gradient(180deg, #fff6f6 0%, #ffd4d7 100%);
          }
          &.btn-encourage {
            color: #ffffff;
            background: linear-gradient(180deg, #ff869c 0%, #dc2244 100%);
          }
        }
      }
    }
  }
  .feedback-wrap {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 100;
    .feedback-modal {
      position: absolute;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 538px;
      height: 546px;
      background: #ffffff;
      border-radius: 16px;
      flex-direction: column;
      background-size: 100% auto;
      background-position-y: -2px;
      background-image: url('https://static.hudongmiao.com/joymewMp/joymewIndex/estimate/top.png');
      background-repeat: no-repeat;
      .thanks {
        width: 100%;
        margin-top: 220px;
        font-size: 34px;
        font-weight: 600;
        color: #e33555;
        letter-spacing: 5px;
      }
      .tips {
        margin-top: 20px;
        padding: 0 30px;
        font-size: 24px;
      }
      .btn-group {
        width: 100%;
        justify-content: space-around;
        .btnItem {
          margin-top: 40px;
          width: 218px;
          height: 72px;
          border-radius: 50px;
          &.btn-leave {
            color: #a42c21;
            background: linear-gradient(180deg, #fff6f6 0%, #ffd4d7 100%);
          }
          &.btn-encourage {
            color: #ffffff;
            background: linear-gradient(180deg, #ff869c 0%, #dc2244 100%);
          }
        }
      }
    }
  }
  .qrcode-wrap {
    width: 100%;
    height: 100%;
    position: fixed;
    font-size: 32px;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 100;
    flex-direction: column;
    .qrcode-modal {
      width: 480px;
      height: 580px;
      padding: 20px;
      background-color: #fff;
      justify-content: flex-start;
      flex-direction: column;
      border-radius: 8px;
      .qrcode-cus {
        width: 440px;
        height: 440px;
      }
      .save {
        margin-top: 30px;
        font-size: 24px;
        padding: 0 10px;
      }
    }
    .qrcode-close {
      width: 68px;
      height: 68px;
      margin-top: 63px;
      background-size: 100% 100%;
      background-image: url('https://static.joymew.com/joymewMp/joymewIndex/estimate/comment_close.png');
    }
  }
}
</style>
