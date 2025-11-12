<template>
  <!-- 泡泡手写签到 -->
  <div class="bubbleSign-wrap">
    <canvas
      id="lizi-ban"
      ref="liziBan"
    />
    <canvas
      id="sq-ban"
      ref="sqBan"
    />
    <div class="color-group">
      <ul>
        <li
          v-for="item in colors"
          :key="item"
          v-tap="{ methods: chooseColor, color: item }"
          class="color-item"
          :class="{ active: item === activeColor }"
          :style="{ backgroundColor: item }"
        />
      </ul>
    </div>
    <div
      id="range-wrap"
      class="range-wrap"
    >
      <input
        ref="range"
        type="range"
        min="1"
        max="10"
        value="5"
        title="调整笔刷粗细"
        @change="handelIptChange($event)"
      />
    </div>
    <div class="tools publicVCenter">
      <button
        v-tap="{ methods: resetCanvas }"
        title="清空"
        class="clear"
      >
        清空
      </button>
      <button
        v-tap="{ methods: confirm }"
        title="发送"
        class="save"
      >
        发送
      </button>
    </div>
    <transition leave-active-class="slideOutUp animated">
      <img
        v-if="resultImg"
        :src="resultImg"
        class="resultImg"
      />
    </transition>
  </div>
</template>
<script>
import { uploadPhoto, sendBubbleSignText } from '@/api/index/index';

export default {
  name: 'BubbleSign',
  components: {},
  data() {
    return {
      score: 0,
      colors: ['black', '#ff3333', '#0066ff', '#ffff33', '#33cc66', 'gray'],
      activeColor: 'black',
      resultImg: '',
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.hadpaint = false;
    this.ppcanvas = this.$refs.sqBan;
    this.ppctx = this.ppcanvas.getContext('2d');
    this.lzcanvas = this.$refs.liziBan;
    this.lzctx = this.lzcanvas.getContext('2d');
    this.clear = false;
    this.lWidth = parseInt('5', 10);
    this.fireani = '1';
    this.particles = [];
    this.autoSetSize();
    this.listenToUser();
    this.getColor();
    const that = this;
    document.addEventListener(
      'touchmove',
      (e) => {
        e.preventDefault();
      },
      { passive: false },
    );
    this.Particle = function Particle() {};
    this.Particle.prototype = {
      init(x, y) {
        this.x = x || 0.0;
        this.y = y || 0.0;
        this.r = 2 * Math.random() + 3 || 40;
        this.color = 'gold';
        this.theta = Math.random() * 2 * Math.PI;
        this.R = Math.random() * 4 + 2;
        this.vx = Math.cos(this.theta) * this.R;
        this.vy = Math.sin(this.theta) * this.R;
      },
      draw() {
        that.lzctx.beginPath();
        that.lzctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        that.lzctx.fillStyle = this.color;
        that.lzctx.fill();
      },
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vx += Math.cos(this.theta) * 0.1;
        this.vy += Math.sin(this.theta) * 0.1;
        this.vx *= 0.94;
        this.vy *= 0.94;
        this.r *= 0.92;
        this.color = 'gold';
      },
    };
  },
  methods: {
    autoSetSize() {
      const that = this;
      function ppcanvasSetSize() {
        const pageWidth = document.documentElement.clientWidth;
        const pageHeight = document.documentElement.clientHeight;
        that.ppcanvas.width = pageWidth;
        that.ppcanvas.height = pageHeight;
        that.lzcanvas.width = pageWidth;
        that.lzcanvas.height = pageHeight;
      }
      ppcanvasSetSize();
      window.onresize = function handleResize() {
        ppcanvasSetSize();
      };
      if (that.fireani === '1') {
        that.animate();
      }
    },
    animate() {
      const that = this;
      setInterval(() => {
        that.render();
        that.area();
      }, 1000 / 60);
    },
    render() {
      this.lzctx.clearRect(0, 0, this.lzcanvas.width, this.lzcanvas.height);
      for (let i = 0, len = this.particles.length; i < len; i += 1) {
        this.particles[i].draw();
        this.particles[i].update();
      }
    },
    area() {
      let n = 0;
      for (let i = 0, l = this.particles.length; i < l; i += 1) {
        if (this.particles[i].r > 1) {
          this.particles[(n += 1)] = this.particles[i];
        }
      }
      while (this.particles.length > Math.min(700, n)) {
        this.particles.pop();
      }
    },
    listenToUser() {
      let painting = false;
      let lastPoint = { x: undefined, y: undefined };
      const supportTouch = 'ontouchend' in document;
      if (supportTouch) {
        this.ppcanvas.ontouchstart = (e) => {
          this.firstDot = this.ppctx.getImageData(0, 0, this.ppcanvas.width, this.ppcanvas.height); // 在这里储存绘图表面
          painting = true;
          const x = e.touches[0].clientX;
          const y = e.touches[0].clientY;
          lastPoint = { x, y };
          this.ppctx.save();
          this.drawCircle(x, y, 0);
          if (this.fireani === '1') {
            this.makefire(e, 3 * Math.random());
          }
        };
        this.ppcanvas.ontouchmove = (e) => {
          if (painting) {
            const x = e.touches[0].clientX;
            const y = e.touches[0].clientY;
            const newPoint = { x, y };
            this.drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
            lastPoint = newPoint;
            this.hadpaint = true;
            if (this.fireani === '1') {
              this.makefire(e, 3);
            }
          }
        };
        this.ppcanvas.ontouchend = () => {
          this.painting = false;
        };
      } else {
        this.ppcanvas.onmousedown = (e) => {
          this.firstDot = this.ppctx.getImageData(0, 0, this.ppcanvas.width, this.ppcanvas.height); // 在这里储存绘图表面
          this.painting = true;
          const x = e.clientX;
          const y = e.clientY;
          lastPoint = { x, y };
          this.ppctx.save();
          this.drawCircle(x, y, 0);
          if (this.fireani === '1') {
            this.makefire(e, 3 * Math.random());
          }
        };
        this.ppcanvas.onmousemove = (e) => {
          if (this.painting) {
            const x = e.clientX;
            const y = e.clientY;
            const newPoint = { x, y };
            this.drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y, this.clear);
            lastPoint = newPoint;
            this.hadpaint = true;
            if (this.fireani === '1') {
              this.makefire(e, 3);
            }
          }
        };
        this.ppcanvas.onmouseup = () => {
          this.painting = false;
        };
        this.ppcanvas.mouseleave = () => {
          this.painting = false;
        };
      }
    },
    drawCircle(x, y, radius) {
      this.ppctx.save();
      this.ppctx.beginPath();
      this.ppctx.arc(x, y, radius, 0, Math.PI * 2);
      this.ppctx.fill();
      if (this.clear) {
        this.ppctx.clip();
        this.ppctx.clearRect(0, 0, this.ppcanvas.width, this.ppcanvas.height);
        this.ppctx.restore();
      }
    },
    drawLine(x1, y1, x2, y2) {
      this.ppctx.lineWidth = this.lWidth;
      this.ppctx.lineCap = 'round';
      this.ppctx.lineJoin = 'round';
      if (this.clear) {
        this.ppctx.save();
        this.ppctx.globalCompositeOperation = 'destination-out';
        this.ppctx.moveTo(x1, y1);
        this.ppctx.lineTo(x2, y2);
        this.ppctx.stroke();
        this.ppctx.closePath();
        this.ppctx.clip();
        this.ppctx.clearRect(0, 0, this.ppcanvas.width, this.ppcanvas.height);
        this.ppctx.restore();
      } else {
        this.ppctx.moveTo(x1, y1);
        this.ppctx.lineTo(x2, y2);
        this.ppctx.stroke();
        this.ppctx.closePath();
      }
    },
    chooseColor(e) {
      console.log(e.color);
      this.activeColor = e.color;
      this.ppctx.fillStyle = this.activeColor;
      this.ppctx.strokeStyle = this.activeColor;
    },
    getColor() {
      this.ppctx.fillStyle = this.activeColor;
      this.ppctx.strokeStyle = this.activeColor;
    },
    makefire(e, n) {
      const x = e.clientX || e.touches[0].pageX;
      const y = e.clientY || e.touches[0].pageY;
      for (let i = 0; i < n; i += 1) {
        this.spawn(x, y);
      }
    },
    spawn(x, y) {
      const particle = new this.Particle();
      particle.init(x, y);
      this.particles.push(particle);
    },
    handelIptChange(e) {
      console.log(e);
      this.lWidth = e.target.value;
    },
    resetCanvas() {
      this.ppctx.clearRect(0, 0, this.ppcanvas.width, this.ppcanvas.height);
      this.hadpaint = false;
    },
    confirm() {
      if (!this.hadpaint) {
        this.$toast.center('请先签名!');
        return;
      }
      this.resultImg = this.ppcanvas.toDataURL('image/png');
      this.$loading('发送中...');
      this.uploadPhoto()
        .then((res) => {
          return sendBubbleSignText(res.filePath);
        })
        .then((res2) => {
          console.log(res2);
          this.$loading.close();
          this.ppctx.clearRect(0, 0, this.ppcanvas.width, this.ppcanvas.height);
          this.hadpaint = false;
          this.resultImg = '';
          this.$toast.center('上传成功!');
        })
        .catch((err) => {
          console.log(err);
          this.$loading.close();
          this.ppctx.clearRect(0, 0, this.ppcanvas.width, this.ppcanvas.height);
          this.hadpaint = false;
          this.resultImg = '';
          this.$toast.center('上传失败!');
        });
    },
    uploadPhoto() {
      const formData = new FormData();
      const arr = this.resultImg.split(',');
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      /* eslint-disable */
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      const file = new File([u8arr], 'photo');
      formData.append('file', file);
      formData.append('prefix', 'bubbleSign');
      return uploadPhoto(formData);
    },
  },
  beforeDestroy() {
     window.location.reload();
  },
};
</script>
<style lang="less" scoped>
.bubbleSign-wrap {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-image: url('../../assets/image/bubbleSign/bg.png');
  background-size: 100% 100%;
  canvas {
    background-color: transparent;
    position: fixed;
    display: block;
    cursor: crosshair;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    overflow: hidden;
  }
  .color-group {
    position: fixed;
    width: 50px;
    left: 30px;
    top: 50%;
    transform: translateY(-50%);
    ul {
      list-style: none;
      li {
        width: 50px;
        height: 50px;
        margin: 10px 0;
        border-radius: 50%;
        box-sizing: border-box;
        border: 3px solid white;
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
        cursor: pointer;
        transition: 0.3s;
        &.active {
          box-shadow: 0 0 15px #00ccff;
        }
      }
    }
  }
  .range-wrap {
    position: fixed;
    top: 50%;
    right: 30px;
    width: 50px;
    height: 150px;
    margin-top: -75px;
    input {
      transform: rotate(-90deg);
      width: 28vw;
      height: 0vw;
      margin: 0;
      transform-origin: 75px 75px;
      border-radius: 15px;
      appearance: none;
      outline: none;
      position: relative;
      &::after {
        display: block;
        content: '';
        width: 0;
        height: 0;
        border-color: transparent #0cf transparent transparent;
        border-style: solid;
        border-width: 1vw 28vw 1vw 0;
        position: absolute;
        left: 0;
        top: -0.7vw;
        border-radius: 2vw;
        z-index: 0;
      }
      &::-webkit-slider-thumb {
        appearance: none;
        height: 25px;
        width: 25px;
        margin-top: 3px;
        background: #ffffff;
        border-radius: 50%;
        box-shadow: 0 0 8px #00ccff;
        position: relative;
        z-index: 999;
      }
    }
  }
  .tools {
    position: fixed;
    left: 0;
    bottom: 25px;
    width: 100%;
    justify-content: space-between;
    button {
      width: 150px;
      background-color: rgba(255, 255, 255, 0.7);
      border: 1px solid #eee;
      outline: none;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      color: #ccc;
      line-height: 60px;
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
      transition: 0.3s;
      margin: 0 25px;
      font-size: 32px;
      border-radius: 12px;
      &.active,
      &:active {
        box-shadow: 0 0 15px #00ccff;
        color: #00ccff;
      }
    }
    .clear {
      background-color: #fff;
    }
    .save {
      background-color: #4886ff;
      color: #fff;
    }
  }
  .resultImg {
    position: absolute;
  }
}
</style>
