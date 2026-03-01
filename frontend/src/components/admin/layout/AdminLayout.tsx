import { Outlet } from 'react-router-dom'

export function AdminLayout() {
  return (
    <div className='min-h-screen bg-slate-950 text-slate-100'>
      <div className='mx-auto max-w-5xl px-4 py-6'>
        <div className='rounded-2xl bg-white/5 ring-1 ring-white/10 p-4'>
          <div className='text-lg font-black'>Admin</div>
          <div className='mt-1 text-sm text-slate-400'>Admin UI will live under `pages/admin` + `components/admin`.</div>
        </div>
        <div className='mt-6'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

