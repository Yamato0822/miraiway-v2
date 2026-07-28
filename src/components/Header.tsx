import type { FC } from 'hono/jsx'
import { LogoMark } from './LogoMark'

interface HeaderProps {
  activePage?: 'home' | 'message' | 'company' | 'contact' | 'news' | 'faq'
}

export const Header: FC<HeaderProps> = ({ activePage = 'home' }) => {
  return (
    <header id="site-header">
      <div class="header-inner">
        <a href="/" class="brand" id="brand-logo" aria-label="MiraiWay ホーム">
          <LogoMark width={76} height={54} idPrefix="header" />
        </a>
        <nav id="global-nav" aria-label="グローバルナビゲーション">
          <a href="/message" class={activePage === 'message' ? 'is-active' : ''}>ビジョン</a>
          <a href="/#services-section">事業内容</a>
          <a href="/company" class={activePage === 'company' ? 'is-active' : ''}>会社情報</a>
          <a href="/news" class={activePage === 'news' ? 'is-active' : ''}>ニュース</a>
        </nav>
        <div class="header-actions">
          <a href="/contact" class={`btn btn-primary btn-sm ${activePage === 'contact' ? 'is-active' : ''}`}>
            お問い合わせ
          </a>
          <button class="lang-switch" id="lang-switch" aria-label="言語切替">
            JP <i class="fas fa-chevron-down"></i>
          </button>
          <button
            class="menu-toggle"
            id="menu-toggle"
            aria-label="メニューを開く"
            aria-expanded="false"
            aria-controls="mobile-nav"
          >
            <i class="fas fa-bars"></i>
          </button>
        </div>
      </div>
      <nav id="mobile-nav" aria-label="モバイルナビゲーション">
        <a href="/message">ビジョン</a>
        <a href="/#services-section">事業内容</a>
        <a href="/company">会社情報</a>
        <a href="/news">ニュース</a>
        <a href="/faq" class={activePage === 'faq' ? 'is-active' : ''}>よくあるご質問</a>
        <a href="/contact" class="mobile-cta">
          お問い合わせ
        </a>
      </nav>
    </header>
  )
}
