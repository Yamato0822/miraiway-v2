import type { FC } from 'hono/jsx'
import { Layout } from '../components/Layout'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { LogoMark } from '../components/LogoMark'

export const Home: FC = () => {
  return (
    <Layout>
      {/* ===== Loading Screen ===== */}
      <div id="loading-screen">
        <div class="loader-content">
          <div class="loader-logo">
            <LogoMark width={72} height={72} />
          </div>
          <div class="loader-brand">MiraiWay</div>
          <p class="loader-tagline">国境を越えて、可能性はつながる。</p>
          <div class="loader-bar-track">
            <div class="loader-bar-fill" id="loader-bar-fill"></div>
          </div>
        </div>
      </div>

      <Header activePage="home" />

      <main id="page-main">
        {/* Custom Interactive Cursor */}
        <div id="custom-cursor" aria-hidden="true"></div>

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
            <div class="about-hero-row">
              <div class="about-hero-text reveal">
                <div class="about-label">
                  <span class="label-num">01</span>
                  <span class="label-divider">|</span>
                  <span class="label-text">ABOUT US</span>
                </div>
                <h2 class="about-title">
                  日本とスリランカを、<br />
                  可能性でつなぐ。
                </h2>
                <div class="about-title-line"></div>
                <p class="about-desc">
                  教育から就労、来日後の支援まで、<br />
                  国境を越えた挑戦を、一気通貫で支えます。
                </p>
              </div>
              <div class="about-hero-image reveal reveal-delay-1">
                <img src="/static/images/about-hills.jpg" alt="スリランカの丘陵" loading="lazy" />
              </div>
            </div>

            <div class="about-stats-row reveal">
              <div class="about-stat-box">
                <div class="stat-box-left">
                  <div class="stat-icon-wrap" style={{ background: 'rgba(232, 185, 90, 0.1)' }}>
                    <i class="fas fa-map-marker-alt" style={{ color: '#E8B95A' }}></i>
                  </div>
                  <div class="stat-info">
                    <div class="stat-number-wrap">
                      <span class="stat-num counter" data-target="2">
                        0
                      </span>
                      <span class="stat-unit">拠点</span>
                    </div>
                    <p class="stat-en">Japan &bull; Sri Lanka</p>
                    <div class="stat-jp-line"></div>
                    <p class="stat-jp">
                      日本とスリランカに拠点を構え、<br />
                      地域を越えて支援しています。
                    </p>
                  </div>
                </div>
                <div class="stat-box-right">
                  <div class="flag-pair">
                    <div class="flag-item">
                      <span class="flag-emoji">🇯🇵</span>
                      <span class="flag-name">Japan</span>
                    </div>
                    <div class="flag-connector">
                      <div class="flag-line"></div>
                      <i class="fas fa-exchange-alt flag-arrow"></i>
                      <div class="flag-line"></div>
                    </div>
                    <div class="flag-item">
                      <span class="flag-emoji">🇱🇰</span>
                      <span class="flag-name">Sri Lanka</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="stat-divider"></div>

              <div class="about-stat-box reveal reveal-delay-1">
                <div class="stat-box-left">
                  <div class="stat-icon-wrap" style={{ background: '#F0F4F8' }}>
                    <i class="fas fa-users" style={{ color: '#5482B0' }}></i>
                  </div>
                  <div class="stat-info">
                    <div class="stat-number-wrap">
                      <span class="stat-num counter" data-target="4">
                        0
                      </span>
                      <span class="stat-unit">分野</span>
                    </div>
                    <p class="stat-en">介護・外食・建設・農業</p>
                    <div class="stat-jp-line"></div>
                    <p class="stat-jp">
                      多様な分野で、人材の可能性を<br />
                      広げています。
                    </p>
                  </div>
                </div>
                <div class="stat-box-right stat-chart-area">
                  <div class="mini-chart four-bars">
                    <div class="bar-col">
                      <div class="bar blue-bar bar-animate" data-bar-height="40"></div>
                      <i class="fas fa-user-nurse bar-icon"></i>
                    </div>
                    <div class="bar-col">
                      <div class="bar green-bar bar-animate" data-bar-height="60"></div>
                      <i class="fas fa-utensils bar-icon"></i>
                    </div>
                    <div class="bar-col">
                      <div class="bar yellow-bar bar-animate" data-bar-height="80"></div>
                      <i class="fas fa-hard-hat bar-icon"></i>
                    </div>
                    <div class="bar-col">
                      <div class="bar navy-bar bar-animate" data-bar-height="100"></div>
                      <i class="fas fa-seedling bar-icon"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="about-features-row">
              <div class="feature-card reveal">
                <div class="feature-dot blue-dot"></div>
                <div class="feature-content">
                  <div class="feature-icon">
                    <i class="fas fa-book-open"></i>
                  </div>
                  <div class="feature-text">
                    <h4>現地教育</h4>
                    <p>日本語・文化・技能教育を通じて、来日前の準備を支援。</p>
                  </div>
                  <div class="feature-arrow">
                    <i class="fas fa-arrow-right"></i>
                  </div>
                </div>
              </div>
              <div class="feature-card reveal reveal-delay-1">
                <div class="feature-dot green-dot"></div>
                <div class="feature-content">
                  <div class="feature-icon">
                    <i class="fas fa-handshake"></i>
                  </div>
                  <div class="feature-text">
                    <h4>人材紹介</h4>
                    <p>企業と人材を適切につなぎ、最適な出会いを設計。</p>
                  </div>
                  <div class="feature-arrow">
                    <i class="fas fa-arrow-right"></i>
                  </div>
                </div>
              </div>
              <div class="feature-card reveal reveal-delay-2">
                <div class="feature-dot yellow-dot"></div>
                <div class="feature-content">
                  <div class="feature-icon">
                    <i class="fas fa-hands-holding-child"></i>
                  </div>
                  <div class="feature-text">
                    <h4>来日・定着支援</h4>
                    <p>手続きから生活支援まで、長期的な活躍を支える。</p>
                  </div>
                  <div class="feature-arrow">
                    <i class="fas fa-arrow-right"></i>
                  </div>
                </div>
              </div>
            </div>

            <div class="about-trust-row reveal">
              <div class="trust-left">
                <div class="trust-icon">
                  <i class="fas fa-shield-alt"></i>
                </div>
                <p class="trust-text">
                  MiraiWayは、信頼とサポートを大切に、<br />
                  共に未来をつくります。
                </p>
              </div>
              <div class="trust-right">
                <div class="trust-item">
                  <i class="fas fa-user-friends"></i>
                  <span>
                    一人ひとりに寄り添う<br />
                    丁寧なサポート
                  </span>
                </div>
                <div class="trust-item">
                  <i class="fas fa-check-circle"></i>
                  <span>
                    安心・安全を守る<br />
                    透明性の高い運営
                  </span>
                </div>
                <div class="trust-item">
                  <i class="fas fa-chart-line"></i>
                  <span>
                    継続的な成長を支える<br />
                    パートナーシップ
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 02 Services ===== */}
        <section id="services-section" class="num-section transparent-section">
          <div class="section-inner">
            <div class="num-head reveal">
              <span class="big-num">02</span>
              <div class="num-titles">
                <span class="eyebrow">SERVICES</span>
                <h2>5つの支援で、未来へつなぐ。</h2>
              </div>
            </div>

            <svg aria-hidden="true" style={{ position: 'absolute', width: 0, height: 0 }}>
              <defs>
                <linearGradient id="premium-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#E8B95A" />
                  <stop offset="100%" stop-color="#102F52" />
                </linearGradient>
              </defs>
            </svg>

            <div class="service-showcase-list">
              {/* Service 1 */}
              <div class="service-showcase-item split reveal animated-icon-card">
                <div class="service-text">
                  <h3 class="service-title">人材マッチング</h3>
                  <p class="service-desc">
                    スリランカの優秀な特定技能人材と日本企業を、圧倒的な精度でマッチングします。
                    単なるスキルだけでなく、企業の文化や社風、人材のキャリアプランまでを深く考慮。
                    採用後のミスマッチを極限まで減らし、長期的な戦力となる人材をご紹介します。
                  </p>
                  <div class="card-action-bottom">
                    <a href="/contact" class="btn-link-animated magnetic">
                      <span>詳しくはこちら</span>
                      <i class="fas fa-arrow-right"></i>
                    </a>
                  </div>
                </div>
                <div class="service-visual glass-card-large">
                  <div class="animated-svg-wrapper huge-svg">
                    <span class="material-symbols-outlined material-service-icon" aria-hidden="true">
                      handshake
                    </span>
                  </div>
                </div>
              </div>

              {/* Service 2 */}
              <div class="service-showcase-item split-reverse reveal animated-icon-card">
                <div class="service-visual glass-card-large">
                  <div class="animated-svg-wrapper huge-svg">
                    <span class="material-symbols-outlined material-service-icon" aria-hidden="true">
                      auto_stories
                    </span>
                  </div>
                </div>
                <div class="service-text">
                  <h3 class="service-title">日本語教育</h3>
                  <p class="service-desc">
                    来日前から、徹底した日本語教育と日本文化の理解を深めるプログラムを提供します。
                    語学力だけでなく、日本のビジネスにおけるマナーや習慣までを実践的にカバーすることで、
                    配属初日から即戦力として、スムーズに現場へ溶け込むことができる体制を整えています。
                  </p>
                  <div class="card-action-bottom">
                    <a href="/contact" class="btn-link-animated magnetic">
                      <span>詳しくはこちら</span>
                      <i class="fas fa-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>

              {/* Service 3 */}
              <div class="service-showcase-item split reveal animated-icon-card">
                <div class="service-text">
                  <h3 class="service-title">企業サポート</h3>
                  <p class="service-desc">
                    受け入れ企業様向けに、スリランカ人材の特性を熟知したコンサルティングを提供します。
                    法務手続きの代行から、異文化コミュニケーションのコツ、社内体制の構築アドバイスまで、
                    初めて外国人材を雇用する企業様でも安心して受け入れられるよう全面的にバックアップします。
                  </p>
                  <div class="card-action-bottom">
                    <a href="/contact" class="btn-link-animated magnetic">
                      <span>詳しくはこちら</span>
                      <i class="fas fa-arrow-right"></i>
                    </a>
                  </div>
                </div>
                <div class="service-visual glass-card-large">
                  <div class="animated-svg-wrapper huge-svg">
                    <span class="material-symbols-outlined material-service-icon" aria-hidden="true">
                      domain_add
                    </span>
                  </div>
                </div>
              </div>

              {/* Service 4 */}
              <div class="service-showcase-item split-reverse reveal animated-icon-card">
                <div class="service-visual glass-card-large">
                  <div class="animated-svg-wrapper huge-svg">
                    <span class="material-symbols-outlined material-service-icon" aria-hidden="true">
                      volunteer_activism
                    </span>
                  </div>
                </div>
                <div class="service-text">
                  <h3 class="service-title">定着支援</h3>
                  <p class="service-desc">
                    就労開始後も、定期的な面談や生活サポートを通じて、人材の長期的な活躍を支援します。
                    些細な悩みやキャリア相談に母国語で対応し、企業様と人材双方の懸け橋となります。
                    単なる労働力の提供ではなく、「人と人との絆」を育む定着支援をお約束します。
                  </p>
                  <div class="card-action-bottom">
                    <a href="/contact" class="btn-link-animated magnetic">
                      <span>詳しくはこちら</span>
                      <i class="fas fa-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>

              {/* Service 5 (New) */}
              <div class="service-showcase-item split reveal animated-icon-card">
                <div class="service-text">
                  <h3 class="service-title">動画制作</h3>
                  <p class="service-desc">
                    スリランカ現地での採用PRや企業ブランディングに特化した高品質なプロモーション動画を制作します。
                    言葉や文化の壁を越え、企業の魅力や実際の職場環境、先輩スタッフの声を映像で直感的に伝えることで、
                    応募意欲を高め、質の高い人材の母集団形成を推進します。
                  </p>
                  <div class="card-action-bottom">
                    <a href="/contact" class="btn-link-animated magnetic">
                      <span>詳しくはこちら</span>
                      <i class="fas fa-arrow-right"></i>
                    </a>
                  </div>
                </div>
                <div class="service-visual glass-card-large">
                  <div class="animated-svg-wrapper huge-svg">
                    <span class="material-symbols-outlined material-service-icon" aria-hidden="true">
                      videocam
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 03 Process ===== */}
        <section id="process-section" class="num-section transparent-section sticky-scroll-section">
          <div class="dark-dissolve-overlay" id="dark-dissolve-overlay"></div>
          <div class="sticky-container">
            <div class="process-bg-image parallax-bg" aria-hidden="true"></div>

            <div class="horizontal-scroll-track" id="process-track">
              {/* Intro Panel */}
              <div class="journey-panel intro-panel">
                <div class="num-head">
                  <span class="big-num">03</span>
                  <div class="num-titles">
                    <span class="eyebrow">PROCESS</span>
                    <h2>ご利用の流れ</h2>
                  </div>
                </div>
                <p class="section-desc">
                  スリランカの優秀な人材が、<br />
                  あなたの企業で活躍するまでの道のり。
                </p>
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
                  <div class="card-image-placeholder">
                    <i class="far fa-image placeholder-icon"></i>
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

        {/* ===== 04 Contact ===== */}
        <section id="contact-section" class="num-section dark-contact-section">
          <div class="contact-glow-bg"></div>
          <div class="contact-bg-image" aria-hidden="true"></div>

          <div class="contact-inner-wrap reveal">
            <div class="contact-glass-container">
              <div class="num-head center-head">
                <span class="big-num">04</span>
                <div class="num-titles">
                  <span class="eyebrow">CONTACT</span>
                </div>
              </div>

              <h2 class="contact-title">
                未来への第一歩を、<br />
                ここから始めましょう。
              </h2>
              <p class="contact-desc">
                スリランカ人材の採用に関するご相談や、<br />
                サービスに関するご質問など、まずはお気軽にお問い合わせください。
              </p>

              <div class="contact-features-mini">
                <div class="c-feature-item">
                  <i class="fas fa-check-circle"></i>
                  <span>ご相談・資料請求無料</span>
                </div>
                <div class="c-feature-item">
                  <i class="fas fa-bolt"></i>
                  <span>スピーディな回答</span>
                </div>
                <div class="c-feature-item">
                  <i class="fas fa-shield-alt"></i>
                  <span>現地～来日後も一括支援</span>
                </div>
              </div>

              <div class="contact-cta-wrapper">
                <a href="/contact" class="btn-ultra-cta magnetic">
                  <span class="btn-content">
                    <span class="btn-text">お問い合わせフォームへ</span>
                    <span class="arrow-wrap">
                      <i class="fas fa-arrow-right"></i>
                    </span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </Layout>
  )
}
