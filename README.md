# CCF 推荐国际学术期刊与会议在线查询平台

**CCF Atlas 2026** is a lightweight, interactive web application for exploring CCF-recommended academic journals and conferences.

[**Online Website**](https://fayeH2.github.io/CCF2026/) —— [**GitHub Repository**](https://github.com/fayeH2/CCF2026) —— [**Official CCF List**](https://www.ccf.org.cn/Academic_Evaluation/By_category/)

---

## 📖 Overview

**CCF Atlas 2026** 是一个基于 **CCF 2026 年第七版推荐目录** 构建的轻量级学术期刊与会议在线查询工具，旨在为计算机领域的科研人员、教师和学生提供便捷、直观的学术资源检索体验。

本项目目前主要收录以下两个学科领域：

- **人工智能（Artificial Intelligence）**
- **计算机图形学与多媒体（Computer Graphics and Multimedia）**

平台采用纯静态网页架构，无需后端服务器或数据库，可直接通过 GitHub Pages 部署，实现在线访问与检索。

> **声明：** 本项目为非官方、自用学术查询工具，所有推荐等级及相关信息均以 [中国计算机学会（CCF）官方目录](https://www.ccf.org.cn/Academic_Evaluation/By_category/) 为准。CCF 2026 第七版于 2026 年 3 月 31 日发布，并于 4 月 9 日发布勘误更新。


## 🗂️ Data Structure

本项目采用结构化数据管理方式，增加独立的链接核验信息，以确保数据的可追溯性与可维护性。

| 字段        | 说明                         |
| --------- | -------------------------- |
| `id`      | 自建稳定行标识                    |
| `学科领域`    | 人工智能 / 计算机图形学与多媒体          |
| `类别`      | 会议 / 期刊                    |
| `等级`      | CCF A / B / C              |
| `简称`      | 原始 PDF 中的简称，缺失时保留空值        |
| `全称`      | 原始 PDF 中的会议或期刊全称           |
| `出版社/主办方` | 保留原始 PDF 的出版社列信息           |
| `原始网址`    | 原样保留 PDF 中的网址，包括错误、截断或空白内容 |
| `官方网址`    | 经独立核验的期刊或会议官方网站，未核验时留空     |
| `学术索引网址`  | 可解析的 DBLP / 学术索引链接或独立核验的入口 |
| `备注`      | 记录来源中的特殊情况及链接核验信息          |

**Data Integrity:** 原始网址与核验后的链接分别存储，避免在数据清洗和更新过程中覆盖原始信息。对于无法确认的链接，系统保留原始记录，不将未经核验的网址标记为官方网站。

## 🚀 Usage

### 1. Local Usage — 本地运行

本项目为纯静态网站，下载仓库后即可在本地使用，无需安装额外依赖。

**方式一：直接使用浏览器**

下载或克隆项目：

```bash
git clone https://github.com/fayeH2/CCF2026.git
cd CCF2026
```

直接使用浏览器打开根目录下的 `index.html` 文件，即可访问查询页面。

网站通过 `data/venues.js` 加载数据，支持本地文件方式访问。

**方式二：启动本地 HTTP 服务**

在项目根目录执行：

```bash
python -m http.server 8000
```

随后在浏览器访问：

[http://localhost:8000/](http://localhost:8000/)

### 2. GitHub Pages — 在线部署

本项目支持通过 GitHub Pages 免费部署，无需购买服务器或配置后端环境。

**Step 1. 上传项目文件**

将完整项目上传至 GitHub 仓库，确保 `index.html` 位于仓库根目录，并完整保留 `assets/` 和 `data/` 目录。

**Step 2. 配置 GitHub Pages**

进入 GitHub 仓库的：

`Settings → Pages → Build and deployment`

设置如下：

| Configuration | Value                |
| ------------- | -------------------- |
| Source        | Deploy from a branch |
| Branch        | `main`               |
| Folder        | `/ (root)`           |

点击 **Save**，等待 GitHub Pages 自动完成部署。

**Step 3. 访问在线网站**

部署成功后，可通过以下地址访问：

**[https://fayeH2.github.io/CCF2026/](https://fayeH2.github.io/CCF2026/)**

后续更新数据或网页代码，只需向 `main` 分支提交修改，GitHub Pages 即可自动重新部署。

## 📁 Project Structure

```text
CCF2026/
├── index.html              # 网站首页
├── README.md               # 项目介绍与使用说明
│
├── assets/
│   ├── style.css           # 页面布局与视觉样式
│   └── app.js              # 搜索、筛选、分页及导出功能
│
├── data/
│   ├── venues.json         # 完整结构化数据
│   ├── venues.js           # 浏览器读取的数据文件
│   └── venues.csv          # CSV 格式数据备份
│
├── scripts/
│   └── build.py            # 数据构建与更新脚本
│
└── source/
    └── 原始目录-2026-用户上传.pdf  # 原始数据来源
```

## 🔄 Data Maintenance

项目使用 `data/venues.json` 作为主要数据源，以保证数据管理的一致性。

当 CCF 官方目录发生调整，或期刊、会议官方网站发生变更时，可以更新相关数据字段，再通过 `scripts/build.py` 重新生成网页使用的数据文件。

项目将持续关注数据准确性、链接有效性及目录更新情况。

## 📌 Disclaimer

本项目仅用于个人学习、学术研究和信息检索，不代表中国计算机学会（CCF）官方立场。

所有期刊与会议的最终推荐等级、学科分类及名称信息均以 [CCF 官方学术评价目录](https://www.ccf.org.cn/Academic_Evaluation/By_category/) 为准。

---

**CCF Atlas 2026** · Built for Academic Exploration
