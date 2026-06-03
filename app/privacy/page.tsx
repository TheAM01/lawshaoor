import type { Metadata } from 'next'
import { LegalPage } from '@/components/legal-page'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How LawShaoor Chambers collects, uses and protects personal data submitted through this website.',
  robots: { index: true, follow: true },
}

export default function Privacy() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="31 May 2026"
      intro="This policy explains how LawShaoor Chambers collects, uses, stores and protects the personal information you provide through this website. Please review it carefully — and have your own legal counsel confirm it before publication."
      sections={[
        {
          heading: '1. Who we are',
          body: [
            'LawShaoor Chambers (“we”, “us”, “our”) is a law chambers based in Islamabad, Pakistan, operating in strategic association with M.B. KEMP (ME) LLP. This website is operated by LawShaoor Chambers.',
            'For any questions about this policy or your personal data, contact us at info@lawshaoor.com.',
          ],
        },
        {
          heading: '2. Information we collect',
          body: [
            'We collect information you voluntarily provide — such as your name, email address, phone number and the contents of any message — when you use our contact form, request a call, subscribe to our publications, or apply for a role.',
            'We also collect limited technical data automatically, including IP address, browser type, device information and usage analytics, to operate and improve the site.',
          ],
        },
        {
          heading: '3. How we use your information',
          body: [
            'We use your information to respond to enquiries, provide and discuss legal services, process job applications, send publications you have subscribed to, and maintain the security and performance of this website.',
            'Submitting an enquiry does not create a lawyer–client relationship. Please do not send confidential or sensitive information until such a relationship has been formally established.',
          ],
        },
        {
          heading: '4. Legal basis and sharing',
          body: [
            'We process personal data on the basis of your consent, our legitimate interests in operating the chambers, and compliance with applicable law.',
            'We do not sell your personal data. We may share it with trusted service providers (for example, hosting, email and analytics providers) who process it on our behalf, and where required by law or regulatory authority.',
          ],
        },
        {
          heading: '5. Data retention and security',
          body: [
            'We retain personal data only for as long as necessary for the purposes set out above or as required by law. We apply reasonable technical and organisational measures to protect it against unauthorised access, loss or disclosure.',
          ],
        },
        {
          heading: '6. Your rights',
          body: [
            'Subject to applicable law, you may request access to, correction of, or deletion of your personal data, and may withdraw consent or object to certain processing. To exercise these rights, contact info@lawshaoor.com.',
          ],
        },
        {
          heading: '7. Cookies and analytics',
          body: [
            'This website uses cookies and similar technologies for essential functionality and to understand how the site is used. You can control cookies through your browser settings.',
          ],
        },
        {
          heading: '8. Changes to this policy',
          body: [
            'We may update this policy from time to time. The “last updated” date above reflects the most recent revision. Continued use of the website after changes constitutes acceptance of the updated policy.',
          ],
        },
      ]}
    />
  )
}
