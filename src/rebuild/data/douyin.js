import { validateRouteRecords } from '../contracts/routeSchema.js'

const routes = [
  ['/douyin', 'zh', '抖音数据采集与内容分析工具｜MediaClaw', '一站式完成抖音内容采集、分析和创作', '一站式完成抖音内容采集、分析和创作'],
  ['/douyin/keywords', 'zh', '抖音关键词挖掘分析工具：扩展搜索下拉词，抢占搜索流量 | MediaClaw 社媒虾', '抖音关键词挖掘分析工具', '抖音关键词挖掘分析工具，围绕搜索下拉词进行关键词挖掘分析。'],
  ['/douyin/viral-content-analysis', 'zh', '抖音爆款分析｜找低粉爆款，拆解爆款视频 | MediaClaw', '抖音爆款分析：找到低粉爆款，拆清视频 为什么有效', '抖音爆款分析：找到低粉爆款，拆清视频为什么有效。'],
  ['/douyin/account-analysis', 'zh', '抖音账号分析工具｜找对标账号、拆解爆款视频与内容风格 | MediaClaw', '抖音账号分析：找到对标账号， 拆清爆款视频规律', '抖音账号分析：找到对标账号，拆清爆款视频规律。'],
  ['/douyin/scraper', 'zh', '抖音采集工具：账号、视频内容与互动数据一键提取 | MediaClaw社媒虾', '抖音数据采集工具：批量采集视频、账号和搜索结果', '批量采集抖音视频、账号和搜索结果。'],
  ['/douyin/comments', 'zh', '抖音评论采集工具：批量抓取评论并导出 Excel | MediaClaw 社媒虾', '抖音评论采集：批量抓取并导出 Excel、Markdown 或同步飞书', '批量抓取抖音评论并导出 Excel、Markdown 或同步飞书。'],
  ['/douyin/downloader', 'zh', '抖音去水印下载 - 免费批量保存无水印视频 MP4、图文素材 | MediaClaw 社媒虾', '免费批量下载抖音无水印视频素材', '免费批量保存无水印抖音视频 MP4 与图文素材。'],
  ['/douyin/image-text', 'zh', '抖音图文文案提取 - 合集图、商品卡 OCR 一键提成文本 | MediaClaw 社媒虾', '抖音图文文案，一键提取', '使用 OCR 一键提取抖音合集图与商品卡中的文字。'],
  ['/douyin/transcript', 'zh', '抖音视频口播逐字稿一键提取 | MediaClaw 社媒虾', '一键提取/批量自动提取抖音视频逐字稿', '一键提取或批量自动提取抖音视频逐字稿。'],
  ['/douyin/leads', 'zh', '抖音评论区截流工具_从评论区挖掘高意向客户并导出Excel | MediaClaw', '抖音评论区截流：挖掘高意向客户线索', '从抖音评论区挖掘高意向客户并导出 Excel。'],
  ['/douyin/monitoring', 'zh', '抖音对标账号监控工具_自动监控对标账号内容更新并推送飞书 | MediaClaw', '抖音对标账号监控：自动追踪对标账号内容更新', '自动监控抖音对标账号内容更新并推送飞书。'],
  ['/en/douyin', 'en', 'Douyin Content Research & Analysis Tools | MediaClaw', 'Research, collect and analyze Douyin content in one workflow', 'Research, collect, and analyze Douyin content in one workflow.'],
  ['/en/douyin/keywords', 'en', 'Douyin Niche Strategy Tool - Opportunity & Keyword Research', 'Judge Douyin Niche Opportunity Before You Create', 'Judge Douyin niche opportunity before you create.'],
  ['/en/douyin/viral-content-analysis', 'en', 'Douyin Viral Video Analysis | MediaClaw', 'Douyin Viral Video Analysis: Find Low-Follower Hits and See Why They Work', 'Find low-follower Douyin hits and understand why they work.'],
  ['/en/douyin/account-analysis', 'en', 'Douyin Account Analyzer｜Find Competitors and Decode Viral Videos | MediaClaw', 'Douyin Account Analyzer: Find Benchmark Creators and Decode Viral Video Patterns', 'Find benchmark creators and decode Douyin viral video patterns.'],
  ['/en/douyin/scraper', 'en', 'Douyin Scraper – Export Videos, Profiles & Search Data | MediaClaw', 'Douyin Scraper for Videos, Profiles and Search Results', 'Export Douyin videos, profiles, and search results.'],
  ['/en/douyin/comments', 'en', 'Douyin Comment Scraper – Export Comments to CSV/Excel | MediaClaw', 'Douyin Comment Scraper for Comments and Replies', 'Export Douyin comments and replies to CSV or Excel.'],
  ['/en/douyin/downloader', 'en', 'Free Douyin Video Downloader - Batch Save No-Watermark MP4', 'Batch download watermark-free Douyin videos for free', 'Batch download watermark-free Douyin videos for free.'],
  ['/en/douyin/image-text', 'en', 'Douyin Image Text Extraction - OCR Carousel to Text', 'Pull the text out of Douyin carousel images, all at once', 'Pull text out of Douyin carousel images with OCR.'],
  ['/en/douyin/transcript', 'en', 'Douyin Video Transcript Extractor – Video to Text with Timestamps', 'Convert Douyin Videos to Timestamped Text Transcripts', 'Convert Douyin videos to timestamped text transcripts.'],
  ['/en/douyin/leads', 'en', 'Douyin Lead Scraper - Extract High-Intent Comment Leads', 'Extract High-Intent Leads from Douyin Comment Sections', 'Extract high-intent leads from Douyin comment sections.'],
  ['/en/douyin/monitoring', 'en', 'Douyin Monitoring - Auto-Track Lark Alerts | MediaClaw', 'Auto-Monitor Douyin Competitor Accounts', 'Auto-monitor Douyin competitor accounts and Lark alerts.'],
]

const records = routes.map(([path, locale, title, h1, summary]) => ({
  path,
  status: 200,
  locale,
  family: 'product',
  title,
  h1,
  summary,
  sections: [],
  links: [],
  media: [],
  source: { url: `https://mediaclaw.app${path}`, platform: 'douyin' },
}))

export default validateRouteRecords(records, 22, 'DOUYIN')
