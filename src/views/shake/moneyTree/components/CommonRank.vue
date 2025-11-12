<template>
    <!--普通模式排行榜 -->
    <div class="CommonRank">
        <div class="top-three-wrap">
            <div class="top-three-item" v-for="(item, idx) in topThree" :key="idx"
                :style="{ order: idx === 1 ? 1 : idx === 0 ? 2 : 3 }">
                <div class="avatar-box publicHvCenter">
                    <img class="avatar" :src="item.avator" />
                    <div class="crown publicHvCenter">
                        <div class="num publicHvCenter">{{ idx + 1 }}</div>
                    </div>
                    <img class="border-deco"
                        src="https://ustatic.hudongmiao.com/joymewH5/img/moneyTree/cricle-try-1.png" />
                </div>
                <div class="score publicHvCenter">{{ item.score }}分</div>
                <div class="nickname">{{ item.wx_name }}</div>
            </div>
        </div>
        <div class="common-wrap">
            <img src="https://ustatic.hudongmiao.com/joymewH5/img/moneyTree/rank-title-text.png" alt=""
                class="rank-title" />
            <div class="congratulations-text">
                <div class="line left" />
                恭喜,您当前的排名为第{{ myRank }}名
                <div class="line right" />
            </div>
            <div class="ran-item_list">
                <div class="rank-item" v-for="(item, idx) in commonList" :key="idx">
                    <div class="num">{{ idx + 4 }}</div>
                    <div class="avatar-box publicHvCenter">
                        <img class="avatar" :src="item.avator" />
                    </div>
                    <div class="nickname">{{ item.wx_name }}</div>
                    <div class="common-score">{{ item.score }}分</div>
                </div>
            </div>
            <div class="my-info">
                <div class="my-nickname">{{ myOwnInfo.nickname }}</div>
                <div class="my-score">{{ myOwnInfo.score }}分</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'CommonRank',
  props: {
    topThree: {
      type: Array,
      default: () => [],
    },
    commonList: {
      type: Array,
      default: () => [],
    },
    myRank: {
      type: Number,
      default: 0,
    },
    myOwnInfo: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style lang="less" scoped>
.CommonRank {
    .top-three-wrap {
        width: 100%;
        position: absolute;
        top: 47px;
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        justify-content: center;
        padding-left: 2vw;

        &::before {
            content: '';
            position: absolute;
            width: 604px;
            height: 122px;
            top: 177px;
            left: 48%;
            transform: translateX(-50%);
            background: url('https://ustatic.hudongmiao.com/joymewH5/img/moneyTree/top-three_stage.png') no-repeat;
            background-size: 95% 100%;
            background-position-x: 4vw;
            pointer-events: none;
        }

        .top-three-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;

            .avatar-box {
                position: relative;
                width: 138px;
                height: 140px;
                display: flex;
                justify-content: center;
                align-items: center;

                .avatar {
                    width: 80%;
                    height: 80%;
                    border-radius: 50%;
                    object-fit: cover;
                }

                .crown {
                    position: absolute;
                    top: -3vw;
                    left: -0.667vw;
                    z-index: 1;
                    width: 72px;
                    height: 70px;
                    background: url('https://ustatic.hudongmiao.com/joymewH5/img/moneyTree/crown.png') no-repeat center/contain;

                    .num {
                        color: #fff;
                        font-size: 14px;
                        text-shadow: 0 2px 8px #b88b00;
                        width: 20px;
                        height: 20px;
                        border-radius: 50%;
                        background-color: #ff860f;
                        position: relative;
                        top: 8px;
                        left: 5px;
                    }
                }

                .border-deco {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    left: 0;
                    top: 0;
                }
            }

            .score {
                width: 182px;
                height: 54px;
                margin-top: -45px;
                position: relative;
                background-image: url('https://ustatic.hudongmiao.com/joymewH5/img/moneyTree/ribbon.png');
                background-size: 100% 100%;
                font-size: 28px;
                color: #7f0f15;
                font-weight: bold;
                padding-bottom: 1vw;
            }

            .nickname {
                font-size: 28px;
                color: #fffd64;
                margin-top: -10px;
                width: 200px;
                position: relative;
                text-align: center;
                font-weight: 500;
                text-shadow:
                    0 0 2px #7f0f15,
                    0 1px 2px #7f0f15,
                    1px 0 2px #7f0f15,
                    0 -1px 2px #7f0f15,
                    -1px 0 2px #7f0f15;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            &:nth-child(1) {
                transform: scale(1.1);
                z-index: 2;
            }

            &:nth-child(2) {
                left: -12px;
                top: 30px;
            }

            &:nth-child(3) {
                transform: scale(0.95);
                z-index: 1;
                top: 50px;
            }
        }
    }

    .common-wrap {
        width: 750px;
        height: 1147px;
        position: absolute;
        top: 240px;
        margin: 0 auto;
        left: 0;
        right: 0;
        background: url('https://ustatic.hudongmiao.com/joymewH5/img/moneyTree/common-list_rec.png') no-repeat center/center;
        background-size: 100% 100%;
        padding-top: 115px;

        .rank-title {
            width: 233px;
            height: 58px;
            display: block;
            margin: 0 auto;
        }

        .congratulations-text {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 32px;
            color: #770006;
            margin-top: 70px;
            text-align: center;
            width: 100%;

            .line {
                width: 56px;
                height: 4px;
                background: #770006;
                border-radius: 4.5px;
                position: relative;
                margin: 0 12px;
                flex-shrink: 0;
            }

            .line.left::after {
                content: '';
                position: absolute;
                right: -6px;
                top: 50%;
                transform: translateY(-50%);
                width: 12px;
                height: 12px;
                background: #770006;
                border-radius: 50%;
            }

            .line.right::after {
                content: '';
                position: absolute;
                left: -6px;
                top: 50%;
                transform: translateY(-50%);
                width: 12px;
                height: 12px;
                background: #770006;
                border-radius: 50%;
            }
        }

        .ran-item_list {
            width: 78%;
            margin: 0 auto;
            height: 680px;
            margin-top: 10px;
            padding: 19px 11px 11px 17px;
        }

        .rank-item {
            width: 479px;
            height: 97px;
            display: flex;
            align-items: center;
            position: relative;
            margin-left: 69px;

            .num {
                width: 20px;
                font-size: 28px;
                text-align: center;
                flex-shrink: 0;
                position: relative;
                margin-left: 30px;
            }

            .avatar-box {
                width: 67px;
                height: 67px;
                margin-left: 20px;
                flex-shrink: 0;
                position: relative;
                border: 4px solid #fffd64;
                border-radius: 50%;

                .avatar {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
            }

            .nickname {
                font-size: 28px;
                width: 200px;
                margin-left: 10px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                flex-shrink: 0;
                position: relative;
            }

            .common-score {
                font-size: 32px;
                color: #ffda4b;
                position: absolute;
                right: 20px;
                top: 50%;
                transform: translateY(-50%);
                font-weight: bold;
                text-shadow:
                    0 0 2px #7f0f15,
                    0 1px 2px #7f0f15,
                    1px 0 2px #7f0f15,
                    0 -1px 2px #7f0f15,
                    -1px 0 2px #7f0f15;
            }

            &:nth-child(odd) {
                &::before {
                    content: '';
                    display: block;
                    background-image: url('https://ustatic.hudongmiao.com/joymewH5/img/moneyTree/comon-item_bg.png');
                    background-size: 549px 174px;
                    position: absolute;
                    top: -19px;
                    left: -70px;
                    width: 549px;
                    height: 174px;
                }

                .num,
                .nickname {
                    color: #fff;
                }
            }

            &:nth-child(even) {
                height: 80px;

                .num,
                .nickname {
                    color: #770006;
                }
            }
        }

        .my-info {
            margin: 0 auto;
            margin-top: 20px;
            width: 284px;
            height: 4.933vw;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 28px;
            color: #fff;
            background: transparent;
            box-sizing: border-box;

            .my-nickname {
                width: 120px;
                display: inline-block;
                text-align: center;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                margin-right: 16px;
            }

            .my-score {
                flex-shrink: 0;
            }
        }
    }
}
</style>
