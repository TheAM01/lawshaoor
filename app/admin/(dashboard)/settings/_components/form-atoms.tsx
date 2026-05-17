'use client'

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border border-foreground/15 bg-background">
      <div className="px-5 py-3 border-b border-foreground/15 bg-background-alt/40">
        <p className="text-[10px] font-mono tracking-[0.32em] uppercase text-foreground/70">{title}</p>
      </div>
      <div className="p-5 space-y-5">{children}</div>
    </div>
  )
}

export function Field({
  label,
  help,
  row = false,
  children,
}: {
  label: string
  help?: React.ReactNode
  /** Horizontal layout: label on left, control on right, vertically centered. */
  row?: boolean
  children: React.ReactNode
}) {
  if (row) {
    return (
      <div className="space-y-1.5">
        <div className="flex items-center justify-between gap-4">
          <label className="text-[10px] font-mono tracking-[0.28em] uppercase text-foreground/65">
            {label}
          </label>
          <div className="flex items-center">{children}</div>
        </div>
        {help && (
          <p className="text-[11px] text-foreground/45 font-heading leading-relaxed">{help}</p>
        )}
      </div>
    )
  }
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-mono tracking-[0.28em] uppercase text-foreground/65">
        {label}
      </label>
      {children}
      {help && (
        <p className="text-[11px] text-foreground/45 font-heading leading-relaxed">{help}</p>
      )}
    </div>
  )
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full bg-background border border-foreground/15 px-3 py-2 text-sm font-heading text-foreground placeholder:text-foreground/35 focus:outline-none focus:border-primary transition-colors ${props.className ?? ''}`}
    />
  )
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`w-full bg-background border border-foreground/15 px-3 py-2 text-sm font-heading text-foreground placeholder:text-foreground/35 focus:outline-none focus:border-primary transition-colors resize-y ${props.className ?? ''}`}
    />
  )
}

export function Select({
  value,
  onChange,
  children,
}: {
  value: string
  onChange: (v: string) => void
  children: React.ReactNode
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-background border border-foreground/15 px-3 py-2 text-sm font-heading text-foreground focus:outline-none focus:border-primary transition-colors"
    >
      {children}
    </select>
  )
}

export function Toggle({
  value,
  onChange,
  label,
}: {
  value: boolean
  onChange: (v: boolean) => void
  label: string
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className={`inline-flex items-center gap-3 px-3 py-2 border transition-colors ${
        value
          ? 'border-primary bg-primary/10 text-foreground'
          : 'border-foreground/15 text-foreground/60 hover:border-foreground/30'
      }`}
    >
      <span
        className={`relative block w-11 h-6 rounded-full overflow-hidden transition-colors shrink-0 ${
          value ? 'bg-primary' : 'bg-foreground/25'
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-background rounded-full shadow-sm transition-transform duration-200 ease-out ${
            value ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </span>
      <span className="text-[10px] font-mono tracking-[0.22em] uppercase">{label}</span>
    </button>
  )
}
