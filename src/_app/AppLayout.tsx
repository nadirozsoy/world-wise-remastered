import AppNav from '@/components/AppNav'
import Map from '@/components/Map'
import Breadcrumb from '@/components/shared/Breadcrumb'
import Sidebar from '@/components/shared/Sidebar'
import { useCities } from '@/context/CitiesContext'
import { ChevronRight, X } from 'lucide-react'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  const { visibleSidebar, setVisibleSidebar } = useCities()

  return (
    <>
      <Sidebar placement='left' visible={visibleSidebar} onUpdateVisible={() => setVisibleSidebar(false)}>
        <div className='flex min-h-dvh flex-col bg-dark--1 px-6 py-6 sm:px-12'>
          <div className='flex items-center justify-between'>
            <img src='/assets/icons/logo.png' alt='logo' className='h-[4.5rem] object-contain' />
            <button
              type='button'
              className='flex-center size-16 cursor-pointer rounded-full border-2 border-primary p-2'
              onClick={() => setVisibleSidebar(false)}
            >
              <X size={20} color='var(--color-brand--2)' />
            </button>
          </div>
          <Breadcrumb className='mt-8 rounded-xl' />
          <AppNav className='mt-8' />
          <div className='scrollbar mt-12'>
            <Outlet />
          </div>
          <footer className='mt-auto'>
            <p className='text-center text-sm'>
              Copyright © {new Date().getFullYear()} WorldWise. All rights reserved.
            </p>
          </footer>
        </div>
      </Sidebar>
      <div className='relative min-h-dvh bg-[--color-dark--1]'>
        <button
          type='button'
          onClick={() => setVisibleSidebar(true)}
          className='flex-center absolute left-4 top-1/2 z-[999] -translate-y-1/2 rounded-full border-2 border-white bg-primary p-4 shadow'
        >
          <ChevronRight color='white' />
        </button>
        <Map />
      </div>
    </>
  )
}

export default AppLayout
