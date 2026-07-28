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

        {/* ===== 1. Apple-Pro Minimalist Hero Section ===== */}
        <section class="company-hero-section">
          <div class="company-bg-glow" aria-hidden="true"></div>

          <div class="company-container">
            <div class="company-page-header">
              <span class="eyebrow">01 &bull; COMPANY OVERVIEW &amp; VISION</span>
              <h1 class="company-main-title reveal">会社概要</h1>
              <p class="company-hero-lead reveal">
                国境を越え、確信の未来をつなぐ。<br />
                日本とスリランカの二拠点から創り出す、持続可能な国際人材エコシステム。
              </p>
            </div>
          </div>
        </section>

        {/* ===== 2. Apple Executive Leadership Showcase Section (Moved UP) ===== */}
        <section class="company-executive-section">
          <div class="company-container">
            <div class="section-label-bar">
              <span class="section-label-num">02</span>
              <span class="section-label-title">EXECUTIVE LEADERSHIP &amp; MESSAGES</span>
            </div>

            <div class="executive-showcase-grid">
              {/* Executive 1: Hasitha Shamika */}
              <div class="executive-card reveal">
                <div class="executive-image-wrap">
                  <img src="/static/images/hasitha-shamika.png" alt="Hasitha Shamika" loading="lazy" />
                  <div class="executive-image-overlay">
                    <span class="executive-region-tag"><i class="fas fa-globe-asia"></i> SRI LANKA DIRECTIVITY</span>
                  </div>
                </div>

                <div class="executive-body">
                  <div class="executive-title-group">
                    <span class="executive-role">共同代表 ／ スリランカ事業責任者</span>
                    <h3 class="executive-name">Hasitha Shamika</h3>
                  </div>

                  <blockquote class="executive-quote">
                    「スリランカ出身の当事者として、現地の教育機関・志の高い若者と確固たる信頼関係を築いています。日本でキャリアを切り拓きたい若者が安心して挑戦できるよう、来目前の高度教育から日本拠点との円滑な連携に全力を注ぎます。」
                  </blockquote>

                  <div class="executive-stat-mini">
                    <span class="mini-label">RESPONSIBILITY</span>
                    <span class="mini-value">現地直営校統括・面接選考・日本語教育</span>
                  </div>
                </div>
              </div>

              {/* Executive 2: Hiroki Sato */}
              <div class="executive-card reveal">
                <div class="executive-image-wrap">
                  <img src="/static/images/sato-hiroki.png" alt="佐藤 弘輝" loading="lazy" />
                  <div class="executive-image-overlay">
                    <span class="executive-region-tag orange"><i class="fas fa-building"></i> JAPAN DIRECTIVITY</span>
                  </div>
                </div>

                <div class="executive-body">
                  <div class="executive-title-group">
                    <span class="executive-role orange">共同代表 ／ 日本事業責任者</span>
                    <h3 class="executive-name">佐藤 弘輝</h3>
                  </div>

                  <blockquote class="executive-quote">
                    「日本企業様が直面している深刻な人手不足や、特定技能受入れへの疑問・不安に真摯に寄り添います。単なる採用あっせんに留まらず、企業の持続的成長と働く方の成長が合致する長期伴走型の仕組みを共創します。」
                  </blockquote>

                  <div class="executive-stat-mini">
                    <span class="mini-label orange">RESPONSIBILITY</span>
                    <span class="mini-value">国内企業サポート・在留資格申請・定着支援</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 3. Apple Spec Sheet Style Basic Information ===== */}
        <section class="company-spec-section">
          <div class="company-container">
            <div class="section-label-bar">
              <span class="section-label-num">03</span>
              <span class="section-label-title">CORPORATE SPECIFICATIONS</span>
            </div>

            <div class="apple-spec-sheet-grid">
              <div class="spec-row reveal">
                <div class="spec-label">会社名</div>
                <div class="spec-value font-bold">MiraiWay（ミライウェイ）</div>
              </div>

              <div class="spec-row reveal">
                <div class="spec-label">設立</div>
                <div class="spec-value">2025年11月</div>
              </div>

              <div class="spec-row reveal">
                <div class="spec-label">拠在地</div>
                <div class="spec-value">
                  <div class="location-duo">
                    <span class="loc-item"><strong>日本拠点:</strong> 東京都</span>
                    <span class="loc-item"><strong>スリランカ拠点:</strong> コロンボ</span>
                  </div>
                </div>
              </div>

              <div class="spec-row reveal">
                <div class="spec-label">事業内容</div>
                <div class="spec-value">
                  特定技能人材の現地教育、採用マッチング、各種在留資格申請サポート、渡航受入れ＆定着伴走支援（一気通貫サポート）
                </div>
              </div>

              <div class="spec-row reveal">
                <div class="spec-label">対象国</div>
                <div class="spec-value">スリランカ民主社会主義共和国</div>
              </div>

              <div class="spec-row reveal">
                <div class="spec-label">対象分野</div>
                <div class="spec-value">建築 ／ 介護 ／ 農業 ほか順次拡大</div>
              </div>

              <div class="spec-row reveal">
                <div class="spec-label">許認可状況</div>
                <div class="spec-value">登録支援機関・各種関連許可 手続き準備中</div>
              </div>

              <div class="spec-row reveal">
                <div class="spec-label">従業員・提携体制</div>
                <div class="spec-value">日本・スリランカ計 8名（グループ・直営スクール講師・提携スタッフ含む）</div>
              </div>

              <div class="spec-row reveal">
                <div class="spec-label">公式Webサイト</div>
                <div class="spec-value">
                  <a href="https://www.miraiway-japan.com/" target="_blank" rel="noopener" class="inline-spec-link">
                    https://www.miraiway-japan.com/ <i class="fas fa-arrow-up-right-from-square"></i>
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

