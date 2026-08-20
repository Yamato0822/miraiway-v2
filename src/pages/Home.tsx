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
    <Layout canonicalPath="/" cinematicOpening>
      <Header activePage="home" />

      <main id="page-main">

        {/* Floating Particles Canvas */}
        <canvas id="particles-canvas" aria-hidden="true"></canvas>

        {/* Global Path Background */}
        <div class="global-path-wrapper" aria-hidden="true">
          <svg id="global-path-svg" class="global-path" viewBox="0 0 1440 6000" preserveAspectRatio="xMidYMin slice">
            <defs>
              <linearGradient id="globalPathGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#38bdf8" stop-opacity="0" />
                <stop offset="5%" stop-color="#9bbde0" />
                <stop offset="15%" stop-color="#9bbde0" />
                <stop offset="35%" stop-color="#38bdf8" />
                <stop offset="60%" stop-color="#9bbde0" />
                <stop offset="85%" stop-color="#1d4ed8" />
                <stop offset="100%" stop-color="#0b2039" />
              </linearGradient>
            </defs>
            <path id="animated-path" d="" fill="none" stroke="url(#globalPathGrad)" stroke-width="80" stroke-linecap="round" opacity="0.85" />
            <path id="animated-path-highlight" d="" fill="none" stroke="#ffffff" stroke-width="20" stroke-linecap="round" opacity="0.3" />
          </svg>
        </div>

        {/* ===== Hero → Midnight Journey (one continuous scroll scene) ===== */}
        <section id="hero-journey-section" aria-label="スリランカと日本をつなぐストーリー">
          <div class="hero-journey-sticky">
            <div id="journey-dark-bg" aria-hidden="true"></div>
            <div id="journey-dawn-bloom" aria-hidden="true"></div>
            <canvas id="stage-canvas" aria-hidden="true"></canvas>
            <div id="opening-identity" class="opening-identity" aria-label="MiraiWay オープニング">
              <p class="opening-identity__eyebrow">PARTICLES OF POSSIBILITY</p>
              <p class="opening-identity__hint">MOVE TO SHAPE THE FUTURE</p>
              <button
                id="skip-opening-btn"
                class="opening-identity__skip"
                type="button"
                onclick="window.__MIRAI_SKIP_OPENING_REQUESTED = true"
              >
                SKIP INTRO <span aria-hidden="true">↘</span>
              </button>
            </div>
            <div id="grain-overlay" aria-hidden="true"></div>
            <div id="vignette-overlay" aria-hidden="true"></div>
            <div id="scanline-overlay" aria-hidden="true"></div>

            <div id="hero-initial-layer">
              <section id="hero-section">
                <div class="hero-inner">
                  <div class="hero-copy reveal">
                    <h1 class="hero-title">
                      <span class="hero-title__line">国境を越えて、</span>
                      <span class="hero-title__line hero-title__line--closing">
                        <span class="animated-marker-wrap">
                          <span class="animated-marker-bg"></span>
                          <span class="animated-marker-text">可能性は</span>
                        </span>
                        <span class="hero-title__closing">つながる。</span>
                      </span>
                    </h1>
                    <p class="hero-lead">
                      スリランカと日本をつなぎ、<br />
                      人材のキャリアと企業の未来を支えます。
                    </p>
                    <a href="#services-section" class="text-link" id="hero-cta">
                      サービスを見る <span class="arrow">&rarr;</span>
                    </a>
                  </div>
                  <div class="hero-globe-wrap hero-morph-globe-wrap">
                    <div class="typography-globe" aria-hidden="true">
                      <canvas id="typography-globe-canvas" width="1000" height="1000" role="presentation"></canvas>
                    </div>
                  </div>
                </div>

                {/* Kinetic Typography Background - Positioned below 'サービスを見る' */}
                <div class="kinetic-bg" aria-hidden="true">
                  <div class="kinetic-track">
                    <span>MIRAI WAY &mdash; CONNECTING THE FUTURE &mdash; BEYOND BORDERS &mdash;&nbsp;</span>
                    <span>MIRAI WAY &mdash; CONNECTING THE FUTURE &mdash; BEYOND BORDERS &mdash;&nbsp;</span>
                  </div>
                </div>
              </section>
            </div>

            <div id="hero-stage" class="hero-stage-telemetry" aria-live="polite">
              {/* Top Navigation / Skip button */}
              <div class="hero-stage-topbar">
                <button type="button" id="skip-universe-btn" class="skip-universe-btn" aria-label="スキップしてトップページへ進む">
                  <span class="skip-btn-text">スキップ</span>
                  <svg class="skip-btn-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
              </div>

              {/* Left Flank Editorial Telemetry */}
              <div class="hero-telemetry-left">
                <h2 class="hero-country">
                  <span class="country-word-wrap">
                    <span class="country-word" id="hero-country-word" lang="en">Sri Lanka</span>
                  </span>
                </h2>
              </div>

              {/* Bottom 3-Step Pure White & Straight-Line Telemetry Grid */}
              <div class="hero-mission-steps" aria-label="MiraiWay 3つの支援ステップ">
                <div class="mission-steps-header">
                  <span class="steps-label">SUPPORT PROCESS</span>
                  <span class="steps-progress-track">
                    <span id="hero-steps-seeker" class="steps-progress-seeker"></span>
                  </span>
                </div>

                <div class="mission-steps-grid">
                  {/* Step 01 */}
                  <div id="step-node-1" class="step-node is-active" data-step="1">
                    <div class="step-node-top">
                      <span class="step-node-num">01</span>
                      <span class="step-node-category">LOCAL EDUCATION</span>
                    </div>
                    <h3 class="step-node-title">現地教育</h3>
                    <p class="step-node-desc">日本語・文化・技能を体系的に学び、来日前の不安を減らします。</p>
                  </div>

                  {/* Step 02 */}
                  <div id="step-node-2" class="step-node" data-step="2">
                    <div class="step-node-top">
                      <span class="step-node-num">02</span>
                      <span class="step-node-category">MATCHING</span>
                    </div>
                    <h3 class="step-node-title">人材紹介</h3>
                    <p class="step-node-desc">企業と人材の希望を丁寧に結び、納得感のある選考を支えます。</p>
                  </div>

                  {/* Step 03 */}
                  <div id="step-node-3" class="step-node" data-step="3">
                    <div class="step-node-top">
                      <span class="step-node-num">03</span>
                      <span class="step-node-category">SETTLEMENT SUPPORT</span>
                    </div>
                    <h3 class="step-node-title">来日・定着支援</h3>
                    <p class="step-node-desc">行政手続きから生活相談まで、就労後も切れ目なく伴走します。</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 01 About ===== */}
        <section id="about-section" class="num-section">
          <div class="about-container">
            <SectionHeading
              number="01"
              eyebrow="ABOUT US"
              title="日本とスリランカを、可能性でつなぐ。"
              titleLines={['日本とスリランカを、', '可能性でつなぐ。']}
              description="教育から就労、来日後の支援まで。国境を越えた挑戦を、一気通貫で支えます。"
              align="center"
              className="about-section-heading reveal"
            />

            <div class="activity-rail reveal" id="activity-rail" data-activity-rail>
              <div
                class="activity-rail__viewport"
                data-rail-viewport
                tabindex="0"
                role="region"
                aria-roledescription="カルーセル"
                aria-label="MiraiWayの6つの取り組み。左右の矢印キーでも操作できます。"
              >
                {/* Set 1 */}
                <article class="activity-card" data-slide-index="0" role="group" aria-label="1 / 6">
                  <img src="/static/images/activity-education.jpg" alt="現地直営スクールでの高度日本語教育" width="480" height="300" loading="lazy" decoding="async" />
                  <div class="marquee-card-overlay">
                    <span class="marquee-badge">EDUCATION &bull; SRI LANKA</span>
                    <h3 class="marquee-card-title">現地直営スクールでの高度日本語・技能研修</h3>
                  </div>
                </article>

                <article class="activity-card" data-slide-index="1" role="group" aria-label="2 / 6">
                  <img src="/static/images/activity-collaboration.jpg" alt="日本企業とスリランカ人材の選考・交流" width="480" height="300" loading="lazy" decoding="async" />
                  <div class="marquee-card-overlay">
                    <span class="marquee-badge">MATCHING &bull; INTERVIEW</span>
                    <h3 class="marquee-card-title">日本企業と志の高い人材の厳選マッチング</h3>
                  </div>
                </article>

                <article class="activity-card" data-slide-index="2" role="group" aria-label="3 / 6">
                  <img src="/static/images/about-hills.jpg" alt="スリランカ現地の自然環境" width="480" height="300" loading="lazy" decoding="async" />
                  <div class="marquee-card-overlay">
                    <span class="marquee-badge">HUB &bull; COLOMBO</span>
                    <h3 class="marquee-card-title">豊かな文化と教育基盤を持つスリランカ拠点</h3>
                  </div>
                </article>

                <article class="activity-card" data-slide-index="3" role="group" aria-label="4 / 6">
                  <img src="/static/images/tokyo-skyline.jpg" alt="日本拠点・東京での就労＆定着支援" width="480" height="300" loading="lazy" decoding="async" />
                  <div class="marquee-card-overlay">
                    <span class="marquee-badge">CAREER &bull; TOKYO</span>
                    <h3 class="marquee-card-title">東京拠点での生活立ち上げ・定着伴走サポート</h3>
                  </div>
                </article>

                <article class="activity-card" data-slide-index="4" role="group" aria-label="5 / 6">
                  <img src="/static/images/about-feature.png" alt="特定技能教育・実務トレーニング" width="480" height="300" loading="lazy" decoding="async" />
                  <div class="marquee-card-overlay">
                    <span class="marquee-badge">TRAINING &bull; SKILLS</span>
                    <h3 class="marquee-card-title">建築・介護・農業の専門実務トレーニング</h3>
                  </div>
                </article>

                <article class="activity-card" data-slide-index="5" role="group" aria-label="6 / 6">
                  <img src="/static/images/miraiway-pathway.jpg" alt="日ス両国をつなぐ国際パートナーシップ" width="480" height="300" loading="lazy" decoding="async" />
                  <div class="marquee-card-overlay">
                    <span class="marquee-badge">BRIDGE &bull; FUTURE</span>
                    <h3 class="marquee-card-title">国境を越えた挑戦を育む持続可能なエコシステム</h3>
                  </div>
                </article>

              </div>
              <div class="activity-rail__detail" data-activity-detail>
                <div class="activity-rail__count" aria-hidden="true">
                  <span class="activity-rail__count-current" data-activity-current>01</span>
                  <span class="activity-rail__count-separator">/</span>
                  <span class="activity-rail__count-total">06</span>
                </div>
                <div class="activity-rail__detail-copy" data-activity-detail-copy>
                  <span class="activity-rail__detail-kicker" data-activity-kicker>
                    EDUCATION &bull; SRI LANKA
                  </span>
                  <h3 class="activity-rail__detail-title" data-activity-title>
                    現地直営スクールでの高度日本語・技能研修
                  </h3>
                </div>
                <div class="activity-rail__navigation" aria-label="活動スライド操作">
                  <div class="activity-rail__dots" role="group" aria-label="活動を選択">
                    <button type="button" data-rail-dot="0" aria-label="活動1を表示"></button>
                    <button type="button" data-rail-dot="1" aria-label="活動2を表示"></button>
                    <button type="button" data-rail-dot="2" aria-label="活動3を表示"></button>
                    <button type="button" data-rail-dot="3" aria-label="活動4を表示"></button>
                    <button type="button" data-rail-dot="4" aria-label="活動5を表示"></button>
                    <button type="button" data-rail-dot="5" aria-label="活動6を表示"></button>
                  </div>
                </div>
              </div>
              <p class="sr-only" data-rail-status aria-live="polite">活動1 / 6</p>
            </div>


          </div>
        </section>

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
                    <ActionLink href="/contact?type=matching" variant="text">人材採用について相談する</ActionLink>
                  </div>
                </div>
                <div class="service-visual glass-card-large service-image-card">
                  <img src="/static/images/service-matching.jpg" alt="人材マッチング" width="600" height="375" class="service-img" loading="lazy" decoding="async" />
                </div>
              </div>

              {/* Service 2 */}
              <div class="service-showcase-item split-reverse reveal animated-icon-card">
                <div class="service-visual glass-card-large service-image-card">
                  <img src="/static/images/service-education.jpg" alt="日本語教育" width="600" height="375" class="service-img" loading="lazy" decoding="async" />
                </div>
                <div class="service-text">
                  <span class="service-index">02 / EDUCATION</span>
                  <h3 class="service-title">日本語・技能教育</h3>
                  <p class="service-desc">
                    来日前から日本語、日本での生活ルール、職場で必要な報告・連絡・相談を学びます。
                    対応分野に合わせた技能学習とあわせて、就労開始に向けた準備を進めます。
                  </p>
                  <div class="card-action-bottom">
                    <ActionLink href="/services/education" variant="text">日本語・技能教育を詳しく見る</ActionLink>
                  </div>
                </div>
              </div>

              {/* Service 3 */}
              <div class="service-showcase-item split-reverse reveal animated-icon-card">
                <div class="service-visual glass-card-large service-image-card">
                  <img src="/static/images/service-retention.png" alt="定着支援" width="600" height="375" class="service-img" loading="lazy" decoding="async" />
                </div>
                <div class="service-text">
                  <span class="service-index">03 / RETENTION SUPPORT</span>
                  <h3 class="service-title">受け入れ・定着支援</h3>
                  <p class="service-desc">
                    来日前の受け入れ準備から、就労後の定期面談や生活相談まで継続して支援します。
                    人材と企業の双方と連絡を取り、職場・生活上の課題を早期に整理します。
                  </p>
                  <div class="card-action-bottom">
                    <ActionLink href="/services/retention" variant="text">受け入れ・定着支援を詳しく見る</ActionLink>
                  </div>
                </div>
              </div>

              {/* Service 5 (Creative - Full Width Seamless Canvas with Double 3D Devices) */}
              <div class="service-showcase-item service-showcase-item--creative split reveal animated-icon-card">
                {/* Dark Dissolve Overlay (Fades in from white background as user scrolls) */}
                <div class="creative-dissolve-overlay" aria-hidden="true"></div>

                {/* Creative Camera HUD Overlay */}
                <div class="creative-hud" aria-hidden="true">
                  <span class="hud-corner top-left">+</span>
                </div>

                {/* Hyper 5-Track Dynamic Kinetic Typography Background */}
                <div class="creative-marquee-bg" aria-hidden="true">
                  <div class="creative-marquee-track track-1">
                    <span>CREATIVE &bull; BRANDING &bull; CONTENT &bull; VIDEO &bull; DESIGN &bull; MEDIA &bull; INNOVATION &bull;&nbsp;</span>
                    <span>CREATIVE &bull; BRANDING &bull; CONTENT &bull; VIDEO &bull; DESIGN &bull; MEDIA &bull; INNOVATION &bull;&nbsp;</span>
                  </div>
                  <div class="creative-marquee-track track-2">
                    <span>PRODUCTION &bull; STORYTELLING &bull; VISUAL &bull; MOTION &bull; STUDIO 4K &bull; CINEMATOGRAPHY &bull;&nbsp;</span>
                    <span>PRODUCTION &bull; STORYTELLING &bull; VISUAL &bull; MOTION &bull; STUDIO 4K &bull; CINEMATOGRAPHY &bull;&nbsp;</span>
                  </div>
                  <div class="creative-marquee-track track-3">
                    <span>12K CINEMA &bull; DIRECTION &bull; RECRUITMENT &bull; GLOBAL MEDIA &bull; CREATIVE STUDIO &bull;&nbsp;</span>
                    <span>12K CINEMA &bull; DIRECTION &bull; RECRUITMENT &bull; GLOBAL MEDIA &bull; CREATIVE STUDIO &bull;&nbsp;</span>
                  </div>
                  <div class="creative-marquee-track track-4">
                    <span>DIGITAL ART &bull; BRAND STRATEGY &bull; ENGAGEMENT &bull; HIGH IMPACT &bull; VISUAL STORY &bull;&nbsp;</span>
                    <span>DIGITAL ART &bull; BRAND STRATEGY &bull; ENGAGEMENT &bull; HIGH IMPACT &bull; VISUAL STORY &bull;&nbsp;</span>
                  </div>
                  <div class="creative-marquee-track track-5">
                    <span>CREATIVE DIRECTION &bull; MOTION GRAPHICS &bull; 60FPS &bull; PREMIUM PRODUCTION &bull;&nbsp;</span>
                    <span>CREATIVE DIRECTION &bull; MOTION GRAPHICS &bull; 60FPS &bull; PREMIUM PRODUCTION &bull;&nbsp;</span>
                  </div>
                </div>

                {/* Aurora Glows */}
                <div class="creative-aurora" aria-hidden="true">
                  <span class="creative-aurora__glow creative-aurora__glow--gold"></span>
                  <span class="creative-aurora__glow creative-aurora__glow--sky"></span>
                  <span class="creative-aurora__glow creative-aurora__glow--purple"></span>
                  <span class="creative-aurora__glow creative-aurora__glow--cyan"></span>
                </div>

                <div class="service-text interactive-invert-box lens-projected-text">
                  <div class="text-spotlight-lens" aria-hidden="true"></div>
                  <span class="service-index"><i class="fas fa-video" aria-hidden="true"></i> CROSS-FUNCTIONAL SUPPORT</span>
                  <h3 class="service-title">Creative</h3>
                  <p class="service-desc">
                    採用広報、企業ブランディング、写真・動画などのコンテンツ制作を通じて、01〜03の支援を横断的に補完します。
                    企業や職場の情報を分かりやすく届け、候補者との接点づくりと母集団形成を支えます。
                  </p>
                </div>

                {/* Double 3D Devices Stage (Transparent User Camera PNG + Smartphone with Video) */}
                <div class="creative-devices-stage">
                  {/* Real Photorealistic 3D Cinema Camera Device Mockup (User Transparent PNG) */}
                  <div class="creative-camera-real-3d" aria-hidden="true">
                    <div class="camera-img-wrap">
                      <div class="camera-lens-flare"></div>
                      <div class="camera-lens-beam"></div>
                      <img src="/static/images/transparent-cinema-camera.png" alt="Cinema Camera" class="camera-real-img" />
                      <div class="camera-glow-ring"></div>
                    </div>
                  </div>

                  {/* 3D Pop-out Smartphone with Real Video */}
                  <div class="creative-phone-3d">
                    <div class="phone-body">
                      <div class="phone-notch"></div>
                      <div class="phone-button power"></div>
                      <div class="phone-button vol-up"></div>
                      <div class="phone-button vol-down"></div>
                      <div class="phone-screen">
                        <video
                          autoplay
                          loop
                          muted
                          playsinline
                          poster="/static/images/service-creative.jpg"
                          class="phone-video"
                        >
                          <source src="/static/videos/vertical-promo-video.mp4" type="video/mp4" />
                        </video>
                        <button
                          type="button"
                          class="phone-video-control"
                          aria-label="Creative動画を一時停止"
                          aria-pressed="false"
                        >
                          <i class="fas fa-pause" aria-hidden="true"></i>
                        </button>
                        <span class="sr-only phone-video-status" aria-live="polite">
                          Creative動画を再生しています
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 04 Process ===== */}
        <section id="process-section" class="num-section transparent-section sticky-scroll-section">
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
              <div class="journey-panel step-panel" data-process-step="1">
                <div class="watermark-num" data-speed="0.8">
                  01
                </div>
                <div class="glass-card parallax-card" data-speed="1.2">
                  <div class="card-image-wrap">
                    <img src="/static/images/flow-step1-consultation.jpg" alt="お問い合わせ" width="400" height="250" class="flow-card-img" loading="lazy" decoding="async" />
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
              <div class="journey-panel step-panel" data-process-step="2">
                <div class="watermark-num" data-speed="0.8">
                  02
                </div>
                <div class="glass-card parallax-card" data-speed="1.2">
                  <div class="card-image-wrap">
                    <img src="/static/images/flow-step2-selection.jpg" alt="人材選定" width="400" height="250" class="flow-card-img" loading="lazy" decoding="async" />
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
              <div class="journey-panel step-panel" data-process-step="3">
                <div class="watermark-num" data-speed="0.8">
                  03
                </div>
                <div class="glass-card parallax-card" data-speed="1.2">
                  <div class="card-image-wrap">
                    <img src="/static/images/flow-step3-interview.jpg" alt="面接・選考" width="400" height="250" class="flow-card-img" loading="lazy" decoding="async" />
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
              <div class="journey-panel step-panel" data-process-step="4">
                <div class="watermark-num" data-speed="0.8">
                  04
                </div>
                <div class="glass-card parallax-card" data-speed="1.2">
                  <div class="card-image-wrap">
                    <img src="/static/images/flow-step4-visa-prep.jpg" alt="入国準備" width="400" height="250" class="flow-card-img" loading="lazy" decoding="async" />
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
              <div class="journey-panel step-panel end-panel" data-process-step="5">
                <div class="watermark-num" data-speed="0.8">
                  05
                </div>
                <div class="glass-card parallax-card" data-speed="1.2">
                  <div class="card-image-wrap">
                    <img src="/static/images/flow-step5-employment.jpg" alt="就労開始" width="400" height="250" class="flow-card-img" loading="lazy" decoding="async" />
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

      <script src="/static/midnight-journey.js"></script>
      <script src="/static/about-editorial.js"></script>
      <Footer />
    </Layout>
  )
}
