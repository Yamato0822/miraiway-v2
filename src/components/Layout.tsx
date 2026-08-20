import type { FC, PropsWithChildren } from 'hono/jsx'
import { LogoMark } from './LogoMark'

interface LayoutProps {
  title?: string
  description?: string
  canonicalPath?: string
  cinematicOpening?: boolean
}

export const Layout: FC<PropsWithChildren<LayoutProps>> = ({
  title = 'MiraiWay | 国境を越えて、可能性はつながる。- スリランカ人材と日本企業をつなぐ',
  description = 'MiraiWayはスリランカと日本をつなぎ、特定技能人材のマッチングから日本語教育、企業サポート、定着支援までワンストップで支援します。',
  canonicalPath = '/',
  cinematicOpening = false,
  children
}) => {
  const siteUrl = 'https://www.miraiway-japan.com'
  const canonicalUrl = `${siteUrl}${canonicalPath === '/' ? '/' : canonicalPath.replace(/\/$/, '')}`
  const socialImage = `${siteUrl}/android-chrome-512x512.png`
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: 'MiraiWay',
    url: `${siteUrl}/`,
    logo: `${siteUrl}/android-chrome-512x512.png`,
    email: 'miraiwayjapan@gmail.com',
    sameAs: [
      'https://x.com/MiraiWay_jp',
      'https://www.youtube.com/@MiraiWayJapan'
    ]
  }

  return (
    <html lang="ja">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script dangerouslySetInnerHTML={{ __html: `
          if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
          }
          window.scrollTo(0, 0);
        ` }} />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index,follow,max-image-preview:large" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:locale" content="ja_JP" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="MiraiWay" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={socialImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={socialImage} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
        {/* Preconnect & Preloads for maximum performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        {cinematicOpening && (
          <link rel="preload" href="/static/data/geo.json" as="fetch" crossorigin="anonymous" />
        )}
        <link rel="preload" href="/static/tokens.css" as="style" />
        <link rel="preload" href="/static/style.css" as="style" />
        <link
          href="https://fonts.googleapis.com/css2?family=M+PLUS+1p:wght@400;500;700;800&family=Shippori+Antique+B1&family=Outfit:wght@300;400;600;700;800&family=Syne:wght@700;800&family=Plus+Jakarta+Sans:wght@700;800;900&family=Great+Vibes&family=Alex+Brush&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=handshake,auto_stories,domain_add,volunteer_activism,videocam"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css"
          rel="stylesheet"
        />
        <link href="/static/tokens.css" rel="stylesheet" />
        <link href="/static/style.css" rel="stylesheet" />
        <link href="/static/phase1a.css" rel="stylesheet" />
        <link href="/static/about-editorial.css" rel="stylesheet" />
        <link href="/static/service-detail.css" rel="stylesheet" />
        <link href="/static/midnight-journey.css" rel="stylesheet" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0a1f36" />
      </head>
      <body class={`is-loading${cinematicOpening ? ' has-cinematic-opening' : ''}`}>
        <a class="skip-link" href="#page-main">本文へ移動</a>
        {/* A short black boot bridge on the home page; the live logo is rendered by WebGL. */}
        <div id="page-loader" class="page-loader" aria-hidden="true">
          <div class="loader-curtain top"></div>
          <div class="loader-curtain bottom"></div>
          <div class="loader-content">
            {cinematicOpening ? (
              <span class="loader-boot-label">INITIALIZING MIRAIWAY</span>
            ) : (
              <div class="loader-logo-wrap">
                <LogoMark width={96} height={78} idPrefix="loader" />
              </div>
            )}
            <div class="loader-line-bar">
              <div class="loader-line-progress"></div>
            </div>
          </div>
        </div>

        {children}

        {/* Floating Scroll to Top Button with Dynamic Circular Progress */}
        <button
          id="scroll-to-top"
          class="scroll-to-top"
          type="button"
          aria-label="ページトップへ戻る"
          title="ページトップへ戻る"
        >
          <svg class="scroll-to-top__progress" viewBox="0 0 48 48" aria-hidden="true">
            <circle class="scroll-to-top__track" cx="24" cy="24" r="21" />
            <circle class="scroll-to-top__bar" id="scroll-top-bar" cx="24" cy="24" r="21" />
          </svg>
          <span class="scroll-to-top__content" aria-hidden="true">
            <svg class="scroll-to-top__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 15l-6-6-6 6"/>
            </svg>
            <span class="scroll-to-top__text">TOP</span>
          </span>
        </button>

        <script src="/static/app.js"></script>
        <script src="/static/phase1a.js"></script>
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            function forceUnlock() {
              if (document.body.classList.contains('has-cinematic-opening') &&
                  !document.body.classList.contains('cinematic-opening-ready')) return;
              var loader = document.getElementById('page-loader');
              if (loader && loader.style.display !== 'none') {
                loader.classList.add('is-complete', 'is-loaded');
                document.body.classList.remove('is-loading');
                document.body.classList.add('intro-revealed');
                setTimeout(function() { loader.style.display = 'none'; }, 600);
              }
            }
            if (document.readyState === 'complete') {
              setTimeout(forceUnlock, 400);
            } else {
              window.addEventListener('load', function() { setTimeout(forceUnlock, 400); });
              setTimeout(forceUnlock, 900);
            }
          })();
        ` }} />
      </body>
    </html>
  )
}
