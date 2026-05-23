# Mizuki 项目 Code Wiki

## 目录

1. [项目概述](#项目概述)
2. [技术栈](#技术栈)
3. [项目结构](#项目结构)
4. [核心架构](#核心架构)
5. [关键模块详解](#关键模块详解)
6. [关键文件说明](#关键文件说明)
7. [配置系统](#配置系统)
8. [开发流程](#开发流程)
9. [常见问题](#常见问题)

---

## 项目概述

### 简介

**Mizuki** 是一个现代化、功能丰富的静态博客系统，基于 Astro 框架构建，支持 Markdown/MDX 内容创作，具有美观的界面设计和强大的功能。

### 主要特性

- ✨ 现代化的 UI 设计
- 📝 Markdown/MDX 支持
- 🔍 全文搜索 (Pagefind)
- 🎨 主题自定义
- 📱 响应式布局
- 🌍 多语言支持
- 💬 评论系统 (Twikoo/Giscus)
- 🎵 音乐播放器集成
- 📊 番剧追踪功能
- 📖 文章目录自动生成
- ⚡ 性能优化 (预加载、缓存等)

---

## 技术栈

### 核心框架

| 技术 | 版本/说明 | 用途 |
|------|----------|------|
| [Astro](https://astro.build) | 6.x | 静态站点生成框架 |
| [Svelte](https://svelte.dev) | 5.x | 交互式组件 (客户端) |
| [Tailwind CSS](https://tailwindcss.com) | 4.x | 样式系统 |

### 关键依赖

| 依赖 | 用途 |
|------|------|
| @astrojs/mdx | MDX 支持 |
| @astrojs/svelte | Svelte 集成 |
| @swup/astro | 页面过渡动画 |
| astro-expressive-code | 代码块增强 |
| pagefind | 全文搜索 |
| dayjs | 日期处理 |
| crypto-js | 加密功能 (文章加密) |
| @fancyapps/ui | 图片画廊 |

### 构建工具

- **Bun** - 包管理器和运行时
- **TypeScript** - 类型安全

---

## 项目结构

```
Mizuki/
├── public/                    # 静态资源目录
│   ├── assets/              # 资源文件
│   │   ├── anime/           # 番剧相关
│   │   ├── css/             # 样式文件
│   │   ├── font/            # 字体
│   │   ├── home/            # 首页资源
│   │   ├── music/           # 音乐相关
│   │   └── projects/        # 项目展示
│   ├── images/              # 图片资源
│   └── pio/                 # 看板娘资源
├── src/
│   ├── assets/              # 源码资源
│   ├── components/          # 组件目录
│   │   ├── atoms/          # 原子组件 (基础 UI)
│   │   ├── comment/        # 评论组件
│   │   ├── common/         # 通用组件
│   │   ├── control/        # 控制组件
│   │   ├── features/       # 功能特性组件
│   │   ├── layout/         # 布局组件
│   │   ├── misc/           # 杂项组件
│   │   ├── organisms/      # 有机组件 (复杂 UI)
│   │   └── widgets/        # 小部件组件
│   ├── constants/          # 常量定义
│   ├── content/            # 内容目录
│   │   ├── posts/          # 博客文章
│   │   └── spec/           # 特殊页面
│   ├── data/               # 静态数据
│   ├── i18n/               # 国际化配置
│   ├── layouts/            # 页面布局
│   ├── pages/              # 页面路由
│   ├── plugins/            # Astro 插件
│   ├── scripts/            # 客户端脚本
│   ├── stores/             # 状态管理
│   ├── styles/             # 样式文件
│   ├── types/              # TypeScript 类型定义
│   ├── utils/              # 工具函数
│   ├── config.ts           # 主配置文件
│   ├── content.config.ts   # 内容集合配置
│   └── env.d.ts            # 环境变量类型
├── scripts/                 # 构建脚本
├── docs/                    # 文档
├── .env.example            # 环境变量示例
├── astro.config.mjs        # Astro 配置
├── package.json            # 依赖配置
└── tsconfig.json           # TypeScript 配置
```

---

## 核心架构

### 页面架构

Mizuki 采用典型的 Astro 静态站点架构，主要包含：

```
页面请求
  ↓
Layout.astro (基础布局)
  ↓
MainGridLayout.astro (网格布局)
  ↓
具体页面组件 (如 PostPage)
  ↓
内容渲染
```

### 内容加载流程

```
1. 内容定义 (src/content/posts/)
   ↓
2. 内容集合配置 (src/content.config.ts)
   ↓
3. 内容获取 (getCollection, getSortedPosts)
   ↓
4. 页面路由生成 (getStaticPaths)
   ↓
5. 内容渲染 (Markdown.astro)
```

---

## 关键模块详解

### 1. 内容管理模块

#### 内容集合 (Content Collections)

**文件**: [`src/content.config.ts`](src/content.config.ts)

定义了两个内容集合：
- `posts` - 博客文章集合
- `spec` - 特殊页面集合

**Post Frontmatter 结构**:

```typescript
{
  title: string;           // 标题
  published: Date;         // 发布日期
  updated?: Date;          // 更新日期
  draft?: boolean;         // 是否草稿
  description?: string;    // 描述
  image?: string;          // 封面图
  tags?: string[];         // 标签
  category?: string;       // 分类
  lang?: string;           // 语言
  pinned?: boolean;        // 是否置顶
  comment?: boolean;       // 是否启用评论
  priority?: number;       // 优先级 (用于排序)
  author?: string;         // 作者
  sourceLink?: string;     // 来源链接
  licenseName?: string;    // 许可证名称
  licenseUrl?: string;     // 许可证链接
  
  // 加密相关
  encrypted?: boolean;     // 是否加密
  password?: string;       // 密码
  passwordHint?: string;   // 密码提示
  hideHomeContent?: boolean;
  
  // 链接相关
  alias?: string;          // 别名
  permalink?: string;      // 自定义永久链接
}
```

#### 文章排序规则

在 [`src/utils/content-utils.ts`](src/utils/content-utils.ts) 中定义：

1. 置顶文章 (pinned=true) 优先
2. 置顶文章按 priority 排序 (数值越小越靠前)
3. 其他按发布日期降序 (新的在前)

#### 工具函数

| 函数 | 说明 |
|------|------|
| `getSortedPosts()` | 获取排序后的文章列表 (含相邻文章信息) |
| `getSortedPostsList()` | 获取用于列表显示的文章数据 |
| `getTagList()` | 获取标签列表及计数 |
| `getCategoryList()` | 获取分类列表及计数 |
| `getRelatedPosts()` | 获取相关文章推荐 |

### 2. 文章显示流程

#### 详细流程说明

这是新接触项目的开发者最关心的部分！

**文件**: [`src/pages/posts/[...slug].astro`](src/pages/posts/[...slug].astro)

```
文章访问流程:

1. 路由匹配
   ↓
2. getStaticPaths() 执行
   - 调用 getSortedPosts() 获取所有文章
   - 为每篇文章生成路由
   - 处理 permalink 和 alias
   ↓
3. 页面组件接收 entry 参数
   ↓
4. 内容渲染准备
   - 调用 render(entry) 获取 Content 和 headings
   - 处理封面图 (本地/远程)
   - 准备 OG 图片
   ↓
5. 布局应用
   - MainGridLayout.astro
   - 包含 Navbar, Banner, Sidebar, Footer
   ↓
6. 文章内容显示
   - PostMeta (元信息: 日期、标签、分类等)
   - 可选: 封面图片
   - Markdown.astro (内容渲染)
   - 加密文章: Encryptor 组件包装
   ↓
7. 附加内容
   - ShareCard (分享卡片)
   - License (许可证)
   - LastModified (修改时间)
   - PostNavigation (上/下一篇)
   - RelatedPosts (相关文章)
   - RandomPosts (随机文章)
   - Comment (评论)
```

#### 核心组件层级

```
MainGridLayout (主布局)
  ├── Navbar (导航栏)
  ├── Banner (横幅)
  ├── SideBar (左侧边栏)
  │   ├── Profile (个人资料)
  │   ├── Announcement (公告)
  │   ├── Tags (标签)
  │   └── CardTOC (目录)
  ├── RightSideBar (右侧边栏)
  │   ├── SiteStats (站点统计)
  │   ├── Calendar (日历)
  │   ├── Categories (分类)
  │   └── MusicSidebar (音乐播放器)
  ├── MainContent (主内容)
  │   └── PostPage (文章页面)
  │       ├── PostMeta
  │       ├── Markdown (内容)
  │       ├── ShareCard
  │       ├── License
  │       ├── LastModified
  │       ├── PostNavigation
  │       ├── RelatedPosts
  │       └── RandomPosts
  ├── Footer (页脚)
  └── FloatingControls (悬浮控件)
```

### 3. Markdown 渲染模块

**文件**: [`src/components/misc/Markdown.astro`](src/components/misc/Markdown.astro)

Markdown 内容通过以下管道处理：

```
Markdown/MDX 源文件
  ↓
Remark 插件处理
  - remarkMath (数学公式)
  - remarkContent (内容处理)
  - remarkFixGithubAdmonitions
  - remarkDirective
  - remarkSectionize
  - remarkMermaid
  ↓
Rehype 插件处理
  - rehypeKatex (数学公式渲染)
  - rehypeExternalLinks (外部链接处理)
  - rehypeSlug (标题锚点)
  - rehypeWrapTable
  - rehypeMermaid
  - rehypeComponents (自定义组件)
  - rehypeAutolinkHeadings
  - rehypeImageWidth
  ↓
Expressive Code (代码块增强)
  ↓
最终 HTML
```

**文件**: [`astro.config.mjs`](astro.config.mjs) 中配置了完整的 Markdown 处理流程。

### 4. 布局系统

#### 基础布局

**文件**: [`src/layouts/Layout.astro`](src/layouts/Layout.astro)

提供：
- HTML 基础结构
- SEO Meta 标签
- 全局样式
- 全局脚本 (Swup, 主题切换等)
- 音乐播放器
- 看板娘 (Pio)
- 页面进度条

#### 网格布局

**文件**: [`src/layouts/MainGridLayout.astro`](src/layouts/MainGridLayout.astro)

核心布局组件，包含：
- 响应式网格系统 (左/中/右三栏)
- Banner 组件
- 侧边栏组件管理
- 全屏壁纸支持
- 目录 (TOC) 系统

### 5. 配置系统

**文件**: [`src/config.ts`](src/config.ts)

核心配置对象：

| 配置对象 | 说明 |
|----------|------|
| `siteConfig` | 站点基础配置 (标题、语言、主题色等) |
| `fullscreenWallpaperConfig` | 全屏壁纸配置 |
| `navBarConfig` | 导航栏配置 |
| `profileConfig` | 个人资料配置 |
| `licenseConfig` | 许可证配置 |
| `permalinkConfig` | 永久链接配置 |
| `expressiveCodeConfig` | 代码块配置 |
| `commentConfig` | 评论系统配置 |
| `shareConfig` | 分享功能配置 |
| `announcementConfig` | 公告配置 |
| `musicPlayerConfig` | 音乐播放器配置 |
| `footerConfig` | 页脚配置 |
| `sidebarLayoutConfig` | 侧边栏布局配置 |
| `sakuraConfig` | 樱花特效配置 |
| `pioConfig` | 看板娘配置 |
| `relatedPostsConfig` | 相关文章配置 |
| `randomPostsConfig` | 随机文章配置 |

#### 侧边栏配置系统

侧边栏采用配置驱动的组件加载机制：

```typescript
sidebarLayoutConfig: {
  properties: [
    { type: 'profile', position: 'top', ... },
    { type: 'announcement', position: 'top', ... },
    { type: 'music-sidebar', position: 'sticky', ... },
    // ... 更多组件
  ],
  components: {
    left: ['profile', 'announcement', ...],
    right: ['site-stats', 'calendar', ...],
    drawer: [...],
  },
  // ...
}
```

### 6. 路由系统

#### 页面路由结构

| 路由 | 文件 | 说明 |
|------|------|------|
| `/` | `src/pages/[...page].astro` | 首页/文章列表 |
| `/posts/[slug]` | `src/pages/posts/[...slug].astro` | 文章详情页 |
| `/[permalink]` | `src/pages/[...permalink].astro` | 自定义永久链接 |
| `/about` | `src/pages/about.astro` | 关于页面 |
| `/archive` | `src/pages/archive.astro` | 归档页面 |
| `/friends` | `src/pages/friends.astro` | 友链页面 |
| `/projects` | `src/pages/projects.astro` | 项目页面 |
| `/skills` | `src/pages/skills.astro` | 技能页面 |
| `/timeline` | `src/pages/timeline.astro` | 时间线页面 |
| `/anime` | `src/pages/anime.astro` | 番剧页面 |
| `/diary` | `src/pages/diary.astro` | 日记页面 |
| `/albums` | `src/pages/albums.astro` | 相册页面 |
| `/devices` | `src/pages/devices.astro` | 设备页面 |
| `/rss.xml` | `src/pages/rss.xml.ts` | RSS 订阅 |
| `/atom.xml` | `src/pages/atom.xml.ts` | Atom 订阅 |
| `/api/*` | `src/pages/api/*` | API 路由 |

#### 永久链接 (Permalink) 系统

支持灵活的链接配置：

1. **文章级 permalink**: 单篇文章自定义链接
2. **全局 permalink 模板**: 配置 `permalinkConfig.format` 支持占位符:
   - `%year%` - 年份
   - `%monthnum%` - 月份
   - `%day%` - 日期
   - `%hour%` - 小时
   - `%minute%` - 分钟
   - `%second%` - 秒
   - `%post_id%` - 文章序号
   - `%postname%` - 文章文件名
   - `%raw_postname%` - 原始文件名
   - `%category%` - 分类

**相关文件**: [`src/utils/permalink-utils.ts`](src/utils/permalink-utils.ts)

### 7. 搜索系统

基于 **Pagefind** 的全文搜索：

1. 构建时索引生成 (`pagefind --site dist`)
2. 客户端搜索组件 ([`Search.svelte`](src/components/organisms/navigation/Search.svelte))
3. 支持标题、内容、标签搜索

### 8. 评论系统

支持两种评论系统：

- **Twikoo** - 简洁的评论系统
- **Giscus** - 基于 GitHub Discussions 的评论系统

**组件**: [`src/components/comment/`](src/components/comment/)

### 9. 页面过渡 (Swup)

**文件**: [`src/scripts/swup-manager.ts`](src/scripts/swup-manager.ts)

使用 Swup 实现单页应用体验：

- 平滑页面过渡
- 页面缓存
- 预加载
- 保持滚动位置

### 10. 音乐播放器

**组件**: [`src/components/widgets/music-player/`](src/components/widgets/music-player/)

支持两种模式：
- **本地模式** - 本地音乐文件
- **Meting API** - 第三方音乐 API (网易云、QQ 音乐等)

---

## 关键文件说明

### 核心配置文件

| 文件 | 说明 |
|------|------|
| [`astro.config.mjs`](astro.config.mjs) | Astro 主配置，含 Markdown 插件配置 |
| [`src/config.ts`](src/config.ts) | 站点配置中心 |
| [`src/content.config.ts`](src/content.config.ts) | 内容集合 schema 定义 |
| [`package.json`](package.json) | 依赖和脚本 |

### 关键工具函数

| 文件 | 说明 |
|------|------|
| [`src/utils/content-utils.ts`](src/utils/content-utils.ts) | 内容处理工具 (排序、相关文章等) |
| [`src/utils/permalink-utils.ts`](src/utils/permalink-utils.ts) | 永久链接处理 |
| [`src/utils/url-utils.ts`](src/utils/url-utils.ts) | URL 处理工具 |
| [`src/utils/date-utils.ts`](src/utils/date-utils.ts) | 日期处理工具 |
| [`src/utils/grid-layout-utils.ts`](src/utils/grid-layout-utils.ts) | 网格布局计算 |

### 核心组件

| 组件 | 路径 | 说明 |
|------|------|------|
| Markdown | [`src/components/misc/Markdown.astro`](src/components/misc/Markdown.astro) | Markdown 内容渲染 |
| PostPage | [`src/components/features/posts/PostPage.astro`](src/components/features/posts/PostPage.astro) | 文章页面组件 |
| PostMeta | [`src/components/features/posts/PostMeta.astro`](src/components/features/posts/PostMeta.astro) | 文章元信息 |
| RelatedPosts | [`src/components/features/posts/RelatedPosts.astro`](src/components/features/posts/RelatedPosts.astro) | 相关文章 |
| SideBar | [`src/components/widgets/sidebar/SideBar.astro`](src/components/widgets/sidebar/SideBar.astro) | 侧边栏 |
| Navbar | [`src/components/organisms/navigation/Navbar.astro`](src/components/organisms/navigation/Navbar.astro) | 导航栏 |
| Banner | [`src/components/layout/Banner.astro`](src/components/layout/Banner.astro) | 横幅 |

---

## 配置系统详解

### 站点基础配置

编辑 [`src/config.ts`](src/config.ts):

```typescript
export const siteConfig: SiteConfig = {
  title: "你的博客标题",
  subtitle: "博客副标题",
  siteURL: "https://your-blog.com",
  siteStartDate: "2024-01-01",
  lang: "zh_CN", // 可选: en, zh_CN, zh_TW, ja
  
  themeColor: {
    hue: 240, // 0-360
    fixed: false,
  },
  
  // 特色页面开关
  featurePages: {
    anime: true,
    diary: false,
    friends: true,
    // ...
  },
  
  // ... 更多配置
};
```

### 导航栏配置

```typescript
export const navBarConfig: NavBarConfig = {
  links: [
    LinkPreset.Home,
    LinkPreset.Archive,
    {
      name: "自定义链接",
      url: "/custom",
      icon: "material-symbols:link",
      children: [
        // 子菜单
      ],
    },
  ],
};
```

### 侧边栏配置

```typescript
export const sidebarLayoutConfig: SidebarLayoutConfig = {
  properties: [
    {
      type: "profile",
      position: "top",
      class: "onload-animation",
      animationDelay: 0,
    },
    // ... 更多组件配置
  ],
  components: {
    left: ["profile", "announcement", "tags", "card-toc"],
    right: ["site-stats", "calendar", "categories", "music-sidebar"],
    drawer: [...],
  },
};
```

---

## 开发流程

### 环境准备

1. 安装依赖:
```bash
bun install
```

2. 复制环境变量 (可选):
```bash
cp .env.example .env
# 编辑 .env
```

3. 启动开发服务器:
```bash
bun run dev
```
访问 http://localhost:4321

### 创建新文章

方式 1: 使用脚本
```bash
bun run new-post "文章标题"
```

方式 2: 手动创建
在 `src/content/posts/` 下创建 `.md` 或 `.mdx` 文件:

```markdown
---
title: "我的新文章"
published: 2024-05-20
description: "文章描述"
tags: ["标签1", "标签2"]
category: "分类"
---

这里是文章内容...
```

### 常用命令

| 命令 | 说明 |
|------|------|
| `bun run dev` | 启动开发服务器 |
| `bun run build` | 构建生产版本 |
| `bun run preview` | 预览构建结果 |
| `bun run check` | Astro 类型检查 |
| `bun run type-check` | TypeScript 类型检查 |
| `bun run lint` | 代码检查并修复 |
| `bun run format` | 格式化代码 |
| `bun run sync-content` | 同步内容 (分离模式) |
| `bun run new-post` | 创建新文章 |

---

## 文章是如何显示在页面上的 (详细流程)

作为新接触项目的开发者，这是你最需要了解的部分！

### 完整流程

#### 1. 内容准备

文章存储在 [`src/content/posts/`](src/content/posts/) 目录，格式为 Markdown/MDX。

#### 2. 构建时路由生成

当运行 `bun run dev` 或 `bun run build` 时：

1. Astro 读取 [`src/content.config.ts`](src/content.config.ts) 了解内容结构
2. [`src/pages/posts/[...slug].astro`](src/pages/posts/[...slug].astro) 的 `getStaticPaths()` 函数执行
3. 调用 `getSortedPosts()` 获取所有文章并排序
4. 为每篇文章生成对应的路由参数

```typescript
// 简化的 getStaticPaths
export async function getStaticPaths() {
  const blogEntries = await getSortedPosts();
  return blogEntries.map(entry => ({
    params: { slug: removeFileExtension(entry.id) },
    props: { entry },
  }));
}
```

#### 3. 页面组件渲染

当访问 `/posts/my-article` 时：

**步骤 1**: Astro 路由匹配到 `[...slug].astro`，传入对应 `entry`

**步骤 2**: 渲染文章内容
```typescript
const { Content, headings } = await render(entry);
```
这里 `render()` 是 Astro 的内容渲染 API，会处理所有 Markdown/MDX 转换。

**步骤 3**: 应用布局
```astro
<MainGridLayout
  title={entry.data.title}
  headings={headings}
  ...
>
  <!-- 文章内容在这里 -->
</MainGridLayout>
```

**步骤 4**: MainGridLayout 构建完整页面
- 渲染 Navbar
- 渲染 Banner
- 渲染左侧边栏 (SideBar)
- 渲染右侧边栏 (RightSideBar)
- 渲染主内容区域

**步骤 5**: 主内容区域显示文章
```astro
<div id="post-container">
  <!-- 字数和阅读时间 -->
  <WordCount />
  <ReadingTime />
  
  <!-- 标题 -->
  <h1>{entry.data.title}</h1>
  
  <!-- 元信息 (日期、标签、分类) -->
  <PostMeta ... />
  
  <!-- 可选: 封面图 -->
  {entry.data.image && <Image ... />}
  
  <!-- Markdown 内容 -->
  <Markdown>
    <Content />
  </Markdown>
  
  <!-- 分享卡片、许可证、导航等 -->
</div>
```

**步骤 6**: Markdown 组件处理内容
[`Markdown.astro`](src/components/misc/Markdown.astro) 组件接收 `<Content />` (这是已渲染的 HTML)，并应用样式和交互功能 (如代码复制按钮)。

#### 4. 客户端交互

页面加载完成后：
- Swup 初始化，处理后续页面导航
- 目录高亮跟随滚动
- 代码块复制功能激活
- 音乐播放器可用 (如果配置了)
- 搜索功能初始化

### 关键数据流图

```
用户请求 /posts/my-article
        ↓
    Astro SSR
        ↓
[...slug].astro getStaticPaths() 找到对应 entry
        ↓
    render(entry) → Content (HTML), headings
        ↓
MainGridLayout 接收 headings, title 等
        ↓
    构建完整 HTML (Navbar + Banner + Sidebars + Content + Footer)
        ↓
    发送到浏览器
        ↓
    浏览器加载
        ↓
    Swup 初始化 (客户端路由)
    TOC 跟随滚动
    其他交互激活
```

---

## 常见问题

### Q: 如何修改主题颜色？

A: 编辑 [`src/config.ts`](src/config.ts) 中的 `siteConfig.themeColor.hue` (0-360)。

### Q: 如何添加新页面？

A: 在 [`src/pages/`](src/pages/) 下创建新的 `.astro` 文件，Astro 会自动创建对应路由。

### Q: 如何自定义侧边栏组件？

A: 编辑 [`src/config.ts`](src/config.ts) 中的 `sidebarLayoutConfig`，添加/移除/重排组件。

### Q: 文章加密如何实现？

A: 在文章 frontmatter 中设置 `encrypted: true` 和 `password: "your-password"`。[`Encryptor.astro`](src/components/features/auth/Encryptor.astro) 组件会处理解密。

### Q: 如何修改样式？

A: 
- 使用 Tailwind 类 (推荐)
- 全局样式在 [`src/styles/`](src/styles/)
- 组件内样式使用 `<style>` 标签

---

## 更多资源

- 项目 README: [`README.md`](README.md)
- 文档目录: [`docs/`](docs/)
- 组件开发指南: [`docs/rule/`](docs/rule/)

---

*最后更新: 2024-05-20*
