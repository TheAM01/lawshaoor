'use client'

import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { SplitReveal } from '@/components/motion/split-reveal'
import { FadeIn } from '@/components/motion/fade-in'
import { Rule } from '@/components/motion/rule'
import {
  CirclesInCircumference,
  HexagonalCascade,
  TesseractCube,
  StackedCubes,
  GridDots,
  VectorNode,
  OrbitRings,
  SquareCascade,
} from '@/components/illustrations'

type Person = {
  name: string
  title: string
  focus: string
  bio: string[]
  highlights: { label: string; value: string }[]
  Illo: React.ComponentType<{ className?: string; uid?: string }>
}

const TEAM: Person[] = [
  {
    name: 'Abdul Manan',
    title: 'Founder, LawShaoor Chambers',
    focus: 'Corporate · Commercial · Energy · Tech · Banking',
    bio: [
      'Abdul Manan is an Islamabad-based corporate and commercial lawyer with over 13 years of experience specializing in the energy, technology, fintech, and banking sectors. He handles the full range of corporate and commercial matters, representing multinational corporations, financial institutions, high-growth tech enterprises, non-profit organizations and local & foreign companies. He regularly advises clients on everything from complex corporate structuring to the regulatory nuances of AI and financial technologies.',
      'Before establishing LawShaoor Chambers, Mr. Manan worked with premier law firms across Pakistan and the Gulf region. He has a proven track record in executing major corporate restructurings, cross-border mergers and acquisitions, and corporate finance transactions.',
      'Alongside his primary focus on corporate and technology law, Mr. Manan possesses extensive experience in the energy and petroleum sectors. Drawing on his tenure at RIAA Barker Gillette, CMS (Saudi Arabia), and M.B. Kemp, he advised major energy companies on the commercial structuring, regulatory compliance and project documentation relating to upstream and downstream operations. His work included drafting and negotiating agreements for oil and gas projects, advising on licensing and regulatory frameworks, and supporting clients on cross-border energy transactions. This experience has given him a strong understanding of the legal and commercial dynamics of Pakistan’s energy and petroleum industry.',
      'Complementing his active practice, Mr. Manan is committed to the development of the legal profession. He serves as a visiting faculty member at several public sector universities in Islamabad, where he lectures on law.',
    ],
    highlights: [
      { label: 'Experience',    value: '13+ years' },
      { label: 'Prior firms',   value: 'RIAA Barker Gillette · CMS (Saudi Arabia) · M.B. Kemp' },
      { label: 'Sectors',       value: 'Energy · Technology · Fintech · Banking' },
      { label: 'Teaching',      value: 'Visiting faculty, public sector universities in Islamabad' },
    ],
    Illo: CirclesInCircumference,
  },
  {
    name: 'Sahibzada Saad',
    title: 'Off-Counsel',
    focus: 'Civil & Criminal Litigation · White-Collar Defence',
    bio: [
      'Sahibzada Saad is a courtroom advocate with over a decade of intensive litigation experience in civil and criminal litigation, white-collar defence, financial crimes, and regulatory matters. He routinely defends individuals and corporate entities facing severe exposure in fraud, embezzlement, breach of trust, and complex financial misconduct cases. He provides incisive, defence-oriented counsel on contentious financial transactions, fund tracing, and regulatory compliance.',
      'On the civil front, Mr. Saad regularly acts in hard-fought commercial and civil disputes. He is highly adept at securing urgent injunctive relief, navigating complex breach of contract claims, and managing protracted property and tortious disputes. His civil practice is defined by a highly strategic, trial-ready posture, ensuring clients are robustly represented from the issuance of pleadings through to final judgment and enforcement.',
    ],
    highlights: [
      { label: 'Experience', value: 'Decade+ of intensive litigation' },
      { label: 'Defence',    value: 'Fraud · Embezzlement · Breach of trust · Financial misconduct' },
      { label: 'Civil',      value: 'Injunctive relief · Breach of contract · Property & tortious disputes' },
    ],
    Illo: TesseractCube,
  },
  {
    name: 'Sifatullah',
    title: 'Senior Associate',
    focus: 'Corporate · Commercial · Regulatory · Disputes',
    bio: [
      'Mr. Sifat is a legal professional with a decade of experience in corporate, commercial, regulatory, and dispute resolution matters, advising clients across Pakistan and the UAE. He regularly advises businesses, corporate entities, and commercial clients on a wide range of transactional and regulatory matters.',
      'Mr. Sifat has been involved in drafting and reviewing various corporate and commercial agreements including share purchase agreements, shareholders’ agreements, term sheets, escrow arrangements, and other transactional documents for local and foreign clients.',
      'In addition to his transactional practice, Mr. Sifat advises on corporate structuring, governance, regulatory compliance, and commercial advisory matters.',
    ],
    highlights: [
      { label: 'Experience',  value: 'A decade' },
      { label: 'Jurisdictions', value: 'Pakistan · UAE' },
      { label: 'Documents',   value: 'SPAs · Shareholders’ agreements · Term sheets · Escrow' },
    ],
    Illo: HexagonalCascade,
  },
  {
    name: 'Komal Iqbal',
    title: 'Senior Associate',
    focus: 'Data Protection · GDPR · International Commercial',
    bio: [
      'Ms. Komal is an Advocate of the High Courts of Pakistan with a specialized practice in data protection, GDPR compliance, and international regulatory frameworks. She has experience in civil litigation, corporate advisory, and international commercial law. She advises clients on privacy governance, cross-border data transfers, data processing agreements, internal compliance policies, and risk management relating to personal data.',
      'She has worked with legal practices in Pakistan and the UAE, where she gained experience in DIFC and ADGM data protection regulations and broader international commercial law. Her practice includes advising on corporate compliance, dispute resolution, intellectual property matters, and regulatory obligations. She has represented clients before the Securities and Exchange Commission of Pakistan, the Competition Commission of Pakistan, and other judicial and quasi-judicial forums.',
      'Ms. Komal holds an LL.M. in International Commercial Law from the University of Aberdeen, Scotland, where her academic focus included data protection, digital regulation, and international commercial frameworks.',
    ],
    highlights: [
      { label: 'Admission',  value: 'Advocate of the High Courts of Pakistan' },
      { label: 'Education',  value: 'LL.M. International Commercial Law — University of Aberdeen, Scotland' },
      { label: 'Forums',     value: 'SECP · CCP · Other judicial & quasi-judicial forums' },
      { label: 'Speciality', value: 'DIFC & ADGM data protection · GDPR · Cross-border data' },
    ],
    Illo: OrbitRings,
  },
  {
    name: 'Malak Hussain Adeed',
    title: 'Associate',
    focus: 'Criminal Defence · White-Collar · Civil Litigation',
    bio: [
      'Mr. Hussain is an Islamabad-based advocate and a graduate of the University of London, currently practicing at LawShaoor Chambers. He is an Advocate of the High Courts and represents clients in a wide range of criminal and civil litigation matters. His practice focuses on criminal defence, white-collar offences, financial crimes, and complex multi-party disputes, where he regularly appears before trial courts, special tribunals, and the High Courts.',
      'He has extensive experience handling criminal trials, including matters involving fraud, breach of trust, financial irregularities, regulatory offences, and other statutory violations. His courtroom advocacy and practical understanding of procedural law allow him to effectively represent individuals and businesses facing criminal proceedings.',
    ],
    highlights: [
      { label: 'Education', value: 'University of London' },
      { label: 'Admission', value: 'Advocate of the High Courts' },
      { label: 'Forums',    value: 'Trial courts · Special tribunals · High Courts' },
      { label: 'Focus',     value: 'Fraud · Breach of trust · Financial irregularities · Statutory violations' },
    ],
    Illo: VectorNode,
  },
  {
    name: 'Mohammad Kalim Wali',
    title: 'Junior Associate',
    focus: 'Litigation · Corporate · Regulatory · Research',
    bio: [
      'Mr. Kalim is an Associate at LawShaoor Chambers, with experience in litigation, corporate law, regulatory compliance, and legal research. He regularly handles civil, criminal, family, and corporate matters, providing legal services through research, drafting, case preparation, and court representation.',
      'He regularly handles district court matters and drafts pleadings, legal notices, contracts, agreements, replies, and legal opinions across a range of practice areas. Mr. Kalim is also involved in corporate and regulatory compliance work, including SECP-related matters, maintenance of corporate records, and liaison with regulatory authorities to ensure compliance with legal and procedural requirements.',
      'Mr. Kalim completed his LLB from NUST Law School. He previously worked with the Office of Legal Affairs at the University of Central Asia, Bishkek, Kyrgyzstan, where he contributed to compliance initiatives, legal research, and institutional policy projects. His final year thesis focused on the legal and regulatory challenges faced by gig economy workers in Pakistan and the need for stronger legal protections and policy reforms in the sector.',
    ],
    highlights: [
      { label: 'Education',  value: 'LLB — NUST Law School' },
      { label: 'Prior role', value: 'Office of Legal Affairs, University of Central Asia (Bishkek, Kyrgyzstan)' },
      { label: 'Thesis',     value: 'Legal protections for gig economy workers in Pakistan' },
      { label: 'Work',       value: 'District courts · SECP matters · Drafting · Compliance' },
    ],
    Illo: GridDots,
  },
]

export default function People() {
  return (
    <main className="relative overflow-hidden">
      <Navbar />

      {/* HERO */}
      <section className="relative section-pad pt-32 md:pt-44 pb-20 md:pb-28 bg-fixed-mist overflow-hidden">
        <span aria-hidden className="hero-orb accent-breathe top-[10%] -right-[12%] hidden md:block" />
        <CirclesInCircumference className="absolute -left-16 top-12 w-[300px] h-[300px] opacity-30 hidden md:block" uid="ppl-hero-circ" />
        <VectorNode className="absolute -right-8 -bottom-8 w-44 h-44 opacity-35 hidden md:block" uid="ppl-hero-vn" />

        <div className="max-w-[1440px] mx-auto relative">
          <div className="mb-10 md:mb-14">
            <span className="index-chip">001 · Team</span>
          </div>

          <h1 className="display-xl font-display">
            <span className="block"><SplitReveal trigger="load" delay={0.1}>The people</SplitReveal></span>
            <span className="block text-gradient"><SplitReveal trigger="load" delay={0.3}>doing the work.</SplitReveal></span>
          </h1>

          <div className="grid grid-cols-12 gap-6 mt-12 md:mt-20">
            <div className="col-span-12 md:col-span-7 md:col-start-3">
              <FadeIn>
                <p className="font-heading text-xl md:text-2xl leading-snug text-foreground/90 tracking-[-0.01em]">
                  A dedicated team of partners and associates handling civil, commercial, corporate, regulatory, and dispute resolution matters across Pakistan and — through our partnership with M.B. KEMP (ME) LLP — the UAE, DIFC and ADGM.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* INDEX */}
      <section className="section-pad py-10 md:py-14 border-t border-foreground/15 bg-background-alt">
        <div className="max-w-[1440px] mx-auto">
          <Rule className="mb-6" />
          <FadeIn staggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2">
            {TEAM.map((p, i) => (
              <Link
                key={p.name}
                href={`#${slug(p.name)}`}
                className="group flex items-baseline gap-3 py-2 border-b border-foreground/10 hover:border-primary transition-colors"
              >
                <span className="eyebrow text-foreground/55 w-8">{String(i + 1).padStart(2, '0')}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-display text-base md:text-lg tracking-[-0.015em] text-foreground/90 group-hover:text-primary transition-colors">
                    {p.name}
                  </p>
                  <p className="text-xs font-mono tracking-[0.16em] uppercase text-foreground/55 mt-0.5">{p.title}</p>
                </div>
                <span className="opacity-0 group-hover:opacity-100 text-primary transition-opacity">→</span>
              </Link>
            ))}
          </FadeIn>
        </div>
      </section>

      {/* PEOPLE — alternating sections */}
      {TEAM.map((p, i) => (
        <section
          key={p.name}
          id={slug(p.name)}
          className={`relative section-pad py-20 md:py-28 border-t border-foreground/15 overflow-hidden ${i % 2 === 0 ? 'bg-fixed-lavender' : 'bg-background'}`}
        >
          {i % 2 === 0 ? (
            <OrbitRings className="absolute -right-32 top-1/2 -translate-y-1/2 w-[420px] h-[420px] opacity-25 hidden md:block" uid={`ppl-${i}-orb`} rotate />
          ) : (
            <HexagonalCascade className="absolute -left-24 -bottom-12 w-72 h-72 opacity-30 hidden md:block" uid={`ppl-${i}-hex`} />
          )}

          <div className="max-w-[1440px] mx-auto relative">
            <div className="grid grid-cols-12 gap-6 md:gap-10">
              {/* Left: illustration + highlights */}
              <div className="col-span-12 md:col-span-4 lg:col-span-4">
                <FadeIn className="surface bracketed p-8 md:p-10 flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <span className="index-chip">{String(i + 1).padStart(2, '0')} · {p.title.includes('Founder') ? 'Founder' : p.title.replace(', LawShaoor Chambers', '')}</span>
                  </div>
                  <div className="aspect-[4/5] bg-background-alt border border-foreground/15 flex items-center justify-center">
                    <p.Illo className="w-[90%] h-[90%]" uid={`ppl-${i}-illo`} />
                  </div>
                  <span className="absolute top-3 right-4 eyebrow text-foreground/45 font-mono bg-background/70 px-2 py-1 backdrop-blur hidden md:inline-block">
                    [ photo · placeholder ]
                  </span>
                </FadeIn>

                <FadeIn delay={0.15} className="mt-6 space-y-3">
                  <span className="eyebrow text-foreground/65">— Highlights</span>
                  <ul className="space-y-3">
                    {p.highlights.map((h) => (
                      <li key={h.label} className="border-b border-foreground/15 pb-3">
                        <p className="eyebrow text-foreground/55 mb-1">{h.label}</p>
                        <p className="font-heading text-base text-foreground/90 tracking-[-0.005em]">{h.value}</p>
                      </li>
                    ))}
                  </ul>
                </FadeIn>
              </div>

              {/* Right: name + bio */}
              <div className="col-span-12 md:col-span-8 lg:col-span-7 lg:col-start-6 space-y-6">
                <FadeIn>
                  <p className="eyebrow text-primary mb-3">— {p.focus}</p>
                  <h2 className="display-lg font-display tracking-[-0.025em]">
                    <SplitReveal>{p.name}</SplitReveal>
                  </h2>
                  <p className="eyebrow text-foreground/70 mt-3 font-mono tracking-[0.18em] uppercase">{p.title}</p>
                </FadeIn>

                <Rule className="rule-heavy" />

                <FadeIn staggerChildren className="space-y-5 font-heading text-base md:text-lg leading-relaxed text-foreground/85 tracking-[-0.005em] max-w-2xl">
                  {p.bio.map((para, j) => (
                    <p key={j}>{para}</p>
                  ))}
                </FadeIn>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="relative section-pad py-32 md:py-44 border-t border-foreground/15 bg-fixed-deep overflow-hidden">
        <OrbitRings className="absolute -left-20 -top-12 w-[420px] h-[420px] opacity-30 hidden md:block" uid="ppl-cta-orb" rotate />
        <StackedCubes className="absolute right-12 -bottom-8 w-40 h-56 opacity-55 hidden md:block float-soft" uid="ppl-cta-stk" />
        <SquareCascade className="absolute right-1/3 top-12 w-32 h-32 opacity-40 hidden lg:block" uid="ppl-cta-sq" />
        <div className="max-w-[1440px] mx-auto relative">
          <div className="grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 md:col-span-8 space-y-6">
              <span className="index-chip">Engage</span>
              <h2 className="display-lg font-display">
                <span className="block"><SplitReveal>Discuss your</SplitReveal></span>
                <span className="block text-gradient"><SplitReveal>matter with us.</SplitReveal></span>
              </h2>
            </div>
            <div className="col-span-12 md:col-span-4 flex flex-col gap-3 md:items-end">
              <Link href="/contact" className="btn-primary">
                <span>Schedule a call</span>
                <span className="arrow-magnet">→</span>
              </Link>
              <Link href="/practice-areas" className="btn-ghost">
                <span>See practice areas</span>
                <span className="arrow-magnet">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

function slug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}
