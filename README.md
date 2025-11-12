# 项目名说明
- 互动H5，内嵌在互动小程序之中，是互动小程序的核心
- 被多场景使用，可以作为独立的H5互动、也可以作为小程序的核心(这是最主要的场景)
- 被互动小程序(嗨猫互动、嗨喵乐动、嗨喵互动)、同庆楼小程序、婚礼堂小程序、抖音小程序内嵌

## 1.1 关于小程序和H5的通信
小程序->H5: webview url带参
H5->小程序: 跳转原生小程序页面带参
- **涉及到的场景**
用到原生支付能力的情况下，互动H5需要跳转到原生小程序页面
```
H5跳转到原生游戏界面：
  扭一扭：
  转一转：

```

## 项目访问地址
http://dev.joymew.com:1024/?liveId=a6bda4e0d3d44f6fb35354eaf06e9f7e&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHQiOjE3NDgxNzI3OTAyNjIsInVpZCI6IjgwNGFlMGY2NzEyZTQ5OGE5ZmI0ZDVhOTQwM2Y2NDk4IiwiaWF0IjoxNzQ3ODIyMzMyNDA2fQ.OTqpgCy-g0xPaAPUjgIPyhre0xopBr4gSxSRuf6tYSU&time=1747822337975&mpType=haimao