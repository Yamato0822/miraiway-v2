import type { FC } from 'hono/jsx'
import { Layout } from '../components/Layout'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { SectionHeading } from '../components/SectionHeading'
import { ActionLink } from '../components/ActionLink'
import { ContactCTA } from '../components/ContactCTA'
import { NewsList } from '../components/NewsList'
import { newsItems } from '../data/news'

export const Home: FC = () => {
  return (
    <Layout>
      <Header activePage="home" />

      <main id="page-main">

        {/* Kinetic Typography Background */}
        <div class="kinetic-bg" aria-hidden="true">
          <div class="kinetic-track">
            <span>MIRAI WAY &mdash; CONNECTING THE FUTURE &mdash; BEYOND BORDERS &mdash; </span>
            <span>MIRAI WAY &mdash; CONNECTING THE FUTURE &mdash; BEYOND BORDERS &mdash; </span>
          </div>
        </div>

        {/* Floating Particles Canvas */}
        <canvas id="particles-canvas" aria-hidden="true"></canvas>

        {/* Global Path Background */}
        <div class="global-path-wrapper" aria-hidden="true">
          <svg id="global-path-svg" class="global-path" viewBox="0 0 1440 6000" preserveAspectRatio="xMidYMin slice">
            <defs>
              <linearGradient id="globalPathGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#e8b95a" />
                <stop offset="5%" stop-color="#f2e3c4" />
                <stop offset="15%" stop-color="#9bbde0" />
                <stop offset="35%" stop-color="#e8b95a" />
                <stop offset="60%" stop-color="#9bbde0" />
                <stop offset="85%" stop-color="#e8b95a" />
                <stop offset="100%" stop-color="#0b2039" />
              </linearGradient>
              <radialGradient id="globeGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.95" />
                <stop offset="50%" stop-color="#e8b95a" stop-opacity="0.5" />
                <stop offset="100%" stop-color="#e8b95a" stop-opacity="0" />
              </radialGradient>
            </defs>
            <path id="animated-path" d="" fill="none" stroke="url(#globalPathGrad)" stroke-width="80" stroke-linecap="round" opacity="0.85" />
            <path id="animated-path-highlight" d="" fill="none" stroke="#ffffff" stroke-width="20" stroke-linecap="round" opacity="0.3" />
            <circle id="globe-glow-circle" cx="985" cy="385" r="50" fill="url(#globeGlow)" />
          </svg>
        </div>

        {/* ===== Hero ===== */}
        <section id="hero-section">
          <div class="hero-inner">
            <div class="hero-copy reveal">
              <h1 class="hero-title">
                国境を越えて、<br />
                可能性はつながる。
              </h1>
              <p class="hero-lead">
                スリランカと日本をつなぎ、<br />
                人材のキャリアと企業の未来を支えます。
              </p>
              <a href="#services-section" class="text-link" id="hero-cta">
                サービスを見る <span class="arrow">&rarr;</span>
              </a>
            </div>
            <div class="hero-globe-wrap">
              <div class="typography-globe" aria-hidden="true">
                <canvas id="typography-globe-canvas" width="1000" height="1000" role="presentation"></canvas>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 01 About ===== */}
        <section id="about-section" class="num-section">
          <div class="about-container">
            {/* ===== MapLibre GL JS Precision Scrollytelling Section ===== */}
            <div class="real-map-section-wrapper" id="real-map-scrolly-wrapper">
              <div class="real-map-sticky-container">
                <div
                  id="maplibre-vector-map"
                  class="maplibre-map-canvas"
                  role="img"
                  aria-label="スリランカのコロンボから日本の東京へつながる支援ルート"
                ></div>

                {/* Background Kinetic Typography for Map Section */}
                <div class="map-kinetic-text-wrap" aria-hidden="true">
                  <div class="map-kinetic-text-track">
                    SRI LANKA &mdash;&mdash;&mdash;&mdash; TO &mdash;&mdash;&mdash;&mdash; JAPAN &bull; BORDERLESS CAREER PATHWAY &bull; SRI LANKA &mdash;&mdash;&mdash;&mdash; TO &mdash;&mdash;&mdash;&mdash; JAPAN &bull; BORDERLESS CAREER PATHWAY &bull;
                  </div>
                </div>

                {/* Apple-Style Precision Top Indicator Bar */}
                <div class="map-top-bar">
                  <div class="map-bar-left">
                    <span class="bar-title">GLOBAL BRIDGE &amp; PATHWAY</span>
                  </div>
                  <div class="map-bar-right">
                    <span class="bar-phase-indicator" id="map-phase-text">PHASE 1: 現地教育・人材選定</span>
                    <span class="map-route-progress" aria-hidden="true">
                      <span class="map-route-progress-fill" id="map-route-progress-fill"></span>
                    </span>
                  </div>
                </div>

                {/* Floating Role Information Panels */}
                {/* 1. Sri Lanka Hub Panel */}
                <div class="map-info-floating-panel srilanka-floating" id="panel-srilanka">
                  <div class="panel-inner">
                    <span class="float-badge">START / 01</span>
                    <h3 class="float-title">スリランカ拠点 (Colombo)</h3>
                    <div class="float-coords">6.9271° N &bull; 79.8612° E</div>
                    <p class="float-desc">
                      自社直営スクールでの高度日本語教育、日本文化習得、技能・マナー研修を実施。企業様との厳選面接・内定まで一気通貫で伴走します。
                    </p>
                  </div>
                </div>

                {/* 2. Japan Hub Panel */}
                <div class="map-info-floating-panel japan-floating" id="panel-japan">
                  <div class="panel-inner">
                    <span class="float-badge orange">ARRIVAL / 02</span>
                    <h3 class="float-title">日本拠点 (Tokyo)</h3>
                    <div class="float-coords">35.6762° N &bull; 139.6503° E</div>
                    <p class="float-desc">
                      在留資格手続き、空港出迎え、住居手配、就労開始後の生活サポートから中長期的なキャリア形成・WORK &amp; RETENTIONまで全面支援。
                    </p>
                    <div class="float-photo-box">
                      <img src="/static/images/tokyo-skyline.jpg" alt="東京の都市景観" loading="lazy" />
                      <div class="float-photo-caption">
                        <strong>WORK &amp; RETENTION</strong>
                        <span>東京タワーから見た、革新の街並み</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="map-data-credit">
                  Map: <a href="https://openfreemap.org/" target="_blank" rel="noopener noreferrer">OpenFreeMap</a>
                  <span aria-hidden="true"> · </span>
                  Boundaries: <a href="https://www.geoboundaries.org/" target="_blank" rel="noopener noreferrer">geoBoundaries</a>
                </div>
              </div>
            </div>

            <SectionHeading
              number="01"
              eyebrow="ABOUT US"
              title="日本とスリランカを、可能性でつなぐ。"
              description="教育から就労、来日後の支援まで。国境を越えた挑戦を、一気通貫で支えます。"
              align="center"
              className="about-section-heading reveal"
            />

            <div class="activity-rail reveal" id="activity-rail" data-activity-rail>
              <div class="activity-rail__header">
                <div>
                  <span>OUR ACTIVITIES</span>
                  <p>両国でつながる、6つの取り組み</p>
                </div>
                <div class="activity-rail__controls">
                  <button type="button" data-rail-prev aria-label="前の活動を見る">
                    <i class="fas fa-arrow-left" aria-hidden="true"></i>
                  </button>
                  <button type="button" data-rail-next aria-label="次の活動を見る">
                    <i class="fas fa-arrow-right" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
              <div
                class="activity-rail__viewport"
                data-rail-viewport
                tabindex="0"
                role="region"
                aria-label="MiraiWayの6つの取り組み。左右の矢印キーでも操作できます。"
              >
                {/* Set 1 */}
                <article class="activity-card">
                  <img src="/static/images/activity-education.jpg" alt="現地直営スクールでの高度日本語教育" loading="lazy" />
                  <div class="marquee-card-overlay">
                    <span class="marquee-badge">EDUCATION &bull; SRI LANKA</span>
                    <h3 class="marquee-card-title">現地直営スクールでの高度日本語・技能研修</h3>
                  </div>
                </article>

                <article class="activity-card">
                  <img src="/static/images/activity-collaboration.jpg" alt="日本企業とスリランカ人材の選考・交流" loading="lazy" />
                  <div class="marquee-card-overlay">
                    <span class="marquee-badge">MATCHING &bull; INTERVIEW</span>
                    <h3 class="marquee-card-title">日本企業と志の高い人材の厳選マッチング</h3>
                  </div>
                </article>

                <article class="activity-card">
                  <img src="/static/images/about-hills.jpg" alt="スリランカ現地の自然環境" loading="lazy" />
                  <div class="marquee-card-overlay">
                    <span class="marquee-badge">HUB &bull; COLOMBO</span>
                    <h3 class="marquee-card-title">豊かな文化と教育基盤を持つスリランカ拠点</h3>
                  </div>
                </article>

                <article class="activity-card">
                  <img src="/static/images/tokyo-skyline.jpg" alt="日本拠点・東京での就労＆定着支援" loading="lazy" />
                  <div class="marquee-card-overlay">
                    <span class="marquee-badge">CAREER &bull; TOKYO</span>
                    <h3 class="marquee-card-title">東京拠点での生活立ち上げ・定着伴走サポート</h3>
                  </div>
                </article>

                <article class="activity-card">
                  <img src="/static/images/about-feature.png" alt="特定技能教育・実務トレーニング" loading="lazy" />
                  <div class="marquee-card-overlay">
                    <span class="marquee-badge">TRAINING &bull; SKILLS</span>
                    <h3 class="marquee-card-title">建築・介護・農業の専門実務トレーニング</h3>
                  </div>
                </article>

                <article class="activity-card">
                  <img src="/static/images/miraiway-pathway.jpg" alt="日ス両国をつなぐ国際パートナーシップ" loading="lazy" />
                  <div class="marquee-card-overlay">
                    <span class="marquee-badge">BRIDGE &bull; FUTURE</span>
                    <h3 class="marquee-card-title">国境を越えた挑戦を育む持続可能なエコシステム</h3>
                  </div>
                </article>

              </div>
              <p class="activity-rail__hint">
                <i class="fas fa-arrows-left-right" aria-hidden="true"></i>
                ドラッグ、スワイプ、左右キーで移動
              </p>
            </div>

            {/* ===== Corporate Infographic Architecture (Miraiway2 Clean 3-Step Cards) ===== */}
            <div class="corp-infographic-wrapper">
              <div class="corp-infographic-grid">
                {/* STEP 01 */}
                <div class="corp-step-card reveal">
                  <div class="step-card-header">
                    <span class="step-badge">STEP 01</span>
                    <span class="step-eyebrow">LOCAL EDUCATION</span>
                  </div>
                  <span class="num-display">01</span>
                  <h3 class="step-card-title">現地教育</h3>
                  <p class="step-card-desc">
                    日本語・文化・技能を体系的に学び、来日前の不安を減らします。
                  </p>
                  <span class="step-corner" aria-hidden="true">01</span>
                </div>

                {/* STEP 02 */}
                <div class="corp-step-card reveal reveal-delay-1">
                  <div class="step-card-header">
                    <span class="step-badge">STEP 02</span>
                    <span class="step-eyebrow">MATCHING</span>
                  </div>
                  <span class="num-display">02</span>
                  <h3 class="step-card-title">人材紹介</h3>
                  <p class="step-card-desc">
                    企業と人材の希望を丁寧に結び、納得感のある選考を支えます。
                  </p>
                  <span class="step-corner" aria-hidden="true">02</span>
                </div>

                {/* STEP 03 */}
                <div class="corp-step-card reveal reveal-delay-2">
                  <div class="step-card-header">
                    <span class="step-badge">STEP 03</span>
                    <span class="step-eyebrow">SETTLEMENT SUPPORT</span>
                  </div>
                  <span class="num-display">03</span>
                  <h3 class="step-card-title">来日・定着支援</h3>
                  <p class="step-card-desc">
                    行政手続きから生活相談まで、就労後も切れ目なく伴走します。
                  </p>
                  <span class="step-corner" aria-hidden="true">03</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Dual-Line Counter-Flowing Kinetic Marquee Divider ===== */}
        <div class="dual-kinetic-divider" aria-hidden="true">
          <div class="kinetic-line line-left">
            <div class="line-track">
              MIRAIWAY CONNECTING FUTURES &bull; EMPOWERING TALENT &bull; SUSTAINABLE GROWTH &bull; MIRAIWAY CONNECTING FUTURES &bull; EMPOWERING TALENT &bull; SUSTAINABLE GROWTH &bull;
            </div>
          </div>
          <div class="kinetic-line line-right">
            <div class="line-track">
              BRIDGING NATIONS &bull; CREATING OPPORTUNITIES &bull; BORDERLESS PATHWAY &bull; BRIDGING NATIONS &bull; CREATING OPPORTUNITIES &bull; BORDERLESS PATHWAY &bull;
            </div>
          </div>
        </div>

        {/* ===== 02 News Section ===== */}
        <section id="news-section" class="news-split-section">
          <div class="news-split-container">
            <div class="news-left-col reveal">
              <SectionHeading number="02" eyebrow="NEWS" title="お知らせ" />
              <div class="news-action-wrap">
                <ActionLink href="/news" variant="text">お知らせ一覧へ</ActionLink>
              </div>
            </div>
            <div class="news-right-col reveal">
              <NewsList items={newsItems.slice(0, 3)} variant="home" />
            </div>
          </div>
        </section>

        {/* ===== 03 Services ===== */}
        <section id="services-section" class="num-section transparent-section">
          {/* Background Kinetic Typography for Services Section */}
          <div class="bg-kinetic-text-wrap" aria-hidden="true">
            <div class="bg-kinetic-text-track">
              GLOBAL TALENT ECOSYSTEM &bull; SRI LANKA TO JAPAN &bull; BORDERLESS PATHWAY &bull; GLOBAL TALENT ECOSYSTEM &bull; SRI LANKA TO JAPAN &bull; BORDERLESS PATHWAY &bull;
            </div>
          </div>
          <div class="section-inner">
            <SectionHeading
              number="03"
              eyebrow="SERVICES"
              title="採用前から、就労後の定着まで。"
              description="人材・企業の双方に必要な支援をつなぎ、ひとつの窓口から伴走します。"
              className="services-section-heading reveal"
            />

            <div class="service-showcase-list">
              {/* Service 1 */}
              <div class="service-showcase-item split reveal animated-icon-card">
                <div class="service-text">
                  <span class="service-index">01 / MATCHING</span>
                  <h3 class="service-title">人材マッチング</h3>
                  <p class="service-desc">
                    候補者の技能や経験だけでなく、希望する働き方や企業側の受け入れ条件も確認します。
                    面談までの情報共有を丁寧に行い、双方が納得できる選考を支えます。
                  </p>
                  <div class="card-action-bottom">
                    <ActionLink href="/contact" variant="text">人材採用について相談する</ActionLink>
                  </div>
                </div>
                <div class="service-visual glass-card-large service-image-card">
                  <img src="/static/images/service-matching.jpg" alt="人材マッチング" class="service-img" />
                </div>
              </div>

              {/* Service 2 */}
              <div class="service-showcase-item split-reverse reveal animated-icon-card">
                <div class="service-visual glass-card-large service-image-card">
                  <img src="/static/images/service-education.jpg" alt="日本語教育" class="service-img" />
                </div>
                <div class="service-text">
                  <span class="service-index">02 / EDUCATION</span>
                  <h3 class="service-title">日本語・技能教育</h3>
                  <p class="service-desc">
                    来日前から日本語、日本での生活ルール、職場で必要な報告・連絡・相談を学びます。
                    対応分野に合わせた技能学習とあわせて、就労開始に向けた準備を進めます。
                  </p>
                  <div class="card-action-bottom">
                    <ActionLink href="/contact" variant="text">教育内容について相談する</ActionLink>
                  </div>
                </div>
              </div>

              {/* Service 3 */}
              <div class="service-showcase-item split reveal animated-icon-card">
                <div class="service-text">
                  <span class="service-index">03 / CORPORATE SUPPORT</span>
                  <h3 class="service-title">企業サポート</h3>
                  <p class="service-desc">
                    受け入れに必要な確認事項を整理し、提携機関と連携しながら手続きや社内準備をご案内します。
                    異文化コミュニケーションや受け入れ体制づくりも、企業の状況に合わせて支援します。
                  </p>
                  <div class="card-action-bottom">
                    <ActionLink href="/contact" variant="text">受け入れ準備について相談する</ActionLink>
                  </div>
                </div>
                <div class="service-visual glass-card-large service-image-card">
                  <img src="/static/images/service-corporate.jpg" alt="企業サポート" class="service-img" />
                </div>
              </div>

              {/* Service 4 */}
              <div class="service-showcase-item split-reverse reveal animated-icon-card">
                <div class="service-visual glass-card-large service-image-card">
                  <img src="/static/images/service-retention.png" alt="定着支援" class="service-img" />
                </div>
                <div class="service-text">
                  <span class="service-index">04 / RETENTION</span>
                  <h3 class="service-title">定着支援</h3>
                  <p class="service-desc">
                    就労開始後も定期面談や生活相談を通じて、職場・生活上の課題を早期に把握します。
                    人材と企業の双方と連絡を取りながら、継続して働ける環境づくりを支援します。
                  </p>
                  <div class="card-action-bottom">
                    <ActionLink href="/contact" variant="text">定着支援について相談する</ActionLink>
                  </div>
                </div>
              </div>

              {/* Service 5 (Creative) */}
              <div class="service-showcase-item service-showcase-item--creative split reveal animated-icon-card">
                <div class="service-text">
                  <span class="service-index">05 / CROSS-FUNCTIONAL SUPPORT</span>
                  <h3 class="service-title">Creative <small>採用活動を横断して支える</small></h3>
                  <p class="service-desc">
                    採用広報、企業ブランディング、写真・動画などのコンテンツ制作を通じて、01〜04の支援を横断的に補完します。
                    企業や職場の情報を分かりやすく届け、候補者との接点づくりと母集団形成を支えます。
                  </p>
                  <div class="card-action-bottom">
                    <ActionLink href="/contact" variant="text">採用広報について相談する</ActionLink>
                  </div>
                </div>
                <div class="service-visual glass-card-large service-image-card">
                  <img src="/static/images/service-creative.jpg" alt="Creative" class="service-img" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 04 Process ===== */}
        <section id="process-section" class="num-section transparent-section sticky-scroll-section">
          <div class="dark-dissolve-overlay" id="dark-dissolve-overlay"></div>
          <div class="sticky-container">
            <div class="process-bg-image parallax-bg" aria-hidden="true"></div>

            <div class="horizontal-scroll-track" id="process-track">
              {/* Intro Panel */}
              <div class="journey-panel intro-panel">
                <SectionHeading
                  number="04"
                  eyebrow="PROCESS"
                  title="ご利用の流れ"
                  description="ご相談から就労開始、その後の定着支援までを一つずつ進めます。"
                />
              </div>

              {/* Progress Line */}
              <div class="journey-progress-container">
                <div class="journey-line"></div>
                <div class="journey-line-fill" id="journey-line-fill"></div>
              </div>

              {/* Step 1 */}
              <div class="journey-panel step-panel">
                <div class="watermark-num" data-speed="0.8">
                  01
                </div>
                <div class="glass-card parallax-card" data-speed="1.2">
                  <div class="card-image-placeholder">
                    <i class="far fa-image placeholder-icon"></i>
                  </div>
                  <div class="card-content">
                    <div class="step-icon-hz">
                      <i class="fas fa-envelope-open-text"></i>
                    </div>
                    <h3>お問い合わせ</h3>
                    <p>まずはご要望や課題をお聞かせください。最適な人材プランをご提案します。</p>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div class="journey-panel step-panel">
                <div class="watermark-num" data-speed="0.8">
                  02
                </div>
                <div class="glass-card parallax-card" data-speed="1.2">
                  <div class="card-image-placeholder">
                    <i class="far fa-image placeholder-icon"></i>
                  </div>
                  <div class="card-content">
                    <div class="step-icon-hz">
                      <i class="fas fa-users"></i>
                    </div>
                    <h3>人材選定</h3>
                    <p>現地の独自のネットワークを活用し、貴社のニーズに最も合致する候補者を厳選します。</p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div class="journey-panel step-panel">
                <div class="watermark-num" data-speed="0.8">
                  03
                </div>
                <div class="glass-card parallax-card" data-speed="1.2">
                  <div class="card-image-placeholder">
                    <i class="far fa-image placeholder-icon"></i>
                  </div>
                  <div class="card-content">
                    <div class="step-icon-hz">
                      <i class="fas fa-comments"></i>
                    </div>
                    <h3>面接・選考</h3>
                    <p>オンライン面接を通じて、直接候補者と対話いただけます。通訳サポートも完備しています。</p>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div class="journey-panel step-panel">
                <div class="watermark-num" data-speed="0.8">
                  04
                </div>
                <div class="glass-card parallax-card" data-speed="1.2">
                  <div class="card-image-placeholder">
                    <i class="far fa-image placeholder-icon"></i>
                  </div>
                  <div class="card-content">
                    <div class="step-icon-hz">
                      <i class="fas fa-passport"></i>
                    </div>
                    <h3>入国準備</h3>
                    <p>ビザの申請や日本での生活に向けたオリエンテーションなど、複雑な手続きを代行します。</p>
                  </div>
                </div>
              </div>

              {/* Step 5 */}
              <div class="journey-panel step-panel end-panel">
                <div class="watermark-num" data-speed="0.8">
                  05
                </div>
                <div class="glass-card parallax-card" data-speed="1.2">
                  <div class="card-image-wrap">
                    <img src="/static/images/flow-employment.png" alt="就労開始" class="flow-card-img" />
                  </div>
                  <div class="card-content">
                    <div class="step-icon-hz">
                      <i class="fas fa-heart-circle-check"></i>
                    </div>
                    <h3>就労開始</h3>
                    <p>日本での新しいキャリアがスタート。就労後も定期的なメンタリングで定着を支援します。</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div id="contact-section" class="home-contact-wrap reveal">
          <ContactCTA />
        </div>
      </main>

      <Footer />
    </Layout>
  )
}
