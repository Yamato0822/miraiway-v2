import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()

app.use('/api/*', cors())

// ---- API: お問い合わせ受付 ----
app.post('/api/contact', async (c) => {
  try {
    const body = await c.req.json<{ name?: string; company?: string; email?: string; message?: string }>()
    const { name, email, message } = body
    if (!name || !email || !message) {
      return c.json({ ok: false, error: '必須項目が入力されていません。' }, 400)
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return c.json({ ok: false, error: 'メールアドレスの形式が正しくありません。' }, 400)
    }
    // 第一弾: 受付確認のみ（メール送信連携は今後 Resend / SendGrid 等で実装予定）
    return c.json({
      ok: true,
      message: 'お問い合わせを受け付けました。担当者よりご連絡いたします。'
    })
  } catch {
    return c.json({ ok: false, error: 'リクエストの形式が正しくありません。' }, 400)
  }
})

// ---- メインページ ----
app.get('/', (c) => {
  return c.html(`<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>MiraiWay | 国境を越えて、可能性はつながる。- スリランカ人材と日本企業をつなぐ</title>
<meta name="description" content="MiraiWayはスリランカと日本をつなぎ、特定技能人材のマッチングから日本語教育、企業サポート、定着支援までワンストップで支援します。">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&family=Outfit:wght@300;400;600;700;800&display=swap" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
<link href="/static/style.css" rel="stylesheet">
<link rel="icon" type="image/svg+xml" href="/static/favicon.svg">
</head>
<body>

<!-- ===== Header ===== -->
<header id="site-header">
  <div class="header-inner">
    <a href="#hero-section" class="brand" id="brand-logo">
      <span class="brand-mark">
        <svg viewBox="0 0 48 48" width="34" height="34" aria-hidden="true">
          <circle cx="24" cy="24" r="22" fill="#16324f"/>
          <path d="M10 30 C16 18, 24 34, 30 22 S 40 18, 40 18" fill="none" stroke="#e8b95a" stroke-width="4" stroke-linecap="round"/>
          <path d="M8 22 C14 12, 22 26, 28 16" fill="none" stroke="#7fb4e8" stroke-width="4" stroke-linecap="round"/>
        </svg>
      </span>
      <span class="brand-name">MiraiWay</span>
    </a>
    <nav id="global-nav" aria-label="グローバルナビゲーション">
      <a href="#about-section">MiraiWayについて</a>
      <a href="#services-section">サービス</a>
      <a href="#process-section">ご利用の流れ</a>
      <a href="#company-section">会社情報</a>
    </nav>
    <div class="header-actions">
      <a href="#contact-section" class="btn btn-primary btn-sm">お問い合わせ</a>
      <button class="lang-switch" id="lang-switch" aria-label="言語切替">JP <i class="fas fa-chevron-down"></i></button>
      <button class="menu-toggle" id="menu-toggle" aria-label="メニュー"><i class="fas fa-bars"></i></button>
    </div>
  </div>
  <nav id="mobile-nav" aria-label="モバイルナビゲーション">
    <a href="#about-section">MiraiWayについて</a>
    <a href="#services-section">サービス</a>
    <a href="#process-section">ご利用の流れ</a>
    <a href="#company-section">会社情報</a>
    <a href="#contact-section" class="mobile-cta">お問い合わせ</a>
  </nav>
</header>

<main id="page-main">

  <!-- ===== Hero ===== -->
  <section id="hero-section">
    <div class="hero-inner">
      <div class="hero-copy reveal">
        <h1 class="hero-title">国境を越えて、<br>可能性はつながる。</h1>
        <p class="hero-lead">スリランカと日本をつなぎ、<br>人材のキャリアと企業の未来を支えます。</p>
        <a href="#services-section" class="text-link" id="hero-cta">サービスを見る <span class="arrow">→</span></a>
      </div>
      <div class="hero-globe-wrap">
        <div id="word-globe" aria-hidden="true"></div>
      </div>
    </div>
    <!-- 蛇行するリボン（ヒーロー→次セクションへ） -->
    <svg class="hero-ribbon" viewBox="0 0 1440 520" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="ribbonGrad" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#e8b95a"/>
          <stop offset="45%" stop-color="#f2e3c4"/>
          <stop offset="100%" stop-color="#bcd6ee"/>
        </linearGradient>
      </defs>
      <path d="M1030 0 C 1010 120, 780 150, 660 230 C 540 310, 620 400, 470 470 C 380 512, 240 520, 120 520 L 0 520"
        fill="none" stroke="url(#ribbonGrad)" stroke-width="90" stroke-linecap="round" opacity="0.85"/>
    </svg>
  </section>

  <!-- ===== 01 About ===== -->
  <section id="about-section" class="num-section">
    <div class="wave-top wave-light" aria-hidden="true">
      <svg viewBox="0 0 1440 90" preserveAspectRatio="none"><path d="M0,90 C360,0 1080,120 1440,20 L1440,90 Z" fill="#f4f7fb"/></svg>
    </div>
    <div class="section-inner split">
      <div class="section-text reveal">
        <div class="num-head">
          <span class="big-num">01</span>
          <div class="num-titles">
            <span class="eyebrow">ABOUT US</span>
            <h2>MiraiWayについて</h2>
          </div>
        </div>
        <p class="section-desc">
          日本とスリランカ、二つの国の懸け橋として、<br class="pc-only">
          人材の育成から就労・定着まで<br class="pc-only">
          一貫した支援を行います。
        </p>
        <p class="section-sub">
          スリランカ現地での日本語教育・人材育成から、特定技能人材のポートフォリオ化、
          マッチング主導型のご紹介まで。送り出し機関と人材紹介機関が連携する体制で、
          円滑なコミュニケーションと技能人材への手厚い支援を実現します。
        </p>
        <div class="about-stats">
          <div class="stat-item"><span class="stat-num">2</span><span class="stat-label">拠点（日本・スリランカ）</span></div>
          <div class="stat-item"><span class="stat-num">4</span><span class="stat-label">対応分野（介護・外食・建設・農業）</span></div>
        </div>
      </div>
      <figure class="section-photo photo-right reveal">
        <img src="/static/images/about-hills.jpg" alt="スリランカの緑豊かな丘陵地帯" loading="lazy">
      </figure>
    </div>
  </section>

  <!-- ===== 02 Services ===== -->
  <section id="services-section" class="num-section alt-bg">
    <div class="wave-top wave-blue" aria-hidden="true">
      <svg viewBox="0 0 1440 90" preserveAspectRatio="none"><path d="M0,70 C420,110 980,-20 1440,60 L1440,90 L0,90 Z" fill="#e9f0f7"/></svg>
    </div>
    <div class="section-inner">
      <div class="num-head reveal">
        <span class="big-num">02</span>
        <div class="num-titles">
          <span class="eyebrow">SERVICES</span>
          <h2>4つの支援で、未来へつなぐ。</h2>
        </div>
      </div>
      <div class="service-grid">
        <article class="service-card reveal">
          <div class="service-icon"><i class="fas fa-people-arrows"></i></div>
          <h3>人材マッチング</h3>
          <p>スリランカの優秀な特定技能人材と日本企業を最適にマッチング。介護、外食、建設、農業分野で即戦力となる人材をご紹介します。</p>
        </article>
        <article class="service-card reveal">
          <div class="service-icon"><i class="fas fa-book-open"></i></div>
          <h3>日本語教育</h3>
          <p>スリランカ現地での日本語教育を実施。来日前から日本語能力と日本文化への理解を深め、スムーズな就労開始をサポートします。</p>
        </article>
        <article class="service-card reveal">
          <div class="service-icon"><i class="fas fa-building"></i></div>
          <h3>企業サポート</h3>
          <p>受入企業様への継続的なサポート。スリランカ人材の特性を熟知したコンサルティングで、円滑な雇用関係を構築します。</p>
        </article>
        <article class="service-card reveal">
          <div class="service-icon"><i class="fas fa-hand-holding-heart"></i></div>
          <h3>定着支援</h3>
          <p>来日後の生活サポートからキャリア相談まで。技能人材が長期的に活躍できる環境づくりを支援します。</p>
        </article>
      </div>
    </div>
  </section>

  <!-- ===== 03 Process ===== -->
  <section id="process-section" class="num-section">
    <div class="wave-top wave-white" aria-hidden="true">
      <svg viewBox="0 0 1440 90" preserveAspectRatio="none"><path d="M0,80 C380,-10 1000,100 1440,30 L1440,90 L0,90 Z" fill="#ffffff"/></svg>
    </div>
    <div class="process-bg" aria-hidden="true">
      <img src="/static/images/tokyo-skyline.jpg" alt="" loading="lazy">
    </div>
    <div class="section-inner">
      <div class="num-head reveal">
        <span class="big-num">03</span>
        <div class="num-titles">
          <span class="eyebrow">PROCESS</span>
          <h2>ご利用の流れ</h2>
        </div>
      </div>
      <ol class="process-steps">
        <li class="process-step reveal">
          <div class="step-icon"><i class="fas fa-envelope-open-text"></i></div>
          <span class="step-num">01</span>
          <h3>お問い合わせ</h3>
          <p>フォームまたはお電話にてお気軽にご相談ください。貴社のニーズをヒアリングします。</p>
        </li>
        <li class="process-step reveal">
          <div class="step-icon"><i class="fas fa-users"></i></div>
          <span class="step-num">02</span>
          <h3>人材選定・ご紹介</h3>
          <p>ポートフォリオ化された人材の中から、貴社に最適な候補者をご紹介します。</p>
        </li>
        <li class="process-step reveal">
          <div class="step-icon"><i class="fas fa-comments"></i></div>
          <span class="step-num">03</span>
          <h3>面接・選考</h3>
          <p>オンラインまたは現地での面接を設定。スリランカ拠点のサポートで円滑に進行します。</p>
        </li>
        <li class="process-step reveal">
          <div class="step-icon"><i class="fas fa-passport"></i></div>
          <span class="step-num">04</span>
          <h3>入国準備</h3>
          <p>ビザ申請や渡航準備をサポート。来日前の日本語教育も継続します。</p>
        </li>
        <li class="process-step reveal">
          <div class="step-icon"><i class="fas fa-heart-circle-check"></i></div>
          <span class="step-num">05</span>
          <h3>就労開始・定着支援</h3>
          <p>来日後の生活サポートから継続的なフォローアップまで、長期的な活躍を支援します。</p>
        </li>
      </ol>
    </div>
  </section>

  <!-- ===== 04 Contact ===== -->
  <section id="contact-section" class="num-section alt-bg">
    <div class="wave-top wave-blue" aria-hidden="true">
      <svg viewBox="0 0 1440 90" preserveAspectRatio="none"><path d="M0,60 C480,110 900,-10 1440,70 L1440,90 L0,90 Z" fill="#e9f0f7"/></svg>
    </div>
    <div class="section-inner split">
      <div class="section-text reveal">
        <div class="num-head">
          <span class="big-num">04</span>
          <div class="num-titles">
            <span class="eyebrow">CONTACT</span>
            <h2>未来への第一歩を、<br>ここから始めましょう。</h2>
          </div>
        </div>
        <p class="section-sub">ご相談・ご質問はお気軽にお問い合わせください。</p>

        <form id="contact-form" novalidate>
          <div class="form-row">
            <label for="cf-name">お名前 <span class="req">必須</span></label>
            <input type="text" id="cf-name" name="name" placeholder="山田 太郎" required>
          </div>
          <div class="form-row">
            <label for="cf-company">会社名</label>
            <input type="text" id="cf-company" name="company" placeholder="株式会社◯◯">
          </div>
          <div class="form-row">
            <label for="cf-email">メールアドレス <span class="req">必須</span></label>
            <input type="email" id="cf-email" name="email" placeholder="example@company.co.jp" required>
          </div>
          <div class="form-row">
            <label for="cf-message">お問い合わせ内容 <span class="req">必須</span></label>
            <textarea id="cf-message" name="message" rows="4" placeholder="スリランカ人材の採用について相談したい 等" required></textarea>
          </div>
          <div class="form-actions">
            <button type="submit" class="btn btn-primary" id="cf-submit">お問い合わせ <span class="arrow">→</span></button>
            <p class="form-note">メールでのご連絡：<a href="mailto:miraiwayjapan@gmail.com">miraiwayjapan@gmail.com</a></p>
          </div>
          <p id="cf-result" role="status"></p>
        </form>
      </div>
      <figure class="section-photo photo-right reveal">
        <img src="/static/images/contact-handshake.jpg" alt="握手を交わすビジネスパーソン" loading="lazy">
      </figure>
    </div>
  </section>

</main>

<!-- ===== Footer ===== -->
<footer id="site-footer">
  <div class="footer-inner" id="company-section">
    <div class="footer-brand">
      <a href="#hero-section" class="brand brand-invert">
        <span class="brand-mark">
          <svg viewBox="0 0 48 48" width="30" height="30" aria-hidden="true">
            <circle cx="24" cy="24" r="22" fill="#ffffff"/>
            <path d="M10 30 C16 18, 24 34, 30 22 S 40 18, 40 18" fill="none" stroke="#e8b95a" stroke-width="4" stroke-linecap="round"/>
            <path d="M8 22 C14 12, 22 26, 28 16" fill="none" stroke="#16324f" stroke-width="4" stroke-linecap="round"/>
          </svg>
        </span>
        <span class="brand-name">MiraiWay</span>
      </a>
      <p class="footer-slogan">スリランカと日本をつなぎ、<br>人材のキャリアと企業の未来を支える<br>最適なソリューションを提供します。</p>
      <p class="footer-copy">&copy; 2025 MiraiWay. All rights reserved.</p>
    </div>
    <nav class="footer-nav" aria-label="フッターナビゲーション">
      <div class="footer-col">
        <h4>サービス</h4>
        <a href="#services-section">人材マッチング</a>
        <a href="#services-section">日本語教育</a>
        <a href="#services-section">企業サポート</a>
        <a href="#services-section">定着支援</a>
      </div>
      <div class="footer-col">
        <h4>会社情報</h4>
        <a href="#about-section">MiraiWayについて</a>
        <a href="#process-section">ご利用の流れ</a>
        <a href="#about-section">会社概要</a>
        <a href="#contact-section">採用情報</a>
      </div>
      <div class="footer-col">
        <h4>サポート</h4>
        <a href="#contact-section">よくあるご質問</a>
        <a href="#contact-section">お問い合わせ</a>
      </div>
    </nav>
    <div class="footer-cta">
      <a href="#contact-section" class="btn btn-outline">お問い合わせ</a>
      <button class="lang-switch lang-invert" aria-label="言語切替"><i class="fas fa-globe"></i> JP <i class="fas fa-chevron-down"></i></button>
    </div>
  </div>
  <div class="footer-bottom">
    <a href="#" aria-label="プライバシーポリシー">プライバシーポリシー</a>
    <span class="sep">|</span>
    <a href="#" aria-label="利用規約">利用規約</a>
  </div>
</footer>

<script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
<script src="/static/app.js"></script>
</body>
</html>`)
})

export default app
