import { ChevronRight, Home } from 'lucide-react'
import React from 'react'
import { NavLink } from 'react-router-dom'
import useBreadcrumbs from 'use-react-router-breadcrumbs'

const Breadcrumb = ({ className }: { className?: string }) => {
  const breadcrumbs = useBreadcrumbs()

  return (
    <div className={`bg-[--color-dark--2] p-3 text-[1.6rem] text-white ${className}`}>
      <div className='containerLarge flex items-center '>
        {breadcrumbs.map(({ breadcrumb, match }, index) => (
          <React.Fragment key={match.pathname}>
            {index !== breadcrumbs.length - 1 ? (
              <NavLink
                to={match.pathname}
                className={
                  'flex items-center rounded-lg px-4 py-2 transition-all duration-300 hover:bg-[--color-dark--1]'
                }
              >
                {match.pathname === '/' ? (
                  <div className='flex items-center gap-3 rounded-lg transition-all duration-300 hover:bg-[--color-dark--1]'>
                    <Home size={18} />
                    <span>Home</span>
                  </div>
                ) : (
                  breadcrumb
                )}
              </NavLink>
            ) : (
              <div className='flex items-center rounded-lg px-4 py-2'>
                {match.pathname === '/' ? (
                  <div className='flex items-center gap-3 rounded-lg'>
                    <Home size={18} />
                    <span>Home</span>
                  </div>
                ) : (
                  breadcrumb
                )}
              </div>
            )}

            {index !== breadcrumbs.length - 1 && <ChevronRight size={18} />}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default Breadcrumb
