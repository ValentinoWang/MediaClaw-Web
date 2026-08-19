import { validateRouteRecords } from '../contracts/routeSchema.js'

const records = [
  {
    "path": "/updates",
    "status": 200,
    "locale": "zh",
    "family": "updates",
    "title": "更新日志 — 功能发布与性能改进通告 | MediaClaw",
    "h1": "更新日志",
    "summary": "更新日志 — 功能发布与性能改进通告 | MediaClaw",
    "sections": [
      {
        "tag": "section",
        "heading": "更新日志",
        "id": "updates"
      },
      {
        "tag": "article",
        "heading": "MediaClaw Agent 正式上线",
        "id": null
      },
      {
        "tag": "article",
        "heading": "我的创作档案与采集稳定性优化",
        "id": null
      },
      {
        "tag": "article",
        "heading": "批量视频逐字稿、抖音合集采集与场景式引导",
        "id": null
      },
      {
        "tag": "article",
        "heading": "批量导出图片，图文拆解更深、团队协作更灵活",
        "id": null
      },
      {
        "tag": "article",
        "heading": "从内容研究，到选题与创作",
        "id": null
      },
      {
        "tag": "article",
        "heading": "新增新手引导，抖音采集更稳更干净",
        "id": null
      },
      {
        "tag": "article",
        "heading": "Markdown 导出、视频逐字稿和配图文字提取上线",
        "id": null
      },
      {
        "tag": "article",
        "heading": "新增关键词舆情扫描与福利中心",
        "id": null
      },
      {
        "tag": "article",
        "heading": "搜索页新增「找对标账号」，诊断信息与采集稳定性升级",
        "id": null
      },
      {
        "tag": "article",
        "heading": "新增主词机会判断，优化关键词策略衔接体验",
        "id": null
      },
      {
        "tag": "article",
        "heading": "抖音附件下载、收藏/点赞采集与 AI 改写能力上线",
        "id": null
      },
      {
        "tag": "article",
        "heading": "账号主页筛选与版本通知上线，Edge 兼容性优化",
        "id": null
      },
      {
        "tag": "article",
        "heading": "连续采集与选题洞察增强",
        "id": null
      },
      {
        "tag": "article",
        "heading": "抖音批量采集、监控日报与商业化能力上线",
        "id": null
      },
      {
        "tag": "article",
        "heading": "小红书博主信息补全与评论客资筛选",
        "id": null
      },
      {
        "tag": "article",
        "heading": "小红书批量补采与筛选能力增强",
        "id": null
      }
    ],
    "links": [
      "/",
      "/xiaohongshu",
      "/douyin",
      "/xiaohongshu/keywords",
      "/xiaohongshu/viral-content-analysis",
      "/xiaohongshu/account-analysis",
      "/xiaohongshu/scraper",
      "/xiaohongshu/comments",
      "/xiaohongshu/downloader",
      "/xiaohongshu/image-text",
      "/xiaohongshu/transcript",
      "/xiaohongshu/leads",
      "/xiaohongshu/monitoring",
      "/douyin/account-analysis",
      "/douyin/viral-content-analysis",
      "/douyin/keywords",
      "/douyin/scraper",
      "/douyin/comments",
      "/douyin/downloader",
      "/douyin/transcript",
      "/douyin/image-text",
      "/douyin/leads",
      "/douyin/monitoring",
      "/features/feishu-integration",
      "/blog",
      "/welfare?entry=header_nav",
      "/updates",
      "/referral",
      "/download",
      "/pricing",
      "/updates/v0.3.0",
      "/updates/v0.2.3",
      "/updates/v0.2.2",
      "/updates/v0.2.1",
      "/updates/v0.2.0",
      "/updates/v0.1.9",
      "/updates/v0.1.8",
      "/updates/v0.1.7",
      "/updates/v0.1.5",
      "/updates/v0.1.3",
      "/updates/v0.1.2",
      "/updates/v0.1.1",
      "/updates/v0.1.0",
      "/updates/v0.0.9",
      "/updates/v0.0.7",
      "/updates/v0.0.6",
      "/welfare?entry=footer",
      "/privacy-policy",
      "/terms-of-service"
    ],
    "media": [],
    "source": "https://mediaclaw.app/updates"
  },
  {
    "path": "/en/updates",
    "status": 200,
    "locale": "en",
    "family": "updates",
    "title": "Update Logs — Product Features & Improvements | MediaClaw",
    "h1": "Update Logs",
    "summary": "Update Logs — Product Features & Improvements | MediaClaw",
    "sections": [
      {
        "tag": "section",
        "heading": "Update Logs",
        "id": "updates"
      },
      {
        "tag": "article",
        "heading": "MediaClaw Agent Is Now Available",
        "id": null
      },
      {
        "tag": "article",
        "heading": "Creator Profiles and More Reliable Collection",
        "id": null
      },
      {
        "tag": "article",
        "heading": "Batch Video Transcripts, Douyin Collection Capture, and Scenario Guides",
        "id": null
      },
      {
        "tag": "article",
        "heading": "Bulk Image Export, Deeper Post Breakdowns, More Flexible Teams",
        "id": null
      },
      {
        "tag": "article",
        "heading": "From Content Research to Ideation and Creation",
        "id": null
      },
      {
        "tag": "article",
        "heading": "Onboarding Guide and Cleaner, More Stable Douyin Collection",
        "id": null
      },
      {
        "tag": "article",
        "heading": "Markdown Export, Video Transcripts, and Image Text Extraction",
        "id": null
      },
      {
        "tag": "article",
        "heading": "Keyword Public Opinion Scan and Welfare Center",
        "id": null
      },
      {
        "tag": "article",
        "heading": "Competitor Account Finder, Diagnostics Copy, and Scraping Stability Updates",
        "id": null
      },
      {
        "tag": "article",
        "heading": "Keyword Opportunity Analysis & Improved Keyword Strategy Workflow",
        "id": null
      },
      {
        "tag": "article",
        "heading": "Douyin Attachment Downloads, Favorites/Likes Scraping & AI Rewrite",
        "id": null
      },
      {
        "tag": "article",
        "heading": "Creator Profile Filtering, Version Notifications, and Edge Compatibility",
        "id": null
      },
      {
        "tag": "article",
        "heading": "Continuous Scraping & Topic Insight Upgrade",
        "id": null
      },
      {
        "tag": "article",
        "heading": "Douyin Batch Scraping, Monitoring Digest, and Monetization Release",
        "id": null
      },
      {
        "tag": "article",
        "heading": "Xiaohongshu Creator Profile Enrichment & Comment Lead Filtering",
        "id": null
      },
      {
        "tag": "article",
        "heading": "Xiaohongshu Batch Backfill & Filtering Upgrade",
        "id": null
      }
    ],
    "links": [
      "/en",
      "/en/xiaohongshu",
      "/en/douyin",
      "/en/xiaohongshu/keywords",
      "/en/xiaohongshu/viral-content-analysis",
      "/en/xiaohongshu/account-analysis",
      "/en/xiaohongshu/scraper",
      "/en/xiaohongshu/comments",
      "/en/xiaohongshu/downloader",
      "/en/xiaohongshu/image-text",
      "/en/xiaohongshu/transcript",
      "/en/xiaohongshu/leads",
      "/en/xiaohongshu/monitoring",
      "/en/douyin/account-analysis",
      "/en/douyin/viral-content-analysis",
      "/en/douyin/keywords",
      "/en/douyin/scraper",
      "/en/douyin/comments",
      "/en/douyin/downloader",
      "/en/douyin/transcript",
      "/en/douyin/image-text",
      "/en/douyin/leads",
      "/en/douyin/monitoring",
      "/en/features/feishu-integration",
      "/en/blog",
      "/en/welfare?entry=header_nav",
      "/en/updates",
      "/en/referral",
      "/en/download",
      "/en/pricing",
      "/en/updates/v0.3.0",
      "/en/updates/v0.2.3",
      "/en/updates/v0.2.2",
      "/en/updates/v0.2.1",
      "/en/updates/v0.2.0",
      "/en/updates/v0.1.9",
      "/en/updates/v0.1.8",
      "/en/updates/v0.1.7",
      "/en/updates/v0.1.5",
      "/en/updates/v0.1.3",
      "/en/updates/v0.1.2",
      "/en/updates/v0.1.1",
      "/en/updates/v0.1.0",
      "/en/updates/v0.0.9",
      "/en/updates/v0.0.7",
      "/en/updates/v0.0.6",
      "/en/welfare?entry=footer",
      "/en/privacy-policy",
      "/en/terms-of-service"
    ],
    "media": [],
    "source": "https://mediaclaw.app/en/updates"
  },
  {
    "path": "/updates/v0.0.6",
    "status": 200,
    "locale": "zh",
    "family": "updates",
    "title": "小红书批量补采与筛选能力增强 | MediaClaw",
    "h1": "小红书批量补采与筛选能力增强",
    "summary": "小红书批量补采与筛选能力增强 | MediaClaw",
    "sections": [
      {
        "tag": "section",
        "heading": "小红书批量补采与筛选能力增强",
        "id": null
      },
      {
        "tag": "section",
        "heading": "评论数与收藏数筛选",
        "id": null
      },
      {
        "tag": "article",
        "heading": "评论数与收藏数筛选",
        "id": null
      }
    ],
    "links": [
      "/",
      "/xiaohongshu",
      "/douyin",
      "/xiaohongshu/keywords",
      "/xiaohongshu/viral-content-analysis",
      "/xiaohongshu/account-analysis",
      "/xiaohongshu/scraper",
      "/xiaohongshu/comments",
      "/xiaohongshu/downloader",
      "/xiaohongshu/image-text",
      "/xiaohongshu/transcript",
      "/xiaohongshu/leads",
      "/xiaohongshu/monitoring",
      "/douyin/account-analysis",
      "/douyin/viral-content-analysis",
      "/douyin/keywords",
      "/douyin/scraper",
      "/douyin/comments",
      "/douyin/downloader",
      "/douyin/transcript",
      "/douyin/image-text",
      "/douyin/leads",
      "/douyin/monitoring",
      "/features/feishu-integration",
      "/blog",
      "/welfare?entry=header_nav",
      "/updates",
      "/referral",
      "/download",
      "/pricing",
      "/welfare?entry=footer",
      "/privacy-policy",
      "/terms-of-service"
    ],
    "media": [],
    "source": "https://mediaclaw.app/updates/v0.0.6"
  },
  {
    "path": "/updates/v0.0.7",
    "status": 200,
    "locale": "zh",
    "family": "updates",
    "title": "小红书博主信息补全与评论客资筛选 | MediaClaw",
    "h1": "小红书博主信息补全与评论客资筛选",
    "summary": "小红书博主信息补全与评论客资筛选 | MediaClaw",
    "sections": [
      {
        "tag": "section",
        "heading": "小红书博主信息补全与评论客资筛选",
        "id": null
      },
      {
        "tag": "section",
        "heading": "小红书博主信息补全",
        "id": null
      },
      {
        "tag": "article",
        "heading": "小红书博主信息补全",
        "id": null
      }
    ],
    "links": [
      "/",
      "/xiaohongshu",
      "/douyin",
      "/xiaohongshu/keywords",
      "/xiaohongshu/viral-content-analysis",
      "/xiaohongshu/account-analysis",
      "/xiaohongshu/scraper",
      "/xiaohongshu/comments",
      "/xiaohongshu/downloader",
      "/xiaohongshu/image-text",
      "/xiaohongshu/transcript",
      "/xiaohongshu/leads",
      "/xiaohongshu/monitoring",
      "/douyin/account-analysis",
      "/douyin/viral-content-analysis",
      "/douyin/keywords",
      "/douyin/scraper",
      "/douyin/comments",
      "/douyin/downloader",
      "/douyin/transcript",
      "/douyin/image-text",
      "/douyin/leads",
      "/douyin/monitoring",
      "/features/feishu-integration",
      "/blog",
      "/welfare?entry=header_nav",
      "/updates",
      "/referral",
      "/download",
      "/pricing",
      "/welfare?entry=footer",
      "/privacy-policy",
      "/terms-of-service"
    ],
    "media": [],
    "source": "https://mediaclaw.app/updates/v0.0.7"
  },
  {
    "path": "/updates/v0.0.9",
    "status": 200,
    "locale": "zh",
    "family": "updates",
    "title": "抖音批量采集、监控日报与商业化能力上线 | MediaClaw",
    "h1": "抖音批量采集、监控日报与商业化能力上线",
    "summary": "抖音批量采集、监控日报与商业化能力上线 | MediaClaw",
    "sections": [
      {
        "tag": "section",
        "heading": "抖音批量采集、监控日报与商业化能力上线",
        "id": null
      },
      {
        "tag": "section",
        "heading": "抖音批量采集",
        "id": null
      },
      {
        "tag": "article",
        "heading": "抖音批量采集",
        "id": null
      }
    ],
    "links": [
      "/",
      "/xiaohongshu",
      "/douyin",
      "/xiaohongshu/keywords",
      "/xiaohongshu/viral-content-analysis",
      "/xiaohongshu/account-analysis",
      "/xiaohongshu/scraper",
      "/xiaohongshu/comments",
      "/xiaohongshu/downloader",
      "/xiaohongshu/image-text",
      "/xiaohongshu/transcript",
      "/xiaohongshu/leads",
      "/xiaohongshu/monitoring",
      "/douyin/account-analysis",
      "/douyin/viral-content-analysis",
      "/douyin/keywords",
      "/douyin/scraper",
      "/douyin/comments",
      "/douyin/downloader",
      "/douyin/transcript",
      "/douyin/image-text",
      "/douyin/leads",
      "/douyin/monitoring",
      "/features/feishu-integration",
      "/blog",
      "/welfare?entry=header_nav",
      "/updates",
      "/referral",
      "/download",
      "/pricing",
      "/welfare?entry=footer",
      "/privacy-policy",
      "/terms-of-service"
    ],
    "media": [],
    "source": "https://mediaclaw.app/updates/v0.0.9"
  },
  {
    "path": "/updates/v0.1.0",
    "status": 200,
    "locale": "zh",
    "family": "updates",
    "title": "连续采集与选题洞察增强 | MediaClaw",
    "h1": "连续采集与选题洞察增强",
    "summary": "连续采集与选题洞察增强 | MediaClaw",
    "sections": [
      {
        "tag": "section",
        "heading": "连续采集与选题洞察增强",
        "id": null
      },
      {
        "tag": "section",
        "heading": "连续采集支持批量输入",
        "id": null
      },
      {
        "tag": "article",
        "heading": "连续采集支持批量输入",
        "id": null
      }
    ],
    "links": [
      "/",
      "/xiaohongshu",
      "/douyin",
      "/xiaohongshu/keywords",
      "/xiaohongshu/viral-content-analysis",
      "/xiaohongshu/account-analysis",
      "/xiaohongshu/scraper",
      "/xiaohongshu/comments",
      "/xiaohongshu/downloader",
      "/xiaohongshu/image-text",
      "/xiaohongshu/transcript",
      "/xiaohongshu/leads",
      "/xiaohongshu/monitoring",
      "/douyin/account-analysis",
      "/douyin/viral-content-analysis",
      "/douyin/keywords",
      "/douyin/scraper",
      "/douyin/comments",
      "/douyin/downloader",
      "/douyin/transcript",
      "/douyin/image-text",
      "/douyin/leads",
      "/douyin/monitoring",
      "/features/feishu-integration",
      "/blog",
      "/welfare?entry=header_nav",
      "/updates",
      "/referral",
      "/download",
      "/pricing",
      "/welfare?entry=footer",
      "/privacy-policy",
      "/terms-of-service"
    ],
    "media": [],
    "source": "https://mediaclaw.app/updates/v0.1.0"
  },
  {
    "path": "/updates/v0.1.1",
    "status": 200,
    "locale": "zh",
    "family": "updates",
    "title": "账号主页筛选与版本通知上线，Edge 兼容性优化 | MediaClaw",
    "h1": "账号主页筛选与版本通知上线，Edge 兼容性优化",
    "summary": "账号主页筛选与版本通知上线，Edge 兼容性优化 | MediaClaw",
    "sections": [
      {
        "tag": "section",
        "heading": "账号主页筛选与版本通知上线，Edge 兼容性优化",
        "id": null
      },
      {
        "tag": "section",
        "heading": "账号主页笔记支持按主题关键词筛选",
        "id": null
      },
      {
        "tag": "article",
        "heading": "账号主页笔记支持按主题关键词筛选",
        "id": null
      }
    ],
    "links": [
      "/",
      "/xiaohongshu",
      "/douyin",
      "/xiaohongshu/keywords",
      "/xiaohongshu/viral-content-analysis",
      "/xiaohongshu/account-analysis",
      "/xiaohongshu/scraper",
      "/xiaohongshu/comments",
      "/xiaohongshu/downloader",
      "/xiaohongshu/image-text",
      "/xiaohongshu/transcript",
      "/xiaohongshu/leads",
      "/xiaohongshu/monitoring",
      "/douyin/account-analysis",
      "/douyin/viral-content-analysis",
      "/douyin/keywords",
      "/douyin/scraper",
      "/douyin/comments",
      "/douyin/downloader",
      "/douyin/transcript",
      "/douyin/image-text",
      "/douyin/leads",
      "/douyin/monitoring",
      "/features/feishu-integration",
      "/blog",
      "/welfare?entry=header_nav",
      "/updates",
      "/referral",
      "/download",
      "/pricing",
      "/welfare?entry=footer",
      "/privacy-policy",
      "/terms-of-service"
    ],
    "media": [],
    "source": "https://mediaclaw.app/updates/v0.1.1"
  },
  {
    "path": "/updates/v0.1.2",
    "status": 200,
    "locale": "zh",
    "family": "updates",
    "title": "抖音附件下载、收藏/点赞采集与 AI 改写能力上线 | MediaClaw",
    "h1": "抖音附件下载、收藏/点赞采集与 AI 改写能力上线",
    "summary": "抖音附件下载、收藏/点赞采集与 AI 改写能力上线 | MediaClaw",
    "sections": [
      {
        "tag": "section",
        "heading": "抖音附件下载、收藏/点赞采集与 AI 改写能力上线",
        "id": null
      },
      {
        "tag": "section",
        "heading": "抖音支持下载附件",
        "id": null
      },
      {
        "tag": "article",
        "heading": "抖音支持下载附件",
        "id": null
      }
    ],
    "links": [
      "/",
      "/xiaohongshu",
      "/douyin",
      "/xiaohongshu/keywords",
      "/xiaohongshu/viral-content-analysis",
      "/xiaohongshu/account-analysis",
      "/xiaohongshu/scraper",
      "/xiaohongshu/comments",
      "/xiaohongshu/downloader",
      "/xiaohongshu/image-text",
      "/xiaohongshu/transcript",
      "/xiaohongshu/leads",
      "/xiaohongshu/monitoring",
      "/douyin/account-analysis",
      "/douyin/viral-content-analysis",
      "/douyin/keywords",
      "/douyin/scraper",
      "/douyin/comments",
      "/douyin/downloader",
      "/douyin/transcript",
      "/douyin/image-text",
      "/douyin/leads",
      "/douyin/monitoring",
      "/features/feishu-integration",
      "/blog",
      "/welfare?entry=header_nav",
      "/updates",
      "/referral",
      "/download",
      "/pricing",
      "/welfare?entry=footer",
      "/privacy-policy",
      "/terms-of-service"
    ],
    "media": [],
    "source": "https://mediaclaw.app/updates/v0.1.2"
  },
  {
    "path": "/updates/v0.1.3",
    "status": 200,
    "locale": "zh",
    "family": "updates",
    "title": "新增主词机会判断，优化关键词策略衔接体验 | MediaClaw",
    "h1": "新增主词机会判断，优化关键词策略衔接体验",
    "summary": "新增主词机会判断，优化关键词策略衔接体验 | MediaClaw",
    "sections": [
      {
        "tag": "section",
        "heading": "新增主词机会判断，优化关键词策略衔接体验",
        "id": null
      },
      {
        "tag": "section",
        "heading": "主词机会判断",
        "id": null
      },
      {
        "tag": "article",
        "heading": "主词机会判断",
        "id": null
      }
    ],
    "links": [
      "/",
      "/xiaohongshu",
      "/douyin",
      "/xiaohongshu/keywords",
      "/xiaohongshu/viral-content-analysis",
      "/xiaohongshu/account-analysis",
      "/xiaohongshu/scraper",
      "/xiaohongshu/comments",
      "/xiaohongshu/downloader",
      "/xiaohongshu/image-text",
      "/xiaohongshu/transcript",
      "/xiaohongshu/leads",
      "/xiaohongshu/monitoring",
      "/douyin/account-analysis",
      "/douyin/viral-content-analysis",
      "/douyin/keywords",
      "/douyin/scraper",
      "/douyin/comments",
      "/douyin/downloader",
      "/douyin/transcript",
      "/douyin/image-text",
      "/douyin/leads",
      "/douyin/monitoring",
      "/features/feishu-integration",
      "/blog",
      "/welfare?entry=header_nav",
      "/updates",
      "/referral",
      "/download",
      "/pricing",
      "/welfare?entry=footer",
      "/privacy-policy",
      "/terms-of-service"
    ],
    "media": [],
    "source": "https://mediaclaw.app/updates/v0.1.3"
  },
  {
    "path": "/updates/v0.1.5",
    "status": 200,
    "locale": "zh",
    "family": "updates",
    "title": "搜索页新增「找对标账号」，诊断信息与采集稳定性升级 | MediaClaw",
    "h1": "搜索页新增「找对标账号」，诊断信息与采集稳定性升级",
    "summary": "搜索页新增「找对标账号」，诊断信息与采集稳定性升级 | MediaClaw",
    "sections": [
      {
        "tag": "section",
        "heading": "搜索页新增「找对标账号」，诊断信息与采集稳定性升级",
        "id": null
      },
      {
        "tag": "section",
        "heading": "搜索页新增「找对标账号」",
        "id": null
      },
      {
        "tag": "article",
        "heading": "搜索页新增「找对标账号」",
        "id": null
      }
    ],
    "links": [
      "/",
      "/xiaohongshu",
      "/douyin",
      "/xiaohongshu/keywords",
      "/xiaohongshu/viral-content-analysis",
      "/xiaohongshu/account-analysis",
      "/xiaohongshu/scraper",
      "/xiaohongshu/comments",
      "/xiaohongshu/downloader",
      "/xiaohongshu/image-text",
      "/xiaohongshu/transcript",
      "/xiaohongshu/leads",
      "/xiaohongshu/monitoring",
      "/douyin/account-analysis",
      "/douyin/viral-content-analysis",
      "/douyin/keywords",
      "/douyin/scraper",
      "/douyin/comments",
      "/douyin/downloader",
      "/douyin/transcript",
      "/douyin/image-text",
      "/douyin/leads",
      "/douyin/monitoring",
      "/features/feishu-integration",
      "/blog",
      "/welfare?entry=header_nav",
      "/updates",
      "/referral",
      "/download",
      "/pricing",
      "/welfare?entry=footer",
      "/privacy-policy",
      "/terms-of-service"
    ],
    "media": [],
    "source": "https://mediaclaw.app/updates/v0.1.5"
  },
  {
    "path": "/updates/v0.1.7",
    "status": 200,
    "locale": "zh",
    "family": "updates",
    "title": "新增关键词舆情扫描与福利中心 | MediaClaw",
    "h1": "新增关键词舆情扫描与福利中心",
    "summary": "新增关键词舆情扫描与福利中心 | MediaClaw",
    "sections": [
      {
        "tag": "section",
        "heading": "新增关键词舆情扫描与福利中心",
        "id": null
      },
      {
        "tag": "section",
        "heading": "新增关键词舆情扫描",
        "id": null
      },
      {
        "tag": "article",
        "heading": "新增关键词舆情扫描",
        "id": null
      }
    ],
    "links": [
      "/",
      "/xiaohongshu",
      "/douyin",
      "/xiaohongshu/keywords",
      "/xiaohongshu/viral-content-analysis",
      "/xiaohongshu/account-analysis",
      "/xiaohongshu/scraper",
      "/xiaohongshu/comments",
      "/xiaohongshu/downloader",
      "/xiaohongshu/image-text",
      "/xiaohongshu/transcript",
      "/xiaohongshu/leads",
      "/xiaohongshu/monitoring",
      "/douyin/account-analysis",
      "/douyin/viral-content-analysis",
      "/douyin/keywords",
      "/douyin/scraper",
      "/douyin/comments",
      "/douyin/downloader",
      "/douyin/transcript",
      "/douyin/image-text",
      "/douyin/leads",
      "/douyin/monitoring",
      "/features/feishu-integration",
      "/blog",
      "/welfare?entry=header_nav",
      "/updates",
      "/referral",
      "/download",
      "/pricing",
      "/welfare?entry=footer",
      "/privacy-policy",
      "/terms-of-service"
    ],
    "media": [],
    "source": "https://mediaclaw.app/updates/v0.1.7"
  },
  {
    "path": "/updates/v0.1.8",
    "status": 200,
    "locale": "zh",
    "family": "updates",
    "title": "Markdown 导出、视频逐字稿和配图文字提取上线 | MediaClaw",
    "h1": "Markdown 导出、视频逐字稿和配图文字提取上线",
    "summary": "Markdown 导出、视频逐字稿和配图文字提取上线 | MediaClaw",
    "sections": [
      {
        "tag": "section",
        "heading": "Markdown 导出、视频逐字稿和配图文字提取上线",
        "id": null
      },
      {
        "tag": "section",
        "heading": "新增 Markdown 导出格式",
        "id": null
      },
      {
        "tag": "article",
        "heading": "新增 Markdown 导出格式",
        "id": null
      }
    ],
    "links": [
      "/",
      "/xiaohongshu",
      "/douyin",
      "/xiaohongshu/keywords",
      "/xiaohongshu/viral-content-analysis",
      "/xiaohongshu/account-analysis",
      "/xiaohongshu/scraper",
      "/xiaohongshu/comments",
      "/xiaohongshu/downloader",
      "/xiaohongshu/image-text",
      "/xiaohongshu/transcript",
      "/xiaohongshu/leads",
      "/xiaohongshu/monitoring",
      "/douyin/account-analysis",
      "/douyin/viral-content-analysis",
      "/douyin/keywords",
      "/douyin/scraper",
      "/douyin/comments",
      "/douyin/downloader",
      "/douyin/transcript",
      "/douyin/image-text",
      "/douyin/leads",
      "/douyin/monitoring",
      "/features/feishu-integration",
      "/blog",
      "/welfare?entry=header_nav",
      "/updates",
      "/referral",
      "/download",
      "/pricing",
      "/welfare?entry=footer",
      "/privacy-policy",
      "/terms-of-service"
    ],
    "media": [],
    "source": "https://mediaclaw.app/updates/v0.1.8"
  },
  {
    "path": "/updates/v0.1.9",
    "status": 200,
    "locale": "zh",
    "family": "updates",
    "title": "新增新手引导，抖音采集更稳更干净 | MediaClaw",
    "h1": "新增新手引导，抖音采集更稳更干净",
    "summary": "新增新手引导，抖音采集更稳更干净 | MediaClaw",
    "sections": [
      {
        "tag": "section",
        "heading": "新增新手引导，抖音采集更稳更干净",
        "id": null
      },
      {
        "tag": "section",
        "heading": "新增新手引导",
        "id": null
      },
      {
        "tag": "article",
        "heading": "新增新手引导",
        "id": null
      }
    ],
    "links": [
      "/",
      "/xiaohongshu",
      "/douyin",
      "/xiaohongshu/keywords",
      "/xiaohongshu/viral-content-analysis",
      "/xiaohongshu/account-analysis",
      "/xiaohongshu/scraper",
      "/xiaohongshu/comments",
      "/xiaohongshu/downloader",
      "/xiaohongshu/image-text",
      "/xiaohongshu/transcript",
      "/xiaohongshu/leads",
      "/xiaohongshu/monitoring",
      "/douyin/account-analysis",
      "/douyin/viral-content-analysis",
      "/douyin/keywords",
      "/douyin/scraper",
      "/douyin/comments",
      "/douyin/downloader",
      "/douyin/transcript",
      "/douyin/image-text",
      "/douyin/leads",
      "/douyin/monitoring",
      "/features/feishu-integration",
      "/blog",
      "/welfare?entry=header_nav",
      "/updates",
      "/referral",
      "/download",
      "/pricing",
      "/welfare?entry=footer",
      "/privacy-policy",
      "/terms-of-service"
    ],
    "media": [],
    "source": "https://mediaclaw.app/updates/v0.1.9"
  },
  {
    "path": "/updates/v0.2.0",
    "status": 200,
    "locale": "zh",
    "family": "updates",
    "title": "从内容研究，到选题与创作 | MediaClaw",
    "h1": "从内容研究，到选题与创作",
    "summary": "从内容研究，到选题与创作 | MediaClaw",
    "sections": [
      {
        "tag": "section",
        "heading": "从内容研究，到选题与创作",
        "id": null
      },
      {
        "tag": "section",
        "heading": "全新 AI 工作台",
        "id": null
      },
      {
        "tag": "article",
        "heading": "全新 AI 工作台",
        "id": null
      }
    ],
    "links": [
      "/",
      "/xiaohongshu",
      "/douyin",
      "/xiaohongshu/keywords",
      "/xiaohongshu/viral-content-analysis",
      "/xiaohongshu/account-analysis",
      "/xiaohongshu/scraper",
      "/xiaohongshu/comments",
      "/xiaohongshu/downloader",
      "/xiaohongshu/image-text",
      "/xiaohongshu/transcript",
      "/xiaohongshu/leads",
      "/xiaohongshu/monitoring",
      "/douyin/account-analysis",
      "/douyin/viral-content-analysis",
      "/douyin/keywords",
      "/douyin/scraper",
      "/douyin/comments",
      "/douyin/downloader",
      "/douyin/transcript",
      "/douyin/image-text",
      "/douyin/leads",
      "/douyin/monitoring",
      "/features/feishu-integration",
      "/blog",
      "/welfare?entry=header_nav",
      "/updates",
      "/referral",
      "/download",
      "/pricing",
      "/welfare?entry=footer",
      "/privacy-policy",
      "/terms-of-service"
    ],
    "media": [],
    "source": "https://mediaclaw.app/updates/v0.2.0"
  },
  {
    "path": "/updates/v0.2.1",
    "status": 200,
    "locale": "zh",
    "family": "updates",
    "title": "批量导出图片，图文拆解更深、团队协作更灵活 | MediaClaw",
    "h1": "批量导出图片，图文拆解更深、团队协作更灵活",
    "summary": "批量导出图片，图文拆解更深、团队协作更灵活 | MediaClaw",
    "sections": [
      {
        "tag": "section",
        "heading": "批量导出图片，图文拆解更深、团队协作更灵活",
        "id": null
      },
      {
        "tag": "section",
        "heading": "批量导出图片",
        "id": null
      },
      {
        "tag": "article",
        "heading": "批量导出图片",
        "id": null
      }
    ],
    "links": [
      "/",
      "/xiaohongshu",
      "/douyin",
      "/xiaohongshu/keywords",
      "/xiaohongshu/viral-content-analysis",
      "/xiaohongshu/account-analysis",
      "/xiaohongshu/scraper",
      "/xiaohongshu/comments",
      "/xiaohongshu/downloader",
      "/xiaohongshu/image-text",
      "/xiaohongshu/transcript",
      "/xiaohongshu/leads",
      "/xiaohongshu/monitoring",
      "/douyin/account-analysis",
      "/douyin/viral-content-analysis",
      "/douyin/keywords",
      "/douyin/scraper",
      "/douyin/comments",
      "/douyin/downloader",
      "/douyin/transcript",
      "/douyin/image-text",
      "/douyin/leads",
      "/douyin/monitoring",
      "/features/feishu-integration",
      "/blog",
      "/welfare?entry=header_nav",
      "/updates",
      "/referral",
      "/download",
      "/pricing",
      "/welfare?entry=footer",
      "/privacy-policy",
      "/terms-of-service"
    ],
    "media": [],
    "source": "https://mediaclaw.app/updates/v0.2.1"
  },
  {
    "path": "/updates/v0.2.2",
    "status": 200,
    "locale": "zh",
    "family": "updates",
    "title": "批量视频逐字稿、抖音合集采集与场景式引导 | MediaClaw",
    "h1": "批量视频逐字稿、抖音合集采集与场景式引导",
    "summary": "批量视频逐字稿、抖音合集采集与场景式引导 | MediaClaw",
    "sections": [
      {
        "tag": "section",
        "heading": "批量视频逐字稿、抖音合集采集与场景式引导",
        "id": null
      },
      {
        "tag": "section",
        "heading": "新增批量视频逐字稿",
        "id": null
      },
      {
        "tag": "article",
        "heading": "新增批量视频逐字稿",
        "id": null
      }
    ],
    "links": [
      "/",
      "/xiaohongshu",
      "/douyin",
      "/xiaohongshu/keywords",
      "/xiaohongshu/viral-content-analysis",
      "/xiaohongshu/account-analysis",
      "/xiaohongshu/scraper",
      "/xiaohongshu/comments",
      "/xiaohongshu/downloader",
      "/xiaohongshu/image-text",
      "/xiaohongshu/transcript",
      "/xiaohongshu/leads",
      "/xiaohongshu/monitoring",
      "/douyin/account-analysis",
      "/douyin/viral-content-analysis",
      "/douyin/keywords",
      "/douyin/scraper",
      "/douyin/comments",
      "/douyin/downloader",
      "/douyin/transcript",
      "/douyin/image-text",
      "/douyin/leads",
      "/douyin/monitoring",
      "/features/feishu-integration",
      "/blog",
      "/welfare?entry=header_nav",
      "/updates",
      "/referral",
      "/download",
      "/pricing",
      "/welfare?entry=footer",
      "/privacy-policy",
      "/terms-of-service"
    ],
    "media": [],
    "source": "https://mediaclaw.app/updates/v0.2.2"
  },
  {
    "path": "/updates/v0.2.3",
    "status": 200,
    "locale": "zh",
    "family": "updates",
    "title": "我的创作档案与采集稳定性优化 | MediaClaw",
    "h1": "我的创作档案与采集稳定性优化",
    "summary": "我的创作档案与采集稳定性优化 | MediaClaw",
    "sections": [
      {
        "tag": "section",
        "heading": "我的创作档案与采集稳定性优化",
        "id": null
      },
      {
        "tag": "section",
        "heading": "新增「我的创作档案」",
        "id": null
      },
      {
        "tag": "article",
        "heading": "新增「我的创作档案」",
        "id": null
      }
    ],
    "links": [
      "/",
      "/xiaohongshu",
      "/douyin",
      "/xiaohongshu/keywords",
      "/xiaohongshu/viral-content-analysis",
      "/xiaohongshu/account-analysis",
      "/xiaohongshu/scraper",
      "/xiaohongshu/comments",
      "/xiaohongshu/downloader",
      "/xiaohongshu/image-text",
      "/xiaohongshu/transcript",
      "/xiaohongshu/leads",
      "/xiaohongshu/monitoring",
      "/douyin/account-analysis",
      "/douyin/viral-content-analysis",
      "/douyin/keywords",
      "/douyin/scraper",
      "/douyin/comments",
      "/douyin/downloader",
      "/douyin/transcript",
      "/douyin/image-text",
      "/douyin/leads",
      "/douyin/monitoring",
      "/features/feishu-integration",
      "/blog",
      "/welfare?entry=header_nav",
      "/updates",
      "/referral",
      "/download",
      "/pricing",
      "/welfare?entry=footer",
      "/privacy-policy",
      "/terms-of-service"
    ],
    "media": [],
    "source": "https://mediaclaw.app/updates/v0.2.3"
  },
  {
    "path": "/updates/v0.3.0",
    "status": 200,
    "locale": "zh",
    "family": "updates",
    "title": "MediaClaw Agent 正式上线 | MediaClaw",
    "h1": "MediaClaw Agent 正式上线",
    "summary": "MediaClaw Agent 正式上线 | MediaClaw",
    "sections": [
      {
        "tag": "section",
        "heading": "MediaClaw Agent 正式上线",
        "id": null
      },
      {
        "tag": "section",
        "heading": "本机 Agent 接管",
        "id": null
      },
      {
        "tag": "article",
        "heading": "本机 Agent 接管",
        "id": null
      }
    ],
    "links": [
      "/",
      "/xiaohongshu",
      "/douyin",
      "/xiaohongshu/keywords",
      "/xiaohongshu/viral-content-analysis",
      "/xiaohongshu/account-analysis",
      "/xiaohongshu/scraper",
      "/xiaohongshu/comments",
      "/xiaohongshu/downloader",
      "/xiaohongshu/image-text",
      "/xiaohongshu/transcript",
      "/xiaohongshu/leads",
      "/xiaohongshu/monitoring",
      "/douyin/account-analysis",
      "/douyin/viral-content-analysis",
      "/douyin/keywords",
      "/douyin/scraper",
      "/douyin/comments",
      "/douyin/downloader",
      "/douyin/transcript",
      "/douyin/image-text",
      "/douyin/leads",
      "/douyin/monitoring",
      "/features/feishu-integration",
      "/blog",
      "/welfare?entry=header_nav",
      "/updates",
      "/referral",
      "/download",
      "/pricing",
      "/welfare?entry=footer",
      "/privacy-policy",
      "/terms-of-service"
    ],
    "media": [],
    "source": "https://mediaclaw.app/updates/v0.3.0"
  },
  {
    "path": "/en/updates/v0.0.6",
    "status": 200,
    "locale": "en",
    "family": "updates",
    "title": "Xiaohongshu Batch Backfill & Filtering Upgrade | MediaClaw",
    "h1": "Xiaohongshu Batch Backfill & Filtering Upgrade",
    "summary": "Xiaohongshu Batch Backfill & Filtering Upgrade | MediaClaw",
    "sections": [
      {
        "tag": "section",
        "heading": "Xiaohongshu Batch Backfill & Filtering Upgrade",
        "id": null
      },
      {
        "tag": "section",
        "heading": "Comment and save count filtering",
        "id": null
      },
      {
        "tag": "article",
        "heading": "Comment and save count filtering",
        "id": null
      }
    ],
    "links": [
      "/en",
      "/en/xiaohongshu",
      "/en/douyin",
      "/en/xiaohongshu/keywords",
      "/en/xiaohongshu/viral-content-analysis",
      "/en/xiaohongshu/account-analysis",
      "/en/xiaohongshu/scraper",
      "/en/xiaohongshu/comments",
      "/en/xiaohongshu/downloader",
      "/en/xiaohongshu/image-text",
      "/en/xiaohongshu/transcript",
      "/en/xiaohongshu/leads",
      "/en/xiaohongshu/monitoring",
      "/en/douyin/account-analysis",
      "/en/douyin/viral-content-analysis",
      "/en/douyin/keywords",
      "/en/douyin/scraper",
      "/en/douyin/comments",
      "/en/douyin/downloader",
      "/en/douyin/transcript",
      "/en/douyin/image-text",
      "/en/douyin/leads",
      "/en/douyin/monitoring",
      "/en/features/feishu-integration",
      "/en/blog",
      "/en/welfare?entry=header_nav",
      "/en/updates",
      "/en/referral",
      "/en/download",
      "/en/pricing",
      "/en/welfare?entry=footer",
      "/en/privacy-policy",
      "/en/terms-of-service"
    ],
    "media": [],
    "source": "https://mediaclaw.app/en/updates/v0.0.6"
  },
  {
    "path": "/en/updates/v0.0.7",
    "status": 200,
    "locale": "en",
    "family": "updates",
    "title": "Xiaohongshu Creator Profile Enrichment & Comment Lead Filtering | MediaClaw",
    "h1": "Xiaohongshu Creator Profile Enrichment & Comment Lead Filtering",
    "summary": "Xiaohongshu Creator Profile Enrichment & Comment Lead Filtering | MediaClaw",
    "sections": [
      {
        "tag": "section",
        "heading": "Xiaohongshu Creator Profile Enrichment & Comment Lead Filtering",
        "id": null
      },
      {
        "tag": "section",
        "heading": "Xiaohongshu creator profile enrichment",
        "id": null
      },
      {
        "tag": "article",
        "heading": "Xiaohongshu creator profile enrichment",
        "id": null
      }
    ],
    "links": [
      "/en",
      "/en/xiaohongshu",
      "/en/douyin",
      "/en/xiaohongshu/keywords",
      "/en/xiaohongshu/viral-content-analysis",
      "/en/xiaohongshu/account-analysis",
      "/en/xiaohongshu/scraper",
      "/en/xiaohongshu/comments",
      "/en/xiaohongshu/downloader",
      "/en/xiaohongshu/image-text",
      "/en/xiaohongshu/transcript",
      "/en/xiaohongshu/leads",
      "/en/xiaohongshu/monitoring",
      "/en/douyin/account-analysis",
      "/en/douyin/viral-content-analysis",
      "/en/douyin/keywords",
      "/en/douyin/scraper",
      "/en/douyin/comments",
      "/en/douyin/downloader",
      "/en/douyin/transcript",
      "/en/douyin/image-text",
      "/en/douyin/leads",
      "/en/douyin/monitoring",
      "/en/features/feishu-integration",
      "/en/blog",
      "/en/welfare?entry=header_nav",
      "/en/updates",
      "/en/referral",
      "/en/download",
      "/en/pricing",
      "/en/welfare?entry=footer",
      "/en/privacy-policy",
      "/en/terms-of-service"
    ],
    "media": [],
    "source": "https://mediaclaw.app/en/updates/v0.0.7"
  },
  {
    "path": "/en/updates/v0.0.9",
    "status": 200,
    "locale": "en",
    "family": "updates",
    "title": "Douyin Batch Scraping, Monitoring Digest, and Monetization Release | MediaClaw",
    "h1": "Douyin Batch Scraping, Monitoring Digest, and Monetization Release",
    "summary": "Douyin Batch Scraping, Monitoring Digest, and Monetization Release | MediaClaw",
    "sections": [
      {
        "tag": "section",
        "heading": "Douyin Batch Scraping, Monitoring Digest, and Monetization Release",
        "id": null
      },
      {
        "tag": "section",
        "heading": "Douyin batch scraping",
        "id": null
      },
      {
        "tag": "article",
        "heading": "Douyin batch scraping",
        "id": null
      }
    ],
    "links": [
      "/en",
      "/en/xiaohongshu",
      "/en/douyin",
      "/en/xiaohongshu/keywords",
      "/en/xiaohongshu/viral-content-analysis",
      "/en/xiaohongshu/account-analysis",
      "/en/xiaohongshu/scraper",
      "/en/xiaohongshu/comments",
      "/en/xiaohongshu/downloader",
      "/en/xiaohongshu/image-text",
      "/en/xiaohongshu/transcript",
      "/en/xiaohongshu/leads",
      "/en/xiaohongshu/monitoring",
      "/en/douyin/account-analysis",
      "/en/douyin/viral-content-analysis",
      "/en/douyin/keywords",
      "/en/douyin/scraper",
      "/en/douyin/comments",
      "/en/douyin/downloader",
      "/en/douyin/transcript",
      "/en/douyin/image-text",
      "/en/douyin/leads",
      "/en/douyin/monitoring",
      "/en/features/feishu-integration",
      "/en/blog",
      "/en/welfare?entry=header_nav",
      "/en/updates",
      "/en/referral",
      "/en/download",
      "/en/pricing",
      "/referral",
      "/en/welfare?entry=footer",
      "/en/privacy-policy",
      "/en/terms-of-service"
    ],
    "media": [],
    "source": "https://mediaclaw.app/en/updates/v0.0.9"
  },
  {
    "path": "/en/updates/v0.1.0",
    "status": 200,
    "locale": "en",
    "family": "updates",
    "title": "Continuous Scraping & Topic Insight Upgrade | MediaClaw",
    "h1": "Continuous Scraping & Topic Insight Upgrade",
    "summary": "Continuous Scraping & Topic Insight Upgrade | MediaClaw",
    "sections": [
      {
        "tag": "section",
        "heading": "Continuous Scraping & Topic Insight Upgrade",
        "id": null
      },
      {
        "tag": "section",
        "heading": "Batch input for continuous scraping",
        "id": null
      },
      {
        "tag": "article",
        "heading": "Batch input for continuous scraping",
        "id": null
      }
    ],
    "links": [
      "/en",
      "/en/xiaohongshu",
      "/en/douyin",
      "/en/xiaohongshu/keywords",
      "/en/xiaohongshu/viral-content-analysis",
      "/en/xiaohongshu/account-analysis",
      "/en/xiaohongshu/scraper",
      "/en/xiaohongshu/comments",
      "/en/xiaohongshu/downloader",
      "/en/xiaohongshu/image-text",
      "/en/xiaohongshu/transcript",
      "/en/xiaohongshu/leads",
      "/en/xiaohongshu/monitoring",
      "/en/douyin/account-analysis",
      "/en/douyin/viral-content-analysis",
      "/en/douyin/keywords",
      "/en/douyin/scraper",
      "/en/douyin/comments",
      "/en/douyin/downloader",
      "/en/douyin/transcript",
      "/en/douyin/image-text",
      "/en/douyin/leads",
      "/en/douyin/monitoring",
      "/en/features/feishu-integration",
      "/en/blog",
      "/en/welfare?entry=header_nav",
      "/en/updates",
      "/en/referral",
      "/en/download",
      "/en/pricing",
      "/en/welfare?entry=footer",
      "/en/privacy-policy",
      "/en/terms-of-service"
    ],
    "media": [],
    "source": "https://mediaclaw.app/en/updates/v0.1.0"
  },
  {
    "path": "/en/updates/v0.1.1",
    "status": 200,
    "locale": "en",
    "family": "updates",
    "title": "Creator Profile Filtering, Version Notifications, and Edge Compatibility | MediaClaw",
    "h1": "Creator Profile Filtering, Version Notifications, and Edge Compatibility",
    "summary": "Creator Profile Filtering, Version Notifications, and Edge Compatibility | MediaClaw",
    "sections": [
      {
        "tag": "section",
        "heading": "Creator Profile Filtering, Version Notifications, and Edge Compatibility",
        "id": null
      },
      {
        "tag": "section",
        "heading": "Creator profile topic filtering",
        "id": null
      },
      {
        "tag": "article",
        "heading": "Creator profile topic filtering",
        "id": null
      }
    ],
    "links": [
      "/en",
      "/en/xiaohongshu",
      "/en/douyin",
      "/en/xiaohongshu/keywords",
      "/en/xiaohongshu/viral-content-analysis",
      "/en/xiaohongshu/account-analysis",
      "/en/xiaohongshu/scraper",
      "/en/xiaohongshu/comments",
      "/en/xiaohongshu/downloader",
      "/en/xiaohongshu/image-text",
      "/en/xiaohongshu/transcript",
      "/en/xiaohongshu/leads",
      "/en/xiaohongshu/monitoring",
      "/en/douyin/account-analysis",
      "/en/douyin/viral-content-analysis",
      "/en/douyin/keywords",
      "/en/douyin/scraper",
      "/en/douyin/comments",
      "/en/douyin/downloader",
      "/en/douyin/transcript",
      "/en/douyin/image-text",
      "/en/douyin/leads",
      "/en/douyin/monitoring",
      "/en/features/feishu-integration",
      "/en/blog",
      "/en/welfare?entry=header_nav",
      "/en/updates",
      "/en/referral",
      "/en/download",
      "/en/pricing",
      "/en/welfare?entry=footer",
      "/en/privacy-policy",
      "/en/terms-of-service"
    ],
    "media": [],
    "source": "https://mediaclaw.app/en/updates/v0.1.1"
  },
  {
    "path": "/en/updates/v0.1.2",
    "status": 200,
    "locale": "en",
    "family": "updates",
    "title": "Douyin Attachment Downloads, Favorites/Likes Scraping & AI Rewrite | MediaClaw",
    "h1": "Douyin Attachment Downloads, Favorites/Likes Scraping & AI Rewrite",
    "summary": "Douyin Attachment Downloads, Favorites/Likes Scraping & AI Rewrite | MediaClaw",
    "sections": [
      {
        "tag": "section",
        "heading": "Douyin Attachment Downloads, Favorites/Likes Scraping & AI Rewrite",
        "id": null
      },
      {
        "tag": "section",
        "heading": "Douyin attachment downloads",
        "id": null
      },
      {
        "tag": "article",
        "heading": "Douyin attachment downloads",
        "id": null
      }
    ],
    "links": [
      "/en",
      "/en/xiaohongshu",
      "/en/douyin",
      "/en/xiaohongshu/keywords",
      "/en/xiaohongshu/viral-content-analysis",
      "/en/xiaohongshu/account-analysis",
      "/en/xiaohongshu/scraper",
      "/en/xiaohongshu/comments",
      "/en/xiaohongshu/downloader",
      "/en/xiaohongshu/image-text",
      "/en/xiaohongshu/transcript",
      "/en/xiaohongshu/leads",
      "/en/xiaohongshu/monitoring",
      "/en/douyin/account-analysis",
      "/en/douyin/viral-content-analysis",
      "/en/douyin/keywords",
      "/en/douyin/scraper",
      "/en/douyin/comments",
      "/en/douyin/downloader",
      "/en/douyin/transcript",
      "/en/douyin/image-text",
      "/en/douyin/leads",
      "/en/douyin/monitoring",
      "/en/features/feishu-integration",
      "/en/blog",
      "/en/welfare?entry=header_nav",
      "/en/updates",
      "/en/referral",
      "/en/download",
      "/en/pricing",
      "/en/welfare?entry=footer",
      "/en/privacy-policy",
      "/en/terms-of-service"
    ],
    "media": [],
    "source": "https://mediaclaw.app/en/updates/v0.1.2"
  },
  {
    "path": "/en/updates/v0.1.3",
    "status": 200,
    "locale": "en",
    "family": "updates",
    "title": "Keyword Opportunity Analysis & Improved Keyword Strategy Workflow | MediaClaw",
    "h1": "Keyword Opportunity Analysis & Improved Keyword Strategy Workflow",
    "summary": "Keyword Opportunity Analysis & Improved Keyword Strategy Workflow | MediaClaw",
    "sections": [
      {
        "tag": "section",
        "heading": "Keyword Opportunity Analysis & Improved Keyword Strategy Workflow",
        "id": null
      },
      {
        "tag": "section",
        "heading": "Keyword opportunity analysis",
        "id": null
      },
      {
        "tag": "article",
        "heading": "Keyword opportunity analysis",
        "id": null
      }
    ],
    "links": [
      "/en",
      "/en/xiaohongshu",
      "/en/douyin",
      "/en/xiaohongshu/keywords",
      "/en/xiaohongshu/viral-content-analysis",
      "/en/xiaohongshu/account-analysis",
      "/en/xiaohongshu/scraper",
      "/en/xiaohongshu/comments",
      "/en/xiaohongshu/downloader",
      "/en/xiaohongshu/image-text",
      "/en/xiaohongshu/transcript",
      "/en/xiaohongshu/leads",
      "/en/xiaohongshu/monitoring",
      "/en/douyin/account-analysis",
      "/en/douyin/viral-content-analysis",
      "/en/douyin/keywords",
      "/en/douyin/scraper",
      "/en/douyin/comments",
      "/en/douyin/downloader",
      "/en/douyin/transcript",
      "/en/douyin/image-text",
      "/en/douyin/leads",
      "/en/douyin/monitoring",
      "/en/features/feishu-integration",
      "/en/blog",
      "/en/welfare?entry=header_nav",
      "/en/updates",
      "/en/referral",
      "/en/download",
      "/en/pricing",
      "/en/welfare?entry=footer",
      "/en/privacy-policy",
      "/en/terms-of-service"
    ],
    "media": [],
    "source": "https://mediaclaw.app/en/updates/v0.1.3"
  },
  {
    "path": "/en/updates/v0.1.5",
    "status": 200,
    "locale": "en",
    "family": "updates",
    "title": "Competitor Account Finder, Diagnostics Copy, and Scraping Stability Updates | MediaClaw",
    "h1": "Competitor Account Finder, Diagnostics Copy, and Scraping Stability Updates",
    "summary": "Competitor Account Finder, Diagnostics Copy, and Scraping Stability Updates | MediaClaw",
    "sections": [
      {
        "tag": "section",
        "heading": "Competitor Account Finder, Diagnostics Copy, and Scraping Stability Updates",
        "id": null
      },
      {
        "tag": "section",
        "heading": "Find competitor accounts on search pages",
        "id": null
      },
      {
        "tag": "article",
        "heading": "Find competitor accounts on search pages",
        "id": null
      }
    ],
    "links": [
      "/en",
      "/en/xiaohongshu",
      "/en/douyin",
      "/en/xiaohongshu/keywords",
      "/en/xiaohongshu/viral-content-analysis",
      "/en/xiaohongshu/account-analysis",
      "/en/xiaohongshu/scraper",
      "/en/xiaohongshu/comments",
      "/en/xiaohongshu/downloader",
      "/en/xiaohongshu/image-text",
      "/en/xiaohongshu/transcript",
      "/en/xiaohongshu/leads",
      "/en/xiaohongshu/monitoring",
      "/en/douyin/account-analysis",
      "/en/douyin/viral-content-analysis",
      "/en/douyin/keywords",
      "/en/douyin/scraper",
      "/en/douyin/comments",
      "/en/douyin/downloader",
      "/en/douyin/transcript",
      "/en/douyin/image-text",
      "/en/douyin/leads",
      "/en/douyin/monitoring",
      "/en/features/feishu-integration",
      "/en/blog",
      "/en/welfare?entry=header_nav",
      "/en/updates",
      "/en/referral",
      "/en/download",
      "/en/pricing",
      "/en/welfare?entry=footer",
      "/en/privacy-policy",
      "/en/terms-of-service"
    ],
    "media": [],
    "source": "https://mediaclaw.app/en/updates/v0.1.5"
  },
  {
    "path": "/en/updates/v0.1.7",
    "status": 200,
    "locale": "en",
    "family": "updates",
    "title": "Keyword Public Opinion Scan and Welfare Center | MediaClaw",
    "h1": "Keyword Public Opinion Scan and Welfare Center",
    "summary": "Keyword Public Opinion Scan and Welfare Center | MediaClaw",
    "sections": [
      {
        "tag": "section",
        "heading": "Keyword Public Opinion Scan and Welfare Center",
        "id": null
      },
      {
        "tag": "section",
        "heading": "Keyword public opinion scan",
        "id": null
      },
      {
        "tag": "article",
        "heading": "Keyword public opinion scan",
        "id": null
      }
    ],
    "links": [
      "/en",
      "/en/xiaohongshu",
      "/en/douyin",
      "/en/xiaohongshu/keywords",
      "/en/xiaohongshu/viral-content-analysis",
      "/en/xiaohongshu/account-analysis",
      "/en/xiaohongshu/scraper",
      "/en/xiaohongshu/comments",
      "/en/xiaohongshu/downloader",
      "/en/xiaohongshu/image-text",
      "/en/xiaohongshu/transcript",
      "/en/xiaohongshu/leads",
      "/en/xiaohongshu/monitoring",
      "/en/douyin/account-analysis",
      "/en/douyin/viral-content-analysis",
      "/en/douyin/keywords",
      "/en/douyin/scraper",
      "/en/douyin/comments",
      "/en/douyin/downloader",
      "/en/douyin/transcript",
      "/en/douyin/image-text",
      "/en/douyin/leads",
      "/en/douyin/monitoring",
      "/en/features/feishu-integration",
      "/en/blog",
      "/en/welfare?entry=header_nav",
      "/en/updates",
      "/en/referral",
      "/en/download",
      "/en/pricing",
      "/en/welfare?entry=footer",
      "/en/privacy-policy",
      "/en/terms-of-service"
    ],
    "media": [],
    "source": "https://mediaclaw.app/en/updates/v0.1.7"
  },
  {
    "path": "/en/updates/v0.1.8",
    "status": 200,
    "locale": "en",
    "family": "updates",
    "title": "Markdown Export, Video Transcripts, and Image Text Extraction | MediaClaw",
    "h1": "Markdown Export, Video Transcripts, and Image Text Extraction",
    "summary": "Markdown Export, Video Transcripts, and Image Text Extraction | MediaClaw",
    "sections": [
      {
        "tag": "section",
        "heading": "Markdown Export, Video Transcripts, and Image Text Extraction",
        "id": null
      },
      {
        "tag": "section",
        "heading": "Markdown export format",
        "id": null
      },
      {
        "tag": "article",
        "heading": "Markdown export format",
        "id": null
      }
    ],
    "links": [
      "/en",
      "/en/xiaohongshu",
      "/en/douyin",
      "/en/xiaohongshu/keywords",
      "/en/xiaohongshu/viral-content-analysis",
      "/en/xiaohongshu/account-analysis",
      "/en/xiaohongshu/scraper",
      "/en/xiaohongshu/comments",
      "/en/xiaohongshu/downloader",
      "/en/xiaohongshu/image-text",
      "/en/xiaohongshu/transcript",
      "/en/xiaohongshu/leads",
      "/en/xiaohongshu/monitoring",
      "/en/douyin/account-analysis",
      "/en/douyin/viral-content-analysis",
      "/en/douyin/keywords",
      "/en/douyin/scraper",
      "/en/douyin/comments",
      "/en/douyin/downloader",
      "/en/douyin/transcript",
      "/en/douyin/image-text",
      "/en/douyin/leads",
      "/en/douyin/monitoring",
      "/en/features/feishu-integration",
      "/en/blog",
      "/en/welfare?entry=header_nav",
      "/en/updates",
      "/en/referral",
      "/en/download",
      "/en/pricing",
      "/en/welfare?entry=footer",
      "/en/privacy-policy",
      "/en/terms-of-service"
    ],
    "media": [],
    "source": "https://mediaclaw.app/en/updates/v0.1.8"
  },
  {
    "path": "/en/updates/v0.1.9",
    "status": 200,
    "locale": "en",
    "family": "updates",
    "title": "Onboarding Guide and Cleaner, More Stable Douyin Collection | MediaClaw",
    "h1": "Onboarding Guide and Cleaner, More Stable Douyin Collection",
    "summary": "Onboarding Guide and Cleaner, More Stable Douyin Collection | MediaClaw",
    "sections": [
      {
        "tag": "section",
        "heading": "Onboarding Guide and Cleaner, More Stable Douyin Collection",
        "id": null
      },
      {
        "tag": "section",
        "heading": "Onboarding guide",
        "id": null
      },
      {
        "tag": "article",
        "heading": "Onboarding guide",
        "id": null
      }
    ],
    "links": [
      "/en",
      "/en/xiaohongshu",
      "/en/douyin",
      "/en/xiaohongshu/keywords",
      "/en/xiaohongshu/viral-content-analysis",
      "/en/xiaohongshu/account-analysis",
      "/en/xiaohongshu/scraper",
      "/en/xiaohongshu/comments",
      "/en/xiaohongshu/downloader",
      "/en/xiaohongshu/image-text",
      "/en/xiaohongshu/transcript",
      "/en/xiaohongshu/leads",
      "/en/xiaohongshu/monitoring",
      "/en/douyin/account-analysis",
      "/en/douyin/viral-content-analysis",
      "/en/douyin/keywords",
      "/en/douyin/scraper",
      "/en/douyin/comments",
      "/en/douyin/downloader",
      "/en/douyin/transcript",
      "/en/douyin/image-text",
      "/en/douyin/leads",
      "/en/douyin/monitoring",
      "/en/features/feishu-integration",
      "/en/blog",
      "/en/welfare?entry=header_nav",
      "/en/updates",
      "/en/referral",
      "/en/download",
      "/en/pricing",
      "/en/welfare?entry=footer",
      "/en/privacy-policy",
      "/en/terms-of-service"
    ],
    "media": [],
    "source": "https://mediaclaw.app/en/updates/v0.1.9"
  },
  {
    "path": "/en/updates/v0.2.0",
    "status": 200,
    "locale": "en",
    "family": "updates",
    "title": "From Content Research to Ideation and Creation | MediaClaw",
    "h1": "From Content Research to Ideation and Creation",
    "summary": "From Content Research to Ideation and Creation | MediaClaw",
    "sections": [
      {
        "tag": "section",
        "heading": "From Content Research to Ideation and Creation",
        "id": null
      },
      {
        "tag": "section",
        "heading": "A brand-new AI Workspace",
        "id": null
      },
      {
        "tag": "article",
        "heading": "A brand-new AI Workspace",
        "id": null
      }
    ],
    "links": [
      "/en",
      "/en/xiaohongshu",
      "/en/douyin",
      "/en/xiaohongshu/keywords",
      "/en/xiaohongshu/viral-content-analysis",
      "/en/xiaohongshu/account-analysis",
      "/en/xiaohongshu/scraper",
      "/en/xiaohongshu/comments",
      "/en/xiaohongshu/downloader",
      "/en/xiaohongshu/image-text",
      "/en/xiaohongshu/transcript",
      "/en/xiaohongshu/leads",
      "/en/xiaohongshu/monitoring",
      "/en/douyin/account-analysis",
      "/en/douyin/viral-content-analysis",
      "/en/douyin/keywords",
      "/en/douyin/scraper",
      "/en/douyin/comments",
      "/en/douyin/downloader",
      "/en/douyin/transcript",
      "/en/douyin/image-text",
      "/en/douyin/leads",
      "/en/douyin/monitoring",
      "/en/features/feishu-integration",
      "/en/blog",
      "/en/welfare?entry=header_nav",
      "/en/updates",
      "/en/referral",
      "/en/download",
      "/en/pricing",
      "/en/welfare?entry=footer",
      "/en/privacy-policy",
      "/en/terms-of-service"
    ],
    "media": [],
    "source": "https://mediaclaw.app/en/updates/v0.2.0"
  },
  {
    "path": "/en/updates/v0.2.1",
    "status": 200,
    "locale": "en",
    "family": "updates",
    "title": "Bulk Image Export, Deeper Post Breakdowns, More Flexible Teams | MediaClaw",
    "h1": "Bulk Image Export, Deeper Post Breakdowns, More Flexible Teams",
    "summary": "Bulk Image Export, Deeper Post Breakdowns, More Flexible Teams | MediaClaw",
    "sections": [
      {
        "tag": "section",
        "heading": "Bulk Image Export, Deeper Post Breakdowns, More Flexible Teams",
        "id": null
      },
      {
        "tag": "section",
        "heading": "Bulk image export",
        "id": null
      },
      {
        "tag": "article",
        "heading": "Bulk image export",
        "id": null
      }
    ],
    "links": [
      "/en",
      "/en/xiaohongshu",
      "/en/douyin",
      "/en/xiaohongshu/keywords",
      "/en/xiaohongshu/viral-content-analysis",
      "/en/xiaohongshu/account-analysis",
      "/en/xiaohongshu/scraper",
      "/en/xiaohongshu/comments",
      "/en/xiaohongshu/downloader",
      "/en/xiaohongshu/image-text",
      "/en/xiaohongshu/transcript",
      "/en/xiaohongshu/leads",
      "/en/xiaohongshu/monitoring",
      "/en/douyin/account-analysis",
      "/en/douyin/viral-content-analysis",
      "/en/douyin/keywords",
      "/en/douyin/scraper",
      "/en/douyin/comments",
      "/en/douyin/downloader",
      "/en/douyin/transcript",
      "/en/douyin/image-text",
      "/en/douyin/leads",
      "/en/douyin/monitoring",
      "/en/features/feishu-integration",
      "/en/blog",
      "/en/welfare?entry=header_nav",
      "/en/updates",
      "/en/referral",
      "/en/download",
      "/en/pricing",
      "/en/welfare?entry=footer",
      "/en/privacy-policy",
      "/en/terms-of-service"
    ],
    "media": [],
    "source": "https://mediaclaw.app/en/updates/v0.2.1"
  },
  {
    "path": "/en/updates/v0.2.2",
    "status": 200,
    "locale": "en",
    "family": "updates",
    "title": "Batch Video Transcripts, Douyin Collection Capture, and Scenario Guides | MediaClaw",
    "h1": "Batch Video Transcripts, Douyin Collection Capture, and Scenario Guides",
    "summary": "Batch Video Transcripts, Douyin Collection Capture, and Scenario Guides | MediaClaw",
    "sections": [
      {
        "tag": "section",
        "heading": "Batch Video Transcripts, Douyin Collection Capture, and Scenario Guides",
        "id": null
      },
      {
        "tag": "section",
        "heading": "Batch video transcripts",
        "id": null
      },
      {
        "tag": "article",
        "heading": "Batch video transcripts",
        "id": null
      }
    ],
    "links": [
      "/en",
      "/en/xiaohongshu",
      "/en/douyin",
      "/en/xiaohongshu/keywords",
      "/en/xiaohongshu/viral-content-analysis",
      "/en/xiaohongshu/account-analysis",
      "/en/xiaohongshu/scraper",
      "/en/xiaohongshu/comments",
      "/en/xiaohongshu/downloader",
      "/en/xiaohongshu/image-text",
      "/en/xiaohongshu/transcript",
      "/en/xiaohongshu/leads",
      "/en/xiaohongshu/monitoring",
      "/en/douyin/account-analysis",
      "/en/douyin/viral-content-analysis",
      "/en/douyin/keywords",
      "/en/douyin/scraper",
      "/en/douyin/comments",
      "/en/douyin/downloader",
      "/en/douyin/transcript",
      "/en/douyin/image-text",
      "/en/douyin/leads",
      "/en/douyin/monitoring",
      "/en/features/feishu-integration",
      "/en/blog",
      "/en/welfare?entry=header_nav",
      "/en/updates",
      "/en/referral",
      "/en/download",
      "/en/pricing",
      "/en/welfare?entry=footer",
      "/en/privacy-policy",
      "/en/terms-of-service"
    ],
    "media": [],
    "source": "https://mediaclaw.app/en/updates/v0.2.2"
  },
  {
    "path": "/en/updates/v0.2.3",
    "status": 200,
    "locale": "en",
    "family": "updates",
    "title": "Creator Profiles and More Reliable Collection | MediaClaw",
    "h1": "Creator Profiles and More Reliable Collection",
    "summary": "Creator Profiles and More Reliable Collection | MediaClaw",
    "sections": [
      {
        "tag": "section",
        "heading": "Creator Profiles and More Reliable Collection",
        "id": null
      },
      {
        "tag": "section",
        "heading": "Creator Profiles",
        "id": null
      },
      {
        "tag": "article",
        "heading": "Creator Profiles",
        "id": null
      }
    ],
    "links": [
      "/en",
      "/en/xiaohongshu",
      "/en/douyin",
      "/en/xiaohongshu/keywords",
      "/en/xiaohongshu/viral-content-analysis",
      "/en/xiaohongshu/account-analysis",
      "/en/xiaohongshu/scraper",
      "/en/xiaohongshu/comments",
      "/en/xiaohongshu/downloader",
      "/en/xiaohongshu/image-text",
      "/en/xiaohongshu/transcript",
      "/en/xiaohongshu/leads",
      "/en/xiaohongshu/monitoring",
      "/en/douyin/account-analysis",
      "/en/douyin/viral-content-analysis",
      "/en/douyin/keywords",
      "/en/douyin/scraper",
      "/en/douyin/comments",
      "/en/douyin/downloader",
      "/en/douyin/transcript",
      "/en/douyin/image-text",
      "/en/douyin/leads",
      "/en/douyin/monitoring",
      "/en/features/feishu-integration",
      "/en/blog",
      "/en/welfare?entry=header_nav",
      "/en/updates",
      "/en/referral",
      "/en/download",
      "/en/pricing",
      "/en/welfare?entry=footer",
      "/en/privacy-policy",
      "/en/terms-of-service"
    ],
    "media": [],
    "source": "https://mediaclaw.app/en/updates/v0.2.3"
  },
  {
    "path": "/en/updates/v0.3.0",
    "status": 200,
    "locale": "en",
    "family": "updates",
    "title": "MediaClaw Agent Is Now Available | MediaClaw",
    "h1": "MediaClaw Agent Is Now Available",
    "summary": "MediaClaw Agent Is Now Available | MediaClaw",
    "sections": [
      {
        "tag": "section",
        "heading": "MediaClaw Agent Is Now Available",
        "id": null
      },
      {
        "tag": "section",
        "heading": "Local Agent control",
        "id": null
      },
      {
        "tag": "article",
        "heading": "Local Agent control",
        "id": null
      }
    ],
    "links": [
      "/en",
      "/en/xiaohongshu",
      "/en/douyin",
      "/en/xiaohongshu/keywords",
      "/en/xiaohongshu/viral-content-analysis",
      "/en/xiaohongshu/account-analysis",
      "/en/xiaohongshu/scraper",
      "/en/xiaohongshu/comments",
      "/en/xiaohongshu/downloader",
      "/en/xiaohongshu/image-text",
      "/en/xiaohongshu/transcript",
      "/en/xiaohongshu/leads",
      "/en/xiaohongshu/monitoring",
      "/en/douyin/account-analysis",
      "/en/douyin/viral-content-analysis",
      "/en/douyin/keywords",
      "/en/douyin/scraper",
      "/en/douyin/comments",
      "/en/douyin/downloader",
      "/en/douyin/transcript",
      "/en/douyin/image-text",
      "/en/douyin/leads",
      "/en/douyin/monitoring",
      "/en/features/feishu-integration",
      "/en/blog",
      "/en/welfare?entry=header_nav",
      "/en/updates",
      "/en/referral",
      "/en/download",
      "/en/pricing",
      "/en/welfare?entry=footer",
      "/en/privacy-policy",
      "/en/terms-of-service"
    ],
    "media": [],
    "source": "https://mediaclaw.app/en/updates/v0.3.0"
  }
]

export default validateRouteRecords(records, 34, 'UPDATES')
