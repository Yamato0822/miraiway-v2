import type { FC } from 'hono/jsx'
import { ActionLink } from './ActionLink'

interface ContactCTAProps {
  compact?: boolean
}

export const ContactCTA: FC<ContactCTAProps> = ({ compact = false }) => (
  <section
    class={`contact-cta ${compact ? 'contact-cta--compact' : ''}`.trim()}
    aria-labelledby={compact ? 'compact-contact-title' : 'contact-cta-title'}
  >
    {!compact && (
      <div class="cta-aurora" aria-hidden="true">
        <span class="cta-aurora__glow cta-aurora__glow--gold"></span>
        <span class="cta-aurora__glow cta-aurora__glow--sky"></span>
        <span class="cta-aurora__glow cta-aurora__glow--royal"></span>
      </div>
    )}
    {!compact && (
      <div class="contact-cta__wordmark" aria-hidden="true">MiraiWay</div>
    )}
    {!compact && (
      <div class="contact-cta__visual" aria-hidden="true">
        <img src="/static/images/contact-handshake-bg.png" alt="" width="800" height="500" loading="lazy" decoding="async" />
      </div>
    )}
    {!compact && <div class="contact-cta__texture" aria-hidden="true"></div>}
    {!compact && <div class="contact-cta__shade" aria-hidden="true"></div>}

    <div class="contact-cta__content">
      <p class="contact-cta__eyebrow">LET'S BUILD THE NEXT PATH</p>
      <h2 id={compact ? 'compact-contact-title' : 'contact-cta-title'}>
        <span>採用と定着の</span>
        <span>次の一歩を、</span>
        <span>一緒に整理しませんか。</span>
      </h2>
      <p class="contact-cta__lead">
        スリランカ人材の採用や受け入れに関する状況を伺い、必要な支援をご案内します。
      </p>

      <ul class="contact-cta__trust" aria-label="ご相談について">
        <li><i class="fas fa-check" aria-hidden="true"></i>初回のご相談・資料請求は無料</li>
        <li><i class="fas fa-check" aria-hidden="true"></i>採用前から就労後まで支援内容をご案内</li>
        <li><i class="fas fa-check" aria-hidden="true"></i>ご状況に合わせて個別にご相談</li>
      </ul>

      <div class="contact-cta__actions">
        <ActionLink href="/contact" className="contact-cta__primary">
          無料相談・お問い合わせ
        </ActionLink>
        <ActionLink href="/faq" variant="text">
          よくあるご質問を見る
        </ActionLink>
      </div>
    </div>

  </section>
)
