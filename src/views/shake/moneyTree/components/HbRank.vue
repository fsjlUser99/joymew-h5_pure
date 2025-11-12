<template>
    <!--红包模式排行榜 -->
    <div class="HbRank">
        <div class="title" />
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
                <div class="prize-money top-three-prize">
                    {{ item.prize }}元
                </div>
            </div>
        </div>
        <div class="common-wrap">
            <div class="ran-item_list">
                <div class="rank-item" v-for="(item, idx) in commonList" :key="idx">
                    <div class="num">{{ idx + 4 }}</div>
                    <div class="avatar-box publicHvCenter">
                        <img class="avatar" :src="item.avator" />
                    </div>
                    <div class="nickname">{{ item.wx_name }}</div>
                    <div class="common-score">{{ item.score }}分</div>
                    <div class="prize-money common-rank-prize">
                        {{ item.prize }}元
                    </div>
                </div>
            </div>
        </div>
        <div class="my-info">
            <div class="my-status">{{ myRank === 0 || !myRank ? '未上榜' : `第${myRank}名` }}</div>
            <div class="my-avatar-box publicHvCenter">
                <img class="my-avatar" :src="myOwnInfo.avator" />
            </div>
            <div class="my-nickname">{{ myOwnInfo.nickname }}</div>
            <div class="my-score">{{ myOwnInfo.score }}分</div>
            <div class="prize-money my-own-prize">
                {{ myOwnInfo.prize }}元
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
.HbRank {
    .title {
        width: 703px;
        height: 140px;
        background-image: url('https://ustatic.hudongmiao.com/joymewH5/img/moneyTree/rank-wing_title.png');
        background-size: 100% 100%;
        margin: 0 auto;
    }

    .top-three-wrap {
        width: 100%;
        position: absolute;
        top: 170px;
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

            .prize-money {
                width: 142px;
                height: 65px;
                background-image: url('https://ustatic.hudongmiao.com/joymewH5/img/moneyTree/mobile-money_bg2.png');
                background-size: 100% 100%;
                position: absolute;
                bottom: -170px;
                font-size: 28px;
                color: #fff;
                font-weight: bold;
                text-align: center;
                line-height: 52px;
            }

            &:nth-child(1) {
                transform: scale(1.1);
                z-index: 2;
            }

            &:nth-child(2) {
                left: 5px;
                top: 35px;
                .prize-money {
                    bottom: -155px;
                }
            }

            &:nth-child(3) {
                transform: scale(0.95);
                z-index: 1;
                top: 50px;
                .prize-money {
                    bottom: -150px;
                }
            }
        }
    }

    .common-wrap {
        width: 700px;
        height: 873px;
        position: absolute;
        top: 580px;
        margin: 0 auto;
        left: 0;
        right: 0;
        background: url('https://ustatic.hudongmiao.com/joymewH5/img/moneyTree/common-bg2.png');
        background-size: 100% 100%;
        padding-top: 82px;

        &::before {
            content: 'Top10排名';
            display: block;
            width: 429px;
            height: 88px;
            background-image: url('https://ustatic.hudongmiao.com/joymewH5/img/moneyTree/top-bg2.png');
            background-size: 100% 100%;
            position: absolute;
            top: -18px;
            left: 50%;
            transform: translateX(-50%);
            text-align: center;
            line-height: 88px;
            font-size: 47px;
            color: #fff;
            font-weight: bold;
        }

        .ran-item_list {
            width: 576px;
            margin: 0 auto;
            height: 700px;
            margin-top: 10px;
            padding: 9px 0px 9px 11px;
            background: #FFFFFF;
            border-radius: 19px 19px 19px 19px;
        }

        .rank-item {
            height: 97px;
            display: flex;
            align-items: center;
            position: relative;

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
                width: 150px;
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
                right: 180px;
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

            .prize-money {
                width: 123px;
                height: 41px;
                background: #FFFFFF;
                border-radius: 6px 6px 6px 6px;
                border: 2px solid #E5000C;
                text-align: center;
                line-height: 41px;
                font-size: 24px;
                color: #E5000C;
                font-weight: bold;
                position: absolute;
                right: 20px;
            }

            &:nth-child(odd) {
                &::before {
                    content: '';
                    display: block;
                    background-image: url('https://ustatic.hudongmiao.com/joymewH5/img/moneyTree/ribbon-short.png');
                    background-size: 100% 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
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
    }

    .my-info {
        margin: 0 auto;
        margin-top: 15px;
        width: 100%;
        height: 97px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 26px;
        color: #fff;
        background-image: url(https://ustatic.hudongmiao.com/joymewH5/img/moneyTree/ribbon-long.png);
        background-size: 100% 100%;
        position: absolute;
        top: 1450px;

        .my-status {
            font-size: 28px;
            text-align: center;
            position: relative;
        }

        .my-avatar-box {
            width: 67px;
            height: 67px;
            margin-left: 20px;
            position: relative;
            border: 4px solid #fffd64;
            border-radius: 50%;

            .my-avatar {
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }
        }

        .my-nickname {
            font-size: 28px;
            max-width: 250px;
            margin-left: 10px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            position: relative;
        }

        .my-score {
            font-size: 32px;
            color: #ffda4b;
            font-weight: bold;
            margin-left: 20px;
            text-shadow:
                0 0 2px #7f0f15,
                0 1px 2px #7f0f15,
                1px 0 2px #7f0f15,
                0 -1px 2px #7f0f15,
                -1px 0 2px #7f0f15;
        }

        .prize-money {
            width: 123px;
            height: 41px;
            background: #FFFFFF;
            border-radius: 6px 6px 6px 6px;
            border: 2px solid #E5000C;
            text-align: center;
            line-height: 41px;
            font-size: 24px;
            color: #E5000C;
            font-weight: bold;
            margin-left: 26px;
        }
    }
}
</style>
