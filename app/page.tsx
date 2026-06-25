import { getSiteSettings } from '@/lib/server/settings'
import { resolveMarqueeItems } from '@/lib/models/settings'
import { HomeContent } from './_home-content'


export default async function HomePage() {
  const settings = await getSiteSettings()
  const marqueeItems = resolveMarqueeItems(settings.siteMarqueeItems)
  return <HomeContent marqueeItems={marqueeItems} />
}
