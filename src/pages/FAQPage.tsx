import type { FC } from 'hono/jsx'
import { Layout } from '../components/Layout'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { SectionHeading } from '../components/SectionHeading'
import { ContactCTA } from '../components/ContactCTA'

export type FAQCategory = 'recruiting' | 'pricing' | 'education' | 'retention'

export interface FAQItem {
  id: string
  category: FAQCategory
  question: string
  answer: string
}

const faqCategories: { id: FAQCategory; label: string }[] = [
  { id: 'recruiting', label: '採用・人材について' },
  { id: 'pricing', label: '費用・契約について' },
  { id: 'education', label: '教育・手続きについて' },
  { id: 'retention', label: '受け入れ・定着について' }
]

export const faqList: FAQItem[] = [
  {
    id: 'q1',
    category: 'recruiting',
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
  {
    id: 'q4',
    category: 'pricing',
    question: '支援プランは途中で変更できますか？',
    answer: '追加の日本語教育や生活サポートは、原則1カ月単位で変更できます。人材の状況や企業の受け入れ体制に合わせて、必要な支援内容をご提案します。'
  },
  {
    id: 'q5',
    category: 'retention',
    question: '企業側では何をする必要がありますか？',
    answer: '雇用契約、労働環境の整備、賃金の支払い、社会保険や労務管理などは企業側にご対応いただきます。支援業務は提携機関と連携し、担当者の負担を軽減します。'
  },
  {
    id: 'q6',
    category: 'retention',
    question: '人材が途中で退職した場合は？',
    answer: '定期面談や母国語での相談を通じて、職場や生活上の問題を早期に把握します。退職時の対応や代替人材の紹介、返金条件については契約前に明示します。'
  },
  {
    id: 'q7',
    category: 'recruiting',
    question: 'どの分野に対応していますか？',
    answer: '建設分野を中心に、介護・農業分野などへの対応を進めています。必要な資格や受け入れ条件は分野によって異なるため、企業の業務内容を確認してご案内します。'
  },
  {
    id: 'q8',
    category: 'education',
    question: '登録支援機関として登録済みですか？',
    answer: '現在は登録に向けて支援体制を整備しています。登録完了までは、提携する登録支援機関が法定支援を担当し、MiraiWayは教育や連絡調整を担います。'
  },
  {
    id: 'q9',
    category: 'pricing',
    question: '候補者本人に費用負担はありますか？',
    answer: '紹介料、送り出し手数料、支援費、保証金、違約金は本人から徴収しません。試験料や渡航費などの実費は、金額・目的・支払先を事前に説明します。'
  },
  {
    id: 'q10',
    category: 'recruiting',
    question: 'なぜスリランカ人材なのですか？',
    answer: '現地に教育・人材ネットワークを持ち、募集、教育、選考、来日後支援まで継続して関われるためです。国籍だけでなく、技能や適性を確認してご紹介します。'
  },
  {
    id: 'q11',
    category: 'education',
    question: '日本語力はどの程度ですか？',
    answer: '来日前教育では、特定技能に必要な日本語試験への合格と、N4相当の日本語力を目指します。職場で使う日本語や報告・連絡・相談、生活ルールも学びます。'
  },
  {
    id: 'q12',
    category: 'recruiting',
    question: '入社後のミスマッチをどう防ぎますか？',
    answer: '仕事内容、給与、勤務地、住居、職場環境を来日前から具体的に共有します。面接だけでなく、教育期間中の姿勢や本人の希望も確認してマッチングします。'
  }
]

export const FAQPage: FC = () => (
  <Layout
    canonicalPath="/faq"
    title="よくあるご質問（Q&A） | MiraiWay"
    description="MiraiWayの料金、受け入れ支援、対応分野、日本語教育など、よくあるご質問にお答えします。"
  >
    <Header activePage="faq" />

    <main id="page-main" class="faq-page-main">
      <section class="faq-hero-section">
        <div class="faq-container">
          <SectionHeading
            eyebrow="QUESTIONS & ANSWERS"
            title="よくあるご質問"
            description="採用や受け入れをご検討の企業様から多く寄せられるご質問を、テーマ別にご案内します。"
            headingLevel={1}
            align="center"
          />

          <div class="faq-category-filter" aria-label="質問カテゴリー">
            <button type="button" class="faq-category-button is-active" data-category="all" aria-pressed="true" aria-controls="faq-list">
              すべて <span>{faqList.length}</span>
            </button>
            {faqCategories.map((category) => (
              <button
                type="button"
                class="faq-category-button"
                data-category={category.id}
                aria-pressed="false"
                aria-controls="faq-list"
              >
                {category.label}
                <span>{faqList.filter((item) => item.category === category.id).length}</span>
              </button>
            ))}
          </div>

          <div class="faq-accordion" id="faq-list">
            {faqList.map((item, index) => (
              <details class="faq-accordion__item" id={item.id} data-category={item.category}>
                <summary
                  id={`${item.id}-question`}
                  aria-controls={`${item.id}-answer`}
                  aria-expanded="false"
                >
                  <span class="faq-accordion__index">Q{String(index + 1).padStart(2, '0')}</span>
                  <span class="faq-accordion__question">{item.question}</span>
                  <span class="faq-accordion__toggle" aria-hidden="true"></span>
                </summary>
                <div class="faq-accordion__answer-outer">
                  <div
                    class="faq-accordion__answer"
                    id={`${item.id}-answer`}
                    role="region"
                    aria-labelledby={`${item.id}-question`}
                  >
                    <span class="faq-accordion__ans-label" aria-hidden="true">A</span>
                    <p>{item.answer}</p>
                  </div>
                </div>
              </details>
            ))}
          </div>

          <ContactCTA compact />
        </div>
      </section>
    </main>

    <Footer />
  </Layout>
)
