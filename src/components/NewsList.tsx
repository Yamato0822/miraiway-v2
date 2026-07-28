import type { FC } from 'hono/jsx'
import type { NewsItem } from '../types/news'

interface NewsListProps {
  items: NewsItem[]
  variant?: 'home' | 'page'
}

const formatDate = (date: string) =>
  new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(new Date(date))

export const NewsList: FC<NewsListProps> = ({ items, variant = 'page' }) => {
  if (items.length === 0) {
    return (
      <div class={`news-empty-state news-empty-state--${variant}`} role="status">
        <span class="news-empty-state__mark" aria-hidden="true">NEWS</span>
        <div>
          <h3>現在、お知らせはありません。</h3>
          <p>最新情報は準備が整い次第こちらでご案内します。</p>
        </div>
      </div>
    )
  }

  return (
    <div class={`news-shared-list news-shared-list--${variant}`}>
      {items.map((item) => {
        const content = (
          <>
            <time datetime={item.publishedAt}>{formatDate(item.publishedAt)}</time>
            <span class="news-shared-list__category">{item.category}</span>
            <h3>{item.title}</h3>
            {item.excerpt && <p>{item.excerpt}</p>}
          </>
        )

        return item.href ? (
          <a href={item.href} class="news-shared-list__item" key={item.id}>{content}</a>
        ) : (
          <article class="news-shared-list__item" key={item.id}>{content}</article>
        )
      })}
    </div>
  )
}
