import { NavLink } from 'react-router-dom'
import type { IAppLinks } from '@/types'

const AppNav = ({ className }: { className?: string }) => {
  const links = [
    {
      name: 'cities',
      path: 'cities'
    },
    {
      name: 'countries',
      path: 'countries'
    }
  ]
  return (
    <ul className={`mx-auto grid grid-cols-2 gap-2 rounded-xl bg-dark--2 p-1 text-sm uppercase ${className}`}>
      {links.map((link: IAppLinks) => (
        <li key={link.path} className='sidebar-nav-links w-full'>
          <NavLink
            to={link.path}
            className={`inline-block w-full cursor-pointer rounded-xl px-4 py-2 text-center transition-all`}
          >
            {link.name}
          </NavLink>
        </li>
      ))}
    </ul>
  )
}

export default AppNav
