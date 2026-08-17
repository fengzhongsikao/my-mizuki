---
title: gui框架收集
published: 2026-05-22
updated: 2026-05-22
description: '关于各种语言的gui 框架收集'
image: ''
tags: [gui]
category: 'desktop'
draft: false 
---

## c gui 框架
[winforms](https://learn.microsoft.com/zh-cn/dotnet/desktop/winforms/overview/)
[wpf](https://learn.microsoft.com/zh-cn/dotnet/desktop/wpf/overview/)
[pgui](https://github.com/duanebester/pgui)

## c++ gui 框架
[qt](https://www.qt.io/)
[gtk](https://www.gtk.org/)
[wxwidgets](https://www.wxwidgets.org/)
[gtkmm](https://www.gtkmm.org/)
[eui-neo](https://github.com/sudoevolve/EUI-NEO)

### c++ 推荐
| 你的需求 | 推荐框架 | 理由 |
|---|---|---|
| 大型商业应用/跨平台工业级 | **Qt** | 生态最完整，Widgets+QML 双模式，IDE 支持好 |
| Linux 原生应用/GNOME 生态 | **gtk/gtkmm** | GNOME 桌面首选，C 接口稳定，多语言绑定丰富 |
| 轻量级/学习成本低 | **wxWidgets** | 原生控件封装，接近系统原生外观 |
| 最美观的现代化 C++ UI | **eui-neo** | C++17，OpenGL/Vulkan 渲染，声明式 DSL 布局，颜值最高，自带动画/异步/网络 |

## python gui 框架
[ttkinter](https://tkinter.com/)
[pyqt6](https://pypi.org/project/PyQt6/)
[pygobject](https://pypi.org/project/PyGObject/)

## java gui 框架
[jswing](https://www.oracle.com/java/technologies/swing/overview.html)
[javafx](https://www.oracle.com/java/technologies/javafx/overview.html)

## go gui 框架
[gtk](https://www.gtk.org/)
[wxwidgets](https://www.wxwidgets.org/)
[wails](https://wails.io/)
[gio](https://gioui.org/)
[fyne](https://fyne.io/)


## dart gui 框架
- [flutter](https://flutter.dev/)

### dart 推荐
| 推荐框架 | 理由 |
|---|---|
| **Flutter** | 全平台覆盖（iOS/Android/Web/Windows/macOS/Linux），Material Design 3 原生级美观，自研 Skia/Impeller 渲染引擎，Dart 语言丝滑热重载，Google 官方维护生态最强 |

## 前端 gui 框架
[electron](https://www.electronjs.org/zh/docs/latest/)
[electrobun](https://github.com/blackboardsh/electrobun)

## php gui 框架
[NativePHP](https://nativephp.com/)

## rust gui 框架

> 参考：[2025 年 Rust 桌面 GUI 框架最全横评](https://blog.csdn.net/jjhenda00/article/details/155137478) —— 基于 30+ 项目实战经验

| 框架 | 类型 | 渲染方式 | 体积 | 适用场景 |
|---|---|---|---|---|
| [iced](https://github.com/iced-rs/iced) | 即时模式 | wgpu (GPU) | 5~8 MB | Win11 风格纯 Rust 项目首选 |
| [egui](https://egui.rs/) | 即时模式 | wgpu/Web | 4~6 MB | 工具类、编辑器、调试面板 |
| [dioxus](https://dioxuslabs.com/) | React 语法 | WebView/wgpu | 4~12 MB | 桌面+Web+移动三端统一 |
| [slint](https://github.com/slint-ui/slint) | 声明式 (.slint) | 自研 GPU | 5~9 MB | 商业闭源项目 |
| [tauri](https://tauri.app/) | WebView | 系统 WebView | 3~10 MB | 前端团队快速开发 |
| [gpui](https://longbridge.github.io/gpui-component/zh-CN/) | GPU 渲染 | GPUI | — | Zed 编辑器同款引擎 |
| [makepad](https://makepad.dev/) | 自研 DSL | GPU (自研) | — | 创意应用、实时编辑、跨平台 |
| [druid](https://github.com/linebender/druid) | 保留模式 | piet | 8~12 MB | 已停止维护，继任者 Xilem |
| [fltk-rs](https://github.com/fltk-rs/fltk-rs) | 传统控件 | FLTK (C++) | 3~6 MB | 传统 Windows 工具快速开发 |
| [leptos](https://www.leptos.dev/) | 响应式 Web | WASM | — | Web 前端开发 |

### 2026 年选型建议

| 你的需求 | 推荐框架 | 理由 |
|---|---|---|
| 传统桌面应用（设置面板、文件管理器、数据库管理工具） | **iced** | 保留模式，Win11/macOS 风格原生渲染，纯 Rust 生态最成熟 |
| 工具/仪表盘类应用（调试面板、性能监控、数据可视化） | **egui** | 即时模式，体积最小、启动最快，纯 Rust 嵌入式 UI 首选 |
| 代码编辑器/IDE/通用桌面应用 | **gpui** | 纯 Rust + GPU 原生渲染，Zed 同款引擎，极致性能 |
| 音乐播放器/创意可视化/实时预览工具 | **makepad** | 自研 GPU DSL + 实时 UI 热编辑，着色器级定制渲染 |
| 桌面+Web+移动三端统一 | **dioxus** | React 语法，一套代码全平台，2026 年生态增长最快 |
| 商业闭源项目/嵌入式设备 UI | **slint** | 商业授权可选，声明式语法，极致轻量 |
| 前端团队快速出产品（音乐播放器、工具面板等） | **Tauri 2 + Vue3/React** | 复用 Web 生态，打包体积小，支持移动端 |
| 学习/快速原型 | **fltk-rs** | 极简 API，几百行即可出完整程序 |

### 喜爱的gui 框架
#### wails
Wails 是一个可让您使用 Go 和 Web 技术编写桌面应用的项目。
将它看作为 Go 的快并且轻量的 Electron 替代品。 您可以使用 Go 的灵活性和强大功能，结合丰富的现代前端，轻松的构建应用程序。  

功能:
- 原生菜单、对话框、主题和半透明
- Windows、macOS 和 linux 支持
- 内置 Svelte、React 、Preact 、Vue、Lit 和 Vanilla JS 的模板
- 从 JavaScript 轻松调用 Go 方法
- 自动将 Go 结构体转换为 TypeScript 模块
- Windows 上不需要 CGO 或外部 DLL
- 使用 Vite 的实时开发模式
- 可以轻松创建、构建和打包应用的强大命令行工具
- 丰富的 运行时库
- 使用 Wails 构建的应用程序兼容 Apple & Microsoft 商店


### 期待的框架
#### gio
Gioui 是一个使用 Go 语言编写的跨平台图形库，它由 Elias Naur 开发。 Gio 支持所有主要平台：Linux、macOS、Windows、Android、iOS、FreeBSD、OpenBSD 和 WebAssembly。它的设计目标是提供简单、高性能和一致的 API，使开发人员能够轻松构建图形化应用程序。Gioui 基于 OpenGL 和原生界面渲染，并具有以下主要特点：
1. 跨平台支持：Gioui 提供了对多个平台的支持，包括 Windows、Mac、Linux 和 Android。开发人员可以使用相同的代码库创建适用于不同平台的应用程序，减少了开发和维护的工作量。
2. 高性能：Gioui 的底层实现使用 OpenGL 和原生界面渲染，以提供出色的性能。它采用了现代的图形渲染技术，能够在各种平台上实现平滑的动画和流畅的用户体验。
3. 简洁的 API：Gioui 提供了简洁而一致的 API，使开发人员能够轻松构建用户界面。它采用声明式的方式定义界面组件，使代码易于编写和理解。Gioui 还提供了丰富的布局和绘图工具，以帮助开发人员创建各种复杂的界面。
4. 原生外观：Gioui 旨在提供与目标平台一致的外观和行为。它通过使用原生界面渲染，能够呈现出和操作系统默认应用程序类似的外观，为用户提供一致的体验。

