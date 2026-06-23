# 管理后台重构 — 设计规格

> 日期：2026-06-23 | 项目：Project_001 个人网站搭建 | 状态：已确认

## 目标
为 `localhost:8760/index.html`（静态 Latte 个人网站）构建一个功能齐全的管理后台，
通过 GitHub API 直接读写仓库中的 JSON 数据文件，覆盖全站所有可编辑内容。

## 技术决策
- **单文件** `admin.html` + 配套 `css/admin.css` + `js/admin.js`
- **认证**：GitHub Personal Access Token + 仓库名（延续现有方案）
- **数据通道**：GitHub Contents API（GET 读取 + PUT 写入，b64 编解码）
- **风格**：Latte 配色（cream 底 #faf8f5, latte 主色, 圆角卡片, Inter 字体）

## 功能模块（9 个 Tab）

### 1. 🏠 站点信息
- 字段：name / tagline / about / email
- 数据路径：`data/site.json` 根字段
- about 支持 HTML（`<br>` 换行）

### 2. 📝 博客
- 文章增删改：title / date / summary / content（HTML 正文）
- 数据路径：`data/blog.json` → `posts[]`
- 内容编辑器带富文本工具栏（加粗/斜体/引用/链接/标题/分割线）
- 支持新建文章 + 删除确认

### 3. 🦆 留言板
- 查看所有留言（name / text / date）
- 逐条删除
- **同步本地留言**：将 localStorage 中的离线留言合并到线上
- 数据路径：`data/comments.json`

### 4. 📷 摄影
- 图集增删改：name / description / cover / images[]（一行一个路径）/ journal
- 数据路径：`data/site.json` → `interests[摄影].albums[]`
- 图片列表支持逐行编辑

### 5. 📖 书籍
- 三区管理：已读（read）/ 在读（reading）/ 想读（wantToRead）
- 每本书字段：title / author / cover / review
- 数据路径：`data/site.json` → `interests[书籍].read[] / reading[] / wantToRead[]`
- 区内可增删、跨区不可移动（保持简单）

### 6. ⛰️ 登山
- 已登顶（climbed）：name / date / note，增删改
- 想去（wantToClimb）：name / reason，增删改
- 登山日志（journal）：富文本编辑
- 数据路径：`data/site.json` → `interests[登山]`

### 7. ✨ 爱好
- 爱好列表（hobbies）：字符串数组，增删改
- 数据路径：`data/site.json` → `interests[三分钟热度].hobbies[]`

### 8. 🖼️ 图片
- 上传：选择本地文件 → b64 编码 → GitHub API 写入 `images/`
- 预览：缩略图网格展示已上传图片
- 删除：逐张删除
- 数据路径：GitHub `images/` 目录

### 9. 🎵 音乐同步
- 手动触发网易云缓存刷新
- 调用 Railway API：`POST /api/netease/sync`
- 显示当前缓存状态（歌曲数 / 更新时间）

## UI 布局
```
┌──────────────────────────────────────┐
│  🔐 登录面板（仓库名 + Token）         │
│  登录后隐藏，显示管理界面               │
├──────────────────────────────────────┤
│  Latte 管理后台          [连接状态]    │
│  ┌──┬──┬──┬──┬──┬──┬──┬──┬──┐      │
│  │站│博│留│摄│书│登│爱│图│音│      │
│  └──┴──┴──┴──┴──┴──┴──┴──┴──┘      │
│                                       │
│  ┌─────────────────────────────┐     │
│  │  Tab 标题 + 操作按钮区       │     │
│  │  ─────────────────────      │     │
│  │  表单 / 卡片列表 / 网格      │     │
│  │                             │     │
│  └─────────────────────────────┘     │
│                          [保存] [新建]│
└──────────────────────────────────────┘
```

## 数据流
```
用户操作 → admin.js 组装 JSON → b64 编码
  → GitHub API PUT (with sha) → GitHub 仓库更新
  → GitHub Pages 自动部署 → 线上生效

读取反之：GitHub API GET → b64 解码 → JSON.parse → 填充表单
```

## 文件清单
| 文件 | 说明 |
|------|------|
| `admin.html` | 入口页面（从现有 `admin.html` 重构） |
| `css/admin.css` | 管理后台专属样式 |
| `js/admin.js` | 管理后台逻辑（从现有 `admin.js` 重构） |

## 边界条件
- Token 无写入权限 → 提示用户检查 Token scope（需 `repo`）
- 网络错误 → 显示友好错误信息，不静默失败
- 并发编辑冲突（sha 不匹配）→ 提示刷新重试
- 博客 content 支持 HTML，需合理转义
- 所有删除操作二次确认

## 不做
- 不做用户登录系统（保持 GitHub Token）
- 不做 Currently 板块（已确认移除）
- 不做书籍跨区拖拽移动
- 不做图片批量上传
- 不做 Markdown 编辑器（保持 HTML 富文本）
