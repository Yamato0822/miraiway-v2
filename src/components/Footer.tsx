import type { FC } from 'hono/jsx'
import { LogoMark } from './LogoMark'

interface SocialLink {
  platform: string
  label: string
  href?: string
  icon: string
}

const footerSocialLinks: SocialLink[] = [
  {
    platform: 'x',
    label: 'MiraiWay 公式X',
    href: 'https://x.com/MiraiWay_jp',
    icon: 'x'
  },
  {
    platform: 'youtube',
    label: 'MiraiWay 公式YouTube',
    href: 'https://www.youtube.com/@MiraiWayJapan',
    icon: 'fa-youtube'
  },
  {
    platform: 'instagram',
    label: 'MiraiWay 公式Instagram（準備中）',
    icon: 'fa-instagram'
  },
  {
    platform: 'tiktok',
    label: 'MiraiWay 公式TikTok（準備中）',
    icon: 'fa-tiktok'
  }
]

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
        </div>
        <nav class="footer-nav" aria-label="フッターナビゲーション">
          <div class="footer-col">
            <h4>サービス</h4>
            <a href="/#services-section">人材マッチング</a>
            <a href="/#services-section">日本語・文化教育</a>
            <a href="/#services-section">企業受け入れサポート</a>
            <a href="/#services-section">来日・定着支援</a>
            <a href="/#services-section">採用広報支援</a>
          </div>
          <div class="footer-col">
            <h4>利用者別</h4>
            <a href="/contact">企業の方へ</a>
            <a href="/contact">日本で働きたい方へ</a>
            <a href="/#services-section">対応職種</a>
            <a href="/#services-section">紹介可能な人材</a>
            <a href="/#process-section">採用までの流れ</a>
          </div>
          <div class="footer-col">
            <h4>会社情報</h4>
            <a href="/#about-section">MiraiWayについて</a>
            <a href="/message">ビジョン</a>
            <a href="/message">代表メッセージ</a>
            <a href="/company">会社概要</a>
            <a href="/contact">採用情報</a>
          </div>
          <div class="footer-col">
            <h4>サポート</h4>
            <a href="/faq">よくあるご質問</a>
            <a href="/contact">お問い合わせ</a>
            <a href="/contact">資料請求</a>
            <a href="/privacy">プライバシーポリシー</a>
          </div>
        </nav>
        <div class="footer-cta">
          <a href="/contact" class="btn btn-outline">
            無料で採用相談
          </a>
          <span class="footer-lang" aria-label="現在の表示言語は日本語です">
            <i class="fas fa-globe" aria-hidden="true"></i> 日本語
          </span>
        </div>
      </div>
      <div class="footer-bottom">
        <p class="footer-bottom-copy">&copy; MiraiWay</p>
        <div class="footer-social-list" aria-label="MiraiWay 公式SNS">
          {footerSocialLinks.map((social) =>
            social.href ? (
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                class="footer-social-icon"
                data-platform={social.platform}
                aria-label={`${social.label}を新しいタブで開く`}
                title={social.label}
              >
                {social.icon === 'x' ? (
                  <svg viewBox="0 0 24 24" aria-hidden="true" width="16" height="16">
                    <path
                      fill="currentColor"
                      d="M18.24 2.25h3.31l-7.23 8.26 8.51 11.24h-6.66l-5.21-6.82-5.97 6.82H1.68l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64Z"
                    />
                  </svg>
                ) : (
                  <i class={`fa-brands ${social.icon}`} aria-hidden="true"></i>
                )}
              </a>
            ) : (
              <span
                class="footer-social-icon is-disabled"
                data-platform={social.platform}
                aria-label={social.label}
                aria-disabled="true"
                title={social.label}
              >
                <i class={`fa-brands ${social.icon}`} aria-hidden="true"></i>
              </span>
            )
          )}
        </div>
        <div class="footer-legal">
          <a href="/privacy" aria-label="プライバシーポリシー">
            プライバシーポリシー
          </a>
        </div>
      </div>
    </footer>
  )
}
