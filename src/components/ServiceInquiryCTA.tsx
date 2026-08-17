import type { FC } from 'hono/jsx'
import { ActionLink } from './ActionLink'

interface ServiceInquiryCTAProps {
  eyebrow: string
  title: string
  description: string
  href: string
  linkLabel: string
}

export const ServiceInquiryCTA: FC<ServiceInquiryCTAProps> = ({
  eyebrow,
  title,
  description,
  href,
  linkLabel
}) => (
  <section class="service-inquiry" aria-labelledby="service-inquiry-title">
    <div class="service-inquiry__wordmark" aria-hidden="true">MIRAIWAY</div>
    <div class="service-inquiry__copy">
      <p class="service-inquiry__eyebrow">{eyebrow}</p>
      <h2 id="service-inquiry-title">{title}</h2>
      <p>{description}</p>
    </div>
    <ActionLink href={href} className="service-inquiry__action">
      {linkLabel}
    </ActionLink>
  </section>
)
