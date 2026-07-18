import type { FC } from 'hono/jsx'
import { LogoMark } from './LogoMark'

interface HeaderProps {
  activePage?: 'home' | 'contact' | 'company'
}

export const Header: FC<HeaderProps> = ({ activePage = 'home' }) => {
  return (
    <header id="site-header">
      <div class="header-inner">
        <a href="/" class="brand" id="brand-logo" aria-label="MiraiWay ホーム">
          <LogoMark width={68} height={56} />
        </a>
        <nav id="global-nav" aria-label="グローバルナビゲーション">
          <a href="/#about-section">MiraiWayについて</a>
          <a href="/#services-section">サービス</a>
          <a href="/#process-section">ご利用の流れ</a>
          <a href="/company">会社情報</a>
        </nav>
        <div class="header-actions">
          <a href="/contact" class={`btn btn-primary btn-sm ${activePage === 'contact' ? 'is-active' : ''}`}>
            お問い合わせ
          </a>
          <button class="lang-switch" id="lang-switch" aria-label="言語切替">
            JP <i class="fas fa-chevron-down"></i>
          </button>
          <button class="menu-toggle" id="menu-toggle" aria-label="メニュー">
            <i class="fas fa-bars"></i>
          </button>
        </div>
      </div>
      <nav id="mobile-nav" aria-label="モバイルナビゲーション">
        <a href="/#about-section">MiraiWayについて</a>
        <a href="/#services-section">サービス</a>
        <a href="/#process-section">ご利用の流れ</a>
        <a href="/company">会社情報</a>
        <a href="/contact" class="mobile-cta">
          お問い合わせ
        </a>
      </nav>
    </header>
  )
}
