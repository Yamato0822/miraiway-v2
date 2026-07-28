import type { FC } from 'hono/jsx'
import { Layout } from '../components/Layout'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

interface NewsItem {
  id: string
  yearMonth: string
  day: string
  category: string
  title: string
  link: string
}

const NEWS_DATA: NewsItem[] = [
  {
    id: '1',
    yearMonth: '2026.12',
    day: '05',
    category: 'PRESS RELEASE',
    title: 'MiraiWay グループの特定技能支援事業および新拠点展開戦略を発表いたしました',
    link: '/news/1'
  },
  {
    id: '2',
    yearMonth: '2026.11',
    day: '17',
    category: 'メディア掲載',
    title: '『日経産業新聞』にて、日ス両拠点を繋ぐ特定技能プラットフォーム事業について紹介されました',
    link: '/news/2'
  },
  {
    id: '3',
    yearMonth: '2026.11',
    day: '09',
    category: 'お知らせ',
    title: 'スリランカ直営校における特定技能（建築・介護・農業）第1期生修了式および採用面接会を開催いたしました',
    link: '/news/3'
  },
  {
    id: '4',
    yearMonth: '2026.11',
    day: '17',
    category: 'メディア掲載',
    title: '『日経産業新聞』にて、経営統合および特定技能人材の受入れ拡大について紹介されました',
    link: '/news/4'
  },
  {
    id: '5',
    yearMonth: '2026.11',
    day: '17',
    category: 'セミナー',
    title: '【受入れ企業様向け】特定技能スリランカ人材の最新採用・定着ノウハウ解説オンラインセミナー開催決定',
    link: '/news/5'
  },
  {
    id: '6',
    yearMonth: '2026.11',
    day: '17',
    category: 'IR情報',
    title: '特定技能登録支援機関としての実績およびサポート体制に関する最新レポートを公開いたしました',
    link: '/news/6'
  },
  {
    id: '7',
    yearMonth: '2026.11',
    day: '17',
    category: 'お知らせ',
    title: 'スリランカ現地法人における日本語教育カリキュラムのレベルアップおよびJFT-Basic合格率向上施策について',
    link: '/news/7'
  },
  {
    id: '8',
    yearMonth: '2026.11',
    day: '17',
    category: '導入事例',
    title: '【企業インタビュー】建設・介護事業者様におけるスリランカ特定技能人材の活躍事例インタビューを掲載いたしました',
    link: '/news/8'
  },
  {
    id: '9',
    yearMonth: '2026.11',
    day: '17',
    category: 'イベント',
    title: '日ス国交親善および国際キャリア開発推進イベントにてMiraiWay代表が登壇いたしました',
    link: '/news/9'
  },
  {
    id: '10',
    yearMonth: '2026.11',
    day: '17',
    category: 'サービス',
    title: '在留資格申請手続きから生活立ち上げまでを完全カバーする「ワンストップ支援パッケージ」を提供開始いたしました',
    link: '/news/10'
  },
  {
    id: '11',
    yearMonth: '2026.11',
    day: '17',
    category: 'PRESS RELEASE',
    title: 'MiraiWay 公式Webサイトを公開いたしました。日ス両拠点での特定技能人材支援を本格始動します',
    link: '/news/11'
  }
]

export const NewsPage: FC = () => {
  return (
    <Layout title="お知らせ・ニュース一覧 | MiraiWay - 国境を越えて、可能性をつなぐ">
      <Header activePage="news" />

      <main id="page-main" class="news-page-main">
        {/* ===== News Hero Header ===== */}
        <section class="news-page-hero">
          <div class="news-hero-container">
            <div class="news-hero-text">
              <h1 class="news-hero-en">NEWS</h1>
              <p class="news-hero-jp">お知らせ</p>
            </div>
            <div class="news-hero-breadcrumb">
              <a href="/" class="crumb-icon-link" aria-label="ホーム">
                <i class="fas fa-home"></i>
              </a>
              <span class="crumb-sep">&gt;</span>
              <span class="crumb-current">お知らせ</span>
            </div>
          </div>
        </section>

        {/* ===== News List Section ===== */}
        <section class="news-page-list-section">
          <div class="news-page-container">
            <div class="news-page-list">
              {NEWS_DATA.map((item) => (
                <a href={item.link} class="news-page-item" key={item.id}>
                  <div class="news-item-date-box">
                    <span class="news-item-year-month">{item.yearMonth}</span>
                    <span class="news-item-day">{item.day}</span>
                  </div>

                  <div class="news-item-content">
                    <div class="news-item-cat">
                      <i class="far fa-gem cat-diamond-icon"></i>
                      <span>{item.category}</span>
                    </div>
                    <h2 class="news-item-title-text">{item.title}</h2>
                  </div>

                  <div class="news-item-arrow-wrap">
                    <i class="fas fa-arrow-right news-item-arrow-icon"></i>
                  </div>
                </a>
              ))}
            </div>

            {/* Pagination Controls */}
            <div class="news-pagination">
              <button class="page-nav-btn prev" aria-label="前のページ">
                <i class="fas fa-arrow-left"></i>
              </button>
              <button class="page-num-btn is-active">1</button>
              <button class="page-num-btn">2</button>
              <button class="page-num-btn">3</button>
              <button class="page-nav-btn next" aria-label="次のページ">
                <i class="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </Layout>
  )
}
