import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  onClick?: () => void
  ariaLabel: string
  className?: string
}

export function IconButton({ children, onClick, ariaLabel, className }: Props) {
  return (
    <button
      type='button'
      aria-label={ariaLabel}
      onClick={onClick}
      className={[
        'inline-flex h-10 w-10 items-center justify-center rounded-xl',
        'bg-white/5 text-slate-100 ring-1 ring-white/10',
        'hover:bg-white/10 active:scale-[0.98] transition',
        className ?? '',
      ].join(' ')}
    >
      {children}
    </button>
  )
}

