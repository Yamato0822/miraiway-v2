import type { FC } from 'hono/jsx'
import { Layout } from '../components/Layout'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

export const PrivacyPolicyPage: FC = () => {
  return (
    <Layout
      title="個人情報保護方針（プライバシーポリシー） | MiraiWay"
      description="MiraiWayの個人情報保護方針（プライバシーポリシー）についてのページです。個人情報の取得、利用目的、管理および保護についての取り組みを掲載しています。"
    >
      <Header />

      <main id="page-main" class="privacy-page-main">

        <section class="privacy-hero-section">
          <div class="privacy-container">
            <div class="privacy-header">
              <span class="eyebrow">PRIVACY POLICY</span>
              <h1 class="privacy-title">個人情報保護方針</h1>
              <p class="privacy-lead">
                MiraiWay（以下「当社」といいます。）は、お客様の個人情報の重要性を認識し、<br />
                その適切な保護と管理を徹底するため、以下の通りプライバシーポリシーを定めています。
              </p>
            </div>

            <div class="privacy-content-card">
              <div class="policy-section">
                <h2>1. 個人情報の定義</h2>
                <p>
                  本プライバシーポリシーにおいて、「個人情報」とは、個人情報保護法にいう「個人情報」を指すものとし、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日、住所、電話番号、連絡先その他の記述等により特定の個人を識別できる情報（他の情報と容易に照合することができ、それにより特定の個人を識別することができることとなるものを含む）をいいます。
                </p>
              </div>

              <div class="policy-section">
                <h2>2. 個人情報の収集方法</h2>
                <p>
                  当社は、ユーザーが本ウェブサイトでお問い合わせフォームの利用、資料請求、各種サービスへのお申し込みをする際に、氏名、会社名、メールアドレス、電話番号などの個人情報をお尋ねすることがあります。
                </p>
              </div>

              <div class="policy-section">
                <h2>3. 個人情報を収集・利用する目的</h2>
                <p>当社が個人情報を収集・利用する目的は、以下のとおりです。</p>
                <ul>
                  <li>当社サービス（特定技能人材マッチング、日本語教育、受入サポート等）のご提供・運営のため</li>
                  <li>お客様からのお問い合わせ、ご相談に回答するため（本人確認を行うことを含む）</li>
                  <li>サービスに関する更新情報、イベント・セミナーのご案内、および各種お知らせの配信のため</li>
                  <li>サービスの改善、新サービスの開発、およびアンケート・マーケティング分析のため</li>
                  <li>利用規約に違反したユーザーや、不正・不当な目的でサービスを利用しようとするユーザーの特定およびご利用をお断りするため</li>
                </ul>
              </div>

              <div class="policy-section">
                <h2>4. 個人情報の第三者提供</h2>
                <p>
                  当社は、次に掲げる場合を除いて、あらかじめユーザーの同意を得ることなく、第三者に個人情報を提供することはありません。ただし、個人情報保護法その他の法令で認められる場合を除きます。
                </p>
                <ul>
                  <li>人の生命、身体または財産の保護のために必要がある場合であって、本人の同意を得ることが困難であるとき</li>
                  <li>公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって、本人の同意を得ることが困難であるとき</li>
                  <li>国の機関若しくは地方公共団体又はその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって、本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき</li>
                </ul>
              </div>

              <div class="policy-section">
                <h2>5. 個人情報の安全管理措置</h2>
                <p>
                  当社は、個人情報の紛失、破壊、改ざんおよび漏洩などを防止するため、不正アクセス対策やコンピュータウイルス対策など適切な情報セキュリティ対策を講じ、厳重に管理・保護いたします。
                </p>
              </div>

              <div class="policy-section">
                <h2>6. 個人情報の開示・訂正・利用停止・削除</h2>
                <p>
                  当社は、本人から個人情報の開示、内容の訂正、追加、削除、利用停止または消去を求められたときは、ご本人であることを確認させていただいた上で、遅滞なく対応いたします。
                </p>
              </div>

              <div class="policy-section">
                <h2>7. プライバシーポリシーの変更</h2>
                <p>
                  本ポリシーの内容は、法令その他本ポリシーに別段の定めのある事項を除いて、ユーザーに通知することなく変更することができるものとします。当社が別途定める場合を除いて、変更後のプライバシーポリシーは、本ウェブサイトに掲載した時から効力を生じるものとします。
                </p>
              </div>

              <div class="policy-section">
                <h2>8. お問い合わせ窓口</h2>
                <p>本ポリシーに関するお問い合わせは、下記の窓口までお願いいたします。</p>
                <div class="contact-box shadow-box">
                  <p class="contact-company-name">MiraiWay 個人情報保護担当窓口</p>
                  <p>メールアドレス: <a href="mailto:miraiwayjapan@gmail.com" class="inline-link">miraiwayjapan@gmail.com</a></p>
                </div>
              </div>

              <div class="privacy-back-action">
                <a href="/contact" class="btn btn-primary">
                  <i class="fas fa-arrow-left"></i> お問い合わせ画面へ戻る
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
