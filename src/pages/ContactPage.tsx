import type { FC } from 'hono/jsx'
import { Layout } from '../components/Layout'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

export const ContactPage: FC = () => {
  return (
    <Layout
      title="お問い合わせ | MiraiWay - 国境を越えて、可能性はつながる"
      description="MiraiWayへのお問い合わせページです。スリランカ人材の採用、現地教育、導入サポート、各種資料請求などお気軽にご相談ください。"
    >
      <Header activePage="contact" />

      <main id="page-main" class="contact-page-main">
        {/* Custom Interactive Cursor */}
        <div id="custom-cursor" aria-hidden="true"></div>

        <section class="contact-hero-section">
          <div class="contact-hero-inner">
            <div class="contact-header-content">
              <span class="eyebrow">CONTACT US</span>
              <h1 class="contact-page-title">お問い合わせ</h1>
              <p class="contact-page-lead">
                スリランカ人材の活用、受け入れ支援、日本語教育に関するご質問やご相談など、<br />
                下記フォームよりお気軽にお問い合わせください。専門スタッフが迅速にご回答いたします。
              </p>
            </div>

            <div class="contact-form-card">
              <div id="form-alert" class="form-alert" style={{ display: 'none' }}></div>

              <form id="contact-form" novalidate>
                <div class="form-grid">
                  <div class="form-group">
                    <label for="contact-name" class="form-label">
                      お名前 <span class="badge-req">必須</span>
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      class="form-control"
                      placeholder="山田 太郎"
                      required
                    />
                  </div>

                  <div class="form-group">
                    <label for="contact-company" class="form-label">
                      貴社名・団体名 <span class="badge-opt">任意</span>
                    </label>
                    <input
                      type="text"
                      id="contact-company"
                      name="company"
                      class="form-control"
                      placeholder="株式会社MiraiWay"
                    />
                  </div>

                  <div class="form-group">
                    <label for="contact-email" class="form-label">
                      メールアドレス <span class="badge-req">必須</span>
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      class="form-control"
                      placeholder="example@miraiway.jp"
                      required
                    />
                  </div>

                  <div class="form-group">
                    <label for="contact-phone" class="form-label">
                      電話番号 <span class="badge-opt">任意</span>
                    </label>
                    <input
                      type="tel"
                      id="contact-phone"
                      name="phone"
                      class="form-control"
                      placeholder="03-1234-5678"
                    />
                  </div>

                  <div class="form-group full-width">
                    <label for="contact-type" class="form-label">
                      お問い合わせ種別 <span class="badge-req">必須</span>
                    </label>
                    <select id="contact-type" name="inquiryType" class="form-control">
                      <option value="人材採用のご相談">特定技能・人材採用のご相談</option>
                      <option value="現地教育・育成について">現地日本語教育・育成プログラムについて</option>
                      <option value="企業サポートについて">受入企業サポート・コンサルティングについて</option>
                      <option value="その他">その他のお問い合わせ</option>
                    </select>
                  </div>

                  <div class="form-group full-width">
                    <label for="contact-message" class="form-label">
                      お問い合わせ内容 <span class="badge-req">必須</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={6}
                      class="form-control"
                      placeholder="具体的なご要望やご不明点、ご質問内容をご記入ください。"
                      required
                    ></textarea>
                  </div>
                </div>

                <div class="form-footer">
                  <div class="privacy-consent">
                    <label class="checkbox-label">
                      <input type="checkbox" id="contact-privacy" required />
                      <span>
                        <a href="/privacy" class="inline-link" target="_blank" rel="noopener">
                          個人情報保護方針
                        </a>
                        に同意して送信します。
                      </span>
                    </label>
                  </div>

                  <button type="submit" id="submit-btn" class="btn btn-primary btn-submit">
                    <span class="btn-text">送信する</span>
                    <i class="fas fa-paper-plane btn-icon"></i>
                  </button>
                </div>
              </form>
            </div>

            <div class="contact-direct-info">
              <div class="info-card">
                <i class="fas fa-envelope-open-text info-icon"></i>
                <div>
                  <h4>メールで直接ご連絡いただく場合</h4>
                  <p>
                    <a href="mailto:miraiwayjapan@gmail.com" class="direct-link">
                      miraiwayjapan@gmail.com
                    </a>
                  </p>
                </div>
              </div>
              <div class="info-card">
                <i class="fas fa-clock info-icon"></i>
                <div>
                  <h4>受付時間</h4>
                  <p>平日 9:00 - 18:00（土日祝日を除く）</p>
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
