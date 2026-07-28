import type { FC } from 'hono/jsx'

interface SectionHeadingProps {
  number?: string
  eyebrow: string
  title: string
  titleLines?: string[]
  description?: string
  align?: 'left' | 'center'
  headingLevel?: 1 | 2
  className?: string
}

export const SectionHeading: FC<SectionHeadingProps> = ({
  number,
  eyebrow,
  title,
  titleLines,
  description,
  align = 'left',
  headingLevel = 2,
  className = ''
}) => {
  const HeadingTag = headingLevel === 1 ? 'h1' : 'h2'

  return (
    <div class={`section-heading section-heading--${align} ${className}`.trim()}>
      <div class="section-heading__meta">
        {number && <span class="section-heading__number">{number}</span>}
        <span class="section-heading__rule" aria-hidden="true"></span>
        <span class="section-heading__eyebrow">{eyebrow}</span>
      </div>
      <HeadingTag class="section-heading__title">
        {titleLines?.length
          ? titleLines.map((line) => <span class="section-heading__title-line">{line}</span>)
          : title}
      </HeadingTag>
      {description && <p class="section-heading__description">{description}</p>}
    </div>
  )
}
