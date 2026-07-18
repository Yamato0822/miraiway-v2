import type { FC } from 'hono/jsx'
import { Layout } from '../components/Layout'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

export interface FAQItem {
  id: string
  category: 'pricing' | 'support' | 'field' | 'talent'
  question: string
  answer: string
}

export const faqList: FAQItem[] = [
  // 画像1
  {
    id: 'q1',
    category: 'pricing',
    question: '実績が少なくても任せられますか？',
    answer: '現在はパイロット受け入れの段階で、長期実績はこれから蓄積していきます。受け入れ人数や在籍期間を明示し、実績を順次公開します。まずは1名からの導入も可能です。'
  },
  {
    id: 'q2',
    category: 'pricing',
    question: '料金はいつ発生しますか？',
    answer: '候補者のご提案・面談までは無料です。内定承諾後に受入準備費10万円、入社時に成功報酬80万円が発生します。紹介業務は、許可を持つ提携会社を通じて行います。'
  },
  {
    id: 'q3',
    category: 'pricing',
    question: '他社との料金の違いは何ですか？',
    answer: '紹介料だけでなく、来日前教育や入社後支援を含めた総額で比較できる点が特徴です。費用と支援範囲を項目ごとに明示し、条件に合わせた見積書をご提示します。'
  },
  // 画像2
  {
    id: 'q4',
    category: 'support',
    question: '支援プランは途中で変更できますか？',
    answer: '追加の日本語教育や生活サポートは、原則1カ月単位で変更できます。人材の状況や企業の受け入れ体制に合わせて、必要な支援内容をご提案します。'
  },
  {
    id: 'q5',
    category: 'support',
    question: '企業側では何をする必要がありますか？',
    answer: '雇用契約、労働環境の整備、賃金の支払い、社会保険や労務管理などは企業側にご対応いただきます。支援業務は提携機関と連携し、担当者の負担を軽減します。'
  },
  {
    id: 'q6',
    category: 'support',
    question: '人材が途中で退職した場合は？',
    answer: '定期面談や母国語での相談を通じて、職場や生活上の問題を早期に把握します。退職時の対応や代替人材の紹介、返金条件については契約前に明示します。'
  },
  // 画像3
  {
    id: 'q7',
    category: 'field',
    question: 'どの分野に対応していますか？',
    answer: '建設分野を中心に、介護・農業分野などへの対応を進めています。必要な資格や受け入れ条件は分野によって異なるため、企業の業務内容を確認してご案内します。'
  },
  {
    id: 'q8',
    category: 'field',
    question: '登録支援機関として登録済みですか？',
    answer: '現在は登録に向けて支援体制を整備しています。登録完了までは、提携する登録支援機関が法定支援を担当し、MiraiWayは教育や連絡調整を担います。'
  },
  {
    id: 'q9',
    category: 'field',
    question: '候補者本人に費用負担はありますか？',
    answer: '紹介料、送り出し手数料、支援費、保証金、違約金は本人から徴収しません。試験料や渡航費などの実費は、金額・目的・支払先を事前に説明します。'
  },
  // 画像4
  {
    id: 'q10',
    category: 'talent',
    question: 'なぜスリランカ人材なのですか？',
    answer: '現地に教育・人材ネットワークを持ち、募集、教育、選考、来日後支援まで継続して関われるためです。国籍だけでなく、技能や適性を確認してご紹介します。'
  },
  {
    id: 'q11',
    category: 'talent',
    question: '日本語力はどの程度ですか？',
    answer: '来日前教育では、特定技能に必要な日本語試験への合格と、N4相当の日本語力を目指します。職場で使う日本語や報告・連絡・相談、生活ルールも学びます。'
  },
  {
    id: 'q12',
    category: 'talent',
    question: '入社後のミスマッチをどう防ぎますか？',
    answer: '仕事内容、給与、勤務地、住居、職場環境を来日前から具体的に共有します。面接だけでなく、教育期間中の姿勢や本人の希望も確認してマッチングします。'
  }
]

export const FAQPage: FC = () => {
  return (
    <Layout
      title="よくあるご質問（Q&A） | MiraiWay - スリランカ人材と日本企業をつなぐ"
      description="MiraiWayのサービスに関するよくあるご質問（Q&A）ページです。料金体系、受け入れ支援、対応分野、日本語教育、ミスマッチ防止策などを分かりやすく回答しています。"
    >
      <Header />

      <main id="page-main" class="faq-page-main">
        {/* Custom Interactive Cursor */}
        <div id="custom-cursor" aria-hidden="true"></div>

        <section class="faq-hero-section">
          <div class="faq-container">
            {/* Header Title Section (Matches Image Graphic) */}
            <div class="faq-title-head">
              <h1 class="faq-main-title">
                <span class="q-blue">Q</span>
                <span class="amp-gray">&amp;</span>
                <span class="a-orange">A</span>
              </h1>
              <p class="faq-sub-title">よくあるご質問</p>
              <div class="faq-title-divider">
                <span class="star-mark">✦</span>
              </div>
            </div>

            {/* Filter Tabs */}
            <div class="faq-tabs" id="faq-tabs">
              <button class="faq-tab-btn active" data-category="all">
                すべて ({faqList.length})
              </button>
              <button class="faq-tab-btn" data-category="pricing">
                料金・契約
              </button>
              <button class="faq-tab-btn" data-category="support">
                支援・体制
              </button>
              <button class="faq-tab-btn" data-category="field">
                対応分野・条件
              </button>
              <button class="faq-tab-btn" data-category="talent">
                人材・日本語力
              </button>
            </div>

            {/* 3-Column Grid matching the Image Layout */}
            <div class="faq-cards-grid" id="faq-cards-grid">
              {faqList.map((item) => (
                <div class="faq-card-item" data-category={item.category} key={item.id}>
                  <div class="faq-q-badge" aria-hidden="true">
                    <span>Q</span>
                  </div>
                  <h3 class="faq-card-question">{item.question}</h3>
                  <div class="faq-card-divider"></div>
                  <p class="faq-card-answer">{item.answer}</p>
                </div>
              ))}
            </div>

            {/* CTA Banner Section */}
            <div class="faq-bottom-cta">
              <div class="cta-inner">
                <h3>ご不明な点や個別のご相談はこちら</h3>
                <p>自社の条件に合わせた詳しい見積もりや人材選定のご相談を承っております。</p>
                <a href="/contact" class="btn btn-primary btn-cta">
                  <span>無料相談・お問い合わせ</span>
                  <i class="fas fa-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </Layout>
  )
}
