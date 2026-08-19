import { useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowRight,
  ArrowUpRight,
  BellRing,
  BarChart3,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  CloudDownload,
  Columns3,
  Command,
  Download,
  ExternalLink,
  FileSpreadsheet,
  FileText,
  Filter,
  FolderKanban,
  Globe2,
  ImageDown,
  KeyRound,
  LayoutGrid,
  ListChecks,
  LockKeyhole,
  LogIn,
  Mail,
  Menu,
  MessageCircle,
  Moon,
  Radar,
  MousePointer2,
  Play,
  Search,
  ShieldCheck,
  Sparkles,
  Sun,
  Table2,
  Target,
  Timer,
  Users,
  Video,
  X,
  Zap,
} from 'lucide-react'
import './styles.css'
import homeShellRoutes from './rebuild/data/homeShell.js'
import xiaohongshuRoutes from './rebuild/data/xiaohongshu.js'
import douyinRoutes from './rebuild/data/douyin.js'
import blogIndexRoutes from './rebuild/data/blogIndex.js'
import blogArticlesARoutes from './rebuild/data/blogArticlesA.js'
import blogArticlesBRoutes from './rebuild/data/blogArticlesB.js'
import updateRoutes from './rebuild/data/updates.js'
import commercialLegalRoutes from './rebuild/data/commercialLegal.js'
import boundaryRoutes from './rebuild/data/boundaries.js'
import { BlogIndexRecordPage, BlogArticleRecordPage } from './rebuild/renderers/blogRecordPages.jsx'
import { CommercialRecordPage } from './rebuild/renderers/commercialRecordPages.jsx'
import { LegalRecordPage } from './rebuild/renderers/legalRecordPages.jsx'

const routeCatalog = [
  ...homeShellRoutes,
  ...xiaohongshuRoutes,
  ...douyinRoutes,
  ...blogIndexRoutes,
  ...blogArticlesARoutes,
  ...blogArticlesBRoutes,
  ...updateRoutes,
  ...commercialLegalRoutes,
  ...boundaryRoutes,
]

const routeByPath = new Map(routeCatalog.map((record) => [record.path, record]))
const routeCount = routeCatalog.length
if (routeCount !== 174) throw new Error(`MediaClaw route catalog must contain 174 records, received ${routeCount}`)

const featureCards = [
  { icon: Search, title: '赛道与关键词洞察', copy: '从一个主词扩展长尾需求，找到值得研究的方向与样本。', tone: 'mint' },
  { icon: BarChart3, title: '账号与爆款分析', copy: '从公开内容拆解选题、开头、表达与互动规律，留下可回溯证据。', tone: 'lavender' },
  { icon: MessageCircle, title: '评论区客资挖掘', copy: '批量采集评论，筛选高意向线索并导出给团队跟进。', tone: 'peach' },
  { icon: FileText, title: '逐字稿与 OCR', copy: '把视频口播和图片文字变成可搜索、可复用的内容资产。', tone: 'blue' },
  { icon: CloudDownload, title: '素材批量沉淀', copy: '无水印保存图片和视频，带上来源、标题与作者信息。', tone: 'yellow' },
  { icon: Table2, title: '飞书协作同步', copy: '将结构化结果同步到飞书多维表，交给团队继续加工。', tone: 'green' },
]

const platformData = {
  xiaohongshu: {
    label: '小红书能力集',
    title: '一站式完成小红书内容采集、分析和创作',
    summary: '从关键词、账号和爆款笔记出发，建立可复用的研究样本池。',
    accent: 'var(--mint-strong)',
    features: ['关键词洞察', '爆款笔记分析', '对标账号分析', '笔记与评论采集', '图片文案 OCR', '视频逐字稿'],
    image: '/assets/1-v20260424.webp',
  },
  douyin: {
    label: '抖音能力集',
    title: '把抖音热门内容变成下一条可拍的选题',
    summary: '从搜索、账号和高赞视频中提取结构化素材，减少试错成本。',
    accent: 'var(--blue-strong)',
    features: ['关键词洞察', '爆款视频分析', '账号分析', '视频与评论采集', '图文文案提取', '视频逐字稿'],
    image: '/assets/16-v20260424.webp',
  },
}

const pricingGroups = {
  yearly: [
    { name: '免费版', price: '¥0', description: '适合偶尔做内容研究的个人', features: ['单篇深度采集', '基础列表采集', 'CSV / Markdown 导出', '无水印素材下载'], action: '免费安装' },
    { name: '个人版', price: '¥25', note: '年度合计 ¥299', description: '适合持续做选题与内容运营的创作者', features: ['包含免费版全部能力', '批量增强与筛选', '飞书多维表同步', '含 1,500 积分'], action: '选择个人版', featured: true },
    { name: '团队版', price: '¥58', note: '年度合计 ¥699', description: '适合品牌、MCN 和多人的内容团队', features: ['包含个人版全部能力', '团队数据协作', '共享 5,000 积分', '多设备工作流'], action: '选择团队版' },
  ],
  monthly: [
    { name: '免费版', price: '¥0', description: '适合偶尔做内容研究的个人', features: ['单篇深度采集', '基础列表采集', 'CSV / Markdown 导出', '无水印素材下载'], action: '免费安装' },
    { name: '个人版', price: '¥39', note: '按月购买', description: '适合持续做选题与内容运营的创作者', features: ['包含免费版全部能力', '批量增强与筛选', '飞书多维表同步', '含 180 积分'], action: '选择个人版', featured: true },
    { name: '团队版', price: '¥88', note: '按月购买', description: '适合品牌、MCN 和多人的内容团队', features: ['包含个人版全部能力', '团队数据协作', '共享 600 积分', '多设备工作流'], action: '选择团队版' },
  ],
  credits: [
    { name: '轻量积分包', price: '¥19', note: '1,000 积分', description: '用于逐字稿、OCR 和 AI 任务', features: ['一次性购买', '会员有效期内使用', '不影响采集和同步', '按需补充'], action: '购买积分包' },
    { name: '进阶积分包', price: '¥49', note: '3,000 积分', description: '适合高频分析与内容创作', features: ['一次性购买', '任务明细可查', '支持账号分析', '支持团队补充'], action: '购买积分包', featured: true },
    { name: '团队积分包', price: '¥99', note: '8,000 积分', description: '用于多人协作的批量 AI 任务', features: ['一次性购买', '共享团队余额', '适合批量转录', '支持团队工作区'], action: '购买积分包' },
  ],
}

const faqs = [
  ['使用 MediaClaw 需要提供小红书或抖音密码吗？', '不需要。产品定位是读取你当前浏览器中已经能够看到的公开页面，不要求提交第三方平台密码。'],
  ['采集结果存在哪里？', '可以保存在本地并导出 CSV / Markdown，也可以同步到飞书多维表做协作和后续分析。'],
  ['免费版可以用多久？', '免费版长期可用，基础采集、单篇研究和素材下载不设置自动续费。'],
  ['批量采集会不会触发平台风控？', '任何采集行为都应遵守平台规则。建议控制节奏，合理使用暂停和等待设置，并只处理公开可见内容。'],
]

const docsNav = [
  { title: '从这里开始', copy: '安装、激活与第一次采集', id: 'start' },
  { title: '平台采集', copy: '小红书与抖音的入口', id: 'collect' },
  { title: '导出和同步', copy: 'CSV、Markdown 与飞书', id: 'output' },
  { title: '排障入口', copy: '诊断信息与原始链接', id: 'troubleshoot' },
]

const platformMenus = {
  xiaohongshu: {
    label: '小红书',
    href: '/xiaohongshu',
    kicker: '小红书能力集',
    copy: '从搜索词、账号和笔记出发，建立研究样本池。',
    items: [
      ['关键词洞察', '扩展搜索下拉词与选题机会', '/xiaohongshu/keywords', Search],
      ['爆款分析', '找低粉爆文，拆标题和内容结构', '/xiaohongshu/viral-content-analysis', BarChart3],
      ['账号分析', '寻找对标账号，比较内容风格', '/xiaohongshu/account-analysis', Users],
      ['笔记采集', '批量提取笔记与互动数据', '/xiaohongshu/scraper', FolderKanban],
      ['评论采集', '抓取评论并导出 Excel', '/xiaohongshu/comments', MessageCircle],
      ['评论区截流', '筛选高意向客户线索', '/xiaohongshu/leads', Target],
      ['去水印下载', '保存视频、图片和 Live 图', '/xiaohongshu/downloader', Download],
      ['图片文案 OCR', '提取封面与配图里的文字', '/xiaohongshu/image-text', ImageDown],
      ['视频逐字稿', '提取带时间戳的口播文本', '/xiaohongshu/transcript', Video],
      ['对标账号监控', '跟踪更新并推送飞书', '/xiaohongshu/monitoring', BellRing],
    ],
  },
  douyin: {
    label: '抖音',
    href: '/douyin',
    kicker: '抖音能力集',
    copy: '从搜索、账号和高赞视频中提取可复用的选题信号。',
    items: [
      ['关键词洞察', '研究搜索词与赛道机会', '/douyin/keywords', Search],
      ['爆款分析', '拆解低粉爆款视频为什么有效', '/douyin/viral-content-analysis', BarChart3],
      ['账号分析', '找到对标创作者与内容规律', '/douyin/account-analysis', Users],
      ['视频采集', '批量采集视频、账号和搜索结果', '/douyin/scraper', FolderKanban],
      ['评论采集', '抓取评论并同步分析', '/douyin/comments', MessageCircle],
      ['评论区截流', '挖掘高意向客户线索', '/douyin/leads', Target],
      ['去水印下载', '保存无水印 MP4 与图文素材', '/douyin/downloader', Download],
      ['图文文案 OCR', '提取合集图与商品卡文字', '/douyin/image-text', ImageDown],
      ['视频逐字稿', '生成带时间戳的口播文本', '/douyin/transcript', Video],
      ['对标账号监控', '追踪更新并推送飞书', '/douyin/monitoring', BellRing],
    ],
  },
}

const platformMenusEn = {
  xiaohongshu: {
    label: 'RedNote', href: '/en/xiaohongshu', kicker: 'RedNote capability set', copy: 'Research search terms, creators, and public posts in one workflow.',
    items: [['Keyword insights', 'Expand search suggestions and topic opportunities', '/en/xiaohongshu/keywords', Search], ['Viral analysis', 'Find low-follower hits and break down structure', '/en/xiaohongshu/viral-content-analysis', BarChart3], ['Account analysis', 'Compare creator positioning and content patterns', '/en/xiaohongshu/account-analysis', Users], ['Post scraping', 'Collect posts and public engagement data', '/en/xiaohongshu/scraper', FolderKanban], ['Comment scraping', 'Export comments for insight mining', '/en/xiaohongshu/comments', MessageCircle], ['Lead discovery', 'Find high-intent signals in comments', '/en/xiaohongshu/leads', Target], ['Media download', 'Save public images, videos, and Live photos', '/en/xiaohongshu/downloader', Download], ['Image text OCR', 'Extract text from covers and post images', '/en/xiaohongshu/image-text', ImageDown], ['Video transcripts', 'Extract timestamped spoken text', '/en/xiaohongshu/transcript', Video], ['Competitor monitoring', 'Track updates and route them to Lark', '/en/xiaohongshu/monitoring', BellRing]],
  },
  douyin: {
    label: 'Douyin', href: '/en/douyin', kicker: 'Douyin capability set', copy: 'Turn public search, creator, and video signals into the next content action.',
    items: [['Keyword insights', 'Research search terms and market opportunities', '/en/douyin/keywords', Search], ['Viral analysis', 'Study hooks, pacing, and public feedback', '/en/douyin/viral-content-analysis', BarChart3], ['Account analysis', 'Compare creators and publishing patterns', '/en/douyin/account-analysis', Users], ['Video scraping', 'Collect videos and search results', '/en/douyin/scraper', FolderKanban], ['Comment scraping', 'Export comments for further analysis', '/en/douyin/comments', MessageCircle], ['Lead discovery', 'Find high-intent comments and leads', '/en/douyin/leads', Target], ['Media download', 'Save public MP4 and image assets', '/en/douyin/downloader', Download], ['Image text OCR', 'Extract text from galleries and product cards', '/en/douyin/image-text', ImageDown], ['Video transcripts', 'Generate timestamped spoken text', '/en/douyin/transcript', Video], ['Competitor monitoring', 'Track creator updates and emerging hits', '/en/douyin/monitoring', BellRing]],
  },
}

const productCapabilityData = {
  keywords: {
    kicker: '赛道策略 / 关键词洞察',
    intro: '先判断一个搜索词有没有机会，再决定要研究哪些账号、内容和评论。',
    heroImage: '/assets/product/keywords-hero.webp',
    metrics: [['搜索联想词', '200+'], ['结果可筛选', 'A-Z'], ['下一步动作', '直连采集']],
    modules: [
      ['主词机会判断', '把搜索结果里的互动、账号体量和内容密度放在一起看，先排除只热不适合做的词。', '/assets/product/keywords-detail.webp', Search],
      ['联想词批量采集', '按字母和数字扩展搜索下拉词，统一清洗重复词，保留每个词的来源和采集时间。', '/assets/product/keyword-feature.webp', ListChecks],
      ['扩词直连采集', '从一个值得继续研究的长尾词直接发起笔记或视频采集，让词库变成样本池。', '/assets/product/search-workflow.webp', ArrowRight],
    ],
    rows: [['内容运营', '从主词找到低竞争长尾方向', '把下周选题从“凭感觉”变成可回溯的词表'], ['品牌团队', '持续观察品类搜索需求变化', '把用户说法沉淀成内容和投放词库'], ['研究人员', '构造有边界的公开样本', '保留关键词、页面和时间戳作为证据']],
    faqs: [['关键词洞察会直接替我判断爆款吗？', '不会。它负责扩展和整理公开搜索信号，最终的选题判断仍需要结合你的定位、资源和原始页面复核。'], ['扩词结果能继续采集吗？', '页面保留了从关键词到采集任务的下一步入口；本地版本是交互预览，真实采集仍需接入插件。'], ['如何降低采集节奏带来的风险？', '建议使用公开页面、合理等待和暂停设置，并遵守平台规则。']],
    related: [['爆款分析', 'viral-content-analysis'], ['笔记采集', 'scraper'], ['对标账号监控', 'monitoring']],
  },
  viral: {
    kicker: '爆款研究 / 单篇拆解',
    intro: '从低粉高互动样本开始，拆开标题、开头、内容推进和评论信号，找到真正能借鉴的方法。',
    heroImage: '/assets/product/viral-search.webp',
    metrics: [['筛选维度', '4'], ['证据来源', '公开页面'], ['输出', '拆解报告']],
    modules: [
      ['近期高互动搜索', '按关键词找到近期表现突出的内容，先看样本池，再决定要不要深入拆解。', '/assets/product/viral-search.webp', Search],
      ['低粉高赞筛选', '用账号体量和互动表现交叉筛选，减少大账号基数带来的判断偏差。', '/assets/product/xhs-low-follower.webp', Filter],
      ['单篇拆解报告', '把封面、标题、首屏、正文或口播、评论问题放进同一份可回溯报告。', '/assets/product/viral-report.webp', BarChart3],
    ],
    rows: [['新号创作者', '寻找够得着的参考样本', '从一条内容扩展成可拍的选题系列'], ['内容团队', '复盘口播与图文结构', '形成共享的标题、开头和节奏方法库'], ['品牌研究', '理解公开反馈里的未满足需求', '把评论问题转成内容机会']],
    faqs: [['爆款分析只看点赞吗？', '不是。页面结构同时强调账号体量、标题与首屏、正文或口播结构，以及公开评论信号。'], ['会直接生成原文改写吗？', '不会。拆解的目标是提炼方法和证据，不复制原内容。'], ['视频也能分析吗？', '可以进入逐字稿和单篇拆解的组合工作流；当前重建展示公开流程，未连接真实 AI 任务。']],
    related: [['关键词洞察', 'keywords'], ['账号分析', 'account-analysis'], ['视频逐字稿', 'transcript']],
  },
  account: {
    kicker: '对标研究 / 账号分析',
    intro: '从一个值得研究的账号开始，按样本分层拆解定位、选题、视觉和表达方式。',
    heroImage: '/assets/product/account-workflow.png',
    metrics: [['分析维度', '5'], ['样本控制', '可调'], ['报告状态', '可追踪']],
    modules: [
      ['从爆款反推账号', '先从赛道爆款和公开内容找到候选创作者，再进入账号主页建立样本。', '/assets/product/account-workflow.png', Target],
      ['样本分层筛选', '按时间、互动和内容类型分层选样，保留自动建议，也允许人工调整。', '/assets/product/account-filter.webp', Filter],
      ['报告与证据归档', '定位、选题地图、开头规律、视觉系统和可写选题集中在一份报告中。', '/assets/product/account-report.webp', FileText],
    ],
    rows: [['进入新赛道', '快速理解头部与中腰部账号', '减少从零试错的时间'], ['竞品复盘', '比较账号的内容结构和更新节奏', '把观察变成团队共识'], ['研究团队', '建立带来源的账号样本库', '事实、判断和证据分层保存']],
    faqs: [['账号分析和主页采集有什么区别？', '主页采集解决“拿到数据”，账号分析进一步按样本生成结构化判断，两者是前后衔接的工作流。'], ['需要分析多少条内容？', '数量取决于账号更新频率和研究目标，页面支持先自动分层，再手动调整样本。'], ['能看到私密粉丝画像吗？', '不能。本页只保留公开页面可观察的内容和互动信号。']],
    related: [['爆款分析', 'viral-content-analysis'], ['笔记采集', 'scraper'], ['账号监控', 'monitoring']],
  },
  scraper: {
    kicker: '内容采集 / 结构化沉淀',
    intro: '按关键词、账号或单条内容采集公开样本，把原始页面变成能筛选、导出和继续分析的记录。',
    heroImage: '/assets/product/scraper-hero.webp',
    metrics: [['采集入口', '3'], ['导出格式', 'CSV / MD'], ['数据边界', '公开页面']],
    modules: [
      ['单条深度采集', '保留标题、作者、发布时间、互动、正文和原始链接，适合做一条内容的完整研究。', '/assets/product/scraper-hero.webp', FileText],
      ['账号主页批量拉取', '按账号主页建立连续样本，可结合时间、互动和内容类型做筛选。', '/assets/product/scraper-fields.webp', Users],
      ['关键词结果批量采集', '把搜索结果批量沉淀成结构化列表，后续可直接进入爆款、评论或账号分析。', '/assets/product/scraper-export.png', CloudDownload],
    ],
    rows: [['运营日常', '保存竞品内容和互动数据', '减少手动复制与重复整理'], ['内容研究', '构造可复核的公开样本', '来源和原始链接跟随记录导出'], ['团队协作', 'CSV / Markdown 交给下一环节', '接入飞书或本地分析工具继续处理']],
    faqs: [['采集支持哪些页面？', '公开的搜索结果、账号主页、单篇笔记或视频是主要入口，页面会根据当前浏览器页面显示动作。'], ['能定时在后台采集吗？', '公开页面工作流与后台定时任务是不同能力，本地重建只展示前端结构。'], ['采集会不会触发平台风控？', '任何采集都要遵守平台规则。请控制节奏、使用合理等待，并只处理公开可见内容。']],
    related: [['评论采集', 'comments'], ['关键词洞察', 'keywords'], ['账号分析', 'account-analysis']],
  },
  comments: {
    kicker: '评论研究 / 需求挖掘',
    intro: '把评论区从“手动翻页”变成可筛选的需求样本，导出后继续做客资、情绪和选题分析。',
    heroImage: '/assets/product/comments-hero.webp',
    metrics: [['采集对象', '评论 / 回复'], ['导出', 'Excel / CSV'], ['下一步', '客资挖掘']],
    modules: [
      ['评论区批量采集', '按单篇内容滚动加载评论和回复，保留昵称、主页、时间、点赞与原文上下文。', '/assets/product/comments-hero.webp', MessageCircle],
      ['采集时筛高潜客资', '在采集过程中按关键词、位置和意向信号筛出值得跟进的评论。', '/assets/product/comments-feature.webp', Target],
      ['一键导出与分析', '评论数据可导出为 Excel / CSV，继续进入情绪归类、需求洞察或团队协作。', '/assets/product/comments-export.png', FileSpreadsheet],
    ],
    rows: [['内容运营', '集中复盘多篇种草笔记的反馈', '找到用户反复追问的主题'], ['销售与增长', '从评论里筛选高意向表达', '输出带主页链接的跟进名单'], ['研究团队', '批量获取公开评论语料', '按主题、时间和互动字段分析']],
    faqs: [['一次应该采集多少评论？', '没有统一数字。先按研究问题确定样本，再根据加载状态和节奏分批采集，避免无目的地追求数量。'], ['评论能同步飞书吗？', '真实同步需要接入飞书配置；本地页面保留了导出与协作入口。'], ['评论采集是否包含回复？', '页面按评论和回复的公开层级设计，具体深度取决于当前页面可见内容。']],
    related: [['评论区截流', 'leads'], ['笔记采集', 'scraper'], ['账号监控', 'monitoring']],
  },
  imageText: {
    kicker: 'OCR / 图文内容提取',
    intro: '封面、合集图和商品卡里的信息不再是“只能看不能复制”的图片，批量识别后回填到采集记录。',
    heroImage: '/assets/product/ocr-detail.webp',
    metrics: [['识别范围', '封面 + 配图'], ['输出', '可复制文本'], ['写回', '采集记录']],
    modules: [
      ['逐张识别封面与配图', '对一条图文内容的封面和每张配图统一发起识别，避免手机截图和逐张上传。', '/assets/product/ocr-detail.webp', ImageDown],
      ['结果回填原始记录', '识别文本与原始图片同一条记录保存，复制、导出和后续 AI 处理都能追溯来源。', '/assets/product/ocr-writeback.webp', FileText],
      ['识别结果继续加工', '把步骤、书单、参数、价格和教程文字转成可搜索的内容资产。', '/assets/product/comments-export.png', Sparkles],
    ],
    rows: [['图文运营', '整理封面和卡片里的写作素材', '减少手动转录，快速建立可搜索文案库'], ['电商团队', '提取商品卡的价格与参数', '为复盘、比价和脚本准备结构化字段'], ['研究人员', '批量处理图像型公开材料', '保留原图与识别文本的对应关系']],
    faqs: [['为什么不用在线 OCR？', '在线 OCR 通常需要手动搬运图片。本工作流把公开内容采集、识别和写回放在同一条记录里。'], ['识别结果一定准确吗？', 'OCR 结果需要人工复核，尤其是小字、复杂背景和特殊字体。页面不把识别结果当作事实证明。'], ['图文和视频使用同一流程吗？', '图文使用 OCR，视频使用逐字稿，两者都可以回到同一条内容研究链路。']],
    related: [['视频逐字稿', 'transcript'], ['笔记采集', 'scraper'], ['去水印下载', 'downloader']],
  },
  transcript: {
    kicker: '视频研究 / 逐字稿',
    intro: '把视频口播变成带时间戳的句子，才能看清前三秒、转折、节奏和可复用的话术。',
    heroImage: '/assets/product/transcript-feature.webp',
    metrics: [['输出', '带时间戳'], ['适合', '单条 / 批量'], ['下一步', 'AI 拆解']],
    modules: [
      ['一键提取完整口播', '从内容记录直接发起转写，不需要先把视频下载到本地再手动上传。', '/assets/product/transcript-feature.webp', Video],
      ['时间戳对照节奏', '按句子保留时间轴，方便标记开头、转折、举例和结尾的节奏变化。', '/assets/product/breakdown-report.webp', Timer],
      ['逐字稿进入创作', '提取后的文本可以继续做结构拆解、仿写和脚本库沉淀；本地版本仅展示流程。', '/assets/product/viral-report.webp', Sparkles],
    ],
    rows: [['短视频运营', '拆解对标视频的口播结构', '把“感觉好”拆成可执行的脚本节奏'], ['编导与创作者', '提取自己的历史作品', '建立可检索、可复用的表达库'], ['研究团队', '批量整理视频语料', '用时间戳对照画面、语言和互动']],
    faqs: [['必须配置飞书才能提取吗？', '真实产品支持不同路径；本地页面只呈现入口，不宣称已接入飞书或转写服务。'], ['为什么一定要保留时间戳？', '时间戳让脚本结构和视频节奏能够对照复核，避免只看纯文本。'], ['没有口播的视频还能用吗？', '可以保留视频采集和图文 OCR 等其他路径，逐字稿只适用于有可识别语音的内容。']],
    related: [['爆款分析', 'viral-content-analysis'], ['图文文案提取', 'image-text'], ['内容采集', 'scraper']],
  },
  leads: {
    kicker: '评论区截流 / 客资筛选',
    intro: '从海量评论里找到真正有意向的人，保留主页、位置和原话，方便团队继续分配和跟进。',
    heroImage: '/assets/product/leads-hero.webp',
    metrics: [['筛选信号', '关键词 + 位置'], ['导出', 'Excel / CSV'], ['记录字段', '主页 / 原话']],
    modules: [
      ['意向关键词过滤', '识别咨询、求链接、价格、地点和联系方式等表达，先把评论噪音降下来。', '/assets/product/leads-hero.webp', Filter],
      ['保留跟进所需字段', '导出时带上昵称、主页链接、IP 属地和原始评论，避免线索离开上下文。', '/assets/product/leads-feature.webp', FileSpreadsheet],
      ['从线索进入团队流程', '把筛选后的名单交给销售、运营或飞书表格继续分配；真实自动化仍需后端配置。', '/assets/product/comments-export.png', Users],
    ],
    rows: [['本地商家', '从同城内容评论筛选咨询', '更快找到有明确需求的用户'], ['知识服务', '识别求资料、求课程和求链接', '把评论需求转成可跟进名单'], ['增长团队', '按活动或内容批次复盘客资', '保留来源和原话，方便核验']],
    faqs: [['能识别“v、VX”等变体吗？', '页面展示了关键词筛选这一入口，但识别效果取决于实际规则和数据，不能把前端预览当成已接入的识别服务。'], ['导出线索需要付费吗？', '本地重建只展示导出路径，具体套餐和额度应以真实产品服务为准。'], ['如何避免误把普通评论当客资？', '使用关键词和位置做初筛后，仍需人工复核原话和主页，不建议全自动触达。']],
    related: [['评论采集', 'comments'], ['内容采集', 'scraper'], ['飞书集成', '/features/feishu-integration']],
  },
  monitoring: {
    kicker: '对标账号监控 / 日常预警',
    intro: '把对标账号的更新变成固定节奏的研究输入，命中后再做分析，而不是每天手动刷主页。',
    heroImage: '/assets/product/monitoring-hero.webp',
    metrics: [['监控方式', '定期扫描'], ['结果', '日报 + 摘要'], ['历史', '持续留存']],
    modules: [
      ['订阅账号，持续追踪', '把需要关注的公开账号加入监控列表，按规则查看新增内容和更新节奏。', '/assets/product/monitoring-hero.webp', BellRing],
      ['命中后生成洞察', '对新内容做筛选和摘要，把值得团队注意的变化集中到日报或消息入口。', '/assets/product/monitor-feature.webp', Radar],
      ['历史记录可回看', '保留更新、分析和跟进记录，方便做周报、竞品复盘和选题回溯。', '/assets/product/monitor-demo.webp', Table2],
    ],
    rows: [['品牌与 MCN', '持续观察竞品更新', '把刷屏动作变成可分配的任务'], ['内容运营', '关注账号选题和更新节奏', '及时发现内容风向变化'], ['研究团队', '积累长期公开样本', '让结论有时间序列证据']],
    faqs: [['如何减少监控噪音？', '先按账号、关键词和互动条件设置规则，再把高价值更新交给人工复核，避免把所有变化都当成提醒。'], ['老内容二次起量能发现吗？', '页面保留了互动变化和历史记录的产品结构，但真实检测需要后端数据持续运行。'], ['可以监控自己的账号吗？', '公开页面原则上可以观察自己的公开内容；私密数据和平台后台数据不在本重建范围内。']],
    related: [['账号分析', 'account-analysis'], ['关键词洞察', 'keywords'], ['飞书集成', '/features/feishu-integration']],
  },
  downloader: {
    kicker: '素材下载 / 原始文件沉淀',
    intro: '从公开内容里保存原始视频、图片和封面，继续进入研究、归档和创作流程。',
    heroImage: '/assets/1-v20260424.webp',
    metrics: [['下载对象', '视频 + 图片'], ['处理方式', '单条 / 批量'], ['输出', '原始素材']],
    modules: [
      ['无水印视频直链', '从内容详情页提取可下载的原始视频入口，减少重复录屏和压缩损失。', '/assets/1-v20260424.webp', Video],
      ['图文配图与封面', '把图文内容的配图、封面和 Live 图按原始顺序保存，方便后续核对。', '/assets/product/ocr-detail.webp', ImageDown],
      ['先筛选，再下载', '把素材下载接到采集与分析之后，只保存真正有研究价值的公开内容。', '/assets/product/scraper-hero.webp', Filter],
    ],
    rows: [['内容创作者', '保存可参考的公开视觉素材', '建立自己的灵感与素材档案'], ['运营团队', '批量归档竞品视频和图文', '复盘素材风格和内容节奏'], ['研究人员', '保留原始附件作为证据', '让媒体文件与来源记录对应']],
    faqs: [['下载会压缩画质吗？', '页面呈现原始素材下载入口，但最终文件质量取决于平台公开资源和真实插件实现。'], ['下载的素材可以直接商用吗？', '不可以据此推断。下载后仍需确认版权、授权和平台使用规则。'], ['支持批量下载吗？', '真实产品页面包含批量工作流，本地重建只展示前端结构。']],
    related: [['内容采集', 'scraper'], ['图文文案提取', 'image-text'], ['视频逐字稿', 'transcript']],
  },
}

function productKeyFromPath(path) {
  const slug = path.split('/').filter(Boolean).pop()
  return slug === 'viral-content-analysis' ? 'viral' : slug === 'account-analysis' ? 'account' : slug === 'image-text' ? 'imageText' : slug
}

const blogCategories = ['全部', '抖音', '小红书', '数据采集', 'AI 选题', '内容运营', '学术研究']
const blogCategoryAliases = { 'content-ideas': 'AI 选题', 'content-strategy': '内容运营', 'download-without-watermark': '小红书', 'extract-video-transcript': '数据采集', 'keyword-research': '小红书', 'lead-generation': '内容运营', 'low-follower-high-engagement': '小红书', rednote: '小红书', 'rednote-operations': '内容运营', 'rednote-seo': '小红书', xiaohongshu: '小红书', 'xiaohongshu-seo': '小红书' }
const blogPosts = [
  { slug: 'douyin-data-collection', category: '抖音', title: '抖音数据采集怎么做？从批量采集到分析的完整流程', excerpt: '想批量采集抖音数据做竞品分析或选题研究？这篇讲清关键词、博主、合集、单条四条路径，以及采集后如何导出 CSV 并落到能出结论的分析。', tags: ['抖音', '数据采集', '批量采集', '合集采集'], image: '/assets/16-v20260424.webp', sections: ['关键词、博主、合集、单条四条采集路径', '用 Chrome 插件采集并导出 CSV', '把互动数据转成可复用的选题判断'] },
  { slug: 'douyin-comment-export', category: '抖音', title: '抖音评论怎么批量导出？采集、看不全的坑，到筛出客资线索', excerpt: '抖音评论想批量导出做分析或找客资？从评论加载不全，到如何用结构化字段筛出高意向线索，一篇说明完整流程。', tags: ['抖音', '评论采集', '评论导出', '客资筛选'], image: '/assets/2-v20260309.webp', sections: ['等待评论加载并保留楼层上下文', '导出评论、昵称、主页和互动字段', '按关键词筛选高意向客户线索'] },
  { slug: 'xiaohongshu-ai-benchmark-to-draft', category: 'AI 选题', title: '怎么用 AI 把对标内容 10 分钟变成自己的小红书初稿', excerpt: '刷到一篇好内容想跟，却拆不出能借鉴的要素？把对标内容拆解成报告、扩展成选题卡，再按自己的账号风格生成初稿。', tags: ['小红书', 'AI 选题', '对标拆解', '内容初稿'], image: '/assets/mediaclaw-demo-20260424-t008.webp', sections: ['采集一篇值得研究的公开内容', '用结构化字段拆出标题、开头和内容节奏', '结合自己的经历和信息增量完成改写'] },
  { slug: 'xiaohongshu-research-data-collection', category: '学术研究', title: '写论文怎么从小红书和抖音采集研究数据', excerpt: '免费采集搜索样本与评论语料，导出 CSV/Markdown 进 SPSS、NVivo，附取样逻辑与研究伦理提醒。', tags: ['内容分析', '话语分析', '数据采集'], image: '/assets/1-v20260424.webp', sections: ['先定义研究问题与取样边界', '保留来源、发布时间与互动字段', '导出 CSV/Markdown，建立可复核的材料目录'] },
  { slug: 'short-video-transcript-extraction', category: '数据采集', title: '小红书抖音视频逐字稿提取', excerpt: '逐字稿不只是把口播变成字：可以选择飞书多维表格加阿里百炼的批量路径，也可以在插件内直接提取带时间戳的分句节奏稿。', tags: ['视频逐字稿提取', '带时间戳逐字稿', '视频节奏分析'], image: '/assets/16-v20260424.webp', sections: ['采集记录保留视频原始链接', '选择飞书 AI 字段或插件内直接提取', '用时间戳对照开头、转折与结尾节奏'] },
  { slug: 'xiaohongshu-image-text-extraction', category: '小红书', title: '小红书图片文字提取：把卡片里的干货一次性提成文字', excerpt: '步骤、书单、价格和参数常常写在图片卡片里。OCR 会对封面和配图逐张识别，把文字回填到采集记录，复制和导出都带着走。', tags: ['图片文字提取', '卡片文字 OCR', '图片转文字'], image: '/assets/1-v20260424.webp', sections: ['从公开笔记采集图片附件', '对封面和配图逐张识别文字', '回填记录后复制、导出或同步飞书'] },
  { slug: 'xiaohongshu-brand-sentiment-monitoring', category: '内容运营', title: '小红书品牌词怎么监控？内容风向舆情扫描', excerpt: '用关键词舆情扫描看清搜索页风向，再用评论和原数据确认情绪，配合账号监控与飞书日报，把品牌词监控变成固定动作。', tags: ['小红书', '品牌舆情', '负面预警', '评论风向'], image: '/assets/2-v20260309.webp', sections: ['建立品牌词与竞品词清单', '按时间和互动信号筛出异常内容', '通过飞书日报分发给负责团队'] },
  { slug: 'xiaohongshu-find-benchmark-accounts', category: '小红书', title: '自动找小红书抖音对标账号的邪修法：用聚合爆款数据反推', excerpt: '别只靠推荐算法找对标。用半年内的高赞爆款反推反复出现的账号，分层挖出头部、腰部和低粉黑马。', tags: ['小红书对标账号', '抖音找对标账号', '低粉高赞'], image: '/assets/mediaclaw-demo-20260424-t008.webp', sections: ['先用赛道词收集高表现内容', '按作者出现频次建立候选账号池', '分层比较选题、结构和互动效率'] },
]

const downloaderData = {
  xiaohongshu: {
    label: '小红书去水印下载', title: '免费批量下载小红书无水印视频与高清原图', description: '一键批量下载小红书图文图片和视频笔记，高清无水印保存原画质；下载后可直接进入内容分析与二次创作流程。', image: '/assets/1-v20260424.webp', modes: [
      ['批量下载图文配图', '进入一篇笔记后，一键保存全部图片，避免逐张右键另存。', ImageDown],
      ['视频素材无水印下载', '提取视频直链并保留原始格式，适合建立视觉参考库。', Video],
      ['下载与采集组合', '先筛选高价值内容，再把结构化数据和媒体文件一起归档。', FolderKanban],
    ], scenarios: [['内容创作者', '建立竞品视觉参考库', '用具体样本减少创作猜测'], ['设计团队', '批量收集同行版式与风格', '更快做视觉方向判断'], ['运营团队', '按赛道与主题整理素材', '让素材可以被搜索和复用']], faq: [['免费版支持批量下载吗？', '支持。安装后在笔记详情页执行批量下载，保存图文图片和视频素材。'], ['会压缩画质吗？', '默认以原始质量下载，尽量保留素材清晰度和细节。'], ['下载后怎么使用更稳妥？', '不建议原样搬运发布，建议用于视觉参考、复盘和有独立信息增量的二次创作。']], related: [['小红书笔记采集', '/xiaohongshu'], ['小红书评论采集', '/xiaohongshu/comments'], ['小红书关键词洞察', '/xiaohongshu/keywords']],
  },
  douyin: {
    label: '抖音去水印下载', title: '免费批量下载抖音无水印视频与图文素材', description: '一键批量下载抖音视频和图文内容，无水印保存原画质；下载后可直接进入内容分析与二次创作流程。', image: '/assets/16-v20260424.webp', modes: [
      ['无水印视频 MP4 直链', '提取原始 MP4 流媒体链接，避免二次编码损失，适合混剪和节奏拆解。', Video],
      ['图文配图批量保存', '遇到图文作品时，一键保存全部配图，不论 3 张还是 18 张都保留原始分辨率。', ImageDown],
      ['封面图打包下载', '导出附件会将封面与视频或配图一起打包，方便做封面参考和钩子拆解。', FolderKanban],
    ], scenarios: [['视频剪辑', '下载对标视频做混剪和卡点素材', '无损源文件直接进入剪辑'], ['品牌团队', '长期存档赛道视频变化', '形成可复用的视觉情报资产'], ['内容运营', '建立系列选题的封面参考基线', '让封面表达和钩子更清晰']], faq: [['免费版支持批量下载吗？', '支持。安装后在作品详情页执行批量下载，提取原始 MP4 直链，免费、不限次数、无需注册登录。'], ['图文配图和封面也能一起下载吗？', '能。图文作品可批量保存全部配图，导出附件还会把封面图一并打包。'], ['下载素材怎么用更稳妥？', '不建议直接搬运发布，建议调色、混剪、配音或仅作内部分析，并遵守平台规范。']], related: [['抖音视频采集', '/douyin'], ['抖音视频逐字稿', '/douyin/transcript'], ['抖音图文文案提取', '/douyin/image-text']],
  },
}

function navigate(path) {
  window.history.pushState({}, '', path)
  window.dispatchEvent(new PopStateEvent('popstate'))
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function Brand({ onNavigate, locale = 'zh' }) {
  const isEnglish = locale === 'en'
  return <button className="brand" onClick={() => onNavigate(isEnglish ? '/en' : '/')} aria-label={isEnglish ? 'Back to MediaClaw home' : '返回 MediaClaw 首页'}>
    <img src="/assets/logo.png" alt="" />
    <span>MediaClaw</span>
    <small>{isEnglish ? 'Social media ops' : '社媒虾'}</small>
  </button>
}

function PlatformMenu({ menu, open, onToggle, onNavigate }) {
  return <div className="nav-menu platform-menu">
    <button className="nav-menu-trigger" aria-haspopup="menu" aria-expanded={open} onClick={() => onToggle(menu.label)}>
      {menu.label} <ChevronDown size={15} className={open ? 'is-open' : ''} />
    </button>
    {open && <div className="platform-popover" role="menu">
      <button className="platform-popover-overview" role="menuitem" onClick={() => onNavigate(menu.href)}>
        <span className="platform-popover-kicker">{menu.kicker}</span>
        <strong>{menu.copy}</strong>
        <span>查看全部能力 <ArrowRight size={14} /></span>
      </button>
      <div className="platform-popover-grid">
        {menu.items.map(([label, copy, href, Icon]) => <button key={href} role="menuitem" onClick={() => onNavigate(href)}>
          <Icon size={16} />
          <span><strong>{label}</strong><small>{copy}</small></span>
        </button>)}
      </div>
    </div>}
  </div>
}

function Header({ onNavigate, locale = 'zh' }) {
  const isEnglish = locale === 'en'
  const menus = isEnglish ? platformMenusEn : platformMenus
  const prefix = isEnglish ? '/en' : ''
  const [open, setOpen] = useState(false)
  const [platformOpen, setPlatformOpen] = useState(null)
  const [moreOpen, setMoreOpen] = useState(false)
  const [dark, setDark] = useState(false)
  useEffect(() => { document.documentElement.dataset.theme = dark ? 'dark' : 'light' }, [dark])
  const togglePlatform = (label) => { setPlatformOpen(platformOpen === label ? null : label); setMoreOpen(false) }
  const go = (path) => { setPlatformOpen(null); setMoreOpen(false); setOpen(false); onNavigate(path) }
  return <header className="site-header">
    <div className="header-inner">
      <Brand onNavigate={go} locale={locale} />
      <nav className={open ? 'main-nav is-open' : 'main-nav'} aria-label={isEnglish ? 'Main navigation' : '主导航'}>
        <PlatformMenu menu={menus.xiaohongshu} open={platformOpen === menus.xiaohongshu.label} onToggle={togglePlatform} onNavigate={go} />
        <PlatformMenu menu={menus.douyin} open={platformOpen === menus.douyin.label} onToggle={togglePlatform} onNavigate={go} />
        <button onClick={() => go(`${prefix}/pricing`)}>{isEnglish ? 'Pricing' : '价格'}</button>
        <div className="nav-menu">
          <button className="nav-menu-trigger" aria-haspopup="menu" aria-expanded={moreOpen} onClick={() => { setMoreOpen(!moreOpen); setPlatformOpen(null) }}>{isEnglish ? 'Resources' : '资源'} <ChevronDown size={15} className={moreOpen ? 'is-open' : ''} /></button>
          {moreOpen && <div className="nav-popover">
            <button onClick={() => go(`${prefix}/download`)}><Download size={15} />{isEnglish ? 'Download extension' : '下载插件'}</button>
            <button onClick={() => go(isEnglish ? '/docs' : '/docs')}><BookOpen size={15} />{isEnglish ? 'Docs' : '使用文档'}</button>
            <button onClick={() => go(`${prefix}/blog`)}><BookOpen size={15} />{isEnglish ? 'Blog' : '内容文章'}</button>
            <button onClick={() => go(`${prefix}/features/feishu-integration`)}><Table2 size={15} />{isEnglish ? 'Lark integration' : '飞书集成'}</button>
          </div>}
        </div>
      </nav>
      <div className="header-actions">
        <button className="icon-button" title="切换主题" onClick={() => setDark(!dark)}>{dark ? <Sun size={17} /> : <Moon size={17} />}</button>
        <button className="locale-button" onClick={() => go(isEnglish ? '/' : '/en')}>{isEnglish ? '中' : 'EN'}</button>
        <button className="button button-ghost small hide-mobile" onClick={() => go('/sign-in')}>{isEnglish ? 'Sign in' : '登录'}</button>
        <button className="button button-primary small hide-mobile" onClick={() => go(`${prefix}/download`)}>{isEnglish ? 'Install free' : '免费安装'} <ArrowRight size={15} /></button>
        <button className="icon-button menu-toggle" title="打开导航" onClick={() => setOpen(!open)}>{open ? <X size={20} /> : <Menu size={20} />}</button>
      </div>
    </div>
  </header>
}

function TrustRow() {
  return <div className="trust-row">
    <span><ShieldCheck size={16} /> 只处理公开可见内容</span>
    <span><Zap size={16} /> 本地浏览器工作流</span>
    <span><Table2 size={16} /> 支持飞书多维表</span>
  </div>
}

function Home({ onNavigate }) {
  const [activePlatform, setActivePlatform] = useState('xiaohongshu')
  const platform = platformData[activePlatform]
  const [openFaq, setOpenFaq] = useState(0)
  return <>
    <section className="hero-section">
      <div className="hero-grid page-shell">
        <div className="hero-copy">
          <div className="eyebrow"><span className="status-dot" /> 社媒内容运营工作台</div>
          <h1>自媒体采集分析、<em>AI 选题创作</em><br />一套搞定</h1>
          <p className="hero-lead">从公开内容中找到方向、样本和证据，再把下一条内容交给你的工作流。小红书与抖音，一套插件串起来。</p>
          <div className="hero-actions">
            <button className="button button-primary large" onClick={() => onNavigate('/download')}>免费安装插件 <ArrowRight size={17} /></button>
            <button className="button button-soft large" onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}><Play size={17} /> 看工作流</button>
          </div>
          <TrustRow />
        </div>
        <div className="hero-visual">
          <div className="visual-backdrop" />
          <div className="hero-window">
            <div className="window-bar"><div className="window-dots"><i /><i /><i /></div><span>mediaclaw.app / workspace</span><Command size={15} /></div>
            <div className="window-body">
              <aside className="window-sidebar"><div className="mini-logo"><img src="/assets/logo.png" alt="" /></div><span className="active"><LayoutGrid size={15} /></span><span><Search size={15} /></span><span><BarChart3 size={15} /></span><span><MessageCircle size={15} /></span></aside>
              <div className="window-content">
                <div className="window-heading"><div><span className="small-label">今日研究空间</span><strong>热门内容样本</strong></div><span className="date-pill">刚刚更新</span></div>
                <div className="metric-row"><div><span>采集样本</span><b>2,846</b><small>+18.4%</small></div><div><span>高潜选题</span><b>128</b><small>+24.1%</small></div><div><span>待处理任务</span><b>16</b><small className="muted">进行中</small></div></div>
                <img src="/assets/mediaclaw-demo-20260424-t008.webp" alt="MediaClaw 工作流预览" className="hero-screen" />
              </div>
            </div>
          </div>
          <div className="floating-note note-one"><Sparkles size={15} /><span>AI 选题建议<br /><b>已生成 12 条</b></span></div>
          <div className="floating-note note-two"><Check size={15} /><span>飞书同步完成<br /><b>128 条记录</b></span></div>
        </div>
      </div>
    </section>

    <section className="platform-section section-band" id="demo">
      <div className="page-shell">
        <div className="section-heading centered"><span className="eyebrow">一个插件，多个平台</span><h2>从研究样本，到内容动作</h2><p>把重复的采集、整理和初步分析交给工作流，运营把时间留给判断。</p></div>
        <div className="platform-switcher" role="tablist">
          {Object.entries(platformData).map(([key, item]) => <button key={key} className={activePlatform === key ? 'platform-tab active' : 'platform-tab'} onClick={() => setActivePlatform(key)} role="tab" aria-selected={activePlatform === key}><span className={key === 'xiaohongshu' ? 'platform-icon xhs' : 'platform-icon douyin'}>{key === 'xiaohongshu' ? '小' : '抖'}</span>{item.label}</button>)}
        </div>
        <div className="platform-panel" style={{ '--platform-accent': platform.accent }}>
          <div className="platform-copy"><span className="section-kicker">{platform.label}</span><h3>{platform.title}</h3><p>{platform.summary}</p><div className="platform-features">{platform.features.map(feature => <span key={feature}><Check size={15} /> {feature}</span>)}</div><button className="text-link" onClick={() => onNavigate(`/${activePlatform}`)}>查看全部能力 <ArrowRight size={15} /></button></div>
          <div className="platform-image-wrap"><img src={platform.image} alt={`${platform.label}工作流`} /><div className="image-label"><span className="status-dot" /> 公开内容样本 <b>实时整理</b></div></div>
        </div>
      </div>
    </section>

    <section className="features-section page-shell">
      <div className="section-heading"><span className="eyebrow">核心能力与业务价值</span><h2>每一条内容，都能继续往下走</h2><p>不止是一张数据表。把素材变成分析、把分析变成选题、把选题变成团队动作。</p></div>
      <div className="feature-grid">{featureCards.map(({ icon: Icon, title, copy, tone }) => <article className={`feature-card ${tone}`} key={title}><div className="feature-icon"><Icon size={20} /></div><h3>{title}</h3><p>{copy}</p><button className="card-link" onClick={() => onNavigate('/xiaohongshu')}>了解更多 <ChevronRight size={15} /></button></article>)}</div>
    </section>

    <section className="workflow-section section-band">
      <div className="page-shell workflow-grid"><div className="workflow-art"><img src="/assets/2-v20260309.webp" alt="批量采集工作流" /><div className="workflow-tag tag-top"><MousePointer2 size={15} /> 一键发起采集</div><div className="workflow-tag tag-bottom"><Target size={15} /> 筛选高价值样本</div></div><div className="workflow-copy"><span className="eyebrow">从一个目标开始</span><h2>一句话说清楚，剩下的交给工作流</h2><p>从赛道词、账号或一条爆款内容开始，建立研究样本池。你可以选择下一步要采集、分析，还是同步给团队。</p><div className="step-list"><div><b>01</b><span><strong>先收集公开样本</strong><small>关键词、账号主页、单篇笔记或视频</small></span></div><div><b>02</b><span><strong>再做结构化分析</strong><small>标题、开头、内容节奏、评论信号</small></span></div><div><b>03</b><span><strong>最后进入创作流程</strong><small>导出、同步、生成下一步选题</small></span></div></div><button className="button button-dark" onClick={() => onNavigate('/download')}>开始第一次采集 <ArrowRight size={16} /></button></div></div>
    </section>

    <section className="pricing-section page-shell" id="pricing-preview"><div className="section-heading centered"><span className="eyebrow">简单透明的价格方案</span><h2>基础采集免费，按需升级</h2><p>不自动续费。需要批量增强、AI 任务和团队协作时，再选择适合你的方案。</p></div><div className="mini-pricing-grid">{pricingGroups.yearly.map((plan) => <div className={plan.featured ? 'mini-price-card featured' : 'mini-price-card'} key={plan.name}><div className="plan-top"><span>{plan.name}</span>{plan.featured && <b>最受欢迎</b>}</div><strong>{plan.price}</strong><small>{plan.note || '永久免费'}</small><ul>{plan.features.slice(0, 3).map(item => <li key={item}><Check size={14} />{item}</li>)}</ul><button className={plan.featured ? 'button button-primary full' : 'button button-soft full'} onClick={() => onNavigate('/pricing')}>{plan.action}</button></div>)}</div><div className="center-action"><button className="text-link" onClick={() => onNavigate('/pricing')}>比较全部方案 <ArrowRight size={15} /></button></div></section>

    <section className="faq-section section-band"><div className="page-shell faq-grid"><div className="section-heading"><span className="eyebrow">常见问题</span><h2>开始之前，先把边界说清楚</h2><p>你拥有自己的样本和判断，MediaClaw 负责让过程更快、更可复用。</p><button className="text-link" onClick={() => onNavigate('/docs')}>查看使用文档 <ArrowRight size={15} /></button></div><div className="faq-list">{faqs.map(([question, answer], index) => <div className={openFaq === index ? 'faq-item open' : 'faq-item'} key={question}><button onClick={() => setOpenFaq(openFaq === index ? -1 : index)}><span>{question}</span>{openFaq === index ? <X size={17} /> : <ChevronDown size={17} />}</button>{openFaq === index && <p>{answer}</p>}</div>)}</div></div></section>
  </>
}

function EnglishHome({ onNavigate }) {
  const [activePlatform, setActivePlatform] = useState('xiaohongshu')
  const [openFaq, setOpenFaq] = useState(0)
  const platform = platformData[activePlatform]
  const platformCopy = {
    xiaohongshu: { label: 'RedNote / Xiaohongshu', title: 'Research posts, creators, and comments in one browser workflow', summary: 'Start from a search term or creator, then keep the source context attached to every sample.', features: ['Keyword insights', 'Viral post analysis', 'Creator research', 'Comment and lead capture', 'Image text OCR', 'Video transcripts'] },
    douyin: { label: 'Douyin', title: 'Turn public videos into the next content action', summary: 'Find strong videos, understand why they work, and hand a structured sample to your team.', features: ['Keyword insights', 'Viral video analysis', 'Account research', 'Video and comment scraping', 'Cover text extraction', 'Timestamped transcripts'] },
  }
  const copy = platformCopy[activePlatform]
  const faqs = [['Does MediaClaw need my platform password?', 'No. The public workflow reads content that your browser can already display and does not ask you to submit a third-party password.'], ['Where do results go?', 'You can export CSV or Markdown locally, or connect the workflow to your own Lark Base when the integration is available.'], ['Is the local rebuild connected to collection or billing?', 'No. This site mirrors the public structure and interaction cues; extension services, accounts, checkout, and private APIs remain unconnected.']]
  return <main className="english-home">
    <section className="hero-section"><div className="hero-grid page-shell"><div className="hero-copy"><div className="eyebrow"><span className="status-dot" /> Public content operations workspace</div><h1>Scrape, analyze, and create from <em>RedNote and Douyin</em></h1><p className="hero-lead">One browser workflow for finding direction, collecting evidence, and turning public content into the next team action.</p><div className="hero-actions"><button className="button button-primary large" onClick={() => onNavigate('/en/download')}>Install extension <ArrowRight size={17} /></button><button className="button button-soft large" onClick={() => document.getElementById('english-demo')?.scrollIntoView({ behavior: 'smooth' })}><Play size={17} /> See the workflow</button></div><div className="trust-row"><span><ShieldCheck size={16} /> Public pages only</span><span><Zap size={16} /> Local browser workflow</span><span><Table2 size={16} /> Lark-ready exports</span></div></div><div className="hero-visual"><div className="visual-backdrop" /><div className="hero-window"><div className="window-bar"><div className="window-dots"><i /><i /><i /></div><span>mediaclaw.app / workspace</span><Command size={15} /></div><div className="window-body"><aside className="window-sidebar"><div className="mini-logo"><img src="/assets/logo.png" alt="" /></div><span className="active"><LayoutGrid size={15} /></span><span><Search size={15} /></span><span><BarChart3 size={15} /></span><span><MessageCircle size={15} /></span></aside><div className="window-content"><div className="window-heading"><div><span className="small-label">Today's research space</span><strong>Public content samples</strong></div><span className="date-pill">Updated now</span></div><div className="metric-row"><div><span>Collected samples</span><b>2,846</b><small>+18.4%</small></div><div><span>Promising topics</span><b>128</b><small>+24.1%</small></div><div><span>Open tasks</span><b>16</b><small className="muted">In progress</small></div></div><img src="/assets/mediaclaw-demo-20260424-t008.webp" alt="MediaClaw workflow preview" className="hero-screen" /></div></div></div><div className="floating-note note-one"><Sparkles size={15} /><span>Topic suggestions<br /><b>12 drafts ready</b></span></div><div className="floating-note note-two"><Check size={15} /><span>Lark handoff<br /><b>128 records</b></span></div></div></div></section>
    <section className="platform-section section-band" id="english-demo"><div className="page-shell"><div className="section-heading centered"><span className="eyebrow">One extension, two platforms</span><h2>From public signals to a repeatable content loop</h2><p>Choose a platform, open the dropdown, and move from the first sample to the next action.</p></div><div className="platform-switcher" role="tablist">{Object.entries(platformCopy).map(([key, item]) => <button key={key} className={activePlatform === key ? 'platform-tab active' : 'platform-tab'} onClick={() => setActivePlatform(key)} role="tab" aria-selected={activePlatform === key}><span className={key === 'xiaohongshu' ? 'platform-icon xhs' : 'platform-icon douyin'}>{key === 'xiaohongshu' ? 'R' : 'D'}</span>{item.label}</button>)}</div><div className="platform-panel" style={{ '--platform-accent': platform.accent }}><div className="platform-copy"><span className="section-kicker">{copy.label}</span><h3>{copy.title}</h3><p>{copy.summary}</p><div className="platform-features">{copy.features.map(feature => <span key={feature}><Check size={15} /> {feature}</span>)}</div><button className="text-link" onClick={() => onNavigate(`/en/${activePlatform}`)}>Explore all capabilities <ArrowRight size={15} /></button></div><div className="platform-image-wrap"><img src={platform.image} alt={`${copy.label} workflow`} /><div className="image-label"><span className="status-dot" /> Public sample <b>Preview</b></div></div></div></div></section>
    <section className="features-section page-shell"><div className="section-heading"><span className="eyebrow">Core capabilities</span><h2>Every sample has a next step</h2><p>Keep source context attached while you move from collection to analysis, creation, and collaboration.</p></div><div className="feature-grid">{[['Research signals', 'Expand search terms, creators, and high-performing samples.', Search, 'mint'], ['Break down hits', 'Compare hooks, titles, pacing, and public feedback.', BarChart3, 'lavender'], ['Capture demand', 'Turn comment threads into a reviewable lead and topic queue.', MessageCircle, 'peach'], ['Make media readable', 'Use OCR and transcripts to make visual and spoken content searchable.', FileText, 'blue'], ['Save source media', 'Keep public images and videos alongside their source links.', CloudDownload, 'yellow'], ['Hand off to a team', 'Export CSV / Markdown and continue in your shared workspace.', Table2, 'green']].map(([title, body, Icon, tone]) => <article className={`feature-card ${tone}`} key={title}><div className="feature-icon"><Icon size={20} /></div><h3>{title}</h3><p>{body}</p><button className="card-link" onClick={() => onNavigate('/en/xiaohongshu')}>Explore <ChevronRight size={15} /></button></article>)}</div></section>
    <section className="workflow-section section-band"><div className="page-shell workflow-grid"><div className="workflow-art"><img src="/assets/2-v20260309.webp" alt="Batch collection workflow" /><div className="workflow-tag tag-top"><MousePointer2 size={15} /> Start from a target</div><div className="workflow-tag tag-bottom"><Target size={15} /> Keep high-value samples</div></div><div className="workflow-copy"><span className="eyebrow">Start with one question</span><h2>Say what you need to know. Keep the next action visible.</h2><p>Start from a search term, creator, or strong post. Decide whether the next step is collection, analysis, export, or a team handoff.</p><div className="step-list"><div><b>01</b><span><strong>Collect a public sample</strong><small>Search pages, profiles, posts, videos, and comments</small></span></div><div><b>02</b><span><strong>Make the structure readable</strong><small>Titles, hooks, pacing, OCR, transcripts, and signals</small></span></div><div><b>03</b><span><strong>Move into production</strong><small>Export, sync, review, and draft the next topic</small></span></div></div><button className="button button-dark" onClick={() => onNavigate('/en/download')}>Start a workflow <ArrowRight size={16} /></button></div></div></section>
    <section className="pricing-section page-shell"><div className="section-heading centered"><span className="eyebrow">Simple, transparent pricing</span><h2>Start free, upgrade when the workflow needs it</h2><p>No automatic renewal is represented here. Choose more batch capacity, AI tasks, or team collaboration only when you need them.</p></div><div className="mini-pricing-grid">{pricingGroups.yearly.map(plan => <div className={plan.featured ? 'mini-price-card featured' : 'mini-price-card'} key={plan.name}><div className="plan-top"><span>{plan.name === '免费版' ? 'Free' : plan.name === '个人版' ? 'Personal' : 'Team'}</span>{plan.featured && <b>Popular</b>}</div><strong>{plan.price}</strong><small>{plan.note ? 'Billed yearly' : 'Forever free'}</small><ul>{plan.features.slice(0, 3).map(item => <li key={item}><Check size={14} />{item}</li>)}</ul><button className={plan.featured ? 'button button-primary full' : 'button button-soft full'} onClick={() => onNavigate('/en/pricing')}>View plan</button></div>)}</div></section>
    <section className="faq-section section-band"><div className="page-shell faq-grid"><div className="section-heading"><span className="eyebrow">Frequently asked questions</span><h2>Know the boundary before you start</h2><p>Your team owns the sample and the judgment. MediaClaw keeps the browser work faster and more repeatable.</p><button className="text-link" onClick={() => onNavigate('/en/blog')}>Read the guides <ArrowRight size={15} /></button></div><div className="faq-list">{faqs.map(([question, answer], index) => <div className={openFaq === index ? 'faq-item open' : 'faq-item'} key={question}><button onClick={() => setOpenFaq(openFaq === index ? -1 : index)}><span>{question}</span>{openFaq === index ? <X size={17} /> : <ChevronDown size={17} />}</button>{openFaq === index && <p>{answer}</p>}</div>)}</div></div></section>
  </main>
}

function PlatformPage({ kind, locale = 'zh', onNavigate }) {
  const platform = platformData[kind]
  const isEnglish = locale === 'en'
  const name = isEnglish ? (kind === 'douyin' ? 'Douyin' : 'RedNote & Xiaohongshu') : platform.label
  const title = isEnglish ? (kind === 'douyin' ? 'Research, collect and analyze Douyin content in one workflow' : 'Research, collect and analyze RedNote content in one workflow') : platform.title
  const summary = isEnglish ? (kind === 'douyin' ? 'Research public videos, creators, comments, and search signals from one browser workflow.' : 'Research public posts, creators, comments, and search signals from one browser workflow.') : `${platform.summary} 从发现方向到沉淀素材，让每一个公开样本都能转化为下一步动作。`
  const steps = isEnglish ? ['Find direction and research samples', 'Collect content, comments, and source media', 'Complete text, metrics, and context', 'Move into analysis, collaboration, and creation'] : ['找方向与研究样本', '采集内容、评论与原始素材', '补全文字、指标与上下文', '进入分析、协作和创作']
  const copies = isEnglish ? ['Start from search terms, creators, or proven posts.', 'Collect public pages in single or batch workflows.', 'Use OCR, transcripts, and filters to make data readable.', 'Export, sync, or launch the next AI-assisted task.'] : ['从搜索词、账号和爆款内容中找到值得研究的样本。', '单篇或批量收集公开内容，保留来源和互动信息。', '通过 OCR、逐字稿和筛选，让数据变得可读可用。', '导出、同步或发起下一步 AI 任务，持续积累方法。']
  return <main><section className="sub-hero page-shell"><div className="sub-copy"><span className="eyebrow">{name}</span><h1>{title}</h1><p>{summary}</p><div className="hero-actions"><button className="button button-primary large" onClick={() => onNavigate(isEnglish ? '/en/download' : '/download')}>{isEnglish ? 'Install extension' : '免费安装插件'} <ArrowRight size={17} /></button><button className="button button-soft large" onClick={() => onNavigate(isEnglish ? '/en/pricing' : '/pricing')}>{isEnglish ? 'View pricing' : '查看价格'}</button></div></div><div className="sub-visual"><img src={platform.image} alt={`${name} product preview`} /><div className="sub-badge"><span className="status-dot" /> {isEnglish ? 'Public pages · Local workflow' : '公开内容 · 本地工作流'}</div></div></section><section className="platform-detail page-shell"><div className="section-heading centered"><span className="eyebrow">{isEnglish ? 'Content workflow' : '内容功能模块'}</span><h2>{isEnglish ? 'Four steps to a reusable research loop' : '四步建立可复用的研究流程'}</h2></div><div className="detail-grid">{steps.map((step, index) => <article key={step}><span>0{index + 1}</span><h3>{step}</h3><p>{copies[index]}</p><ChevronRight size={18} /></article>)}</div></section><section className="detail-cta section-band"><div className="page-shell cta-row"><div><span className="eyebrow">{isEnglish ? 'Start with one sample' : '先采集一批样本'}</span><h2>{isEnglish ? 'Then choose the next analysis' : '再决定下一步分析什么'}</h2></div><button className="button button-dark large" onClick={() => onNavigate(isEnglish ? '/en/download' : '/download')}>{isEnglish ? 'Get started' : '开始使用'} <ArrowRight size={17} /></button></div></section></main>
}

function PricingPage({ onNavigate }) {
  const [group, setGroup] = useState('yearly')
  return <main><section className="sub-hero compact page-shell"><div className="sub-copy"><span className="eyebrow">价格方案</span><h1>为你的内容工作流选择合适的节奏</h1><p>核心采集长期免费。只有当你需要批量增强、AI 任务、同步和团队协作时，才需要升级。</p></div><div className="price-callout"><Sparkles size={18} /><strong>不自动续费</strong><span>一次购买一个周期，到期自动停止</span></div></section><section className="pricing-page page-shell"><div className="pricing-tabs">{[['yearly', '年付', '省 60%'], ['monthly', '月付', ''], ['credits', '积分包', '']].map(([key, label, tag]) => <button key={key} className={group === key ? 'active' : ''} onClick={() => setGroup(key)}>{label}{tag && <span>{tag}</span>}</button>)}</div><div className="pricing-grid">{pricingGroups[group].map(plan => <article className={plan.featured ? 'price-card featured' : 'price-card'} key={plan.name}><div className="plan-top"><span>{plan.name}</span>{plan.featured && <b>推荐</b>}</div><p>{plan.description}</p><div className="price-line"><strong>{plan.price}</strong><small>{group === 'credits' ? '一次性' : '/ 月'}</small></div>{plan.note && <div className="plan-note">{plan.note}</div>}<ul>{plan.features.map(item => <li key={item}><Check size={16} />{item}</li>)}</ul><button className={plan.featured ? 'button button-primary full' : 'button button-soft full'} onClick={() => onNavigate(plan.name === '免费版' ? '/download' : '/sign-in')}>{plan.action}</button></article>)}</div></section></main>
}

function DownloadPage({ onNavigate }) {
  return <main><section className="download-hero page-shell"><div className="sub-copy"><span className="eyebrow">浏览器插件</span><h1>把采集能力带进你正在浏览的页面</h1><p>支持 Chrome 和 Edge。打开小红书或抖音网页，侧边栏会根据当前页面显示对应的采集和分析动作。</p><div className="hero-actions"><button className="button button-primary large" onClick={() => window.open('https://chromewebstore.google.com/', '_blank')}>安装 Chrome 插件 <Download size={17} /></button><button className="button button-soft large" onClick={() => onNavigate('/docs')}>查看安装教程 <BookOpen size={17} /></button></div><div className="download-note"><ShieldCheck size={16} /> 不需要提交第三方平台密码或 Cookie</div></div><div className="download-visual"><div className="browser-card"><div className="browser-top"><span>小红书 · 公开内容</span><span className="browser-dot" /></div><div className="browser-content"><div className="profile-line"><div className="avatar" /><span /><span /><span /></div><div className="browser-lines"><i /><i /><i /><i /></div><div className="plugin-panel"><div className="plugin-head"><img src="/assets/logo.png" alt="" /><b>MediaClaw</b><span>×</span></div><strong>检测到当前页面</strong><p>笔记内容与互动数据</p><button className="button button-primary full">开始采集 <ArrowRight size={14} /></button></div></div></div></div></section><section className="download-steps section-band"><div className="page-shell"><div className="section-heading centered"><span className="eyebrow">三分钟开始</span><h2>安装、打开、开始采集</h2></div><div className="steps-grid">{[['01', '安装插件', '从 Chrome Web Store 安装 MediaClaw。'], ['02', '打开平台页面', '进入你要研究的小红书或抖音公开页面。'], ['03', '发起工作流', '点击侧边栏中的采集、分析或导出动作。']].map(([number, title, copy]) => <article key={number}><b>{number}</b><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section></main>
}

function DocsPage({ onNavigate }) {
  const [active, setActive] = useState('start')
  const jump = (id) => {
    setActive(id)
    document.getElementById(`docs-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  return <main className="docs-page"><section className="docs-hero page-shell"><div className="eyebrow"><BookOpen size={14} /> 使用文档</div><h1>MediaClaw 使用文档</h1><p>安装、激活、采集、导出、飞书同步和排障入口。</p></section><div className="page-shell docs-layout"><aside className="docs-sidebar"><span className="docs-sidebar-title">文档导航</span>{docsNav.map(item => <button key={item.id} className={active === item.id ? 'docs-nav-item active' : 'docs-nav-item'} onClick={() => jump(item.id)}><strong>{item.title}</strong><small>{item.copy}</small></button>)}<div className="docs-sidebar-cta"><span>准备好了吗？</span><button className="text-link" onClick={() => onNavigate('/download')}>下载插件 <ArrowRight size={14} /></button></div></aside><article className="docs-content"><section id="docs-start" className="docs-section"><span className="section-kicker">01 · 从这里开始</span><h2>先把第一次工作流跑通</h2><p>MediaClaw 社媒虾用于采集小红书和抖音的笔记、视频、评论、媒体素材、视频逐字稿和图片文字，并沉淀到可复制、可导出、可同步的数据池里。</p><div className="docs-callout"><CheckCircle2 size={18} /><span>公开页面优先：插件读取你当前浏览器已经能够看到的内容，不要求提交第三方平台密码。</span></div><div className="docs-step-list"><div><b>01</b><span><strong>安装插件</strong><small>前往下载页，优先使用 Chrome / Edge 商店安装；商店访问不稳定时使用同一页面的离线 CRX 安装包。</small></span></div><div><b>02</b><span><strong>需要完整功能时再激活</strong><small>免费版可以永久使用基础采集。需要采集增强、AI 任务或团队协作时，再购买正式版激活码。</small></span></div><div><b>03</b><span><strong>按教程完成首次配置</strong><small>打开一个公开的小红书或抖音页面，侧边栏会识别页面类型并显示对应入口。</small></span></div></div></section><section id="docs-collect" className="docs-section"><span className="section-kicker">02 · 平台采集</span><h2>从你正在看的页面开始</h2><p>不同页面会显示不同的采集入口，适合先做一条深度记录，再扩展到搜索页、账号页和评论区。</p><div className="docs-link-grid"><button onClick={() => onNavigate('/xiaohongshu')}><span className="platform-icon xhs">小</span><span><strong>小红书内容工作流</strong><small>笔记、搜索、账号和评论采集</small></span><ArrowUpRight size={15} /></button><button onClick={() => onNavigate('/douyin')}><span className="platform-icon douyin">抖</span><span><strong>抖音内容工作流</strong><small>视频、合集、账号和评论采集</small></span><ArrowUpRight size={15} /></button><button onClick={() => onNavigate('/xiaohongshu/downloader')}><CloudDownload size={18} /><span><strong>媒体素材下载</strong><small>图片、视频、封面和 Live 图</small></span><ArrowUpRight size={15} /></button><button onClick={() => onNavigate('/features/feishu-integration')}><Table2 size={18} /><span><strong>飞书协作同步</strong><small>把结构化记录交给团队继续分析</small></span><ArrowUpRight size={15} /></button></div></section><section id="docs-output" className="docs-section"><span className="section-kicker">03 · 导出和同步</span><h2>让结果进入下一步</h2><div className="docs-output-grid"><article><FileText size={21} /><h3>CSV / Markdown</h3><p>采集完成后可复制记录、导出 CSV 或 Markdown。CSV 适合 Excel、BI 或 Python，Markdown 适合知识库和 AI 复盘。</p></article><article><Table2 size={21} /><h3>飞书多维表格</h3><p>需要团队协作时，可以把标题、互动数据、话题、评论和账号信息按结构写入自己的飞书表格。</p></article><article><Sparkles size={21} /><h3>逐字稿与 OCR</h3><p>在记录上继续触发视频逐字稿或图片文字提取，让口播和卡片信息可以被搜索、复制和复用。</p></article></div></section><section id="docs-troubleshoot" className="docs-section"><span className="section-kicker">04 · 排障入口</span><h2>遇到问题时保留证据</h2><p>如果采集、导出、同步、视频逐字稿或图片文字提取失败，请在插件里复制诊断信息，并保留原始页面链接。</p><div className="troubleshoot-list"><div><AlertIcon /><span><strong>页面识别</strong><small>确认当前页面是公开可见的笔记、视频、搜索或账号页面。</small></span></div><div><AlertIcon /><span><strong>媒体加载</strong><small>保留页面链接和失败时间，判断图片、视频或封面是否已经加载完成。</small></span></div><div><AlertIcon /><span><strong>同步与导出</strong><small>复制诊断信息，区分字段提取、文件导出和飞书写入阶段的问题。</small></span></div></div><div className="docs-final-cta"><span>建议的第一次练习：采集一条记录，导出 Markdown，再试一次逐字稿或图文文案提取。</span><button className="button button-primary" onClick={() => onNavigate('/download')}>开始练习 <ArrowRight size={15} /></button></div></section></article></div></main>
}

function AlertIcon() {
  return <span className="alert-icon"><CircleHelp size={17} /></span>
}

function BlogPage({ category, onNavigate }) {
  const activeCategory = category ? decodeURIComponent(category) : '全部'
  const normalizedCategory = blogCategoryAliases[activeCategory] || activeCategory
  const filtered = normalizedCategory === '全部' ? blogPosts : blogPosts.filter(post => post.category === normalizedCategory || post.tags.includes(normalizedCategory))
  return <main className="blog-page"><section className="blog-hero page-shell"><span className="eyebrow"><BookOpen size={14} /> 内容文章</span><h1>博客</h1><p>阅读最新的产品功能、方案和小红书与抖音运营实战内容。</p></section><nav className="blog-categories page-shell" aria-label="博客分类">{blogCategories.map(item => <button key={item} className={normalizedCategory === item ? 'active' : ''} onClick={() => onNavigate(item === '全部' ? '/blog' : `/blog/category/${encodeURIComponent(item)}`)}>{item}<small>{item === '全部' ? blogPosts.length : blogPosts.filter(post => post.category === item || post.tags.includes(item)).length}</small></button>)}</nav><section className="page-shell blog-grid">{filtered.length ? filtered.map(post => <article className="blog-card" key={post.slug}><button className="blog-card-image" onClick={() => onNavigate(`/blog/${post.slug}`)}><img src={post.image} alt="" /><span>阅读文章 <ArrowUpRight size={14} /></span></button><div className="blog-card-body"><div className="blog-meta"><span>{post.category}</span><small>MediaClaw 实战</small></div><h2><button onClick={() => onNavigate(`/blog/${post.slug}`)}>{post.title}</button></h2><p>{post.excerpt}</p><div className="blog-tags">{post.tags.slice(0, 3).map(tag => <span key={tag}>#{tag}</span>)}</div><button className="text-link" onClick={() => onNavigate(`/blog/${post.slug}`)}>继续阅读 <ArrowRight size={14} /></button></div></article>) : <div className="empty-state"><CircleHelp size={23} /><h2>这个分类正在整理</h2><p>先浏览全部文章，或选择一个已开放的分类。</p><button className="button button-soft" onClick={() => onNavigate('/blog')}>查看全部文章</button></div>}</section><section className="blog-bottom section-band"><div className="page-shell cta-row"><div><span className="eyebrow">想把文章里的方法跑起来？</span><h2>先安装插件，采集一条自己的样本</h2></div><button className="button button-dark" onClick={() => onNavigate('/download')}>下载插件 <Download size={16} /></button></div></section></main>
}

function BlogArticlePage({ slug, onNavigate }) {
  const post = blogPosts.find(item => item.slug === slug) || blogPosts[0]
  return <main className="article-page"><article className="article-shell"><button className="back-link" onClick={() => onNavigate('/blog')}><ChevronRight size={15} className="back-icon" /> 返回博客</button><div className="article-header"><span className="eyebrow">{post.category} · MediaClaw 实战</span><h1>{post.title}</h1><p>{post.excerpt}</p><div className="blog-tags">{post.tags.map(tag => <span key={tag}>#{tag}</span>)}</div></div><img className="article-cover" src={post.image} alt="" /><div className="article-body"><p className="article-lead">这篇文章围绕一个具体的内容运营问题展开：先保留公开页面里的原始证据，再把采集结果变成可分析、可协作、可复用的下一步动作。</p>{post.sections.map((section, index) => <section key={section}><span className="article-number">0{index + 1}</span><h2>{section}</h2><p>{index === 0 ? '从关键词、账号或单条内容开始，先定义你要回答的问题和需要保留的字段。MediaClaw 的浏览器工作流只处理当前页面可见的公开内容。' : index === 1 ? '采集后保留标题、正文、作者、互动数据、评论和来源链接，再按你的研究目标筛选样本。需要团队协作时，可以导出 CSV/Markdown 或同步到飞书多维表格。' : '最后把分析结果落到选题、复盘或内容初稿中。AI 可以帮助整理结构，但真正发布前仍需要加入自己的经验、判断和信息增量。'}</p></section>)}<div className="article-note"><ShieldCheck size={18} /><span>使用公开内容时请遵守平台规则和原作者权利；本文页面是基于公开站点信息重做的前端阅读版，不连接原站后端。</span></div></div></article><section className="article-related section-band"><div className="page-shell"><div className="section-heading"><span className="eyebrow">继续阅读</span><h2>把同一套方法用到更多场景</h2></div><div className="related-grid">{blogPosts.filter(item => item.slug !== post.slug).slice(0, 3).map(item => <button key={item.slug} onClick={() => onNavigate(`/blog/${item.slug}`)}><span>{item.category}</span><strong>{item.title}</strong><ArrowRight size={15} /></button>)}</div></div></section></main>
}

function FeishuIntegrationPage({ onNavigate }) {
  const [openFaq, setOpenFaq] = useState(0)
  const matrix = [['采集结果一键同步飞书', '完成小红书或抖音采集后，将标题、互动数据、话题、评论和账号信息直接写入飞书多维表格。', Table2, '/assets/1-v20260424.webp'], ['多表分层适配不同业务', '将内容主表、评论客资、关键词趋势拆分为关联多表，不同场景各有清晰结构。', Columns3, '/assets/2-v20260309.webp'], ['监控日报自动推送飞书', '每日监控扫描生成摘要并推送飞书机器人，命中内容同步写入表格，便于团队复盘。', BellRing, '/assets/mediaclaw-demo-20260424-t008.webp']]
  const scenarios = [['内容运营团队', '统一沉淀多平台采集内容，用于周会选题与复盘', '共享数据替代截图与零散表格'], ['销售 / 私域团队', '将筛选后的评论客资自动分发给跟进人', '线索响应更快，跟进过程可追踪'], ['品牌策略团队', '构建长期竞品内容档案用于季度策略评估', '策略报告有持续数据支撑'], ['MCN 机构', '多客户、多平台数据统一汇总到同一工作空间', '按客户建立数据中台，摆脱平台孤岛'], ['创始人 / 团队负责人', '晨会查看自动生成的监控摘要与风险提醒', '不做手动巡检也能及时掌握竞品动态']]
  const faq = [['飞书同步是自动还是手动触发？', '完成采集后可一键同步到飞书多维表格。字段会自动映射，内容、评论、关键词和账号数据可按结构写入，无需复制粘贴。'], ['监控日报如何推送到飞书？', '在插件中配置飞书 webhook 后，系统会按天扫描监控账号，生成摘要并推送到飞书机器人，同时把命中内容写入表格。'], ['团队成员可以共用同一份飞书表吗？', '可以。模板按平台、账号和内容类型分层设计，每位成员都可独立使用插件，数据统一流入同一个表格结构。'], ['没有技术背景也能完成接入吗？', '可以。安装插件后按引导授权飞书账号、选择目标数据表并完成字段映射，全程无需写代码。']]
  return <main className="integration-page"><section className="integration-hero page-shell"><div className="sub-copy"><span className="eyebrow"><Table2 size={14} /> 飞书多维表格集成</span><h1>MediaClaw × 飞书多维表格：你的团队数据中台</h1><p>把采集内容、评论客资与监控提醒自动同步到飞书多维表格，形成全员可检索、可筛选、可协作的增长资产，告别手工复制粘贴。</p><div className="hero-actions"><button className="button button-primary large" onClick={() => onNavigate('/download')}>免费安装插件 <Download size={17} /></button><button className="button button-soft large" onClick={() => window.open('https://my.feishu.cn/base/H9fAb5QYtagaLDsjgdPcaliGnyf?from=from_copylink', '_blank')}>获取飞书模板 <ExternalLink size={16} /></button></div></div><div className="integration-visual"><img src="/assets/mediaclaw-demo-20260424-t008.webp" alt="MediaClaw 与飞书多维表格协作预览" /><div className="integration-chip"><Table2 size={15} /> 采集 → 同步 → 协作</div></div></section><section className="integration-matrix page-shell"><div className="section-heading centered"><span className="eyebrow">协作能力一屏看懂</span><h2>从采集到协作分析，数据如何流入飞书</h2><p>一键写入、按业务分表、自动推送日报，团队看到的是同一份结构化结果。</p></div><div className="integration-cards">{matrix.map(([title, copy, Icon, image]) => <article key={title}><div className="integration-card-image"><img src={image} alt="" /></div><Icon size={20} /><h3>{title}</h3><p>{copy}</p><button className="text-link" onClick={() => onNavigate('/download')}>免费下载使用 <ArrowRight size={14} /></button></article>)}</div></section><section className="integration-workflow section-band"><div className="page-shell"><div className="section-heading centered"><span className="eyebrow">三步工作流</span><h2>采集结果不再停在浏览器里</h2></div><div className="integration-flow"><div><b>01</b><strong>浏览器采集</strong><span>从小红书或抖音公开页面获取结构化内容。</span></div><div><b>02</b><strong>字段映射</strong><span>按内容、评论、关键词和账号类型写入对应数据表。</span></div><div><b>03</b><strong>团队分析</strong><span>在飞书中标注、分配、复盘，并让 AI 字段继续处理。</span></div></div></div></section><section className="integration-scenarios page-shell"><div className="section-heading centered"><span className="eyebrow">适用团队</span><h2>哪些团队在用飞书集成？</h2></div><div className="data-table-wrap"><table><thead><tr><th>角色</th><th>使用场景</th><th>效果</th></tr></thead><tbody>{scenarios.map(row => <tr key={row[0]}>{row.map(cell => <td key={cell}>{cell}</td>)}</tr>)}</tbody></table></div></section><section className="integration-faq section-band"><div className="page-shell faq-grid"><div className="section-heading"><span className="eyebrow">常见问题</span><h2>接入前先把边界说清楚</h2></div><div className="faq-list">{faq.map(([question, answer], index) => <div className="faq-item" key={question}><button onClick={() => setOpenFaq(openFaq === index ? -1 : index)}><span>{question}</span>{openFaq === index ? <X size={17} /> : <ChevronDown size={17} />}</button>{openFaq === index && <p>{answer}</p>}</div>)}</div></div></section><section className="detail-cta section-band"><div className="page-shell cta-row"><div><span className="eyebrow">开始建立团队数据资产</span><h2>把采集数据变成可执行情报</h2></div><button className="button button-dark large" onClick={() => onNavigate('/download')}>下载插件 <ArrowRight size={16} /></button></div></section></main>
}

function DownloaderPage({ kind, onNavigate }) {
  const data = downloaderData[kind]
  const [openFaq, setOpenFaq] = useState(0)
  return <main className="downloader-page"><section className="downloader-hero page-shell"><div className="sub-copy"><span className="eyebrow"><CloudDownload size={14} /> {data.label}</span><h1>{data.title}</h1><p>{data.description}</p><div className="hero-actions"><button className="button button-primary large" onClick={() => onNavigate('/download')}>免费安装插件 <Download size={17} /></button><button className="button button-soft large" onClick={() => onNavigate('/docs')}>查看使用文档 <BookOpen size={16} /></button></div><div className="download-note"><ShieldCheck size={16} /> 本地浏览器工作流 · 不要求提交平台密码</div></div><div className="downloader-visual"><img src={data.image} alt={`${data.label}产品预览`} /><div className="sub-badge"><span className="status-dot" /> 原画质 · 批量处理</div></div></section><section className="downloader-modes page-shell"><div className="section-heading centered"><span className="eyebrow">下载能力</span><h2>把看到的素材快速沉淀下来</h2><p>进入内容详情页后触发导出附件，素材可以继续进入采集、分析和创作流程。</p></div><div className="downloader-mode-grid">{data.modes.map(([title, copy, Icon]) => <article key={title}><div className="feature-icon"><Icon size={20} /></div><h3>{title}</h3><p>{copy}</p><button className="text-link" onClick={() => onNavigate('/download')}>免费开始 <ArrowRight size={14} /></button></article>)}</div></section><section className="downloader-batch section-band"><div className="page-shell"><div className="section-heading centered"><span className="eyebrow">批量工作流</span><h2>从单条保存，扩展到连续下载</h2></div><div className="batch-points"><div><ListChecks size={20} /><strong>队列处理</strong><span>一次加入多个下载任务，在同一会话中连续处理。</span></div><div><Filter size={20} /><strong>先采集，再下载</strong><span>先按互动信号筛出高价值内容，再选择性下载附件。</span></div><div><FolderKanban size={20} /><strong>整理素材档案</strong><span>按赛道、主题和视觉风格分类，后续检索更快。</span></div></div></div></section><section className="downloader-scenarios page-shell"><div className="section-heading centered"><span className="eyebrow">典型场景</span><h2>谁会用到无水印下载？</h2></div><div className="scenario-grid">{data.scenarios.map(([role, scene, effect]) => <article key={role}><span>{role}</span><h3>{scene}</h3><p>{effect}</p></article>)}</div></section><section className="downloader-faq section-band"><div className="page-shell faq-grid"><div className="section-heading"><span className="eyebrow">常见问题</span><h2>下载之前先了解这些</h2></div><div className="faq-list">{data.faq.map(([question, answer], index) => <div className="faq-item" key={question}><button onClick={() => setOpenFaq(openFaq === index ? -1 : index)}><span>{question}</span>{openFaq === index ? <X size={17} /> : <ChevronDown size={17} />}</button>{openFaq === index && <p>{answer}</p>}</div>)}</div></div></section><section className="downloader-related page-shell"><div className="section-heading centered"><span className="eyebrow">猜你感兴趣</span><h2>把下载接到完整内容工作流</h2></div><div className="related-grid">{data.related.map(([title, path]) => <button key={path} onClick={() => onNavigate(path)}><strong>{title}</strong><ArrowRight size={15} /></button>)}</div></section></main>
}

function SignInPage({ onNavigate }) {
  const [status, setStatus] = useState('')
  const submit = (event) => { event.preventDefault(); setStatus('这是前端演示表单，尚未连接真实账户服务。') }
  return <main className="auth-page"><section className="auth-card"><div className="auth-brand"><img src="/assets/logo.png" alt="" /><span>MediaClaw</span></div><span className="eyebrow"><LogIn size={14} /> 登录工作台</span><h1>欢迎回来</h1><p>登录后管理你的采集记录、积分和团队工作流。</p><form onSubmit={submit}><label htmlFor="email"><Mail size={15} /> 邮箱</label><input id="email" type="email" placeholder="you@example.com" required /><label htmlFor="password"><LockKeyhole size={15} /> 密码</label><input id="password" type="password" placeholder="请输入密码" required /><div className="auth-row"><label className="checkbox-label"><input type="checkbox" /> <span>记住我</span></label><button type="button" className="auth-link" onClick={() => setStatus('密码找回需要接入自有账户服务。')}>忘记密码？</button></div><button className="button button-primary full" type="submit">登录 <ArrowRight size={16} /></button></form>{status && <div className="auth-status"><CheckCircle2 size={16} /> {status}</div>}<div className="auth-divider"><span>或</span></div><button className="button button-soft full" onClick={() => setStatus('第三方登录仅保留页面结构，未连接真实 OAuth。')}><Globe2 size={16} /> 使用第三方账号登录</button><p className="auth-footer">还没有账号？<button onClick={() => onNavigate('/download')}>先免费安装插件</button></p></section></main>
}

function recordHeading(section) {
  return section.heading || section.text || section.question || ''
}

function recordCopy(section) {
  return section.copy || section.answer || section.text || ''
}

function recordHref(link) {
  return typeof link === 'string' ? link : link?.href || link?.rawHref || ''
}

function recordLabel(link) {
  return typeof link === 'string' ? link : link?.label || link?.text || link?.href || ''
}

function ProductFeaturePage({ record, onNavigate }) {
  const [openFaq, setOpenFaq] = useState(0)
  const isEnglish = record.locale === 'en'
  const platform = record.path.includes('douyin') ? 'douyin' : 'xiaohongshu'
  const platformName = isEnglish ? (platform === 'douyin' ? 'Douyin' : 'RedNote') : (platform === 'douyin' ? '抖音' : '小红书')
  const key = productKeyFromPath(record.path)
  const data = productCapabilityData[key] || productCapabilityData.scraper
  const h1 = Array.isArray(record.h1) ? record.h1.filter(Boolean).join(' ') : record.h1
  const related = data.related.map(([label, slug]) => {
    const href = slug.startsWith('/') ? slug : `${isEnglish ? '/en' : ''}/${platform}/${slug}`
    return { label: isEnglish ? slug.replaceAll('-', ' ') : `${platformName}${label}`, href }
  }).filter(item => routeByPath.has(item.href))
  const scrollToModules = () => document.getElementById('product-modules')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  return <main className={`product-feature-page product-feature-${key} product-feature-${platform}`}>
    <section className="product-breadcrumb-band">
      <div className="page-shell product-breadcrumb"><button onClick={() => onNavigate(isEnglish ? '/en' : '/')}><span>{isEnglish ? 'Home' : '首页'}</span></button><ChevronRight size={13} /><button onClick={() => onNavigate(`${isEnglish ? '/en' : ''}/${platform}`)}>{platformName}</button><ChevronRight size={13} /><span>{data.kicker.split(' / ')[0]}</span></div>
    </section>
    <section className="product-feature-hero page-shell">
      <div className="product-feature-copy">
        <span className="eyebrow"><span className="status-dot" /> {data.kicker}</span>
        <h1>{h1}</h1>
        <p className="product-feature-summary">{record.summary || data.intro}</p>
        <p className="product-feature-intro">{data.intro}</p>
        <div className="hero-actions"><button className="button button-primary large" onClick={() => onNavigate(isEnglish ? '/en/download' : '/download')}>{isEnglish ? 'Install extension' : '我要使用'} <ArrowRight size={17} /></button><button className="button button-soft large" onClick={scrollToModules}><Play size={16} /> {isEnglish ? 'See workflow' : '看效果演示'}</button></div>
        <div className="product-trust"><span><ShieldCheck size={15} /> {isEnglish ? 'Public pages only' : '仅处理公开页面'}</span><span><CloudDownload size={15} /> {isEnglish ? 'Exportable output' : '结果可导出'}</span><span><LockKeyhole size={15} /> {isEnglish ? 'No platform password' : '不要求平台密码'}</span></div>
      </div>
      <div className="product-feature-visual"><div className="product-visual-window"><div className="product-visual-bar"><span><i /><i /><i /></span><small>{platformName} / MediaClaw</small><span className="product-live"><span className="status-dot" /> {isEnglish ? 'Preview' : '公开页面预览'}</span></div><img src={data.heroImage} alt={`${platformName}${data.kicker}产品截图`} /></div><div className="product-visual-note"><Sparkles size={15} /><span>{isEnglish ? 'Source-observed flow' : '来源站点观察到的流程'}<b>{isEnglish ? 'Front-end preview' : '前端结构预览'}</b></span></div></div>
    </section>
    <section className="product-metric-band section-band"><div className="page-shell product-metrics">{data.metrics.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div></section>
    <section className="product-modules page-shell" id="product-modules">
      <div className="section-heading"><span className="eyebrow">{isEnglish ? 'Observed product flow' : '真实页面对应的功能模块'}</span><h2>{isEnglish ? `How ${platformName} ${data.kicker.split(' / ')[0].toLowerCase()} fits together` : `${platformName}${data.kicker.split(' / ')[0]}，从入口到结果`}</h2><p>{isEnglish ? 'The local rebuild follows the public page hierarchy and uses source-observed product media. Account, payment, and collection services remain unconnected.' : '按真实站点的层级，把入口、过程和结果拆成可理解的模块；截图来自公开页面审计，账户、支付和采集后端仍未接入。'}</p></div>
      <div className="product-module-list">{data.modules.map(([title, copy, image, Icon], index) => <article className="product-module" key={title}><div className="product-module-copy"><span className="product-module-index">0{index + 1}</span><div className="feature-icon"><Icon size={19} /></div><h3>{title}</h3><p>{copy}</p><button className="text-link" onClick={() => onNavigate(isEnglish ? '/en/download' : '/download')}>{isEnglish ? 'Start with extension' : '从插件开始'} <ArrowRight size={14} /></button></div><div className="product-module-image"><img src={image} alt={`${title}示意图`} /></div></article>)}</div>
    </section>
    <section className="product-evidence section-band"><div className="page-shell product-evidence-grid"><div><span className="eyebrow">{isEnglish ? 'What stays traceable' : '每一步都留有证据'}</span><h2>{isEnglish ? 'A useful result is more than a number' : '结果不只是一张数据表'}</h2><p>{isEnglish ? 'Keep the original URL, source context, and a clear next action. This makes the output reviewable by a teammate instead of becoming another unread spreadsheet.' : '保留原始链接、页面上下文和下一步动作，让结果能被复核、被协作，而不是又一张看完就丢的表格。'}</p></div><div className="product-evidence-points"><div><CheckCircle2 size={17} /><span><strong>{isEnglish ? 'Source context' : '来源上下文'}</strong><small>{isEnglish ? 'Titles, authors, timestamps, and original links stay together.' : '标题、作者、时间和原始链接跟随记录。'}</small></span></div><div><CheckCircle2 size={17} /><span><strong>{isEnglish ? 'Human review' : '人工复核'}</strong><small>{isEnglish ? 'AI or OCR output is a draft, not a claim of fact.' : 'AI、OCR 和筛选结果都需要人工复核。'}</small></span></div><div><CheckCircle2 size={17} /><span><strong>{isEnglish ? 'Next action' : '下一步动作'}</strong><small>{isEnglish ? 'Export, analyze, or sync when the workflow is connected.' : '导出、分析或同步，接上你的下一步工作流。'}</small></span></div></div></div></section>
    <section className="product-scenarios page-shell"><div className="section-heading centered"><span className="eyebrow">{isEnglish ? 'Typical use cases' : '典型使用场景'}</span><h2>{isEnglish ? `Who uses ${data.kicker.split(' / ')[0].toLowerCase()}?` : `哪些团队会用${data.kicker.split(' / ')[0]}？`}</h2></div><div className="product-table-wrap"><table><thead><tr><th>{isEnglish ? 'Role' : '角色'}</th><th>{isEnglish ? 'Starting point' : '从哪里开始'}</th><th>{isEnglish ? 'What it changes' : '带来的变化'}</th></tr></thead><tbody>{data.rows.map(row => <tr key={row[0]}>{row.map(cell => <td key={cell}>{cell}</td>)}</tr>)}</tbody></table></div></section>
    <section className="product-faq section-band"><div className="page-shell faq-grid"><div className="section-heading"><span className="eyebrow">FAQ</span><h2>{isEnglish ? 'Before you start, know the boundaries' : '开始之前，先把边界说清楚'}</h2><p>{isEnglish ? 'The page mirrors public product claims without pretending that private services are already wired in.' : '页面复刻公开产品结构，不把未接入的私有服务写成已经可用。'}</p></div><div className="faq-list">{data.faqs.map(([question, answer], index) => <div className={openFaq === index ? 'faq-item open' : 'faq-item'} key={question}><button onClick={() => setOpenFaq(openFaq === index ? -1 : index)}><span>{question}</span>{openFaq === index ? <X size={17} /> : <ChevronDown size={17} />}</button>{openFaq === index && <p>{answer}</p>}</div>)}</div></div></section>
    <section className="product-related page-shell"><div className="product-related-head"><div><span className="eyebrow">{isEnglish ? 'Continue the workflow' : '相关能力'}</span><h2>{isEnglish ? 'Keep moving from one signal to the next' : '从一个信号继续走下去'}</h2></div><button className="text-link" onClick={() => onNavigate(`${isEnglish ? '/en' : ''}/${platform}`)}>{isEnglish ? 'View all tools' : '查看全部能力'} <ArrowRight size={15} /></button></div><div className="product-related-grid">{related.map(item => <button key={item.href} onClick={() => onNavigate(item.href)}><span>{platformName}</span><strong>{item.label}</strong><ArrowUpRight size={16} /></button>)}</div></section>
    <section className="detail-cta section-band"><div className="page-shell cta-row"><div><span className="eyebrow">{isEnglish ? 'Start with a public sample' : '先从一条公开内容开始'}</span><h2>{isEnglish ? 'Turn research into your next action' : '把研究结果接到下一步动作'}</h2></div><button className="button button-dark large" onClick={() => onNavigate(isEnglish ? '/en/download' : '/download')}>{isEnglish ? 'Install extension' : '开始使用'} <ArrowRight size={17} /></button></div></section>
  </main>
}

function CatalogPage({ record, onNavigate }) {
  const isEnglish = record.locale === 'en'
  if (record.family === 'boundary') return <AnonymousBoundaryPage />
  const h1 = Array.isArray(record.h1) ? record.h1.filter(Boolean).join(' ') : record.h1
  const sections = (record.sections || []).map((section) => ({ heading: recordHeading(section), copy: recordCopy(section) })).filter((section) => section.heading || section.copy)
  const related = (record.links || []).map((link) => ({ href: recordHref(link), label: recordLabel(link) })).filter((link) => link.href && routeByPath.has(link.href) && link.href !== record.path).slice(0, 6)
  const platform = record.path.includes('douyin') ? 'douyin' : record.path.includes('xiaohongshu') ? 'xiaohongshu' : null
  const familyLabel = record.family === 'blog-article' ? (isEnglish ? 'Article' : '内容文章') : record.family === 'updates' ? (isEnglish ? 'Release notes' : '更新日志') : record.family === 'legal' ? (isEnglish ? 'Legal' : '法律页面') : record.family === 'commercial' ? (isEnglish ? 'Product preview' : '产品预览') : record.family === 'not-found' ? '404' : (isEnglish ? 'MediaClaw workflow' : 'MediaClaw 工作流')
  if (record.status === 404) return <NotFoundPage path={record.path} onNavigate={onNavigate} locale={record.locale} />
  return <main className={`catalog-page catalog-${record.family}`}>
    <section className="catalog-hero page-shell">
      <div className="catalog-hero-copy">
        <span className="eyebrow"><Sparkles size={14} /> {familyLabel}</span>
        <h1>{h1}</h1>
        <p>{record.summary}</p>
        <div className="hero-actions">
          <button className="button button-primary large" onClick={() => onNavigate(isEnglish ? '/en/download' : '/download')}>{isEnglish ? 'Install extension' : '免费安装插件'} <ArrowRight size={17} /></button>
          <button className="button button-soft large" onClick={() => onNavigate(isEnglish ? '/en/docs' : '/docs')}>{isEnglish ? 'Read docs' : '查看使用文档'} <BookOpen size={16} /></button>
        </div>
      </div>
      <div className={`catalog-visual ${platform || 'neutral'}`}>
        <div className="catalog-visual-top"><span>{isEnglish ? 'Public page preview' : '公开页面预览'}</span><span className="status-dot" /></div>
        <div className="catalog-visual-body"><div className="catalog-orbit"><Sparkles size={24} /></div><strong>{record.title}</strong><small>{isEnglish ? 'Source-observed structure · preview only' : '基于公开站点结构 · 前端预览'}</small></div>
      </div>
    </section>
    <section className="catalog-content page-shell">
      <div className="catalog-content-main">
        <div className="section-heading"><span className="eyebrow">{isEnglish ? 'Page structure' : '页面结构'}</span><h2>{isEnglish ? 'A route you can keep exploring' : '把这一层内容继续走完'}</h2><p>{isEnglish ? 'The local rebuild preserves the public route, hierarchy, and navigation cues without claiming private product operations.' : '本地重建保留公开路由、层级和导航线索；未接入的账户、支付和插件能力会明确标注为预览。'}</p></div>
        <div className="catalog-section-grid">{(sections.length ? sections : [{ heading: isEnglish ? 'Observed route structure' : '已观察到的路由结构', copy: record.summary }]).map((section, index) => <article className="catalog-section-card" key={`${section.heading}-${index}`}><span>0{String(index + 1).padStart(2, '0')}</span><h3>{section.heading || (isEnglish ? 'Content block' : '内容区块')}</h3><p>{section.copy || (isEnglish ? 'This block is represented by the public page structure.' : '此区块按公开页面结构保留。')}</p></article>)}</div>
        {record.media?.length > 0 && <div className="catalog-media-note"><ImageDown size={17} /><span>{isEnglish ? `${record.media.length} source media references were observed on this route.` : `此页面观察到 ${record.media.length} 个来源媒体引用。`}</span></div>}
      </div>
      <aside className="catalog-aside"><div className="catalog-aside-card"><span className="section-kicker">{isEnglish ? 'Route metadata' : '路由信息'}</span><dl><div><dt>{isEnglish ? 'Locale' : '语言'}</dt><dd>{record.locale}</dd></div><div><dt>{isEnglish ? 'Family' : '页面族'}</dt><dd>{record.family}</dd></div><div><dt>{isEnglish ? 'Status' : '状态'}</dt><dd>{record.status}</dd></div></dl><small>{isEnglish ? 'No backend, login, payment, or private API is connected in this rebuild.' : '当前重建未连接后端、登录、支付或私有 API。'}</small></div>{related.length > 0 && <div className="catalog-related"><span className="section-kicker">{isEnglish ? 'Continue' : '继续探索'}</span>{related.map((link) => <button key={link.href} onClick={() => onNavigate(link.href)}><span>{link.label}</span><ArrowRight size={14} /></button>)}</div>}</aside>
    </section>
    <section className="detail-cta section-band"><div className="page-shell cta-row"><div><span className="eyebrow">{isEnglish ? 'Next step' : '下一步'}</span><h2>{isEnglish ? 'Turn a public sample into a repeatable workflow' : '把公开样本变成可复用工作流'}</h2></div><button className="button button-dark large" onClick={() => onNavigate(isEnglish ? '/en/download' : '/download')}>{isEnglish ? 'Start with the extension' : '从插件开始'} <ArrowRight size={16} /></button></div></section>
  </main>
}

function updateVersion(path) {
  const match = path.match(/\/updates\/(v\d+\.\d+\.\d+)/)
  return match ? match[1] : ''
}

function compareUpdateVersions(a, b) {
  const parse = (record) => updateVersion(record.path).slice(1).split('.').map(Number)
  const left = parse(a)
  const right = parse(b)
  for (let index = 0; index < 3; index += 1) {
    if (left[index] !== right[index]) return right[index] - left[index]
  }
  return 0
}

function uniqueUpdateSections(record) {
  const seen = new Set()
  return (record.sections || [])
    .map((section) => ({ heading: recordHeading(section), tag: section.tag }))
    .filter(({ heading }) => heading && !seen.has(heading) && seen.add(heading))
}

function UpdatesPage({ record, onNavigate }) {
  const isEnglish = record.locale === 'en'
  const isIndex = record.path === '/updates' || record.path === '/en/updates'
  const localePrefix = isEnglish ? '/en' : ''
  const versionRecords = updateRoutes
    .filter((item) => item.locale === record.locale && item.path.startsWith(`${localePrefix}/updates/v`))
    .sort(compareUpdateVersions)
  const version = updateVersion(record.path)
  const sections = uniqueUpdateSections(record)
  const related = (record.links || [])
    .map((link) => recordHref(link))
    .filter((href, index, links) => href && routeByPath.has(href) && href !== record.path && !href.includes('/updates') && !links.slice(0, index).includes(href))
    .slice(0, 4)
    .map((href) => {
      const linkedRecord = routeByPath.get(href)
      const linkedHeading = Array.isArray(linkedRecord?.h1) ? linkedRecord.h1.filter(Boolean).join(' ') : linkedRecord?.h1
      return { href, label: linkedHeading || recordLabel(href) }
    })
  const copy = isEnglish
    ? (isIndex ? 'Browse the public release history and see what changed in each version.' : 'A source-observed release note presented as a local front-end preview.')
    : (isIndex ? '按版本查看公开发布记录，快速了解每次更新带来的变化。' : '根据公开更新日志还原的版本说明，当前为本地前端预览。')
  const highlightCopy = isEnglish ? 'This release highlight follows the public update record.' : '此项发布重点按公开更新记录保留。'

  if (isIndex) {
    return <main className="updates-page updates-index">
      <section className="updates-index-hero page-shell">
        <div className="updates-index-copy">
          <span className="eyebrow"><BellRing size={14} /> {isEnglish ? 'Release notes' : '更新日志'}</span>
          <h1>{record.h1}</h1>
          <p>{copy}</p>
          <div className="hero-actions"><button className="button button-primary large" onClick={() => onNavigate(isEnglish ? '/en/download' : '/download')}>{isEnglish ? 'Install extension' : '免费安装插件'} <ArrowRight size={17} /></button><button className="button button-soft large" onClick={() => document.getElementById('updates-releases')?.scrollIntoView({ behavior: 'smooth' })}>{isEnglish ? 'Browse releases' : '查看版本'} <ChevronDown size={16} /></button></div>
        </div>
        <aside className="updates-latest-card">
          <span className="section-kicker">{isEnglish ? 'Latest release' : '最新版本'}</span>
          {versionRecords[0] && <><strong>{updateVersion(versionRecords[0].path)}</strong><h2>{versionRecords[0].h1}</h2><p>{uniqueUpdateSections(versionRecords[0]).slice(1, 2).map((item) => item.heading).join(' · ')}</p><button className="text-link" onClick={() => onNavigate(versionRecords[0].path)}>{isEnglish ? 'Read release' : '查看更新'} <ArrowUpRight size={15} /></button></>}
        </aside>
      </section>
      <section className="updates-release-section section-band" id="updates-releases">
        <div className="page-shell">
          <div className="section-heading"><span className="eyebrow">{isEnglish ? 'Version history' : '版本历史'}</span><h2>{isEnglish ? 'Every release, in one place' : '每次发布，都有迹可循'}</h2><p>{isEnglish ? 'Open a version to see its release highlights and related workflow links.' : '打开任一版本，查看发布重点、详情层级和相关工作流入口。'}</p></div>
          <div className="updates-timeline updates-index-timeline">{versionRecords.map((item, index) => { const itemSections = uniqueUpdateSections(item); return <article className="updates-release-card" key={item.path}><div className="updates-release-marker"><span>{String(index + 1).padStart(2, '0')}</span><i /></div><div className="updates-release-card-body"><div className="updates-release-meta"><span className="updates-version">{updateVersion(item.path)}</span><span>{isEnglish ? 'Release note' : '发布记录'}</span></div><h3>{item.h1}</h3><p>{itemSections.slice(1, 2).map((section) => section.heading).join(' · ')}</p><button className="text-link" onClick={() => onNavigate(item.path)}>{isEnglish ? 'Read release' : '查看详情'} <ArrowRight size={14} /></button></div></article> })}</div>
        </div>
      </section>
      <section className="detail-cta section-band"><div className="page-shell cta-row"><div><span className="eyebrow">{isEnglish ? 'Start with a public sample' : '先从一条公开内容开始'}</span><h2>{isEnglish ? 'Turn research into your next action' : '把研究结果接到下一步动作'}</h2></div><button className="button button-dark large" onClick={() => onNavigate(isEnglish ? '/en/download' : '/download')}>{isEnglish ? 'Install extension' : '开始使用'} <ArrowRight size={17} /></button></div></section>
    </main>
  }

  const releaseIndex = versionRecords.findIndex((item) => item.path === record.path)
  const previous = versionRecords[releaseIndex + 1]
  const next = versionRecords[releaseIndex - 1]
  return <main className="updates-page updates-detail">
    <section className="updates-detail-breadcrumb-band"><div className="page-shell updates-breadcrumb"><button onClick={() => onNavigate(`${localePrefix}/updates`)}>{isEnglish ? 'Release notes' : '更新日志'}</button><ChevronRight size={14} /><span>{version}</span></div></section>
    <section className="updates-detail-hero page-shell">
      <div className="updates-detail-copy"><span className="eyebrow"><Sparkles size={14} /> {isEnglish ? 'Release detail' : '版本详情'}</span><div className="updates-version-pill">{version}</div><h1>{record.h1}</h1><p>{copy}</p><div className="hero-actions"><button className="button button-primary large" onClick={() => onNavigate(isEnglish ? '/en/download' : '/download')}>{isEnglish ? 'Install extension' : '免费安装插件'} <ArrowRight size={17} /></button><button className="button button-soft large" onClick={() => onNavigate(`${localePrefix}/updates`)}>{isEnglish ? 'All releases' : '全部版本'} <ListChecks size={16} /></button></div></div>
      <aside className="updates-detail-summary"><span className="section-kicker">{isEnglish ? 'Release record' : '发布记录'}</span><strong>{version}</strong><dl><div><dt>{isEnglish ? 'Highlights' : '发布重点'}</dt><dd>{Math.max(sections.length - 1, 1)}</dd></div><div><dt>{isEnglish ? 'Locale' : '语言'}</dt><dd>{record.locale.toUpperCase()}</dd></div><div><dt>{isEnglish ? 'Status' : '状态'}</dt><dd>{record.status}</dd></div></dl><small>{isEnglish ? 'Public structure · preview only' : '公开结构 · 前端预览'}</small></aside>
    </section>
    <section className="updates-highlights section-band"><div className="page-shell"><div className="section-heading"><span className="eyebrow">{isEnglish ? 'Release highlights' : '发布重点'}</span><h2>{isEnglish ? 'What changed in this version' : '这一版本更新了什么'}</h2></div><div className="updates-highlight-grid">{sections.slice(1).map((section, index) => <article key={section.heading}><span>{String(index + 1).padStart(2, '0')}</span><CheckCircle2 size={18} /><h3>{section.heading}</h3><p>{highlightCopy}</p></article>)}</div></div></section>
    <section className="updates-detail-layout page-shell"><aside className="updates-detail-sidebar"><span className="section-kicker">{isEnglish ? 'In this release' : '本次更新'}</span><a href="#release-details">{isEnglish ? 'Release details' : '更新详情'}</a><a href="#related-releases">{isEnglish ? 'Related releases' : '相关版本'}</a><div className="updates-neighbor-links">{previous && <button onClick={() => onNavigate(previous.path)}><small>{isEnglish ? 'Previous' : '上一个'}</small><strong>{updateVersion(previous.path)}</strong></button>}{next && <button onClick={() => onNavigate(next.path)}><small>{isEnglish ? 'Next' : '下一个'}</small><strong>{updateVersion(next.path)}</strong></button>}</div></aside><article className="updates-detail-content" id="release-details"><div className="section-heading"><span className="eyebrow">{isEnglish ? 'Timeline' : '更新时间线'}</span><h2>{isEnglish ? 'Release details' : '版本详情'}</h2><p>{isEnglish ? 'The public page groups this release into the following documented changes.' : '公开页面将本次发布组织为以下更新项。'}</p></div><div className="updates-detail-timeline">{sections.map((section, index) => <div className="updates-detail-item" key={section.heading}><div className="updates-detail-item-index">{String(index + 1).padStart(2, '0')}</div><div><span>{index === 0 ? (isEnglish ? 'Release' : '版本发布') : (isEnglish ? 'Highlight' : '发布重点')}</span><h3>{section.heading}</h3><p>{index === 0 ? record.h1 : highlightCopy}</p></div></div>)}</div></article></section>
    <section className="updates-related section-band" id="related-releases"><div className="page-shell"><div className="section-heading"><span className="eyebrow">{isEnglish ? 'Related links' : '相关链接'}</span><h2>{isEnglish ? 'Continue the workflow' : '继续探索相关能力'}</h2></div><div className="updates-related-grid"><button onClick={() => onNavigate(`${localePrefix}/updates`)}><span>{isEnglish ? 'Release notes' : '更新日志'}</span><strong>{isEnglish ? 'Browse all versions' : '查看全部版本'}</strong><ArrowUpRight size={16} /></button>{related.map((item) => <button key={item.href} onClick={() => onNavigate(item.href)}><span>{isEnglish ? 'MediaClaw workflow' : 'MediaClaw 工作流'}</span><strong>{item.label}</strong><ArrowUpRight size={16} /></button>)}</div></div></section>
    <section className="detail-cta section-band"><div className="page-shell cta-row"><div><span className="eyebrow">{isEnglish ? 'Start with a public sample' : '先从一条公开内容开始'}</span><h2>{isEnglish ? 'Turn research into your next action' : '把研究结果接到下一步动作'}</h2></div><button className="button button-dark large" onClick={() => onNavigate(isEnglish ? '/en/download' : '/download')}>{isEnglish ? 'Install extension' : '开始使用'} <ArrowRight size={17} /></button></div></section>
  </main>
}

function AnonymousBoundaryPage() {
  return <main className="anonymous-boundary" aria-busy="true"><span className="status-dot" aria-label="Loading" /></main>
}

function NotFoundPage({ path, onNavigate, locale = 'zh' }) {
  const isEnglish = locale === 'en'
  return <main><section className="placeholder-page page-shell not-found-page"><div className="placeholder-icon"><CircleHelp size={27} /></div><span className="eyebrow">404 · {isEnglish ? 'Not found' : '未找到页面'}</span><h1>{isEnglish ? 'This route is not in the public catalog' : '这个页面不在公开目录中'}</h1><p>{isEnglish ? `No public route record exists for ${path}.` : `公开路由目录中没有 ${path} 的记录。`}</p><div className="hero-actions"><button className="button button-primary" onClick={() => onNavigate(isEnglish ? '/en' : '/')}>{isEnglish ? 'Back home' : '返回首页'} <ArrowRight size={16} /></button><button className="button button-soft" onClick={() => onNavigate(isEnglish ? '/en/docs' : '/docs')}>{isEnglish ? 'Open docs' : '查看文档'}</button></div></section></main>
}

function PlaceholderPage({ path, onNavigate }) {
  return <main><section className="placeholder-page page-shell"><div className="placeholder-icon"><CircleHelp size={27} /></div><span className="eyebrow">产品预览</span><h1>{path === '/sign-in' ? '登录工作台' : path === '/docs' ? '使用文档' : '内容工作台'}</h1><p>这一层在公开站点中是应用功能入口。当前重做版本先提供结构和交互预览，真实采集、账户和支付服务需要接入自有后端。</p><div className="hero-actions"><button className="button button-primary" onClick={() => onNavigate('/')}>返回首页 <ArrowRight size={16} /></button><button className="button button-soft" onClick={() => onNavigate('/download')}>先安装插件</button></div></section></main>
}

function Footer({ onNavigate, locale = 'zh' }) {
  const isEnglish = locale === 'en'
  const prefix = isEnglish ? '/en' : ''
  return <footer className="site-footer"><div className="page-shell footer-grid"><div className="footer-brand"><Brand onNavigate={onNavigate} locale={locale} /><p>{isEnglish ? 'Turn public content into reusable research samples, topics, and team actions.' : '让公开内容变成可复用的研究样本、选题与团队动作。'}</p><span>© 2026 MediaClaw Web Rebuild</span></div><div><b>{isEnglish ? 'Product' : '产品'}</b><button onClick={() => onNavigate(`${prefix}/xiaohongshu`)}>{isEnglish ? 'RedNote' : '小红书'}</button><button onClick={() => onNavigate(`${prefix}/douyin`)}>{isEnglish ? 'Douyin' : '抖音'}</button><button onClick={() => onNavigate(`${prefix}/pricing`)}>{isEnglish ? 'Pricing' : '价格方案'}</button></div><div><b>{isEnglish ? 'Resources' : '资源'}</b><button onClick={() => onNavigate(`${prefix}/download`)}>{isEnglish ? 'Download extension' : '下载插件'}</button><button onClick={() => onNavigate('/docs')}>{isEnglish ? 'Docs' : '使用文档'}</button><button onClick={() => onNavigate(`${prefix}/blog`)}>{isEnglish ? 'Blog' : '内容文章'}</button><button onClick={() => onNavigate(`${prefix}/features/feishu-integration`)}>{isEnglish ? 'Lark integration' : '飞书集成'}</button></div><div><b>{isEnglish ? 'Principles' : '原则'}</b><span>{isEnglish ? 'Public content first' : '公开内容优先'}</span><span>{isEnglish ? 'Local workflow' : '本地工作流'}</span><span>{isEnglish ? 'Traceable data' : '数据可追溯'}</span></div></div></footer>
}

function App() {
  const [path, setPath] = useState(window.location.pathname || '/')
  useEffect(() => { const onPop = () => setPath(window.location.pathname || '/'); window.addEventListener('popstate', onPop); return () => window.removeEventListener('popstate', onPop) }, [])
  useEffect(() => { document.title = path === '/' ? 'MediaClaw 社媒虾 | 让内容运营更快一步' : path === '/pricing' ? '价格方案 | MediaClaw' : path === '/download' ? '下载插件 | MediaClaw' : path === '/docs' ? 'MediaClaw 使用文档 | MediaClaw' : path.startsWith('/blog') ? 'MediaClaw 博客 | 小红书与抖音运营实战' : path === '/features/feishu-integration' ? '飞书多维表格集成 | MediaClaw' : path.includes('/downloader') ? '无水印素材下载 | MediaClaw' : path === '/sign-in' ? '登录工作台 | MediaClaw' : routeByPath.get(path)?.title || 'MediaClaw 社媒虾' }, [path])
  const onNavigate = (nextPath) => { navigate(nextPath); setPath(nextPath) }
  const content = useMemo(() => {
    if (path === '/') return <Home onNavigate={onNavigate} />
    if (path === '/en') return <EnglishHome onNavigate={onNavigate} />
    if (path === '/xiaohongshu') return <PlatformPage kind="xiaohongshu" onNavigate={onNavigate} />
    if (path === '/douyin') return <PlatformPage kind="douyin" onNavigate={onNavigate} />
    if (path === '/en/xiaohongshu') return <PlatformPage kind="xiaohongshu" locale="en" onNavigate={onNavigate} />
    if (path === '/en/douyin') return <PlatformPage kind="douyin" locale="en" onNavigate={onNavigate} />
    const routeRecord = routeByPath.get(path)
    if (routeRecord?.family === 'commercial') return <CommercialRecordPage record={routeRecord} onNavigate={onNavigate} />
    if (routeRecord?.family === 'legal') return <LegalRecordPage record={routeRecord} onNavigate={onNavigate} />
    if (path === '/pricing') return <PricingPage onNavigate={onNavigate} />
    if (path === '/download') return <DownloadPage onNavigate={onNavigate} />
    if (path === '/docs') return <DocsPage onNavigate={onNavigate} />
    if (path === '/blog' || path === '/en/blog') return routeByPath.has(path) ? <BlogIndexRecordPage record={routeByPath.get(path)} routeRecords={routeCatalog} onNavigate={onNavigate} /> : <NotFoundPage path={path} onNavigate={onNavigate} />
    if (path.includes('/blog/category/')) return routeByPath.has(path) ? <BlogIndexRecordPage record={routeByPath.get(path)} routeRecords={routeCatalog} onNavigate={onNavigate} /> : <NotFoundPage path={path} onNavigate={onNavigate} />
    if (path.includes('/blog/')) return routeByPath.has(path) ? <BlogArticleRecordPage record={routeByPath.get(path)} routeRecords={routeCatalog} onNavigate={onNavigate} /> : <NotFoundPage path={path} onNavigate={onNavigate} />
    if (path === '/features/feishu-integration') return <FeishuIntegrationPage onNavigate={onNavigate} />
    if (path === '/xiaohongshu/downloader') return <DownloaderPage kind="xiaohongshu" onNavigate={onNavigate} />
    if (path === '/douyin/downloader') return <DownloaderPage kind="douyin" onNavigate={onNavigate} />
    if (path === '/sign-in') return <SignInPage onNavigate={onNavigate} />
    if (routeRecord?.family === 'updates') return <UpdatesPage record={routeRecord} onNavigate={onNavigate} />
    if (routeRecord?.family === 'product' && (path.includes('/xiaohongshu/') || path.includes('/douyin/'))) return <ProductFeaturePage record={routeRecord} onNavigate={onNavigate} />
    return routeByPath.has(path) ? <CatalogPage record={routeByPath.get(path)} onNavigate={onNavigate} /> : <NotFoundPage path={path} onNavigate={onNavigate} />
  }, [path])
  const anonymousBoundary = routeByPath.get(path)?.family === 'boundary'
  const locale = path === '/en' || path.startsWith('/en/') ? 'en' : 'zh'
  return <div className="app">{!anonymousBoundary && <Header onNavigate={onNavigate} locale={locale} />}{content}{!anonymousBoundary && <Footer onNavigate={onNavigate} locale={locale} />}</div>
}

export default App

createRoot(document.getElementById('root')).render(<App />)
