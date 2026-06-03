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
      title="Disclaimer"
      updated="31 May 2026"
      intro="The following disclaimer governs your use of this website. By accessing or using the site, you accept it. Please have your own legal counsel confirm this wording before publication."
      sections={[
        {
          heading: '1. No legal advice',
          body: [
            'The content on this website is provided for general information only and does not constitute legal advice. It should not be relied upon as a substitute for advice from a qualified lawyer on your specific circumstances.',
            'You should not act, or refrain from acting, on the basis of any content on this site without seeking professional legal advice.',
          ],
        },
        {
          heading: '2. No lawyer–client relationship',
          body: [
            'Accessing this website, contacting us through it, or transmitting information via it does not create a lawyer–client relationship between you and LawShaoor Chambers. Such a relationship is established only by a formal engagement agreed in writing.',
            'Please do not send confidential or time-sensitive information through this website until a formal engagement is in place.',
          ],
        },
        {
          heading: '3. Accuracy and currency',
          body: [
            'While we take care to keep the information on this site accurate and current, the law changes and content may become out of date. We make no warranty as to the accuracy, completeness or currency of any content.',
          ],
        },
        {
          heading: '4. Strategic association',
          body: [
            'References to M.B. KEMP (ME) LLP describe a strategic association between separate and independent law practices. Nothing on this site should be read as creating a single partnership or legal entity, or as making one firm liable for the acts or omissions of the other.',
          ],
        },
        {
          heading: '5. External links',
          body: [
            'This website may contain links to third-party websites, including our publications on external platforms. We are not responsible for the content, accuracy or practices of any third-party site.',
          ],
        },
        {
          heading: '6. Limitation of liability',
          body: [
            'To the fullest extent permitted by law, LawShaoor Chambers accepts no liability for any loss or damage arising from reliance on, or use of, this website or its content.',
          ],
        },
        {
          heading: '7. Intellectual property',
          body: [
            'All content on this website — including text, branding, illustrations and publications — is the property of LawShaoor Chambers unless otherwise stated, and is protected by copyright. It may not be reproduced or republished without our prior written permission.',
          ],
        },
      ]}
    />
  )
}
