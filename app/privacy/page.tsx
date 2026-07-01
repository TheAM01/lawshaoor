import type { Metadata } from 'next'
import { LegalPage } from '@/components/legal-page'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How LawShaoor Chambers collects, uses, stores and protects personal information submitted through this website.',
  robots: { index: true, follow: true },
}

export default function Privacy() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="1 July 2026"
      intro="This Privacy Policy explains how LawShaoor Chambers (“we”, “our”, “the Chambers”) collects, uses, stores, and protects personal information obtained through this website. We are committed to safeguarding the privacy of all visitors, clients, and prospective clients in accordance with applicable laws of Pakistan and internationally recognised privacy principles."
      sections={[
        {
          heading: '1. Introduction',
          body: [
            'This Privacy Policy explains how LawShaoor Chambers collects, uses, stores, and protects personal information obtained through this website. We are committed to safeguarding the privacy of all visitors, clients, and prospective clients in accordance with applicable laws of Pakistan and internationally recognised privacy principles.',
            'By accessing or using this website, you acknowledge and agree to the practices described in this Privacy Policy.',
          ],
        },
        {
          heading: '2. Information we collect',
          body: [
            'We may collect the following categories of personal information:',
            {
              list: [
                'Contact details: name, email address, phone number (if provided).',
                'Enquiry information: details submitted through the contact form or email.',
                'Professional information: if voluntarily provided during enquiries.',
                'Technical information: IP address, browser type, device information, access times.',
                'Usage information: pages visited, interaction logs, and general website analytics.',
              ],
            },
            'We do not collect sensitive personal data unless voluntarily provided by you during an enquiry.',
          ],
        },
        {
          heading: '3. Information collected automatically',
          body: [
            'When you visit our website, certain information may be automatically logged by our hosting environment for security, diagnostics, and performance purposes. This may include IP addresses, device identifiers, browser metadata, and access logs. Such information is used to maintain the integrity and functionality of the website.',
          ],
        },
        {
          heading: '4. Cookies and analytics',
          body: [
            'Our website may use essential cookies required for technical functionality. If additional cookies or analytics tools are introduced in the future, this Privacy Policy will be updated accordingly.',
          ],
        },
        {
          heading: '5. Purpose and lawful basis of processing',
          body: [
            'We process personal data for the following purposes:',
            {
              list: [
                'responding to enquiries and communications',
                'providing legal information or scheduling consultations',
                'maintaining website security and performance',
                'complying with legal and regulatory obligations',
                'improving user experience and website functionality',
              ],
            },
            'Our lawful bases include:',
            {
              list: [
                'consent — when you voluntarily submit information',
                'legitimate interests — ensuring website security, preventing misuse, and improving services',
                'legal obligations — compliance with PECA and Bar Council rules',
              ],
            },
          ],
        },
        {
          heading: '6. Legal enquiries and communications',
          body: [
            'Information submitted through the website is used solely to respond to your enquiry. We strongly advise users not to submit confidential or sensitive case details through the public contact form. Such information should only be shared through secure channels after initial contact.',
          ],
        },
        {
          heading: '7. Confidentiality and limits of confidentiality',
          body: [
            'All communications received are treated with professional confidentiality. However:',
            {
              list: [
                'website enquiries are not encrypted end-to-end.',
                'confidentiality may be limited by legal obligations under Pakistani law.',
                'confidentiality does not apply to information voluntarily made public or shared through insecure channels.',
              ],
            },
          ],
        },
        {
          heading: '8. No advocate–client relationship created',
          body: [
            'Use of this website, including submission of an enquiry, does not create an advocate–client relationship. This clarification is provided for transparency and is expanded in the Website Disclaimer.',
          ],
        },
        {
          heading: '9. Data sharing and third parties',
          body: [
            'We do not sell or trade personal data. We may share information only with:',
            {
              list: [
                'technical service providers (e.g., hosting, email routing)',
                'security and analytics providers',
                'regulatory or law enforcement authorities where legally required',
              ],
            },
            'All third-party providers are required to handle data securely and in accordance with applicable standards.',
          ],
        },
        {
          heading: '10. User rights',
          body: [
            'Subject to applicable laws of Pakistan and good practice standards, users may request:',
            {
              list: [
                'Access to their personal data',
                'Correction of inaccurate information',
                'Deletion of data (where legally permissible)',
                'Restriction of processing',
                'Withdrawal of consent (for consent-based processing)',
              ],
            },
            'Requests may be submitted to: hello@lawshaoor.com',
          ],
        },
        {
          heading: '11. Data security',
          body: [
            'We implement reasonable technical and organisational measures to protect personal data, including secure hosting, access controls, and monitoring for suspicious activity. However, no method of online transmission is completely secure, and users should avoid sharing sensitive information through public forms.',
          ],
        },
        {
          heading: '12. Children’s privacy',
          body: [
            'This website is not intended for individuals under the age of 18. We do not knowingly collect personal data from minors.',
          ],
        },
        {
          heading: '13. Marketing communications',
          body: [
            'We do not currently send marketing emails or newsletters. If marketing communications are introduced, users will be able to opt in and opt out at any time.',
          ],
        },
        {
          heading: '14. External links',
          body: [
            'Our website may contain links to external websites. We are not responsible for the privacy practices or content of third-party websites. Users should review the privacy policies of external sites before providing personal information.',
          ],
        },
        {
          heading: '15. Changes to this policy',
          body: [
            'We may update this Privacy Policy periodically. The “Last updated” date will be revised accordingly. Continued use of the website constitutes acceptance of the updated policy.',
          ],
        },
        {
          heading: '16. Contact details and complaints',
          body: [
            'For questions, requests, or complaints regarding this Privacy Policy, please contact us by email at hello@lawshaoor.com.',
          ],
        },
      ]}
    />
  )
}
