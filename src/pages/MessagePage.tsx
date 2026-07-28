import type { FC } from 'hono/jsx'
import { Layout } from '../components/Layout'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { LogoMark } from '../components/LogoMark'

export const MessagePage: FC = () => {
  return (
    <Layout
      title="メッセージ・ビジョン | MiraiWay - どこで生まれても、挑戦できる世界へ。"
      description="MiraiWayのビジョンとメッセージページです。生まれた場所の違いで未来の可能性が閉ざされない世界へ。国を越えた協業によって、新しい未来への道をひらきます。"
    >
      <Header activePage="message" />

      <main id="page-main" class="message-page-main">

        {/* ===== 1. Hero Section with 3D Isometric MIRAIWAY Pathway ===== */}
        <section class="message-hero-section">
          {/* Background Rays & Smooth Waves */}
          <div class="hero-sunbeams" aria-hidden="true"></div>
          <div class="hero-wave-bg" aria-hidden="true"></div>

          <div class="message-container">
            <div class="hero-split-layout">
              {/* Left Column: Text & CTA */}
              <div class="hero-text-col">
                <div class="hero-eyebrow-tag">
                  生まれた場所の違いで、<br />
                  未来の可能性が閉ざされない世界へ。
                </div>

                <h1 class="hero-main-heading">
                  どこで生まれても、<br />
                  挑戦できる。
                </h1>

                <p class="hero-desc-lead">
                  MiraiWayは、見えない不平等の壁に向き合い、<br />
                  国を越えた協業によって、新しい未来への道をひらきます。
                </p>

                <div class="hero-btn-wrap">
                  <a href="#vision-cards" class="btn-vision-primary">
                    <span>私たちのビジョンを見る</span>
                    <i class="fas fa-chevron-right"></i>
                  </a>
                </div>
              </div>

              {/* Right Column: Executive Message Hero Graphic (executive-message-hero.png) */}
              <div class="hero-graphic-col">
                <div class="isometric-seamless-wrapper">
                  <img
                    src="/static/images/executive-message-hero.png"
                    alt="MiraiWay Special Design Graphic"
                    class="hero-pathway-transparent-img"
                    loading="eager"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 2. Vision Cards Section (01 & 02) ===== */}
        <section id="vision-cards" class="vision-cards-section">
          <div class="message-container">
            <div class="vision-cards-stack">

              {/* Vision Card 01: Global Globe & Orbital Rings */}
              <div class="vision-card-row reveal">
                <div class="vision-card-left">
                  <div class="card-num-badge">
                    <span class="num-text">01</span>
                    <div class="num-line-accent"></div>
                  </div>

                  <div class="card-text-body">
                    <h2 class="card-heading-title">
                      挑戦を文化にし、<br />
                      世界の幸せを形にする。
                    </h2>
                    <p class="card-desc-body">
                      私たちは、理不尽な課題の前でも立ち止まりません。<br />
                      自ら抱え直す、ロールモデルとなる覚覚を持って、前進し続けます。
                    </p>
                  </div>
                </div>

                <div class="vision-card-right">
                  <div class="interactive-globe-container">
                    <canvas id="vision-globe-canvas" width="440" height="440" role="img" aria-label="3D Interactive Globe"></canvas>
                    <div class="globe-overlay-rings" aria-hidden="true">
                      <div class="orbit-ring ring-1"></div>
                      <div class="orbit-ring ring-2"></div>
                      <div class="orbit-ring ring-3"></div>
                      <div class="globe-center-glow"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vision Card 02: Cross-Border Connecting Hands */}
              <div class="vision-card-row reveal">
                <div class="vision-card-left">
                  <div class="card-num-badge">
                    <span class="num-text">02</span>
                    <div class="num-line-accent"></div>
                  </div>

                  <div class="card-text-body">
                    <h2 class="card-heading-title">
                      国を越えた協業が、<br />
                      新しい未来への道。
                    </h2>
                    <p class="card-desc-body">
                      異なる文化や価値観、強みをつなぎ、<br />
                      挑戦する人と、課題を抱える社会のあいだに、<br />
                      新しい出会いをつくります。
                    </p>
                  </div>
                </div>

                <div class="vision-card-right">
                  <div class="animated-handshake-container">
                    <div class="handshake-glow-bg" aria-hidden="true"></div>
                    <div class="handshake-svg-wrap">
                      <svg viewBox="0 0 520 340" class="handshake-svg" aria-label="Global Partnership Handshake">
                        <defs>
                          <linearGradient id="suitLeftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stop-color="#1e293b" />
                            <stop offset="100%" stop-color="#0f172a" />
                          </linearGradient>
                          <linearGradient id="suitRightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stop-color="#0369a1" />
                            <stop offset="100%" stop-color="#0c4a6e" />
                          </linearGradient>
                          <linearGradient id="skinLeftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stop-color="#ffedd5" />
                            <stop offset="60%" stop-color="#fed7aa" />
                            <stop offset="100%" stop-color="#f97316" />
                          </linearGradient>
                          <linearGradient id="skinRightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stop-color="#ffedd5" />
                            <stop offset="60%" stop-color="#fde68a" />
                            <stop offset="100%" stop-color="#eab308" />
                          </linearGradient>
                        </defs>

                        {/* Network Constellation Background Mesh */}
                        <g class="network-mesh-bg" opacity="0.45">
                          <line x1="80" y1="90" x2="180" y2="140" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="3,3" />
                          <line x1="180" y1="140" x2="260" y2="185" stroke="#f59e0b" stroke-width="1.2" stroke-dasharray="4,4" />
                          <line x1="260" y1="185" x2="340" y2="140" stroke="#0284c7" stroke-width="1.2" stroke-dasharray="4,4" />
                          <line x1="340" y1="140" x2="440" y2="90" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="3,3" />
                          <line x1="140" y1="260" x2="260" y2="185" stroke="#0284c7" stroke-width="1" stroke-dasharray="3,3" />
                          <line x1="260" y1="185" x2="380" y2="260" stroke="#f59e0b" stroke-width="1" stroke-dasharray="3,3" />

                          <circle cx="80" cy="90" r="3" fill="#f59e0b" />
                          <circle cx="180" cy="140" r="4" fill="#38bdf8" />
                          <circle cx="340" cy="140" r="4" fill="#f59e0b" />
                          <circle cx="440" cy="90" r="3" fill="#38bdf8" />
                        </g>

                        {/* Glassmorphic Country Badges */}
                        <g class="country-badge badge-srilanka" transform="translate(75, 55)">
                          <rect x="0" y="0" width="130" height="38" rx="19" fill="#ffffff" stroke="rgba(245, 158, 11, 0.4)" stroke-width="1.5" filter="drop-shadow(0 4px 12px rgba(0,0,0,0.06))" />
                          <circle cx="20" cy="19" r="6" fill="#f59e0b" />
                          <text x="36" y="24" font-family="Outfit, sans-serif" font-size="12" font-weight="800" fill="#0f172a" letter-spacing="0.12em">SRI LANKA</text>
                        </g>

                        <g class="country-badge badge-japan" transform="translate(315, 55)">
                          <rect x="0" y="0" width="130" height="38" rx="19" fill="#ffffff" stroke="rgba(2, 132, 199, 0.4)" stroke-width="1.5" filter="drop-shadow(0 4px 12px rgba(0,0,0,0.06))" />
                          <circle cx="20" cy="19" r="6" fill="#0284c7" />
                          <text x="36" y="24" font-family="Outfit, sans-serif" font-size="12" font-weight="800" fill="#0f172a" letter-spacing="0.12em">JAPAN</text>
                        </g>

                        {/* Center Connection Energy Flare */}
                        <g class="connection-energy" transform="translate(260, 185)">
                          <circle class="energy-ring ring-wave-1" r="25" />
                          <circle class="energy-ring ring-wave-2" r="48" />
                          <circle class="energy-ring ring-wave-3" r="70" />
                          <circle class="energy-core" r="14" />
                          
                          <line class="sparkle-ray r1" x1="-32" y1="0" x2="-20" y2="0" />
                          <line class="sparkle-ray r2" x1="20" y1="0" x2="32" y2="0" />
                          <line class="sparkle-ray r3" x1="0" y1="-32" x2="0" y2="-20" />
                          <line class="sparkle-ray r4" x1="0" y1="20" x2="0" y2="32" />
                          <line class="sparkle-ray r5" x1="-22" y1="-22" x2="-14" y2="-14" />
                          <line class="sparkle-ray r6" x1="14" y1="14" x2="22" y2="22" />
                          <line class="sparkle-ray r7" x1="22" y1="-22" x2="14" y2="-14" />
                          <line class="sparkle-ray r8" x1="-14" y1="14" x2="-22" y2="22" />
                        </g>

                        {/* Executive Left Arm & Hand (Sri Lanka / Talent) */}
                        <g class="hand-left-wrap">
                          <path class="sleeve-left" fill="url(#suitLeftGrad)" d="M 0 160 L 145 160 C 158 160, 168 168, 178 178 L 178 238 C 168 248, 158 255, 145 255 L 0 255 Z" />
                          <path class="cuff-left" fill="#ffffff" d="M 175 178 L 186 182 L 186 234 L 175 238 Z" />
                          <circle cx="180" cy="225" r="3.5" fill="#f59e0b" />
                          
                          <path class="thumb-l" fill="url(#skinLeftGrad)" d="M 186 184 C 200 174, 218 162, 235 160 C 248 158, 256 166, 252 176 C 248 184, 234 190, 215 194 Z" />
                          <path class="palm-l" fill="url(#skinLeftGrad)" d="M 186 188 C 205 188, 230 182, 255 185 C 265 186, 272 192, 268 200 C 264 206, 252 210, 236 210 C 220 210, 205 214, 186 220 Z" />
                          <path class="finger-l1" fill="#ea580c" d="M 235 210 C 248 210, 262 208, 266 214 C 269 219, 262 225, 248 226 L 225 226 Z" />
                          <path class="finger-l2" fill="#d97706" d="M 228 226 C 242 226, 256 224, 260 230 C 263 235, 255 240, 240 241 L 220 240 Z" />
                        </g>

                        {/* Executive Right Arm & Hand (Japan / Partner) */}
                        <g class="hand-right-wrap">
                          <path class="sleeve-right" fill="url(#suitRightGrad)" d="M 520 160 L 375 160 C 362 160, 352 168, 342 178 L 342 238 C 352 248, 362 255, 375 255 L 520 255 Z" />
                          <path class="cuff-right" fill="#ffffff" d="M 345 178 L 334 182 L 334 234 L 345 238 Z" />
                          <circle cx="340" cy="225" r="3.5" fill="#38bdf8" />
                          
                          <path class="palm-r" fill="url(#skinRightGrad)" d="M 334 186 C 315 186, 290 180, 268 184 C 255 186, 248 194, 254 204 C 260 212, 275 216, 295 216 C 310 216, 322 220, 334 224 Z" />
                          <path class="finger-r1" fill="#f59e0b" d="M 268 184 C 255 182, 244 186, 242 192 C 240 197, 248 202, 260 204 L 275 204 Z" />
                          <path class="finger-r2" fill="#eab308" d="M 265 204 C 252 204, 242 208, 240 214 C 238 219, 246 223, 258 223 L 272 222 Z" />
                          <path class="finger-r3" fill="#ca8a04" d="M 260 223 C 248 223, 240 227, 238 232 C 236 237, 244 240, 255 240 L 268 238 Z" />
                          <path class="thumb-r" fill="url(#skinRightGrad)" d="M 334 184 C 320 172, 300 162, 282 165 C 272 167, 268 175, 276 182 C 285 188, 305 192, 320 192 Z" />
                        </g>

                      </svg>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ===== 3. Bottom Slogan & Footer Logo Branding ===== */}
        <section class="message-footer-slogan-section">
          <div class="message-container">
            <div class="slogan-center-box">
              <h2 class="slogan-heading">未来を、共にひらく。</h2>
              <div class="slogan-accent-line"></div>

              <div class="slogan-signature-wrap">
                <svg viewBox="0 0 360 90" class="signature-svg" aria-label="MiraiWay Signature">
                  <text x="180" y="55" text-anchor="middle" class="signature-text-stroke">
                    MiraiWay
                  </text>
                  <text x="180" y="55" text-anchor="middle" class="signature-text-fill">
                    MiraiWay
                  </text>
                  <path d="M 45 74 Q 180 84, 315 72" class="signature-underline" />
                </svg>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </Layout>
  )
}
