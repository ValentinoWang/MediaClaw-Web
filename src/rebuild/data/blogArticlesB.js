import { validateRouteRecords } from '../contracts/routeSchema.js'

const records = [
  {
    "path": "/blog/how-to-copy-viral-short-videos",
    "status": 200,
    "locale": "zh",
    "family": "blog-article",
    "title": "素人起号怎么模仿爆款视频？从找到对标到拍出自己的版本，5 步完整链路 | MediaClaw",
    "h1": "素人起号怎么模仿爆款视频？从找到对标到拍出自己的版本，5 步完整链路",
    "summary": "不会写脚本也能模仿爆款视频。5步完整链路：找到低粉高赞视频→提取逐字稿→AI拆解结构→改写成自己的版本→开拍，跟着做就行。",
    "sections": [
      {
        "level": 2,
        "heading": "找到一个值得模仿的视频",
        "copy": "本节围绕“找到一个值得模仿的视频”展开。"
      },
      {
        "level": 2,
        "heading": "把视频文案完整拿出来",
        "copy": "本节围绕“把视频文案完整拿出来”展开。"
      },
      {
        "level": 2,
        "heading": "用 AI 看懂这个视频为什么有效",
        "copy": "本节围绕“用 AI 看懂这个视频为什么有效”展开。"
      },
      {
        "level": 2,
        "heading": "让 AI 帮你改成自己的版本",
        "copy": "本节围绕“让 AI 帮你改成自己的版本”展开。"
      },
      {
        "level": 2,
        "heading": "拿到改写稿，开拍前做三件事",
        "copy": "本节围绕“拿到改写稿，开拍前做三件事”展开。"
      },
      {
        "level": 2,
        "heading": "模仿和抄袭的边界",
        "copy": "本节围绕“模仿和抄袭的边界”展开。"
      },
      {
        "level": 2,
        "heading": "常见问题",
        "copy": "本节围绕“常见问题”展开。"
      },
      {
        "level": 2,
        "heading": "相关文章",
        "copy": "本节围绕“相关文章”展开。"
      },
      {
        "level": 3,
        "heading": "短视频逐字稿提取：飞书多维表格 + 阿里百炼，每月免费 10 小时",
        "copy": "本节围绕“短视频逐字稿提取：飞书多维表格 + 阿里百炼，每月免费 10 小时”展开。"
      },
      {
        "level": 3,
        "heading": "抖音数据采集怎么做？从批量采集到分析的完整流程",
        "copy": "本节围绕“抖音数据采集怎么做？从批量采集到分析的完整流程”展开。"
      },
      {
        "level": 3,
        "heading": "抖音评论怎么批量导出？采集、看不全的坑，到筛出客资线索",
        "copy": "本节围绕“抖音评论怎么批量导出？采集、看不全的坑，到筛出客资线索”展开。"
      },
      {
        "level": 3,
        "heading": "怎么用 AI 把对标内容 10 分钟变成自己的小红书初稿",
        "copy": "本节围绕“怎么用 AI 把对标内容 10 分钟变成自己的小红书初稿”展开。"
      },
      {
        "level": 2,
        "heading": "相关文章",
        "copy": "本节围绕“相关文章”展开。"
      },
      {
        "level": 3,
        "heading": "短视频逐字稿提取：飞书多维表格 + 阿里百炼，每月免费 10 小时",
        "copy": "本节围绕“短视频逐字稿提取：飞书多维表格 + 阿里百炼，每月免费 10 小时”展开。"
      },
      {
        "level": 3,
        "heading": "抖音数据采集怎么做？从批量采集到分析的完整流程",
        "copy": "本节围绕“抖音数据采集怎么做？从批量采集到分析的完整流程”展开。"
      },
      {
        "level": 3,
        "heading": "抖音评论怎么批量导出？采集、看不全的坑，到筛出客资线索",
        "copy": "本节围绕“抖音评论怎么批量导出？采集、看不全的坑，到筛出客资线索”展开。"
      },
      {
        "level": 3,
        "heading": "怎么用 AI 把对标内容 10 分钟变成自己的小红书初稿",
        "copy": "本节围绕“怎么用 AI 把对标内容 10 分钟变成自己的小红书初稿”展开。"
      }
    ],
    "links": [
      "/",
      "/download",
      "/pricing",
      "/blog",
      "/blog/how-to-copy-viral-short-videos#%E6%89%BE%E5%88%B0%E4%B8%80%E4%B8%AA%E5%80%BC%E5%BE%97%E6%A8%A1%E4%BB%BF%E7%9A%84%E8%A7%86%E9%A2%91",
      "/blog/how-to-copy-viral-short-videos#%E6%8A%8A%E8%A7%86%E9%A2%91%E6%96%87%E6%A1%88%E5%AE%8C%E6%95%B4%E6%8B%BF%E5%87%BA%E6%9D%A5",
      "/blog/short-video-transcript-extraction",
      "/blog/how-to-copy-viral-short-videos#%E7%94%A8-ai-%E7%9C%8B%E6%87%82%E8%BF%99%E4%B8%AA%E8%A7%86%E9%A2%91%E4%B8%BA%E4%BB%80%E4%B9%88%E6%9C%89%E6%95%88",
      "/blog/how-to-copy-viral-short-videos#%E8%AE%A9-ai-%E5%B8%AE%E4%BD%A0%E6%94%B9%E6%88%90%E8%87%AA%E5%B7%B1%E7%9A%84%E7%89%88%E6%9C%AC",
      "/blog/how-to-copy-viral-short-videos#%E6%8B%BF%E5%88%B0%E6%94%B9%E5%86%99%E7%A8%BF%E5%BC%80%E6%8B%8D%E5%89%8D%E5%81%9A%E4%B8%89%E4%BB%B6%E4%BA%8B",
      "/blog/how-to-copy-viral-short-videos#%E6%A8%A1%E4%BB%BF%E5%92%8C%E6%8A%84%E8%A2%AD%E7%9A%84%E8%BE%B9%E7%95%8C",
      "/blog/how-to-copy-viral-short-videos#%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98",
      "/blog/douyin-data-collection",
      "/blog/douyin-comment-export",
      "/blog/xiaohongshu-ai-benchmark-to-draft",
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
      "/welfare?entry=footer",
      "/updates",
      "/referral",
      "/privacy-policy",
      "/terms-of-service"
    ],
    "media": [
      {
        "tag": "img",
        "kind": "img",
        "url": "https://mediaclaw.app/logo.png",
        "attr": "src",
        "alt": "MediaClaw",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://mediaclaw.app/logo.png",
        "attr": "src",
        "alt": "MediaClaw Team",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/9cfde8c3405105d93b76b68758b5fa9d.png",
        "attr": "src",
        "alt": "在小红书搜索结果页按最多点赞排序，用 MediaClaw 筛选低粉高赞笔记",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/25d62b4a0aa7f5cb235fb09f6d70fc1e.png",
        "attr": "src",
        "alt": "飞书表格中逐字稿提取的字段展示",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/b76b2e8d56b648002b9b73f0c7d50dc2.png",
        "attr": "src",
        "alt": "AI 分析并优化视频脚本",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/19711c105b2577936fd23022ee7614c4.png",
        "attr": "src",
        "alt": "AI 解构+改写仿写原笔记",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/3dcac851783a45aeb97030233147458a.webp",
        "attr": "src",
        "alt": "短视频逐字稿提取：飞书多维表格 + 阿里百炼，每月免费 10 小时",
        "visible": false
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/2c20a78ecd01ec9b3c4919f1c42c2d44.webp",
        "attr": "src",
        "alt": "抖音数据采集怎么做？从批量采集到分析的完整流程",
        "visible": false
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/79fa0f398165bc0b5a24bc5d95a56b20.webp",
        "attr": "src",
        "alt": "怎么用 AI 把对标内容 10 分钟变成自己的小红书初稿",
        "visible": false
      }
    ],
    "source": "https://mediaclaw.app/blog/how-to-copy-viral-short-videos"
  },
  {
    "path": "/en/blog/how-to-copy-viral-short-videos",
    "status": 200,
    "locale": "en",
    "family": "blog-article",
    "title": "How to Reverse Engineer Viral Short Videos: 5 Steps from Finding References to Filming Your Own Version | MediaClaw",
    "h1": "How to Reverse Engineer Viral Short Videos: 5 Steps from Finding References to Filming Your Own Version",
    "summary": "You don't need scriptwriting skills to replicate viral videos. This 5-step framework walks you through finding low-follower high-engagement videos, extracting transcripts, using AI to break down structure, rewriting your own version, and getting camera-ready.",
    "sections": [
      {
        "level": 2,
        "heading": "Find a video worth studying",
        "copy": "This section covers \"Find a video worth studying\"."
      },
      {
        "level": 2,
        "heading": "Extract the full transcript",
        "copy": "This section covers \"Extract the full transcript\"."
      },
      {
        "level": 2,
        "heading": "Use AI to understand why the video worked",
        "copy": "This section covers \"Use AI to understand why the video worked\"."
      },
      {
        "level": 2,
        "heading": "Have AI rewrite it as your own version",
        "copy": "This section covers \"Have AI rewrite it as your own version\"."
      },
      {
        "level": 2,
        "heading": "Polish the draft before you hit record",
        "copy": "This section covers \"Polish the draft before you hit record\"."
      },
      {
        "level": 2,
        "heading": "Where modeling ends and copying begins",
        "copy": "This section covers \"Where modeling ends and copying begins\"."
      },
      {
        "level": 2,
        "heading": "FAQ",
        "copy": "This section covers \"FAQ\"."
      },
      {
        "level": 2,
        "heading": "Related posts",
        "copy": "This section covers \"Related posts\"."
      },
      {
        "level": 3,
        "heading": "抖音数据采集怎么做？从批量采集到分析的完整流程",
        "copy": "This section covers \"抖音数据采集怎么做？从批量采集到分析的完整流程\"."
      },
      {
        "level": 3,
        "heading": "How to Export Douyin Comments to Excel — and Why They Don't All Load",
        "copy": "This section covers \"How to Export Douyin Comments to Excel — and Why They Don't All Load\"."
      },
      {
        "level": 3,
        "heading": "怎么用 AI 把对标内容 10 分钟变成自己的小红书初稿",
        "copy": "This section covers \"怎么用 AI 把对标内容 10 分钟变成自己的小红书初稿\"."
      },
      {
        "level": 3,
        "heading": "How to Collect Research Data from Xiaohongshu (RedNote) and Douyin for Your Thesis",
        "copy": "This section covers \"How to Collect Research Data from Xiaohongshu (RedNote) and Douyin for Your Thesis\"."
      },
      {
        "level": 2,
        "heading": "RELATED POSTS",
        "copy": "This section covers \"RELATED POSTS\"."
      },
      {
        "level": 3,
        "heading": "抖音数据采集怎么做？从批量采集到分析的完整流程",
        "copy": "This section covers \"抖音数据采集怎么做？从批量采集到分析的完整流程\"."
      },
      {
        "level": 3,
        "heading": "How to Export Douyin Comments to Excel — and Why They Don't All Load",
        "copy": "This section covers \"How to Export Douyin Comments to Excel — and Why They Don't All Load\"."
      },
      {
        "level": 3,
        "heading": "怎么用 AI 把对标内容 10 分钟变成自己的小红书初稿",
        "copy": "This section covers \"怎么用 AI 把对标内容 10 分钟变成自己的小红书初稿\"."
      },
      {
        "level": 3,
        "heading": "How to Collect Research Data from Xiaohongshu (RedNote) and Douyin for Your Thesis",
        "copy": "This section covers \"How to Collect Research Data from Xiaohongshu (RedNote) and Douyin for Your Thesis\"."
      }
    ],
    "links": [
      "/en",
      "/en/download",
      "/en/pricing",
      "/en/blog",
      "/en/blog/how-to-copy-viral-short-videos#find-a-video-worth-studying",
      "/en/blog/how-to-copy-viral-short-videos#extract-the-full-transcript",
      "/en/blog/short-video-transcript-extraction",
      "/en/blog/how-to-copy-viral-short-videos#use-ai-to-understand-why-the-video-worked",
      "/en/blog/how-to-copy-viral-short-videos#have-ai-rewrite-it-as-your-own-version",
      "/download",
      "/en/blog/how-to-copy-viral-short-videos#polish-the-draft-before-you-hit-record",
      "/en/blog/how-to-copy-viral-short-videos#where-modeling-ends-and-copying-begins",
      "/en/blog/how-to-copy-viral-short-videos#faq",
      "/en/blog/douyin-data-collection",
      "/en/blog/douyin-comment-export",
      "/en/blog/xiaohongshu-ai-benchmark-to-draft",
      "/en/blog/xiaohongshu-research-data-collection",
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
      "/en/welfare?entry=footer",
      "/en/updates",
      "/en/referral",
      "/en/privacy-policy",
      "/en/terms-of-service"
    ],
    "media": [
      {
        "tag": "img",
        "kind": "img",
        "url": "https://mediaclaw.app/logo.png",
        "attr": "src",
        "alt": "MediaClaw",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://mediaclaw.app/logo.png",
        "attr": "src",
        "alt": "MediaClaw Team",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/9cfde8c3405105d93b76b68758b5fa9d.png",
        "attr": "src",
        "alt": "Sorting Xiaohongshu search results by most likes and using MediaClaw to filter low-follower high-engagement posts",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/25d62b4a0aa7f5cb235fb09f6d70fc1e.png",
        "attr": "src",
        "alt": "Transcript extraction fields displayed in a Lark Base spreadsheet",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/b76b2e8d56b648002b9b73f0c7d50dc2.png",
        "attr": "src",
        "alt": "AI analyzing and optimizing a video script",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/19711c105b2577936fd23022ee7614c4.png",
        "attr": "src",
        "alt": "AI deconstructing and rewriting a reference post",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/2c20a78ecd01ec9b3c4919f1c42c2d44.webp",
        "attr": "src",
        "alt": "抖音数据采集怎么做？从批量采集到分析的完整流程",
        "visible": false
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/79fa0f398165bc0b5a24bc5d95a56b20.webp",
        "attr": "src",
        "alt": "怎么用 AI 把对标内容 10 分钟变成自己的小红书初稿",
        "visible": false
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/e7e0a072c414efc013b983c4cc434dff.webp",
        "attr": "src",
        "alt": "How to Collect Research Data from Xiaohongshu (RedNote) and Douyin for Your Thesis",
        "visible": false
      }
    ],
    "source": "https://mediaclaw.app/en/blog/how-to-copy-viral-short-videos"
  },
  {
    "path": "/blog/xiaohongshu-search-vs-recommendation-traffic",
    "status": 200,
    "locale": "zh",
    "family": "blog-article",
    "title": "小红书搜索流量vs推荐流量：新号该押注哪种？ | MediaClaw",
    "h1": "小红书搜索流量vs推荐流量：新号该押注哪种？",
    "summary": "拆解小红书搜索流量和推荐流量的底层逻辑差异。搜索流量转化率是推荐的3-5倍，生命周期超6个月——新号没有粉丝基础，先做搜索才是正解。",
    "sections": [
      {
        "level": 2,
        "heading": "小红书的两种流量来源：底层逻辑完全不同",
        "copy": "本节围绕“小红书的两种流量来源：底层逻辑完全不同”展开。"
      },
      {
        "level": 2,
        "heading": "为什么搜索流量更适合新号",
        "copy": "本节围绕“为什么搜索流量更适合新号”展开。"
      },
      {
        "level": 2,
        "heading": "推荐流量不是不做，而是时机不同",
        "copy": "本节围绕“推荐流量不是不做，而是时机不同”展开。"
      },
      {
        "level": 2,
        "heading": "常见问题",
        "copy": "本节围绕“常见问题”展开。"
      },
      {
        "level": 3,
        "heading": "小红书搜索流量和推荐流量有什么区别？新号该选哪个？",
        "copy": "本节围绕“小红书搜索流量和推荐流量有什么区别？新号该选哪个？”展开。"
      },
      {
        "level": 3,
        "heading": "小红书新号没粉丝，做搜索流量还是推荐流量更合适？",
        "copy": "本节围绕“小红书新号没粉丝，做搜索流量还是推荐流量更合适？”展开。"
      },
      {
        "level": 3,
        "heading": "两种流量来源可以同时做吗？",
        "copy": "本节围绕“两种流量来源可以同时做吗？”展开。"
      },
      {
        "level": 2,
        "heading": "相关文章",
        "copy": "本节围绕“相关文章”展开。"
      },
      {
        "level": 3,
        "heading": "专业内容博主怎么做搜索流量：把术语翻译成大白话",
        "copy": "本节围绕“专业内容博主怎么做搜索流量：把术语翻译成大白话”展开。"
      },
      {
        "level": 3,
        "heading": "怎么用 AI 把对标内容 10 分钟变成自己的小红书初稿",
        "copy": "本节围绕“怎么用 AI 把对标内容 10 分钟变成自己的小红书初稿”展开。"
      },
      {
        "level": 3,
        "heading": "写论文怎么从小红书和抖音采集研究数据",
        "copy": "本节围绕“写论文怎么从小红书和抖音采集研究数据”展开。"
      },
      {
        "level": 3,
        "heading": "小红书品牌词怎么监控？内容风向舆情扫描",
        "copy": "本节围绕“小红书品牌词怎么监控？内容风向舆情扫描”展开。"
      },
      {
        "level": 2,
        "heading": "相关文章",
        "copy": "本节围绕“相关文章”展开。"
      },
      {
        "level": 3,
        "heading": "专业内容博主怎么做搜索流量：把术语翻译成大白话",
        "copy": "本节围绕“专业内容博主怎么做搜索流量：把术语翻译成大白话”展开。"
      },
      {
        "level": 3,
        "heading": "怎么用 AI 把对标内容 10 分钟变成自己的小红书初稿",
        "copy": "本节围绕“怎么用 AI 把对标内容 10 分钟变成自己的小红书初稿”展开。"
      },
      {
        "level": 3,
        "heading": "写论文怎么从小红书和抖音采集研究数据",
        "copy": "本节围绕“写论文怎么从小红书和抖音采集研究数据”展开。"
      },
      {
        "level": 3,
        "heading": "小红书品牌词怎么监控？内容风向舆情扫描",
        "copy": "本节围绕“小红书品牌词怎么监控？内容风向舆情扫描”展开。"
      }
    ],
    "links": [
      "/",
      "/download",
      "/pricing",
      "/blog",
      "/blog/xiaohongshu-search-vs-recommendation-traffic#%E5%B0%8F%E7%BA%A2%E4%B9%A6%E7%9A%84%E4%B8%A4%E7%A7%8D%E6%B5%81%E9%87%8F%E6%9D%A5%E6%BA%90%E5%BA%95%E5%B1%82%E9%80%BB%E8%BE%91%E5%AE%8C%E5%85%A8%E4%B8%8D%E5%90%8C",
      "/blog/xiaohongshu-search-vs-recommendation-traffic#%E4%B8%BA%E4%BB%80%E4%B9%88%E6%90%9C%E7%B4%A2%E6%B5%81%E9%87%8F%E6%9B%B4%E9%80%82%E5%90%88%E6%96%B0%E5%8F%B7",
      "/blog/xiaohongshu-search-vs-recommendation-traffic#%E6%8E%A8%E8%8D%90%E6%B5%81%E9%87%8F%E4%B8%8D%E6%98%AF%E4%B8%8D%E5%81%9A%E8%80%8C%E6%98%AF%E6%97%B6%E6%9C%BA%E4%B8%8D%E5%90%8C",
      "/blog/xiaohongshu-search-vs-recommendation-traffic#%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98",
      "/blog/xiaohongshu-search-vs-recommendation-traffic#%E5%B0%8F%E7%BA%A2%E4%B9%A6%E6%90%9C%E7%B4%A2%E6%B5%81%E9%87%8F%E5%92%8C%E6%8E%A8%E8%8D%90%E6%B5%81%E9%87%8F%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB%E6%96%B0%E5%8F%B7%E8%AF%A5%E9%80%89%E5%93%AA%E4%B8%AA",
      "/blog/xiaohongshu-search-vs-recommendation-traffic#%E5%B0%8F%E7%BA%A2%E4%B9%A6%E6%96%B0%E5%8F%B7%E6%B2%A1%E7%B2%89%E4%B8%9D%E5%81%9A%E6%90%9C%E7%B4%A2%E6%B5%81%E9%87%8F%E8%BF%98%E6%98%AF%E6%8E%A8%E8%8D%90%E6%B5%81%E9%87%8F%E6%9B%B4%E5%90%88%E9%80%82",
      "/blog/xiaohongshu-search-vs-recommendation-traffic#%E4%B8%A4%E7%A7%8D%E6%B5%81%E9%87%8F%E6%9D%A5%E6%BA%90%E5%8F%AF%E4%BB%A5%E5%90%8C%E6%97%B6%E5%81%9A%E5%90%97",
      "/blog/xiaohongshu-professional-content-search-traffic",
      "/blog/xiaohongshu-ai-benchmark-to-draft",
      "/blog/xiaohongshu-research-data-collection",
      "/blog/xiaohongshu-brand-sentiment-monitoring",
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
      "/welfare?entry=footer",
      "/updates",
      "/referral",
      "/privacy-policy",
      "/terms-of-service"
    ],
    "media": [
      {
        "tag": "img",
        "kind": "img",
        "url": "https://mediaclaw.app/logo.png",
        "attr": "src",
        "alt": "MediaClaw",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://mediaclaw.app/logo.png",
        "attr": "src",
        "alt": "MediaClaw Team",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/d23371d046da8f607eacc982c82284a5.webp",
        "attr": "src",
        "alt": "专业内容博主怎么做搜索流量：把术语翻译成大白话",
        "visible": false
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/79fa0f398165bc0b5a24bc5d95a56b20.webp",
        "attr": "src",
        "alt": "怎么用 AI 把对标内容 10 分钟变成自己的小红书初稿",
        "visible": false
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/e7e0a072c414efc013b983c4cc434dff.webp",
        "attr": "src",
        "alt": "写论文怎么从小红书和抖音采集研究数据",
        "visible": false
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/a6d9c82262d00f64bb1558b2b15efc40.webp",
        "attr": "src",
        "alt": "小红书品牌词怎么监控？内容风向舆情扫描",
        "visible": false
      }
    ],
    "source": "https://mediaclaw.app/blog/xiaohongshu-search-vs-recommendation-traffic"
  },
  {
    "path": "/en/blog/xiaohongshu-search-vs-recommendation-traffic",
    "status": 200,
    "locale": "en",
    "family": "blog-article",
    "title": "Xiaohongshu (RedNote) Search vs. Recommendation Traffic: Which Should New Accounts Prioritize? | MediaClaw",
    "h1": "Xiaohongshu (RedNote) Search vs. Recommendation Traffic: Which Should New Accounts Prioritize?",
    "summary": "Search traffic on Xiaohongshu converts 3–5x higher than recommendation traffic and lasts 6+ months. For new accounts without a follower base, prioritizing search is the smarter cold-start strategy.",
    "sections": [
      {
        "level": 2,
        "heading": "Two Traffic Sources, Two Entirely Different Systems",
        "copy": "This section covers \"Two Traffic Sources, Two Entirely Different Systems\"."
      },
      {
        "level": 2,
        "heading": "Why Search Traffic Is the Better Bet for New Accounts",
        "copy": "This section covers \"Why Search Traffic Is the Better Bet for New Accounts\"."
      },
      {
        "level": 2,
        "heading": "Recommendation Traffic Isn't Bad — the Timing Is Just Different",
        "copy": "This section covers \"Recommendation Traffic Isn't Bad — the Timing Is Just Different\"."
      },
      {
        "level": 2,
        "heading": "FAQ",
        "copy": "This section covers \"FAQ\"."
      },
      {
        "level": 3,
        "heading": "What's the difference between search traffic and recommendation traffic on Xiaohongshu? Which should new accounts choose?",
        "copy": "This section covers \"What's the difference between search traffic and recommendation traffic on Xiaohongshu? Which should new accounts choose?\"."
      },
      {
        "level": 3,
        "heading": "Should a new Xiaohongshu account with zero followers focus on search or recommendation traffic?",
        "copy": "This section covers \"Should a new Xiaohongshu account with zero followers focus on search or recommendation traffic?\"."
      },
      {
        "level": 3,
        "heading": "Can you pursue both traffic sources at the same time?",
        "copy": "This section covers \"Can you pursue both traffic sources at the same time?\"."
      },
      {
        "level": 2,
        "heading": "Related posts",
        "copy": "This section covers \"Related posts\"."
      },
      {
        "level": 3,
        "heading": "Xiaohongshu (RedNote) Keyword Placement Guide: Where to Put Keywords for Maximum Search Traffic",
        "copy": "This section covers \"Xiaohongshu (RedNote) Keyword Placement Guide: Where to Put Keywords for Maximum Search Traffic\"."
      },
      {
        "level": 3,
        "heading": "The Fastest Way to Grow on Xiaohongshu (RedNote) Isn't Posting Daily — It's Niche Analysis",
        "copy": "This section covers \"The Fastest Way to Grow on Xiaohongshu (RedNote) Isn't Posting Daily — It's Niche Analysis\"."
      },
      {
        "level": 3,
        "heading": "How Expert Creators Get Search Traffic on Xiaohongshu: Translate Jargon into Plain Language",
        "copy": "This section covers \"How Expert Creators Get Search Traffic on Xiaohongshu: Translate Jargon into Plain Language\"."
      },
      {
        "level": 3,
        "heading": "How to Scrape Xiaohongshu (RedNote) Comments for Free — and Turn Them into Leads",
        "copy": "This section covers \"How to Scrape Xiaohongshu (RedNote) Comments for Free — and Turn Them into Leads\"."
      },
      {
        "level": 2,
        "heading": "RELATED POSTS",
        "copy": "This section covers \"RELATED POSTS\"."
      },
      {
        "level": 3,
        "heading": "Xiaohongshu (RedNote) Keyword Placement Guide: Where to Put Keywords for Maximum Search Traffic",
        "copy": "This section covers \"Xiaohongshu (RedNote) Keyword Placement Guide: Where to Put Keywords for Maximum Search Traffic\"."
      },
      {
        "level": 3,
        "heading": "The Fastest Way to Grow on Xiaohongshu (RedNote) Isn't Posting Daily — It's Niche Analysis",
        "copy": "This section covers \"The Fastest Way to Grow on Xiaohongshu (RedNote) Isn't Posting Daily — It's Niche Analysis\"."
      },
      {
        "level": 3,
        "heading": "How Expert Creators Get Search Traffic on Xiaohongshu: Translate Jargon into Plain Language",
        "copy": "This section covers \"How Expert Creators Get Search Traffic on Xiaohongshu: Translate Jargon into Plain Language\"."
      },
      {
        "level": 3,
        "heading": "How to Scrape Xiaohongshu (RedNote) Comments for Free — and Turn Them into Leads",
        "copy": "This section covers \"How to Scrape Xiaohongshu (RedNote) Comments for Free — and Turn Them into Leads\"."
      }
    ],
    "links": [
      "/en",
      "/en/download",
      "/en/pricing",
      "/en/blog",
      "/en/blog/xiaohongshu-search-vs-recommendation-traffic#two-traffic-sources-two-entirely-different-systems",
      "/en/blog/xiaohongshu-search-vs-recommendation-traffic#why-search-traffic-is-the-better-bet-for-new-accounts",
      "/en/blog/xiaohongshu-search-vs-recommendation-traffic#recommendation-traffic-isnt-bad-the-timing-is-just-different",
      "/en/blog/xiaohongshu-search-vs-recommendation-traffic#faq",
      "/en/blog/xiaohongshu-search-vs-recommendation-traffic#whats-the-difference-between-search-traffic-and-recommendation-traffic-on-xiaohongshu-which-should-new-accounts-choose",
      "/en/blog/xiaohongshu-search-vs-recommendation-traffic#should-a-new-xiaohongshu-account-with-zero-followers-focus-on-search-or-recommendation-traffic",
      "/en/blog/xiaohongshu-search-vs-recommendation-traffic#can-you-pursue-both-traffic-sources-at-the-same-time",
      "/en/blog/xiaohongshu-keyword-placement",
      "/en/blog/xiaohongshu-topic-analysis",
      "/en/blog/xiaohongshu-professional-content-search-traffic",
      "/en/blog/xiaohongshu-comment-analysis",
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
      "/en/welfare?entry=footer",
      "/en/updates",
      "/en/referral",
      "/en/privacy-policy",
      "/en/terms-of-service"
    ],
    "media": [
      {
        "tag": "img",
        "kind": "img",
        "url": "https://mediaclaw.app/logo.png",
        "attr": "src",
        "alt": "MediaClaw",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://mediaclaw.app/logo.png",
        "attr": "src",
        "alt": "MediaClaw Team",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/2441d01af10a786af5c75df1f9ffb7e8.webp",
        "attr": "src",
        "alt": "Xiaohongshu (RedNote) Keyword Placement Guide: Where to Put Keywords for Maximum Search Traffic",
        "visible": false
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/bea16c9a6eeb4fe8dcbd8cac6b79feb1.webp",
        "attr": "src",
        "alt": "The Fastest Way to Grow on Xiaohongshu (RedNote) Isn't Posting Daily — It's Niche Analysis",
        "visible": false
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/d23371d046da8f607eacc982c82284a5.webp",
        "attr": "src",
        "alt": "How Expert Creators Get Search Traffic on Xiaohongshu: Translate Jargon into Plain Language",
        "visible": false
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/de3de8c0ff1a70b69b76ca706b299deb.webp",
        "attr": "src",
        "alt": "How to Scrape Xiaohongshu (RedNote) Comments for Free — and Turn Them into Leads",
        "visible": false
      }
    ],
    "source": "https://mediaclaw.app/en/blog/xiaohongshu-search-vs-recommendation-traffic"
  },
  {
    "path": "/blog/xiaohongshu-keyword-placement",
    "status": 200,
    "locale": "zh",
    "family": "blog-article",
    "title": "小红书关键词布局攻略：让搜索流量精准找到你的笔记 | MediaClaw",
    "h1": "小红书关键词布局攻略：让搜索流量精准找到你的笔记",
    "summary": "小红书官方推荐的关键词布局方法，从账号层、视觉层、内容层到流量层，系统拆解每个位置的埋词技巧。掌握标题前置核心词、正文自然融入、话题标签组合策略和评论区补充，让笔记精准命中搜索流量。",
    "sections": [
      {
        "level": 2,
        "heading": "账号层：昵称就是你的长期关键词",
        "copy": "本节围绕“账号层：昵称就是你的长期关键词”展开。"
      },
      {
        "level": 2,
        "heading": "视觉层：封面和图片里的文字也是关键词",
        "copy": "本节围绕“视觉层：封面和图片里的文字也是关键词”展开。"
      },
      {
        "level": 3,
        "heading": "封面文字怎么埋词",
        "copy": "本节围绕“封面文字怎么埋词”展开。"
      },
      {
        "level": 3,
        "heading": "图片内嵌文字的作用",
        "copy": "本节围绕“图片内嵌文字的作用”展开。"
      },
      {
        "level": 2,
        "heading": "内容层：标题和正文的埋词是基本功",
        "copy": "本节围绕“内容层：标题和正文的埋词是基本功”展开。"
      },
      {
        "level": 3,
        "heading": "标题：前置核心词，精准抓住眼球",
        "copy": "本节围绕“标题：前置核心词，精准抓住眼球”展开。"
      },
      {
        "level": 3,
        "heading": "开头前两句：让算法锁定内容方向",
        "copy": "本节围绕“开头前两句：让算法锁定内容方向”展开。"
      },
      {
        "level": 3,
        "heading": "正文：自然融入，兼顾体验",
        "copy": "本节围绕“正文：自然融入，兼顾体验”展开。"
      },
      {
        "level": 2,
        "heading": "流量层：标签和评论区是曝光放大器",
        "copy": "本节围绕“流量层：标签和评论区是曝光放大器”展开。"
      },
      {
        "level": 3,
        "heading": "话题标签：组合策略，覆盖更广",
        "copy": "本节围绕“话题标签：组合策略，覆盖更广”展开。"
      },
      {
        "level": 3,
        "heading": "评论区：容易被忽视的关键词补充位",
        "copy": "本节围绕“评论区：容易被忽视的关键词补充位”展开。"
      },
      {
        "level": 2,
        "heading": "进阶：搜索和推荐的双触发",
        "copy": "本节围绕“进阶：搜索和推荐的双触发”展开。"
      },
      {
        "level": 2,
        "heading": "小结",
        "copy": "本节围绕“小结”展开。"
      },
      {
        "level": 2,
        "heading": "FAQ",
        "copy": "本节围绕“FAQ”展开。"
      },
      {
        "level": 3,
        "heading": "小红书标题关键词放在哪个位置最有效？",
        "copy": "本节围绕“小红书标题关键词放在哪个位置最有效？”展开。"
      },
      {
        "level": 3,
        "heading": "小红书正文里关键词出现几次合适？",
        "copy": "本节围绕“小红书正文里关键词出现几次合适？”展开。"
      },
      {
        "level": 3,
        "heading": "标签到底重不重要？",
        "copy": "本节围绕“标签到底重不重要？”展开。"
      },
      {
        "level": 3,
        "heading": "评论区的文字会影响搜索排名吗？",
        "copy": "本节围绕“评论区的文字会影响搜索排名吗？”展开。"
      },
      {
        "level": 3,
        "heading": "封面上的文字算法能识别吗？",
        "copy": "本节围绕“封面上的文字算法能识别吗？”展开。"
      },
      {
        "level": 3,
        "heading": "怎么知道该埋什么关键词？",
        "copy": "本节围绕“怎么知道该埋什么关键词？”展开。"
      },
      {
        "level": 2,
        "heading": "相关文章",
        "copy": "本节围绕“相关文章”展开。"
      },
      {
        "level": 3,
        "heading": "怎么用 AI 把对标内容 10 分钟变成自己的小红书初稿",
        "copy": "本节围绕“怎么用 AI 把对标内容 10 分钟变成自己的小红书初稿”展开。"
      },
      {
        "level": 3,
        "heading": "小红书评论批量导出：多篇种草笔记投放后，怎么集中复盘评论区反馈",
        "copy": "本节围绕“小红书评论批量导出：多篇种草笔记投放后，怎么集中复盘评论区反馈”展开。"
      },
      {
        "level": 3,
        "heading": "小红书起号最快的方式不是日更，是搜一个词做选题分析",
        "copy": "本节围绕“小红书起号最快的方式不是日更，是搜一个词做选题分析”展开。"
      },
      {
        "level": 3,
        "heading": "小红书评论区的采集与分析：从用户情绪、需求到潜客线索获取",
        "copy": "本节围绕“小红书评论区的采集与分析：从用户情绪、需求到潜客线索获取”展开。"
      },
      {
        "level": 2,
        "heading": "相关文章",
        "copy": "本节围绕“相关文章”展开。"
      },
      {
        "level": 3,
        "heading": "怎么用 AI 把对标内容 10 分钟变成自己的小红书初稿",
        "copy": "本节围绕“怎么用 AI 把对标内容 10 分钟变成自己的小红书初稿”展开。"
      },
      {
        "level": 3,
        "heading": "小红书评论批量导出：多篇种草笔记投放后，怎么集中复盘评论区反馈",
        "copy": "本节围绕“小红书评论批量导出：多篇种草笔记投放后，怎么集中复盘评论区反馈”展开。"
      },
      {
        "level": 3,
        "heading": "小红书起号最快的方式不是日更，是搜一个词做选题分析",
        "copy": "本节围绕“小红书起号最快的方式不是日更，是搜一个词做选题分析”展开。"
      },
      {
        "level": 3,
        "heading": "小红书评论区的采集与分析：从用户情绪、需求到潜客线索获取",
        "copy": "本节围绕“小红书评论区的采集与分析：从用户情绪、需求到潜客线索获取”展开。"
      }
    ],
    "links": [
      "/",
      "/download",
      "/pricing",
      "/blog",
      "/blog/xiaohongshu-keyword-placement#%E8%B4%A6%E5%8F%B7%E5%B1%82%E6%98%B5%E7%A7%B0%E5%B0%B1%E6%98%AF%E4%BD%A0%E7%9A%84%E9%95%BF%E6%9C%9F%E5%85%B3%E9%94%AE%E8%AF%8D",
      "/blog/xiaohongshu-keyword-placement#%E8%A7%86%E8%A7%89%E5%B1%82%E5%B0%81%E9%9D%A2%E5%92%8C%E5%9B%BE%E7%89%87%E9%87%8C%E7%9A%84%E6%96%87%E5%AD%97%E4%B9%9F%E6%98%AF%E5%85%B3%E9%94%AE%E8%AF%8D",
      "/blog/xiaohongshu-keyword-placement#%E5%B0%81%E9%9D%A2%E6%96%87%E5%AD%97%E6%80%8E%E4%B9%88%E5%9F%8B%E8%AF%8D",
      "/blog/xiaohongshu-keyword-placement#%E5%9B%BE%E7%89%87%E5%86%85%E5%B5%8C%E6%96%87%E5%AD%97%E7%9A%84%E4%BD%9C%E7%94%A8",
      "/blog/xiaohongshu-keyword-placement#%E5%86%85%E5%AE%B9%E5%B1%82%E6%A0%87%E9%A2%98%E5%92%8C%E6%AD%A3%E6%96%87%E7%9A%84%E5%9F%8B%E8%AF%8D%E6%98%AF%E5%9F%BA%E6%9C%AC%E5%8A%9F",
      "/blog/xiaohongshu-keyword-placement#%E6%A0%87%E9%A2%98%E5%89%8D%E7%BD%AE%E6%A0%B8%E5%BF%83%E8%AF%8D%E7%B2%BE%E5%87%86%E6%8A%93%E4%BD%8F%E7%9C%BC%E7%90%83",
      "/xiaohongshu/keywords",
      "/blog/xiaohongshu-keyword-placement#%E5%BC%80%E5%A4%B4%E5%89%8D%E4%B8%A4%E5%8F%A5%E8%AE%A9%E7%AE%97%E6%B3%95%E9%94%81%E5%AE%9A%E5%86%85%E5%AE%B9%E6%96%B9%E5%90%91",
      "/blog/xiaohongshu-keyword-placement#%E6%AD%A3%E6%96%87%E8%87%AA%E7%84%B6%E8%9E%8D%E5%85%A5%E5%85%BC%E9%A1%BE%E4%BD%93%E9%AA%8C",
      "/xiaohongshu/scraper",
      "/blog/xiaohongshu-keyword-placement#%E6%B5%81%E9%87%8F%E5%B1%82%E6%A0%87%E7%AD%BE%E5%92%8C%E8%AF%84%E8%AE%BA%E5%8C%BA%E6%98%AF%E6%9B%9D%E5%85%89%E6%94%BE%E5%A4%A7%E5%99%A8",
      "/blog/xiaohongshu-keyword-placement#%E8%AF%9D%E9%A2%98%E6%A0%87%E7%AD%BE%E7%BB%84%E5%90%88%E7%AD%96%E7%95%A5%E8%A6%86%E7%9B%96%E6%9B%B4%E5%B9%BF",
      "/blog/xiaohongshu-keyword-placement#%E8%AF%84%E8%AE%BA%E5%8C%BA%E5%AE%B9%E6%98%93%E8%A2%AB%E5%BF%BD%E8%A7%86%E7%9A%84%E5%85%B3%E9%94%AE%E8%AF%8D%E8%A1%A5%E5%85%85%E4%BD%8D",
      "/xiaohongshu/comments",
      "/blog/xiaohongshu-keyword-placement#%E8%BF%9B%E9%98%B6%E6%90%9C%E7%B4%A2%E5%92%8C%E6%8E%A8%E8%8D%90%E7%9A%84%E5%8F%8C%E8%A7%A6%E5%8F%91",
      "/blog/xiaohongshu-keyword-placement#%E5%B0%8F%E7%BB%93",
      "/blog/xiaohongshu-topic-analysis",
      "/blog/xiaohongshu-keyword-placement#faq",
      "/blog/xiaohongshu-keyword-placement#%E5%B0%8F%E7%BA%A2%E4%B9%A6%E6%A0%87%E9%A2%98%E5%85%B3%E9%94%AE%E8%AF%8D%E6%94%BE%E5%9C%A8%E5%93%AA%E4%B8%AA%E4%BD%8D%E7%BD%AE%E6%9C%80%E6%9C%89%E6%95%88",
      "/blog/xiaohongshu-keyword-placement#%E5%B0%8F%E7%BA%A2%E4%B9%A6%E6%AD%A3%E6%96%87%E9%87%8C%E5%85%B3%E9%94%AE%E8%AF%8D%E5%87%BA%E7%8E%B0%E5%87%A0%E6%AC%A1%E5%90%88%E9%80%82",
      "/blog/xiaohongshu-keyword-placement#%E6%A0%87%E7%AD%BE%E5%88%B0%E5%BA%95%E9%87%8D%E4%B8%8D%E9%87%8D%E8%A6%81",
      "/blog/xiaohongshu-keyword-placement#%E8%AF%84%E8%AE%BA%E5%8C%BA%E7%9A%84%E6%96%87%E5%AD%97%E4%BC%9A%E5%BD%B1%E5%93%8D%E6%90%9C%E7%B4%A2%E6%8E%92%E5%90%8D%E5%90%97",
      "/blog/xiaohongshu-keyword-placement#%E5%B0%81%E9%9D%A2%E4%B8%8A%E7%9A%84%E6%96%87%E5%AD%97%E7%AE%97%E6%B3%95%E8%83%BD%E8%AF%86%E5%88%AB%E5%90%97",
      "/blog/xiaohongshu-keyword-placement#%E6%80%8E%E4%B9%88%E7%9F%A5%E9%81%93%E8%AF%A5%E5%9F%8B%E4%BB%80%E4%B9%88%E5%85%B3%E9%94%AE%E8%AF%8D",
      "/blog/xiaohongshu-ai-benchmark-to-draft",
      "/blog/xiaohongshu-comment-batch-export-campaign-review",
      "/blog/xiaohongshu-comment-analysis",
      "/xiaohongshu",
      "/xiaohongshu/viral-content-analysis",
      "/xiaohongshu/account-analysis",
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
      "/welfare?entry=footer",
      "/updates",
      "/referral",
      "/privacy-policy",
      "/terms-of-service"
    ],
    "media": [
      {
        "tag": "img",
        "kind": "img",
        "url": "https://mediaclaw.app/logo.png",
        "attr": "src",
        "alt": "MediaClaw",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://mediaclaw.app/logo.png",
        "attr": "src",
        "alt": "MediaClaw Team",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/6746583b97d20cbc3dda52fcc6cfd39d.png",
        "attr": "src",
        "alt": "小红书官方关键词布局攻略：从账号层、视觉层、内容层到流量层的完整埋词框架",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://obsidian-1316461920.cos.ap-chengdu.myqcloud.com/8266ebaaf1ea1f485660fb55d8c53a81.png",
        "attr": "src",
        "alt": "MediaClaw 关键词挖掘结果：用户需求地图与选题指南",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/0b62f6f7da5e7b9085c33c46d92baf94.png",
        "attr": "src",
        "alt": "MediaClaw 笔记采集功能：批量抓取竞品数据",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/3de41d7d7b1a2e2b3ecb04b9e0531b03.png",
        "attr": "src",
        "alt": "MediaClaw 评论采集功能：批量抓取笔记评论数据",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/79fa0f398165bc0b5a24bc5d95a56b20.webp",
        "attr": "src",
        "alt": "怎么用 AI 把对标内容 10 分钟变成自己的小红书初稿",
        "visible": false
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/c3b96151fe61b047405de1f9ccc34859.webp",
        "attr": "src",
        "alt": "小红书评论批量导出：多篇种草笔记投放后，怎么集中复盘评论区反馈",
        "visible": false
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/bea16c9a6eeb4fe8dcbd8cac6b79feb1.webp",
        "attr": "src",
        "alt": "小红书起号最快的方式不是日更，是搜一个词做选题分析",
        "visible": false
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/de3de8c0ff1a70b69b76ca706b299deb.webp",
        "attr": "src",
        "alt": "小红书评论区的采集与分析：从用户情绪、需求到潜客线索获取",
        "visible": false
      }
    ],
    "source": "https://mediaclaw.app/blog/xiaohongshu-keyword-placement"
  },
  {
    "path": "/en/blog/xiaohongshu-keyword-placement",
    "status": 200,
    "locale": "en",
    "family": "blog-article",
    "title": "Xiaohongshu (RedNote) Keyword Placement Guide: Where to Put Keywords for Maximum Search Traffic | MediaClaw",
    "h1": "Xiaohongshu (RedNote) Keyword Placement Guide: Where to Put Keywords for Maximum Search Traffic",
    "summary": "A 4-layer keyword placement framework for Xiaohongshu — from your profile and cover images to captions, hashtags, and comments. Learn exactly where to place keywords so your notes rank higher in search results.",
    "sections": [
      {
        "level": 2,
        "heading": "Profile Layer: Your Username Is a Permanent Keyword",
        "copy": "This section covers \"Profile Layer: Your Username Is a Permanent Keyword\"."
      },
      {
        "level": 2,
        "heading": "Visual Layer: Text in Images Gets Indexed Too",
        "copy": "This section covers \"Visual Layer: Text in Images Gets Indexed Too\"."
      },
      {
        "level": 3,
        "heading": "How to Place Keywords in Cover Text",
        "copy": "This section covers \"How to Place Keywords in Cover Text\"."
      },
      {
        "level": 3,
        "heading": "In-Image Text Matters",
        "copy": "This section covers \"In-Image Text Matters\"."
      },
      {
        "level": 2,
        "heading": "Content Layer: Title and Caption Are the Foundation",
        "copy": "This section covers \"Content Layer: Title and Caption Are the Foundation\"."
      },
      {
        "level": 3,
        "heading": "Title: Front-Load Your Core Keywords",
        "copy": "This section covers \"Title: Front-Load Your Core Keywords\"."
      },
      {
        "level": 3,
        "heading": "Opening Lines: Help the Algorithm Lock In Your Topic",
        "copy": "This section covers \"Opening Lines: Help the Algorithm Lock In Your Topic\"."
      },
      {
        "level": 3,
        "heading": "Body Text: Incorporate Naturally, Don't Stuff",
        "copy": "This section covers \"Body Text: Incorporate Naturally, Don't Stuff\"."
      },
      {
        "level": 2,
        "heading": "Distribution Layer: Hashtags and Comments Amplify Your Reach",
        "copy": "This section covers \"Distribution Layer: Hashtags and Comments Amplify Your Reach\"."
      },
      {
        "level": 3,
        "heading": "Hashtags: Use a Layered Strategy for Broader Coverage",
        "copy": "This section covers \"Hashtags: Use a Layered Strategy for Broader Coverage\"."
      },
      {
        "level": 3,
        "heading": "Comments: The Overlooked Keyword Boost",
        "copy": "This section covers \"Comments: The Overlooked Keyword Boost\"."
      },
      {
        "level": 2,
        "heading": "Advanced: Triggering Both Search and Recommendations",
        "copy": "This section covers \"Advanced: Triggering Both Search and Recommendations\"."
      },
      {
        "level": 2,
        "heading": "Summary",
        "copy": "This section covers \"Summary\"."
      },
      {
        "level": 2,
        "heading": "FAQ",
        "copy": "This section covers \"FAQ\"."
      },
      {
        "level": 3,
        "heading": "Where should I place keywords in a Xiaohongshu title for best results?",
        "copy": "This section covers \"Where should I place keywords in a Xiaohongshu title for best results?\"."
      },
      {
        "level": 3,
        "heading": "How many times should a keyword appear in the body text?",
        "copy": "This section covers \"How many times should a keyword appear in the body text?\"."
      },
      {
        "level": 3,
        "heading": "Do hashtags actually matter for search ranking?",
        "copy": "This section covers \"Do hashtags actually matter for search ranking?\"."
      },
      {
        "level": 3,
        "heading": "Does comment text affect search ranking?",
        "copy": "This section covers \"Does comment text affect search ranking?\"."
      },
      {
        "level": 3,
        "heading": "Can the algorithm read text on cover images?",
        "copy": "This section covers \"Can the algorithm read text on cover images?\"."
      },
      {
        "level": 3,
        "heading": "How do I know which keywords to target?",
        "copy": "This section covers \"How do I know which keywords to target?\"."
      },
      {
        "level": 2,
        "heading": "Related posts",
        "copy": "This section covers \"Related posts\"."
      },
      {
        "level": 3,
        "heading": "The Fastest Way to Grow on Xiaohongshu (RedNote) Isn't Posting Daily — It's Niche Analysis",
        "copy": "This section covers \"The Fastest Way to Grow on Xiaohongshu (RedNote) Isn't Posting Daily — It's Niche Analysis\"."
      },
      {
        "level": 3,
        "heading": "Xiaohongshu (RedNote) Search vs. Recommendation Traffic: Which Should New Accounts Prioritize?",
        "copy": "This section covers \"Xiaohongshu (RedNote) Search vs. Recommendation Traffic: Which Should New Accounts Prioritize?\"."
      },
      {
        "level": 3,
        "heading": "How to Build a Xiaohongshu (RedNote) Content Idea Bank: 5 Steps to Data-Driven Topic Planning",
        "copy": "This section covers \"How to Build a Xiaohongshu (RedNote) Content Idea Bank: 5 Steps to Data-Driven Topic Planning\"."
      },
      {
        "level": 3,
        "heading": "How to Scrape Xiaohongshu (RedNote) Comments for Free — and Turn Them into Leads",
        "copy": "This section covers \"How to Scrape Xiaohongshu (RedNote) Comments for Free — and Turn Them into Leads\"."
      },
      {
        "level": 2,
        "heading": "RELATED POSTS",
        "copy": "This section covers \"RELATED POSTS\"."
      },
      {
        "level": 3,
        "heading": "The Fastest Way to Grow on Xiaohongshu (RedNote) Isn't Posting Daily — It's Niche Analysis",
        "copy": "This section covers \"The Fastest Way to Grow on Xiaohongshu (RedNote) Isn't Posting Daily — It's Niche Analysis\"."
      },
      {
        "level": 3,
        "heading": "Xiaohongshu (RedNote) Search vs. Recommendation Traffic: Which Should New Accounts Prioritize?",
        "copy": "This section covers \"Xiaohongshu (RedNote) Search vs. Recommendation Traffic: Which Should New Accounts Prioritize?\"."
      },
      {
        "level": 3,
        "heading": "How to Build a Xiaohongshu (RedNote) Content Idea Bank: 5 Steps to Data-Driven Topic Planning",
        "copy": "This section covers \"How to Build a Xiaohongshu (RedNote) Content Idea Bank: 5 Steps to Data-Driven Topic Planning\"."
      },
      {
        "level": 3,
        "heading": "How to Scrape Xiaohongshu (RedNote) Comments for Free — and Turn Them into Leads",
        "copy": "This section covers \"How to Scrape Xiaohongshu (RedNote) Comments for Free — and Turn Them into Leads\"."
      }
    ],
    "links": [
      "/en",
      "/en/download",
      "/en/pricing",
      "/en/blog",
      "/en/blog/xiaohongshu-keyword-placement#profile-layer-your-username-is-a-permanent-keyword",
      "/en/blog/xiaohongshu-keyword-placement#visual-layer-text-in-images-gets-indexed-too",
      "/en/blog/xiaohongshu-keyword-placement#how-to-place-keywords-in-cover-text",
      "/en/blog/xiaohongshu-keyword-placement#in-image-text-matters",
      "/en/blog/xiaohongshu-keyword-placement#content-layer-title-and-caption-are-the-foundation",
      "/en/blog/xiaohongshu-keyword-placement#title-front-load-your-core-keywords",
      "/en/xiaohongshu/keywords",
      "/en/blog/xiaohongshu-keyword-placement#opening-lines-help-the-algorithm-lock-in-your-topic",
      "/en/blog/xiaohongshu-keyword-placement#body-text-incorporate-naturally-dont-stuff",
      "/en/xiaohongshu/scraper",
      "/en/blog/xiaohongshu-keyword-placement#distribution-layer-hashtags-and-comments-amplify-your-reach",
      "/en/blog/xiaohongshu-keyword-placement#hashtags-use-a-layered-strategy-for-broader-coverage",
      "/en/blog/xiaohongshu-keyword-placement#comments-the-overlooked-keyword-boost",
      "/en/xiaohongshu/comments",
      "/en/blog/xiaohongshu-keyword-placement#advanced-triggering-both-search-and-recommendations",
      "/en/blog/xiaohongshu-keyword-placement#summary",
      "/en/blog/xiaohongshu-topic-analysis",
      "/en/blog/xiaohongshu-keyword-placement#faq",
      "/en/blog/xiaohongshu-keyword-placement#where-should-i-place-keywords-in-a-xiaohongshu-title-for-best-results",
      "/en/blog/xiaohongshu-keyword-placement#how-many-times-should-a-keyword-appear-in-the-body-text",
      "/en/blog/xiaohongshu-keyword-placement#do-hashtags-actually-matter-for-search-ranking",
      "/en/blog/xiaohongshu-keyword-placement#does-comment-text-affect-search-ranking",
      "/en/blog/xiaohongshu-keyword-placement#can-the-algorithm-read-text-on-cover-images",
      "/en/blog/xiaohongshu-keyword-placement#how-do-i-know-which-keywords-to-target",
      "/en/blog/xiaohongshu-search-vs-recommendation-traffic",
      "/en/blog/xiaohongshu-topic-library-build",
      "/en/blog/xiaohongshu-comment-analysis",
      "/en/xiaohongshu",
      "/en/xiaohongshu/viral-content-analysis",
      "/en/xiaohongshu/account-analysis",
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
      "/en/welfare?entry=footer",
      "/en/updates",
      "/en/referral",
      "/en/privacy-policy",
      "/en/terms-of-service"
    ],
    "media": [
      {
        "tag": "img",
        "kind": "img",
        "url": "https://mediaclaw.app/logo.png",
        "attr": "src",
        "alt": "MediaClaw",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://mediaclaw.app/logo.png",
        "attr": "src",
        "alt": "MediaClaw Team",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/6746583b97d20cbc3dda52fcc6cfd39d.png",
        "attr": "src",
        "alt": "Xiaohongshu official keyword placement framework: a 4-layer system covering profile, visual, content, and distribution",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://obsidian-1316461920.cos.ap-chengdu.myqcloud.com/8266ebaaf1ea1f485660fb55d8c53a81.png",
        "attr": "src",
        "alt": "MediaClaw keyword research results: user demand map and content planning guide",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/0b62f6f7da5e7b9085c33c46d92baf94.png",
        "attr": "src",
        "alt": "MediaClaw note scraper: batch-collect competitor data",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/3de41d7d7b1a2e2b3ecb04b9e0531b03.png",
        "attr": "src",
        "alt": "MediaClaw comment scraper: batch-collect note comment data",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/bea16c9a6eeb4fe8dcbd8cac6b79feb1.webp",
        "attr": "src",
        "alt": "The Fastest Way to Grow on Xiaohongshu (RedNote) Isn't Posting Daily — It's Niche Analysis",
        "visible": false
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/85704773cb06cc19c3b9b013d0f9e2eb.webp",
        "attr": "src",
        "alt": "Xiaohongshu (RedNote) Search vs. Recommendation Traffic: Which Should New Accounts Prioritize?",
        "visible": false
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/72d37ab299b70901c871973d1c8ebc27.webp",
        "attr": "src",
        "alt": "How to Build a Xiaohongshu (RedNote) Content Idea Bank: 5 Steps to Data-Driven Topic Planning",
        "visible": false
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/de3de8c0ff1a70b69b76ca706b299deb.webp",
        "attr": "src",
        "alt": "How to Scrape Xiaohongshu (RedNote) Comments for Free — and Turn Them into Leads",
        "visible": false
      }
    ],
    "source": "https://mediaclaw.app/en/blog/xiaohongshu-keyword-placement"
  },
  {
    "path": "/blog/xiaohongshu-topic-analysis",
    "status": 200,
    "locale": "zh",
    "family": "blog-article",
    "title": "小红书起号最快的方式不是日更，是搜一个词做选题分析 | MediaClaw",
    "h1": "小红书起号最快的方式不是日更，是搜一个词做选题分析",
    "summary": "保姆级教程，拆解小红书选题分析怎么做：搜一个关键词看清赛道竞争格局、找到新号能切入的内容方向，附完整数据和操作路径。",
    "sections": [
      {
        "level": 2,
        "heading": "小红书选题分析能看出什么",
        "copy": "本节围绕“小红书选题分析能看出什么”展开。"
      },
      {
        "level": 2,
        "heading": "线香赛道分析：真实数据长什么样",
        "copy": "本节围绕“线香赛道分析：真实数据长什么样”展开。"
      },
      {
        "level": 2,
        "heading": "数据背后的决策逻辑",
        "copy": "本节围绕“数据背后的决策逻辑”展开。"
      },
      {
        "level": 2,
        "heading": "帮客户做内容的人，可能更需要这一步",
        "copy": "本节围绕“帮客户做内容的人，可能更需要这一步”展开。"
      },
      {
        "level": 2,
        "heading": "怎么跑出这样一份赛道报告",
        "copy": "本节围绕“怎么跑出这样一份赛道报告”展开。"
      },
      {
        "level": 2,
        "heading": "小红书新手起号，方向比勤奋重要",
        "copy": "本节围绕“小红书新手起号，方向比勤奋重要”展开。"
      },
      {
        "level": 2,
        "heading": "常见问题",
        "copy": "本节围绕“常见问题”展开。"
      },
      {
        "level": 3,
        "heading": "小红书新手起号怎么选赛道方向？",
        "copy": "本节围绕“小红书新手起号怎么选赛道方向？”展开。"
      },
      {
        "level": 3,
        "heading": "帮客户做小红书内容，怎么快速了解一个行业的内容竞争情况？",
        "copy": "本节围绕“帮客户做小红书内容，怎么快速了解一个行业的内容竞争情况？”展开。"
      },
      {
        "level": 3,
        "heading": "有没有工具能分析小红书某个关键词的内容竞争程度？",
        "copy": "本节围绕“有没有工具能分析小红书某个关键词的内容竞争程度？”展开。"
      },
      {
        "level": 2,
        "heading": "相关文章",
        "copy": "本节围绕“相关文章”展开。"
      },
      {
        "level": 3,
        "heading": "怎么用 AI 把对标内容 10 分钟变成自己的小红书初稿",
        "copy": "本节围绕“怎么用 AI 把对标内容 10 分钟变成自己的小红书初稿”展开。"
      },
      {
        "level": 3,
        "heading": "小红书评论批量导出：多篇种草笔记投放后，怎么集中复盘评论区反馈",
        "copy": "本节围绕“小红书评论批量导出：多篇种草笔记投放后，怎么集中复盘评论区反馈”展开。"
      },
      {
        "level": 3,
        "heading": "小红书关键词布局攻略：让搜索流量精准找到你的笔记",
        "copy": "本节围绕“小红书关键词布局攻略：让搜索流量精准找到你的笔记”展开。"
      },
      {
        "level": 3,
        "heading": "小红书评论区的采集与分析：从用户情绪、需求到潜客线索获取",
        "copy": "本节围绕“小红书评论区的采集与分析：从用户情绪、需求到潜客线索获取”展开。"
      },
      {
        "level": 2,
        "heading": "相关文章",
        "copy": "本节围绕“相关文章”展开。"
      },
      {
        "level": 3,
        "heading": "怎么用 AI 把对标内容 10 分钟变成自己的小红书初稿",
        "copy": "本节围绕“怎么用 AI 把对标内容 10 分钟变成自己的小红书初稿”展开。"
      },
      {
        "level": 3,
        "heading": "小红书评论批量导出：多篇种草笔记投放后，怎么集中复盘评论区反馈",
        "copy": "本节围绕“小红书评论批量导出：多篇种草笔记投放后，怎么集中复盘评论区反馈”展开。"
      },
      {
        "level": 3,
        "heading": "小红书关键词布局攻略：让搜索流量精准找到你的笔记",
        "copy": "本节围绕“小红书关键词布局攻略：让搜索流量精准找到你的笔记”展开。"
      },
      {
        "level": 3,
        "heading": "小红书评论区的采集与分析：从用户情绪、需求到潜客线索获取",
        "copy": "本节围绕“小红书评论区的采集与分析：从用户情绪、需求到潜客线索获取”展开。"
      }
    ],
    "links": [
      "/",
      "/download",
      "/pricing",
      "/blog",
      "/blog/xiaohongshu-topic-analysis#%E5%B0%8F%E7%BA%A2%E4%B9%A6%E9%80%89%E9%A2%98%E5%88%86%E6%9E%90%E8%83%BD%E7%9C%8B%E5%87%BA%E4%BB%80%E4%B9%88",
      "/blog/xiaohongshu-topic-analysis#%E7%BA%BF%E9%A6%99%E8%B5%9B%E9%81%93%E5%88%86%E6%9E%90%E7%9C%9F%E5%AE%9E%E6%95%B0%E6%8D%AE%E9%95%BF%E4%BB%80%E4%B9%88%E6%A0%B7",
      "/blog/xiaohongshu-topic-analysis#%E6%95%B0%E6%8D%AE%E8%83%8C%E5%90%8E%E7%9A%84%E5%86%B3%E7%AD%96%E9%80%BB%E8%BE%91",
      "/blog/xiaohongshu-topic-analysis#%E5%B8%AE%E5%AE%A2%E6%88%B7%E5%81%9A%E5%86%85%E5%AE%B9%E7%9A%84%E4%BA%BA%E5%8F%AF%E8%83%BD%E6%9B%B4%E9%9C%80%E8%A6%81%E8%BF%99%E4%B8%80%E6%AD%A5",
      "/blog/xiaohongshu-topic-analysis#%E6%80%8E%E4%B9%88%E8%B7%91%E5%87%BA%E8%BF%99%E6%A0%B7%E4%B8%80%E4%BB%BD%E8%B5%9B%E9%81%93%E6%8A%A5%E5%91%8A",
      "/xiaohongshu/keywords",
      "/blog/xiaohongshu-keyword-research",
      "/blog/xiaohongshu-topic-library-build",
      "/blog/xiaohongshu-topic-analysis#%E5%B0%8F%E7%BA%A2%E4%B9%A6%E6%96%B0%E6%89%8B%E8%B5%B7%E5%8F%B7%E6%96%B9%E5%90%91%E6%AF%94%E5%8B%A4%E5%A5%8B%E9%87%8D%E8%A6%81",
      "/blog/xiaohongshu-topic-analysis#%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98",
      "/blog/xiaohongshu-topic-analysis#%E5%B0%8F%E7%BA%A2%E4%B9%A6%E6%96%B0%E6%89%8B%E8%B5%B7%E5%8F%B7%E6%80%8E%E4%B9%88%E9%80%89%E8%B5%9B%E9%81%93%E6%96%B9%E5%90%91",
      "/blog/xiaohongshu-topic-analysis#%E5%B8%AE%E5%AE%A2%E6%88%B7%E5%81%9A%E5%B0%8F%E7%BA%A2%E4%B9%A6%E5%86%85%E5%AE%B9%E6%80%8E%E4%B9%88%E5%BF%AB%E9%80%9F%E4%BA%86%E8%A7%A3%E4%B8%80%E4%B8%AA%E8%A1%8C%E4%B8%9A%E7%9A%84%E5%86%85%E5%AE%B9%E7%AB%9E%E4%BA%89%E6%83%85%E5%86%B5",
      "/blog/xiaohongshu-topic-analysis#%E6%9C%89%E6%B2%A1%E6%9C%89%E5%B7%A5%E5%85%B7%E8%83%BD%E5%88%86%E6%9E%90%E5%B0%8F%E7%BA%A2%E4%B9%A6%E6%9F%90%E4%B8%AA%E5%85%B3%E9%94%AE%E8%AF%8D%E7%9A%84%E5%86%85%E5%AE%B9%E7%AB%9E%E4%BA%89%E7%A8%8B%E5%BA%A6",
      "/blog/xiaohongshu-ai-benchmark-to-draft",
      "/blog/xiaohongshu-comment-batch-export-campaign-review",
      "/blog/xiaohongshu-keyword-placement",
      "/blog/xiaohongshu-comment-analysis",
      "/xiaohongshu",
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
      "/welfare?entry=footer",
      "/updates",
      "/referral",
      "/privacy-policy",
      "/terms-of-service"
    ],
    "media": [
      {
        "tag": "img",
        "kind": "img",
        "url": "https://mediaclaw.app/logo.png",
        "attr": "src",
        "alt": "MediaClaw",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://mediaclaw.app/logo.png",
        "attr": "src",
        "alt": "MediaClaw Team",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/ce64fa13c4c26882b054ee6baf7ce095.png",
        "attr": "src",
        "alt": "MediaClaw 主词机会分析结果报告：赛道热度、内容方向分布与选题推荐",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/a214b83fb060a9ac67581a26ddc08697.png",
        "attr": "src",
        "alt": "MediaClaw 主词机会判断功能入口：关键词策略面板",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/c8c1912d9dedcfc54b03430e0358ff6a.png",
        "attr": "src",
        "alt": "MediaClaw 长尾词需求分析功能入口：关键词策略面板",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://obsidian-1316461920.cos.ap-chengdu.myqcloud.com/8cc3738fe7b294cee18db52b5555f288.png",
        "attr": "src",
        "alt": "MediaClaw 关键词智能功能：自动裂变下拉词并 AI 归类需求",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/79fa0f398165bc0b5a24bc5d95a56b20.webp",
        "attr": "src",
        "alt": "怎么用 AI 把对标内容 10 分钟变成自己的小红书初稿",
        "visible": false
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/c3b96151fe61b047405de1f9ccc34859.webp",
        "attr": "src",
        "alt": "小红书评论批量导出：多篇种草笔记投放后，怎么集中复盘评论区反馈",
        "visible": false
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/2441d01af10a786af5c75df1f9ffb7e8.webp",
        "attr": "src",
        "alt": "小红书关键词布局攻略：让搜索流量精准找到你的笔记",
        "visible": false
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/de3de8c0ff1a70b69b76ca706b299deb.webp",
        "attr": "src",
        "alt": "小红书评论区的采集与分析：从用户情绪、需求到潜客线索获取",
        "visible": false
      }
    ],
    "source": "https://mediaclaw.app/blog/xiaohongshu-topic-analysis"
  },
  {
    "path": "/en/blog/xiaohongshu-topic-analysis",
    "status": 200,
    "locale": "en",
    "family": "blog-article",
    "title": "The Fastest Way to Grow on Xiaohongshu (RedNote) Isn't Posting Daily — It's Niche Analysis | MediaClaw",
    "h1": "The Fastest Way to Grow on Xiaohongshu (RedNote) Isn't Posting Daily — It's Niche Analysis",
    "summary": "Using the incense niche as a real example, this guide breaks down how to analyze a Xiaohongshu (RedNote) niche before your first post — with real data on competition, content gaps, and where new accounts can break through.",
    "sections": [
      {
        "level": 2,
        "heading": "What a Xiaohongshu Niche Analysis Reveals",
        "copy": "This section covers \"What a Xiaohongshu Niche Analysis Reveals\"."
      },
      {
        "level": 2,
        "heading": "Incense Niche Breakdown: What the Real Data Looks Like",
        "copy": "This section covers \"Incense Niche Breakdown: What the Real Data Looks Like\"."
      },
      {
        "level": 2,
        "heading": "The Decision Logic Behind the Data",
        "copy": "This section covers \"The Decision Logic Behind the Data\"."
      },
      {
        "level": 2,
        "heading": "If You Manage Content for Clients, You Probably Need This Even More",
        "copy": "This section covers \"If You Manage Content for Clients, You Probably Need This Even More\"."
      },
      {
        "level": 2,
        "heading": "How to Generate a Niche Report Like This",
        "copy": "This section covers \"How to Generate a Niche Report Like This\"."
      },
      {
        "level": 2,
        "heading": "For New Xiaohongshu Creators, Direction Beats Consistency",
        "copy": "This section covers \"For New Xiaohongshu Creators, Direction Beats Consistency\"."
      },
      {
        "level": 2,
        "heading": "FAQ",
        "copy": "This section covers \"FAQ\"."
      },
      {
        "level": 3,
        "heading": "How do I choose the right content direction for a new Xiaohongshu (RedNote) account?",
        "copy": "This section covers \"How do I choose the right content direction for a new Xiaohongshu (RedNote) account?\"."
      },
      {
        "level": 3,
        "heading": "As a content agency, how do I quickly assess the competitive landscape of an unfamiliar industry on Xiaohongshu?",
        "copy": "This section covers \"As a content agency, how do I quickly assess the competitive landscape of an unfamiliar industry on Xiaohongshu?\"."
      },
      {
        "level": 3,
        "heading": "Is there a tool that can analyze how competitive a specific keyword is on Xiaohongshu (RedNote)?",
        "copy": "This section covers \"Is there a tool that can analyze how competitive a specific keyword is on Xiaohongshu (RedNote)?\"."
      },
      {
        "level": 2,
        "heading": "Related posts",
        "copy": "This section covers \"Related posts\"."
      },
      {
        "level": 3,
        "heading": "Xiaohongshu (RedNote) Keyword Placement Guide: Where to Put Keywords for Maximum Search Traffic",
        "copy": "This section covers \"Xiaohongshu (RedNote) Keyword Placement Guide: Where to Put Keywords for Maximum Search Traffic\"."
      },
      {
        "level": 3,
        "heading": "Xiaohongshu (RedNote) Search vs. Recommendation Traffic: Which Should New Accounts Prioritize?",
        "copy": "This section covers \"Xiaohongshu (RedNote) Search vs. Recommendation Traffic: Which Should New Accounts Prioritize?\"."
      },
      {
        "level": 3,
        "heading": "How to Build a Xiaohongshu (RedNote) Content Idea Bank: 5 Steps to Data-Driven Topic Planning",
        "copy": "This section covers \"How to Build a Xiaohongshu (RedNote) Content Idea Bank: 5 Steps to Data-Driven Topic Planning\"."
      },
      {
        "level": 3,
        "heading": "How to Scrape Xiaohongshu (RedNote) Comments for Free — and Turn Them into Leads",
        "copy": "This section covers \"How to Scrape Xiaohongshu (RedNote) Comments for Free — and Turn Them into Leads\"."
      },
      {
        "level": 2,
        "heading": "RELATED POSTS",
        "copy": "This section covers \"RELATED POSTS\"."
      },
      {
        "level": 3,
        "heading": "Xiaohongshu (RedNote) Keyword Placement Guide: Where to Put Keywords for Maximum Search Traffic",
        "copy": "This section covers \"Xiaohongshu (RedNote) Keyword Placement Guide: Where to Put Keywords for Maximum Search Traffic\"."
      },
      {
        "level": 3,
        "heading": "Xiaohongshu (RedNote) Search vs. Recommendation Traffic: Which Should New Accounts Prioritize?",
        "copy": "This section covers \"Xiaohongshu (RedNote) Search vs. Recommendation Traffic: Which Should New Accounts Prioritize?\"."
      },
      {
        "level": 3,
        "heading": "How to Build a Xiaohongshu (RedNote) Content Idea Bank: 5 Steps to Data-Driven Topic Planning",
        "copy": "This section covers \"How to Build a Xiaohongshu (RedNote) Content Idea Bank: 5 Steps to Data-Driven Topic Planning\"."
      },
      {
        "level": 3,
        "heading": "How to Scrape Xiaohongshu (RedNote) Comments for Free — and Turn Them into Leads",
        "copy": "This section covers \"How to Scrape Xiaohongshu (RedNote) Comments for Free — and Turn Them into Leads\"."
      }
    ],
    "links": [
      "/en",
      "/en/download",
      "/en/pricing",
      "/en/blog",
      "/en/blog/xiaohongshu-topic-analysis#what-a-xiaohongshu-niche-analysis-reveals",
      "/en/blog/xiaohongshu-topic-analysis#incense-niche-breakdown-what-the-real-data-looks-like",
      "/en/blog/xiaohongshu-topic-analysis#the-decision-logic-behind-the-data",
      "/en/blog/xiaohongshu-topic-analysis#if-you-manage-content-for-clients-you-probably-need-this-even-more",
      "/en/blog/xiaohongshu-topic-analysis#how-to-generate-a-niche-report-like-this",
      "/en/xiaohongshu/keywords",
      "/en/blog/xiaohongshu-keyword-research",
      "/en/blog/xiaohongshu-topic-library-build",
      "/en/blog/xiaohongshu-topic-analysis#for-new-xiaohongshu-creators-direction-beats-consistency",
      "/en/blog/xiaohongshu-topic-analysis#faq",
      "/en/blog/xiaohongshu-topic-analysis#how-do-i-choose-the-right-content-direction-for-a-new-xiaohongshu-rednote-account",
      "/en/blog/xiaohongshu-topic-analysis#as-a-content-agency-how-do-i-quickly-assess-the-competitive-landscape-of-an-unfamiliar-industry-on-xiaohongshu",
      "/en/blog/xiaohongshu-topic-analysis#is-there-a-tool-that-can-analyze-how-competitive-a-specific-keyword-is-on-xiaohongshu-rednote",
      "/en/blog/xiaohongshu-keyword-placement",
      "/en/blog/xiaohongshu-search-vs-recommendation-traffic",
      "/en/blog/xiaohongshu-comment-analysis",
      "/en/xiaohongshu",
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
      "/en/welfare?entry=footer",
      "/en/updates",
      "/en/referral",
      "/en/privacy-policy",
      "/en/terms-of-service"
    ],
    "media": [
      {
        "tag": "img",
        "kind": "img",
        "url": "https://mediaclaw.app/logo.png",
        "attr": "src",
        "alt": "MediaClaw",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://mediaclaw.app/logo.png",
        "attr": "src",
        "alt": "MediaClaw Team",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/ce64fa13c4c26882b054ee6baf7ce095.png",
        "attr": "src",
        "alt": "MediaClaw keyword opportunity analysis report: niche popularity, content distribution, and topic recommendations",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/a214b83fb060a9ac67581a26ddc08697.png",
        "attr": "src",
        "alt": "MediaClaw keyword opportunity analysis feature entry: keyword strategy panel",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/c8c1912d9dedcfc54b03430e0358ff6a.png",
        "attr": "src",
        "alt": "MediaClaw long-tail keyword demand analysis feature entry: keyword strategy panel",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://obsidian-1316461920.cos.ap-chengdu.myqcloud.com/8cc3738fe7b294cee18db52b5555f288.png",
        "attr": "src",
        "alt": "MediaClaw keyword intelligence: automatic autocomplete expansion with AI-powered intent clustering",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/2441d01af10a786af5c75df1f9ffb7e8.webp",
        "attr": "src",
        "alt": "Xiaohongshu (RedNote) Keyword Placement Guide: Where to Put Keywords for Maximum Search Traffic",
        "visible": false
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/85704773cb06cc19c3b9b013d0f9e2eb.webp",
        "attr": "src",
        "alt": "Xiaohongshu (RedNote) Search vs. Recommendation Traffic: Which Should New Accounts Prioritize?",
        "visible": false
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/72d37ab299b70901c871973d1c8ebc27.webp",
        "attr": "src",
        "alt": "How to Build a Xiaohongshu (RedNote) Content Idea Bank: 5 Steps to Data-Driven Topic Planning",
        "visible": false
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/de3de8c0ff1a70b69b76ca706b299deb.webp",
        "attr": "src",
        "alt": "How to Scrape Xiaohongshu (RedNote) Comments for Free — and Turn Them into Leads",
        "visible": false
      }
    ],
    "source": "https://mediaclaw.app/en/blog/xiaohongshu-topic-analysis"
  },
  {
    "path": "/blog/short-video-transcript-extraction",
    "status": 200,
    "locale": "zh",
    "family": "blog-article",
    "title": "短视频逐字稿提取：飞书多维表格 + 阿里百炼，每月免费 10 小时 | MediaClaw",
    "h1": "短视频逐字稿提取：飞书多维表格 + 阿里百炼，每月免费 10 小时",
    "summary": "不用再把链接丢进各种小程序看广告了。用飞书多维表格对接阿里百炼模型，每月 10 小时免费额度，批量提取短视频逐字稿。",
    "sections": [
      {
        "level": 2,
        "heading": "现在提取逐字稿有多麻烦",
        "copy": "本节围绕“现在提取逐字稿有多麻烦”展开。"
      },
      {
        "level": 2,
        "heading": "更好的方案：飞书多维表格 + 阿里百炼",
        "copy": "本节围绕“更好的方案：飞书多维表格 + 阿里百炼”展开。"
      },
      {
        "level": 2,
        "heading": "前提：你需要拿到视频的原始文件链接",
        "copy": "本节围绕“前提：你需要拿到视频的原始文件链接”展开。"
      },
      {
        "level": 2,
        "heading": "完整流程：从刷到视频到拿到逐字稿",
        "copy": "本节围绕“完整流程：从刷到视频到拿到逐字稿”展开。"
      },
      {
        "level": 2,
        "heading": "相关文章",
        "copy": "本节围绕“相关文章”展开。"
      },
      {
        "level": 3,
        "heading": "素人起号怎么模仿爆款视频？从找到对标到拍出自己的版本，5 步完整链路",
        "copy": "本节围绕“素人起号怎么模仿爆款视频？从找到对标到拍出自己的版本，5 步完整链路”展开。"
      },
      {
        "level": 3,
        "heading": "抖音数据采集怎么做？从批量采集到分析的完整流程",
        "copy": "本节围绕“抖音数据采集怎么做？从批量采集到分析的完整流程”展开。"
      },
      {
        "level": 3,
        "heading": "抖音评论怎么批量导出？采集、看不全的坑，到筛出客资线索",
        "copy": "本节围绕“抖音评论怎么批量导出？采集、看不全的坑，到筛出客资线索”展开。"
      },
      {
        "level": 3,
        "heading": "怎么用 AI 把对标内容 10 分钟变成自己的小红书初稿",
        "copy": "本节围绕“怎么用 AI 把对标内容 10 分钟变成自己的小红书初稿”展开。"
      },
      {
        "level": 2,
        "heading": "相关文章",
        "copy": "本节围绕“相关文章”展开。"
      },
      {
        "level": 3,
        "heading": "素人起号怎么模仿爆款视频？从找到对标到拍出自己的版本，5 步完整链路",
        "copy": "本节围绕“素人起号怎么模仿爆款视频？从找到对标到拍出自己的版本，5 步完整链路”展开。"
      },
      {
        "level": 3,
        "heading": "抖音数据采集怎么做？从批量采集到分析的完整流程",
        "copy": "本节围绕“抖音数据采集怎么做？从批量采集到分析的完整流程”展开。"
      },
      {
        "level": 3,
        "heading": "抖音评论怎么批量导出？采集、看不全的坑，到筛出客资线索",
        "copy": "本节围绕“抖音评论怎么批量导出？采集、看不全的坑，到筛出客资线索”展开。"
      },
      {
        "level": 3,
        "heading": "怎么用 AI 把对标内容 10 分钟变成自己的小红书初稿",
        "copy": "本节围绕“怎么用 AI 把对标内容 10 分钟变成自己的小红书初稿”展开。"
      }
    ],
    "links": [
      "/",
      "/download",
      "/pricing",
      "/blog",
      "/blog/short-video-transcript-extraction#%E7%8E%B0%E5%9C%A8%E6%8F%90%E5%8F%96%E9%80%90%E5%AD%97%E7%A8%BF%E6%9C%89%E5%A4%9A%E9%BA%BB%E7%83%A6",
      "/blog/short-video-transcript-extraction#%E6%9B%B4%E5%A5%BD%E7%9A%84%E6%96%B9%E6%A1%88%E9%A3%9E%E4%B9%A6%E5%A4%9A%E7%BB%B4%E8%A1%A8%E6%A0%BC-%E9%98%BF%E9%87%8C%E7%99%BE%E7%82%BC",
      "/blog/short-video-transcript-extraction#%E5%89%8D%E6%8F%90%E4%BD%A0%E9%9C%80%E8%A6%81%E6%8B%BF%E5%88%B0%E8%A7%86%E9%A2%91%E7%9A%84%E5%8E%9F%E5%A7%8B%E6%96%87%E4%BB%B6%E9%93%BE%E6%8E%A5",
      "/blog/short-video-transcript-extraction#%E5%AE%8C%E6%95%B4%E6%B5%81%E7%A8%8B%E4%BB%8E%E5%88%B7%E5%88%B0%E8%A7%86%E9%A2%91%E5%88%B0%E6%8B%BF%E5%88%B0%E9%80%90%E5%AD%97%E7%A8%BF",
      "/blog/how-to-copy-viral-short-videos",
      "/blog/douyin-data-collection",
      "/blog/douyin-comment-export",
      "/blog/xiaohongshu-ai-benchmark-to-draft",
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
      "/welfare?entry=footer",
      "/updates",
      "/referral",
      "/privacy-policy",
      "/terms-of-service"
    ],
    "media": [
      {
        "tag": "img",
        "kind": "img",
        "url": "https://mediaclaw.app/logo.png",
        "attr": "src",
        "alt": "MediaClaw",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://mediaclaw.app/logo.png",
        "attr": "src",
        "alt": "MediaClaw Team",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/23959730eb58ef0d6a1ee53bd0271338.png",
        "attr": "src",
        "alt": "音视频转文字字段捷径",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/0b62f6f7da5e7b9085c33c46d92baf94.png",
        "attr": "src",
        "alt": "在 mediaclaw采集数据",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/25d62b4a0aa7f5cb235fb09f6d70fc1e.png",
        "attr": "src",
        "alt": "飞书表格中逐字稿提取的字段展示",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/b76b2e8d56b648002b9b73f0c7d50dc2.png",
        "attr": "src",
        "alt": "AI 分析并优化视频脚本",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/19711c105b2577936fd23022ee7614c4.png",
        "attr": "src",
        "alt": "AI 解构+改写仿写原笔记",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/083b1971121eb0baa8a7d4c554b15363.webp",
        "attr": "src",
        "alt": "素人起号怎么模仿爆款视频？从找到对标到拍出自己的版本，5 步完整链路",
        "visible": false
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/2c20a78ecd01ec9b3c4919f1c42c2d44.webp",
        "attr": "src",
        "alt": "抖音数据采集怎么做？从批量采集到分析的完整流程",
        "visible": false
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/79fa0f398165bc0b5a24bc5d95a56b20.webp",
        "attr": "src",
        "alt": "怎么用 AI 把对标内容 10 分钟变成自己的小红书初稿",
        "visible": false
      }
    ],
    "source": "https://mediaclaw.app/blog/short-video-transcript-extraction"
  },
  {
    "path": "/en/blog/short-video-transcript-extraction",
    "status": 200,
    "locale": "en",
    "family": "blog-article",
    "title": "Extract Short Video Transcripts for Free: Lark Base + Alibaba Cloud AI (10 Hours/Month) | MediaClaw",
    "h1": "Extract Short Video Transcripts for Free: Lark Base + Alibaba Cloud AI (10 Hours/Month)",
    "summary": "Stop pasting links into ad-filled mini apps. Use Lark Base with Alibaba Bailian's speech-to-text AI to batch extract short video transcripts — 10 free hours every month.",
    "sections": [
      {
        "level": 2,
        "heading": "The Problem: Extracting Video Transcripts Is a Pain",
        "copy": "This section covers \"The Problem: Extracting Video Transcripts Is a Pain\"."
      },
      {
        "level": 2,
        "heading": "A Better Way: Lark Base + Alibaba Bailian",
        "copy": "This section covers \"A Better Way: Lark Base + Alibaba Bailian\"."
      },
      {
        "level": 2,
        "heading": "Prerequisite: You Need the Raw Video File URL",
        "copy": "This section covers \"Prerequisite: You Need the Raw Video File URL\"."
      },
      {
        "level": 2,
        "heading": "Full Workflow: From Watching a Video to Getting Its Transcript",
        "copy": "This section covers \"Full Workflow: From Watching a Video to Getting Its Transcript\"."
      },
      {
        "level": 2,
        "heading": "Related posts",
        "copy": "This section covers \"Related posts\"."
      },
      {
        "level": 3,
        "heading": "Extract Video Transcripts with Timestamps from Xiaohongshu & Douyin: Read the Pacing, Not Just the Words",
        "copy": "This section covers \"Extract Video Transcripts with Timestamps from Xiaohongshu & Douyin: Read the Pacing, Not Just the Words\"."
      },
      {
        "level": 3,
        "heading": "抖音数据采集怎么做？从批量采集到分析的完整流程",
        "copy": "This section covers \"抖音数据采集怎么做？从批量采集到分析的完整流程\"."
      },
      {
        "level": 3,
        "heading": "How to Export Douyin Comments to Excel — and Why They Don't All Load",
        "copy": "This section covers \"How to Export Douyin Comments to Excel — and Why They Don't All Load\"."
      },
      {
        "level": 3,
        "heading": "怎么用 AI 把对标内容 10 分钟变成自己的小红书初稿",
        "copy": "This section covers \"怎么用 AI 把对标内容 10 分钟变成自己的小红书初稿\"."
      },
      {
        "level": 2,
        "heading": "RELATED POSTS",
        "copy": "This section covers \"RELATED POSTS\"."
      },
      {
        "level": 3,
        "heading": "Extract Video Transcripts with Timestamps from Xiaohongshu & Douyin: Read the Pacing, Not Just the Words",
        "copy": "This section covers \"Extract Video Transcripts with Timestamps from Xiaohongshu & Douyin: Read the Pacing, Not Just the Words\"."
      },
      {
        "level": 3,
        "heading": "抖音数据采集怎么做？从批量采集到分析的完整流程",
        "copy": "This section covers \"抖音数据采集怎么做？从批量采集到分析的完整流程\"."
      },
      {
        "level": 3,
        "heading": "How to Export Douyin Comments to Excel — and Why They Don't All Load",
        "copy": "This section covers \"How to Export Douyin Comments to Excel — and Why They Don't All Load\"."
      },
      {
        "level": 3,
        "heading": "怎么用 AI 把对标内容 10 分钟变成自己的小红书初稿",
        "copy": "This section covers \"怎么用 AI 把对标内容 10 分钟变成自己的小红书初稿\"."
      }
    ],
    "links": [
      "/en",
      "/en/download",
      "/en/pricing",
      "/en/blog",
      "/en/blog/short-video-transcript-extraction#the-problem-extracting-video-transcripts-is-a-pain",
      "/en/blog/short-video-transcript-extraction#a-better-way-lark-base-alibaba-bailian",
      "/en/blog/short-video-transcript-extraction#prerequisite-you-need-the-raw-video-file-url",
      "/en/blog/short-video-transcript-extraction#full-workflow-from-watching-a-video-to-getting-its-transcript",
      "/",
      "/en/blog/video-transcript-timestamps",
      "/en/blog/douyin-data-collection",
      "/en/blog/douyin-comment-export",
      "/en/blog/xiaohongshu-ai-benchmark-to-draft",
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
      "/en/welfare?entry=footer",
      "/en/updates",
      "/en/referral",
      "/en/privacy-policy",
      "/en/terms-of-service"
    ],
    "media": [
      {
        "tag": "img",
        "kind": "img",
        "url": "https://mediaclaw.app/logo.png",
        "attr": "src",
        "alt": "MediaClaw",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://mediaclaw.app/logo.png",
        "attr": "src",
        "alt": "MediaClaw Team",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/23959730eb58ef0d6a1ee53bd0271338.png",
        "attr": "src",
        "alt": "Audio/Video to Text field shortcut in Lark Base",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/0b62f6f7da5e7b9085c33c46d92baf94.png",
        "attr": "src",
        "alt": "Scraping video data with MediaClaw",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/25d62b4a0aa7f5cb235fb09f6d70fc1e.png",
        "attr": "src",
        "alt": "Transcript extraction fields in a Lark Base table",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/b76b2e8d56b648002b9b73f0c7d50dc2.png",
        "attr": "src",
        "alt": "AI analyzing and optimizing video scripts",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/19711c105b2577936fd23022ee7614c4.png",
        "attr": "src",
        "alt": "AI deconstructing and rewriting original post",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/af29cc54385eef5fb9f8bde13ef28b79.webp",
        "attr": "src",
        "alt": "Extract Video Transcripts with Timestamps from Xiaohongshu & Douyin: Read the Pacing, Not Just the Words",
        "visible": false
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/2c20a78ecd01ec9b3c4919f1c42c2d44.webp",
        "attr": "src",
        "alt": "抖音数据采集怎么做？从批量采集到分析的完整流程",
        "visible": false
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/79fa0f398165bc0b5a24bc5d95a56b20.webp",
        "attr": "src",
        "alt": "怎么用 AI 把对标内容 10 分钟变成自己的小红书初稿",
        "visible": false
      }
    ],
    "source": "https://mediaclaw.app/en/blog/short-video-transcript-extraction"
  },
  {
    "path": "/blog/xiaohongshu-comment-topic-mining",
    "status": 200,
    "locale": "zh",
    "family": "blog-article",
    "title": "批量导出小红书评论，用AI自动挖掘爆款选题 | MediaClaw",
    "h1": "批量导出小红书评论，用AI自动挖掘爆款选题",
    "summary": "真正的爆款选题藏在评论区里。本文分享如何批量导出小红书评论，并用 AI 自动进行需求归类、推导选题方向，让内容创作有据可依。",
    "sections": [
      {
        "level": 2,
        "heading": "为什么很多团队总在硬想选题",
        "copy": "本节围绕“为什么很多团队总在硬想选题”展开。"
      },
      {
        "level": 2,
        "heading": "评论区里最值得拿来做选题的四类信号",
        "copy": "本节围绕“评论区里最值得拿来做选题的四类信号”展开。"
      },
      {
        "level": 3,
        "heading": "高频提问：用户在告诉你他缺什么内容",
        "copy": "本节围绕“高频提问：用户在告诉你他缺什么内容”展开。"
      },
      {
        "level": 3,
        "heading": "反复出现的疑问：就是内容机会",
        "copy": "本节围绕“反复出现的疑问：就是内容机会”展开。"
      },
      {
        "level": 3,
        "heading": "场景化追问：内容颗粒度还不够细",
        "copy": "本节围绕“场景化追问：内容颗粒度还不够细”展开。"
      },
      {
        "level": 3,
        "heading": "接近决策的问题：高商业价值选题",
        "copy": "本节围绕“接近决策的问题：高商业价值选题”展开。"
      },
      {
        "level": 2,
        "heading": "完整流程：从评论区到选题清单，四步跑通",
        "copy": "本节围绕“完整流程：从评论区到选题清单，四步跑通”展开。"
      },
      {
        "level": 3,
        "heading": "第一步：选对评论样本",
        "copy": "本节围绕“第一步：选对评论样本”展开。"
      },
      {
        "level": 3,
        "heading": "第二步：批量采集评论，同步飞书",
        "copy": "本节围绕“第二步：批量采集评论，同步飞书”展开。"
      },
      {
        "level": 3,
        "heading": "第三步：AI 三维分析，自动产出选题",
        "copy": "本节围绕“第三步：AI 三维分析，自动产出选题”展开。"
      },
      {
        "level": 3,
        "heading": "第四步：筛选优先级，排入内容计划",
        "copy": "本节围绕“第四步：筛选优先级，排入内容计划”展开。"
      },
      {
        "level": 2,
        "heading": "让这套流程持续运转，而不是做一次就吃灰",
        "copy": "本节围绕“让这套流程持续运转，而不是做一次就吃灰”展开。"
      },
      {
        "level": 2,
        "heading": "现在就试一下",
        "copy": "本节围绕“现在就试一下”展开。"
      },
      {
        "level": 2,
        "heading": "相关文章",
        "copy": "本节围绕“相关文章”展开。"
      },
      {
        "level": 3,
        "heading": "怎么用 AI 把对标内容 10 分钟变成自己的小红书初稿",
        "copy": "本节围绕“怎么用 AI 把对标内容 10 分钟变成自己的小红书初稿”展开。"
      },
      {
        "level": 3,
        "heading": "小红书图片文字提取：把卡片里的干货一次性提成文字",
        "copy": "本节围绕“小红书图片文字提取：把卡片里的干货一次性提成文字”展开。"
      },
      {
        "level": 3,
        "heading": "小红书评论批量导出：多篇种草笔记投放后，怎么集中复盘评论区反馈",
        "copy": "本节围绕“小红书评论批量导出：多篇种草笔记投放后，怎么集中复盘评论区反馈”展开。"
      },
      {
        "level": 3,
        "heading": "本地商家小红书获客：从同城爆款采集到全国搜索词布局",
        "copy": "本节围绕“本地商家小红书获客：从同城爆款采集到全国搜索词布局”展开。"
      },
      {
        "level": 2,
        "heading": "相关文章",
        "copy": "本节围绕“相关文章”展开。"
      },
      {
        "level": 3,
        "heading": "怎么用 AI 把对标内容 10 分钟变成自己的小红书初稿",
        "copy": "本节围绕“怎么用 AI 把对标内容 10 分钟变成自己的小红书初稿”展开。"
      },
      {
        "level": 3,
        "heading": "小红书图片文字提取：把卡片里的干货一次性提成文字",
        "copy": "本节围绕“小红书图片文字提取：把卡片里的干货一次性提成文字”展开。"
      },
      {
        "level": 3,
        "heading": "小红书评论批量导出：多篇种草笔记投放后，怎么集中复盘评论区反馈",
        "copy": "本节围绕“小红书评论批量导出：多篇种草笔记投放后，怎么集中复盘评论区反馈”展开。"
      },
      {
        "level": 3,
        "heading": "本地商家小红书获客：从同城爆款采集到全国搜索词布局",
        "copy": "本节围绕“本地商家小红书获客：从同城爆款采集到全国搜索词布局”展开。"
      }
    ],
    "links": [
      "/",
      "/download",
      "/pricing",
      "/blog",
      "/blog/xiaohongshu-comment-topic-mining#%E4%B8%BA%E4%BB%80%E4%B9%88%E5%BE%88%E5%A4%9A%E5%9B%A2%E9%98%9F%E6%80%BB%E5%9C%A8%E7%A1%AC%E6%83%B3%E9%80%89%E9%A2%98",
      "/blog/xiaohongshu-comment-topic-mining#%E8%AF%84%E8%AE%BA%E5%8C%BA%E9%87%8C%E6%9C%80%E5%80%BC%E5%BE%97%E6%8B%BF%E6%9D%A5%E5%81%9A%E9%80%89%E9%A2%98%E7%9A%84%E5%9B%9B%E7%B1%BB%E4%BF%A1%E5%8F%B7",
      "/blog/xiaohongshu-comment-topic-mining#%E9%AB%98%E9%A2%91%E6%8F%90%E9%97%AE%E7%94%A8%E6%88%B7%E5%9C%A8%E5%91%8A%E8%AF%89%E4%BD%A0%E4%BB%96%E7%BC%BA%E4%BB%80%E4%B9%88%E5%86%85%E5%AE%B9",
      "/blog/xiaohongshu-comment-topic-mining#%E5%8F%8D%E5%A4%8D%E5%87%BA%E7%8E%B0%E7%9A%84%E7%96%91%E9%97%AE%E5%B0%B1%E6%98%AF%E5%86%85%E5%AE%B9%E6%9C%BA%E4%BC%9A",
      "/blog/xiaohongshu-comment-topic-mining#%E5%9C%BA%E6%99%AF%E5%8C%96%E8%BF%BD%E9%97%AE%E5%86%85%E5%AE%B9%E9%A2%97%E7%B2%92%E5%BA%A6%E8%BF%98%E4%B8%8D%E5%A4%9F%E7%BB%86",
      "/blog/xiaohongshu-comment-topic-mining#%E6%8E%A5%E8%BF%91%E5%86%B3%E7%AD%96%E7%9A%84%E9%97%AE%E9%A2%98%E9%AB%98%E5%95%86%E4%B8%9A%E4%BB%B7%E5%80%BC%E9%80%89%E9%A2%98",
      "/blog/xiaohongshu-comment-topic-mining#%E5%AE%8C%E6%95%B4%E6%B5%81%E7%A8%8B%E4%BB%8E%E8%AF%84%E8%AE%BA%E5%8C%BA%E5%88%B0%E9%80%89%E9%A2%98%E6%B8%85%E5%8D%95%E5%9B%9B%E6%AD%A5%E8%B7%91%E9%80%9A",
      "/blog/xiaohongshu-comment-topic-mining#%E7%AC%AC%E4%B8%80%E6%AD%A5%E9%80%89%E5%AF%B9%E8%AF%84%E8%AE%BA%E6%A0%B7%E6%9C%AC",
      "/blog/xiaohongshu-comment-topic-mining#%E7%AC%AC%E4%BA%8C%E6%AD%A5%E6%89%B9%E9%87%8F%E9%87%87%E9%9B%86%E8%AF%84%E8%AE%BA%E5%90%8C%E6%AD%A5%E9%A3%9E%E4%B9%A6",
      "/xiaohongshu/comments",
      "/blog/xiaohongshu-comment-topic-mining#%E7%AC%AC%E4%B8%89%E6%AD%A5ai-%E4%B8%89%E7%BB%B4%E5%88%86%E6%9E%90%E8%87%AA%E5%8A%A8%E4%BA%A7%E5%87%BA%E9%80%89%E9%A2%98",
      "/blog/xiaohongshu-comment-topic-mining#%E7%AC%AC%E5%9B%9B%E6%AD%A5%E7%AD%9B%E9%80%89%E4%BC%98%E5%85%88%E7%BA%A7%E6%8E%92%E5%85%A5%E5%86%85%E5%AE%B9%E8%AE%A1%E5%88%92",
      "/blog/xiaohongshu-comment-topic-mining#%E8%AE%A9%E8%BF%99%E5%A5%97%E6%B5%81%E7%A8%8B%E6%8C%81%E7%BB%AD%E8%BF%90%E8%BD%AC%E8%80%8C%E4%B8%8D%E6%98%AF%E5%81%9A%E4%B8%80%E6%AC%A1%E5%B0%B1%E5%90%83%E7%81%B0",
      "/blog/xiaohongshu-topic-library-build",
      "/blog/xiaohongshu-comment-topic-mining#%E7%8E%B0%E5%9C%A8%E5%B0%B1%E8%AF%95%E4%B8%80%E4%B8%8B",
      "/blog/xiaohongshu-ai-benchmark-to-draft",
      "/blog/xiaohongshu-image-text-extraction",
      "/blog/xiaohongshu-comment-batch-export-campaign-review",
      "/blog/local-business-xiaohongshu-marketing",
      "/xiaohongshu",
      "/xiaohongshu/keywords",
      "/xiaohongshu/viral-content-analysis",
      "/xiaohongshu/account-analysis",
      "/xiaohongshu/scraper",
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
      "/welfare?entry=footer",
      "/updates",
      "/referral",
      "/privacy-policy",
      "/terms-of-service"
    ],
    "media": [
      {
        "tag": "img",
        "kind": "img",
        "url": "https://mediaclaw.app/logo.png",
        "attr": "src",
        "alt": "MediaClaw",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://mediaclaw.app/logo.png",
        "attr": "src",
        "alt": "MediaClaw Team",
        "visible": true
      },
      {
        "tag": "video",
        "kind": "video",
        "url": "https://media.mediaclaw.app/videos/mediaclaw-demo-20260424.mp4#t=134",
        "attr": "src",
        "alt": "",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/93f57fc5401439db3673acadfed3f966.png",
        "attr": "src",
        "alt": "飞书表格中采集下的评论",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/23d0bcf3291bf2cf71a6e62e2123e6f0.png",
        "attr": "src",
        "alt": "按评论数筛选笔记",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/3de41d7d7b1a2e2b3ecb04b9e0531b03.png",
        "attr": "src",
        "alt": "评论采集",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/b84c0689a81917be33e38ae73423d6f8.png",
        "attr": "src",
        "alt": "飞书评论分析",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/79fa0f398165bc0b5a24bc5d95a56b20.webp",
        "attr": "src",
        "alt": "怎么用 AI 把对标内容 10 分钟变成自己的小红书初稿",
        "visible": false
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/da8d325540cf457864b841ed8de9136c.webp",
        "attr": "src",
        "alt": "小红书图片文字提取：把卡片里的干货一次性提成文字",
        "visible": false
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/c3b96151fe61b047405de1f9ccc34859.webp",
        "attr": "src",
        "alt": "小红书评论批量导出：多篇种草笔记投放后，怎么集中复盘评论区反馈",
        "visible": false
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/5ea1f0203d7db4660949558fe33126aa.webp",
        "attr": "src",
        "alt": "本地商家小红书获客：从同城爆款采集到全国搜索词布局",
        "visible": false
      },
      {
        "tag": "video",
        "kind": "poster",
        "url": "https://mediaclaw.app/imgs/video-posters/mediaclaw-demo-20260424-t134.webp",
        "attr": "poster",
        "alt": "",
        "visible": true
      }
    ],
    "source": "https://mediaclaw.app/blog/xiaohongshu-comment-topic-mining"
  },
  {
    "path": "/en/blog/xiaohongshu-comment-topic-mining",
    "status": 200,
    "locale": "en",
    "family": "blog-article",
    "title": "How to Export Xiaohongshu Comments for AI Topic Mining | MediaClaw",
    "h1": "How to Export Xiaohongshu Comments for AI Topic Mining",
    "summary": "The best viral topics are hidden in the comment section. This guide shows you how to export Xiaohongshu (RedNote) comments and use AI to uncover user needs, so your content strategy becomes completely data-driven.",
    "sections": [
      {
        "level": 2,
        "heading": "Why Teams Keep Guessing Content Topics",
        "copy": "This section covers \"Why Teams Keep Guessing Content Topics\"."
      },
      {
        "level": 2,
        "heading": "4 Types of Signals in the Comments Best Suited for Topic Mining",
        "copy": "This section covers \"4 Types of Signals in the Comments Best Suited for Topic Mining\"."
      },
      {
        "level": 3,
        "heading": "High-Frequency Questions: Users Telling You What They Lack",
        "copy": "This section covers \"High-Frequency Questions: Users Telling You What They Lack\"."
      },
      {
        "level": 3,
        "heading": "Recurring Doubts: Your Content Opportunities",
        "copy": "This section covers \"Recurring Doubts: Your Content Opportunities\"."
      },
      {
        "level": 3,
        "heading": "Scenario-Based Queries: Your Content Granularity Isn't Fine Enough",
        "copy": "This section covers \"Scenario-Based Queries: Your Content Granularity Isn't Fine Enough\"."
      },
      {
        "level": 3,
        "heading": "Near-Decision Questions: High Commercial Value Topics",
        "copy": "This section covers \"Near-Decision Questions: High Commercial Value Topics\"."
      },
      {
        "level": 2,
        "heading": "The Complete Workflow: From Comments to Topic List in 4 Steps",
        "copy": "This section covers \"The Complete Workflow: From Comments to Topic List in 4 Steps\"."
      },
      {
        "level": 3,
        "heading": "Step 1: Pick the Right Comment Samples",
        "copy": "This section covers \"Step 1: Pick the Right Comment Samples\"."
      },
      {
        "level": 3,
        "heading": "Step 2: Batch Export Comments and Sync to Feishu (Lark)",
        "copy": "This section covers \"Step 2: Batch Export Comments and Sync to Feishu (Lark)\"."
      },
      {
        "level": 3,
        "heading": "Step 3: 3D AI Analysis for Automated Topic Discovery",
        "copy": "This section covers \"Step 3: 3D AI Analysis for Automated Topic Discovery\"."
      },
      {
        "level": 3,
        "heading": "Step 4: Prioritize and Schedule",
        "copy": "This section covers \"Step 4: Prioritize and Schedule\"."
      },
      {
        "level": 2,
        "heading": "Keep the Flywheel Spinning, Don't Let It Gather Dust",
        "copy": "This section covers \"Keep the Flywheel Spinning, Don't Let It Gather Dust\"."
      },
      {
        "level": 2,
        "heading": "Try It Out Now",
        "copy": "This section covers \"Try It Out Now\"."
      },
      {
        "level": 2,
        "heading": "Related posts",
        "copy": "This section covers \"Related posts\"."
      },
      {
        "level": 3,
        "heading": "Xiaohongshu (RedNote) Keyword Placement Guide: Where to Put Keywords for Maximum Search Traffic",
        "copy": "This section covers \"Xiaohongshu (RedNote) Keyword Placement Guide: Where to Put Keywords for Maximum Search Traffic\"."
      },
      {
        "level": 3,
        "heading": "The Fastest Way to Grow on Xiaohongshu (RedNote) Isn't Posting Daily — It's Niche Analysis",
        "copy": "This section covers \"The Fastest Way to Grow on Xiaohongshu (RedNote) Isn't Posting Daily — It's Niche Analysis\"."
      },
      {
        "level": 3,
        "heading": "How to Build a Xiaohongshu (RedNote) Content Idea Bank: 5 Steps to Data-Driven Topic Planning",
        "copy": "This section covers \"How to Build a Xiaohongshu (RedNote) Content Idea Bank: 5 Steps to Data-Driven Topic Planning\"."
      },
      {
        "level": 3,
        "heading": "抖音数据采集怎么做？从批量采集到分析的完整流程",
        "copy": "This section covers \"抖音数据采集怎么做？从批量采集到分析的完整流程\"."
      },
      {
        "level": 2,
        "heading": "RELATED POSTS",
        "copy": "This section covers \"RELATED POSTS\"."
      },
      {
        "level": 3,
        "heading": "Xiaohongshu (RedNote) Keyword Placement Guide: Where to Put Keywords for Maximum Search Traffic",
        "copy": "This section covers \"Xiaohongshu (RedNote) Keyword Placement Guide: Where to Put Keywords for Maximum Search Traffic\"."
      },
      {
        "level": 3,
        "heading": "The Fastest Way to Grow on Xiaohongshu (RedNote) Isn't Posting Daily — It's Niche Analysis",
        "copy": "This section covers \"The Fastest Way to Grow on Xiaohongshu (RedNote) Isn't Posting Daily — It's Niche Analysis\"."
      },
      {
        "level": 3,
        "heading": "How to Build a Xiaohongshu (RedNote) Content Idea Bank: 5 Steps to Data-Driven Topic Planning",
        "copy": "This section covers \"How to Build a Xiaohongshu (RedNote) Content Idea Bank: 5 Steps to Data-Driven Topic Planning\"."
      },
      {
        "level": 3,
        "heading": "抖音数据采集怎么做？从批量采集到分析的完整流程",
        "copy": "This section covers \"抖音数据采集怎么做？从批量采集到分析的完整流程\"."
      }
    ],
    "links": [
      "/en",
      "/en/download",
      "/en/pricing",
      "/en/blog",
      "/en/blog/xiaohongshu-comment-topic-mining#why-teams-keep-guessing-content-topics",
      "/en/blog/xiaohongshu-comment-topic-mining#4-types-of-signals-in-the-comments-best-suited-for-topic-mining",
      "/en/blog/xiaohongshu-comment-topic-mining#high-frequency-questions-users-telling-you-what-they-lack",
      "/en/blog/xiaohongshu-comment-topic-mining#recurring-doubts-your-content-opportunities",
      "/en/blog/xiaohongshu-comment-topic-mining#scenario-based-queries-your-content-granularity-isnt-fine-enough",
      "/en/blog/xiaohongshu-comment-topic-mining#near-decision-questions-high-commercial-value-topics",
      "/en/blog/xiaohongshu-comment-topic-mining#the-complete-workflow-from-comments-to-topic-list-in-4-steps",
      "/en/blog/xiaohongshu-comment-topic-mining#step-1-pick-the-right-comment-samples",
      "/en/blog/xiaohongshu-comment-topic-mining#step-2-batch-export-comments-and-sync-to-feishu-lark",
      "/en/xiaohongshu/comments",
      "/en/blog/xiaohongshu-comment-topic-mining#step-3-3d-ai-analysis-for-automated-topic-discovery",
      "/en/blog/xiaohongshu-comment-topic-mining#step-4-prioritize-and-schedule",
      "/en/blog/xiaohongshu-comment-topic-mining#keep-the-flywheel-spinning-dont-let-it-gather-dust",
      "/en/blog/xiaohongshu-topic-library-build",
      "/en/blog/xiaohongshu-comment-topic-mining#try-it-out-now",
      "/en/blog/xiaohongshu-keyword-placement",
      "/en/blog/xiaohongshu-topic-analysis",
      "/en/blog/douyin-data-collection",
      "/en/xiaohongshu",
      "/en/xiaohongshu/keywords",
      "/en/xiaohongshu/viral-content-analysis",
      "/en/xiaohongshu/account-analysis",
      "/en/xiaohongshu/scraper",
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
      "/en/welfare?entry=footer",
      "/en/updates",
      "/en/referral",
      "/en/privacy-policy",
      "/en/terms-of-service"
    ],
    "media": [
      {
        "tag": "img",
        "kind": "img",
        "url": "https://mediaclaw.app/logo.png",
        "attr": "src",
        "alt": "MediaClaw",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://mediaclaw.app/logo.png",
        "attr": "src",
        "alt": "MediaClaw Team",
        "visible": true
      },
      {
        "tag": "video",
        "kind": "video",
        "url": "https://media.mediaclaw.app/videos/mediaclaw-demo-20260424.mp4#t=134",
        "attr": "src",
        "alt": "",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/93f57fc5401439db3673acadfed3f966.png",
        "attr": "src",
        "alt": "Scraped comments synced in Feishu Base",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/23d0bcf3291bf2cf71a6e62e2123e6f0.png",
        "attr": "src",
        "alt": "Filtering posts by comment count",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/3de41d7d7b1a2e2b3ecb04b9e0531b03.png",
        "attr": "src",
        "alt": "Scraping Xiaohongshu comments",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/b84c0689a81917be33e38ae73423d6f8.png",
        "attr": "src",
        "alt": "AI analysis of comments in Feishu",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/2441d01af10a786af5c75df1f9ffb7e8.webp",
        "attr": "src",
        "alt": "Xiaohongshu (RedNote) Keyword Placement Guide: Where to Put Keywords for Maximum Search Traffic",
        "visible": false
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/bea16c9a6eeb4fe8dcbd8cac6b79feb1.webp",
        "attr": "src",
        "alt": "The Fastest Way to Grow on Xiaohongshu (RedNote) Isn't Posting Daily — It's Niche Analysis",
        "visible": false
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/72d37ab299b70901c871973d1c8ebc27.webp",
        "attr": "src",
        "alt": "How to Build a Xiaohongshu (RedNote) Content Idea Bank: 5 Steps to Data-Driven Topic Planning",
        "visible": false
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/2c20a78ecd01ec9b3c4919f1c42c2d44.webp",
        "attr": "src",
        "alt": "抖音数据采集怎么做？从批量采集到分析的完整流程",
        "visible": false
      },
      {
        "tag": "video",
        "kind": "poster",
        "url": "https://mediaclaw.app/imgs/video-posters/mediaclaw-demo-20260424-t134.webp",
        "attr": "poster",
        "alt": "",
        "visible": true
      }
    ],
    "source": "https://mediaclaw.app/en/blog/xiaohongshu-comment-topic-mining"
  },
  {
    "path": "/blog/xiaohongshu-keyword-research",
    "status": 200,
    "locale": "zh",
    "family": "blog-article",
    "title": "怎么找小红书的精准搜索流量 | MediaClaw",
    "h1": "怎么找小红书的精准搜索流量",
    "summary": "手把手教你用小红书搜索框的下拉词和 A-Z 裂变法挖掘长尾关键词，找到有精准受众的选题方向。附自动化拓词工具推荐。",
    "sections": [
      {
        "level": 2,
        "heading": "\"我不指望出爆文，但我可以走量\"",
        "copy": "本节围绕“\"我不指望出爆文，但我可以走量\"”展开。"
      },
      {
        "level": 2,
        "heading": "创作者最容易踩的坑：用自己的视角替代用户的搜索词",
        "copy": "本节围绕“创作者最容易踩的坑：用自己的视角替代用户的搜索词”展开。"
      },
      {
        "level": 2,
        "heading": "小红书关键词挖掘的五步操作流程",
        "copy": "本节围绕“小红书关键词挖掘的五步操作流程”展开。"
      },
      {
        "level": 3,
        "heading": "第一步：搜核心词，看下拉推荐",
        "copy": "本节围绕“第一步：搜核心词，看下拉推荐”展开。"
      },
      {
        "level": 3,
        "heading": "第二步：A-Z 裂变，展开全部长尾词",
        "copy": "本节围绕“第二步：A-Z 裂变，展开全部长尾词”展开。"
      },
      {
        "level": 3,
        "heading": "第三步：看前排内容，判断供给质量",
        "copy": "本节围绕“第三步：看前排内容，判断供给质量”展开。"
      },
      {
        "level": 3,
        "heading": "第四步：按竞争分级，找内容缺口",
        "copy": "本节围绕“第四步：按竞争分级，找内容缺口”展开。"
      },
      {
        "level": 3,
        "heading": "第五步：回到用户诉求，而不是堆砌关键词",
        "copy": "本节围绕“第五步：回到用户诉求，而不是堆砌关键词”展开。"
      },
      {
        "level": 2,
        "heading": "手动跑一周你就会发现",
        "copy": "本节围绕“手动跑一周你就会发现”展开。"
      },
      {
        "level": 2,
        "heading": "抽奖 vs 种地",
        "copy": "本节围绕“抽奖 vs 种地”展开。"
      },
      {
        "level": 2,
        "heading": "相关文章",
        "copy": "本节围绕“相关文章”展开。"
      },
      {
        "level": 3,
        "heading": "专业内容博主怎么做搜索流量：把术语翻译成大白话",
        "copy": "本节围绕“专业内容博主怎么做搜索流量：把术语翻译成大白话”展开。"
      },
      {
        "level": 3,
        "heading": "怎么用 AI 把对标内容 10 分钟变成自己的小红书初稿",
        "copy": "本节围绕“怎么用 AI 把对标内容 10 分钟变成自己的小红书初稿”展开。"
      },
      {
        "level": 3,
        "heading": "写论文怎么从小红书和抖音采集研究数据",
        "copy": "本节围绕“写论文怎么从小红书和抖音采集研究数据”展开。"
      },
      {
        "level": 3,
        "heading": "小红书品牌词怎么监控？内容风向舆情扫描",
        "copy": "本节围绕“小红书品牌词怎么监控？内容风向舆情扫描”展开。"
      },
      {
        "level": 2,
        "heading": "相关文章",
        "copy": "本节围绕“相关文章”展开。"
      },
      {
        "level": 3,
        "heading": "专业内容博主怎么做搜索流量：把术语翻译成大白话",
        "copy": "本节围绕“专业内容博主怎么做搜索流量：把术语翻译成大白话”展开。"
      },
      {
        "level": 3,
        "heading": "怎么用 AI 把对标内容 10 分钟变成自己的小红书初稿",
        "copy": "本节围绕“怎么用 AI 把对标内容 10 分钟变成自己的小红书初稿”展开。"
      },
      {
        "level": 3,
        "heading": "写论文怎么从小红书和抖音采集研究数据",
        "copy": "本节围绕“写论文怎么从小红书和抖音采集研究数据”展开。"
      },
      {
        "level": 3,
        "heading": "小红书品牌词怎么监控？内容风向舆情扫描",
        "copy": "本节围绕“小红书品牌词怎么监控？内容风向舆情扫描”展开。"
      }
    ],
    "links": [
      "/",
      "/download",
      "/pricing",
      "/blog",
      "/blog/xiaohongshu-keyword-research#%E6%88%91%E4%B8%8D%E6%8C%87%E6%9C%9B%E5%87%BA%E7%88%86%E6%96%87%E4%BD%86%E6%88%91%E5%8F%AF%E4%BB%A5%E8%B5%B0%E9%87%8F",
      "/blog/xiaohongshu-keyword-research#%E5%88%9B%E4%BD%9C%E8%80%85%E6%9C%80%E5%AE%B9%E6%98%93%E8%B8%A9%E7%9A%84%E5%9D%91%E7%94%A8%E8%87%AA%E5%B7%B1%E7%9A%84%E8%A7%86%E8%A7%92%E6%9B%BF%E4%BB%A3%E7%94%A8%E6%88%B7%E7%9A%84%E6%90%9C%E7%B4%A2%E8%AF%8D",
      "/blog/xiaohongshu-keyword-research#%E5%B0%8F%E7%BA%A2%E4%B9%A6%E5%85%B3%E9%94%AE%E8%AF%8D%E6%8C%96%E6%8E%98%E7%9A%84%E4%BA%94%E6%AD%A5%E6%93%8D%E4%BD%9C%E6%B5%81%E7%A8%8B",
      "/blog/xiaohongshu-keyword-research#%E7%AC%AC%E4%B8%80%E6%AD%A5%E6%90%9C%E6%A0%B8%E5%BF%83%E8%AF%8D%E7%9C%8B%E4%B8%8B%E6%8B%89%E6%8E%A8%E8%8D%90",
      "/blog/xiaohongshu-keyword-research#%E7%AC%AC%E4%BA%8C%E6%AD%A5a-z-%E8%A3%82%E5%8F%98%E5%B1%95%E5%BC%80%E5%85%A8%E9%83%A8%E9%95%BF%E5%B0%BE%E8%AF%8D",
      "/blog/xiaohongshu-keyword-research#%E7%AC%AC%E4%B8%89%E6%AD%A5%E7%9C%8B%E5%89%8D%E6%8E%92%E5%86%85%E5%AE%B9%E5%88%A4%E6%96%AD%E4%BE%9B%E7%BB%99%E8%B4%A8%E9%87%8F",
      "/blog/xiaohongshu-keyword-research#%E7%AC%AC%E5%9B%9B%E6%AD%A5%E6%8C%89%E7%AB%9E%E4%BA%89%E5%88%86%E7%BA%A7%E6%89%BE%E5%86%85%E5%AE%B9%E7%BC%BA%E5%8F%A3",
      "/blog/xiaohongshu-keyword-research#%E7%AC%AC%E4%BA%94%E6%AD%A5%E5%9B%9E%E5%88%B0%E7%94%A8%E6%88%B7%E8%AF%89%E6%B1%82%E8%80%8C%E4%B8%8D%E6%98%AF%E5%A0%86%E7%A0%8C%E5%85%B3%E9%94%AE%E8%AF%8D",
      "/blog/xiaohongshu-keyword-research#%E6%89%8B%E5%8A%A8%E8%B7%91%E4%B8%80%E5%91%A8%E4%BD%A0%E5%B0%B1%E4%BC%9A%E5%8F%91%E7%8E%B0",
      "/xiaohongshu/keywords",
      "/blog/xiaohongshu-keyword-research#%E6%8A%BD%E5%A5%96-vs-%E7%A7%8D%E5%9C%B0",
      "/blog/xiaohongshu-professional-content-search-traffic",
      "/blog/xiaohongshu-ai-benchmark-to-draft",
      "/blog/xiaohongshu-research-data-collection",
      "/blog/xiaohongshu-brand-sentiment-monitoring",
      "/xiaohongshu",
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
      "/welfare?entry=footer",
      "/updates",
      "/referral",
      "/privacy-policy",
      "/terms-of-service"
    ],
    "media": [
      {
        "tag": "img",
        "kind": "img",
        "url": "https://mediaclaw.app/logo.png",
        "attr": "src",
        "alt": "MediaClaw",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://mediaclaw.app/logo.png",
        "attr": "src",
        "alt": "MediaClaw Team",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://obsidian-1316461920.cos.ap-chengdu.myqcloud.com/20260416124321494.png",
        "attr": "src",
        "alt": "小红书搜索框下拉词推荐示例",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://obsidian-1316461920.cos.ap-chengdu.myqcloud.com/20260416124947862.png",
        "attr": "src",
        "alt": "小红书关键词 A-Z 裂变操作示意图",
        "visible": true
      },
      {
        "tag": "video",
        "kind": "video",
        "url": "https://media.mediaclaw.app/videos/mediaclaw-demo-20260424.mp4#t=39",
        "attr": "src",
        "alt": "",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://obsidian-1316461920.cos.ap-chengdu.myqcloud.com/8cc3738fe7b294cee18db52b5555f288.png",
        "attr": "src",
        "alt": "MediaClaw 关键词智能功能：自动裂变下拉词并 AI 归类需求",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://obsidian-1316461920.cos.ap-chengdu.myqcloud.com/8266ebaaf1ea1f485660fb55d8c53a81.png",
        "attr": "src",
        "alt": "MediaClaw 关键词挖掘结果：用户需求地图与选题指南",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/d23371d046da8f607eacc982c82284a5.webp",
        "attr": "src",
        "alt": "专业内容博主怎么做搜索流量：把术语翻译成大白话",
        "visible": false
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/79fa0f398165bc0b5a24bc5d95a56b20.webp",
        "attr": "src",
        "alt": "怎么用 AI 把对标内容 10 分钟变成自己的小红书初稿",
        "visible": false
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/e7e0a072c414efc013b983c4cc434dff.webp",
        "attr": "src",
        "alt": "写论文怎么从小红书和抖音采集研究数据",
        "visible": false
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/a6d9c82262d00f64bb1558b2b15efc40.webp",
        "attr": "src",
        "alt": "小红书品牌词怎么监控？内容风向舆情扫描",
        "visible": false
      },
      {
        "tag": "video",
        "kind": "poster",
        "url": "https://mediaclaw.app/imgs/video-posters/mediaclaw-demo-20260424-t039.webp",
        "attr": "poster",
        "alt": "",
        "visible": true
      }
    ],
    "source": "https://mediaclaw.app/blog/xiaohongshu-keyword-research"
  },
  {
    "path": "/en/blog/xiaohongshu-keyword-research",
    "status": 200,
    "locale": "en",
    "family": "blog-article",
    "title": "Xiaohongshu Keyword Research: Find Hundreds of Content Ideas from Search Suggestions | MediaClaw",
    "h1": "Xiaohongshu Keyword Research: Find Hundreds of Content Ideas from Search Suggestions",
    "summary": "Use Xiaohongshu's search autocomplete and the A-Z expansion method to uncover long-tail keywords your audience is actually searching for. Includes a free automation tool.",
    "sections": [
      {
        "level": 2,
        "heading": "\"I'm Not Chasing Virality — I'm Claiming Search Territory\"",
        "copy": "This section covers \"\"I'm Not Chasing Virality — I'm Claiming Search Territory\"\"."
      },
      {
        "level": 2,
        "heading": "The Blind Spot Most Creators Have",
        "copy": "This section covers \"The Blind Spot Most Creators Have\"."
      },
      {
        "level": 2,
        "heading": "A 5-Step Xiaohongshu Keyword Research Process",
        "copy": "This section covers \"A 5-Step Xiaohongshu Keyword Research Process\"."
      },
      {
        "level": 3,
        "heading": "Step 1: Search Your Core Term and Read the Suggestions",
        "copy": "This section covers \"Step 1: Search Your Core Term and Read the Suggestions\"."
      },
      {
        "level": 3,
        "heading": "Step 2: A-Z Expansion — Uncover Every Long-Tail Keyword",
        "copy": "This section covers \"Step 2: A-Z Expansion — Uncover Every Long-Tail Keyword\"."
      },
      {
        "level": 3,
        "heading": "Step 3: Check the Top Results — Evaluate Content Quality",
        "copy": "This section covers \"Step 3: Check the Top Results — Evaluate Content Quality\"."
      },
      {
        "level": 3,
        "heading": "Step 4: Classify by Competition — Find the Content Gaps",
        "copy": "This section covers \"Step 4: Classify by Competition — Find the Content Gaps\"."
      },
      {
        "level": 3,
        "heading": "Step 5: Focus on the User's Real Need, Not Keyword Stuffing",
        "copy": "This section covers \"Step 5: Focus on the User's Real Need, Not Keyword Stuffing\"."
      },
      {
        "level": 2,
        "heading": "Try This Manually for a Week and You'll See the Problem",
        "copy": "This section covers \"Try This Manually for a Week and You'll See the Problem\"."
      },
      {
        "level": 2,
        "heading": "Lottery vs. Farming",
        "copy": "This section covers \"Lottery vs. Farming\"."
      },
      {
        "level": 2,
        "heading": "Related posts",
        "copy": "This section covers \"Related posts\"."
      },
      {
        "level": 3,
        "heading": "How Expert Creators Get Search Traffic on Xiaohongshu: Translate Jargon into Plain Language",
        "copy": "This section covers \"How Expert Creators Get Search Traffic on Xiaohongshu: Translate Jargon into Plain Language\"."
      },
      {
        "level": 3,
        "heading": "How to Build a Xiaohongshu (RedNote) Content Idea Bank: 5 Steps to Data-Driven Topic Planning",
        "copy": "This section covers \"How to Build a Xiaohongshu (RedNote) Content Idea Bank: 5 Steps to Data-Driven Topic Planning\"."
      },
      {
        "level": 3,
        "heading": "How to Collect Research Data from Xiaohongshu (RedNote) and Douyin for Your Thesis",
        "copy": "This section covers \"How to Collect Research Data from Xiaohongshu (RedNote) and Douyin for Your Thesis\"."
      },
      {
        "level": 3,
        "heading": "Reviewing Influencer Campaign Feedback: Bulk Export Xiaohongshu (RedNote) Comments Across Posts",
        "copy": "This section covers \"Reviewing Influencer Campaign Feedback: Bulk Export Xiaohongshu (RedNote) Comments Across Posts\"."
      },
      {
        "level": 2,
        "heading": "RELATED POSTS",
        "copy": "This section covers \"RELATED POSTS\"."
      },
      {
        "level": 3,
        "heading": "How Expert Creators Get Search Traffic on Xiaohongshu: Translate Jargon into Plain Language",
        "copy": "This section covers \"How Expert Creators Get Search Traffic on Xiaohongshu: Translate Jargon into Plain Language\"."
      },
      {
        "level": 3,
        "heading": "How to Build a Xiaohongshu (RedNote) Content Idea Bank: 5 Steps to Data-Driven Topic Planning",
        "copy": "This section covers \"How to Build a Xiaohongshu (RedNote) Content Idea Bank: 5 Steps to Data-Driven Topic Planning\"."
      },
      {
        "level": 3,
        "heading": "How to Collect Research Data from Xiaohongshu (RedNote) and Douyin for Your Thesis",
        "copy": "This section covers \"How to Collect Research Data from Xiaohongshu (RedNote) and Douyin for Your Thesis\"."
      },
      {
        "level": 3,
        "heading": "Reviewing Influencer Campaign Feedback: Bulk Export Xiaohongshu (RedNote) Comments Across Posts",
        "copy": "This section covers \"Reviewing Influencer Campaign Feedback: Bulk Export Xiaohongshu (RedNote) Comments Across Posts\"."
      }
    ],
    "links": [
      "/en",
      "/en/download",
      "/en/pricing",
      "/en/blog",
      "/en/blog/xiaohongshu-keyword-research#im-not-chasing-virality-im-claiming-search-territory",
      "/en/blog/xiaohongshu-keyword-research#the-blind-spot-most-creators-have",
      "/en/blog/xiaohongshu-keyword-research#a-5-step-xiaohongshu-keyword-research-process",
      "/en/blog/xiaohongshu-keyword-research#step-1-search-your-core-term-and-read-the-suggestions",
      "/en/blog/xiaohongshu-keyword-research#step-2-a-z-expansion-uncover-every-long-tail-keyword",
      "/en/blog/xiaohongshu-keyword-research#step-3-check-the-top-results-evaluate-content-quality",
      "/en/blog/xiaohongshu-keyword-research#step-4-classify-by-competition-find-the-content-gaps",
      "/en/blog/xiaohongshu-keyword-research#step-5-focus-on-the-users-real-need-not-keyword-stuffing",
      "/en/blog/xiaohongshu-keyword-research#try-this-manually-for-a-week-and-youll-see-the-problem",
      "/en/xiaohongshu/keywords",
      "/en/blog/xiaohongshu-keyword-research#lottery-vs-farming",
      "/en/blog/xiaohongshu-professional-content-search-traffic",
      "/en/blog/xiaohongshu-topic-library-build",
      "/en/blog/xiaohongshu-research-data-collection",
      "/en/blog/xiaohongshu-comment-batch-export-campaign-review",
      "/en/xiaohongshu",
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
      "/en/welfare?entry=footer",
      "/en/updates",
      "/en/referral",
      "/en/privacy-policy",
      "/en/terms-of-service"
    ],
    "media": [
      {
        "tag": "img",
        "kind": "img",
        "url": "https://mediaclaw.app/logo.png",
        "attr": "src",
        "alt": "MediaClaw",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://mediaclaw.app/logo.png",
        "attr": "src",
        "alt": "MediaClaw Team",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://obsidian-1316461920.cos.ap-chengdu.myqcloud.com/20260416124321494.png",
        "attr": "src",
        "alt": "Xiaohongshu search bar showing autocomplete keyword suggestions",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://obsidian-1316461920.cos.ap-chengdu.myqcloud.com/20260416124947862.png",
        "attr": "src",
        "alt": "A-Z keyword expansion method on Xiaohongshu search bar",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://obsidian-1316461920.cos.ap-chengdu.myqcloud.com/8cc3738fe7b294cee18db52b5555f288.png",
        "attr": "src",
        "alt": "MediaClaw Keyword Intelligence: automated search suggestion expansion with AI intent clustering",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://obsidian-1316461920.cos.ap-chengdu.myqcloud.com/8266ebaaf1ea1f485660fb55d8c53a81.png",
        "attr": "src",
        "alt": "MediaClaw keyword research results: a user demand map as a content planning guide",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/d23371d046da8f607eacc982c82284a5.webp",
        "attr": "src",
        "alt": "How Expert Creators Get Search Traffic on Xiaohongshu: Translate Jargon into Plain Language",
        "visible": false
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/72d37ab299b70901c871973d1c8ebc27.webp",
        "attr": "src",
        "alt": "How to Build a Xiaohongshu (RedNote) Content Idea Bank: 5 Steps to Data-Driven Topic Planning",
        "visible": false
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/e7e0a072c414efc013b983c4cc434dff.webp",
        "attr": "src",
        "alt": "How to Collect Research Data from Xiaohongshu (RedNote) and Douyin for Your Thesis",
        "visible": false
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/c3b96151fe61b047405de1f9ccc34859.webp",
        "attr": "src",
        "alt": "Reviewing Influencer Campaign Feedback: Bulk Export Xiaohongshu (RedNote) Comments Across Posts",
        "visible": false
      }
    ],
    "source": "https://mediaclaw.app/en/blog/xiaohongshu-keyword-research"
  },
  {
    "path": "/blog/xiaohongshu-competitor-monitoring",
    "status": 200,
    "locale": "zh",
    "family": "blog-article",
    "title": "从零搭建小红书竞品监控体系：对标账号更新怎么自动追踪 | MediaClaw",
    "h1": "从零搭建小红书竞品监控体系：对标账号更新怎么自动追踪",
    "summary": "小红书竞品监控怎么做？本文从账号分层、规则设置到飞书日报推送，讲清自动追踪对标账号更新的完整方法。",
    "sections": [
      {
        "level": 2,
        "heading": "手工盯竞品，为什么迟早会失真",
        "copy": "本节围绕“手工盯竞品，为什么迟早会失真”展开。"
      },
      {
        "level": 2,
        "heading": "用工具接管重复动作",
        "copy": "本节围绕“用工具接管重复动作”展开。"
      },
      {
        "level": 2,
        "heading": "监控跑起来之后，怎么用好结果",
        "copy": "本节围绕“监控跑起来之后，怎么用好结果”展开。"
      },
      {
        "level": 3,
        "heading": "自己的账号也能用这个功能吗？",
        "copy": "本节围绕“自己的账号也能用这个功能吗？”展开。"
      },
      {
        "level": 2,
        "heading": "小结",
        "copy": "本节围绕“小结”展开。"
      },
      {
        "level": 2,
        "heading": "相关文章",
        "copy": "本节围绕“相关文章”展开。"
      },
      {
        "level": 3,
        "heading": "怎么用 AI 把对标内容 10 分钟变成自己的小红书初稿",
        "copy": "本节围绕“怎么用 AI 把对标内容 10 分钟变成自己的小红书初稿”展开。"
      },
      {
        "level": 3,
        "heading": "写论文怎么从小红书和抖音采集研究数据",
        "copy": "本节围绕“写论文怎么从小红书和抖音采集研究数据”展开。"
      },
      {
        "level": 3,
        "heading": "小红书品牌词怎么监控？内容风向舆情扫描",
        "copy": "本节围绕“小红书品牌词怎么监控？内容风向舆情扫描”展开。"
      },
      {
        "level": 3,
        "heading": "专业内容博主怎么做搜索流量：把术语翻译成大白话",
        "copy": "本节围绕“专业内容博主怎么做搜索流量：把术语翻译成大白话”展开。"
      },
      {
        "level": 2,
        "heading": "相关文章",
        "copy": "本节围绕“相关文章”展开。"
      },
      {
        "level": 3,
        "heading": "怎么用 AI 把对标内容 10 分钟变成自己的小红书初稿",
        "copy": "本节围绕“怎么用 AI 把对标内容 10 分钟变成自己的小红书初稿”展开。"
      },
      {
        "level": 3,
        "heading": "写论文怎么从小红书和抖音采集研究数据",
        "copy": "本节围绕“写论文怎么从小红书和抖音采集研究数据”展开。"
      },
      {
        "level": 3,
        "heading": "小红书品牌词怎么监控？内容风向舆情扫描",
        "copy": "本节围绕“小红书品牌词怎么监控？内容风向舆情扫描”展开。"
      },
      {
        "level": 3,
        "heading": "专业内容博主怎么做搜索流量：把术语翻译成大白话",
        "copy": "本节围绕“专业内容博主怎么做搜索流量：把术语翻译成大白话”展开。"
      }
    ],
    "links": [
      "/",
      "/download",
      "/pricing",
      "/blog",
      "/blog/xiaohongshu-competitor-monitoring#%E6%89%8B%E5%B7%A5%E7%9B%AF%E7%AB%9E%E5%93%81%E4%B8%BA%E4%BB%80%E4%B9%88%E8%BF%9F%E6%97%A9%E4%BC%9A%E5%A4%B1%E7%9C%9F",
      "/blog/xiaohongshu-competitor-monitoring#%E7%94%A8%E5%B7%A5%E5%85%B7%E6%8E%A5%E7%AE%A1%E9%87%8D%E5%A4%8D%E5%8A%A8%E4%BD%9C",
      "/xiaohongshu/monitoring",
      "/blog/xiaohongshu-competitor-monitoring#%E7%9B%91%E6%8E%A7%E8%B7%91%E8%B5%B7%E6%9D%A5%E4%B9%8B%E5%90%8E%E6%80%8E%E4%B9%88%E7%94%A8%E5%A5%BD%E7%BB%93%E6%9E%9C",
      "/blog/xiaohongshu-competitor-monitoring#%E8%87%AA%E5%B7%B1%E7%9A%84%E8%B4%A6%E5%8F%B7%E4%B9%9F%E8%83%BD%E7%94%A8%E8%BF%99%E4%B8%AA%E5%8A%9F%E8%83%BD%E5%90%97",
      "/blog/xiaohongshu-competitor-monitoring#%E5%B0%8F%E7%BB%93",
      "/blog/xiaohongshu-ai-benchmark-to-draft",
      "/blog/xiaohongshu-research-data-collection",
      "/blog/xiaohongshu-brand-sentiment-monitoring",
      "/blog/xiaohongshu-professional-content-search-traffic",
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
      "/welfare?entry=footer",
      "/updates",
      "/referral",
      "/privacy-policy",
      "/terms-of-service"
    ],
    "media": [
      {
        "tag": "img",
        "kind": "img",
        "url": "https://mediaclaw.app/logo.png",
        "attr": "src",
        "alt": "MediaClaw",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://mediaclaw.app/logo.png",
        "attr": "src",
        "alt": "MediaClaw Team",
        "visible": true
      },
      {
        "tag": "video",
        "kind": "video",
        "url": "https://media.mediaclaw.app/videos/mediaclaw-demo-20260424.mp4#t=4",
        "attr": "src",
        "alt": "",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://mediaclaw.app/imgs/features/12-v20260424.webp",
        "attr": "src",
        "alt": "飞书监控日报推送与 MediaClaw 插件监控列表，展示竞品账号自动追踪全流程",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/a29667b629a462d142296efb35332171.png",
        "attr": "src",
        "alt": "监控命中内容自动进入飞书多维表格并即刻生成 AI 分析",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/79fa0f398165bc0b5a24bc5d95a56b20.webp",
        "attr": "src",
        "alt": "怎么用 AI 把对标内容 10 分钟变成自己的小红书初稿",
        "visible": false
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/e7e0a072c414efc013b983c4cc434dff.webp",
        "attr": "src",
        "alt": "写论文怎么从小红书和抖音采集研究数据",
        "visible": false
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/a6d9c82262d00f64bb1558b2b15efc40.webp",
        "attr": "src",
        "alt": "小红书品牌词怎么监控？内容风向舆情扫描",
        "visible": false
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/d23371d046da8f607eacc982c82284a5.webp",
        "attr": "src",
        "alt": "专业内容博主怎么做搜索流量：把术语翻译成大白话",
        "visible": false
      },
      {
        "tag": "video",
        "kind": "poster",
        "url": "https://mediaclaw.app/imgs/video-posters/mediaclaw-demo-20260424-t004.webp",
        "attr": "poster",
        "alt": "",
        "visible": true
      }
    ],
    "source": "https://mediaclaw.app/blog/xiaohongshu-competitor-monitoring"
  },
  {
    "path": "/en/blog/xiaohongshu-competitor-monitoring",
    "status": 200,
    "locale": "en",
    "family": "blog-article",
    "title": "How to Build a Xiaohongshu (RedNote) Competitor Monitoring System from Scratch | MediaClaw",
    "h1": "How to Build a Xiaohongshu (RedNote) Competitor Monitoring System from Scratch",
    "summary": "Track competitor accounts on Xiaohongshu automatically — from setting up monitoring rules to receiving daily Lark reports with AI-powered analysis.",
    "sections": [
      {
        "level": 2,
        "heading": "Why Manual Competitor Tracking Always Falls Behind",
        "copy": "This section covers \"Why Manual Competitor Tracking Always Falls Behind\"."
      },
      {
        "level": 2,
        "heading": "Let Tools Handle the Repetitive Work",
        "copy": "This section covers \"Let Tools Handle the Repetitive Work\"."
      },
      {
        "level": 2,
        "heading": "Making the Most of Your Monitoring Results",
        "copy": "This section covers \"Making the Most of Your Monitoring Results\"."
      },
      {
        "level": 3,
        "heading": "Can I Use This for My Own Accounts Too?",
        "copy": "This section covers \"Can I Use This for My Own Accounts Too?\"."
      },
      {
        "level": 2,
        "heading": "Wrapping Up",
        "copy": "This section covers \"Wrapping Up\"."
      },
      {
        "level": 2,
        "heading": "Related posts",
        "copy": "This section covers \"Related posts\"."
      },
      {
        "level": 3,
        "heading": "How to Collect Research Data from Xiaohongshu (RedNote) and Douyin for Your Thesis",
        "copy": "This section covers \"How to Collect Research Data from Xiaohongshu (RedNote) and Douyin for Your Thesis\"."
      },
      {
        "level": 3,
        "heading": "How Expert Creators Get Search Traffic on Xiaohongshu: Translate Jargon into Plain Language",
        "copy": "This section covers \"How Expert Creators Get Search Traffic on Xiaohongshu: Translate Jargon into Plain Language\"."
      },
      {
        "level": 3,
        "heading": "Reviewing Influencer Campaign Feedback: Bulk Export Xiaohongshu (RedNote) Comments Across Posts",
        "copy": "This section covers \"Reviewing Influencer Campaign Feedback: Bulk Export Xiaohongshu (RedNote) Comments Across Posts\"."
      },
      {
        "level": 3,
        "heading": "Xiaohongshu (RedNote) Search vs. Recommendation Traffic: Which Should New Accounts Prioritize?",
        "copy": "This section covers \"Xiaohongshu (RedNote) Search vs. Recommendation Traffic: Which Should New Accounts Prioritize?\"."
      },
      {
        "level": 2,
        "heading": "RELATED POSTS",
        "copy": "This section covers \"RELATED POSTS\"."
      },
      {
        "level": 3,
        "heading": "How to Collect Research Data from Xiaohongshu (RedNote) and Douyin for Your Thesis",
        "copy": "This section covers \"How to Collect Research Data from Xiaohongshu (RedNote) and Douyin for Your Thesis\"."
      },
      {
        "level": 3,
        "heading": "How Expert Creators Get Search Traffic on Xiaohongshu: Translate Jargon into Plain Language",
        "copy": "This section covers \"How Expert Creators Get Search Traffic on Xiaohongshu: Translate Jargon into Plain Language\"."
      },
      {
        "level": 3,
        "heading": "Reviewing Influencer Campaign Feedback: Bulk Export Xiaohongshu (RedNote) Comments Across Posts",
        "copy": "This section covers \"Reviewing Influencer Campaign Feedback: Bulk Export Xiaohongshu (RedNote) Comments Across Posts\"."
      },
      {
        "level": 3,
        "heading": "Xiaohongshu (RedNote) Search vs. Recommendation Traffic: Which Should New Accounts Prioritize?",
        "copy": "This section covers \"Xiaohongshu (RedNote) Search vs. Recommendation Traffic: Which Should New Accounts Prioritize?\"."
      }
    ],
    "links": [
      "/en",
      "/en/download",
      "/en/pricing",
      "/en/blog",
      "/en/blog/xiaohongshu-competitor-monitoring#why-manual-competitor-tracking-always-falls-behind",
      "/en/blog/xiaohongshu-competitor-monitoring#let-tools-handle-the-repetitive-work",
      "/en/xiaohongshu/monitoring",
      "/en/blog/xiaohongshu-competitor-monitoring#making-the-most-of-your-monitoring-results",
      "/en/blog/xiaohongshu-competitor-monitoring#can-i-use-this-for-my-own-accounts-too",
      "/en/blog/xiaohongshu-competitor-monitoring#wrapping-up",
      "/en/blog/xiaohongshu-research-data-collection",
      "/en/blog/xiaohongshu-professional-content-search-traffic",
      "/en/blog/xiaohongshu-comment-batch-export-campaign-review",
      "/en/blog/xiaohongshu-search-vs-recommendation-traffic",
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
      "/en/welfare?entry=footer",
      "/en/updates",
      "/en/referral",
      "/en/privacy-policy",
      "/en/terms-of-service"
    ],
    "media": [
      {
        "tag": "img",
        "kind": "img",
        "url": "https://mediaclaw.app/logo.png",
        "attr": "src",
        "alt": "MediaClaw",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://mediaclaw.app/logo.png",
        "attr": "src",
        "alt": "MediaClaw Team",
        "visible": true
      },
      {
        "tag": "video",
        "kind": "video",
        "url": "https://media.mediaclaw.app/videos/mediaclaw-demo-20260424.mp4#t=4",
        "attr": "src",
        "alt": "",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://mediaclaw.app/imgs/features/12-v20260424.webp",
        "attr": "src",
        "alt": "Lark daily monitoring report and MediaClaw extension monitoring list showing the full competitor account tracking workflow",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/a29667b629a462d142296efb35332171.png",
        "attr": "src",
        "alt": "Monitored content automatically synced to Lark spreadsheet with instant AI analysis",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/e7e0a072c414efc013b983c4cc434dff.webp",
        "attr": "src",
        "alt": "How to Collect Research Data from Xiaohongshu (RedNote) and Douyin for Your Thesis",
        "visible": false
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/d23371d046da8f607eacc982c82284a5.webp",
        "attr": "src",
        "alt": "How Expert Creators Get Search Traffic on Xiaohongshu: Translate Jargon into Plain Language",
        "visible": false
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/c3b96151fe61b047405de1f9ccc34859.webp",
        "attr": "src",
        "alt": "Reviewing Influencer Campaign Feedback: Bulk Export Xiaohongshu (RedNote) Comments Across Posts",
        "visible": false
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/85704773cb06cc19c3b9b013d0f9e2eb.webp",
        "attr": "src",
        "alt": "Xiaohongshu (RedNote) Search vs. Recommendation Traffic: Which Should New Accounts Prioritize?",
        "visible": false
      },
      {
        "tag": "video",
        "kind": "poster",
        "url": "https://mediaclaw.app/imgs/video-posters/mediaclaw-demo-20260424-t004.webp",
        "attr": "poster",
        "alt": "",
        "visible": true
      }
    ],
    "source": "https://mediaclaw.app/en/blog/xiaohongshu-competitor-monitoring"
  },
  {
    "path": "/blog/xiaohongshu-comment-analysis",
    "status": 200,
    "locale": "zh",
    "family": "blog-article",
    "title": "小红书评论区的采集与分析：从用户情绪、需求到潜客线索获取 | MediaClaw",
    "h1": "小红书评论区的采集与分析：从用户情绪、需求到潜客线索获取",
    "summary": "免费采集小红书评论并筛选高意向客资，附详细操作流程。",
    "sections": [
      {
        "level": 2,
        "heading": "小红书评论区分析的四个层次",
        "copy": "本节围绕“小红书评论区分析的四个层次”展开。"
      },
      {
        "level": 3,
        "heading": "情绪信号：用户到底信不信你",
        "copy": "本节围绕“情绪信号：用户到底信不信你”展开。"
      },
      {
        "level": 3,
        "heading": "产品需求：用户决策前的真实顾虑",
        "copy": "本节围绕“产品需求：用户决策前的真实顾虑”展开。"
      },
      {
        "level": 3,
        "heading": "内容选题：下一篇写什么，评论区已经告诉你了",
        "copy": "本节围绕“内容选题：下一篇写什么，评论区已经告诉你了”展开。"
      },
      {
        "level": 3,
        "heading": "高意向客户线索：接近转化的那批人",
        "copy": "本节围绕“高意向客户线索：接近转化的那批人”展开。"
      },
      {
        "level": 2,
        "heading": "评论区分析的完整操作流程",
        "copy": "本节围绕“评论区分析的完整操作流程”展开。"
      },
      {
        "level": 2,
        "heading": "小结",
        "copy": "本节围绕“小结”展开。"
      },
      {
        "level": 2,
        "heading": "相关文章",
        "copy": "本节围绕“相关文章”展开。"
      },
      {
        "level": 3,
        "heading": "小红书评论批量导出：多篇种草笔记投放后，怎么集中复盘评论区反馈",
        "copy": "本节围绕“小红书评论批量导出：多篇种草笔记投放后，怎么集中复盘评论区反馈”展开。"
      },
      {
        "level": 3,
        "heading": "抖音评论怎么批量导出？采集、看不全的坑，到筛出客资线索",
        "copy": "本节围绕“抖音评论怎么批量导出？采集、看不全的坑，到筛出客资线索”展开。"
      },
      {
        "level": 3,
        "heading": "怎么用 AI 把对标内容 10 分钟变成自己的小红书初稿",
        "copy": "本节围绕“怎么用 AI 把对标内容 10 分钟变成自己的小红书初稿”展开。"
      },
      {
        "level": 3,
        "heading": "小红书关键词布局攻略：让搜索流量精准找到你的笔记",
        "copy": "本节围绕“小红书关键词布局攻略：让搜索流量精准找到你的笔记”展开。"
      },
      {
        "level": 2,
        "heading": "相关文章",
        "copy": "本节围绕“相关文章”展开。"
      },
      {
        "level": 3,
        "heading": "小红书评论批量导出：多篇种草笔记投放后，怎么集中复盘评论区反馈",
        "copy": "本节围绕“小红书评论批量导出：多篇种草笔记投放后，怎么集中复盘评论区反馈”展开。"
      },
      {
        "level": 3,
        "heading": "抖音评论怎么批量导出？采集、看不全的坑，到筛出客资线索",
        "copy": "本节围绕“抖音评论怎么批量导出？采集、看不全的坑，到筛出客资线索”展开。"
      },
      {
        "level": 3,
        "heading": "怎么用 AI 把对标内容 10 分钟变成自己的小红书初稿",
        "copy": "本节围绕“怎么用 AI 把对标内容 10 分钟变成自己的小红书初稿”展开。"
      },
      {
        "level": 3,
        "heading": "小红书关键词布局攻略：让搜索流量精准找到你的笔记",
        "copy": "本节围绕“小红书关键词布局攻略：让搜索流量精准找到你的笔记”展开。"
      }
    ],
    "links": [
      "/",
      "/download",
      "/pricing",
      "/blog",
      "/blog/xiaohongshu-comment-analysis#%E5%B0%8F%E7%BA%A2%E4%B9%A6%E8%AF%84%E8%AE%BA%E5%8C%BA%E5%88%86%E6%9E%90%E7%9A%84%E5%9B%9B%E4%B8%AA%E5%B1%82%E6%AC%A1",
      "/blog/xiaohongshu-comment-analysis#%E6%83%85%E7%BB%AA%E4%BF%A1%E5%8F%B7%E7%94%A8%E6%88%B7%E5%88%B0%E5%BA%95%E4%BF%A1%E4%B8%8D%E4%BF%A1%E4%BD%A0",
      "/blog/xiaohongshu-comment-analysis#%E4%BA%A7%E5%93%81%E9%9C%80%E6%B1%82%E7%94%A8%E6%88%B7%E5%86%B3%E7%AD%96%E5%89%8D%E7%9A%84%E7%9C%9F%E5%AE%9E%E9%A1%BE%E8%99%91",
      "/blog/xiaohongshu-comment-analysis#%E5%86%85%E5%AE%B9%E9%80%89%E9%A2%98%E4%B8%8B%E4%B8%80%E7%AF%87%E5%86%99%E4%BB%80%E4%B9%88%E8%AF%84%E8%AE%BA%E5%8C%BA%E5%B7%B2%E7%BB%8F%E5%91%8A%E8%AF%89%E4%BD%A0%E4%BA%86",
      "/blog/xiaohongshu-comment-analysis#%E9%AB%98%E6%84%8F%E5%90%91%E5%AE%A2%E6%88%B7%E7%BA%BF%E7%B4%A2%E6%8E%A5%E8%BF%91%E8%BD%AC%E5%8C%96%E7%9A%84%E9%82%A3%E6%89%B9%E4%BA%BA",
      "/blog/xiaohongshu-comment-analysis#%E8%AF%84%E8%AE%BA%E5%8C%BA%E5%88%86%E6%9E%90%E7%9A%84%E5%AE%8C%E6%95%B4%E6%93%8D%E4%BD%9C%E6%B5%81%E7%A8%8B",
      "/xiaohongshu/comments",
      "/blog/xiaohongshu-comment-analysis#%E5%B0%8F%E7%BB%93",
      "/blog/xiaohongshu-comment-batch-export-campaign-review",
      "/blog/douyin-comment-export",
      "/blog/xiaohongshu-ai-benchmark-to-draft",
      "/blog/xiaohongshu-keyword-placement",
      "/xiaohongshu",
      "/xiaohongshu/keywords",
      "/xiaohongshu/viral-content-analysis",
      "/xiaohongshu/account-analysis",
      "/xiaohongshu/scraper",
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
      "/welfare?entry=footer",
      "/updates",
      "/referral",
      "/privacy-policy",
      "/terms-of-service"
    ],
    "media": [
      {
        "tag": "img",
        "kind": "img",
        "url": "https://mediaclaw.app/logo.png",
        "attr": "src",
        "alt": "MediaClaw",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://mediaclaw.app/logo.png",
        "attr": "src",
        "alt": "MediaClaw Team",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/23d0bcf3291bf2cf71a6e62e2123e6f0.png",
        "attr": "src",
        "alt": "按评论数筛选笔记",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/3de41d7d7b1a2e2b3ecb04b9e0531b03.png",
        "attr": "src",
        "alt": "评论采集",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/b84c0689a81917be33e38ae73423d6f8.png",
        "attr": "src",
        "alt": "飞书评论分析",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/c1c2896e8fe250b31ec46d7b450c4f8a.png",
        "attr": "src",
        "alt": "客资筛选",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/947dcfa060eb8494d59fc805a5a01c83.png",
        "attr": "src",
        "alt": "私信联系",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/c3b96151fe61b047405de1f9ccc34859.webp",
        "attr": "src",
        "alt": "小红书评论批量导出：多篇种草笔记投放后，怎么集中复盘评论区反馈",
        "visible": false
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/79fa0f398165bc0b5a24bc5d95a56b20.webp",
        "attr": "src",
        "alt": "怎么用 AI 把对标内容 10 分钟变成自己的小红书初稿",
        "visible": false
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/2441d01af10a786af5c75df1f9ffb7e8.webp",
        "attr": "src",
        "alt": "小红书关键词布局攻略：让搜索流量精准找到你的笔记",
        "visible": false
      }
    ],
    "source": "https://mediaclaw.app/blog/xiaohongshu-comment-analysis"
  },
  {
    "path": "/en/blog/xiaohongshu-comment-analysis",
    "status": 200,
    "locale": "en",
    "family": "blog-article",
    "title": "How to Scrape Xiaohongshu (RedNote) Comments for Free — and Turn Them into Leads | MediaClaw",
    "h1": "How to Scrape Xiaohongshu (RedNote) Comments for Free — and Turn Them into Leads",
    "summary": "Scrape Xiaohongshu comments for free with a step-by-step workflow to analyze sentiment, uncover user needs, and extract high-intent leads.",
    "sections": [
      {
        "level": 2,
        "heading": "Four Layers of Xiaohongshu Comment Analysis",
        "copy": "This section covers \"Four Layers of Xiaohongshu Comment Analysis\"."
      },
      {
        "level": 3,
        "heading": "Sentiment Signals: Do Users Actually Trust You?",
        "copy": "This section covers \"Sentiment Signals: Do Users Actually Trust You?\"."
      },
      {
        "level": 3,
        "heading": "Product Demands: What Users Really Worry About Before Deciding",
        "copy": "This section covers \"Product Demands: What Users Really Worry About Before Deciding\"."
      },
      {
        "level": 3,
        "heading": "Content Ideas: Your Next Post Is Already in the Comments",
        "copy": "This section covers \"Content Ideas: Your Next Post Is Already in the Comments\"."
      },
      {
        "level": 3,
        "heading": "High-Intent Leads: The People Closest to Converting",
        "copy": "This section covers \"High-Intent Leads: The People Closest to Converting\"."
      },
      {
        "level": 2,
        "heading": "The Complete Workflow: Scrape Xiaohongshu Comments and Analyze Them",
        "copy": "This section covers \"The Complete Workflow: Scrape Xiaohongshu Comments and Analyze Them\"."
      },
      {
        "level": 2,
        "heading": "Takeaway",
        "copy": "This section covers \"Takeaway\"."
      },
      {
        "level": 2,
        "heading": "Related posts",
        "copy": "This section covers \"Related posts\"."
      },
      {
        "level": 3,
        "heading": "Xiaohongshu (RedNote) Search vs. Recommendation Traffic: Which Should New Accounts Prioritize?",
        "copy": "This section covers \"Xiaohongshu (RedNote) Search vs. Recommendation Traffic: Which Should New Accounts Prioritize?\"."
      },
      {
        "level": 3,
        "heading": "Xiaohongshu (RedNote) Keyword Placement Guide: Where to Put Keywords for Maximum Search Traffic",
        "copy": "This section covers \"Xiaohongshu (RedNote) Keyword Placement Guide: Where to Put Keywords for Maximum Search Traffic\"."
      },
      {
        "level": 3,
        "heading": "The Fastest Way to Grow on Xiaohongshu (RedNote) Isn't Posting Daily — It's Niche Analysis",
        "copy": "This section covers \"The Fastest Way to Grow on Xiaohongshu (RedNote) Isn't Posting Daily — It's Niche Analysis\"."
      },
      {
        "level": 3,
        "heading": "How to Build a Xiaohongshu (RedNote) Content Idea Bank: 5 Steps to Data-Driven Topic Planning",
        "copy": "This section covers \"How to Build a Xiaohongshu (RedNote) Content Idea Bank: 5 Steps to Data-Driven Topic Planning\"."
      },
      {
        "level": 2,
        "heading": "RELATED POSTS",
        "copy": "This section covers \"RELATED POSTS\"."
      },
      {
        "level": 3,
        "heading": "Xiaohongshu (RedNote) Search vs. Recommendation Traffic: Which Should New Accounts Prioritize?",
        "copy": "This section covers \"Xiaohongshu (RedNote) Search vs. Recommendation Traffic: Which Should New Accounts Prioritize?\"."
      },
      {
        "level": 3,
        "heading": "Xiaohongshu (RedNote) Keyword Placement Guide: Where to Put Keywords for Maximum Search Traffic",
        "copy": "This section covers \"Xiaohongshu (RedNote) Keyword Placement Guide: Where to Put Keywords for Maximum Search Traffic\"."
      },
      {
        "level": 3,
        "heading": "The Fastest Way to Grow on Xiaohongshu (RedNote) Isn't Posting Daily — It's Niche Analysis",
        "copy": "This section covers \"The Fastest Way to Grow on Xiaohongshu (RedNote) Isn't Posting Daily — It's Niche Analysis\"."
      },
      {
        "level": 3,
        "heading": "How to Build a Xiaohongshu (RedNote) Content Idea Bank: 5 Steps to Data-Driven Topic Planning",
        "copy": "This section covers \"How to Build a Xiaohongshu (RedNote) Content Idea Bank: 5 Steps to Data-Driven Topic Planning\"."
      }
    ],
    "links": [
      "/en",
      "/en/download",
      "/en/pricing",
      "/en/blog",
      "/en/blog/xiaohongshu-comment-analysis#four-layers-of-xiaohongshu-comment-analysis",
      "/en/blog/xiaohongshu-comment-analysis#sentiment-signals-do-users-actually-trust-you",
      "/en/blog/xiaohongshu-comment-analysis#product-demands-what-users-really-worry-about-before-deciding",
      "/en/blog/xiaohongshu-comment-analysis#content-ideas-your-next-post-is-already-in-the-comments",
      "/en/blog/xiaohongshu-comment-analysis#high-intent-leads-the-people-closest-to-converting",
      "/en/blog/xiaohongshu-comment-analysis#the-complete-workflow-scrape-xiaohongshu-comments-and-analyze-them",
      "/en/xiaohongshu/comments",
      "/en/blog/xiaohongshu-comment-analysis#takeaway",
      "/en/blog/xiaohongshu-search-vs-recommendation-traffic",
      "/en/blog/xiaohongshu-keyword-placement",
      "/en/blog/xiaohongshu-topic-analysis",
      "/en/blog/xiaohongshu-topic-library-build",
      "/en/xiaohongshu",
      "/en/xiaohongshu/keywords",
      "/en/xiaohongshu/viral-content-analysis",
      "/en/xiaohongshu/account-analysis",
      "/en/xiaohongshu/scraper",
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
      "/en/welfare?entry=footer",
      "/en/updates",
      "/en/referral",
      "/en/privacy-policy",
      "/en/terms-of-service"
    ],
    "media": [
      {
        "tag": "img",
        "kind": "img",
        "url": "https://mediaclaw.app/logo.png",
        "attr": "src",
        "alt": "MediaClaw",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://mediaclaw.app/logo.png",
        "attr": "src",
        "alt": "MediaClaw Team",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/23d0bcf3291bf2cf71a6e62e2123e6f0.png",
        "attr": "src",
        "alt": "Filter Xiaohongshu posts by comment count",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/3de41d7d7b1a2e2b3ecb04b9e0531b03.png",
        "attr": "src",
        "alt": "Scrape Xiaohongshu comments for free with MediaClaw",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/b84c0689a81917be33e38ae73423d6f8.png",
        "attr": "src",
        "alt": "Xiaohongshu comment analysis in Lark Base",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/c1c2896e8fe250b31ec46d7b450c4f8a.png",
        "attr": "src",
        "alt": "Filter high-intent leads from Xiaohongshu comments",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/947dcfa060eb8494d59fc805a5a01c83.png",
        "attr": "src",
        "alt": "Follow up with leads via direct message on Xiaohongshu",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/85704773cb06cc19c3b9b013d0f9e2eb.webp",
        "attr": "src",
        "alt": "Xiaohongshu (RedNote) Search vs. Recommendation Traffic: Which Should New Accounts Prioritize?",
        "visible": false
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/2441d01af10a786af5c75df1f9ffb7e8.webp",
        "attr": "src",
        "alt": "Xiaohongshu (RedNote) Keyword Placement Guide: Where to Put Keywords for Maximum Search Traffic",
        "visible": false
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/bea16c9a6eeb4fe8dcbd8cac6b79feb1.webp",
        "attr": "src",
        "alt": "The Fastest Way to Grow on Xiaohongshu (RedNote) Isn't Posting Daily — It's Niche Analysis",
        "visible": false
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/72d37ab299b70901c871973d1c8ebc27.webp",
        "attr": "src",
        "alt": "How to Build a Xiaohongshu (RedNote) Content Idea Bank: 5 Steps to Data-Driven Topic Planning",
        "visible": false
      }
    ],
    "source": "https://mediaclaw.app/en/blog/xiaohongshu-comment-analysis"
  },
  {
    "path": "/blog/xiaohongshu-topic-library-build",
    "status": 200,
    "locale": "zh",
    "family": "blog-article",
    "title": "小红书选题库怎么建立？5步搭建数据驱动的选题系统 | MediaClaw",
    "h1": "小红书选题库怎么建立？5步搭建数据驱动的选题系统",
    "summary": "免费用关键词裂变工具，把1个种子词扩展成200+长尾选题，再用AI自动归类方向，5步建立可持续补充的小红书选题库。",
    "sections": [
      {
        "level": 2,
        "heading": "第一步：确定你的赛道种子词",
        "copy": "本节围绕“第一步：确定你的赛道种子词”展开。"
      },
      {
        "level": 2,
        "heading": "第二步：用下拉词裂变把 1 个词扩展成 200+ 长尾词",
        "copy": "本节围绕“第二步：用下拉词裂变把 1 个词扩展成 200+ 长尾词”展开。"
      },
      {
        "level": 2,
        "heading": "第三步：AI 归类——把散词变成需求方向",
        "copy": "本节围绕“第三步：AI 归类——把散词变成需求方向”展开。"
      },
      {
        "level": 2,
        "heading": "第四步：验证蓝海词——从 200 个词里挑出值得优先写的",
        "copy": "本节围绕“第四步：验证蓝海词——从 200 个词里挑出值得优先写的”展开。"
      },
      {
        "level": 2,
        "heading": "第五步：定期补充，保持选题库新鲜",
        "copy": "本节围绕“第五步：定期补充，保持选题库新鲜”展开。"
      },
      {
        "level": 2,
        "heading": "小结",
        "copy": "本节围绕“小结”展开。"
      },
      {
        "level": 2,
        "heading": "相关文章",
        "copy": "本节围绕“相关文章”展开。"
      },
      {
        "level": 3,
        "heading": "怎么用 AI 把对标内容 10 分钟变成自己的小红书初稿",
        "copy": "本节围绕“怎么用 AI 把对标内容 10 分钟变成自己的小红书初稿”展开。"
      },
      {
        "level": 3,
        "heading": "小红书评论批量导出：多篇种草笔记投放后，怎么集中复盘评论区反馈",
        "copy": "本节围绕“小红书评论批量导出：多篇种草笔记投放后，怎么集中复盘评论区反馈”展开。"
      },
      {
        "level": 3,
        "heading": "小红书关键词布局攻略：让搜索流量精准找到你的笔记",
        "copy": "本节围绕“小红书关键词布局攻略：让搜索流量精准找到你的笔记”展开。"
      },
      {
        "level": 3,
        "heading": "小红书起号最快的方式不是日更，是搜一个词做选题分析",
        "copy": "本节围绕“小红书起号最快的方式不是日更，是搜一个词做选题分析”展开。"
      },
      {
        "level": 2,
        "heading": "相关文章",
        "copy": "本节围绕“相关文章”展开。"
      },
      {
        "level": 3,
        "heading": "怎么用 AI 把对标内容 10 分钟变成自己的小红书初稿",
        "copy": "本节围绕“怎么用 AI 把对标内容 10 分钟变成自己的小红书初稿”展开。"
      },
      {
        "level": 3,
        "heading": "小红书评论批量导出：多篇种草笔记投放后，怎么集中复盘评论区反馈",
        "copy": "本节围绕“小红书评论批量导出：多篇种草笔记投放后，怎么集中复盘评论区反馈”展开。"
      },
      {
        "level": 3,
        "heading": "小红书关键词布局攻略：让搜索流量精准找到你的笔记",
        "copy": "本节围绕“小红书关键词布局攻略：让搜索流量精准找到你的笔记”展开。"
      },
      {
        "level": 3,
        "heading": "小红书起号最快的方式不是日更，是搜一个词做选题分析",
        "copy": "本节围绕“小红书起号最快的方式不是日更，是搜一个词做选题分析”展开。"
      }
    ],
    "links": [
      "/",
      "/download",
      "/pricing",
      "/blog",
      "/blog/xiaohongshu-topic-library-build#%E7%AC%AC%E4%B8%80%E6%AD%A5%E7%A1%AE%E5%AE%9A%E4%BD%A0%E7%9A%84%E8%B5%9B%E9%81%93%E7%A7%8D%E5%AD%90%E8%AF%8D",
      "/blog/xiaohongshu-topic-library-build#%E7%AC%AC%E4%BA%8C%E6%AD%A5%E7%94%A8%E4%B8%8B%E6%8B%89%E8%AF%8D%E8%A3%82%E5%8F%98%E6%8A%8A-1-%E4%B8%AA%E8%AF%8D%E6%89%A9%E5%B1%95%E6%88%90-200-%E9%95%BF%E5%B0%BE%E8%AF%8D",
      "/blog/xiaohongshu-topic-library-build#%E7%AC%AC%E4%B8%89%E6%AD%A5ai-%E5%BD%92%E7%B1%BB%E6%8A%8A%E6%95%A3%E8%AF%8D%E5%8F%98%E6%88%90%E9%9C%80%E6%B1%82%E6%96%B9%E5%90%91",
      "/blog/xiaohongshu-topic-library-build#%E7%AC%AC%E5%9B%9B%E6%AD%A5%E9%AA%8C%E8%AF%81%E8%93%9D%E6%B5%B7%E8%AF%8D%E4%BB%8E-200-%E4%B8%AA%E8%AF%8D%E9%87%8C%E6%8C%91%E5%87%BA%E5%80%BC%E5%BE%97%E4%BC%98%E5%85%88%E5%86%99%E7%9A%84",
      "/xiaohongshu/scraper",
      "/blog/xiaohongshu-topic-library-build#%E7%AC%AC%E4%BA%94%E6%AD%A5%E5%AE%9A%E6%9C%9F%E8%A1%A5%E5%85%85%E4%BF%9D%E6%8C%81%E9%80%89%E9%A2%98%E5%BA%93%E6%96%B0%E9%B2%9C",
      "/blog/xiaohongshu-topic-library-build#%E5%B0%8F%E7%BB%93",
      "/blog/xiaohongshu-ai-benchmark-to-draft",
      "/blog/xiaohongshu-comment-batch-export-campaign-review",
      "/blog/xiaohongshu-keyword-placement",
      "/blog/xiaohongshu-topic-analysis",
      "/xiaohongshu",
      "/xiaohongshu/keywords",
      "/xiaohongshu/viral-content-analysis",
      "/xiaohongshu/account-analysis",
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
      "/welfare?entry=footer",
      "/updates",
      "/referral",
      "/privacy-policy",
      "/terms-of-service"
    ],
    "media": [
      {
        "tag": "img",
        "kind": "img",
        "url": "https://mediaclaw.app/logo.png",
        "attr": "src",
        "alt": "MediaClaw",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://mediaclaw.app/logo.png",
        "attr": "src",
        "alt": "MediaClaw Team",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://obsidian-1316461920.cos.ap-chengdu.myqcloud.com/20260416124947862.png",
        "attr": "src",
        "alt": "小红书关键词 A-Z 裂变操作示意图",
        "visible": true
      },
      {
        "tag": "video",
        "kind": "video",
        "url": "https://media.mediaclaw.app/videos/mediaclaw-demo-20260424.mp4#t=39",
        "attr": "src",
        "alt": "",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://obsidian-1316461920.cos.ap-chengdu.myqcloud.com/8266ebaaf1ea1f485660fb55d8c53a81.png",
        "attr": "src",
        "alt": "MediaClaw 关键词挖掘结果：用户需求地图与选题指南",
        "visible": true
      },
      {
        "tag": "video",
        "kind": "video",
        "url": "https://media.mediaclaw.app/videos/mediaclaw-demo-20260424.mp4#t=291",
        "attr": "src",
        "alt": "",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/79fa0f398165bc0b5a24bc5d95a56b20.webp",
        "attr": "src",
        "alt": "怎么用 AI 把对标内容 10 分钟变成自己的小红书初稿",
        "visible": false
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/c3b96151fe61b047405de1f9ccc34859.webp",
        "attr": "src",
        "alt": "小红书评论批量导出：多篇种草笔记投放后，怎么集中复盘评论区反馈",
        "visible": false
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/2441d01af10a786af5c75df1f9ffb7e8.webp",
        "attr": "src",
        "alt": "小红书关键词布局攻略：让搜索流量精准找到你的笔记",
        "visible": false
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/bea16c9a6eeb4fe8dcbd8cac6b79feb1.webp",
        "attr": "src",
        "alt": "小红书起号最快的方式不是日更，是搜一个词做选题分析",
        "visible": false
      },
      {
        "tag": "video",
        "kind": "poster",
        "url": "https://mediaclaw.app/imgs/video-posters/mediaclaw-demo-20260424-t039.webp",
        "attr": "poster",
        "alt": "",
        "visible": true
      },
      {
        "tag": "video",
        "kind": "poster",
        "url": "https://mediaclaw.app/imgs/video-posters/mediaclaw-demo-20260424-t291.webp",
        "attr": "poster",
        "alt": "",
        "visible": true
      }
    ],
    "source": "https://mediaclaw.app/blog/xiaohongshu-topic-library-build"
  },
  {
    "path": "/en/blog/xiaohongshu-topic-library-build",
    "status": 200,
    "locale": "en",
    "family": "blog-article",
    "title": "How to Build a Xiaohongshu (RedNote) Content Idea Bank: 5 Steps to Data-Driven Topic Planning | MediaClaw",
    "h1": "How to Build a Xiaohongshu (RedNote) Content Idea Bank: 5 Steps to Data-Driven Topic Planning",
    "summary": "Use a free keyword expansion tool to turn one seed keyword into 200+ long-tail content ideas, then let AI cluster them by intent — build a Xiaohongshu content idea bank that never runs dry.",
    "sections": [
      {
        "level": 2,
        "heading": "Step 1: Define Your Niche Seed Keywords",
        "copy": "This section covers \"Step 1: Define Your Niche Seed Keywords\"."
      },
      {
        "level": 2,
        "heading": "Step 2: Expand 1 Keyword into 200+ Long-Tail Ideas with Autocomplete Mining",
        "copy": "This section covers \"Step 2: Expand 1 Keyword into 200+ Long-Tail Ideas with Autocomplete Mining\"."
      },
      {
        "level": 2,
        "heading": "Step 3: AI Clustering — Turn Raw Keywords into Content Themes",
        "copy": "This section covers \"Step 3: AI Clustering — Turn Raw Keywords into Content Themes\"."
      },
      {
        "level": 2,
        "heading": "Step 4: Validate Low-Competition Keywords — Find What's Worth Writing First",
        "copy": "This section covers \"Step 4: Validate Low-Competition Keywords — Find What's Worth Writing First\"."
      },
      {
        "level": 2,
        "heading": "Step 5: Refresh Regularly to Keep Your Idea Bank Current",
        "copy": "This section covers \"Step 5: Refresh Regularly to Keep Your Idea Bank Current\"."
      },
      {
        "level": 2,
        "heading": "Takeaway",
        "copy": "This section covers \"Takeaway\"."
      },
      {
        "level": 2,
        "heading": "Related posts",
        "copy": "This section covers \"Related posts\"."
      },
      {
        "level": 3,
        "heading": "Xiaohongshu (RedNote) Keyword Placement Guide: Where to Put Keywords for Maximum Search Traffic",
        "copy": "This section covers \"Xiaohongshu (RedNote) Keyword Placement Guide: Where to Put Keywords for Maximum Search Traffic\"."
      },
      {
        "level": 3,
        "heading": "The Fastest Way to Grow on Xiaohongshu (RedNote) Isn't Posting Daily — It's Niche Analysis",
        "copy": "This section covers \"The Fastest Way to Grow on Xiaohongshu (RedNote) Isn't Posting Daily — It's Niche Analysis\"."
      },
      {
        "level": 3,
        "heading": "Xiaohongshu Keyword Research: Find Hundreds of Content Ideas from Search Suggestions",
        "copy": "This section covers \"Xiaohongshu Keyword Research: Find Hundreds of Content Ideas from Search Suggestions\"."
      },
      {
        "level": 3,
        "heading": "How Expert Creators Get Search Traffic on Xiaohongshu: Translate Jargon into Plain Language",
        "copy": "This section covers \"How Expert Creators Get Search Traffic on Xiaohongshu: Translate Jargon into Plain Language\"."
      },
      {
        "level": 2,
        "heading": "RELATED POSTS",
        "copy": "This section covers \"RELATED POSTS\"."
      },
      {
        "level": 3,
        "heading": "Xiaohongshu (RedNote) Keyword Placement Guide: Where to Put Keywords for Maximum Search Traffic",
        "copy": "This section covers \"Xiaohongshu (RedNote) Keyword Placement Guide: Where to Put Keywords for Maximum Search Traffic\"."
      },
      {
        "level": 3,
        "heading": "The Fastest Way to Grow on Xiaohongshu (RedNote) Isn't Posting Daily — It's Niche Analysis",
        "copy": "This section covers \"The Fastest Way to Grow on Xiaohongshu (RedNote) Isn't Posting Daily — It's Niche Analysis\"."
      },
      {
        "level": 3,
        "heading": "Xiaohongshu Keyword Research: Find Hundreds of Content Ideas from Search Suggestions",
        "copy": "This section covers \"Xiaohongshu Keyword Research: Find Hundreds of Content Ideas from Search Suggestions\"."
      },
      {
        "level": 3,
        "heading": "How Expert Creators Get Search Traffic on Xiaohongshu: Translate Jargon into Plain Language",
        "copy": "This section covers \"How Expert Creators Get Search Traffic on Xiaohongshu: Translate Jargon into Plain Language\"."
      }
    ],
    "links": [
      "/en",
      "/en/download",
      "/en/pricing",
      "/en/blog",
      "/en/blog/xiaohongshu-topic-library-build#step-1-define-your-niche-seed-keywords",
      "/en/blog/xiaohongshu-topic-library-build#step-2-expand-1-keyword-into-200-long-tail-ideas-with-autocomplete-mining",
      "/download",
      "/en/blog/xiaohongshu-topic-library-build#step-3-ai-clustering-turn-raw-keywords-into-content-themes",
      "/en/blog/xiaohongshu-topic-library-build#step-4-validate-low-competition-keywords-find-whats-worth-writing-first",
      "/en/xiaohongshu/scraper",
      "/en/blog/xiaohongshu-topic-library-build#step-5-refresh-regularly-to-keep-your-idea-bank-current",
      "/en/blog/xiaohongshu-topic-library-build#takeaway",
      "/",
      "/en/blog/xiaohongshu-keyword-placement",
      "/en/blog/xiaohongshu-topic-analysis",
      "/en/blog/xiaohongshu-keyword-research",
      "/en/blog/xiaohongshu-professional-content-search-traffic",
      "/en/xiaohongshu",
      "/en/xiaohongshu/keywords",
      "/en/xiaohongshu/viral-content-analysis",
      "/en/xiaohongshu/account-analysis",
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
      "/en/welfare?entry=footer",
      "/en/updates",
      "/en/referral",
      "/en/privacy-policy",
      "/en/terms-of-service"
    ],
    "media": [
      {
        "tag": "img",
        "kind": "img",
        "url": "https://mediaclaw.app/logo.png",
        "attr": "src",
        "alt": "MediaClaw",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://mediaclaw.app/logo.png",
        "attr": "src",
        "alt": "MediaClaw Team",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://obsidian-1316461920.cos.ap-chengdu.myqcloud.com/20260416124947862.png",
        "attr": "src",
        "alt": "A-Z keyword expansion method on Xiaohongshu search bar",
        "visible": true
      },
      {
        "tag": "video",
        "kind": "video",
        "url": "https://media.mediaclaw.app/videos/mediaclaw-demo-20260424.mp4#t=39",
        "attr": "src",
        "alt": "",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://obsidian-1316461920.cos.ap-chengdu.myqcloud.com/8266ebaaf1ea1f485660fb55d8c53a81.png",
        "attr": "src",
        "alt": "MediaClaw keyword research results: user demand map and content planning guide",
        "visible": true
      },
      {
        "tag": "video",
        "kind": "video",
        "url": "https://media.mediaclaw.app/videos/mediaclaw-demo-20260424.mp4#t=291",
        "attr": "src",
        "alt": "",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/2441d01af10a786af5c75df1f9ffb7e8.webp",
        "attr": "src",
        "alt": "Xiaohongshu (RedNote) Keyword Placement Guide: Where to Put Keywords for Maximum Search Traffic",
        "visible": false
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/bea16c9a6eeb4fe8dcbd8cac6b79feb1.webp",
        "attr": "src",
        "alt": "The Fastest Way to Grow on Xiaohongshu (RedNote) Isn't Posting Daily — It's Niche Analysis",
        "visible": false
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/0e98e644436276ec4efd44c0e95dae38.webp",
        "attr": "src",
        "alt": "Xiaohongshu Keyword Research: Find Hundreds of Content Ideas from Search Suggestions",
        "visible": false
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/d23371d046da8f607eacc982c82284a5.webp",
        "attr": "src",
        "alt": "How Expert Creators Get Search Traffic on Xiaohongshu: Translate Jargon into Plain Language",
        "visible": false
      },
      {
        "tag": "video",
        "kind": "poster",
        "url": "https://mediaclaw.app/imgs/video-posters/mediaclaw-demo-20260424-t039.webp",
        "attr": "poster",
        "alt": "",
        "visible": true
      },
      {
        "tag": "video",
        "kind": "poster",
        "url": "https://mediaclaw.app/imgs/video-posters/mediaclaw-demo-20260424-t291.webp",
        "attr": "poster",
        "alt": "",
        "visible": true
      }
    ],
    "source": "https://mediaclaw.app/en/blog/xiaohongshu-topic-library-build"
  },
  {
    "path": "/blog/xiaohongshu-download-own-posts",
    "status": 200,
    "locale": "zh",
    "family": "blog-article",
    "title": "小红书保存自己的历史作品，免费找回原始高清素材 | MediaClaw",
    "h1": "小红书保存自己的历史作品，免费找回原始高清素材",
    "summary": "免费无限次下载自己发布过的小红书作品原图和视频，无需注册。",
    "sections": [
      {
        "level": 2,
        "heading": "现有的找回方法，各有什么问题？",
        "copy": "本节围绕“现有的找回方法，各有什么问题？”展开。"
      },
      {
        "level": 3,
        "heading": "翻手机相册或云盘",
        "copy": "本节围绕“翻手机相册或云盘”展开。"
      },
      {
        "level": 3,
        "heading": "在 App 内长按保存",
        "copy": "本节围绕“在 App 内长按保存”展开。"
      },
      {
        "level": 3,
        "heading": "用在线去水印网站处理",
        "copy": "本节围绕“用在线去水印网站处理”展开。"
      },
      {
        "level": 3,
        "heading": "直接从网页端提取源文件",
        "copy": "本节围绕“直接从网页端提取源文件”展开。"
      },
      {
        "level": 2,
        "heading": "保存自己的小红书作品步骤",
        "copy": "本节围绕“保存自己的小红书作品步骤”展开。"
      },
      {
        "level": 3,
        "heading": "第一步：安装插件",
        "copy": "本节围绕“第一步：安装插件”展开。"
      },
      {
        "level": 3,
        "heading": "第二步：打开自己的笔记",
        "copy": "本节围绕“第二步：打开自己的笔记”展开。"
      },
      {
        "level": 3,
        "heading": "第三步：一键导出笔记素材",
        "copy": "本节围绕“第三步：一键导出笔记素材”展开。"
      },
      {
        "level": 2,
        "heading": "相关文章",
        "copy": "本节围绕“相关文章”展开。"
      },
      {
        "level": 3,
        "heading": "怎么用 AI 把对标内容 10 分钟变成自己的小红书初稿",
        "copy": "本节围绕“怎么用 AI 把对标内容 10 分钟变成自己的小红书初稿”展开。"
      },
      {
        "level": 3,
        "heading": "写论文怎么从小红书和抖音采集研究数据",
        "copy": "本节围绕“写论文怎么从小红书和抖音采集研究数据”展开。"
      },
      {
        "level": 3,
        "heading": "小红书品牌词怎么监控？内容风向舆情扫描",
        "copy": "本节围绕“小红书品牌词怎么监控？内容风向舆情扫描”展开。"
      },
      {
        "level": 3,
        "heading": "专业内容博主怎么做搜索流量：把术语翻译成大白话",
        "copy": "本节围绕“专业内容博主怎么做搜索流量：把术语翻译成大白话”展开。"
      },
      {
        "level": 2,
        "heading": "相关文章",
        "copy": "本节围绕“相关文章”展开。"
      },
      {
        "level": 3,
        "heading": "怎么用 AI 把对标内容 10 分钟变成自己的小红书初稿",
        "copy": "本节围绕“怎么用 AI 把对标内容 10 分钟变成自己的小红书初稿”展开。"
      },
      {
        "level": 3,
        "heading": "写论文怎么从小红书和抖音采集研究数据",
        "copy": "本节围绕“写论文怎么从小红书和抖音采集研究数据”展开。"
      },
      {
        "level": 3,
        "heading": "小红书品牌词怎么监控？内容风向舆情扫描",
        "copy": "本节围绕“小红书品牌词怎么监控？内容风向舆情扫描”展开。"
      },
      {
        "level": 3,
        "heading": "专业内容博主怎么做搜索流量：把术语翻译成大白话",
        "copy": "本节围绕“专业内容博主怎么做搜索流量：把术语翻译成大白话”展开。"
      }
    ],
    "links": [
      "/",
      "/download",
      "/pricing",
      "/blog",
      "/blog/xiaohongshu-download-own-posts#%E7%8E%B0%E6%9C%89%E7%9A%84%E6%89%BE%E5%9B%9E%E6%96%B9%E6%B3%95%E5%90%84%E6%9C%89%E4%BB%80%E4%B9%88%E9%97%AE%E9%A2%98",
      "/blog/xiaohongshu-download-own-posts#%E7%BF%BB%E6%89%8B%E6%9C%BA%E7%9B%B8%E5%86%8C%E6%88%96%E4%BA%91%E7%9B%98",
      "/blog/xiaohongshu-download-own-posts#%E5%9C%A8-app-%E5%86%85%E9%95%BF%E6%8C%89%E4%BF%9D%E5%AD%98",
      "/blog/xiaohongshu-download-own-posts#%E7%94%A8%E5%9C%A8%E7%BA%BF%E5%8E%BB%E6%B0%B4%E5%8D%B0%E7%BD%91%E7%AB%99%E5%A4%84%E7%90%86",
      "/blog/xiaohongshu-download-own-posts#%E7%9B%B4%E6%8E%A5%E4%BB%8E%E7%BD%91%E9%A1%B5%E7%AB%AF%E6%8F%90%E5%8F%96%E6%BA%90%E6%96%87%E4%BB%B6",
      "/blog/xiaohongshu-download-own-posts#%E4%BF%9D%E5%AD%98%E8%87%AA%E5%B7%B1%E7%9A%84%E5%B0%8F%E7%BA%A2%E4%B9%A6%E4%BD%9C%E5%93%81%E6%AD%A5%E9%AA%A4",
      "/xiaohongshu/downloader",
      "/blog/xiaohongshu-download-own-posts#%E7%AC%AC%E4%B8%80%E6%AD%A5%E5%AE%89%E8%A3%85%E6%8F%92%E4%BB%B6",
      "/blog/xiaohongshu-download-own-posts#%E7%AC%AC%E4%BA%8C%E6%AD%A5%E6%89%93%E5%BC%80%E8%87%AA%E5%B7%B1%E7%9A%84%E7%AC%94%E8%AE%B0",
      "/blog/xiaohongshu-download-own-posts#%E7%AC%AC%E4%B8%89%E6%AD%A5%E4%B8%80%E9%94%AE%E5%AF%BC%E5%87%BA%E7%AC%94%E8%AE%B0%E7%B4%A0%E6%9D%90",
      "/blog/xiaohongshu-ai-benchmark-to-draft",
      "/blog/xiaohongshu-research-data-collection",
      "/blog/xiaohongshu-brand-sentiment-monitoring",
      "/blog/xiaohongshu-professional-content-search-traffic",
      "/xiaohongshu",
      "/xiaohongshu/keywords",
      "/xiaohongshu/viral-content-analysis",
      "/xiaohongshu/account-analysis",
      "/xiaohongshu/scraper",
      "/xiaohongshu/comments",
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
      "/welfare?entry=footer",
      "/updates",
      "/referral",
      "/privacy-policy",
      "/terms-of-service"
    ],
    "media": [
      {
        "tag": "img",
        "kind": "img",
        "url": "https://mediaclaw.app/logo.png",
        "attr": "src",
        "alt": "MediaClaw",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://mediaclaw.app/logo.png",
        "attr": "src",
        "alt": "MediaClaw Team",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/08178e44fd0d3ee4ad1a0528e70f2b5a.webp",
        "attr": "src",
        "alt": "小红书作品找回方式对比插图：相册备份、App 保存、在线去水印、浏览器插件提取源文件",
        "visible": true
      },
      {
        "tag": "video",
        "kind": "video",
        "url": "https://media.mediaclaw.app/videos/mediaclaw-demo-20260424.mp4#t=232",
        "attr": "src",
        "alt": "",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/79fa0f398165bc0b5a24bc5d95a56b20.webp",
        "attr": "src",
        "alt": "怎么用 AI 把对标内容 10 分钟变成自己的小红书初稿",
        "visible": false
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/e7e0a072c414efc013b983c4cc434dff.webp",
        "attr": "src",
        "alt": "写论文怎么从小红书和抖音采集研究数据",
        "visible": false
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/a6d9c82262d00f64bb1558b2b15efc40.webp",
        "attr": "src",
        "alt": "小红书品牌词怎么监控？内容风向舆情扫描",
        "visible": false
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/d23371d046da8f607eacc982c82284a5.webp",
        "attr": "src",
        "alt": "专业内容博主怎么做搜索流量：把术语翻译成大白话",
        "visible": false
      },
      {
        "tag": "video",
        "kind": "poster",
        "url": "https://mediaclaw.app/imgs/video-posters/mediaclaw-demo-20260424-t232.webp",
        "attr": "poster",
        "alt": "",
        "visible": true
      }
    ],
    "source": "https://mediaclaw.app/blog/xiaohongshu-download-own-posts"
  },
  {
    "path": "/en/blog/xiaohongshu-download-own-posts",
    "status": 200,
    "locale": "en",
    "family": "blog-article",
    "title": "How to Backup & Download Your Own Xiaohongshu (RedNote) Posts — Get Original Photos & Videos for Free | MediaClaw",
    "h1": "How to Backup & Download Your Own Xiaohongshu (RedNote) Posts — Get Original Photos & Videos for Free",
    "summary": "Download your own Xiaohongshu (RedNote) posts in original quality — photos, videos, and covers. Free, unlimited, no signup required.",
    "sections": [
      {
        "level": 2,
        "heading": "Existing Methods to Recover Your Posts — And Their Limitations",
        "copy": "This section covers \"Existing Methods to Recover Your Posts — And Their Limitations\"."
      },
      {
        "level": 3,
        "heading": "Check Your Camera Roll or Cloud Storage",
        "copy": "This section covers \"Check Your Camera Roll or Cloud Storage\"."
      },
      {
        "level": 3,
        "heading": "Long-Press to Save in the App",
        "copy": "This section covers \"Long-Press to Save in the App\"."
      },
      {
        "level": 3,
        "heading": "Use an Online Watermark Remover",
        "copy": "This section covers \"Use an Online Watermark Remover\"."
      },
      {
        "level": 3,
        "heading": "Extract Source Files Directly via Browser Extension",
        "copy": "This section covers \"Extract Source Files Directly via Browser Extension\"."
      },
      {
        "level": 2,
        "heading": "Step-by-Step: Backup Your Own Xiaohongshu (RedNote) Posts",
        "copy": "This section covers \"Step-by-Step: Backup Your Own Xiaohongshu (RedNote) Posts\"."
      },
      {
        "level": 3,
        "heading": "Step 1: Install the Extension",
        "copy": "This section covers \"Step 1: Install the Extension\"."
      },
      {
        "level": 3,
        "heading": "Step 2: Open Your Post",
        "copy": "This section covers \"Step 2: Open Your Post\"."
      },
      {
        "level": 3,
        "heading": "Step 3: Export All Media with One Click",
        "copy": "This section covers \"Step 3: Export All Media with One Click\"."
      },
      {
        "level": 2,
        "heading": "Related posts",
        "copy": "This section covers \"Related posts\"."
      },
      {
        "level": 3,
        "heading": "Download Xiaohongshu (RedNote) Videos & Photos Without Watermark — Free, Unlimited, No Signup",
        "copy": "This section covers \"Download Xiaohongshu (RedNote) Videos & Photos Without Watermark — Free, Unlimited, No Signup\"."
      },
      {
        "level": 3,
        "heading": "Xiaohongshu (RedNote) Search vs. Recommendation Traffic: Which Should New Accounts Prioritize?",
        "copy": "This section covers \"Xiaohongshu (RedNote) Search vs. Recommendation Traffic: Which Should New Accounts Prioritize?\"."
      },
      {
        "level": 3,
        "heading": "Xiaohongshu (RedNote) Keyword Placement Guide: Where to Put Keywords for Maximum Search Traffic",
        "copy": "This section covers \"Xiaohongshu (RedNote) Keyword Placement Guide: Where to Put Keywords for Maximum Search Traffic\"."
      },
      {
        "level": 3,
        "heading": "The Fastest Way to Grow on Xiaohongshu (RedNote) Isn't Posting Daily — It's Niche Analysis",
        "copy": "This section covers \"The Fastest Way to Grow on Xiaohongshu (RedNote) Isn't Posting Daily — It's Niche Analysis\"."
      },
      {
        "level": 2,
        "heading": "RELATED POSTS",
        "copy": "This section covers \"RELATED POSTS\"."
      },
      {
        "level": 3,
        "heading": "Download Xiaohongshu (RedNote) Videos & Photos Without Watermark — Free, Unlimited, No Signup",
        "copy": "This section covers \"Download Xiaohongshu (RedNote) Videos & Photos Without Watermark — Free, Unlimited, No Signup\"."
      },
      {
        "level": 3,
        "heading": "Xiaohongshu (RedNote) Search vs. Recommendation Traffic: Which Should New Accounts Prioritize?",
        "copy": "This section covers \"Xiaohongshu (RedNote) Search vs. Recommendation Traffic: Which Should New Accounts Prioritize?\"."
      },
      {
        "level": 3,
        "heading": "Xiaohongshu (RedNote) Keyword Placement Guide: Where to Put Keywords for Maximum Search Traffic",
        "copy": "This section covers \"Xiaohongshu (RedNote) Keyword Placement Guide: Where to Put Keywords for Maximum Search Traffic\"."
      },
      {
        "level": 3,
        "heading": "The Fastest Way to Grow on Xiaohongshu (RedNote) Isn't Posting Daily — It's Niche Analysis",
        "copy": "This section covers \"The Fastest Way to Grow on Xiaohongshu (RedNote) Isn't Posting Daily — It's Niche Analysis\"."
      }
    ],
    "links": [
      "/en",
      "/en/download",
      "/en/pricing",
      "/en/blog",
      "/en/blog/xiaohongshu-download-own-posts#existing-methods-to-recover-your-posts-and-their-limitations",
      "/en/blog/xiaohongshu-download-own-posts#check-your-camera-roll-or-cloud-storage",
      "/en/blog/xiaohongshu-download-own-posts#long-press-to-save-in-the-app",
      "/en/blog/xiaohongshu-download-own-posts#use-an-online-watermark-remover",
      "/en/blog/xiaohongshu-download-own-posts#extract-source-files-directly-via-browser-extension",
      "/en/blog/xiaohongshu-download-own-posts#step-by-step-backup-your-own-xiaohongshu-rednote-posts",
      "/en/xiaohongshu/downloader",
      "/en/blog/xiaohongshu-download-own-posts#step-1-install-the-extension",
      "/en/blog/xiaohongshu-download-own-posts#step-2-open-your-post",
      "/en/blog/xiaohongshu-download-own-posts#step-3-export-all-media-with-one-click",
      "/en/blog/xiaohongshu-download-remove-watermark",
      "/en/blog/xiaohongshu-search-vs-recommendation-traffic",
      "/en/blog/xiaohongshu-keyword-placement",
      "/en/blog/xiaohongshu-topic-analysis",
      "/en/xiaohongshu",
      "/en/xiaohongshu/keywords",
      "/en/xiaohongshu/viral-content-analysis",
      "/en/xiaohongshu/account-analysis",
      "/en/xiaohongshu/scraper",
      "/en/xiaohongshu/comments",
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
      "/en/welfare?entry=footer",
      "/en/updates",
      "/en/referral",
      "/en/privacy-policy",
      "/en/terms-of-service"
    ],
    "media": [
      {
        "tag": "img",
        "kind": "img",
        "url": "https://mediaclaw.app/logo.png",
        "attr": "src",
        "alt": "MediaClaw",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://mediaclaw.app/logo.png",
        "attr": "src",
        "alt": "MediaClaw Team",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/08178e44fd0d3ee4ad1a0528e70f2b5a.webp",
        "attr": "src",
        "alt": "Comparison of methods to recover Xiaohongshu posts: camera roll backup, in-app save, online watermark remover, browser extension source extraction",
        "visible": true
      },
      {
        "tag": "video",
        "kind": "video",
        "url": "https://media.mediaclaw.app/videos/mediaclaw-demo-20260424.mp4#t=232",
        "attr": "src",
        "alt": "",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/39f111b856bb4b8017178b41bc1e6d87.webp",
        "attr": "src",
        "alt": "Download Xiaohongshu (RedNote) Videos & Photos Without Watermark — Free, Unlimited, No Signup",
        "visible": false
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/85704773cb06cc19c3b9b013d0f9e2eb.webp",
        "attr": "src",
        "alt": "Xiaohongshu (RedNote) Search vs. Recommendation Traffic: Which Should New Accounts Prioritize?",
        "visible": false
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/2441d01af10a786af5c75df1f9ffb7e8.webp",
        "attr": "src",
        "alt": "Xiaohongshu (RedNote) Keyword Placement Guide: Where to Put Keywords for Maximum Search Traffic",
        "visible": false
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/bea16c9a6eeb4fe8dcbd8cac6b79feb1.webp",
        "attr": "src",
        "alt": "The Fastest Way to Grow on Xiaohongshu (RedNote) Isn't Posting Daily — It's Niche Analysis",
        "visible": false
      },
      {
        "tag": "video",
        "kind": "poster",
        "url": "https://mediaclaw.app/imgs/video-posters/mediaclaw-demo-20260424-t232.webp",
        "attr": "poster",
        "alt": "",
        "visible": true
      }
    ],
    "source": "https://mediaclaw.app/en/blog/xiaohongshu-download-own-posts"
  },
  {
    "path": "/blog/xiaohongshu-download-remove-watermark",
    "status": 200,
    "locale": "zh",
    "family": "blog-article",
    "title": "免费无限次下载小红书无水印素材——视频、图片、封面一键全搞定 | MediaClaw",
    "h1": "免费无限次下载小红书无水印素材——视频、图片、封面一键全搞定",
    "summary": "一键批量免费保存小红书无水印视频、高清原图和封面图，无需注册登录。",
    "sections": [
      {
        "level": 2,
        "heading": "下载无水印素材的三种方法？",
        "copy": "本节围绕“下载无水印素材的三种方法？”展开。"
      },
      {
        "level": 3,
        "heading": "方法一：在线去水印网站",
        "copy": "本节围绕“方法一：在线去水印网站”展开。"
      },
      {
        "level": 3,
        "heading": "方法二：手机端App/小程序",
        "copy": "本节围绕“方法二：手机端App/小程序”展开。"
      },
      {
        "level": 3,
        "heading": "方法三：浏览器插件直接提取源文件",
        "copy": "本节围绕“方法三：浏览器插件直接提取源文件”展开。"
      },
      {
        "level": 2,
        "heading": "用浏览器插件下载无水印素材的步骤",
        "copy": "本节围绕“用浏览器插件下载无水印素材的步骤”展开。"
      },
      {
        "level": 2,
        "heading": "下载无水印素材后的注意事项",
        "copy": "本节围绕“下载无水印素材后的注意事项”展开。"
      },
      {
        "level": 3,
        "heading": "二次创作优于直接搬运",
        "copy": "本节围绕“二次创作优于直接搬运”展开。"
      },
      {
        "level": 3,
        "heading": "用\"采集 + 下载 + 飞书同步\"搭建素材库",
        "copy": "本节围绕“用\"采集 + 下载 + 飞书同步\"搭建素材库”展开。"
      },
      {
        "level": 3,
        "heading": "不同素材类型的使用场景",
        "copy": "本节围绕“不同素材类型的使用场景”展开。"
      },
      {
        "level": 2,
        "heading": "小结",
        "copy": "本节围绕“小结”展开。"
      },
      {
        "level": 2,
        "heading": "相关文章",
        "copy": "本节围绕“相关文章”展开。"
      },
      {
        "level": 3,
        "heading": "怎么用 AI 把对标内容 10 分钟变成自己的小红书初稿",
        "copy": "本节围绕“怎么用 AI 把对标内容 10 分钟变成自己的小红书初稿”展开。"
      },
      {
        "level": 3,
        "heading": "写论文怎么从小红书和抖音采集研究数据",
        "copy": "本节围绕“写论文怎么从小红书和抖音采集研究数据”展开。"
      },
      {
        "level": 3,
        "heading": "小红书品牌词怎么监控？内容风向舆情扫描",
        "copy": "本节围绕“小红书品牌词怎么监控？内容风向舆情扫描”展开。"
      },
      {
        "level": 3,
        "heading": "专业内容博主怎么做搜索流量：把术语翻译成大白话",
        "copy": "本节围绕“专业内容博主怎么做搜索流量：把术语翻译成大白话”展开。"
      },
      {
        "level": 2,
        "heading": "相关文章",
        "copy": "本节围绕“相关文章”展开。"
      },
      {
        "level": 3,
        "heading": "怎么用 AI 把对标内容 10 分钟变成自己的小红书初稿",
        "copy": "本节围绕“怎么用 AI 把对标内容 10 分钟变成自己的小红书初稿”展开。"
      },
      {
        "level": 3,
        "heading": "写论文怎么从小红书和抖音采集研究数据",
        "copy": "本节围绕“写论文怎么从小红书和抖音采集研究数据”展开。"
      },
      {
        "level": 3,
        "heading": "小红书品牌词怎么监控？内容风向舆情扫描",
        "copy": "本节围绕“小红书品牌词怎么监控？内容风向舆情扫描”展开。"
      },
      {
        "level": 3,
        "heading": "专业内容博主怎么做搜索流量：把术语翻译成大白话",
        "copy": "本节围绕“专业内容博主怎么做搜索流量：把术语翻译成大白话”展开。"
      }
    ],
    "links": [
      "/",
      "/download",
      "/pricing",
      "/blog",
      "/blog/xiaohongshu-download-remove-watermark#%E4%B8%8B%E8%BD%BD%E6%97%A0%E6%B0%B4%E5%8D%B0%E7%B4%A0%E6%9D%90%E7%9A%84%E4%B8%89%E7%A7%8D%E6%96%B9%E6%B3%95",
      "/blog/xiaohongshu-download-remove-watermark#%E6%96%B9%E6%B3%95%E4%B8%80%E5%9C%A8%E7%BA%BF%E5%8E%BB%E6%B0%B4%E5%8D%B0%E7%BD%91%E7%AB%99",
      "/blog/xiaohongshu-download-remove-watermark#%E6%96%B9%E6%B3%95%E4%BA%8C%E6%89%8B%E6%9C%BA%E7%AB%AFapp%E5%B0%8F%E7%A8%8B%E5%BA%8F",
      "/blog/xiaohongshu-download-remove-watermark#%E6%96%B9%E6%B3%95%E4%B8%89%E6%B5%8F%E8%A7%88%E5%99%A8%E6%8F%92%E4%BB%B6%E7%9B%B4%E6%8E%A5%E6%8F%90%E5%8F%96%E6%BA%90%E6%96%87%E4%BB%B6",
      "/blog/xiaohongshu-download-remove-watermark#%E7%94%A8%E6%B5%8F%E8%A7%88%E5%99%A8%E6%8F%92%E4%BB%B6%E4%B8%8B%E8%BD%BD%E6%97%A0%E6%B0%B4%E5%8D%B0%E7%B4%A0%E6%9D%90%E7%9A%84%E6%AD%A5%E9%AA%A4",
      "/xiaohongshu/downloader",
      "/blog/xiaohongshu-download-remove-watermark#%E4%B8%8B%E8%BD%BD%E6%97%A0%E6%B0%B4%E5%8D%B0%E7%B4%A0%E6%9D%90%E5%90%8E%E7%9A%84%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9",
      "/blog/xiaohongshu-download-remove-watermark#%E4%BA%8C%E6%AC%A1%E5%88%9B%E4%BD%9C%E4%BC%98%E4%BA%8E%E7%9B%B4%E6%8E%A5%E6%90%AC%E8%BF%90",
      "/blog/xiaohongshu-download-remove-watermark#%E7%94%A8%E9%87%87%E9%9B%86-%E4%B8%8B%E8%BD%BD-%E9%A3%9E%E4%B9%A6%E5%90%8C%E6%AD%A5%E6%90%AD%E5%BB%BA%E7%B4%A0%E6%9D%90%E5%BA%93",
      "/blog/xiaohongshu-download-remove-watermark#%E4%B8%8D%E5%90%8C%E7%B4%A0%E6%9D%90%E7%B1%BB%E5%9E%8B%E7%9A%84%E4%BD%BF%E7%94%A8%E5%9C%BA%E6%99%AF",
      "/blog/xiaohongshu-download-remove-watermark#%E5%B0%8F%E7%BB%93",
      "/blog/xiaohongshu-ai-benchmark-to-draft",
      "/blog/xiaohongshu-research-data-collection",
      "/blog/xiaohongshu-brand-sentiment-monitoring",
      "/blog/xiaohongshu-professional-content-search-traffic",
      "/xiaohongshu",
      "/xiaohongshu/keywords",
      "/xiaohongshu/viral-content-analysis",
      "/xiaohongshu/account-analysis",
      "/xiaohongshu/scraper",
      "/xiaohongshu/comments",
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
      "/welfare?entry=footer",
      "/updates",
      "/referral",
      "/privacy-policy",
      "/terms-of-service"
    ],
    "media": [
      {
        "tag": "img",
        "kind": "img",
        "url": "https://mediaclaw.app/logo.png",
        "attr": "src",
        "alt": "MediaClaw",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://mediaclaw.app/logo.png",
        "attr": "src",
        "alt": "MediaClaw Team",
        "visible": true
      },
      {
        "tag": "video",
        "kind": "video",
        "url": "https://media.mediaclaw.app/videos/mediaclaw-demo-20260424.mp4#t=232",
        "attr": "src",
        "alt": "",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://mediaclaw.app/imgs/features/14-v20260424.webp",
        "attr": "src",
        "alt": "MediaClaw 飞书同步",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/79fa0f398165bc0b5a24bc5d95a56b20.webp",
        "attr": "src",
        "alt": "怎么用 AI 把对标内容 10 分钟变成自己的小红书初稿",
        "visible": false
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/e7e0a072c414efc013b983c4cc434dff.webp",
        "attr": "src",
        "alt": "写论文怎么从小红书和抖音采集研究数据",
        "visible": false
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/a6d9c82262d00f64bb1558b2b15efc40.webp",
        "attr": "src",
        "alt": "小红书品牌词怎么监控？内容风向舆情扫描",
        "visible": false
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/d23371d046da8f607eacc982c82284a5.webp",
        "attr": "src",
        "alt": "专业内容博主怎么做搜索流量：把术语翻译成大白话",
        "visible": false
      },
      {
        "tag": "video",
        "kind": "poster",
        "url": "https://mediaclaw.app/imgs/video-posters/mediaclaw-demo-20260424-t232.webp",
        "attr": "poster",
        "alt": "",
        "visible": true
      }
    ],
    "source": "https://mediaclaw.app/blog/xiaohongshu-download-remove-watermark"
  },
  {
    "path": "/en/blog/xiaohongshu-download-remove-watermark",
    "status": 200,
    "locale": "en",
    "family": "blog-article",
    "title": "Download Xiaohongshu (RedNote) Videos & Photos Without Watermark — Free, Unlimited, No Signup | MediaClaw",
    "h1": "Download Xiaohongshu (RedNote) Videos & Photos Without Watermark — Free, Unlimited, No Signup",
    "summary": "Batch download Xiaohongshu (RedNote) videos, HD images, and cover photos without watermark. Free, unlimited, no signup required.",
    "sections": [
      {
        "level": 2,
        "heading": "3 Ways to Download Xiaohongshu Content Without Watermark",
        "copy": "This section covers \"3 Ways to Download Xiaohongshu Content Without Watermark\"."
      },
      {
        "level": 3,
        "heading": "Method 1: Online Watermark Removal Websites",
        "copy": "This section covers \"Method 1: Online Watermark Removal Websites\"."
      },
      {
        "level": 3,
        "heading": "Method 2: Mobile Apps & Mini Programs",
        "copy": "This section covers \"Method 2: Mobile Apps & Mini Programs\"."
      },
      {
        "level": 3,
        "heading": "Method 3: Browser Extension — Extract Original Source Files",
        "copy": "This section covers \"Method 3: Browser Extension — Extract Original Source Files\"."
      },
      {
        "level": 2,
        "heading": "How to Download Watermark-Free Xiaohongshu Content Step by Step",
        "copy": "This section covers \"How to Download Watermark-Free Xiaohongshu Content Step by Step\"."
      },
      {
        "level": 2,
        "heading": "Best Practices After Downloading Watermark-Free Assets",
        "copy": "This section covers \"Best Practices After Downloading Watermark-Free Assets\"."
      },
      {
        "level": 3,
        "heading": "Create Original Content, Don't Just Repost",
        "copy": "This section covers \"Create Original Content, Don't Just Repost\"."
      },
      {
        "level": 3,
        "heading": "Build an Asset Library with \"Collect + Download + Lark Sync\"",
        "copy": "This section covers \"Build an Asset Library with \"Collect + Download + Lark Sync\"\"."
      },
      {
        "level": 3,
        "heading": "Use Cases by Asset Type",
        "copy": "This section covers \"Use Cases by Asset Type\"."
      },
      {
        "level": 2,
        "heading": "Wrap Up",
        "copy": "This section covers \"Wrap Up\"."
      },
      {
        "level": 2,
        "heading": "Related posts",
        "copy": "This section covers \"Related posts\"."
      },
      {
        "level": 3,
        "heading": "How to Backup & Download Your Own Xiaohongshu (RedNote) Posts — Get Original Photos & Videos for Free",
        "copy": "This section covers \"How to Backup & Download Your Own Xiaohongshu (RedNote) Posts — Get Original Photos & Videos for Free\"."
      },
      {
        "level": 3,
        "heading": "Xiaohongshu (RedNote) Search vs. Recommendation Traffic: Which Should New Accounts Prioritize?",
        "copy": "This section covers \"Xiaohongshu (RedNote) Search vs. Recommendation Traffic: Which Should New Accounts Prioritize?\"."
      },
      {
        "level": 3,
        "heading": "Xiaohongshu (RedNote) Keyword Placement Guide: Where to Put Keywords for Maximum Search Traffic",
        "copy": "This section covers \"Xiaohongshu (RedNote) Keyword Placement Guide: Where to Put Keywords for Maximum Search Traffic\"."
      },
      {
        "level": 3,
        "heading": "The Fastest Way to Grow on Xiaohongshu (RedNote) Isn't Posting Daily — It's Niche Analysis",
        "copy": "This section covers \"The Fastest Way to Grow on Xiaohongshu (RedNote) Isn't Posting Daily — It's Niche Analysis\"."
      },
      {
        "level": 2,
        "heading": "RELATED POSTS",
        "copy": "This section covers \"RELATED POSTS\"."
      },
      {
        "level": 3,
        "heading": "How to Backup & Download Your Own Xiaohongshu (RedNote) Posts — Get Original Photos & Videos for Free",
        "copy": "This section covers \"How to Backup & Download Your Own Xiaohongshu (RedNote) Posts — Get Original Photos & Videos for Free\"."
      },
      {
        "level": 3,
        "heading": "Xiaohongshu (RedNote) Search vs. Recommendation Traffic: Which Should New Accounts Prioritize?",
        "copy": "This section covers \"Xiaohongshu (RedNote) Search vs. Recommendation Traffic: Which Should New Accounts Prioritize?\"."
      },
      {
        "level": 3,
        "heading": "Xiaohongshu (RedNote) Keyword Placement Guide: Where to Put Keywords for Maximum Search Traffic",
        "copy": "This section covers \"Xiaohongshu (RedNote) Keyword Placement Guide: Where to Put Keywords for Maximum Search Traffic\"."
      },
      {
        "level": 3,
        "heading": "The Fastest Way to Grow on Xiaohongshu (RedNote) Isn't Posting Daily — It's Niche Analysis",
        "copy": "This section covers \"The Fastest Way to Grow on Xiaohongshu (RedNote) Isn't Posting Daily — It's Niche Analysis\"."
      }
    ],
    "links": [
      "/en",
      "/en/download",
      "/en/pricing",
      "/en/blog",
      "/en/blog/xiaohongshu-download-remove-watermark#3-ways-to-download-xiaohongshu-content-without-watermark",
      "/en/blog/xiaohongshu-download-remove-watermark#method-1-online-watermark-removal-websites",
      "/en/blog/xiaohongshu-download-remove-watermark#method-2-mobile-apps-mini-programs",
      "/en/blog/xiaohongshu-download-remove-watermark#method-3-browser-extension-extract-original-source-files",
      "/en/blog/xiaohongshu-download-remove-watermark#how-to-download-watermark-free-xiaohongshu-content-step-by-step",
      "/en/xiaohongshu/downloader",
      "/en/blog/xiaohongshu-download-remove-watermark#best-practices-after-downloading-watermark-free-assets",
      "/en/blog/xiaohongshu-download-remove-watermark#create-original-content-dont-just-repost",
      "/en/blog/xiaohongshu-download-remove-watermark#build-an-asset-library-with-collect-download-lark-sync",
      "/en/blog/xiaohongshu-download-remove-watermark#use-cases-by-asset-type",
      "/en/blog/xiaohongshu-download-remove-watermark#wrap-up",
      "/en/blog/xiaohongshu-download-own-posts",
      "/en/blog/xiaohongshu-search-vs-recommendation-traffic",
      "/en/blog/xiaohongshu-keyword-placement",
      "/en/blog/xiaohongshu-topic-analysis",
      "/en/xiaohongshu",
      "/en/xiaohongshu/keywords",
      "/en/xiaohongshu/viral-content-analysis",
      "/en/xiaohongshu/account-analysis",
      "/en/xiaohongshu/scraper",
      "/en/xiaohongshu/comments",
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
      "/en/welfare?entry=footer",
      "/en/updates",
      "/en/referral",
      "/en/privacy-policy",
      "/en/terms-of-service"
    ],
    "media": [
      {
        "tag": "img",
        "kind": "img",
        "url": "https://mediaclaw.app/logo.png",
        "attr": "src",
        "alt": "MediaClaw",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://mediaclaw.app/logo.png",
        "attr": "src",
        "alt": "MediaClaw Team",
        "visible": true
      },
      {
        "tag": "video",
        "kind": "video",
        "url": "https://media.mediaclaw.app/videos/mediaclaw-demo-20260424.mp4#t=232",
        "attr": "src",
        "alt": "",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://mediaclaw.app/imgs/features/14-v20260424.webp",
        "attr": "src",
        "alt": "MediaClaw Lark sync",
        "visible": true
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/2e872441a2eff1d79cc7e4335c53cfc5.png",
        "attr": "src",
        "alt": "How to Backup & Download Your Own Xiaohongshu (RedNote) Posts — Get Original Photos & Videos for Free",
        "visible": false
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/85704773cb06cc19c3b9b013d0f9e2eb.webp",
        "attr": "src",
        "alt": "Xiaohongshu (RedNote) Search vs. Recommendation Traffic: Which Should New Accounts Prioritize?",
        "visible": false
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/2441d01af10a786af5c75df1f9ffb7e8.webp",
        "attr": "src",
        "alt": "Xiaohongshu (RedNote) Keyword Placement Guide: Where to Put Keywords for Maximum Search Traffic",
        "visible": false
      },
      {
        "tag": "img",
        "kind": "img",
        "url": "https://media.mediaclaw.app/blog-covers/bea16c9a6eeb4fe8dcbd8cac6b79feb1.webp",
        "attr": "src",
        "alt": "The Fastest Way to Grow on Xiaohongshu (RedNote) Isn't Posting Daily — It's Niche Analysis",
        "visible": false
      },
      {
        "tag": "video",
        "kind": "poster",
        "url": "https://mediaclaw.app/imgs/video-posters/mediaclaw-demo-20260424-t232.webp",
        "attr": "poster",
        "alt": "",
        "visible": true
      }
    ],
    "source": "https://mediaclaw.app/en/blog/xiaohongshu-download-remove-watermark"
  }
]

export default validateRouteRecords(records, 24, 'BLOG-B')

