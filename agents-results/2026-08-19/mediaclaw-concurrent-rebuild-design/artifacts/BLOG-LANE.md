# BLOG-LANE: 博客内容车道设计

## 1. 目标与审计边界

本设计覆盖审计确认的 74 个博客页面：

- 2 个 index：`/blog`、`/en/blog`。
- 24 个 category index：中文 12 个、英文 12 个。
- 48 个 article detail：24 个共享 slug，各有中文和英文路由。

审计文件能证明 URL、状态、标题、heading、landmark、列表结构和内部链接；它们不是完整正文的版权授权，也不是当前重做版本的内容事实源。实现应把审计目录作为 route contract，把经过确认的自有/授权内容作为发布内容源。

证据：`PAGE_CLASSIFICATION.md:75-100`；`PAGE_CATALOG.md:473-475`、`PAGE_CATALOG.md:845-847`、`PAGE_CATALOG.md:1025-1167`、`PAGE_CATALOG.md:1169-1455`、`PAGE_CATALOG.md:1613-2039`；`report.json` 的 `.pages[]` 博客记录。

## 2. 24 个 article slug 清单

以下 slug 是两种 locale 共用的稳定主键。顺序沿用审计博客 index 的顺序，不应使用标题或翻译文本作为主键。

```text
01 douyin-data-collection
02 douyin-comment-export
03 xiaohongshu-ai-benchmark-to-draft
04 xiaohongshu-research-data-collection
05 video-transcript-timestamps
06 xiaohongshu-image-text-extraction
07 xiaohongshu-brand-sentiment-monitoring
08 xiaohongshu-professional-content-search-traffic
09 xiaohongshu-find-benchmark-accounts
10 xiaohongshu-comment-batch-export-campaign-review
11 local-business-xiaohongshu-marketing
12 low-follower-viral-content
13 how-to-copy-viral-short-videos
14 xiaohongshu-search-vs-recommendation-traffic
15 xiaohongshu-keyword-placement
16 xiaohongshu-topic-analysis
17 short-video-transcript-extraction
18 xiaohongshu-comment-topic-mining
19 xiaohongshu-keyword-research
20 xiaohongshu-competitor-monitoring
21 xiaohongshu-comment-analysis
22 xiaohongshu-topic-library-build
23 xiaohongshu-download-own-posts
24 xiaohongshu-download-remove-watermark
```

审计中的中文和英文标题应分别进入 `content.zh` 与 `content.en`，而不是覆盖同一条 `title`。例如英文审计页中的 `douyin-comment-export` 已有英文标题，但 `douyin-data-collection` 和 `xiaohongshu-ai-benchmark-to-draft` 的英文页仍显示中文标题；这应被记录为翻译状态，而不是被静默视为英文内容完成。

## 3. 现有 8 条本地 blog record 与差距

`src/main.jsx:111-121` 当前只有以下 8 条记录：

| slug | 当前 category | 现状 |
|---|---|---|
| `douyin-data-collection` | 抖音 | 已有本地 record |
| `douyin-comment-export` | 抖音 | 已有本地 record |
| `xiaohongshu-ai-benchmark-to-draft` | AI 选题 | 已有本地 record |
| `xiaohongshu-research-data-collection` | 学术研究 | 已有本地 record；该分类不在审计的 12 个中文 category route 中 |
| `short-video-transcript-extraction` | 数据采集 | 已有本地 record |
| `xiaohongshu-image-text-extraction` | 小红书 | 已有本地 record |
| `xiaohongshu-brand-sentiment-monitoring` | 内容运营 | 已有本地 record |
| `xiaohongshu-find-benchmark-accounts` | 小红书 | 已有本地 record |

缺少以下 16 个审计 slug 的本地 record：

```text
video-transcript-timestamps
xiaohongshu-professional-content-search-traffic
xiaohongshu-comment-batch-export-campaign-review
local-business-xiaohongshu-marketing
low-follower-viral-content
how-to-copy-viral-short-videos
xiaohongshu-search-vs-recommendation-traffic
xiaohongshu-keyword-placement
xiaohongshu-topic-analysis
xiaohongshu-comment-topic-mining
xiaohongshu-keyword-research
xiaohongshu-competitor-monitoring
xiaohongshu-comment-analysis
xiaohongshu-topic-library-build
xiaohongshu-download-own-posts
xiaohongshu-download-remove-watermark
```

因此本地覆盖是 `8/24` slug，缺口是 `16/24` slug；按双 locale 计算，当前至少缺 `32/48` 个 locale article payload。当前 `blogCategories` 只有 `全部、抖音、小红书、数据采集、AI 选题、内容运营、学术研究` 7 项，不等于审计的 12 个中文 category route。现有 alias 也把多个英文 route 粗略映射到同一个本地 category，不能重现审计中各分类的实际文章集合。

当前行为还有两个必须在实现阶段修复的 contract gap：

- `src/main.jsx:339-341` 只匹配 `/blog` 前缀，`/en/blog`、`/en/blog/category/*`、`/en/blog/*` 不会进入博客 resolver。
- `BlogArticlePage` 在 `src/main.jsx:294-296` 用 `blogPosts[0]` 兜底未知 slug。未知文章必须进入 404，不得显示第一篇文章。

## 4. 数据驱动 SSOT 方案

建议将博客数据拆成三个逻辑集合；可以落在一个受版本控制的 data module，也可以拆成 JSON/Markdown，但 resolver 只能读取一个聚合后的 catalog。

### 4.1 Article record

```ts
type BlogArticle = {
  slug: string;                         // 24 个共享稳定主键
  order: number;                        // index 的审计顺序
  status: 'published' | 'translation-pending' | 'content-pending';
  categoryRoutes: {
    zh: string[];                       // locale-specific categoryRouteId
    en: string[];
  };
  content: {
    zh: BlogLocaleContent;
    en: BlogLocaleContent;
  };
  hero: { assetId: string; alt: string; rightsStatus: RightsStatus };
  relatedSlugs: string[];
  source: SourceRecord;
};

type BlogLocaleContent = {
  title: string;
  excerpt: string;
  seoTitle: string;
  metaDescription: string;
  locale: 'zh' | 'en';
  sourceLanguage: 'zh' | 'en';
  translationStatus: 'original' | 'reviewed-translation' | 'pending';
  toc: { id: string; label: string; level: 2 | 3 }[];
  blocks: ContentBlock[];
};
```

`ContentBlock` 至少支持 `paragraph`、`heading`、`list`、`steps`、`quote`、`image`、`note` 和 `cta`。正文必须由 block 数据渲染；不能继续用 `sections` 只生成固定的三段通用文案。`toc` 和 aside 从 locale payload 生成，保证标题、锚点和当前语言一致。未有完整正文时使用 `content-pending`，不得用审计标题拼接假正文。

### 4.2 Category route record

分类页需要保存 route 自身，而不只是保存一个抽象标签：

```ts
type BlogCategoryRoute = {
  id: string;                           // 例如 zh:xiaohongshu
  locale: 'zh' | 'en';
  routeSegment: string;                 // 中文 segment 由 router 编码
  label: string;
  facetId: string;                      // 仅用于跨语言语义关联
  articleSlugs: string[];               // 审计所得的显式有序集合
  seoTitle: string;
  metaDescription: string;
};
```

`articleSlugs` 是 category index 的直接数据源，不能通过 `post.category` 或 tags 的模糊匹配推导。审计中 `rednote`、`rednote-seo`、`xiaohongshu-seo` 等英文页的文章集合不同；即使它们共享 `facetId`，也必须保留为独立 route record。

### 4.3 Index record

```ts
type BlogIndex = {
  locale: 'zh' | 'en';
  route: '/blog' | '/en/blog';
  articleSlugs: string[];               // 24 项，按 order 排序
  categoryRouteIds: string[];            // 该 locale 的 12 项
};
```

index 只显示已发布且属于该 locale 的 24 条文章；`translation-pending` 只能在开发/审核状态出现，不能被误报为双语发布完成。

## 5. 中文/英文数据策略

1. slug、article ID、related graph 和 canonical article identity 在两个 locale 之间共享。
2. 标题、摘要、正文 blocks、TOC、SEO title、description、图片 alt、CTA 和 category label 全部按 locale 存储；不能用当前 `title` 共享字段。
3. 中文内容以已确认的中文自有稿为发布源；英文内容必须有英文原稿或人工审核的英文译稿。机器翻译只能作为草稿输入，不能把 `translationStatus` 标成已发布。
4. 英文审计页的中文标题属于观察到的现状，不是英文数据策略。对这些记录保留 `sourceLanguage: 'zh'`、`translationStatus: 'pending'`，直到英文标题和正文审校完成。
5. 语言解析优先看 pathname 前缀：`/en/...` 为 `en`，其余博客路径为 `zh`。locale 解析后再解析 `blog`、`category` 和 slug，避免把 `/en/blog/category/foo` 当作文章 slug。
6. 每条双语文章输出 `hreflang` 互链：`/blog/<slug>` <-> `/en/blog/<slug>`。两种 locale 的 canonical URL 各自指向本语言页面，不把英文页 canonical 到中文页。
7. 内容缺失时不做静默跨语言 fallback。发布门禁要求 24 个 slug 均有可审核的 `zh` 和 `en` payload；否则状态必须是 `translation-pending`，验收不能称为 48 路由完成。

## 6. Category alias 与 24 个 category route

下面的 `facetId` 只表示语义关联；`id` 和 `articleSlugs` 才是页面渲染主键。中文 segment 在实际链接中用 `encodeURIComponent`，审计文件记录的 URL 是 percent-encoded 形式。

### 6.1 中文 12 项

| route | id / facetId | 审计文章集合 |
|---|---|---|
| `/blog/category/小红书` | `zh:xiaohongshu` / `xiaohongshu` | `xiaohongshu-ai-benchmark-to-draft`, `xiaohongshu-research-data-collection`, `xiaohongshu-brand-sentiment-monitoring`, `xiaohongshu-professional-content-search-traffic`, `xiaohongshu-comment-batch-export-campaign-review`, `xiaohongshu-search-vs-recommendation-traffic`, `xiaohongshu-keyword-placement`, `xiaohongshu-topic-analysis`, `xiaohongshu-keyword-research`, `xiaohongshu-competitor-monitoring`, `xiaohongshu-comment-analysis`, `xiaohongshu-topic-library-build`, `xiaohongshu-download-own-posts`, `xiaohongshu-download-remove-watermark` |
| `/blog/category/内容运营` | `zh:content-operations` / `content-operations` | `xiaohongshu-ai-benchmark-to-draft`, `xiaohongshu-comment-batch-export-campaign-review`, `local-business-xiaohongshu-marketing`, `xiaohongshu-keyword-placement`, `xiaohongshu-topic-analysis`, `xiaohongshu-comment-topic-mining`, `xiaohongshu-comment-analysis`, `xiaohongshu-topic-library-build` |
| `/blog/category/评论采集` | `zh:comments` / `comments` | `douyin-comment-export`, `xiaohongshu-comment-batch-export-campaign-review`, `xiaohongshu-comment-analysis` |
| `/blog/category/关键词挖掘` | `zh:keyword-research` / `keyword-research` | `xiaohongshu-professional-content-search-traffic`, `xiaohongshu-keyword-research` |
| `/blog/category/客资筛选` | `zh:lead-generation` / `lead-generation` | `douyin-comment-export`, `xiaohongshu-comment-analysis` |
| `/blog/category/小红书运营` | `zh:rednote-operations` / `rednote-operations` | `xiaohongshu-image-text-extraction`, `xiaohongshu-comment-topic-mining` |
| `/blog/category/抖音` | `zh:douyin` / `douyin` | `douyin-data-collection`, `douyin-comment-export` |
| `/blog/category/搜索流量` | `zh:search-traffic` / `search-traffic` | `xiaohongshu-professional-content-search-traffic`, `xiaohongshu-search-vs-recommendation-traffic` |
| `/blog/category/数据采集` | `zh:data-collection` / `data-collection` | `douyin-data-collection`, `xiaohongshu-research-data-collection` |
| `/blog/category/短视频运营` | `zh:short-video-operations` / `short-video-operations` | `how-to-copy-viral-short-videos`, `short-video-transcript-extraction` |
| `/blog/category/ai-选题` | `zh:ai-ideas` / `ai-ideas` | `xiaohongshu-ai-benchmark-to-draft` |
| `/blog/category/ai分析` | `zh:ai-analysis` / `ai-analysis` | `xiaohongshu-comment-topic-mining` |

### 6.2 English 12 项

| route | id / facetId | 审计文章集合 |
|---|---|---|
| `/en/blog/category/content-ideas` | `en:content-ideas` / `ai-ideas` | `xiaohongshu-keyword-research`, `xiaohongshu-topic-library-build` |
| `/en/blog/category/content-strategy` | `en:content-strategy` / `content-operations` | `xiaohongshu-keyword-placement`, `xiaohongshu-topic-analysis`, `xiaohongshu-comment-topic-mining`, `xiaohongshu-topic-library-build` |
| `/en/blog/category/download-without-watermark` | `en:download-without-watermark` / `download-without-watermark` | `xiaohongshu-download-own-posts`, `xiaohongshu-download-remove-watermark` |
| `/en/blog/category/extract-video-transcript` | `en:extract-video-transcript` / `video-transcript` | `video-transcript-timestamps`, `short-video-transcript-extraction` |
| `/en/blog/category/keyword-research` | `en:keyword-research` / `keyword-research` | `xiaohongshu-professional-content-search-traffic`, `xiaohongshu-keyword-research`, `xiaohongshu-topic-library-build` |
| `/en/blog/category/lead-generation` | `en:lead-generation` / `lead-generation` | `douyin-comment-export`, `xiaohongshu-comment-analysis` |
| `/en/blog/category/low-follower-high-engagement` | `en:low-follower-high-engagement` / `low-follower-high-engagement` | `xiaohongshu-find-benchmark-accounts`, `low-follower-viral-content` |
| `/en/blog/category/rednote` | `en:rednote` / `xiaohongshu` | `xiaohongshu-search-vs-recommendation-traffic`, `xiaohongshu-keyword-placement`, `xiaohongshu-topic-analysis`, `xiaohongshu-comment-analysis`, `xiaohongshu-topic-library-build`, `xiaohongshu-download-own-posts`, `xiaohongshu-download-remove-watermark` |
| `/en/blog/category/rednote-operations` | `en:rednote-operations` / `rednote-operations` | `xiaohongshu-image-text-extraction`, `xiaohongshu-brand-sentiment-monitoring` |
| `/en/blog/category/rednote-seo` | `en:rednote-seo` / `search-traffic` | `xiaohongshu-professional-content-search-traffic`, `xiaohongshu-keyword-research` |
| `/en/blog/category/xiaohongshu` | `en:xiaohongshu` / `xiaohongshu` | `xiaohongshu-research-data-collection`, `xiaohongshu-professional-content-search-traffic`, `xiaohongshu-comment-batch-export-campaign-review`, `xiaohongshu-search-vs-recommendation-traffic`, `xiaohongshu-keyword-placement`, `xiaohongshu-topic-analysis`, `xiaohongshu-keyword-research`, `xiaohongshu-competitor-monitoring`, `xiaohongshu-comment-analysis`, `xiaohongshu-topic-library-build`, `xiaohongshu-download-own-posts`, `xiaohongshu-download-remove-watermark` |
| `/en/blog/category/xiaohongshu-seo` | `en:xiaohongshu-seo` / `search-traffic` | `xiaohongshu-search-vs-recommendation-traffic`, `xiaohongshu-keyword-placement`, `xiaohongshu-topic-analysis` |

Alias resolution is exact within locale: `zh + routeSegment` and `en + routeSegment` map to one `categoryRouteId`. A semantic alias must not redirect or merge the 24 audited pages; it may only populate `facetId` and related-navigation suggestions.

## 7. Index、列表与 article aside 结构

### 7.1 Index/category list

审计的 index/category 页面均为 `header + nav + main + footer`，博客内容主体是一个 `section` 加多个 `article`，没有 article detail 的 aside。建议组件结构为：

```text
main.blog-index
  section.blog-hero
  nav.blog-category-nav
  section.blog-list
    article.blog-card (one per articleSlugs item)
      link/figure cover
      category label(s)
      h2 title
      excerpt
      tags / read action
  section.blog-cta
```

`/blog` 与 `/en/blog` 各渲染 index record 的 24 项；category route 只渲染该 route record 的有序 `articleSlugs`。列表计数、标题、摘要和链接全部从 locale data 读，不能从当前 8 条 record 计算。

### 7.2 Article detail

审计 detail 页面都增加 `aside`，结构族为 `section, article, section, section`。建议组件结构为：

```text
main.blog-detail
  section.article-header (breadcrumb, category, h1, excerpt, meta)
  div.article-layout
    article.article-body (locale content blocks and stable heading ids)
    aside.article-aside (TOC, category link, related articles)
  section.article-related (explicit relatedSlugs, max 3-4)
  section.article-cta
```

`aside` 是可见或可折叠的 TOC/相关文章入口，不是随意复制一份列表。移动端可变为 article 前后的目录按钮，但语义上仍保留 `nav aria-label` 和 `aside` 的可访问名称。标题层级、heading id、语言和正文块必须与 `content[locale]` 一致。

## 8. Resolver 与未知 slug 404 策略

解析顺序固定如下：

```text
pathname
  -> locale (/en prefix => en, otherwise zh)
  -> exact /blog or /blog/category/:segment or /blog/:slug
  -> categoryRoute lookup or article lookup
  -> render matching template
```

- 先匹配 category，再匹配 article，避免把 `category/<segment>` 当作文章。
- category segment 只在当前 locale 的 alias map 中查找；未知 category、空 segment、多余 segment 均进入 404 boundary。
- article slug 必须在 24-item catalog 中精确匹配；未知 slug、空 slug、带额外路径段的 slug 进入 404 boundary。
- 404 页面必须显示当前 locale 的 not-found 标题、返回博客和返回首页动作；不得调用 `blogPosts[0]`、最近文章或其他默认文章。
- 客户端 SPA 至少渲染明确的 404 boundary 并更新 title；若部署层可配置 rewrite，服务器响应也应对未知博客 URL 返回 HTTP 404，而不是把未知路径伪装成 200 article。
- 允许的 trailing-slash 规范化必须是显式规则；不得把任意 slug 做大小写、空格或模糊匹配。

## 9. 内容来源与版权边界

每个 article 和 hero asset 都要有 `SourceRecord`：

```ts
type SourceRecord = {
  kind: 'owned' | 'licensed' | 'public-domain' | 'audit-reference' | 'pending-review';
  canonicalUrl?: string;
  author?: string;
  accessedAt?: string;
  attribution?: string;
  rightsReviewed: boolean;
  notes: string;
};
```

规则：

1. `PAGE_CLASSIFICATION.md`、`PAGE_CATALOG.md` 和 `report.json` 只作为页面存在性、route、标题/heading 与结构的 audit reference；它们不能授权复制原站正文、图片、评论、头像或用户数据。
2. 审计标题和 slug 可用于建立 route inventory；正文应由 MediaClaw 自有稿、获得许可的改写稿或明确的公共领域材料组成。保留原站 canonical URL 时标注为参考来源，不冒充 MediaClaw 官方原文或平台合作内容。
3. 现有 `main.jsx` 的 8 条本地 copy 是当前重做版本的数据输入；除非项目负责人确认其权利状态，否则 `rightsReviewed` 不得自动设为 true。
4. `/assets/*` 的本地路径只是文件引用，不是版权证明。每张 hero/插图必须绑定 asset rights record；无权利证明时使用自制图、授权图或不展示图片，不热链原站资源。
5. 不收集或再发布真实用户的私人信息、评论全文、账号画像或平台内部数据。公开可见不等于可自由转载；文章中的平台名称只作事实描述，不表示商标或平台背书。
6. 发布门禁：所有正文 blocks、外部引用、图片和 CTA 都有来源/权利状态；存在 `pending-review` 或未审校翻译时，article status 不能是 `published`。

## 10. 验收矩阵

| ID | 范围 | 通过条件 | 证据/方法 |
|---|---|---|---|
| A1 | inventory | index=2、category=24、article detail=48；24 slug 集合与审计完全相等 | 对 catalog 做数量、集合和重复 slug 断言；对照 `PAGE_CLASSIFICATION.md:77-100` |
| A2 | index | `/blog`、`/en/blog` 均可解析，状态为 200，均有 24 个列表 article，locale 标题/摘要/链接正确 | route table + DOM/Playwright 计数；对照 `PAGE_CATALOG.md:473-475`、`845-847` |
| A3 | zh category | 12 个中文 route segment 均 resolve；每个列表等于本设计的显式 `articleSlugs`，中文路径正确编码 | alias table fixture + DOM link set；对照 `PAGE_CATALOG.md:1025-1167` |
| A4 | en category | 12 个英文 route segment 均 resolve；集合按 route 保存，不能被 facet 合并或错误推导 | alias table fixture + DOM link set；对照 `PAGE_CATALOG.md:1613-1755` |
| A5 | detail structure | 48 个 detail route 均显示 `header/nav/main/footer`，detail 内有 `aside`、`article`、TOC、related 和 CTA | 全 route smoke + landmark/heading assertions；对照分类结论和 `PAGE_CATALOG.md:1169-1455`、`1757-2039` |
| A6 | content | 每个 slug 有 zh/en locale payload；标题、摘要、正文 block、TOC、SEO metadata 均非空；无三段通用 fallback | catalog schema check + detail content hash/selector assertions |
| A7 | locale | `/blog/<slug>` 与 `/en/blog/<slug>` 共享 slug 但不共享未经审校的文案；`hreflang`、canonical、alt、CTA 使用正确语言 | head + visible text assertions；检查 `translationStatus` |
| A8 | category membership | category listing 使用显式 route record；`facetId` 只用于关联，不改变审计集合 | fixture compares each route's slug set |
| A9 | 404 | 未知 article/category、空 segment、额外 segment 均显示 locale 404；页面绝不显示第 1 篇文章 | `/blog/not-a-real-slug`、`/en/blog/not-a-real-slug`、两个未知 category 的 browser test |
| A10 | rights | 每个内容/asset source record 存在，`rightsReviewed=true` 才能 published；audit-reference 不能充当授权 | schema/gate check + manual rights ledger review |
| A11 | local gap | 16 个缺失 slug 均补齐或明确阻断；8 个现有 record 的原文/权利状态被迁移，不被覆盖 | migration diff + 24-slug completeness report |
| A12 | responsive/accessibility | index、category、detail 在 desktop/mobile 无列表裁切；article aside 在移动端仍可访问；heading/landmark 语义成立 | Playwright desktop/mobile screenshot + DOM geometry/accessibility checks |

设计验收结论：本 artifact 已列出 24 个审计 slug、8 条本地 record 的 16 项差距、双语数据策略、24 个 category route alias、列表/detail 结构、未知 slug 404 规则、内容来源/版权边界和验收矩阵。实现、正文权利审查和真实浏览器运行不属于本 BLOG-LANE 的写入范围，需在后续实现/验收车道完成。
