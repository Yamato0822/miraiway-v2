import type { FC } from 'hono/jsx'
import { Layout } from '../components/Layout'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { SectionHeading } from '../components/SectionHeading'
import { NewsList } from '../components/NewsList'
import { newsItems } from '../data/news'

export const NewsPage: FC = () => (
  <Layout
    canonicalPath="/news"
    title="お知らせ | MiraiWay"
    description="MiraiWayからのお知らせ、サービス情報、イベント情報をご案内します。"
  >
    <Header activePage="news" />

    <main id="page-main" class="news-page-main">
      <section class="news-page-hero">
        <div class="news-hero-container">
          <SectionHeading
            eyebrow="NEWS"
            title="お知らせ"
            description="MiraiWayの活動やサービスに関する最新情報をお届けします。"
            headingLevel={1}
          />
          <nav class="news-hero-breadcrumb" aria-label="パンくずリスト">
            <a href="/">ホーム</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">お知らせ</span>
          </nav>
        </div>
      </section>

      <section class="news-page-list-section" aria-label="お知らせ一覧">
        <div class="news-page-container">
          <NewsList items={newsItems} />
        </div>
      </section>
    </main>

    <Footer />
  </Layout>
)
