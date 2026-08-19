import { ArrowRight, BookOpen, ChevronRight, ExternalLink, ShieldCheck } from 'lucide-react'
import './legalRecordPages.css'

const text = (section) => section?.text || section?.heading || ''

export function LegalRecordPage({ record, onNavigate = () => {} }) {
  const isEnglish = record.locale === 'en'
  const sections = (record.sections || []).slice(1).filter((section) => text(section))
  const home = isEnglish ? '/en' : '/'
  const other = record.path.includes('privacy')
    ? (isEnglish ? '/en/terms-of-service' : '/terms-of-service')
    : (isEnglish ? '/en/privacy-policy' : '/privacy-policy')
  return <main className="legal-record-page">
    <section className="legal-record-hero">
      <div className="page-shell legal-record-hero-inner">
        <div>
          <div className="legal-record-breadcrumb"><button onClick={() => onNavigate(home)}>MediaClaw</button><ChevronRight size={14} /><span>{isEnglish ? 'Legal' : '法律页面'}</span></div>
          <span className="eyebrow"><ShieldCheck size={14} /> {isEnglish ? 'Public structure · review draft' : '公开结构 · 评审草稿'}</span>
          <h1>{record.h1}</h1>
          <p>{record.summary}</p>
        </div>
        <div className="legal-record-note"><ShieldCheck size={20} /><strong>{isEnglish ? 'Not legal advice' : '不是法律意见'}</strong><span>{isEnglish ? 'The route structure is preserved for review. Dates, entities, and final legal wording must be confirmed before production use.' : '当前仅保留公开页面结构用于评审。日期、主体和最终法律文本在生产使用前必须重新确认。'}</span></div>
      </div>
    </section>
    <section className="page-shell legal-record-layout">
      <aside className="legal-record-toc"><span className="section-kicker"><BookOpen size={14} /> {isEnglish ? 'On this page' : '本页目录'}</span><nav>{sections.map((section, index) => <a key={`${text(section)}-${index}`} href={`#legal-section-${index + 1}`}>{text(section)}</a>)}</nav><button className="legal-record-related" onClick={() => onNavigate(other)}>{isEnglish ? 'Read the other legal page' : '查看另一份法律页面'} <ArrowRight size={14} /></button></aside>
      <article className="legal-record-body">
        <div className="legal-record-intro"><span className="section-kicker">{isEnglish ? 'Scope and status' : '范围与状态'}</span><p>{isEnglish ? 'This local page mirrors the headings and navigation observed on the public route. It intentionally does not invent policy language, retention periods, processing purposes, or contact details that were not captured in the audit.' : '本地页面复刻公开路由中观察到的标题层级和导航。审计未捕获的政策正文、保留期限、处理目的和联系方式不会在这里被臆造。'}</p></div>
        {sections.map((section, index) => <section id={`legal-section-${index + 1}`} className={`legal-record-section level-${section.level || 2}`} key={`${text(section)}-${index}`}><span className="legal-record-number">{String(index + 1).padStart(2, '0')}</span><h2>{text(section)}</h2><p>{isEnglish ? 'This section is represented by the public route heading. Confirm the final policy text with the service owner before relying on it.' : '此区块按公开路由标题保留。正式使用前，请与服务主体确认最终政策文本。'}</p></section>)}
        <div className="legal-record-boundary"><ShieldCheck size={18} /><p>{isEnglish ? 'Production boundary: this rebuild does not collect personal data, process payments, or make legal commitments. It is a front-end structure preview.' : '生产边界：本地重建不会收集个人数据、处理支付或作出法律承诺，仅作为前端结构预览。'}</p></div>
        <a className="legal-record-source" href={record.source} target="_blank" rel="noreferrer">{isEnglish ? 'Open observed source' : '打开观察到的来源'} <ExternalLink size={13} /></a>
      </article>
    </section>
  </main>
}
