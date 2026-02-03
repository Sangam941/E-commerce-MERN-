type Tab<T extends string> = { id: T; label: string; icon?: React.ReactNode }

type Props<T extends string> = {
  tabs: Tab<T>[]
  value: T
  onChange: (v: T) => void
}

export function PillTabs<T extends string>({ tabs, value, onChange }: Props<T>) {
  return (
    <div className='flex gap-3 overflow-x-auto pb-2'>
      {tabs.map((t) => {
        const active = t.id === value
        return (
          <button
            key={t.id}
            type='button'
            onClick={() => onChange(t.id)}
            className={[
              'shrink-0 rounded-2xl px-5 py-3 text-sm font-semibold',
              'ring-1 ring-white/10 transition',
              active ? 'bg-blue-600 text-white' : 'bg-white/5 text-slate-200 hover:bg-white/10',
            ].join(' ')}
          >
            <span className='inline-flex items-center gap-2'>
              {t.icon ? <span className='opacity-90'>{t.icon}</span> : null}
              {t.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}

