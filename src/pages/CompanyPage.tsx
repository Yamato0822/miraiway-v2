import type { FC } from 'hono/jsx'
import { Layout } from '../components/Layout'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { LogoMark } from '../components/LogoMark'

export const CompanyPage: FC = () => {
  return (
    <Layout
      title="会社概要 | MiraiWay - 日本とスリランカをつなぐ特定技能人材支援"
      description="MiraiWayの会社概要および共同代表（Hasitha Shamika / 佐藤 弘輝）の紹介ページです。日本とスリランカの両国体制で、特定技能人材の教育・採用・定着を一気通貫で支援します。"
    >
      <Header activePage="company" />

      <main id="page-main" class="company-page-main">
        {/* Custom Interactive Cursor */}
        <div id="custom-cursor" aria-hidden="true"></div>

        <section class="company-hero-section">
          <div class="company-bg-glow" aria-hidden="true"></div>

          <div class="company-container">
            {/* Page Header */}
            <div class="company-page-header">
              <span class="eyebrow">ABOUT US &bull; COMPANY OVERVIEW</span>
              <h1 class="company-main-title">会社概要</h1>
            </div>

            {/* Split 2-Column Main Section */}
            <div class="company-split-grid">
              {/* Left Column: Company Overview & Mission */}
              <div class="company-left-col">
                <div class="company-brand-card">
                  <div class="company-logo-header">
                    <LogoMark width={80} height={66} />
                    <span class="company-sub-brand">Japan &amp; Sri Lanka Bridge</span>
                  </div>

                  <h2 class="company-catch-title">
                    国境を越えて、可能性をつなぐ。<br />
                    人材のキャリアと企業の未来を支える一気通貫サポート。
                  </h2>
                  <p class="company-mission-desc">
                    スリランカ現地での高品質な教育から、厳選した人材マッチング、各種手続きの伴走、そして来日後の持続的な定着支援まで。日本とスリランカの確固たる両国体制で、企業様と働く方の双方が輝く未来を共創します。
                  </p>
                </div>

                {/* Rich Styled Info List */}
                <div class="company-info-card-wrap">
                  <h3 class="info-card-title">基本情報</h3>

                  <div class="company-info-list">
                    <div class="info-item">
                      <div class="item-icon-wrap">
                        <i class="fas fa-building"></i>
                      </div>
                      <div class="item-body">
                        <span class="item-label">会社名</span>
                        <span class="item-value font-bold">MiraiWay（ミライウェイ）</span>
                      </div>
                    </div>

                    <div class="info-item">
                      <div class="item-icon-wrap">
                        <i class="fas fa-calendar-alt"></i>
                      </div>
                      <div class="item-body">
                        <span class="item-label">設立</span>
                        <span class="item-value">2025年11月</span>
                      </div>
                    </div>

                    <div class="info-item">
                      <div class="item-icon-wrap">
                        <i class="fas fa-map-marker-alt"></i>
                      </div>
                      <div class="item-body">
                        <span class="item-label">所在地</span>
                        <span class="item-value">東京都 ／ スリランカ</span>
                      </div>
                    </div>

                    <div class="info-item">
                      <div class="item-icon-wrap">
                        <i class="fas fa-briefcase"></i>
                      </div>
                      <div class="item-body">
                        <span class="item-label">事業内容</span>
                        <span class="item-value">特定技能人材の採用・教育・定着支援（一気通貫）</span>
                      </div>
                    </div>

                    <div class="info-item">
                      <div class="item-icon-wrap">
                        <i class="fas fa-globe-asia"></i>
                      </div>
                      <div class="item-body">
                        <span class="item-label">対象国</span>
                        <span class="item-value">スリランカ民主社会主義共和国</span>
                      </div>
                    </div>

                    <div class="info-item">
                      <div class="item-icon-wrap">
                        <i class="fas fa-layer-group"></i>
                      </div>
                      <div class="item-body">
                        <span class="item-label">対象分野</span>
                        <span class="item-value">建築 ／ 介護 ／ 農業 ほか順次拡大</span>
                      </div>
                    </div>

                    <div class="info-item">
                      <div class="item-icon-wrap">
                        <i class="fas fa-file-contract"></i>
                      </div>
                      <div class="item-body">
                        <span class="item-label">許認可状況</span>
                        <span class="item-value">各種登録・許可手続き準備中</span>
                      </div>
                    </div>

                    <div class="info-item">
                      <div class="item-icon-wrap">
                        <i class="fas fa-coins"></i>
                      </div>
                      <div class="item-body">
                        <span class="item-label">資本金</span>
                        <span class="item-value">設立前</span>
                      </div>
                    </div>

                    <div class="info-item">
                      <div class="item-icon-wrap">
                        <i class="fas fa-link"></i>
                      </div>
                      <div class="item-body">
                        <span class="item-label">公式Web</span>
                        <span class="item-value">
                          <a href="https://www.miraiway-japan.com/" target="_blank" rel="noopener" class="inline-link">
                            https://www.miraiway-japan.com/
                          </a>
                        </span>
                      </div>
                    </div>

                    <div class="info-item">
                      <div class="item-icon-wrap">
                        <i class="fas fa-users"></i>
                      </div>
                      <div class="item-body">
                        <span class="item-label">従業員数</span>
                        <span class="item-value">日本・スリランカ計 8名（グループ・提携スタッフ含む）</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Co-Founders Profiles */}
              <div class="company-right-col">
                <div class="founders-header">
                  <span class="founders-eyebrow">CO-FOUNDERS</span>
                  <h2 class="founders-title">共同代表メッセージ・プロフィール</h2>
                  <p class="founders-lead">スリランカと日本、双方の視点から信頼のサポートを提供します。</p>
                </div>

                <div class="founders-cards-wrap">
                  {/* Founder 1 */}
                  <div class="founder-card-premium">
                    <div class="founder-card-badge">スリランカ現地責任</div>
                    <div class="founder-photo-box">
                      <img src="/static/images/hasitha-shamika.png" alt="Hasitha Shamika" loading="lazy" />
                      <div class="photo-overlay"></div>
                    </div>
                    <div class="founder-card-content">
                      <div class="founder-name-group">
                        <h3 class="founder-name">Hasitha Shamika</h3>
                        <p class="founder-role">共同代表 ／ スリランカ事業責任者</p>
                      </div>
                      <p class="founder-message">
                        「スリランカ出身の当事者として、現地の教育機関・求職者と強固な絆を築いています。高い熱量を持つ若者が日本で輝けるよう、来日前の教育から日本・スリランカ間の円滑な連携に全力を注ぎます。」
                      </p>
                    </div>
                  </div>

                  {/* Founder 2 */}
                  <div class="founder-card-premium">
                    <div class="founder-card-badge">日本事業責任</div>
                    <div class="founder-photo-box">
                      <img src="/static/images/sato-hiroki.png" alt="佐藤 弘輝" loading="lazy" />
                      <div class="photo-overlay"></div>
                    </div>
                    <div class="founder-card-content">
                      <div class="founder-name-group">
                        <h3 class="founder-name">佐藤 弘輝</h3>
                        <p class="founder-role">共同代表 ／ 日本事業責任者</p>
                      </div>
                      <p class="founder-message">
                        「日本企業様が抱える人材不足や受け入れに関する不安に寄り添い、単なる採用にとどまらない長期定着型の事業設計を推進します。企業の持続的成長と人材の挑戦を全力で支援いたします。」
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Slogan & Contact CTA Banner */}
            <div class="company-bottom-banner">
              <div class="banner-content">
                <span class="star-sparkle">✦</span>
                <p class="slogan-main">日本とスリランカの両国体制で、教育・採用・定着までを一気通貫で支援。</p>
                <p class="slogan-sub">人材活用やご質問など、お気軽にご相談ください。</p>
                <div class="banner-cta">
                  <a href="/contact" class="btn btn-primary btn-banner-contact">
                    <span>お問い合わせフォームへ</span>
                    <i class="fas fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </Layout>
  )
}
