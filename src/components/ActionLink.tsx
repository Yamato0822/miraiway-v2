import type { FC, PropsWithChildren } from 'hono/jsx'

interface ActionLinkProps {
  href: string
  variant?: 'primary' | 'secondary' | 'text'
  className?: string
  ariaLabel?: string
}

export const ActionLink: FC<PropsWithChildren<ActionLinkProps>> = ({
  href,
  variant = 'primary',
  className = '',
  ariaLabel,
  children
}) => (
  <a
    href={href}
    class={`action-link action-link--${variant} ${className}`.trim()}
    aria-label={ariaLabel}
  >
    <span>{children}</span>
    <i class="fas fa-arrow-right" aria-hidden="true"></i>
  </a>
)
