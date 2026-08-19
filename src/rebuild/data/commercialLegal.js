import { validateRouteRecords } from '../contracts/routeSchema.js'

const records = [
  {
    "path": "/download",
    "status": 200,
    "locale": "zh",
    "family": "commercial",
    "title": "下载 MediaClaw - 小红书抖音数据采集插件",
    "h1": "下载安装 MediaClaw",
    "summary": "预览版下载与上手页面结构；本地重建未接通插件下载、结算、认证或配置操作。",
    "sections": [
      {
        "level": 1,
        "text": "下载安装 MediaClaw",
        "id": null
      },
      {
        "level": 2,
        "text": "下载并安装 MediaClaw",
        "id": null
      },
      {
        "level": 3,
        "text": "安装插件",
        "id": null
      },
      {
        "level": 3,
        "text": "Chrome 应用商店",
        "id": null
      },
      {
        "level": 3,
        "text": "Microsoft Edge 加载项商店",
        "id": null
      },
      {
        "level": 3,
        "text": "购买正式版激活码",
        "id": null
      },
      {
        "level": 3,
        "text": "跟随教程配置",
        "id": null
      }
    ],
    "links": [
      "/",
      "/download",
      "/pricing",
      "/pricing?source=onboarding&entry=download_page",
      "/pricing?source=onboarding&entry=free_version",
      "/xiaohongshu",
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
      "/douyin",
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
      "/welfare?entry=footer",
      "/updates",
      "/referral",
      "/privacy-policy",
      "/terms-of-service",
      {
        "text": "下载",
        "href": "https://mediaclaw.app/download",
        "rawHref": "/download",
        "internalPath": "/download"
      },
      {
        "text": "定价",
        "href": "https://mediaclaw.app/pricing",
        "rawHref": "/pricing",
        "internalPath": "/pricing"
      },
      {
        "text": "安装插件 当前步骤",
        "href": "https://mediaclaw.app/download#download-step-install",
        "rawHref": "#download-step-install",
        "internalPath": "/download"
      },
      {
        "text": "购买正式版激活码 后续步骤",
        "href": "https://mediaclaw.app/download#download-step-activate",
        "rawHref": "#download-step-activate",
        "internalPath": "/download"
      },
      {
        "text": "跟随教程配置 后续步骤",
        "href": "https://mediaclaw.app/download#download-step-tutorial",
        "rawHref": "#download-step-tutorial",
        "internalPath": "/download"
      },
      {
        "text": "购买正式版激活码",
        "href": "https://mediaclaw.app/pricing?source=onboarding&entry=download_page",
        "rawHref": "/pricing?source=onboarding&entry=download_page",
        "internalPath": "/pricing?source=onboarding&entry=download_page"
      },
      {
        "text": "免费版",
        "href": "https://mediaclaw.app/pricing?source=onboarding&entry=free_version",
        "rawHref": "/pricing?source=onboarding&entry=free_version",
        "internalPath": "/pricing?source=onboarding&entry=free_version"
      },
      {
        "text": "看教程",
        "href": "https://my.feishu.cn/wiki/ZIGqwGtF8i2Dkbk6S1HcZdZWnMd",
        "rawHref": "https://my.feishu.cn/wiki/ZIGqwGtF8i2Dkbk6S1HcZdZWnMd",
        "internalPath": null
      },
      {
        "text": "小红书无水印下载",
        "href": "https://mediaclaw.app/xiaohongshu/downloader",
        "rawHref": "/xiaohongshu/downloader",
        "internalPath": "/xiaohongshu/downloader"
      },
      {
        "text": "抖音无水印下载",
        "href": "https://mediaclaw.app/douyin/downloader",
        "rawHref": "/douyin/downloader",
        "internalPath": "/douyin/downloader"
      },
      {
        "text": "下载插件",
        "href": "https://mediaclaw.app/download",
        "rawHref": "/download",
        "internalPath": "/download"
      },
      {
        "text": "价格方案",
        "href": "https://mediaclaw.app/pricing",
        "rawHref": "/pricing",
        "internalPath": "/pricing"
      },
      {
        "text": "福利中心",
        "href": "https://mediaclaw.app/welfare?entry=footer",
        "rawHref": "/welfare?entry=footer",
        "internalPath": "/welfare?entry=footer"
      },
      {
        "text": "伙伴计划",
        "href": "https://mediaclaw.app/referral",
        "rawHref": "/referral",
        "internalPath": "/referral"
      }
    ],
    "media": [],
    "source": "https://mediaclaw.app/download"
  },
  {
    "path": "/en/download",
    "status": 200,
    "locale": "en",
    "family": "commercial",
    "title": "Download MediaClaw - Xiaohongshu & Douyin Scraper Plugin",
    "h1": "Download MediaClaw",
    "summary": "Preview-only download and onboarding page structure; the local rebuild does not connect extension download, checkout, authentication, or setup actions.",
    "sections": [
      {
        "level": 1,
        "text": "Download MediaClaw",
        "id": null
      },
      {
        "level": 2,
        "text": "Download and Install MediaClaw",
        "id": null
      },
      {
        "level": 3,
        "text": "Install extension",
        "id": null
      },
      {
        "level": 3,
        "text": "Chrome Web Store",
        "id": null
      },
      {
        "level": 3,
        "text": "Microsoft Edge Add-ons",
        "id": null
      },
      {
        "level": 3,
        "text": "Buy an activation code",
        "id": null
      },
      {
        "level": 3,
        "text": "Follow setup tutorial",
        "id": null
      }
    ],
    "links": [
      "/en",
      "/en/download",
      "/en/pricing",
      "/en/pricing?source=onboarding&entry=download_page",
      "/en/pricing?source=onboarding&entry=free_version",
      "/en/xiaohongshu",
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
      "/en/douyin",
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
      "/en/welfare?entry=footer",
      "/en/updates",
      "/en/referral",
      "/en/privacy-policy",
      "/en/terms-of-service",
      {
        "text": "Download",
        "href": "https://mediaclaw.app/en/download",
        "rawHref": "/en/download",
        "internalPath": "/en/download"
      },
      {
        "text": "Pricing",
        "href": "https://mediaclaw.app/en/pricing",
        "rawHref": "/en/pricing",
        "internalPath": "/en/pricing"
      },
      {
        "text": "Install extension Current step",
        "href": "https://mediaclaw.app/en/download#download-step-install",
        "rawHref": "#download-step-install",
        "internalPath": "/en/download"
      },
      {
        "text": "Buy an activation code Next step",
        "href": "https://mediaclaw.app/en/download#download-step-activate",
        "rawHref": "#download-step-activate",
        "internalPath": "/en/download"
      },
      {
        "text": "Follow setup tutorial Next step",
        "href": "https://mediaclaw.app/en/download#download-step-tutorial",
        "rawHref": "#download-step-tutorial",
        "internalPath": "/en/download"
      },
      {
        "text": "Buy activation code",
        "href": "https://mediaclaw.app/en/pricing?source=onboarding&entry=download_page",
        "rawHref": "/en/pricing?source=onboarding&entry=download_page",
        "internalPath": "/en/pricing?source=onboarding&entry=download_page"
      },
      {
        "text": "free version permanently",
        "href": "https://mediaclaw.app/en/pricing?source=onboarding&entry=free_version",
        "rawHref": "/en/pricing?source=onboarding&entry=free_version",
        "internalPath": "/en/pricing?source=onboarding&entry=free_version"
      },
      {
        "text": "View tutorial",
        "href": "https://my.feishu.cn/wiki/ZIGqwGtF8i2Dkbk6S1HcZdZWnMd",
        "rawHref": "https://my.feishu.cn/wiki/ZIGqwGtF8i2Dkbk6S1HcZdZWnMd",
        "internalPath": null
      },
      {
        "text": "Video & Image Downloader",
        "href": "https://mediaclaw.app/en/xiaohongshu/downloader",
        "rawHref": "/en/xiaohongshu/downloader",
        "internalPath": "/en/xiaohongshu/downloader"
      },
      {
        "text": "Video & Image Downloader",
        "href": "https://mediaclaw.app/en/douyin/downloader",
        "rawHref": "/en/douyin/downloader",
        "internalPath": "/en/douyin/downloader"
      },
      {
        "text": "Download Extension",
        "href": "https://mediaclaw.app/en/download",
        "rawHref": "/en/download",
        "internalPath": "/en/download"
      },
      {
        "text": "Pricing",
        "href": "https://mediaclaw.app/en/pricing",
        "rawHref": "/en/pricing",
        "internalPath": "/en/pricing"
      },
      {
        "text": "Rewards",
        "href": "https://mediaclaw.app/en/welfare?entry=footer",
        "rawHref": "/en/welfare?entry=footer",
        "internalPath": "/en/welfare?entry=footer"
      },
      {
        "text": "Partner Program",
        "href": "https://mediaclaw.app/en/referral",
        "rawHref": "/en/referral",
        "internalPath": "/en/referral"
      }
    ],
    "media": [],
    "source": "https://mediaclaw.app/en/download"
  },
  {
    "path": "/pricing",
    "status": 200,
    "locale": "zh",
    "family": "commercial",
    "title": "MediaClaw 价格方案 — 一次买断不自动续费，小红书抖音采集与 AI 运营提效",
    "h1": "简单透明的价格方案",
    "summary": "预览版价格方案页面结构；本地重建未接通结算或认证操作。",
    "sections": [
      {
        "level": 1,
        "text": "简单透明的价格方案",
        "id": null
      },
      {
        "level": 3,
        "text": "免费版",
        "id": null
      },
      {
        "level": 3,
        "text": "个人版",
        "id": null
      },
      {
        "level": 3,
        "text": "团队版",
        "id": null
      },
      {
        "level": 2,
        "text": "功能对比",
        "id": null
      },
      {
        "level": 2,
        "text": "常见问题",
        "id": null
      },
      {
        "level": 3,
        "text": "会自动扣费吗？",
        "id": null
      },
      {
        "level": 3,
        "text": "MediaClaw 和其他采集插件有什么区别？",
        "id": null
      },
      {
        "level": 3,
        "text": "积分是什么？会过期吗？",
        "id": null
      },
      {
        "level": 3,
        "text": "积分不够用怎么办？",
        "id": null
      },
      {
        "level": 3,
        "text": "免费版能用多久？",
        "id": null
      },
      {
        "level": 2,
        "text": "先免费装上，跑一次再决定",
        "id": null
      }
    ],
    "links": [
      "/",
      "/download",
      "/pricing",
      "/xiaohongshu",
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
      "/douyin",
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
      "/welfare?entry=footer",
      "/updates",
      "/referral",
      "/privacy-policy",
      "/terms-of-service",
      {
        "text": "下载",
        "href": "https://mediaclaw.app/download",
        "rawHref": "/download",
        "internalPath": "/download"
      },
      {
        "text": "定价",
        "href": "https://mediaclaw.app/pricing",
        "rawHref": "/pricing",
        "internalPath": "/pricing"
      },
      {
        "text": "免费安装插件",
        "href": "https://mediaclaw.app/download",
        "rawHref": "/download",
        "internalPath": "/download"
      },
      {
        "text": "我要使用",
        "href": "https://mediaclaw.app/download",
        "rawHref": "/download",
        "internalPath": "/download"
      },
      {
        "text": "小红书无水印下载",
        "href": "https://mediaclaw.app/xiaohongshu/downloader",
        "rawHref": "/xiaohongshu/downloader",
        "internalPath": "/xiaohongshu/downloader"
      },
      {
        "text": "抖音无水印下载",
        "href": "https://mediaclaw.app/douyin/downloader",
        "rawHref": "/douyin/downloader",
        "internalPath": "/douyin/downloader"
      },
      {
        "text": "下载插件",
        "href": "https://mediaclaw.app/download",
        "rawHref": "/download",
        "internalPath": "/download"
      },
      {
        "text": "价格方案",
        "href": "https://mediaclaw.app/pricing",
        "rawHref": "/pricing",
        "internalPath": "/pricing"
      },
      {
        "text": "福利中心",
        "href": "https://mediaclaw.app/welfare?entry=footer",
        "rawHref": "/welfare?entry=footer",
        "internalPath": "/welfare?entry=footer"
      },
      {
        "text": "伙伴计划",
        "href": "https://mediaclaw.app/referral",
        "rawHref": "/referral",
        "internalPath": "/referral"
      }
    ],
    "media": [],
    "source": "https://mediaclaw.app/pricing"
  },
  {
    "path": "/en/pricing",
    "status": 200,
    "locale": "en",
    "family": "commercial",
    "title": "MediaClaw Pricing - One-Time Purchase, No Auto-Renewal",
    "h1": "Simple, Transparent Pricing",
    "summary": "Preview-only pricing page structure; the local rebuild does not connect checkout or authentication.",
    "sections": [
      {
        "level": 1,
        "text": "Simple, Transparent Pricing",
        "id": null
      },
      {
        "level": 3,
        "text": "Free",
        "id": null
      },
      {
        "level": 3,
        "text": "Personal",
        "id": null
      },
      {
        "level": 3,
        "text": "Team",
        "id": null
      },
      {
        "level": 2,
        "text": "Compare All Features",
        "id": null
      },
      {
        "level": 2,
        "text": "Frequently Asked Questions",
        "id": null
      },
      {
        "level": 3,
        "text": "Will I be charged automatically?",
        "id": null
      },
      {
        "level": 3,
        "text": "How is MediaClaw different from other scraping extensions?",
        "id": null
      },
      {
        "level": 3,
        "text": "What are credits? Do they expire?",
        "id": null
      },
      {
        "level": 3,
        "text": "What if I run out of credits?",
        "id": null
      },
      {
        "level": 3,
        "text": "How long does the Free plan last?",
        "id": null
      },
      {
        "level": 2,
        "text": "Install It Free, Run It Once, Then Decide",
        "id": null
      }
    ],
    "links": [
      "/en",
      "/en/download",
      "/en/pricing",
      "/en/xiaohongshu",
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
      "/en/douyin",
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
      "/en/welfare?entry=footer",
      "/en/updates",
      "/en/referral",
      "/en/privacy-policy",
      "/en/terms-of-service",
      {
        "text": "Download",
        "href": "https://mediaclaw.app/en/download",
        "rawHref": "/en/download",
        "internalPath": "/en/download"
      },
      {
        "text": "Pricing",
        "href": "https://mediaclaw.app/en/pricing",
        "rawHref": "/en/pricing",
        "internalPath": "/en/pricing"
      },
      {
        "text": "Install Free Extension",
        "href": "https://mediaclaw.app/en/download",
        "rawHref": "/en/download",
        "internalPath": "/en/download"
      },
      {
        "text": "Start Using",
        "href": "https://mediaclaw.app/en/download",
        "rawHref": "/en/download",
        "internalPath": "/en/download"
      },
      {
        "text": "Video & Image Downloader",
        "href": "https://mediaclaw.app/en/xiaohongshu/downloader",
        "rawHref": "/en/xiaohongshu/downloader",
        "internalPath": "/en/xiaohongshu/downloader"
      },
      {
        "text": "Video & Image Downloader",
        "href": "https://mediaclaw.app/en/douyin/downloader",
        "rawHref": "/en/douyin/downloader",
        "internalPath": "/en/douyin/downloader"
      },
      {
        "text": "Download Extension",
        "href": "https://mediaclaw.app/en/download",
        "rawHref": "/en/download",
        "internalPath": "/en/download"
      },
      {
        "text": "Pricing",
        "href": "https://mediaclaw.app/en/pricing",
        "rawHref": "/en/pricing",
        "internalPath": "/en/pricing"
      },
      {
        "text": "Rewards",
        "href": "https://mediaclaw.app/en/welfare?entry=footer",
        "rawHref": "/en/welfare?entry=footer",
        "internalPath": "/en/welfare?entry=footer"
      },
      {
        "text": "Partner Program",
        "href": "https://mediaclaw.app/en/referral",
        "rawHref": "/en/referral",
        "internalPath": "/en/referral"
      }
    ],
    "media": [],
    "source": "https://mediaclaw.app/en/pricing"
  },
  {
    "path": "/features/feishu-integration",
    "status": 200,
    "locale": "zh",
    "family": "commercial",
    "title": "飞书多维表格集成 - 社媒数据自动同步 | MediaClaw",
    "h1": "MediaClaw × 飞书多维表格：你的团队数据中台",
    "summary": "预览版飞书集成页面结构；本地重建未接通认证或飞书同步操作。",
    "sections": [
      {
        "level": 1,
        "text": "MediaClaw × 飞书多维表格：你的团队数据中台",
        "id": null
      },
      {
        "level": 2,
        "text": "飞书协作能力一屏看懂",
        "id": null
      },
      {
        "level": 3,
        "text": "采集结果一键同步飞书",
        "id": null
      },
      {
        "level": 3,
        "text": "多表分层适配不同业务",
        "id": null
      },
      {
        "level": 3,
        "text": "监控日报自动推送飞书",
        "id": null
      },
      {
        "level": 2,
        "text": "哪些团队在用飞书集成？",
        "id": null
      },
      {
        "level": 2,
        "text": "常见问题",
        "id": null
      },
      {
        "level": 3,
        "text": "飞书同步是自动还是手动触发？",
        "id": null
      },
      {
        "level": 3,
        "text": "监控日报如何推送到飞书？",
        "id": null
      },
      {
        "level": 3,
        "text": "团队成员可以共用同一份飞书表吗？",
        "id": null
      },
      {
        "level": 3,
        "text": "没有技术背景也能完成接入吗？",
        "id": null
      },
      {
        "level": 2,
        "text": "继续探索相关能力",
        "id": null
      },
      {
        "level": 3,
        "text": "小红书笔记采集",
        "id": null
      },
      {
        "level": 3,
        "text": "小红书评论区截流",
        "id": null
      },
      {
        "level": 3,
        "text": "小红书关键词洞察",
        "id": null
      },
      {
        "level": 3,
        "text": "小红书对标账号监控",
        "id": null
      },
      {
        "level": 3,
        "text": "小红书去水印下载",
        "id": null
      },
      {
        "level": 3,
        "text": "抖音视频采集",
        "id": null
      },
      {
        "level": 3,
        "text": "抖音评论区截流",
        "id": null
      },
      {
        "level": 3,
        "text": "抖音关键词洞察",
        "id": null
      },
      {
        "level": 3,
        "text": "抖音对标账号监控",
        "id": null
      },
      {
        "level": 2,
        "text": "把采集数据变成团队可执行情报",
        "id": null
      }
    ],
    "links": [
      "/",
      "/download",
      "/pricing",
      "/xiaohongshu/scraper",
      "/xiaohongshu/leads",
      "/xiaohongshu/keywords",
      "/xiaohongshu/monitoring",
      "/xiaohongshu/downloader",
      "/douyin/scraper",
      "/douyin/leads",
      "/douyin/keywords",
      "/douyin/monitoring",
      "/xiaohongshu",
      "/xiaohongshu/viral-content-analysis",
      "/xiaohongshu/account-analysis",
      "/xiaohongshu/comments",
      "/xiaohongshu/image-text",
      "/xiaohongshu/transcript",
      "/douyin",
      "/douyin/account-analysis",
      "/douyin/viral-content-analysis",
      "/douyin/comments",
      "/douyin/downloader",
      "/douyin/transcript",
      "/douyin/image-text",
      "/features/feishu-integration",
      "/blog",
      "/welfare?entry=footer",
      "/updates",
      "/referral",
      "/privacy-policy",
      "/terms-of-service",
      {
        "text": "下载",
        "href": "https://mediaclaw.app/download",
        "rawHref": "/download",
        "internalPath": "/download"
      },
      {
        "text": "定价",
        "href": "https://mediaclaw.app/pricing",
        "rawHref": "/pricing",
        "internalPath": "/pricing"
      },
      {
        "text": "我要使用",
        "href": "https://mediaclaw.app/download",
        "rawHref": "/download",
        "internalPath": "/download"
      },
      {
        "text": "免费下载使用",
        "href": "https://mediaclaw.app/download",
        "rawHref": "/download",
        "internalPath": "/download"
      },
      {
        "text": "免费下载使用",
        "href": "https://mediaclaw.app/download",
        "rawHref": "/download",
        "internalPath": "/download"
      },
      {
        "text": "免费下载使用",
        "href": "https://mediaclaw.app/download",
        "rawHref": "/download",
        "internalPath": "/download"
      },
      {
        "text": "小红书去水印下载 下载素材资产用于视觉参考库沉淀。",
        "href": "https://mediaclaw.app/xiaohongshu/downloader",
        "rawHref": "/xiaohongshu/downloader",
        "internalPath": "/xiaohongshu/downloader"
      },
      {
        "text": "免费安装插件",
        "href": "https://mediaclaw.app/download",
        "rawHref": "/download",
        "internalPath": "/download"
      },
      {
        "text": "小红书无水印下载",
        "href": "https://mediaclaw.app/xiaohongshu/downloader",
        "rawHref": "/xiaohongshu/downloader",
        "internalPath": "/xiaohongshu/downloader"
      },
      {
        "text": "抖音无水印下载",
        "href": "https://mediaclaw.app/douyin/downloader",
        "rawHref": "/douyin/downloader",
        "internalPath": "/douyin/downloader"
      },
      {
        "text": "下载插件",
        "href": "https://mediaclaw.app/download",
        "rawHref": "/download",
        "internalPath": "/download"
      },
      {
        "text": "价格方案",
        "href": "https://mediaclaw.app/pricing",
        "rawHref": "/pricing",
        "internalPath": "/pricing"
      },
      {
        "text": "福利中心",
        "href": "https://mediaclaw.app/welfare?entry=footer",
        "rawHref": "/welfare?entry=footer",
        "internalPath": "/welfare?entry=footer"
      },
      {
        "text": "伙伴计划",
        "href": "https://mediaclaw.app/referral",
        "rawHref": "/referral",
        "internalPath": "/referral"
      }
    ],
    "media": [],
    "source": "https://mediaclaw.app/features/feishu-integration"
  },
  {
    "path": "/en/features/feishu-integration",
    "status": 200,
    "locale": "en",
    "family": "commercial",
    "title": "Lark Base Integration - Sync Social Data | MediaClaw",
    "h1": "MediaClaw × Lark Base",
    "summary": "Preview-only Feishu/Lark integration page structure; the local rebuild does not connect authentication or Feishu/Lark synchronization.",
    "sections": [
      {
        "level": 1,
        "text": "MediaClaw × Lark Base",
        "id": null
      },
      {
        "level": 2,
        "text": "Lark Base Capabilities at a Glance",
        "id": null
      },
      {
        "level": 3,
        "text": "One-Click Sync to Lark Base",
        "id": null
      },
      {
        "level": 3,
        "text": "Multi-Table Schema for Every Workflow",
        "id": null
      },
      {
        "level": 3,
        "text": "Monitoring Reports Auto-Pushed to Lark",
        "id": null
      },
      {
        "level": 2,
        "text": "Who Uses Lark Base Integration?",
        "id": null
      },
      {
        "level": 2,
        "text": "Frequently Asked Questions",
        "id": null
      },
      {
        "level": 3,
        "text": "Is the sync automatic or manually triggered?",
        "id": null
      },
      {
        "level": 3,
        "text": "How do monitoring reports reach Lark?",
        "id": null
      },
      {
        "level": 3,
        "text": "Can multiple team members sync to the same Lark Base?",
        "id": null
      },
      {
        "level": 3,
        "text": "Do I need technical skills to set up the integration?",
        "id": null
      },
      {
        "level": 2,
        "text": "Explore Related Tools",
        "id": null
      },
      {
        "level": 3,
        "text": "Xiaohongshu Post Scraper",
        "id": null
      },
      {
        "level": 3,
        "text": "Xiaohongshu Lead Scraper",
        "id": null
      },
      {
        "level": 3,
        "text": "Xiaohongshu Keyword Research",
        "id": null
      },
      {
        "level": 3,
        "text": "Xiaohongshu Competitor Monitoring",
        "id": null
      },
      {
        "level": 3,
        "text": "Xiaohongshu Downloader",
        "id": null
      },
      {
        "level": 3,
        "text": "Douyin Video Scraper",
        "id": null
      },
      {
        "level": 3,
        "text": "Douyin Lead Scraper",
        "id": null
      },
      {
        "level": 3,
        "text": "Douyin Keyword Research",
        "id": null
      },
      {
        "level": 3,
        "text": "Douyin Competitor Monitoring",
        "id": null
      },
      {
        "level": 2,
        "text": "Turn Scraped Data into Team Intelligence",
        "id": null
      }
    ],
    "links": [
      "/en",
      "/en/download",
      "/en/pricing",
      "/en/xiaohongshu/scraper",
      "/en/xiaohongshu/leads",
      "/en/xiaohongshu/keywords",
      "/en/xiaohongshu/monitoring",
      "/en/xiaohongshu/downloader",
      "/en/douyin/scraper",
      "/en/douyin/leads",
      "/en/douyin/keywords",
      "/en/douyin/monitoring",
      "/en/xiaohongshu",
      "/en/xiaohongshu/viral-content-analysis",
      "/en/xiaohongshu/account-analysis",
      "/en/xiaohongshu/comments",
      "/en/xiaohongshu/image-text",
      "/en/xiaohongshu/transcript",
      "/en/douyin",
      "/en/douyin/account-analysis",
      "/en/douyin/viral-content-analysis",
      "/en/douyin/comments",
      "/en/douyin/downloader",
      "/en/douyin/transcript",
      "/en/douyin/image-text",
      "/en/features/feishu-integration",
      "/en/blog",
      "/en/welfare?entry=footer",
      "/en/updates",
      "/en/referral",
      "/en/privacy-policy",
      "/en/terms-of-service",
      {
        "text": "Download",
        "href": "https://mediaclaw.app/en/download",
        "rawHref": "/en/download",
        "internalPath": "/en/download"
      },
      {
        "text": "Pricing",
        "href": "https://mediaclaw.app/en/pricing",
        "rawHref": "/en/pricing",
        "internalPath": "/en/pricing"
      },
      {
        "text": "Get Started",
        "href": "https://mediaclaw.app/en/download",
        "rawHref": "/en/download",
        "internalPath": "/en/download"
      },
      {
        "text": "Free download",
        "href": "https://mediaclaw.app/en/download",
        "rawHref": "/en/download",
        "internalPath": "/en/download"
      },
      {
        "text": "Free download",
        "href": "https://mediaclaw.app/en/download",
        "rawHref": "/en/download",
        "internalPath": "/en/download"
      },
      {
        "text": "Free download",
        "href": "https://mediaclaw.app/en/download",
        "rawHref": "/en/download",
        "internalPath": "/en/download"
      },
      {
        "text": "Xiaohongshu Downloader Download media assets for visual reference libraries.",
        "href": "https://mediaclaw.app/en/xiaohongshu/downloader",
        "rawHref": "/en/xiaohongshu/downloader",
        "internalPath": "/en/xiaohongshu/downloader"
      },
      {
        "text": "Douyin Competitor Monitoring Subscribe to competitor updates with Lark alert delivery.",
        "href": "https://mediaclaw.app/en/douyin/monitoring",
        "rawHref": "/en/douyin/monitoring",
        "internalPath": "/en/douyin/monitoring"
      },
      {
        "text": "Get Started Free",
        "href": "https://mediaclaw.app/en/download",
        "rawHref": "/en/download",
        "internalPath": "/en/download"
      },
      {
        "text": "Video & Image Downloader",
        "href": "https://mediaclaw.app/en/xiaohongshu/downloader",
        "rawHref": "/en/xiaohongshu/downloader",
        "internalPath": "/en/xiaohongshu/downloader"
      },
      {
        "text": "Video & Image Downloader",
        "href": "https://mediaclaw.app/en/douyin/downloader",
        "rawHref": "/en/douyin/downloader",
        "internalPath": "/en/douyin/downloader"
      },
      {
        "text": "Download Extension",
        "href": "https://mediaclaw.app/en/download",
        "rawHref": "/en/download",
        "internalPath": "/en/download"
      },
      {
        "text": "Pricing",
        "href": "https://mediaclaw.app/en/pricing",
        "rawHref": "/en/pricing",
        "internalPath": "/en/pricing"
      },
      {
        "text": "Rewards",
        "href": "https://mediaclaw.app/en/welfare?entry=footer",
        "rawHref": "/en/welfare?entry=footer",
        "internalPath": "/en/welfare?entry=footer"
      },
      {
        "text": "Partner Program",
        "href": "https://mediaclaw.app/en/referral",
        "rawHref": "/en/referral",
        "internalPath": "/en/referral"
      }
    ],
    "media": [],
    "source": "https://mediaclaw.app/en/features/feishu-integration"
  },
  {
    "path": "/welfare",
    "status": 200,
    "locale": "zh",
    "family": "commercial",
    "title": "全能卡 - MediaClaw 福利中心",
    "h1": "9 元全能卡",
    "summary": "预览版福利页面结构；本地重建未接通福利领取或相关操作。",
    "sections": [
      {
        "level": 1,
        "text": "9 元全能卡",
        "id": null
      },
      {
        "level": 2,
        "text": "从采集下载，到分析创作，再到持续增长",
        "id": null
      },
      {
        "level": 3,
        "text": "无限量采集/下载",
        "id": null
      },
      {
        "level": 3,
        "text": "采集只是第一步，把数据变成选题和成稿",
        "id": null
      },
      {
        "level": 3,
        "text": "不用每天刷账号，也能及时发现爆款和线索",
        "id": null
      },
      {
        "level": 2,
        "text": "全能卡之外，还能再多拿一点",
        "id": null
      },
      {
        "level": 3,
        "text": "渠道问卷",
        "id": null
      },
      {
        "level": 3,
        "text": "使用体验反馈",
        "id": null
      },
      {
        "level": 3,
        "text": "佣金推荐",
        "id": null
      }
    ],
    "links": [
      "/",
      "/download",
      "/pricing",
      "/referral",
      "/xiaohongshu",
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
      "/douyin",
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
      "/welfare?entry=footer",
      "/updates",
      "/privacy-policy",
      "/terms-of-service",
      {
        "text": "下载",
        "href": "https://mediaclaw.app/download",
        "rawHref": "/download",
        "internalPath": "/download"
      },
      {
        "text": "定价",
        "href": "https://mediaclaw.app/pricing",
        "rawHref": "/pricing",
        "internalPath": "/pricing"
      },
      {
        "text": "了解伙伴计划",
        "href": "https://mediaclaw.app/referral",
        "rawHref": "/referral",
        "internalPath": "/referral"
      },
      {
        "text": "小红书无水印下载",
        "href": "https://mediaclaw.app/xiaohongshu/downloader",
        "rawHref": "/xiaohongshu/downloader",
        "internalPath": "/xiaohongshu/downloader"
      },
      {
        "text": "抖音无水印下载",
        "href": "https://mediaclaw.app/douyin/downloader",
        "rawHref": "/douyin/downloader",
        "internalPath": "/douyin/downloader"
      },
      {
        "text": "下载插件",
        "href": "https://mediaclaw.app/download",
        "rawHref": "/download",
        "internalPath": "/download"
      },
      {
        "text": "价格方案",
        "href": "https://mediaclaw.app/pricing",
        "rawHref": "/pricing",
        "internalPath": "/pricing"
      },
      {
        "text": "福利中心",
        "href": "https://mediaclaw.app/welfare?entry=footer",
        "rawHref": "/welfare?entry=footer",
        "internalPath": "/welfare?entry=footer"
      },
      {
        "text": "伙伴计划",
        "href": "https://mediaclaw.app/referral",
        "rawHref": "/referral",
        "internalPath": "/referral"
      }
    ],
    "media": [],
    "source": "https://mediaclaw.app/welfare"
  },
  {
    "path": "/en/welfare",
    "status": 200,
    "locale": "en",
    "family": "commercial",
    "title": "全能卡 - MediaClaw 福利中心",
    "h1": "9 元全能卡",
    "summary": "Preview-only welfare page structure; the local rebuild does not connect redemption or related actions.",
    "sections": [
      {
        "level": 1,
        "text": "9 元全能卡",
        "id": null
      },
      {
        "level": 2,
        "text": "从采集下载，到分析创作，再到持续增长",
        "id": null
      },
      {
        "level": 3,
        "text": "无限量采集/下载",
        "id": null
      },
      {
        "level": 3,
        "text": "采集只是第一步，把数据变成选题和成稿",
        "id": null
      },
      {
        "level": 3,
        "text": "不用每天刷账号，也能及时发现爆款和线索",
        "id": null
      },
      {
        "level": 2,
        "text": "全能卡之外，还能再多拿一点",
        "id": null
      },
      {
        "level": 3,
        "text": "渠道问卷",
        "id": null
      },
      {
        "level": 3,
        "text": "使用体验反馈",
        "id": null
      },
      {
        "level": 3,
        "text": "佣金推荐",
        "id": null
      }
    ],
    "links": [
      "/en",
      "/en/download",
      "/en/pricing",
      "/en/referral",
      "/en/xiaohongshu",
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
      "/en/douyin",
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
      "/en/welfare?entry=footer",
      "/en/updates",
      "/en/privacy-policy",
      "/en/terms-of-service",
      {
        "text": "Download",
        "href": "https://mediaclaw.app/en/download",
        "rawHref": "/en/download",
        "internalPath": "/en/download"
      },
      {
        "text": "Pricing",
        "href": "https://mediaclaw.app/en/pricing",
        "rawHref": "/en/pricing",
        "internalPath": "/en/pricing"
      },
      {
        "text": "了解伙伴计划",
        "href": "https://mediaclaw.app/en/referral",
        "rawHref": "/en/referral",
        "internalPath": "/en/referral"
      },
      {
        "text": "Video & Image Downloader",
        "href": "https://mediaclaw.app/en/xiaohongshu/downloader",
        "rawHref": "/en/xiaohongshu/downloader",
        "internalPath": "/en/xiaohongshu/downloader"
      },
      {
        "text": "Video & Image Downloader",
        "href": "https://mediaclaw.app/en/douyin/downloader",
        "rawHref": "/en/douyin/downloader",
        "internalPath": "/en/douyin/downloader"
      },
      {
        "text": "Download Extension",
        "href": "https://mediaclaw.app/en/download",
        "rawHref": "/en/download",
        "internalPath": "/en/download"
      },
      {
        "text": "Pricing",
        "href": "https://mediaclaw.app/en/pricing",
        "rawHref": "/en/pricing",
        "internalPath": "/en/pricing"
      },
      {
        "text": "Rewards",
        "href": "https://mediaclaw.app/en/welfare?entry=footer",
        "rawHref": "/en/welfare?entry=footer",
        "internalPath": "/en/welfare?entry=footer"
      },
      {
        "text": "Partner Program",
        "href": "https://mediaclaw.app/en/referral",
        "rawHref": "/en/referral",
        "internalPath": "/en/referral"
      }
    ],
    "media": [],
    "source": "https://mediaclaw.app/en/welfare"
  },
  {
    "path": "/referral",
    "status": 200,
    "locale": "zh",
    "family": "commercial",
    "title": "加入 MediaClaw 伙伴计划 — 赚取 20% 推广返佣",
    "h1": "加入 MediaClaw 伙伴计划",
    "summary": "预览版伙伴计划页面结构；本地重建未接通认证、推广加入或返佣操作。",
    "sections": [
      {
        "level": 1,
        "text": "加入 MediaClaw 伙伴计划",
        "id": null
      },
      {
        "level": 2,
        "text": "邀请机制说明",
        "id": null
      },
      {
        "level": 3,
        "text": "1. 获取专属链接",
        "id": null
      },
      {
        "level": 3,
        "text": "2. 社交媒体推广",
        "id": null
      },
      {
        "level": 3,
        "text": "3. 坐享现金分成",
        "id": null
      },
      {
        "level": 2,
        "text": "准备好开始了吗？",
        "id": null
      }
    ],
    "links": [
      "/",
      "/download",
      "/pricing",
      "/settings/referral",
      "/xiaohongshu",
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
      "/douyin",
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
      "/welfare?entry=footer",
      "/updates",
      "/referral",
      "/privacy-policy",
      "/terms-of-service",
      {
        "text": "下载",
        "href": "https://mediaclaw.app/download",
        "rawHref": "/download",
        "internalPath": "/download"
      },
      {
        "text": "定价",
        "href": "https://mediaclaw.app/pricing",
        "rawHref": "/pricing",
        "internalPath": "/pricing"
      },
      {
        "text": "立即参与并分享",
        "href": "https://mediaclaw.app/settings/referral",
        "rawHref": "/settings/referral",
        "internalPath": "/settings/referral"
      },
      {
        "text": "我要参与",
        "href": "https://mediaclaw.app/settings/referral",
        "rawHref": "/settings/referral",
        "internalPath": "/settings/referral"
      },
      {
        "text": "小红书无水印下载",
        "href": "https://mediaclaw.app/xiaohongshu/downloader",
        "rawHref": "/xiaohongshu/downloader",
        "internalPath": "/xiaohongshu/downloader"
      },
      {
        "text": "抖音无水印下载",
        "href": "https://mediaclaw.app/douyin/downloader",
        "rawHref": "/douyin/downloader",
        "internalPath": "/douyin/downloader"
      },
      {
        "text": "下载插件",
        "href": "https://mediaclaw.app/download",
        "rawHref": "/download",
        "internalPath": "/download"
      },
      {
        "text": "价格方案",
        "href": "https://mediaclaw.app/pricing",
        "rawHref": "/pricing",
        "internalPath": "/pricing"
      },
      {
        "text": "福利中心",
        "href": "https://mediaclaw.app/welfare?entry=footer",
        "rawHref": "/welfare?entry=footer",
        "internalPath": "/welfare?entry=footer"
      },
      {
        "text": "伙伴计划",
        "href": "https://mediaclaw.app/referral",
        "rawHref": "/referral",
        "internalPath": "/referral"
      }
    ],
    "media": [],
    "source": "https://mediaclaw.app/referral"
  },
  {
    "path": "/en/referral",
    "status": 200,
    "locale": "en",
    "family": "commercial",
    "title": "Join MediaClaw Partner Program — Earn 20% Commission",
    "h1": "Join MediaClaw Partner Program",
    "summary": "Preview-only partner-program page structure; the local rebuild does not connect authentication, referral enrollment, or commission actions.",
    "sections": [
      {
        "level": 1,
        "text": "Join MediaClaw Partner Program",
        "id": null
      },
      {
        "level": 2,
        "text": "How it Works",
        "id": null
      },
      {
        "level": 3,
        "text": "1. Get Referral Link",
        "id": null
      },
      {
        "level": 3,
        "text": "2. Social Media Sharing",
        "id": null
      },
      {
        "level": 3,
        "text": "3. Get Cash Rewards",
        "id": null
      },
      {
        "level": 2,
        "text": "Ready to Start Promoting?",
        "id": null
      }
    ],
    "links": [
      "/en",
      "/en/download",
      "/en/pricing",
      "/en/settings/referral",
      "/en/xiaohongshu",
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
      "/en/douyin",
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
      "/en/welfare?entry=footer",
      "/en/updates",
      "/en/referral",
      "/en/privacy-policy",
      "/en/terms-of-service",
      {
        "text": "Download",
        "href": "https://mediaclaw.app/en/download",
        "rawHref": "/en/download",
        "internalPath": "/en/download"
      },
      {
        "text": "Pricing",
        "href": "https://mediaclaw.app/en/pricing",
        "rawHref": "/en/pricing",
        "internalPath": "/en/pricing"
      },
      {
        "text": "Join and Share",
        "href": "https://mediaclaw.app/en/settings/referral",
        "rawHref": "/en/settings/referral",
        "internalPath": "/en/settings/referral"
      },
      {
        "text": "Join Now",
        "href": "https://mediaclaw.app/en/settings/referral",
        "rawHref": "/en/settings/referral",
        "internalPath": "/en/settings/referral"
      },
      {
        "text": "Video & Image Downloader",
        "href": "https://mediaclaw.app/en/xiaohongshu/downloader",
        "rawHref": "/en/xiaohongshu/downloader",
        "internalPath": "/en/xiaohongshu/downloader"
      },
      {
        "text": "Video & Image Downloader",
        "href": "https://mediaclaw.app/en/douyin/downloader",
        "rawHref": "/en/douyin/downloader",
        "internalPath": "/en/douyin/downloader"
      },
      {
        "text": "Download Extension",
        "href": "https://mediaclaw.app/en/download",
        "rawHref": "/en/download",
        "internalPath": "/en/download"
      },
      {
        "text": "Pricing",
        "href": "https://mediaclaw.app/en/pricing",
        "rawHref": "/en/pricing",
        "internalPath": "/en/pricing"
      },
      {
        "text": "Rewards",
        "href": "https://mediaclaw.app/en/welfare?entry=footer",
        "rawHref": "/en/welfare?entry=footer",
        "internalPath": "/en/welfare?entry=footer"
      },
      {
        "text": "Partner Program",
        "href": "https://mediaclaw.app/en/referral",
        "rawHref": "/en/referral",
        "internalPath": "/en/referral"
      }
    ],
    "media": [],
    "source": "https://mediaclaw.app/en/referral"
  },
  {
    "path": "/privacy-policy",
    "status": 200,
    "locale": "zh",
    "family": "legal",
    "title": "隐私政策",
    "h1": "隐私政策",
    "summary": "预览版隐私政策页面结构；未补充法律事实或日期。",
    "sections": [
      {
        "level": 1,
        "text": "隐私政策",
        "id": null
      },
      {
        "level": 2,
        "text": "一、我们收集的信息",
        "id": "一我们收集的信息"
      },
      {
        "level": 3,
        "text": "1.1 账号、激活与授权信息",
        "id": "11-账号激活与授权信息"
      },
      {
        "level": 3,
        "text": "1.2 飞书目标配置（同步时发送）",
        "id": "12-飞书目标配置同步时发送"
      },
      {
        "level": 3,
        "text": "1.3 采集数据（浏览器本地存储）",
        "id": "13-采集数据浏览器本地存储"
      },
      {
        "level": 3,
        "text": "1.4 同步历史与运行状态（浏览器本地存储）",
        "id": "14-同步历史与运行状态浏览器本地存储"
      },
      {
        "level": 3,
        "text": "1.5 下载与导出行为",
        "id": "15-下载与导出行为"
      },
      {
        "level": 3,
        "text": "1.6 网站统计与来源归因",
        "id": "16-网站统计与来源归因"
      },
      {
        "level": 3,
        "text": "1.7 我们不收集的信息",
        "id": "17-我们不收集的信息"
      },
      {
        "level": 2,
        "text": "二、我们如何使用您的信息",
        "id": "二我们如何使用您的信息"
      },
      {
        "level": 2,
        "text": "三、信息的存储与安全",
        "id": "三信息的存储与安全"
      },
      {
        "level": 3,
        "text": "3.1 本地存储（浏览器侧）",
        "id": "31-本地存储浏览器侧"
      },
      {
        "level": 3,
        "text": "3.2 服务端存储",
        "id": "32-服务端存储"
      },
      {
        "level": 3,
        "text": "3.3 安全措施",
        "id": "33-安全措施"
      },
      {
        "level": 2,
        "text": "四、信息共享与第三方披露",
        "id": "四信息共享与第三方披露"
      },
      {
        "level": 2,
        "text": "五、Chrome 权限使用说明",
        "id": "五chrome-权限使用说明"
      },
      {
        "level": 2,
        "text": "六、您的权利",
        "id": "六您的权利"
      },
      {
        "level": 2,
        "text": "七、未成年人保护",
        "id": "七未成年人保护"
      },
      {
        "level": 2,
        "text": "八、政策更新",
        "id": "八政策更新"
      },
      {
        "level": 2,
        "text": "九、联系我们",
        "id": "九联系我们"
      }
    ],
    "links": [
      "/",
      "/privacy-policy",
      {
        "text": "复制章节链接",
        "href": "https://mediaclaw.app/privacy-policy#15-%E4%B8%8B%E8%BD%BD%E4%B8%8E%E5%AF%BC%E5%87%BA%E8%A1%8C%E4%B8%BA",
        "rawHref": "#15-下载与导出行为",
        "internalPath": "/privacy-policy"
      },
      {
        "text": "复制章节链接",
        "href": "https://mediaclaw.app/privacy-policy#%E4%B9%9D%E8%81%94%E7%B3%BB%E6%88%91%E4%BB%AC",
        "rawHref": "#九联系我们",
        "internalPath": "/privacy-policy"
      }
    ],
    "media": [],
    "source": "https://mediaclaw.app/privacy-policy"
  },
  {
    "path": "/en/privacy-policy",
    "status": 200,
    "locale": "en",
    "family": "legal",
    "title": "Privacy Policy",
    "h1": "Privacy Policy",
    "summary": "Preview-only privacy-policy page structure; no legal facts or dates have been added.",
    "sections": [
      {
        "level": 1,
        "text": "Privacy Policy",
        "id": null
      },
      {
        "level": 2,
        "text": "Introduction",
        "id": "introduction"
      },
      {
        "level": 2,
        "text": "Information We Collect",
        "id": "information-we-collect"
      },
      {
        "level": 2,
        "text": "How We Use Your Information",
        "id": "how-we-use-your-information"
      },
      {
        "level": 2,
        "text": "Data Sharing",
        "id": "data-sharing"
      },
      {
        "level": 2,
        "text": "Data Security",
        "id": "data-security"
      },
      {
        "level": 2,
        "text": "Your Rights",
        "id": "your-rights"
      },
      {
        "level": 2,
        "text": "Changes to This Policy",
        "id": "changes-to-this-policy"
      },
      {
        "level": 2,
        "text": "Contact Us",
        "id": "contact-us"
      }
    ],
    "links": [
      "/en",
      "/en/privacy-policy",
      {
        "text": "复制章节链接",
        "href": "https://mediaclaw.app/en/privacy-policy#contact-us",
        "rawHref": "#contact-us",
        "internalPath": "/en/privacy-policy"
      }
    ],
    "media": [],
    "source": "https://mediaclaw.app/en/privacy-policy"
  },
  {
    "path": "/terms-of-service",
    "status": 200,
    "locale": "zh",
    "family": "legal",
    "title": "服务条款",
    "h1": "服务条款",
    "summary": "预览版服务条款页面结构；未补充法律事实或日期。",
    "sections": [
      {
        "level": 1,
        "text": "服务条款",
        "id": null
      },
      {
        "level": 2,
        "text": "一、产品定位及使用说明",
        "id": "一产品定位及使用说明"
      },
      {
        "level": 2,
        "text": "二、服务定价",
        "id": "二服务定价"
      },
      {
        "level": 2,
        "text": "三、设备绑定",
        "id": "三设备绑定"
      },
      {
        "level": 2,
        "text": "四、相关风险提示",
        "id": "四相关风险提示"
      },
      {
        "level": 2,
        "text": "五、用户义务与使用规范",
        "id": "五用户义务与使用规范"
      },
      {
        "level": 2,
        "text": "六、免责声明",
        "id": "六免责声明"
      },
      {
        "level": 2,
        "text": "七、知识产权声明",
        "id": "七知识产权声明"
      },
      {
        "level": 2,
        "text": "八、隐私与数据保护",
        "id": "八隐私与数据保护"
      },
      {
        "level": 2,
        "text": "九、服务中止与终止",
        "id": "九服务中止与终止"
      },
      {
        "level": 2,
        "text": "十、责任限制",
        "id": "十责任限制"
      },
      {
        "level": 2,
        "text": "十一、适用法律与争议解决",
        "id": "十一适用法律与争议解决"
      },
      {
        "level": 2,
        "text": "十二、协议更新与修改",
        "id": "十二协议更新与修改"
      },
      {
        "level": 2,
        "text": "十三、联系方式",
        "id": "十三联系方式"
      }
    ],
    "links": [
      "/",
      "/terms-of-service",
      "/privacy-policy",
      {
        "text": "复制章节链接",
        "href": "https://mediaclaw.app/terms-of-service#%E4%BA%8C%E6%9C%8D%E5%8A%A1%E5%AE%9A%E4%BB%B7",
        "rawHref": "#二服务定价",
        "internalPath": "/terms-of-service"
      },
      {
        "text": "复制章节链接",
        "href": "https://mediaclaw.app/terms-of-service#%E5%8D%81%E4%B8%89%E8%81%94%E7%B3%BB%E6%96%B9%E5%BC%8F",
        "rawHref": "#十三联系方式",
        "internalPath": "/terms-of-service"
      }
    ],
    "media": [],
    "source": "https://mediaclaw.app/terms-of-service"
  },
  {
    "path": "/en/terms-of-service",
    "status": 200,
    "locale": "en",
    "family": "legal",
    "title": "Terms of Service",
    "h1": "Terms of Service",
    "summary": "Preview-only terms-of-service page structure; no legal facts or dates have been added.",
    "sections": [
      {
        "level": 1,
        "text": "Terms of Service",
        "id": null
      },
      {
        "level": 2,
        "text": "Acceptance of Terms",
        "id": "acceptance-of-terms"
      },
      {
        "level": 2,
        "text": "Description of Service",
        "id": "description-of-service"
      },
      {
        "level": 2,
        "text": "User Accounts",
        "id": "user-accounts"
      },
      {
        "level": 2,
        "text": "Acceptable Use",
        "id": "acceptable-use"
      },
      {
        "level": 2,
        "text": "Payment and Billing",
        "id": "payment-and-billing"
      },
      {
        "level": 2,
        "text": "Intellectual Property",
        "id": "intellectual-property"
      },
      {
        "level": 2,
        "text": "Termination",
        "id": "termination"
      },
      {
        "level": 2,
        "text": "Limitation of Liability",
        "id": "limitation-of-liability"
      },
      {
        "level": 2,
        "text": "Changes to These Terms",
        "id": "changes-to-these-terms"
      },
      {
        "level": 2,
        "text": "Contact",
        "id": "contact"
      }
    ],
    "links": [
      "/en",
      "/en/terms-of-service",
      {
        "text": "复制章节链接",
        "href": "https://mediaclaw.app/en/terms-of-service#contact",
        "rawHref": "#contact",
        "internalPath": "/en/terms-of-service"
      }
    ],
    "media": [],
    "source": "https://mediaclaw.app/en/terms-of-service"
  }
]

export default validateRouteRecords(records, 14, 'COMMERCIAL-LEGAL')

