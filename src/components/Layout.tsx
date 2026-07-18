import type { FC, PropsWithChildren } from 'hono/jsx'
import { LogoMark } from './LogoMark'

interface LayoutProps {
  title?: string
  description?: string
}

export const Layout: FC<PropsWithChildren<LayoutProps>> = ({
  title = 'MiraiWay | 国境を越えて、可能性はつながる。- スリランカ人材と日本企業をつなぐ',
  description = 'MiraiWayはスリランカと日本をつなぎ、特定技能人材のマッチングから日本語教育、企業サポート、定着支援までワンストップで支援します。',
  children
}) => {
  return (
    <html lang="ja">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=M+PLUS+1p:wght@400;500;700;800&family=Shippori+Antique+B1&family=Outfit:wght@300;400;600;700;800&display=swap"
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
        <link href="/static/style.css" rel="stylesheet" />
        <link rel="icon" type="image/svg+xml" href="/static/favicon.svg" />
      </head>
      <body class="is-loading">
        {/* White-Base Curtain Shutter Preloader */}
        <div id="page-loader" class="page-loader" aria-hidden="true">
          <div class="loader-curtain top"></div>
          <div class="loader-curtain bottom"></div>
          <div class="loader-content">
            <div class="loader-logo-wrap">
              <LogoMark width={80} height={66} />
            </div>
            <div class="loader-line-bar">
              <div class="loader-line-progress"></div>
            </div>
          </div>
        </div>

        {children}
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script src="/static/app.js"></script>
      </body>
    </html>
  )
}
