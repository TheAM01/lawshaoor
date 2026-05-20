# Hawthorne Legal - Project Guide

## 🎨 Design System

### Color Palette (Pastel Brown Theme)
- **Primary** (`--primary`): Rich brown/tan - for CTAs and key accents
- **Accent** (`--accent`): Warm gold/caramel - for secondary highlights
- **Secondary** (`--secondary`): Soft beige/off-white - for backgrounds
- **Background** (`--background`): Warm off-white - main page background
- **Foreground** (`--foreground`): Deep brown - text color

### Typography
- **Headings**: Crimson Text (serif) - elegant, sophisticated
- **Body**: Inter (sans-serif) - clean, readable

### Key Design Principles
✓ Sleek and minimal - no floating elements, gimmicks, or pills
✓ Professional yet edgy - sophisticated but with personality
✓ Quirky but not corny - unique without being gimmicky
✓ Sexy and engaging - visually compelling, strategic use of white space

---

## 📁 Project Structure

### Pages
```
app/
├── page.tsx                 # Home page (6 sections + CTAs)
├── about/page.tsx          # About/team/values
├── contact/page.tsx        # Contact form & info
├── insights/page.tsx       # Insights/blog listing
├── insights/[id]/page.tsx  # Individual insight articles
├── practice-areas/page.tsx # M&A, governance, commercial law details
├── services/page.tsx       # Service offerings & pricing
└── layout.tsx              # Root layout with fonts & metadata
```

### Components
```
components/
├── navbar.tsx    # Navigation bar with logo, links, CTA
├── footer.tsx    # Footer with links and contact info
└── ui/          # shadcn/ui components
```

### Styling
```
app/
└── globals.css   # Design tokens, semantic colors, base styles
```

---

## 🎯 Home Page Sections (7 total)

1. **Hero** - Compelling headline, subheading, dual CTAs
2. **Expertise** - 3-column service showcase (M&A, Governance, Contracts)
3. **Why Hawthorne** - Benefits, proof points (20+ years, $2B+ managed, 98% retention)
4. **Industries** - 6 industry verticals served
5. **Process** - 4-step methodology (Understand → Strategy → Execute → Deliver)
6. **CTA Section** - "Ready to move forward?" call to action
7. **Footer** - Navigation, contact, company info

---

## 🔥 CTA Strategy

Every page has **compelling, specific CTAs**:
- Primary CTA: "Schedule Consultation" / "Schedule Now" → `/contact`
- Secondary CTA: Knowledge/exploration links → relevant pages
- Form CTA: Contact form with matter types, testimonials
- Value CTA: "Discuss Your Deal", "Get Legal Support", "Schedule Governance Review"

**CTA Placement:**
- Hero sections (always)
- End of service explanations
- Practice area deep dives
- Bottom of content sections
- Contact page (prominent form + direct contact)

---

## 📱 Responsive Design

- Mobile-first approach
- Grid layouts adapt:
  - Mobile: 1 column
  - Tablet (md): 2 columns
  - Desktop (lg): 3+ columns
- Touch-friendly buttons and spacing
- Readable typography at all sizes

---

## 🎭 Brand Personality

**Professional + Edgy**
- Corporate expertise (M&A, governance, complex deals)
- Modern approach (transparent pricing, efficiency rewards)
- Direct communication (no corporate jargon)
- Sophisticated design (minimal, clean, intentional)

**Quirky But Not Corny**
- Unique hero visual (abstract geometric with subtle gradients)
- Personality in copy ("moves fast", "refuse to compromise")
- Genuine team bios with personality
- Strategic use of color and typography

---

## 🔗 Key Links & Navigation

- **Navbar**: Home, Services, Practice, About, Insights, Schedule
- **Home CTAs**: 
  - Schedule Consultation → /contact
  - Explore Practice Areas → /practice-areas
  - Learn More → /practice-areas
  - Our Story → /about
  - Schedule → /contact

- **Practice Areas**:
  - M&A → /practice-areas#mergers
  - Governance → /practice-areas#governance
  - Commercial → /practice-areas#strategy

---

## 💡 Content Areas (Can Be Customized)

### Lawyer Info
- Name: (Configure in layout.tsx metadata)
- Practice: Corporate law (M&A, governance, commercial)
- Experience: 20+ years
- Clients: Fortune 500, PE-backed companies, ambitious growth companies

### Social Proof
- 98% client retention rate
- $2B+ in transactions managed
- 20+ years combined expertise

### Call-to-Action Copy
- "Schedule a Consultation"
- "Let's Discuss Your Deal"
- "Tell Us About Your Legal Needs"
- "Get In Touch"

---

## 🎨 Customization Tips

### Change Colors
Edit `/app/globals.css`:
```css
--primary: oklch(0.55 0.12 35);      /* Adjust hue (0-360) */
--accent: oklch(0.65 0.14 40);       /* Adjust saturation & lightness */
--background: oklch(0.98 0.01 25);
```

### Change Fonts
Edit `/app/layout.tsx`:
```tsx
import { NewFont } from 'next/font/google'
const newFont = NewFont({ ... })
```

### Update Lawyer Name/Info
Edit `/app/layout.tsx` metadata and component headings

### Add New Services
Edit `/app/services/page.tsx` - add to services array

### Update Team Members
Edit `/app/about/page.tsx` - modify team member details

---

## 📊 SEO & Metadata

- **Title**: "Hawthorne Legal - Corporate Law Excellence"
- **Description**: "Premium corporate law services. Specialized in M&A, corporate governance, and business strategy."
- **Keywords**: Corporate law, M&A, mergers & acquisitions, corporate governance, business law

Update in `/app/layout.tsx` → `metadata` object

---

## 🚀 Deployment

The site is production-ready and optimized:
- Static site generation where possible
- Dynamic routes for blog articles
- Optimized images and fonts
- Mobile-responsive
- Accessibility best practices
- Fast load times (Turbopack)

Deploy to Vercel with:
```bash
vercel deploy
```

---

## 📝 Notes

- All placeholder copy should be replaced with actual lawyer/chambers information
- Contact form requires backend integration (email/CRM)
- Consider adding testimonials/case studies
- Blog/insights can be connected to CMS
- Team member images can be added to enhance About page
- Consider adding a legal disclaimer/privacy policy

---

**Built with:** Next.js 16, React 19, Tailwind CSS, shadcn/ui, Lucide Icons
