/* eslint-disable */
let clickLock = false;
export const Hby = function (options) {
    clickLock = false;
    this.el = options.el;
    this.rains = [];
    this.speed = options.speed; // 控制红包落下的速度
    this.density = options.density; // 红包密度
    this.sum = 10000 / options.sum; // 红包密度
    this.callback = options.callback; // 回调
};
Hby.prototype.create = function () {
    var el = this.el;
    var This = this;
    var nRed = document.createElement("div");
    nRed.className = "clickHb-hb";
    nRed.style.left = Math.random() * (el.clientWidth - 70) + "px";
    nRed.style.top = -el.clientHeight / 20 + "px";
    // nRed.ontouchstart = function () {
    //     nRed.className = "clickHb-hb clickHb-hbActive";
    //     clearInterval(nRed.timer);
    //     setTimeout(() => {
    //         el.removeChild(nRed);
    //     }, 500);
    // }
    nRed.ontouchstart = function () {
        if (clickLock) {
            return;
        }
        clickLock = true;
        This.callback(nRed, el);
        setTimeout(() => {
            clickLock = false;
        }, 100);
        // nRed.className = "clickHb-hb clickHb-hbActive";
        // clearInterval(nRed.timer);
        // setTimeout(() => {
        //     el.removeChild(nRed);
        //     clickLock = false;
        // }, 100);
    }
    el.appendChild(nRed);
    this.move(nRed);
    this.rains.push(nRed);
};
Hby.prototype.start = function () {
    var This = this;
    This.timer = setInterval(function () {
        This.create();
    }, This.sum);
};
Hby.prototype.stop = function () {
    var This = this;
    clearInterval(This.timer);
    // for (var i = 0; i < This.rains.length; i++) {
    //   clearInterval(This.rains[i].timer);
    // }
};
Hby.prototype.move = function (rains) {
    var el = this.el;
    var This = this;
    // var diffY = Math.random() + 1; // 垂直上的轻微偏移
    // var diffX = Math.random(); // 水平上的轻微偏移
    var diffY = 1; // 垂直上的轻微偏移
    var diffX = 0; // 水平上的轻微偏移
    rains.timer = setInterval(function () {
        // if (diffY > 1.5) {
        //   rains.style.left = parseInt(rains.style.left) + parseInt(diffX * rains.clientHeight / 35) + "px";
        // } else {
        //   rains.style.left = parseInt(rains.style.left) - parseInt(diffX * rains.clientHeight / 35) + "px";
        // }
        // rains.style.top = parseInt(rains.style.top) + parseInt(diffY * rains.clientHeight / 20) + "px";
        rains.style.top = parseInt(rains.style.top) + parseInt(rains.clientHeight / 20) + "px";
        if (el.clientHeight < parseInt(rains.style.top)) {
            // 超出 区域过后，关闭定时器，删除红包
            clearInterval(rains.timer);
            el.removeChild(rains);
        }
    }, This.speed);
};
