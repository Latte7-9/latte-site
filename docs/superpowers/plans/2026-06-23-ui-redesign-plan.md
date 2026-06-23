# Latte UI 大改造 — 实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 将 Latte 个人网站从暗色科技风改造为毛玻璃赛博 x 霓虹暗夜风格，保留全部功能，GSAP 重写动效

**Architecture:** 原生 HTML/CSS/JS 架构不变。CSS 按板块模块化拆分。JS 按功能拆分。GSAP 3.x 替代 Anime.js。CSS 自定义属性驱动主题系统。

**Tech Stack:** HTML5, CSS3 (backdrop-filter, mask-composite, CSS custom properties), GSAP 3.x + ScrollTrigger, WebGL

---

## Phase 0: 前置安全操作

### Task 0.1: 存档当前版本 + 创建开发分支

- [ ] git pull origin main
- [ ] git checkout -b codex/archive-latte-v2
- [ ] git add -A && git commit -m "archive: Latte v2.0 snapshot before UI redesign"
- [ ] git push origin codex/archive-latte-v2
- [ ] git checkout -b codex/ui-redesign-v3

---

## Phase 1: 基础设施搭建

### Task 1.1: CSS 设计令牌 (tokens.css)

创建 css/tokens.css, 定义 CSS 自定义属性:
- 霓虹色彩: --neon-pink: #ff3d71, --neon-cyan: #00d4aa, --neon-gold: #ffb800
- 背景: --bg-deep: #0a0a0a, --bg-card: rgba(255,255,255,0.03)
- 边框: --border-subtle, --border-glow, --border-gradient
- 文字: --text-primary (#fff), --text-body (#ccc), --text-muted (#999)
- 毛玻璃: --glass-blur: 16px, --glass-bg, --glass-border
- 圆角: --radius-sm 8px, --radius-md 12px, --radius-lg 16px
- 间距: --section-gap: 4rem, --card-padding: 1.2rem
- 动效: --ease-default, --ease-bounce, --duration-fast/normal/slow

### Task 1.2: 全局基础样式 (base.css)

创建 css/base.css:
- CSS reset, body 基础样式
- 微噪点纹理 (body::after SVG 噪点, opacity 0.035)
- 自定义霓虹光标 (#neon-cursor)
- 阅读进度条 (#reading-progress)
- 毛玻璃卡片基础类 (.glass-card)
- 渐变边框卡片 (.gradient-border-card, ::before mask-composite)
- 3D 倾斜基础类 (.tilt-card)
- 淡入上浮 (.fade-up)
- 通用容器 (.section-container, .section-label)
- 按钮 (.btn-primary 渐变填充, .btn-ghost 透明描边)

### Task 1.3: 模块化 CSS 文件创建

创建空文件: css/nav.css, css/intro.css, css/about.css, css/blog.css, css/interests-books.css, css/music.css, css/guestbook.css, css/contact-footer.css, css/vinyl.css, css/responsive.css, css/text-effects.css

### Task 1.4: index.html CSS 引用更新

替换旧引用为:
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/base.css">
<link rel="stylesheet" href="css/intro.css">
<link rel="stylesheet" href="css/nav.css">
... (所有模块化 CSS)

---

## Phase 2: 入场动画 (墨滴扩散)

### Task 2.1: 入场层 HTML 重写

替换 #intro-layer 内容:
- .intro-bg (径向渐变光晕背景)
- .intro-blob (液态墨滴核心, gsap 动效目标)
- .intro-particles (霓虹粒子容器, JS 动态生成)
- .intro-content (标题 + 副标题 + 进入提示)
- 副标题: "记录 · 分享 · 三分钟热度"
- 移除旧 canvas#background, .shape-wrap

### Task 2.2: 入场层 CSS (intro.css)

- #intro-layer: fixed 全屏, z-index 2000, flex 居中
- .intro-blob: absolute, 蓝紫渐变, border-radius 动画目标
- .intro-particle: absolute, 霓虹色, box-shadow 发光
- .intro-title: 4rem/200 weight/letter-spacing 0.12em
- .intro-subtitle: 1rem/300 weight
- .intro-hint-arrow: 向下箭头 bounce 动画
- 移动端: 标题 2.2rem

### Task 2.3: 入场动画 GSAP 逻辑 (intro.js)

创建 js/intro.js:
1. createParticles(25): 动态生成 25 个随机霓虹色粒子
2. playIntroAnimation(): gsap.timeline 分 4 阶段
   - 0-0.5s: blob 从 0 膨胀到 80x80, opacity 0→0.4
   - 0.5-1.5s: blob 膨胀到 200x200, borderRadius 不规则变化
   - 1.5-2.5s: blob 剧烈扭曲, 250x180 ↔ 200x220
   - 2.5-3.2s: blob 放大到 400x400 淡出 + 粒子飘散 + 文字浮现
   - +0.3s: 进入提示淡入
3. switchToMain(): 入场层淡出 → 触发主页入场
4. initIntro(): 检查 sessionStorage, 绑定 click/wheel 事件

### Task 2.4: 替换 GSAP CDN

移除 Anime.js CDN, 添加:
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>

---

## Phase 3: 主页各板块

### Task 3.1: 导航栏 (nav.css + nav.js)

HTML: 悬浮毛玻璃卡片, 居中, Latte 品牌 + 首页/博客链接
CSS: position fixed, transform translateX(-50%), backdrop-filter blur(20px), 滚动微缩
JS: scroll 事件添加/移除 .scrolled 类

### Task 3.2: 关于我 (about.css)

HTML: 左头像(霓虹光环) + 右文字(名字/星座ENTP/个性签名)
CSS: flex 居中, 头像 100px 圆形 + border + box-shadow 霓虹

### Task 3.3: 博客预览 (blog.css)

HTML: 标题栏(博客 + 查看全部→) + 横向滚动卡片列表
CSS: flex overflow-x auto, scroll-snap, 卡片 min-width 240px, 渐变边框

### Task 3.4: 兴趣 + 书籍双栏 (interests-books.css)

HTML: CSS Grid 双栏, 左=兴趣标签云(霓虹药丸), 右=书籍小封面列表
CSS: grid-template-columns 1fr 1fr, 移动端 1fr; 兴趣标签 3 色循环; 书籍项 flex + 30x42 封面

### Task 3.5: 音乐板块 (music.css)

HTML: 居中卡片, 歌曲封面 + 歌名 + 艺术家 + 播放按钮
CSS: max-width 340px, text-align center

### Task 3.6: 留言板 (guestbook.css)

HTML: 水池容器(.gb-pool) + 水域渐变(.gb-water) + 鸭群(.gb-ducks) + 表单
CSS: 水域 bottom 渐变, 表单 flex 居中, input 毛玻璃底

### Task 3.7: 联系方式 + 页脚 (contact-footer.css)

HTML: 图标横排 + 邮箱 + 页脚
CSS: .contact-icon 44px 方块 hover 霓虹发光, footer 细线分隔

### Task 3.8: 黑胶唱片播放器 (vinyl.css + vinyl.js)

HTML: 悬浮卡片, 唱片旋转 + 信息区 + 关闭按钮
CSS: 毛玻璃底, 霓虹边框, 唱片旋转光晕
JS: 从 main.js 提取 initVinylPlayer 逻辑

---

## Phase 4: 动效与增强

### Task 4.1: 滚动动画 (scroll-anim.js)

创建 js/scroll-anim.js:
- ScrollTrigger 逐块淡入 (.fade-up → y:0, opacity:1)
- 多层视差 (.grid-background yPercent:20 scrub)
- 进度条更新 (#reading-progress width scrub)

### Task 4.2: 交互增强 (interactions.js)

创建 js/interactions.js:
- 3D 倾斜: mousemove → tilt-card perspective rotate
- 自定义光标: mousemove 跟随, hover 放大变色
- Hover 呼吸: gradient-border-card hover → 边框发光

### Task 4.3: 霓虹粒子 + 流光文字

- 修改 js/background.js 中颜色参数为霓虹色系
- css/text-effects.css: .text-shimmer 三色流动渐变
- 将 .section-label 改为使用 text-shimmer

---

## Phase 5: 整合与收尾

### Task 5.1: JS 入口整合

- 从 main.js 提取数据渲染逻辑到 js/data-render.js (renderHome, renderBlog, loadGuestbook, submitGuestbook)
- 创建 js/app.js 统一入口, DOMContentLoaded 初始化所有模块
- 更新 index.html script 标签顺序

### Task 5.2: 响应式适配 (responsive.css)

- @media (max-width: 768px): 间距缩小, 字号调整, 双栏变单栏
- @media (max-width: 480px): 表单纵向, 标题缩小

### Task 5.3: 本地预览

- node serve.js 启动本地服务器
- 逐项验证: 入场动画 / 板块渲染 / 滚动动效 / 移动端 / 留言板 / 黑胶 / 光标

### Task 5.4: 清理

- 确认后删除 css/style.css, js/main.js (旧文件)
- git add -A && git commit

---

## 验收标准

- [ ] 入场动画 3.2s 完整播放, 墨滴扩散 → 文字浮现
- [ ] 全部 11 个板块 + 黑胶播放器 + 留言板功能正常
- [ ] 8 项增强: 光标/呼吸/hover/粒子/噪点/3D/流光/进度条
- [ ] 桌面双栏 + 移动单栏响应式
- [ ] 本地预览通过, 用户确认后推线上
