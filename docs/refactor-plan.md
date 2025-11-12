# Joymew 互动体系重构方案

## 1. 当前架构快照

### 1.1 微信 H5 核心（`joymew-h5`）
- Vue2 单页应用通过 `src/router/index.js` 暴露签到、红包雨、游戏、酒店预定、充值等 60+ 页面，是未来要承载全部能力的主体 (joymew-h5.md:7700)。
- `src/store/modules/live.js` 与 `src/store/modules/app.js` 保存活动/用户/设备/场景等状态，包含红包口袋、座位表、送礼抽奖、婚礼堂专属配置等所有互动元素 (joymew-h5.md:4775, 7089)。
- 网络层 `src/utils/request.js` 与 `src/utils/requestMp.js` 直接从 URL 读取 `token` 并透传 `appid`，说明 H5 目前默认运行在小程序 WebView 里，由壳子负责注入凭证 (joymew-h5.md:2744, 2831)。这正是即将被移除的耦合点。
- `src/utils/service.js` 的 `getGameInfoByGameCode` 在小程序环境下仍大量返回 `enterType === 'mp'` 的页面跳转，暴露出哪些游戏尚未完成 H5 化 (joymew-h5.md:8243)。
- `src/utils/wxApi.js` 负责判断运行环境、调用 JSSDK 支付、在需要时通过 `wx.miniProgram.navigateTo` 跳回壳子 (joymew-h5.md:3307)。即将重构为纯 JSSDK / 浏览器实现。

### 1.2 小程序壳子

> 本次重构聚焦 `joymew-h5`，各类小程序壳子将保持现状，仅作为现网流量入口提供参考，不在重构范围内改动；迁移范围限定为 `joymew-mp` 中现有能力对 H5 的补齐，其他壳子的独有功能暂不处理。

#### 互动主壳 (`joymew-mp`, 覆盖嗨猫/嗨喵/嗨喵跃动)
- `pages/joymewIndex/joymewIndex.js` 完成扫码/分享进入后的 liveId 解析、签到、强制手机号、身份选择等逻辑，并在完成后跳至 WebView (joymew-mp.md:43066, 36731)。
- `appGlobalData/splidInfo` 负责拼出 `spidInfo_liveH5Path = https://shm.hudongmiao.com/?liveId=...&token=...&mpType=...` 并缓存，用于 `pages/live/live.wxml` `<web-view>` 直接承载 H5 (joymew-mp.md:43066, 18381)。
- `pages/pay/pay.js` + `api/pay.js` 把所有充值/送礼/点歌/喵钻/霸屏等支付场景聚合在小程序侧，底层通过 `wx.requestPayment` 调起微信支付 (joymew-mp.md:36731, 32633)。
- 包结构：`packageA/B/C` 分别包含红包口袋、照片墙、投诉、协议、外链 WebView 等功能，其中协议/照片墙等已经纯 WebView 嵌入 H5 (joymew-mp.md:5642, 8020)；`packageGame` 仍有喊红包、红包墙、开宝箱等原生小游戏。

#### 婚礼堂壳 (`joymew-mp-hlt`)
- 仅作为独立婚礼堂业务入口保留，本次重构不会迁移其特有页面与逻辑；相关 WebView 与埋点改造留待后续专项处理 (joymew-mp-hlt.md:23430, 37134)。

#### 同庆楼壳 (`joymew-mp-tql`)
- 继续维持现网裁剪形态，仅为参考渠道，所有定制能力不纳入本次 joymew-mp → joymew-h5 迁移范围 (joymew-mp-tql.md:1200)。

#### 字节/抖音壳 (`joymew-mp-tt`)
- 保留现状以支撑旧渠道流量，重构阶段不再关注其独有流程与页面，后续若有需求将单独立项 (joymew-mp-tt.md:477, 4487, 5622)。

### 1.3 关键耦合点
- **Token/Session**：H5 依赖壳子在 URL 中注入 `token/mpType/userPhone`，否则 `axios` 请求直接返回 401 (joymew-h5.md:2748, 2831)。
- **支付**：仅在小程序 `reqWxPay` 中实现，H5 通过 `wxApi.pay` 只是 JSSDK 封装但仍假设 WebView 注入的支付参数来自壳子 (joymew-mp.md:32633, joymew-h5.md:3309)。
- **小游戏**：`hmPlay2/3/4/5/15/16/30/31` 等编码仍走小程序页面 (joymew-h5.md:8243-8438)。
- **多壳差异**：婚礼堂/同庆楼需要 `isHlt` 标识、抖音壳需要 `followAwemeState` 等扩展字段，当前由各壳子的 `storage` 或 `globalData` 管 (joymew-mp-hlt.md:23430, joymew-mp-tt.md:4487)。

## 2. 主要痛点
1. **H5 入口不可独立**：没有小程序注入的 token，H5 无法初始化 store 与接口；同样 `wxApi.judgeEnv` 默认存在微信/抖音容器 (joymew-h5.md:3307)。
2. **支付与钱包深度绑定壳子**：所有支付场景集中在 `pages/pay/pay.js`，H5 无法直接调起，导致红包口袋、嘉年华等能力必须回到壳里 (joymew-mp.md:36731)。
3. **小游戏与 WebView 互跳复杂**：`getGameInfoByGameCode` 要根据环境拼接 `mp` 路径并通过 `wx.miniProgram.navigateTo` 跳转，且部分游戏需要频繁刷 token (joymew-h5.md:8243)。
4. **多壳配置分散**：`setIsHlt`、`setOrigin`、`followAwemeState` 等在不同项目重复实现，H5 难以识别具体入口差异 (joymew-mp-hlt.md:37134, joymew-mp-tt.md:4487)。
5. **调试/审核模式混杂**：`appGlobalData/splidInfo` 内置 `useDevPageHost`、`LIVEID` 等逻辑，H5 也有 `EXAMINELIVID` 常量，后续维护困难 (joymew-mp.md:43066, joymew-h5.md:4775)。

## 3. 目标蓝图（纯微信 H5 形态）
1. **彻底剥离小程序依赖**：删除所有 `wx.miniProgram`、`mpType`、`requestMp`、`ttjssdk` 等调用，统一改为纯 H5/公众号能力，旧逻辑仅保留在独立分支以便回归。
2. **H5 自主登录**：H5 能在公众号网页环境中独立完成授权、token 申请与缓存，兼容扫码进入的 `liveId` 和后端分配的业务 token。
3. **支付中台化**：在 H5 内封装统一微信 JSAPI 支付，确保不再依赖小程序支付页，并同步移除抖音等非微信通道的兼容逻辑；小程序壳子保持现状，仅作为旧体验的入口，不参与改造。
4. **业务模块完全 H5 化**：所有互动游戏、红包口袋、充值、投诉、酒店预定等均在 H5 内实现；微信 H5 已具备录音、摄像等权限，像喊红包这样的语音玩法也纳入本次迁移范围，仅极少数确无公众号 API 支撑的能力才考虑暂留壳子兜底。
5. **保持与大屏联动的模块调度**：Joymew 业务中，大屏项目通过 WebSocket 指令决定 H5 哪些互动模块可以被唤起。重构后的 H5 继续监听大屏的事件流来控制模块展示，不再额外引入新的本地化功能矩阵；删除历史上为多壳差异准备的配置开关，避免重复维护。
6. **双容器蓝绿发布**：生产新增独立容器/域名承载“新 H5”，旧域名继续服务存量活动，通过活动白名单逐步切换，保证回滚能力。

## 4. 迁移路线（建议 5 个阶段）

### 阶段 0：盘点与能力边界
- 输出「功能 × 渠道 × 依赖」盘点，确认哪些依赖 `wx.openChannels`、蓝牙、录音等必须保留壳内；同步标记出所有需完整迁入 H5 的模块（包括具备录音能力的喊红包，参见 `packageGame/pages/shoutHb/modules/game`，joymew-mp.md:43146）。
- 梳理大屏 WebSocket 指令集与 H5 事件映射，确保每个互动模块在纯 H5 中仍由大屏统一调度；只保留与 joymew-mp 公共能力相关的字段，移除为其他壳子准备的差异化注入。

### 阶段 1：身份认证改造
1. **删减小程序入口代码**：移除 `src/utils/requestMp.js`、`wx.miniProgram.*` 分支、`mpType` 判断、`ttjssdk`、抖音 `tt.*` 兼容层等文件，仅保留纯浏览器和微信公众网页的处理，保证代码结构清晰。
2. **实现统一登录流程**：基于下文《纯 H5 启动流程》描述，实现从路由守卫到 whoAmI 校验、401 触发微信授权、code 换取业务 token 全流程。`request.js` 改为从本地存储读取业务 token，并在 401 时触发登录态清理。
3. **开放环境检测**：增强 `wxApi.judgeEnv`，仅保留「微信内置浏览器」与「普通浏览器」分支，普通浏览器给出指引提示，禁止继续使用小程序能力。
4. **双栈联调**：在新容器上部署裁剪后的 H5 版本，与后端联通 `/whoAmI`、`/api/login-by-wechat`、`/getCheckInStatus` 等接口，验证 H5 可独立运行；旧版保留在原域名以支持存量用户。

#### 纯 H5 启动流程
1. **进入任意业务路由**：路由守卫触发，从本地存储尝试读取业务 token；若不存在则直接跳转登录页，同时记录 `redirect`。
2. **调用 `/whoAmI`**：若存在 token，将 `Authorization: Bearer <token>` 附带给业务后端。
3. **token 有效**：后端返回用户信息，前端写入 `store.user`，随后发起 `/getCheckInStatus` 等业务请求并渲染页面。
4. **token 失效/过期**：后端返回 401，路由守卫捕获后清理本地 token，跳转登录页并附带 `redirect`。
5. **用户点击「微信登录」**：前端根据配置重定向至微信 OAuth2 授权页，附带 `redirect_uri`（为登录页所在 URL）。
6. **微信授权回跳**：用户在微信页面授权后，微信将带 `code` 的 URL 重定向回登录页。
7. **解析授权码**：登录页加载时解析 URL `code`，随后调用后端现有的 `h5UserLogin/method1`（可类比“登录接口”）将 `code` 发送给业务服务器。前端只需关心该接口的入参/返回体。
8. **后端换取微信 token 并签发业务 token**：`h5UserLogin/method1` 内部会完成 OAuth2 `code` 换取微信 token/openid、生成业务 token 并返回，所有与微信服务器的交互细节都在该接口内封装。
9. **前端存储 token 与重定向**：前端拿到新的业务 token 写入 localStorage，同步更新 `store.app.token`，然后根据 `redirect` 参数跳回原页面并重新触发 `/whoAmI`。
10. **后续请求复用 token**：所有 API 请求从统一的 `request.js` 中读取 token，若再次收到 401，重复步骤 4 起的流程。

### 阶段 2：支付与钱包
1. **支付参数服务**：把现有小程序 `originPay` 场景拆成后端 API（返回支付参数 + 成功后需要触发的业务），H5 直接调用，彻底删除 WebView 与小程序之间的支付参数透传 (joymew-mp.md:36731)。
2. **H5 微信支付 SDK**：封装 `WxPayService`，统一调用 `wx.chooseWXPay`（参考 `wxApi.pay`，joymew-h5.md:3309），内置失败重试、取消回调等机制。
3. **钱包/红包口袋迁移**：将 `packageA/pages/hbkdRecharge` 的 UI/逻辑迁入 H5 `views/hbkdRecharge`，并复用新支付服务 (joymew-mp.md:32370)。
4. **验证**：对照原 `reqDiamondRecharge`、`reqSendGiftGameRecharge` 等接口，补齐 H5 调用链 (joymew-mp.md:32633)。
5. **蓝绿切流**：支付链路打通后，先让单个渠道/活动切到新 H5，持续监控支付成功率与退款率，确认稳定再扩大范围。

### 阶段 3：小游戏与模块迁移
1. **WebGL/Canvas 游戏评估**：针对 `hmPlay2/3/4/5/15/16/30/31` 等仍走小程序的游戏，评估是否有现成 H5 版本或需要重写；微信 H5 已具备录音、摄像等权限，因此包括喊红包在内的语音互动需要完整迁入 H5，仅对确实缺乏公众号 API 的极少数特性保留壳内兜底。
2. **功能拆迁顺序**：按照业务影响逐个迁移，例如：
   - 红包墙/开宝箱：与支付联动紧密，优先迁移。
   - 猜红包/争分夺秒：依赖 WebSocket +支付，作为下一批。
   - 喊红包：基于微信网页录音能力重新实现，确保与现有小程序玩法体验一致。
3. **抖音壳特性**：完全删除 H5 代码中的抖音兼容与 `tt` SDK 逻辑，保留壳子侧既有实现作为历史入口即可，后续如需抖音能力将另起项目复盘。

### 阶段 4：H5 体验打磨
1. **统一导航与状态**：梳理所有 H5 路由的顶部导航、Tab、浮层交互，剔除依赖小程序环境的入口提示，补充纯 H5 的空状态与异常态。
2. **离线与网络弱提示**：复用现有 `store.app`，在纯 H5 场景增加网络检测、重试机制，避免脱离壳子后缺少兜底。
3. **资产与静态资源整合**：统一加载音频、模型、动效等资源到 CDN，确保喊红包等大资源模块在纯 H5 也能按需预加载。

### 阶段 5：发布与监控
- **灰度**：按活动类型/渠道逐步切流，确保 H5 自主登录与支付链路稳定。
- **埋点/告警**：在 H5 增加登录/支付/游戏等核心指标监控，保持与 `joymew-mp` 壳子埋点的对齐关系（如 `browseRecord` 的进入/离开事件, joymew-mp.md:18381），但无需改动壳子代码。
- **开发者体验**：简化本地启动流程，允许独立运行 H5（本地 mock token），并提供命令行脚本模拟壳子注入参数的场景。

#### 模块迁移优先级示例

| 模块 | 当前承载 | 迁移策略 | 依赖/备注 |
| --- | --- | --- | --- |
| 签到入口 | `pages/joymewIndex/joymewIndex` (joymew-mp.md:43066) | H5 实现扫码进入页，壳子沿用现有授权 & 跳转 | 需保留 `sceneType/identitySwitch` 配置 |
| 支付/充值 | `pages/pay/pay.js` + `api/pay.js` (joymew-mp.md:36731, 32633) | H5 支付 SDK，壳子保留历史 Pay fallback 不改动 | 高风险，需与财务对齐 |
| 红包口袋 | `packageA/pages/hbkdRecharge` (joymew-mp.md:32370) | 迁入 `views/hbkdRecharge` 并复用新支付 | UI 已有 H5 版本，可复用 |
| 现场照片/协议等 WebView | `packageC/*` (joymew-mp.md:5642, 8020) | H5 内统一入口，壳子维持现有外链能力 | 低风险 |
| 婚宴预定 | `pages/hotelReserve/*` (joymew-mp-hlt.md:23430) | 维持壳子 WebView 方案，本次迁移不改动，待后续婚礼堂专项评估 | 非 joymew-mp 范畴 |
| 抖音关注引导 | `joymew-mp-tt` (joymew-mp-tt.md:4487) | H5 下线 `tt` 兼容代码，壳子保持历史实现 | 纯微信 H5 范围内不再维护 |
| 小游戏 `hmPlay2/5/15/16/30/31` | `getGameInfoByGameCode` (joymew-h5.md:8243) | 逐个重写或保留小程序页 | 涉及资产与特效 |

## 5. 风险与对策
1. **支付合规风险**：H5 发起的 JSAPI 需要公众号资质，并区分服务号/小程序；需确认业务主体与支付商户一致。可在小程序壳保留支付兜底，确保审核通过前不放量。
2. **录音/传感器能力验证**：虽然微信网页已开放录音能力，仍需与后端/运营确认公众号资质、授权范围及上传链路，保障喊红包等语音玩法迁移后的稳定性；如遇极端场景缺乏 API 支撑，再评估兜底方案。
3. **多渠道差异**：婚礼堂/同庆楼等壳子保留独立形态，本次仅针对 joymew-mp 公共能力；如需支持其专属需求，将在后续专项中独立梳理。
4. **历史活动兼容**：部分老活动依赖 `mpType` 等小程序参数区分皮肤，H5 需要在不恢复耦合的前提下提供映射与数据迁移策略。
5. **包体与审核**：虽不直接改动壳子，但 H5 下线小程序依赖后仍需关注壳子发版节奏，确保保留必要的隐私合规组件（如 `privacyAuthorize`，joymew-mp.md:18370）。
6. **双容器一致性**：新旧 H5 容器需在配置、静态资源、监控上保持同步，避免出现“同一活动在不同域名体验不一致”或缓存错乱；必要时引入版本号对齐和文件指纹校验。

## 6. 验证与交付标准
1. **功能验收清单**：登录、签到、送礼/充值、红包口袋、酒店预定、小游戏、投诉/协议、婚礼堂专区等全部可在纯 H5 环境完成，抖音相关入口已确认下线。
2. **回归用例**：对照 `getGameInfoByGameCode` 枚举的所有 gameCode 做全量回归，确保 `enterType` 均为 `h5/popup/thirdParty`，只有保留的极少数仍为 `mp` (joymew-h5.md:8243)。
3. **自动化验证**：新增冒烟脚本，模拟不同渠道的 URL 参数组合，验证 token 注入、支付调起、WebSocket 连接等关键路径。
4. **壳子回退策略**：在小程序中保留 `useLegacyH5` 开关，一旦 H5 新逻辑异常，可快速切换到旧模式；开关指向旧容器 URL，以蓝绿方式秒级回滚。

> 以上计划聚焦 `joymew-h5` 的逐模块迁移与纯 H5 化，壳子保持现状作为入口参考。后续可根据业务优先级对阶段任务做更细的排期与资源分配。
