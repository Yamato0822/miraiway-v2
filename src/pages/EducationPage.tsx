import type { FC } from 'hono/jsx'
import { Layout } from '../components/Layout'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { ActionLink } from '../components/ActionLink'
import { ServiceInquiryCTA } from '../components/ServiceInquiryCTA'

const educationPillars = [
  {
    number: '01',
    eyebrow: 'LANGUAGE',
    title: '日本語基礎・会話',
    description: '試験対策だけに偏らず、生活と職場で実際に使う聞く・話す力を段階的に身につけます。'
  },
  {
    number: '02',
    eyebrow: 'WORKPLACE',
    title: '職場コミュニケーション',
    description: '報告・連絡・相談、指示の確認、安全に関わる表現など、働く場面を想定して学びます。'
  },
  {
    number: '03',
    eyebrow: 'CULTURE',
    title: '生活・文化理解',
    description: '日本での暮らし方、時間や約束の考え方、地域のルールまで、来日前から具体的に共有します。'
  },
  {
    number: '04',
    eyebrow: 'SKILLS',
    title: '分野別の技能学習',
    description: '対応分野に合わせた基礎知識と実務への準備を、日本語学習と結びつけて進めます。'
  }
]

const curriculum = [
  ['01', '基礎日本語', '文字・語彙・文法・会話を、現在のレベルに合わせて積み上げます。'],
  ['02', '試験対策', '必要な日本語試験を見据え、理解度を確認しながら学習計画を調整します。'],
  ['03', '職場日本語', '挨拶、指示確認、報告・連絡・相談、安全確認を場面別に練習します。'],
  ['04', '生活オリエンテーション', '住居、交通、買い物、医療、防災など、日本で暮らすための基礎を学びます。'],
  ['05', '分野別技能学習', '業務内容に応じた専門用語、基本動作、注意事項を事前に確認します。'],
  ['06', '来日前最終準備', '企業情報、勤務条件、住居、渡航後の流れを整理し、不安や認識差を減らします。']
]

const learningPath = [
  ['01', 'LEVEL CHECK', '現在地を知る'],
  ['02', 'LEARNING PLAN', '学習計画を組む'],
  ['03', 'EDUCATION', '日本語・技能を学ぶ'],
  ['04', 'REVIEW', '定期的に確認する'],
  ['05', 'READY FOR JAPAN', '来日に備える']
]

export const EducationPage: FC = () => (
  <Layout
    title="日本語・技能教育 | MiraiWay"
    description="MiraiWayの日本語・技能教育。来日前から日本語、職場文化、生活ルール、分野別技能を学び、日本で働くための準備を支援します。"
  >
    <Header activePage="services" />

    <main id="page-main" class="service-detail-page service-detail-page--education">
      <section class="service-detail-hero">
        <div class="service-detail-hero__wordmark" aria-hidden="true">
          <span>MIRAI</span><span>WAY</span><span>EDUCATION</span>
        </div>
        <div class="service-detail-container service-detail-hero__inner">
          <nav class="service-breadcrumb" aria-label="パンくずリスト">
            <a href="/">ホーム</a><span aria-hidden="true">/</span>
            <a href="/#services-section">事業内容</a><span aria-hidden="true">/</span>
            <span aria-current="page">日本語・技能教育</span>
          </nav>

          <div class="service-detail-hero__grid">
            <div class="service-detail-hero__copy reveal">
              <div class="service-detail-label"><span>02</span><i></i><b>EDUCATION</b></div>
              <h1><span>来日前の学びを、</span><span>日本で働く力へ。</span></h1>
              <p>
                日本語、職場文化、生活ルール、専門技能。<br />
                就労開始に必要な準備を、段階的に積み重ねます。
              </p>
              <ActionLink href="/contact?type=education">教育内容について相談する</ActionLink>
            </div>
            <figure class="service-detail-hero__visual reveal">
              <img src="/static/images/service-education.jpg" alt="日本で働くためのビジネスマナーと日本語を学ぶ研修風景" width="600" height="400" decoding="async" />
              <figcaption><span>COLOMBO / TOKYO</span> LANGUAGE &amp; SKILLS PROGRAM</figcaption>
            </figure>
          </div>
        </div>
        <div class="service-detail-hero__gradient" aria-hidden="true"></div>
      </section>

      <section class="service-detail-intro">
        <div class="service-detail-container service-detail-intro__grid reveal">
          <p class="service-detail-kicker">OUR EDUCATION POLICY</p>
          <div>
            <h2>試験合格の先にある、<br />職場と生活まで見据える。</h2>
            <p>
              日本語を知識として覚えるだけでは、安心して働き続ける準備にはなりません。
              MiraiWayは、企業でのコミュニケーションと日本での暮らしを具体的に想定し、
              言葉・文化・技能をひとつの学習体験としてつなぎます。
            </p>
          </div>
        </div>
      </section>

      <section class="service-detail-section" aria-labelledby="education-pillars-title">
        <div class="service-detail-container">
          <div class="service-section-heading reveal">
            <p>01 / FOUR LEARNING PILLARS</p>
            <h2 id="education-pillars-title">働く準備を支える、4つの学び。</h2>
          </div>
          <div class="service-pillar-grid">
            {educationPillars.map((pillar) => (
              <article class="service-pillar reveal">
                <span class="service-pillar__number">{pillar.number}</span>
                <p class="service-pillar__eyebrow">{pillar.eyebrow}</p>
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section class="service-detail-section service-detail-section--soft" aria-labelledby="curriculum-title">
        <div class="service-detail-container service-editorial-grid">
          <div class="service-editorial-aside reveal">
            <p>02 / CURRICULUM</p>
            <h2 id="curriculum-title">段階的に積み上げる<br />実践カリキュラム。</h2>
            <p>学習状況と採用計画に合わせ、必要な内容と順序を整理します。</p>
          </div>
          <div class="service-curriculum-list">
            {curriculum.map(([number, title, description]) => (
              <article class="service-curriculum-row reveal">
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section class="service-path" aria-labelledby="learning-path-title">
        <div class="service-path__word" aria-hidden="true">LEARNING PATH</div>
        <div class="service-detail-container">
          <div class="service-section-heading service-section-heading--inverse reveal">
            <p>03 / LEARNING PATH</p>
            <h2 id="learning-path-title">現在地を知り、来日まで進む。</h2>
          </div>
          <ol class="service-path__steps">
            {learningPath.map(([number, eyebrow, title]) => (
              <li class="reveal">
                <span>{number}</span><p>{eyebrow}</p><h3>{title}</h3>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section class="service-detail-section" aria-labelledby="education-quality-title">
        <div class="service-detail-container service-quality-grid">
          <figure class="service-quality-grid__visual reveal">
            <img src="/static/images/activity-education.jpg" alt="日本語と技能を学ぶ教育環境" width="600" height="400" loading="lazy" decoding="async" />
            <figcaption>LEARN / PRACTICE / REVIEW</figcaption>
          </figure>
          <div class="service-quality-grid__copy reveal">
            <p class="service-detail-kicker">04 / QUALITY CONTROL</p>
            <h2 id="education-quality-title">学びっぱなしにしない、<br />確認と共有の仕組み。</h2>
            <p>学習の状況を確認し、必要に応じて計画や指導内容を見直します。</p>
            <ul class="service-check-list">
              <li>出席状況と学習進捗の確認</li>
              <li>定期面談と理解度の確認</li>
              <li>模擬試験・職場会話の練習</li>
              <li>面接・来日前準備との接続</li>
              <li>企業への進捗共有と認識合わせ</li>
            </ul>
          </div>
        </div>
      </section>

      <div class="service-detail-container service-detail-cta-wrap">
        <ServiceInquiryCTA
          eyebrow="EDUCATION CONSULTATION"
          title="必要な日本語力と教育内容を、採用計画から一緒に整理します。"
          description="採用予定の分野、時期、必要な日本語レベルを伺い、教育内容をご案内します。"
          href="/contact?type=education"
          linkLabel="教育内容について相談する"
        />
      </div>
    </main>

    <Footer />
  </Layout>
)
