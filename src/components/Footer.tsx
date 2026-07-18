import type { FC } from 'hono/jsx'
import { LogoMark } from './LogoMark'

export const Footer: FC = () => {
  return (
    <footer id="site-footer">
      <div class="footer-inner" id="company-section">
        <div class="footer-brand">
          <a href="/" class="brand brand-invert" aria-label="MiraiWay ホーム">
            <LogoMark width={84} height={69} invert={true} />
          </a>
          <p class="footer-slogan">
            スリランカと日本をつなぎ、<br />
            人材のキャリアと企業の未来を支える<br />
            最適なソリューションを提供します。
          </p>

          <div class="footer-social">
            <a
              href="https://x.com/MiraiWay_jp"
              target="_blank"
              rel="noopener noreferrer"
              class="social-btn social-x"
              aria-label="MiraiWay 公式 Xアカウント"
            >
              <i class="fa-brands fa-x-twitter"></i>
              <span>@MiraiWay_jp</span>
            </a>
          </div>

          <p class="footer-copy">&copy; MiraiWay</p>
        </div>
        <nav class="footer-nav" aria-label="フッターナビゲーション">
          <div class="footer-col">
            <h4>サービス</h4>
            <a href="/#services-section">人材マッチング</a>
            <a href="/#services-section">日本語教育</a>
            <a href="/#services-section">企業サポート</a>
            <a href="/#services-section">定着支援</a>
            <a href="/#services-section">動画制作</a>
          </div>
          <div class="footer-col">
            <h4>会社情報</h4>
            <a href="/#about-section">MiraiWayについて</a>
            <a href="/#process-section">ご利用の流れ</a>
            <a href="/company">会社概要</a>
            <a href="/contact">採用情報</a>
          </div>
          <div class="footer-col">
            <h4>サポート</h4>
            <a href="/faq">よくあるご質問</a>
            <a href="/contact">お問い合わせ</a>
          </div>
        </nav>
        <div class="footer-cta">
          <a href="/contact" class="btn btn-outline">
            お問い合わせ
          </a>
          <button class="lang-switch lang-invert" aria-label="言語切替">
            <i class="fas fa-globe"></i> JP <i class="fas fa-chevron-down"></i>
          </button>
        </div>
      </div>
      <div class="footer-bottom">
        <a
          href="https://x.com/MiraiWay_jp"
          target="_blank"
          rel="noopener noreferrer"
          class="footer-x-bottom-link"
          aria-label="MiraiWay 公式 Xアカウント"
        >
          <i class="fa-brands fa-x-twitter"></i> @MiraiWay_jp
        </a>
        <span class="sep">|</span>
        <a href="/privacy" aria-label="プライバシーポリシー">
          プライバシーポリシー
        </a>
        <span class="sep">|</span>
        <a href="#" aria-label="利用規約">
          利用規約
        </a>
      </div>
    </footer>
  )
}
