import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { Home } from './pages/Home'
import { ContactPage } from './pages/ContactPage'
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage'
import { FAQPage } from './pages/FAQPage'
import { CompanyPage } from './pages/CompanyPage'
import { MessagePage } from './pages/MessagePage'
import { NewsPage } from './pages/NewsPage'

const app = new Hono()

app.use('/api/*', cors())

// ---- API: お問い合わせ受付 ----
app.post('/api/contact', async (c) => {
  try {
    const body = await c.req.json<{
      name?: string
      company?: string
      email?: string
      phone?: string
      inquiryType?: string
      message?: string
    }>()

    const { name, email, message, company, phone, inquiryType } = body

    if (!name || !name.trim()) {
      return c.json({ ok: false, error: 'お名前を入力してください。' }, 400)
    }

    if (!email || !email.trim()) {
      return c.json({ ok: false, error: 'メールアドレスを入力してください。' }, 400)
    }

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) {
      return c.json({ ok: false, error: '有効なメールアドレスの形式で入力してください。' }, 400)
    }

    if (!message || !message.trim()) {
      return c.json({ ok: false, error: 'お問い合わせ内容を入力してください。' }, 400)
    }

    console.log('[Contact Form Received]', {
      name,
      company,
      email,
      phone,
      inquiryType,
      message,
      timestamp: new Date().toISOString()
    })

    return c.json({
      ok: true,
      message: 'お問い合わせを正常に受け付けました。担当者より折り返しご連絡させていただきます。'
    })
  } catch (err) {
    console.error('Contact API Error:', err)
    return c.json({ ok: false, error: 'リクエストの処理中にエラーが発生しました。入力内容をご確認ください。' }, 400)
  }
})

// ---- メインページ (トップ) ----
app.get('/', (c) => {
  return c.html(<Home />)
})

// ---- お問い合わせ専用ページ ----
app.get('/contact', (c) => {
  return c.html(<ContactPage />)
})

// ---- 個人情報保護方針 (プライバシーポリシー) ページ ----
app.get('/privacy', (c) => {
  return c.html(<PrivacyPolicyPage />)
})

// ---- よくあるご質問 (FAQ) ページ ----
app.get('/faq', (c) => {
  return c.html(<FAQPage />)
})

// ---- 会社概要 (Company) ページ ----
app.get('/company', (c) => {
  return c.html(<CompanyPage />)
})

// ---- ビジョン・メッセージ (Message / Vision) ページ ----
app.get('/message', (c) => {
  return c.html(<MessagePage />)
})
app.get('/vision', (c) => {
  return c.html(<MessagePage />)
})

// ---- お知らせ・ニュース一覧 (News) ページ ----
app.get('/news', (c) => {
  return c.html(<NewsPage />)
})

export default app
