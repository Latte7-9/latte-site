# ☕ Latte — 个人网站

> 泪流满面算不算是一种生理盐水湿敷全脸

基于 **Next.js 15** + **Tailwind CSS v4** 构建的咖啡主题个人网站。

## 技术栈

- **框架**: Next.js 15 (App Router, SSG)
- **样式**: Tailwind CSS v4
- **字体**: Playfair Display (标题) + Inter (正文) + JetBrains Mono (辅助)
- **部署**: GitHub Pages

## 开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 启动生产服务
pnpm start
```

## 项目结构

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx            # 首页
│   ├── layout.tsx          # 根布局（字体加载）
│   ├── globals.css         # 设计系统 + 全局样式
│   ├── blog/               # 博客路由
│   │   ├── page.tsx        # 博客列表
│   │   └── [slug]/page.tsx # 文章详情
│   └── interests/          # 兴趣子页面
│       ├── photography/
│       ├── books/
│       ├── hobbies/
│       └── hiking/
├── components/             # UI 组件
├── data/                   # 站点数据
├── hooks/                  # 自定义 hooks
```

## 设计系统

### 配色

| Token | 色值 | 用途 |
|-------|------|------|
| `--color-cream` | `#faf6f1` | 页面底色 |
| `--color-cream-warm` | `#f3ece4` | 交替 section 背景 |
| `--color-latte` | `#c4956a` | 主强调色 |
| `--color-latte-dark` | `#8a6540` | 按钮/深色强调 |
| `--color-espresso` | `#3d2e1f` | 深色 section 背景 |
| `--color-sage` | `#7a8b6f` | 自然元素点缀 |

### 字体

- **Playfair Display** — 大标题、品牌名
- **Inter** — 正文、导航、UI
- **JetBrains Mono** — 日期、标签

## 部署

### GitHub Pages

1. 将代码推送到 `Latte7-9/latte-site` 仓库的 `main` 分支
2. GitHub Actions 会自动构建并部署到 `https://latte7-9.github.io/latte-site/`

### Vercel（推荐）

1. 导入项目到 Vercel
2. 自动检测 Next.js 配置，一键部署
3. 支持 Edge Functions、图片优化等 Vercel 特性

## 旧站迁移

旧站代码在上一级目录 `../`，包含：
- 原始 HTML 文件
- 网易云音乐 API 服务
- GitHub 管理后台

新站已迁移的核心功能：
- ✅ 首页（Hero / About / Blog / Interests / Currently / Guestbook / Contact）
- ✅ 博客列表 + 文章详情
- ✅ 兴趣子页面（摄影 / 书籍 / 三分钟热度 / 登山）
- ✅ 鸭子留言板（保留并美化）
- ✅ 滚动入场动画
- ✅ 响应式设计
- ⏳ 网易云音乐（待接入）
- ⏳ 管理后台（待开发）