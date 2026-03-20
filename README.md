# 心愈 — 心理健康陪伴平台

> 一个温暖、有趣的心理健康陪伴平台，为用户提供专业的心理支持与轻松的心灵陪伴体验。

## 平台介绍

心愈是一款面向高校学生和职场人士的心理健康应用，集心理测评、AI 陪伴、树洞倾诉、心理咨询、心理商城等功能于一体，让心理健康服务触手可及。

## 功能模块

| 模块 | 说明 |
|------|------|
| **首页** | 心理知识科普、每日一句、快捷功能入口 |
| **心理测评** | 专业心理健康量表测试，涵盖焦虑、抑郁、压力等多维度 |
| **树洞** | 匿名倾诉空间，释放情绪压力 |
| **AI 陪伴** | 基于 DeepSeek 的智能心理陪伴助手，全天候倾听与支持 |
| **心理咨询** | 预约专业心理咨询师（校内/线上） |
| **心灵档案** | 记录情绪变化，追踪心理健康趋势 |
| **心理商城** | 正念冥想课程、放松音频、心理书籍等好物 |

## 技术栈

### 前端
- **Next.js 15**（App Router）
- **React 19**
- **TypeScript 5**
- **Tailwind CSS 4**
- **shadcn/ui** + Radix UI 组件库
- **Lucide React** 图标

### AI 能力
- **DeepSeek-R1** 推理大模型（心理陪伴对话）
- **DeepSeek-VL2** 多模态模型（情绪图片分析）

### 部署
- **Vercel** — 持续部署与全球 CDN 加速

## 本地运行

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build
```

> **提示：** Node.js 版本需 >= 18.17

## 部署到 Vercel

本项目针对 **Vercel** 与 **Next.js** 做了优化，推荐使用 Vercel 一键部署。

### 配置说明

1. **从 GitHub 导入**：在 [Vercel](https://vercel.com) 选择「Add New → Project」，导入本仓库（如 `woshikingwang/-yu`），分支选 `main`。
2. **框架与目录**：Framework Preset 保持 **Next.js**，Root Directory 保持 **./** 即可。
3. **构建与安装**：Build Command、Output Directory、Install Command 使用默认值（Vercel 会自动识别 `next build` 与包管理器）。
4. **环境变量**：当前 Demo 无需配置环境变量即可构建与运行。若后续接入真实 API（如 DeepSeek、数据库等），请在 Vercel 项目 **Settings → Environment Variables** 中添加对应变量（如 `NEXT_PUBLIC_*` 或服务端密钥）。

部署完成后，Vercel 会提供 `xxx.vercel.app` 的访问地址，并支持在每次推送到 `main` 时自动重新部署。

## 目录结构

```
app/                      # Next.js App Router 页面
  ├── auth/               # 登录/注册
  ├── psychological-test/ # 心理测评
  ├── tree-hole/          # 树洞（匿名倾诉）
  ├── psychological-consultation/  # 心理咨询
  ├── mall/               # 心理商城
  ├── message-center/     # 消息中心
  ├── personal-center/    # 个人中心
  ├── soul-archive/       # 心灵档案
  └── settings/           # 设置页

components/               # React 组件（包含 shadcn/ui）
contexts/                 # React Context（Auth 认证上下文）
hooks/                    # 自定义 React Hooks
lib/                      # 工具函数
public/images/           # 静态图片资源
docs/                     # 技术文档
```

## 文档

详细的技术文档、安全策略等请查看 `docs/` 目录。

## 声明

本项目仅供学习与演示使用，部分功能为前端模拟页面。
