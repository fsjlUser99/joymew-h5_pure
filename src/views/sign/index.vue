<template>
  <div class="signContainer publicVCenter">
    <img
      v-if="sceneType === '0'"
      src="https://static.joymew.com/joymewMp/joymewIndex/weddingSignBg2022.png"
      class="bg"
    />
    <img
      v-if="sceneType === '0'"
      src="https://static.hudongmiao.com/joymewMp/joymewIndex/ballon2.png"
      class="ballon2"
    />
    <img
      v-if="sceneType === '0'"
      src="https://static.hudongmiao.com/joymewMp/joymewIndex/ballon3.png"
      class="ballon3"
    />
    <img
      v-if="sceneType === '0'"
      src="https://static.hudongmiao.com/joymewMp/joymewIndex/wel2022.png"
      class="welWedding"
    />
    <div
      v-if="sceneType === '1'"
      class="annualBgBox"
    >
      <img
        src="https://static.hudongmiao.com/joymewMp/joymewIndex/bg-annualMeeting01.png"
        class="annualBg"
      />
    </div>
    <img
      v-if="sceneType === '1'"
      src="https://static.hudongmiao.com/joymewMp/joymewIndex/signTitle-annualMeeting03.png"
      class="annualSignTitle"
    />
    <div
      v-if="sceneType === '1'"
      class="annualTitle"
    >
      {{ activityTitle }}
    </div>
    <img
      v-if="sceneType === '2'"
      src="https://static.joymew.com/joymewMp/joymewIndex/birthBg3.png"
      class="bg"
    />
    <div
      v-if="sceneType === '21'"
      class="bbyBg"
    />
    <img
      v-if="sceneType === '21'"
      src="https://static.joymew.com/joymewMp/joymewIndex/bbyDeco02.png"
      class="bbyDeco02"
    />
    <img
      v-if="sceneType === '21'"
      src="https://static.joymew.com/joymewMp/joymewIndex/bbyDeco01.png"
      class="bbyDeco01"
    />
    <div
      v-if="sceneType === '22'"
      class="syBgBox"
    >
      <img
        src="https://static.joymew.com/joymewMp/joymewIndex/syMobileBg4.png"
        class="syBg"
      />
    </div>
    <img
      v-if="sceneType === '22'"
      src="https://static.joymew.com/joymewMp/joymewIndex/lantern.png"
      class="topLantern"
    />
    <img
      v-if="sceneType === '22'"
      src="https://static.joymew.com/joymewMp/joymewIndex/decoration.png"
      class="bottomDecoration"
    />
    <img
      v-if="sceneType === '23'"
      src="https://static.joymew.com/joymewMp/joymewIndex/crlMobileBg2.png"
      class="bg"
    />
    <img
      v-if="sceneType === '23'"
      src="https://static.joymew.com/joymewMp/joymewIndex/crlBottomCloud.png"
      class="crlBottomCloud"
    />
    <img
      v-if="sceneType === '24'"
      src="https://static.hudongmiao.com/joymewMp/bly/blyBg.png"
      class="bg"
    />
    <img
      v-if="sceneType === '25'"
      src="https://static.hudongmiao.com/joymewMp/myyBg.png"
      class="bg"
    />
    <img
      v-if="sceneType === '41'"
      src="https://static.joymew.com/joymewMp/joymewIndex/bydlBg.png"
      class="bg"
    />
    <img
      v-if="sceneType === '41'"
      src="https://static.joymew.com/joymewMp/joymewIndex/bydlDeco.png"
      class="cloud"
    />

    <div
      v-if="sceneType === '42'"
      class="xsyBgBox"
    >
      <img
        src="https://static.joymew.com/joymewMp/joymewIndex/xsyBg.png"
        class="xsyBg"
      />
    </div>
    <img
      v-if="sceneType === '42'"
      src="https://static.joymew.com/joymewMp/joymewIndex/xsyDeco.png"
      class="lantern"
    />
    <div
      v-if="sceneType === '43'"
      class="jbtmBgBox"
    >
      <img
        src="https://static.joymew.com/joymewMp/joymewIndex/jbtmBg.png"
        lass="jbtmBg"
      />
    </div>
    <img
      v-if="sceneType === '43'"
      src="https://static.joymew.com/joymewMp/joymewIndex/jbtmCloud.png"
      class="jbtmCloud"
    />
    <img
      v-if="sceneType === '51'"
      src="https://static.joymew.com/joymewMp/joymewIndex/txhBg.png"
      class="bg"
    />
    <img
      v-if="sceneType === '52'"
      src="https://static.joymew.com/joymewMp/joymewIndex/qqyBg.png"
      class="bg"
    />
    <img
      v-if="sceneType === '53'"
      src="https://static.joymew.com/joymewMp/joymewIndex/hxBg.png"
      class="bg"
    />
    <img
      v-if="sceneType === '54'"
      src="https://static.joymew.com/joymewMp/joymewIndex/dhyMobileBg.png"
      class="bg"
    />
    <div
      class="signBox"
      :class="signBoxType"
    >
      <img
        v-if="sceneType === '0'"
        src="https://static.hudongmiao.com/joymewMp/joymewIndex/qima.gif"
        class="qima"
      />
      <img
        v-if="sceneType === '0'"
        src="https://static.hudongmiao.com/joymewMp/joymewIndex/ballon1.png"
        class="ballon1"
      />
      <div
        v-if="sceneType === '0'"
        class="benifit"
      >
        一起看美照、送祝福、玩游戏吧～
      </div>
      <div class="fItem">
        <label
          class="key"
          :class="keyType"
        >
          姓名:
        </label>
        <input
          v-model="userName"
          name="userName"
          placeholder="请输入您的姓名"
          maxlength="12"
          :class="iptType"
        />
      </div>
      <div class="fItem">
        <label
          class="key"
          :class="keyType"
        >
          祝福语:
        </label>
        <input
          v-model="wish"
          name="wishes"
          placeholder="祝福语"
          maxlength="20"
          class="iptPad"
          :class="iptType"
        />
        <div
          v-tap="{ methods: refreshWish }"
          class="refreshBtn"
          :class="refreshBtnType"
        />
      </div>
      <div
        v-tap="{ methods: sign }"
        class="signBtn"
        :class="signBtnType"
      >
        <label v-if="sceneType !== '1'">点击进入</label>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { generateRandom } from '@/utils/index';
import { getWishBySceneType } from '@/utils/service';
import { signIn } from '@/api/index/index';

export default {
  name: 'SignContainer',
  data() {
    return {
      userName: '',
      wish: '',
    };
  },
  computed: {
    ...mapState({
      customSignWish: (state) => state.live.customSignWish,
      sceneType: (state) => state.live.sceneType,
      activityTitle: (state) => state.live.title,
      isOverDate: (state) => state.live.isOverDate,
    }),
    signBoxType() {
      return `signBox${this.sceneType}`;
    },
    keyType() {
      return `key${this.sceneType}`;
    },
    iptType() {
      return `ipt${this.sceneType}`;
    },
    refreshBtnType() {
      return `refreshBtn${this.sceneType}`;
    },
    signBtnType() {
      return `signBtn${this.sceneType}`;
    },
  },
  watch: {
    sceneType(newVal) {
      if (newVal) {
        this.refreshWish();
      }
    },
  },
  methods: {
    refreshWish() {
      const customSignLen = this.customSignWish.length;
      console.log(this.customSignWish);
      if (customSignLen > 0) {
        const tmpWish = this.customSignWish[generateRandom(0, customSignLen)];
        if (typeof tmpWish === 'object' && tmpWish !== null) {
          this.wish = tmpWish.bless_str;
        } else {
          this.wish = tmpWish;
        }
        return;
      }
      this.wish = getWishBySceneType(this.sceneType);
    },
    sign() {
      if (!this.userName) {
        this.$toast.center('贵宾姓名不能为空!');
        return;
      }
      if (!this.wish) {
        this.$toast.center('祝福语不能为空!');
        return;
      }
      if (this.isOverDate) {
        this.$toast.center('活动已结束!');
        return;
      }
      console.log(this.userName);
      console.log(this.wish);
      signIn({
        wish: this.wish,
        name: this.userName,
      })
        .then((res) => {
          console.log(res);
          this.$router.replace({
            path: '/',
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style scoped>
.signContainer {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  flex-direction: column;
  perspective: 4000px;
}

.annualBgBox {
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
}

.annualBg {
  width: 750px;
  position: absolute;
  top: -10px;
  left: 0;
}

.annualSignTitle {
  position: relative;
  width: 320px;
  margin-top: 80px;
}

.annualTitle {
  position: relative;
  color: transparent;
  background-image: linear-gradient(45deg, #e4af57, #fce688);
  font-size: 60px;
  padding: 0 20px;
  -webkit-background-clip: text;
}

.bg {
  width: 100%;
  height: 100%;
}

.bbyBg {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #e4c4c4;
}

.bbyDeco02 {
  width: 750px;
  height: 340px;
  position: absolute;
  top: 0;
}

.bbyDeco01 {
  width: 750px;
  height: 941px;
  position: absolute;
  top: 29px;
}

.syBgBox {
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
}

.syBg {
  width: 750px;
  position: absolute;
  top: -180px;
  left: 0;
}

.topLantern {
  width: 750px;
  height: 278px;
  position: absolute;
  top: 0;
}

.bottomDecoration {
  width: 750px;
  height: 70px;
  position: absolute;
  bottom: 0;
}

.crlBottomCloud {
  width: 750px;
  height: 198px;
  position: absolute;
  bottom: 0;
}

.cloud {
  width: 750px;
  height: 253px;
  position: absolute;
  bottom: 0;
}

.xsyBgBox {
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
}

.xsyBg {
  width: 835px;
  position: absolute;
  top: -10px;
  left: -12px;
}

.lantern {
  width: 750px;
  height: 151px;
  position: absolute;
  top: 0;
}

.jbtmBgBox {
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
}

.jbtmBg {
  width: 940px;
  position: absolute;
  top: -50px;
  left: -65px;
}

.jbtmCloud {
  width: 750px;
  height: 158px;
  position: absolute;
  bottom: -30px;
}

.signBox {
  width: 620px;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  bottom: 40px;
  padding-top: 40px;
  padding-bottom: 40px;
}

/* differance */
.signBox0,
.signBox54 {
  background-image: url('https://static.joymew.com/joymewMp/joymewIndex/box-04.png');
  width: 678px;
}

.signBox1 {
  background-image: url('https://static.hudongmiao.com/joymewMp/joymewIndex/boxQy01.png');
}

.signBox2 {
  background-color: #dbfafe;
}

.signBox21,
.signBox24,
.signBox25 {
  background-color: #f9eded;
}

.signBox22 {
  background-color: #cf1820;
}

.signBox23 {
  background-image: url('https://static.joymew.com/joymewMp/joymewIndex/signBoxCrl.png');
}

.signBox41 {
  background: #d0efff;
}

.signBox42 {
  background: #fef188;
}

.signBox43 {
  background: #ffffd8;
}

.signBox51 {
  background: #2c3032;
}

.signBox52 {
  background: #ff9484;
}

.signBox53 {
  background-image: url('https://static.joymew.com/joymewMp/joymewIndex/signBoxBgHX.png');
}

.benifit {
  font-size: 32px;
  font-weight: 400;
  color: #7a61e6;
  margin-top: 20px;
  margin-bottom: 30px;
}

.fItem {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 620px;
  padding: 0 40px;
  margin-bottom: 40px;
  position: relative;
}

.signBox0 .fItem,
.signBox54 .fItem {
  align-items: unset;
  flex-direction: column;
}

.key {
  font-size: 32px;
  font-weight: 600;
}

/* differance */
.key0,
.key54 {
  color: #ee8b6b;
  margin-bottom: 20px;
  font-size: 28px;
}

.key2,
.key21,
.key23,
.key24,
.key25,
.key41,
.key42,
.key43,
.key52 {
  color: #333333;
}

.key1 {
  color: #facd7f;
}

.key22,
.key51,
.key53 {
  color: #ffffff;
}

input {
  width: 412px;
  height: 56px;
  box-sizing: border-box;
  font-size: 32px;
  font-weight: normal;
  border-top: none;
  border-left: none;
  border-right: none;
  outline: none;
  background-color: transparent;
}

input::placeholder {
  color: #333333;
}

.ipt0::placeholder {
  color: #000000;
}

.ipt54::placeholder {
  color: #000000;
}

.ipt1::placeholder {
  color: #ffffff;
}

.ipt22::placeholder {
  color: #ffffff;
}

.ipt51::placeholder {
  color: #ffffff;
}

/* differance */
.ipt0,
.ipt54 {
  color: #333333;
  border-bottom: 2px solid #e8757e;
  width: 540px;
  font-size: 40px;
}

.ipt1,
.ipt53 {
  color: #ffffff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.6);
}

.ipt2,
.ipt21,
.ipt24,
.ipt25 {
  color: #333333;
  border-bottom: 1px solid rgba(51, 51, 51, 0.6);
}

.ipt22 {
  color: #ffffff;
  border-bottom: 1px solid #cc8c8c;
}

.ipt23 {
  color: #333333;
  border-bottom: 1px solid #54d5e9;
}

.ipt41 {
  color: #333333;
  border-bottom: 1px solid #efd1ee;
}

.ipt42 {
  color: #333333;
  border-bottom: 1px solid #e20013;
}

.ipt43 {
  color: #333333;
  border-bottom: 1px solid #ea002a;
}

.ipt51 {
  color: #ffffff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.6);
}

.ipt52 {
  color: #333333;
  border-bottom: 1px solid rgba(255, 255, 255, 0.6);
}

.iptPad {
  padding-right: 70px;
}

.refreshBtn {
  width: 28px;
  height: 28px;
  background-size: 100% 100%;
  position: absolute;
  right: 35px;
  bottom: 17px;
}

.qima {
  width: 260px;
  height: 220px;
  position: absolute;
  top: -220px;
}

.welWedding {
  width: 660px;
  height: 336px;
  position: absolute;
  top: 30px;
  animation-name: pulse;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

.ballon1 {
  width: 68px;
  height: 164px;
  position: absolute;
  bottom: -10px;
  right: -34px;
  animation-name: swing;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  transform-origin: bottom center;
}

.ballon2 {
  width: 136px;
  height: 132px;
  position: absolute;
  right: 37px;
  top: 350px;
  animation-name: ballonAni;
  animation-duration: 10s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

.ballon3 {
  width: 148px;
  height: 160px;
  position: absolute;
  left: 37px;
  top: 350px;
  animation-name: ballonAni;
  animation-duration: 10s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

/* differance */
.refreshBtn0,
.refreshBtn54 {
  background-image: url('https://static.hudongmiao.com/joymewMp/joymewIndex/refreshIconPink.png');
  right: 42px;
}

.refreshBtn1,
.refreshBtn2,
.refreshBtn21,
.refreshBtn22,
.refreshBtn23,
.refreshBtn24,
.refreshBtn25,
.refreshBtn41,
.refreshBtn42,
.refreshBtn43,
.refreshBtn51 {
  background-image: url('https://static.joymew.com/joymewMp/joymewIndex/txhReloadIcon.png');
}

.refreshBtn52 {
  background-image: url('https://static.joymew.com/joymewMp/joymewIndex/qqyReloadIcon.png');
}

.refreshBtn53 {
  background-image: url('https://static.joymew.com/joymewMp/joymewIndex/bbyReloadIcon.png');
}

.phoneIconBox {
  width: 24px;
  height: 32px;
  position: absolute;
  right: 57px;
  bottom: 17px;
  background-size: 100% 100%;
}

/* differance */
.phoneIconBox0,
.phoneIconBox54 {
  background-image: url('https://static.joymew.com/joymewMpTql/signWedding/phoneIcon.png');
}

.phoneIconBox1,
.phoneIconBox2,
.phoneIconBox21,
.phoneIconBox22,
.phoneIconBox23,
.phoneIconBox24,
.phoneIconBox25,
.phoneIconBox41,
.phoneIconBox42,
.phoneIconBox43,
.phoneIconBox51,
.phoneIconBox52,
.phoneIconBox53 {
  background-image: url('https://static.joymew.com/joymewMpTql/signTXH/phoneIcon.png');
}

.chooseGroup {
  width: 540px;
  height: 56px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
}

.chooseGroup > .chooseItem {
  width: 170px;
  height: 56px;
  background: rgba(122, 97, 230, 0.4);
  border-radius: 28px;
  font-size: 28px;
  font-weight: 400;
  text-align: center;
  line-height: 56px;
  color: #ffffff;
}

.chooseGroup > .chooseItem.active {
  background: #7a61e6;
}

.deskNum {
  width: 204px;
  height: 40px;
  background: #ffffff;
  border-radius: 4px;
  position: absolute;
  left: 165px;
}

.deskNum > .downArrow {
  width: 22px;
  height: 12px;
  position: absolute;
  right: 12px;
  bottom: 12px;
  transition: all 0.1s linear;
}

.deskNum > .val {
  width: 80%;
  height: 100%;
  position: absolute;
  font-size: 24px;
  font-weight: 400;
  color: #666666;
  line-height: 40px;
  padding-left: 10px;
}

.sexGroup {
  width: 412px;
  height: 59px;
  display: flex;
  justify-content: space-around;
}

.sexGroup > .sexItem {
  display: flex;
  align-items: center;
  position: relative;
  font-size: 32px;
  font-weight: 400;
  text-align: center;
}

/* differance */
.sexItem0,
.sexItem2,
.sexItem21,
.sexItem23,
.sexItem24,
.sexItem25,
.sexItem41,
.sexItem42,
.sexItem43,
.sexItem52,
.sexItem54 {
  color: #333333;
}

.sexItem1,
.sexItem22,
.sexItem51,
.sexItem53 {
  color: #ffffff;
}

.sexGroup .sexItem > .sexIcon {
  width: 59px;
  height: 59px;
  display: flex;
  align-items: center;
  margin-right: 17px;
}

.sexGroup .sexItem > .tickedIcon {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 38px;
  left: 40px;
}

.getPhoneIpt {
  position: relative;
  z-index: 1;
  width: 412px;
  height: 56px;
  box-sizing: border-box;
  font-size: 32px;
  font-weight: normal;
  border-bottom: 2px solid #666666;
  padding-right: 68px;
}

/* differance */
.getPhoneIpt0,
.getPhoneIpt54 {
  width: 540px;
  border-bottom: 2px solid #e8757e;
  font-size: 40px;
}

.getPhoneIpt2,
.getPhoneIpt21 {
  color: #333333;
}

.getPhoneIpt1 {
  color: #ffffff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.6);
}

.getPhoneIpt22 {
  color: #ffffff;
  border-bottom: 1px solid #cc8c8c;
}

.getPhoneIpt23 {
  color: #333333;
  border-bottom: 1px solid #54d5e9;
}

.getPhoneIpt24,
.getPhoneIpt25 {
  color: #333333;
  border-bottom: 1px solid rgba(51, 51, 51, 0.6);
}

.getPhoneIpt41 {
  color: #333333;
  border-bottom: 1px solid #efd1ee;
}

.getPhoneIpt42 {
  color: #333333;
  border-bottom: 1px solid #e20013;
}

.getPhoneIpt43 {
  color: #333333;
  border-bottom: 1px solid #ea002a;
}

.getPhoneIpt51,
.getPhoneIpt53 {
  color: #ffffff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.6);
}

.getPhoneIpt52 {
  color: #333333;
  border-bottom: 1px solid rgba(255, 255, 255, 0.6);
}

.getPhoneIpt > .getPhoneBtn {
  width: 100%;
  height: 100%;
  opacity: 0;
  background-color: transparent;
  position: absolute;
  right: 0;
  top: 0;
}

.birthDate {
  width: 412px;
  height: 56px;
  background: #ffffff;
  border-radius: 4px;
  position: absolute;
  right: 55px;
  top: -8px;
}

.birthDate > .downArrow {
  width: 27px;
  height: 14px;
  position: absolute;
  right: 15px;
  bottom: 21px;
  transition: all 0.1s linear;
}

.birthDate > .val {
  width: 80%;
  height: 100%;
  position: absolute;
  font-size: 32px;
  font-weight: 400;
  color: #666666;
  line-height: 56px;
  padding-left: 18px;
}

.signBtn {
  width: 380px;
  height: 72px;
  border-radius: 36px;
  font-size: 32px;
  font-weight: 500;
  margin-top: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* differance */
.signBtn0,
.signBtn54 {
  background: linear-gradient(180deg, #e87080 0%, #ee8b6b 100%);
  color: #ffffff;
}

.signBtn1 {
  background-image: url('https://static.hudongmiao.com/joymewMp/joymewIndex/signBtnQy01.png');
  background-size: 100% 100%;
}

.signBtn2,
.signBtn21,
.signBtn24,
.signBtn25 {
  background: #fab0ce;
  color: #ffffff;
}

.signBtn22 {
  background: #fddd97;
  color: #ffffff;
}

.signBtn23,
.signBtn41 {
  background: #54d5e9;
  color: #ffffff;
}

.signBtn42 {
  background: #e20013;
  color: #ffffff;
}

.signBtn43 {
  background: #ea002a;
  color: #ffffff;
}

.signBtn51 {
  background: #beb161;
  color: #ffffff;
}

.signBtn52 {
  background: #ef2152;
  color: #ffffff;
}

.signBtn53 {
  background: #b3e0ee;
  color: #ffffff;
}

@keyframes pulse {
  from {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }

  50% {
    -webkit-transform: scale3d(1.05, 1.05, 1.05);
    transform: scale3d(1.05, 1.05, 1.05);
  }

  to {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
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

@keyframes ballonAni {
  from {
    transform: translateZ(1000px);
    opacity: 1;
  }

  to {
    transform: translateZ(-5000px);
    opacity: 0;
  }
}
</style>
