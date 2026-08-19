import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  ChevronRight,
  Download,
  ExternalLink,
  List,
  ShieldCheck,
  Sparkles,
  Tag,
} from 'lucide-react'
import './blogRecordPages.css'

// The audit stores the same source image on the zh/en route pair. Keep the
// local cache map URL-based so a translated record resolves to the same file.
const LOCAL_MEDIA_BY_URL = {
  'https://mediaclaw.app/imgs/features/1-v20260513.png': '/assets/articles/douyin-comment-export.png',
  'https://obsidian-1316461920.cos.ap-chengdu.myqcloud.com/20260729165137825.png': '/assets/articles/xiaohongshu-ai-benchmark-to-draft.png',
  'https://media.mediaclaw.app/blog-covers/9cfde8c3405105d93b76b68758b5fa9d.png': '/assets/articles/xiaohongshu-research-data-collection.png',
  'https://media.mediaclaw.app/blog-covers/25d62b4a0aa7f5cb235fb09f6d70fc1e.png': '/assets/articles/video-transcript-timestamps.png',
  'https://media.mediaclaw.app/blog-covers/b9707b63cf430c4ad2d9751c0fc810b4.png': '/assets/articles/xiaohongshu-image-text-extraction.png',
  'https://media.mediaclaw.app/blog-covers/58f487cfdea2d1e5727904ec318b9eb9.webp': '/assets/articles/xiaohongshu-brand-sentiment-monitoring.webp',
  'https://obsidian-1316461920.cos.ap-chengdu.myqcloud.com/8cc3738fe7b294cee18db52b5555f288.png': '/assets/articles/xiaohongshu-professional-content-search-traffic.png',
  'https://media.mediaclaw.app/blog-covers/deee7159d2e102f1583f988151351164.png': '/assets/articles/xiaohongshu-find-benchmark-accounts.png',
  'https://media.mediaclaw.app/blog-covers/c6133fa0062ffc48bbf4a546d11437c3.png': '/assets/articles/xiaohongshu-comment-batch-export-campaign-review.png',
  'https://media.mediaclaw.app/blog-covers/77c98aa1b60d4537a825ced39ef0bb90.png': '/assets/articles/local-business-xiaohongshu-marketing.png',
  'https://media.mediaclaw.app/blog-covers/9cfde8c3405105d93b76b68758b5fa9d.png': '/assets/articles/low-follower-viral-content.png',
  'https://media.mediaclaw.app/blog-covers/6746583b97d20cbc3dda52fcc6cfd39d.png': '/assets/articles/xiaohongshu-keyword-placement.png',
  'https://media.mediaclaw.app/blog-covers/ce64fa13c4c26882b054ee6baf7ce095.png': '/assets/articles/xiaohongshu-topic-analysis.png',
  'https://media.mediaclaw.app/blog-covers/23959730eb58ef0d6a1ee53bd0271338.png': '/assets/articles/short-video-transcript-extraction.png',
  'https://media.mediaclaw.app/blog-covers/93f57fc5401439db3673acadfed3f966.png': '/assets/articles/xiaohongshu-comment-topic-mining.png',
  'https://obsidian-1316461920.cos.ap-chengdu.myqcloud.com/20260416124321494.png': '/assets/articles/xiaohongshu-keyword-research.png',
  'https://mediaclaw.app/imgs/features/12-v20260424.webp': '/assets/articles/xiaohongshu-competitor-monitoring.webp',
  'https://media.mediaclaw.app/blog-covers/23d0bcf3291bf2cf71a6e62e2123e6f0.png': '/assets/articles/xiaohongshu-comment-analysis.png',
  'https://obsidian-1316461920.cos.ap-chengdu.myqcloud.com/20260416124947862.png': '/assets/articles/xiaohongshu-topic-library-build.png',
  'https://media.mediaclaw.app/blog-covers/08178e44fd0d3ee4ad1a0528e70f2b5a.webp': '/assets/articles/xiaohongshu-download-own-posts.webp',
  'https://mediaclaw.app/imgs/features/14-v20260424.webp': '/assets/articles/xiaohongshu-download-remove-watermark.webp',
  // These two source docs currently return 404. Keep the article readable with
  // local, source-observed collection screenshots instead of a broken image.
  'https://mediaclaw.app/imgs/docs/collect/search-results/02-batch-keyword-dialog.webp': '/assets/product/scraper-fields.webp',
  'https://mediaclaw.app/imgs/docs/collect/douyin-collection/02-%E8%AF%86%E5%88%AB%E5%88%B0%E5%90%88%E9%9B%86%E5%90%8E%E7%9B%B4%E6%8E%A5%E9%87%87%E9%9B%86.webp': '/assets/product/scraper-export.png',
}

const asRecords = (routeRecords) => {
  if (routeRecords instanceof Map) return [...routeRecords.values()]
  return Array.isArray(routeRecords) ? routeRecords : []
}

const linkHref = (link) => (typeof link === 'string' ? link : link?.href || '')
const linkLabel = (link) => (typeof link === 'string' ? link : link?.label || '')
const cleanHref = (href) => href.split('#')[0]
const textValue = (value) => (Array.isArray(value) ? value.filter(Boolean).join(' ') : value || '')
const isArticle = (record) => record?.family === 'blog-article' && record.status !== 404
const articleSlug = (path = '') => path.replace(/^\/en\//, '').replace(/^\/blog\//, '')

const imageMedia = (record) => (record.media || []).filter((media) => {
  return media?.kind === 'img' && media.url && media.visible !== false && !/\/logo\.png(?:$|\?)/.test(media.url)
})

const mediaSrc = (media) => LOCAL_MEDIA_BY_URL[media.url] || media.url

const categoryRecords = (records, locale) => records.filter((item) => {
  return item?.family === 'blog-index' && item.locale === locale && /\/blog\/category\//.test(item.path)
})

const categoryForArticle = (article, records) => {
  const match = categoryRecords(records, article.locale).find((category) => {
    return category.links.some((link) => cleanHref(linkHref(link)) === article.path)
  })
  if (!match) return article.locale === 'en' ? 'Article' : '文章'
  return decodeURIComponent(match.path.split('/').pop())
}

const uniqueArticles = (records, locale, currentPath) => {
  const seen = new Set()
  return records.filter((item) => {
    if (!isArticle(item) || item.locale !== locale || item.path === currentPath || seen.has(item.path)) return false
    seen.add(item.path)
    return true
  })
}

const localize = (record, zh, en) => (record.locale === 'en' ? en : zh)

function SourceImage({ media, className = '', eager = false }) {
  const src = mediaSrc(media)
  return <img className={className} src={src} alt={media.alt || ''} loading={eager ? 'eager' : 'lazy'} onError={(event) => {
    if (event.currentTarget.src !== media.url) event.currentTarget.src = media.url
  }} />
}

function CategoryNav({ record, records, onNavigate }) {
  const items = (record.links || []).filter((link) => /\/blog\/category\//.test(cleanHref(linkHref(link))))
  return <nav className="record-blog-category-nav" aria-label={localize(record, '博客分类', 'Blog categories')}>
    <button className={!record.path.includes('/category/') ? 'active' : ''} onClick={() => onNavigate(record.locale === 'en' ? '/en/blog' : '/blog')}>
      {localize(record, '全部文章', 'All articles')} <small>{items.length ? (record.links.find((link) => cleanHref(linkHref(link)) === (record.locale === 'en' ? '/en/blog' : '/blog'))?.label || '') : ''}</small>
    </button>
    {items.map((link) => <button key={linkHref(link)} className={cleanHref(linkHref(link)) === record.path ? 'active' : ''} onClick={() => onNavigate(cleanHref(linkHref(link)))}>
      <span>{linkLabel(link).replace(/\d+$/, '')}</span><small>{linkLabel(link).match(/\d+$/)?.[0] || ''}</small>
    </button>)}
  </nav>
}

export function BlogIndexRecordPage({ record, onNavigate = () => {}, routeRecords = [] }) {
  const records = asRecords(routeRecords)
  const localeArticles = records.filter((item) => isArticle(item) && item.locale === record.locale)
  const articleLinks = new Set((record.links || []).map(linkHref).map(cleanHref).filter((href) => /\/blog\//.test(href) && !/\/category\//.test(href)))
  const articles = record.path.includes('/category/')
    ? localeArticles.filter((item) => articleLinks.has(item.path))
    : localeArticles
  const allArticles = articles.length ? articles : localeArticles
  const heading = textValue(record.h1) || textValue(record.title)

  return <main className="record-blog-index">
    <section className="record-blog-index-hero">
      <div className="page-shell record-blog-index-hero-inner">
        <div>
          <span className="eyebrow"><BookOpen size={14} /> {localize(record, '内容文章', 'Editorial guides')}</span>
          <h1>{heading}</h1>
          <p>{record.summary}</p>
        </div>
        <div className="record-blog-index-stat"><Sparkles size={18} /><strong>{allArticles.length || 0}</strong><span>{localize(record, '篇公开文章', 'public articles')}</span></div>
      </div>
    </section>
    <div className="page-shell">
      <CategoryNav record={record} records={records} onNavigate={onNavigate} />
      <section className="record-blog-index-results" aria-label={localize(record, '文章列表', 'Article list')}>
        <div className="record-blog-index-results-head"><div><span className="section-kicker">{record.path.includes('/category/') ? localize(record, '当前分类', 'Current category') : localize(record, '最新内容', 'Latest guides')}</span><h2>{record.path.includes('/category/') ? decodeURIComponent(record.path.split('/').pop()) : localize(record, '从公开内容到下一步动作', 'From public signals to the next action')}</h2></div><span>{allArticles.length} {localize(record, '篇', 'articles')}</span></div>
        <div className="record-blog-index-grid">
          {allArticles.map((article) => {
            const cover = imageMedia(article)[0]
            return <article className="record-blog-card" key={article.path}>
              <button className="record-blog-card-cover" onClick={() => onNavigate(article.path)} aria-label={textValue(article.h1)}>
                {cover ? <SourceImage media={cover} eager /> : <span className="record-blog-card-placeholder"><BookOpen size={24} /></span>}
                <span>{localize(record, '阅读文章', 'Read article')} <ArrowUpRight size={14} /></span>
              </button>
              <div className="record-blog-card-body">
                <div className="record-blog-card-meta"><span><Tag size={13} /> {categoryForArticle(article, records)}</span><small>MediaClaw</small></div>
                <h3><button onClick={() => onNavigate(article.path)}>{textValue(article.h1) || article.title}</button></h3>
                <p>{article.summary}</p>
                <button className="record-blog-text-link" onClick={() => onNavigate(article.path)}>{localize(record, '继续阅读', 'Continue reading')} <ArrowRight size={14} /></button>
              </div>
            </article>
          })}
        </div>
      </section>
    </div>
    <section className="record-blog-cta section-band"><div className="page-shell record-blog-cta-inner"><div><span className="eyebrow">{localize(record, '下一步', 'Next step')}</span><h2>{localize(record, '把公开样本变成可复用工作流', 'Turn a public sample into a repeatable workflow')}</h2></div><button className="button button-dark" onClick={() => onNavigate(record.locale === 'en' ? '/en/download' : '/download')}>{localize(record, '下载插件', 'Install extension')} <Download size={16} /></button></div></section>
  </main>
}

function ArticleMedia({ media, position = 'inline' }) {
  return <figure className={`record-blog-article-media ${position}`}><SourceImage media={media} /><figcaption>{media.alt || 'MediaClaw source media'}</figcaption></figure>
}

export function BlogArticleRecordPage({ record, onNavigate = () => {}, routeRecords = [] }) {
  const records = asRecords(routeRecords)
  const images = imageMedia(record)
  const sections = (record.sections || []).filter((section) => textValue(section.heading) || textValue(section.copy))
  const related = []
  for (const link of record.links || []) {
    const href = cleanHref(linkHref(link))
    if (!href || href === record.path || !isArticle(records.find((item) => item.path === href)) || related.some((item) => item.path === href)) continue
    related.push(records.find((item) => item.path === href))
  }
  for (const item of uniqueArticles(records, record.locale, record.path)) {
    if (related.length >= 3) break
    if (!related.some((entry) => entry.path === item.path)) related.push(item)
  }
  const category = categoryForArticle(record, records)
  const title = textValue(record.h1) || record.title

  return <main className="record-blog-article">
    <div className="page-shell record-blog-article-breadcrumb"><button onClick={() => onNavigate(record.locale === 'en' ? '/en/blog' : '/blog')}>{localize(record, '博客', 'Blog')}</button><ChevronRight size={14} /><span>{category}</span><ChevronRight size={14} /><span className="current">{title}</span></div>
    <section className="record-blog-article-head page-shell">
      <div className="record-blog-article-head-copy"><span className="eyebrow"><BookOpen size={14} /> {category} · MediaClaw</span><h1>{title}</h1><p>{record.summary}</p><div className="record-blog-source"><span><ShieldCheck size={14} /> {localize(record, '基于公开页面审计', 'Based on public-page audit')}</span>{record.source && <a href={record.source} target="_blank" rel="noreferrer">{localize(record, '查看来源', 'View source')} <ExternalLink size={13} /></a>}</div></div>
      {images[0] && <ArticleMedia media={images[0]} position="cover" />}
    </section>
    <div className="page-shell record-blog-article-layout">
      <aside className="record-blog-toc"><div className="record-blog-toc-inner"><span className="section-kicker"><List size={14} /> {localize(record, '目录', 'Contents')}</span><nav>{sections.map((section, index) => <a href={`#record-section-${index + 1}`} key={`${textValue(section.heading)}-${index}`}>{textValue(section.heading)}</a>)}</nav></div></aside>
      <article className="record-blog-article-body">
        {sections.map((section, index) => <div key={`${textValue(section.heading)}-${index}`}>
          <section id={`record-section-${index + 1}`} className="record-blog-section"><span className="record-blog-section-number">{String(index + 1).padStart(2, '0')}</span><h2>{textValue(section.heading)}</h2>{textValue(section.copy) && <p>{textValue(section.copy)}</p>}</section>
          {images[index + 1] && <ArticleMedia media={images[index + 1]} />}
        </div>)}
        {images.slice(sections.length + 1).map((media, index) => <ArticleMedia key={`${media.url}-${index}`} media={media} />)}
        <div className="record-blog-boundary-note"><ShieldCheck size={18} /><p>{localize(record, '本文页面仅重建公开站点信息，不连接账户、支付、采集后端或私有 API。使用公开内容时请遵守平台规则和原作者权利。', 'This reading page rebuilds public-site information only. It does not connect accounts, payments, collection backends, or private APIs. Follow platform rules and respect original authors when using public content.')}</p></div>
      </article>
    </div>
    <section className="record-blog-related section-band"><div className="page-shell"><div className="record-blog-related-head"><div><span className="eyebrow">{localize(record, '继续阅读', 'Keep reading')}</span><h2>{localize(record, '把同一套方法用到更多场景', 'Apply the same method to another scenario')}</h2></div><button className="record-blog-text-link" onClick={() => onNavigate(record.locale === 'en' ? '/en/blog' : '/blog')}>{localize(record, '返回博客', 'Back to blog')} <ArrowRight size={14} /></button></div><div className="record-blog-related-grid">{related.slice(0, 3).map((article) => <button key={article.path} onClick={() => onNavigate(article.path)}><span>{categoryForArticle(article, records)}</span><strong>{textValue(article.h1) || article.title}</strong><ArrowUpRight size={15} /></button>)}</div></div></section>
    <section className="record-blog-cta section-band"><div className="page-shell record-blog-cta-inner"><div><span className="eyebrow">{localize(record, '从一条公开内容开始', 'Start with one public sample')}</span><h2>{localize(record, '把研究结果接到下一步动作', 'Connect research to the next action')}</h2></div><button className="button button-dark" onClick={() => onNavigate(record.locale === 'en' ? '/en/download' : '/download')}>{localize(record, '下载插件', 'Install extension')} <Download size={16} /></button></div></section>
  </main>
}

export { LOCAL_MEDIA_BY_URL }
