import type { Metadata } from 'next'
import { LegalPage } from '@/components/legal-page'

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'Legal disclaimer governing the use of the LawShaoor Chambers website and its content.',
  robots: { index: true, follow: true },
}

export default function Disclaimer() {
  return (
    <LegalPage
      title="Website Disclaimer"
      updated="1 July 2026"
      intro="The content available on this website is provided for general informational purposes only. Nothing on this website constitutes legal advice, professional guidance, or a substitute for obtaining specific advice from a qualified advocate. You should not act or refrain from acting based on any information published on this website without obtaining appropriate legal advice tailored to your circumstances."
      sections={[
        {
          heading: '1. No legal advice',
          body: [
            'The content available on this website is provided for general informational purposes only. Nothing on this website constitutes legal advice, professional guidance, or a substitute for obtaining specific advice from a qualified advocate.',
            'You should not act or refrain from acting based on any information published on this website without obtaining appropriate legal advice tailored to your circumstances.',
          ],
        },
        {
          heading: '2. No advocate–client relationship',
          body: [
            'Accessing this website, contacting us through the website, or submitting an enquiry does not create an advocate–client relationship with LawShaoor Chambers or any advocate associated with the Chambers. An advocate–client relationship is formed only after we expressly agree to act for you and confirm such engagement in writing.',
          ],
        },
        {
          heading: '3. Accuracy and currency of information',
          body: [
            'While we endeavour to ensure that the information on this website is accurate and up to date, we do not guarantee the accuracy, completeness, reliability, or suitability of any content. Legal information may become outdated due to changes in legislation, case law, or regulatory practice. We disclaim all liability for any errors, omissions, or outdated information.',
          ],
        },
        {
          heading: '4. Limitation of liability',
          body: [
            'To the fullest extent permitted under the laws of Pakistan, LawShaoor Chambers, its advocates, and its staff accept no responsibility or liability for:',
            {
              list: [
                'any loss, damage, or consequences arising from reliance on information published on this website;',
                'any interruption, delay, or inability to access the website;',
                'any viruses, malware, or harmful components that may be transmitted through the website;',
                'any actions taken or not taken based on website content.',
              ],
            },
            'Your use of this website is entirely at your own risk.',
          ],
        },
        {
          heading: '5. Email communications',
          body: [
            'Email communications sent to or from the Chambers may not be secure, may be intercepted, corrupted, or delayed, and may lose confidentiality if forwarded. We do not guarantee that emails are virus-free or error-free. If you receive an email from us in error, please notify us and delete it immediately.',
            'Unless expressly agreed in writing:',
            {
              list: [
                'emails do not constitute an offer or acceptance;',
                'emails do not create any binding obligations;',
                'the Chambers does not accept service of legal documents by email.',
              ],
            },
          ],
        },
        {
          heading: '6. Intellectual property',
          body: [
            'All content on this website — including but not limited to text, graphics, layout, and design — is owned by or licensed to LawShaoor Chambers and is protected under applicable intellectual property laws. No part of this website may be reproduced, distributed, or made available to the public without our prior written consent.',
          ],
        },
        {
          heading: '7. Third-party links',
          body: [
            'This website may contain links to third-party websites. We do not control, endorse, or assume responsibility for the content, security, or privacy practices of any external website. Accessing third-party websites is at your own risk, and you should review their terms and policies before using them.',
          ],
        },
        {
          heading: '8. Fraud and impersonation warning',
          body: [
            'Cybercrime is a growing risk. If you receive any communication claiming that LawShaoor Chambers has changed its contact details, bank details, or payment instructions, you must verify this directly with us before taking any action. We will not be liable for any loss arising from fraudulent communications or impersonation attempts.',
          ],
        },
        {
          heading: '9. No warranties',
          body: [
            'We make no warranties or representations regarding:',
            {
              list: [
                'the availability of the website;',
                'the accuracy or reliability of website content;',
                'the suitability of the website for any particular purpose.',
              ],
            },
            'All content is provided on an “as is” and “as available” basis.',
          ],
        },
        {
          heading: '10. Governing law and jurisdiction',
          body: [
            'This website, including its terms, notices, and disclaimers, is governed by the laws of Pakistan. Any disputes arising from the use of this website shall be subject to the exclusive jurisdiction of the courts of Pakistan.',
          ],
        },
        {
          heading: '11. Contact',
          body: [
            'For enquiries relating to this Disclaimer or the website, please contact us by email at hello@lawshaoor.com.',
          ],
        },
      ]}
    />
  )
}
