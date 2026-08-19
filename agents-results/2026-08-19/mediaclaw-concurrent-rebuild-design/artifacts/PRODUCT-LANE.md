# MediaClaw 产品功能车道设计

状态：`DESIGN-VERIFIED`。本文是给并发实现 lane 和 Foundation lane 使用的产品功能契约，不是实现 diff，也不声明 40 个 feature detail 已经完成。

## 1. 冻结范围与证据

本车道只负责产品功能入口：4 个 hub 和 40 个 feature detail route，共 44 个有效页面。公共 shell、首页、博客、更新日志、商业页、法律页、鉴权页和服务器部署不属于本车道的页面实现范围，但本车道必须通过 Foundation 的导航和 Not Found 接口与它们正确衔接。

审计证据：

- `PAGE_CLASSIFICATION.md:9-11` 将 hub 计为 4 页，将 detail 计为 `10 capabilities x 2 platforms x 2 locales = 40` 页。
- `PAGE_CLASSIFICATION.md:23-27` 定义无 `/en` 为中文 shell、`/en/...` 为英文 shell，并明确这只是观察到的 route pair，不推断源站内部实现。
- `PAGE_CLASSIFICATION.md:37-73` 给出 10 个 feature suffix 以及两个平台的精确 route formula。
- `PAGE_CATALOG.md:197-461` 和 `PAGE_CATALOG.md:569-821` 显示 hub/detail 均为 HTTP 200、无 form，且 detail 页面并非一个固定 section 数量；各页面的 H1、FAQ、related tools、comparison 和 workflow 组合会随 capability 变化。
- `report.json` 的 `pages` 数组为 174 项，其中 170 个 HTTP 200、4 个 HTTP 404；筛选产品前缀得到 4 个 hub、40 个 detail，中文和英文各 22 个产品页面。
- `src/main.jsx:60-76` 已有两个平台的 hub seed；`src/main.jsx:124-139` 已有两个 downloader 的数据 seed；`src/main.jsx:260-263` 当前 `PlatformPage` 只有简化 hero、四步模块和 CTA。
- `src/main.jsx:327-346` 当前只分派两个中文 hub 和两个中文 downloader detail；未匹配路径会进入 `PlaceholderPage`。这不是 40 个 detail 的完整复刻。

## 2. 页面族与 route formula

### 2.1 有效 route 集合

```text
LOCALES   = { zh, en }
PLATFORMS = { xiaohongshu, douyin }
SUFFIXES  = {
  keywords,
  viral-content-analysis,
  account-analysis,
  scraper,
  comments,
  downloader,
  image-text,
  transcript,
  leads,
  monitoring
}
```

Route formula 必须只从这个集合生成：

```text
hub(zh, platform)     = /{platform}
hub(en, platform)     = /en/{platform}
detail(zh, platform, suffix) = /{platform}/{suffix}
detail(en, platform, suffix) = /en/{platform}/{suffix}
```

因此有效集合是：

- hub：`/xiaohongshu`、`/douyin`、`/en/xiaohongshu`、`/en/douyin`；
- detail：每个 platform 的 10 个 suffix 各有中文和英文 route，共 40 个；
- 不把 `/en` 的存在当作内容 fallback；locale 必须在 route 解析阶段确定。

### 2.2 两个页面族、七个渲染配方

两个 hub route 使用同一个 `ProductHubPage`，以平台和 locale 数据驱动。40 个 detail route 使用同一个 `FeatureDetailPage`，以内容 block 和 `recipe` 数据驱动。`recipe` 是渲染编排键，不是把审计页面粗暴压成同一个 DOM：每个页面必须按自己的 block 顺序保留观察到的内容职责。

| suffix | recipe | 页面重点 | 允许的局部差异 |
| --- | --- | --- | --- |
| `keywords` | `research` | 主词机会、联想词、长尾清洗、从搜索到采集 | opportunity grid、search workflow |
| `viral-content-analysis` | `analysis` | 低粉高互动样本、单篇拆解、证据到选题 | evidence matrix、analysis steps |
| `account-analysis` | `analysis` | 对标账号、样本分层、报告维度、可写结论 | account report dimensions |
| `scraper` | `collection` | 单条、主页、关键词采集，字段和导出 | source-type cards、comparison |
| `comments` | `collection` | 批量评论、上下文、导出、评论洞察 | comment workflow、export fields |
| `downloader` | `media` | 原始媒体、批量队列、素材归档 | image/video mode cards、quality guardrail |
| `image-text` | `extraction` | 封面和配图 OCR、回填记录、文本复用 | OCR evidence and output blocks |
| `transcript` | `extraction` | 时间戳逐字稿、两条提取路径、节奏复盘 | transcript path comparison |
| `leads` | `lead` | 意图关键词、IP/主页字段、导出和跟进 | lead schema/table, privacy boundary |
| `monitoring` | `monitoring` | 订阅、规则、日报、AI 摘要、历史记录 | monitoring result cards、schedule guardrail |

每个 hub 的 feature navigation 必须至少能到达这 10 个 suffix；hub 中的 Codex、WorkBuddy、飞书等卡片可指向外部 lane 的 route，但不能伪造为本车道的 detail route。审计 hub 的观察结构包含“找方向”“采集”“补全文字/上下文”“Agent”“监控/协作”等内容组；这些组在 `featureGroups` 中表达，不能用当前四步文案代替全部页面内容。

### 2.3 纯函数 route 解析

产品 lane 对 Foundation 暴露 `matchProductRoute(pathname)`，不直接修改 Foundation 的全局 fallback：

```text
1. 去掉 query/hash，接受最多一个结尾 slash，并计算 canonicalPath。
2. 第一个 segment 为 `en` 时 locale=en，否则 locale=zh。
3. 识别第二个（或第一个） segment 是否为 xiaohongshu/douyin。
4. 只有 1 个 platform segment 才是 hub；只有 1 个合法 suffix 才是 detail。
5. 其他形状返回 product-not-found，不返回第一条 feature 数据。
```

`pathname` 为空时只由 Foundation 处理首页；产品 lane 不接管 `/`、`/en`。产品 lane 必须把 `route.kind`、`locale`、`platform`、`slug`、`canonicalPath` 和 `status` 作为稳定输出，以便 Foundation 设置 document title、canonical link 和 server fallback。

## 3. 数据 schema

以下是实现约束。JS 项目可以用 JSDoc/运行时 validator 实现，但字段语义不能因使用 JSX 而省略。

### 3.1 基础类型

```ts
type Locale = 'zh' | 'en'
type Platform = 'xiaohongshu' | 'douyin'
type FeatureSlug =
  | 'keywords'
  | 'viral-content-analysis'
  | 'account-analysis'
  | 'scraper'
  | 'comments'
  | 'downloader'
  | 'image-text'
  | 'transcript'
  | 'leads'
  | 'monitoring'

type ProductRoute = {
  kind: 'hub' | 'feature' | 'product-not-found'
  locale: Locale
  platform?: Platform
  slug?: FeatureSlug
  pathname: string
  canonicalPath: string
  status: 'known' | 'not-found'
}
```

### 3.2 Hub data

每个 `(platform, locale)` 必须有独立的可审阅文案；不得运行时把中文字符串逐字当成英文 fallback。

```ts
type HubPageData = {
  id: `${Platform}-hub`
  platform: Platform
  locale: Locale
  seo: {
    title: string
    description: string
    h1: string
  }
  hero: {
    eyebrow: string
    lead: string
    image: string
    imageAlt: string
    primaryCta: LinkData
    secondaryCta: LinkData
  }
  featureGroups: Array<{
    id: string
    title: string
    description?: string
    items: Array<{
      slug?: FeatureSlug
      title: string
      description: string
      iconKey: string
      href: string
      externalOwner?: 'foundation' | 'commercial'
    }>
  }>
  workflow: Array<{ number: string; title: string; body: string }>
  securityFaq: Array<FaqItem>
  crossPlatformLink: LinkData
  finalCta: LinkData
}
```

`featureGroups.items[].href` 对本车道 feature 必须由 `hrefFor(locale, platform, slug)` 生成，并在构建时校验；只有 `externalOwner` 明确标记的项目可以是 Foundation/commercial lane 的 route。

### 3.3 Detail catalog data

以 20 个 `(platform, suffix)` 基础条目承载 40 个 route pair，每个条目必须有 `zh` 和 `en` 两份 copy。这样既共享平台行为，又不会把 locale 当作简单字符串替换。

```ts
type FeatureCatalogEntry = {
  id: `${Platform}/${FeatureSlug}`
  platform: Platform
  slug: FeatureSlug
  recipe: 'research' | 'analysis' | 'collection' | 'media' | 'extraction' | 'lead' | 'monitoring'
  iconKey: string
  accentToken: string
  locales: Record<Locale, FeatureLocaleCopy>
}

type FeatureLocaleCopy = {
  seo: { title: string; description: string }
  hero: {
    eyebrow: string
    h1: string
    lead: string
    image: string
    imageAlt: string
    primaryCta: LinkData
    secondaryCta: LinkData
  }
  blocks: FeatureBlock[]
  faq: FaqItem[]
  related: Array<{ label: string; href: string; platform?: Platform; slug?: FeatureSlug }>
  finalCta: LinkData
}

type LinkData = {
  label: string
  href: string
  kind?: 'internal' | 'external'
}

type FaqItem = { question: string; answer: string }
```

`FeatureBlock` 用 discriminated union 表达审计中出现的页面差异：

```ts
type FeatureBlock =
  | { type: 'value-grid'; title: string; intro?: string; items: Array<CardData> }
  | { type: 'workflow'; title: string; intro?: string; steps: Array<StepData> }
  | { type: 'evidence-grid'; title: string; intro?: string; items: Array<CardData> }
  | { type: 'comparison'; title: string; columns: string[]; rows: string[][] }
  | { type: 'scenario-grid'; title: string; items: Array<ScenarioData> }
  | { type: 'guardrail'; title: string; body: string; items: string[] }
  | { type: 'faq'; title: string; items: FaqItem[] }
  | { type: 'related'; title: string; items: LinkData[] }

type CardData = { title: string; body: string; iconKey?: string; image?: string }
type StepData = { number: string; title: string; body: string }
type ScenarioData = { role: string; useCase: string; outcome: string }
```

`faq` 和 `related` 可以在 `blocks` 中显式编排；`FeatureDetailPage` 只负责稳定的 hero、block renderer 和 final CTA，不根据 slug 写第 11 个条件分支。内容 validator 必须拒绝缺少 `locales.zh`、`locales.en`、H1、FAQ/related 数据或无效 internal href 的条目。

## 4. 并发实现组件目录

以下是产品 lane 的写入边界；实际文件名可由 integrator 在锁定接口后调整，但职责不能合并回 `main.jsx` 的大分支。

```text
src/features/product-lane/
  catalog/
    productRoutes.js          # suffix、platform、locale 的 route registry
    productCatalog.js         # 2 hub + 20 platform-feature entries
    productSchema.js          # JSDoc/types 与运行时校验
    productLinks.js           # hrefFor、localeHref、related-link 校验
  components/
    ProductHubPage.jsx        # 两个平台 hub 的共同模板
    FeatureDetailPage.jsx     # 40 个 detail 的共同入口
    FeatureHero.jsx
    FeatureBlockRenderer.jsx
    ValueGrid.jsx
    WorkflowBlock.jsx
    EvidenceGrid.jsx
    ComparisonBlock.jsx
    ScenarioGrid.jsx
    GuardrailBlock.jsx
    FaqBlock.jsx
    RelatedTools.jsx
    ProductCta.jsx
    ProductNotFound.jsx       # 产品前缀下的显式 404 视图
  product-lane.css            # 仅使用 product-/feature-/hub- 前缀的局部样式
  product-lane.test.*         # 纯 route/catalog/locale tests
```

组件依赖方向：`catalog -> schema/links`，`components -> catalog + Foundation props`，`product-lane.css -> Foundation tokens`。禁止 catalog 反向依赖 JSX、禁止 block component 读取 `window.location`、禁止 feature component 直接调用浏览器 history。

## 5. 共享与局部样式边界

### Foundation 拥有

- `body`/reset、全局字体和文字层级、主题切换、focus-visible 和 reduced-motion；
- `app`、header、footer、主导航、全局 locale switch、`page-shell` 宽度和页面滚动；
- 全局按钮/链接交互、通用 section band、通用容器和断点；
- 颜色、间距、圆角、阴影、z-index 的 CSS custom properties；
- route shell 的 desktop/mobile safe-area 和 document title/canonical 承载。

### Product lane 拥有

- `.product-hub-*`、`.product-feature-*`、`.feature-block-*`、`.feature-related-*` 前缀下的布局；
- hero 的两列/单列变体、feature card grid、workflow/evidence/comparison/scenario 结构、FAQ 局部排列和 CTA composition；
- 平台 accent 只通过 Foundation 暴露的 token 或局部变量注入，不修改全局 `body`、`.button`、`.page-shell`；
- 每一块的稳定尺寸：图片使用 `aspect-ratio`，卡片 grid 使用稳定 track，移动端在内容变长时换行而不是横向溢出；
- 组件级 responsive 修正和 detail-specific density class。

禁止 product lane：重写 Foundation reset、使用未声明的全局 selector、复制 Header/Footer、用固定 viewport 宽度撑开页面、把中文长度假设写入英文 layout、把页面标题放进与内容无关的装饰 card。

## 6. Locale 策略

1. `resolveProductRoute` 先解析 locale，再查平台和 suffix；`/en/xiaohongshu/...` 与 `/xiaohongshu/...` 永远得到同一 `platform/slug`、不同 locale。
2. `productCatalog` 只存一份行为/结构定义，但 `FeatureLocaleCopy` 和 `HubPageData` 明确存 `zh`、`en`。英文缺文案时构建失败，不允许静默显示中文。
3. 所有产品内部链接从 `hrefFor(locale, platform, slug)` 或 `localeHref(currentRoute, target)` 生成。locale switch 保留当前 hub/detail slug；不能一律跳到首页。
4. `document.title`、meta description、H1、按钮、FAQ、related label、图片 alt 均来自当前 locale data；不要沿用当前 `main.jsx` 的全局中文 title fallback。
5. locale shell 文案、Header/Footer 和产品内容分开：Foundation 管 shell locale，product lane 管产品 copy。两者共享 `Locale` 枚举，不共享可变的字符串对象。
6. 产品 route 的 ASCII suffix 不做中文 URL 翻译；中文 category 或其他内容系统的编码规则不应被本 lane 扩展。

## 7. Unknown slug 与 404 处理

### 已知 route

合法 platform + 合法 suffix + 合法 locale 才渲染 `ProductHubPage` 或 `FeatureDetailPage`。有效 44 route 不得出现 `PlaceholderPage`、空 H1 或第一条内容的 fallback。

### 未知 route

- `/xiaohongshu/not-a-feature`、`/en/douyin/not-a-feature`、未知 platform、过多 segments 和产品前缀下的无效 suffix 统一返回 `kind=product-not-found`；
- `ProductNotFound` 显示当前 locale 的明确 404 标识、原始/canonical path（需安全转义）、返回对应 hub 的链接和返回首页链接；不显示另一 feature 的标题、FAQ 或 image；
- Foundation/server adapter 必须把 direct request 的 HTTP status 设为 404。SPA 本身只能提供 `data-route-status="404"` 等可观测状态，不能假装用 HTTP 200 完成 server 语义；
- 观察到的四条 `/posts/...` broken routes 仍是内容系统的 404，不得把它们导入产品 catalog。它们也不是本车道的 feature route；
- 如果只带一个结尾 slash，显示 canonical route 或由 Foundation 做无损 canonical redirect；其他异常编码不通过宽松 decode 变成已知 slug。

实现上不得复用当前 `BlogArticlePage` 的 `blogPosts[0]` fallback 模式，也不得让 `PlaceholderPage` 在产品前缀下吞掉错误。

## 8. Foundation 接口

### Foundation -> Product lane

Foundation 的全局 router/shell 至少提供以下稳定接口：

```ts
type FoundationProductContext = {
  route: ProductRoute
  navigate: (href: string) => void
  localeHref: (route: ProductRoute | LinkData) => string
  renderShell: (content: React.ReactNode) => React.ReactNode
}

type ProductLaneProps = FoundationProductContext & {
  tokens: {
    surface: string
    surfaceMuted: string
    ink: string
    muted: string
    line: string
    accentXiaohongshu: string
    accentDouyin: string
  }
}
```

Foundation 在产品前缀命中后调用 `ProductLane({ route, navigate, localeHref, renderShell, tokens })`；产品 lane 不重新读取 `window.location`，不创建第二个 history listener，不复制 Header/Footer。

### Product lane -> Foundation

产品 lane 暴露：

```ts
matchProductRoute(pathname): ProductRoute | null
productRouteRegistry: ReadonlySet<string>
ProductLane(props: ProductLaneProps): React.ReactNode
validateProductCatalog(): ValidationResult
```

Foundation 必须在通用 placeholder 之前注册该 matcher，并将 `product-not-found` 与真正的未知公共 route 区分开。产品 lane 不要求 Foundation 知道每个 block type；Foundation 只需要知道 `ProductRoute` 的 route kind 和最终 `<main>` 内容。

### Foundation 的接口锁定条件

- `Locale`、`ProductRoute.kind`、`navigate(href)` 和 Not Found status 语义先锁定，才能并发实现 catalog 和组件；
- CSS token 名称和 shell slot 未锁定前，product lane 可以继续做纯数据/route tests，但不能把 token 名称写死为未确认的 Foundation implementation；
- Foundation 若选择不同 router，必须提供等价的 `pathname -> ProductRoute` 与 `navigate` 适配，不得要求产品 lane 在每个组件内加 router 分支。

## 9. 现有内容可复用项与完整复刻边界

### 可复用为 seed 或行为参考

- `platformData` 的平台 label/title/summary/accent/features/image 可作为两个 hub hero 与平台导航的 seed；使用前需按 `PAGE_CATALOG.md` 校正文案和 section 责任。
- `featureCards` 的六个产品价值主题可作为 hub value-card 的 icon/copy seed；它只有六张摘要卡，不能当作 10 个 detail 的内容源。
- `downloaderData` 与 `DownloaderPage` 提供了 data-driven detail 的 `modes/scenarios/faq/related` 形状，可迁移为 `FeatureBlock` 的示例；当前只有中文两条 downloader route。
- `navigate(path)`、现有 Header/Footer 的 link 意图、lucide icon 使用方式和已引用的 `/assets/1-v20260424.webp`、`/assets/16-v20260424.webp` 等图片可以作为适配参考；导航 history 归 Foundation 所有。
- 当前 `sub-hero`、`detail-cta`、`faq-list` 等视觉意图可作为迁移输入，但 class ownership 要按本文件的 Foundation/product 边界重新锁定。

### 不能宣称为完整复刻

- `PlatformPage` 只有 hero、四步 detail grid、CTA，而审计 hub 有大量 feature groups、workflow、FAQ、cross-platform 和安全边界内容；它只能是 hub skeleton。
- 当前 App 的 route dispatch 没有 40 个 detail entries，除了两个中文 downloader 之外，产品 detail 会掉进 `PlaceholderPage`；有 URL 可访问不等于有 feature 内容。
- 当前 `DownloaderPage` 的两份 data 只覆盖 downloader 的演示文案和有限区块，不覆盖关键词、爆款、账号、采集、评论、OCR、逐字稿、客资和监控，也不证明英文复刻完成。
- 当前 route/title 逻辑没有 `/en` product dispatch；Header 的 locale button 也不是完整的 route-pair locale switch。
- 现有静态 image path、演示 FAQ、Chrome Web Store/飞书链接和“本地工作流”文案不能证明真实插件、采集、OCR、逐字稿、监控、飞书写入或账号服务已接通。
- `PAGE_CATALOG.md` 是公开匿名 DOM 证据，不是源站数据接口或后端契约；detail copy、图片、结构只能按可见证据复刻，不能臆造不可见功能。

## 10. 验收命令与验收矩阵

### 当前设计 lane 必跑

```bash
bash /Users/vsiyo/Desktop/Opensource_Tool/MediaClaw-Web/agents-results/2026-08-19/mediaclaw-concurrent-rebuild-design/validation/PRODUCT-LANE.sh
```

该命令是本 lane 的冻结 validator；不得修改、替换或把它的失败改写成通过。它只验证本设计 artifact，不等价于实现、build、浏览器或生产验收。

### 实现完成后的机器验收

项目集成 owner 应按项目最终 package contract 执行下列命令；命令名在本只读 lane 未从 package 文件核实，因此实现前必须由 Foundation/integrator 绑定实际脚本：

```bash
npm run build
npm run test -- --run
npx playwright test tests/product-lane-routes.spec.ts
```

`tests/product-lane-routes.spec.ts` 的最小断言矩阵：

1. 生成并访问 44 个有效 route；每条 route 是 200/renderable、有且仅有产品页面 H1，locale、title、canonical path 与 route 一致。
2. 每个平台的 hub 链接到 10 个合法 detail suffix；detail 的 related/internal href 不指向未知 slug。
3. 每个 recipe 至少抽一条中英文 route 做 section/block 结构检查；四个 hub 都做 desktop/mobile screenshot 和 console error 检查。
4. `/xiaohongshu/not-a-feature`、`/en/douyin/not-a-feature`、未知 platform、过多 segments 均显示产品 404 marker，不出现其他 detail 的标题、图片或 FAQ；direct request 的 HTTP status 由 server adapter 验证为 404。
5. 中文/英文 route pair 切换后保留 platform 和 slug，所有可见文案、alt、title、FAQ、CTA 都来自目标 locale；无中文 fallback。
6. 在窄 viewport 验证 feature grids、comparison rows、FAQ 文本和 CTA 不横向溢出；`prefers-reduced-motion` 下不依赖动画完成内容。

### 人工/视觉验收边界

机器 route coverage 不能证明“174 页完整复刻”。产品 owner 还需人工对照 `PAGE_CATALOG.md` 抽查：两个中文 hub、两个英文 hub，以及每个 recipe 至少一对中英文 detail，重点看首屏 H1/hero、section 顺序、FAQ/related、图片语义和 CTA。浏览器截图只证明当前实现的视觉结果，不替代 `report.json` 的原站证据。

## 11. 并发落地顺序与 lane 依赖

1. Foundation 先锁 `ProductRoute`、`navigate`、locale switch、Not Found status 和 CSS token contract。
2. 产品数据 lane 可并发生成 `productRoutes`、schema、20 个 platform-feature entries 和 locale completeness validator；只写产品目录路径。
3. 产品组件 lane 在接口锁定后并发实现 hub/detail/block components；只写 `src/features/product-lane/components/**` 和局部样式。
4. Foundation integrator 串行接入 matcher、shell 和 App dispatch；不得让两个 worker 同时修改 `src/main.jsx` 或同一全局 stylesheet。
5. 先跑 route/catalog 静态验收，再跑 build/unit，再跑 Playwright；任何有效 route 落到 placeholder、locale 缺失、404 fallback 泄漏或 mobile clipping 都阻止 lane 完成。

## 12. 未验证事项

- Foundation lane 的真实 router、shell props、CSS token 名称和 `main.jsx` 接入点尚未在本 lane 冻结；本文件给出的是接口语义，不是已存在的 API。
- 当前 package scripts、测试框架、Playwright 配置和 dev/preview server 端口未在本车道读取，因此实现验收命令仍需 integrator 绑定。
- 40 个 detail 的最终图片映射、英文 copy 的逐条审校、FAQ/related href 的完整闭包和每个页面的 block 顺序尚未实现或浏览器核验。
- SPA 直接访问未知 route 的 HTTP 404 需要 server/hosting adapter 配合；本 lane 只能规定可观察的 route status 和渲染边界。
- 当前源码的本地演示能力不代表真实插件、采集、AI、监控、飞书、支付或鉴权已经可用；这些均不纳入本 lane 的完成证明。
