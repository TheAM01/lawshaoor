/** Shown in the main column while an admin page renders on the server, so
 *  sidebar navigation responds instantly instead of appearing frozen. */
export default function AdminLoading() {
  return (
    <div className="flex-1 flex flex-col" aria-busy="true" aria-label="Loading">
      <div className="section-pad py-6 border-b border-foreground/15">
        <div className="h-7 w-48 bg-foreground/10 animate-pulse" />
      </div>
      <div className="section-pad py-8 md:py-10 space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-12 bg-foreground/[0.06] animate-pulse" />
        ))}
      </div>
    </div>
  )
}
