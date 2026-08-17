import type { FC } from 'hono/jsx'
import { Layout } from '../components/Layout'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { ActionLink } from '../components/ActionLink'
import { ServiceInquiryCTA } from '../components/ServiceInquiryCTA'

const talentSupport = [
  '入国・生活立ち上げの案内',
  '住居・行政手続きに関する情報整理',
  '定期面談と生活相談',
  '職場でのコミュニケーション支援',
  '日本語学習の継続サポート'
]

const companySupport = [
  '受け入れ前の確認事項整理',
  '社内担当者との連絡・状況共有',
  '異文化コミュニケーション支援',
  '職場課題の早期把握',
  '提携する支援機関との連携'
]

const retentionTimeline = [
  ['BEFORE', '来日前', '企業と人材の認識をそろえ、住居や受け入れ準備を確認します。'],
  ['DAY 01', '生活立ち上げ', '入国後の移動、生活開始、必要な手続きの流れを案内します。'],
  ['DAY 30', '初期状況確認', '仕事と生活の困りごとを確認し、小さな違和感を早めに整理します。'],
  ['DAY 90', '職場・生活面談', '本人と企業の双方から状況を伺い、必要な調整につなげます。'],
  ['ONGOING', '継続支援', '定期的な連絡と相談を通じ、働き続けられる環境づくりに伴走します。']
]

const responseFlow = [
  ['01', '相談・状況把握'],
  ['02', '本人・企業双方への確認'],
  ['03', '課題と優先順位の整理'],
  ['04', '提携機関との連携'],
  ['05', '対応後の経過確認']
]

export const RetentionPage: FC = () => (
  <Layout
    title="受け入れ・定着支援 | MiraiWay"
    description="MiraiWayの受け入れ・定着支援。来日前の準備から就労後の定期面談、生活相談、企業との連携まで継続して伴走します。"
  >
    <Header activePage="services" />

    <main id="page-main" class="service-detail-page service-detail-page--retention">
      <section class="service-detail-hero">
        <div class="service-detail-hero__wordmark" aria-hidden="true">
          <span>STAY</span><span>SUPPORT</span><span>MIRAIWAY</span>
        </div>
        <div class="service-detail-container service-detail-hero__inner">
          <nav class="service-breadcrumb" aria-label="パンくずリスト">
            <a href="/">ホーム</a><span aria-hidden="true">/</span>
            <a href="/#services-section">事業内容</a><span aria-hidden="true">/</span>
            <span aria-current="page">受け入れ・定着支援</span>
          </nav>

          <div class="service-detail-hero__grid">
            <div class="service-detail-hero__copy reveal">
              <div class="service-detail-label"><span>03</span><i></i><b>RETENTION SUPPORT</b></div>
              <h1><span>来日を、</span><span>ゴールにしない。</span></h1>
              <p>
                人材と企業の双方に寄り添い、職場と生活の課題を早期に把握。<br />
                就労開始後も、働き続けられる環境づくりに伴走します。
              </p>
              <ActionLink href="/contact?type=retention">定着支援について相談する</ActionLink>
            </div>
            <figure class="service-detail-hero__visual reveal">
              <img src="/static/images/service-retention.jpg" alt="就労後の生活とキャリアについて相談する様子" />
              <figcaption><span>PEOPLE / COMPANY</span> CONTINUOUS SUPPORT</figcaption>
            </figure>
          </div>
        </div>
        <div class="service-detail-hero__gradient" aria-hidden="true"></div>
      </section>

      <section class="service-detail-intro">
        <div class="service-detail-container service-detail-intro__grid reveal">
          <p class="service-detail-kicker">OUR RETENTION POLICY</p>
          <div>
            <h2>人材だけでも、企業だけでもない。<br />双方をつなぐ支援。</h2>
            <p>
              定着には、生活の安心と働きやすい職場の両方が必要です。
              MiraiWayは本人からの相談だけでなく、受け入れ企業との連絡や状況整理も行い、
              課題が大きくなる前に必要な支援へつなぎます。
            </p>
          </div>
        </div>
      </section>

      <section class="service-detail-section" aria-labelledby="two-side-support-title">
        <div class="service-detail-container">
          <div class="service-section-heading reveal">
            <p>01 / TWO-SIDED SUPPORT</p>
            <h2 id="two-side-support-title">働く人と、受け入れる企業へ。</h2>
          </div>
          <div class="support-dual-grid">
            <article class="support-dual-panel reveal">
              <span class="support-dual-panel__label">FOR TALENT</span>
              <h3>人材への支援</h3>
              <p>生活と仕事の両面から、不安や困りごとを相談できる接点をつくります。</p>
              <ul>{talentSupport.map((item) => <li>{item}</li>)}</ul>
            </article>
            <div class="support-dual-bridge" aria-hidden="true">
              <span>M</span><i></i><b>MIRAIWAY</b>
            </div>
            <article class="support-dual-panel support-dual-panel--company reveal">
              <span class="support-dual-panel__label">FOR COMPANY</span>
              <h3>受け入れ企業への支援</h3>
              <p>受け入れ準備から職場での状況共有まで、企業側に必要な支援も一つの窓口でつなぎます。</p>
              <ul>{companySupport.map((item) => <li>{item}</li>)}</ul>
            </article>
          </div>
        </div>
      </section>

      <section class="service-detail-section service-detail-section--soft" aria-labelledby="retention-timeline-title">
        <div class="service-detail-container">
          <div class="service-section-heading reveal">
            <p>02 / CONTINUOUS TIMELINE</p>
            <h2 id="retention-timeline-title">来日前から、就労後の日常まで。</h2>
          </div>
          <ol class="retention-timeline">
            {retentionTimeline.map(([time, title, description]) => (
              <li class="reveal">
                <span>{time}</span><div><h3>{title}</h3><p>{description}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section class="retention-response" aria-labelledby="response-flow-title">
        <div class="retention-response__word" aria-hidden="true">STAY CONNECTED</div>
        <div class="service-detail-container retention-response__grid">
          <div class="retention-response__copy reveal">
            <p class="service-detail-kicker">03 / RESPONSE FLOW</p>
            <h2 id="response-flow-title">問題が起きたときこそ、<br />状況を丁寧に整理する。</h2>
            <p>
              一方の話だけで判断せず、本人と企業の双方から状況を確認します。
              MiraiWayだけで対応できない事項は、提携機関や必要な専門先と連携します。
            </p>
          </div>
          <ol class="retention-response__steps">
            {responseFlow.map(([number, title]) => (
              <li class="reveal"><span>{number}</span><h3>{title}</h3></li>
            ))}
          </ol>
        </div>
      </section>

      <section class="service-detail-section" aria-labelledby="support-system-title">
        <div class="service-detail-container support-system-grid">
          <figure class="support-system-grid__visual reveal">
            <img src="/static/images/service-retention.png" alt="日本とスリランカのメンバーが連携する支援体制" loading="lazy" />
            <figcaption>ONE TEAM / TWO COUNTRIES</figcaption>
          </figure>
          <div class="support-system-grid__copy reveal">
            <p class="service-detail-kicker">04 / SUPPORT SYSTEM</p>
            <h2 id="support-system-title">必要な支援へつなぐ、<br />連携体制。</h2>
            <p>
              MiraiWayは、教育・日常連絡・状況整理を担い、法定支援など専門性が必要な事項は、
              提携する登録支援機関や関係先と連携します。担当範囲を明確にしながら、情報が途切れない体制をつくります。
            </p>
            <div class="support-system-diagram" aria-label="支援連携体制">
              <span>人材</span><i></i><strong>MiraiWay</strong><i></i><span>受け入れ企業</span>
              <small>提携する登録支援機関・関係先と連携</small>
            </div>
          </div>
        </div>
      </section>

      <div class="service-detail-container service-detail-cta-wrap">
        <ServiceInquiryCTA
          eyebrow="RETENTION CONSULTATION"
          title="受け入れ前の準備から、就労後の定着までご相談ください。"
          description="現在の受け入れ体制やお困りごとを伺い、必要な支援と連携方法を整理します。"
          href="/contact?type=retention"
          linkLabel="定着支援について相談する"
        />
      </div>
    </main>

    <Footer />
  </Layout>
)
