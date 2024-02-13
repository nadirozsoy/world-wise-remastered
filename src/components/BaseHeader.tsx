import { Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Sidebar from '@shared/Sidebar'
import MobileNavList from '@shared/MobileNavList'
import Button from '@shared/Button'
import { useTranslation } from 'react-i18next'
import LanguageSwitch from './shared/LanguageSwitch'

const BaseHeader = () => {
  const navigationRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [visibleSidebar, setVisibleSidebar] = useState<boolean>(false)
  const { t } = useTranslation()
  const navigate = useNavigate()

  const navCategories = [
    {
      id: 1,
      title: 'nav.home',
      slug: ''
      // subs: {
      //   subsTitles: [
      //     {
      //       id: 1,
      //       title: 'nav.roadTransportation',
      //       slug: ''
      //     },
      //     {
      //       id: 2,
      //       title: 'nav.trainTransportation',
      //       slug: ''
      //     },
      //     {
      //       id: 3,
      //       title: 'nav.seaTransportation',
      //       slug: ''
      //     },
      //     {
      //       id: 4,
      //       title: 'nav.airTransportation',
      //       slug: ''
      //     }
      //   ],
      //   images: [
      //     {
      //       id: 1,
      //       img: 'https://themewar.com/wp/logisfare/wp-content/uploads/2023/08/01-1-423x500.jpg',
      //       slug: ''
      //     },
      //     {
      //       id: 2,
      //       img: 'https://themewar.com/wp/logisfare/wp-content/uploads/2023/08/03-1-391x257.jpg',
      //       slug: ''
      //     },
      //     {
      //       id: 3,
      //       img: 'https://themewar.com/wp/logisfare/wp-content/uploads/2023/08/14-2-391x257.jpg',
      //       slug: ''
      //     }
      //   ]
      // }
    },
    { id: 2, title: 'nav.pricing', slug: 'pricing' },
    { id: 3, title: 'nav.product', slug: 'product' },
    { id: 4, title: 'BONUS', slug: 'upload' }
  ]

  useEffect(() => {
    const navigationContainer = navigationRef.current

    let scroll = window.scrollY

    const navigationContainerHeight = navigationContainer?.offsetHeight || 0

    const handleScroll = () => {
      const scrolled = window.scrollY

      if (scrolled > navigationContainerHeight) {
        navigationContainer?.classList.add('-translate-y-full')
      }

      if (scrolled < scroll) {
        navigationContainer?.classList.remove('-translate-y-full')
      }

      scroll = window.scrollY
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const resetActiveNavSub = () => {
    setActiveIndex(null)
  }

  const setActiveNavSub = (index: number | null) => {
    setActiveIndex(index)
  }

  return (
    <header id='header' ref={navigationRef} className='header relative h-[9.5rem] bg-[--color-dark--2] shadow'>
      <nav className='containerLarge flex h-full items-center gap-[3rem] max-xl:justify-between max-sm:py-4'>
        <Link to='/' className='h-auto overflow-hidden text-[2.5rem]'>
          <img src='/assets/icons/logo.png' alt='' className='h-auto w-[25rem]' />
        </Link>
        <div className='flex h-full items-center justify-between xl:w-full'>
          <ul className='hidden h-full xl:flex'>
            {navCategories.map((category, index) => (
              <li
                key={category.id}
                className={`header-item-animate h-full text-[1.6rem] uppercase ${
                  activeIndex === index ? 'activeSub' : ''
                }`}
                onMouseEnter={() => setActiveNavSub(index)}
                onMouseLeave={() => setActiveNavSub(null)}
              >
                <NavLink
                  to={`/${category.slug}`}
                  className={`nav-link group flex h-full items-center whitespace-nowrap p-[1rem] 2xl:p-[2rem]`}
                  onClick={resetActiveNavSub}
                >
                  <span className="text-shadow relative whitespace-nowrap font-medium uppercase after:absolute after:bottom-[-7px] after:left-0 after:h-[2px] after:w-0 after:bg-[--color-brand--2] after:transition-all after:duration-300 after:ease-out after:content-[''] group-hover:after:w-full">
                    {t(category.title)}
                  </span>
                </NavLink>
                {/* {category?.subs && (
                  <div className='header-link-sub pointer-events-none invisible absolute left-0 top-full z-[999] min-h-[30rem] w-full translate-y-[10px] bg-[--color-dark--2] px-12 py-16 opacity-0 shadow transition-all duration-300 ease-in-out will-change-transform'>
                    <div className='containerLarge flex justify-between gap-4 text-center max-xl:flex-col'>
                      <div className='scrollbar grid max-h-[70vh] grid-cols-5 gap-20 overflow-y-auto pr-4'>
                        <div className='mb-6 flex flex-col flex-wrap text-[1.6rem]'>
                          <div className='mb-8 flex flex-col gap-4'>
                            {category?.subs?.subsTitles.map(item => (
                              <div key={item.id} className='overflow-anywhere flex'>
                                <Link
                                  to={`${item.slug}`}
                                  className="relative whitespace-nowrap font-semibold after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 after:ease-out after:content-[''] hover:after:w-full"
                                >
                                  {item.title}
                                </Link>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className='header-link-sub-gallery grid justify-center gap-8 2xl:ml-auto'>
                        {category?.subs?.images.map(item => (
                          <Link
                            key={item.id}
                            to={`${item.slug}`}
                            className='header-link-sub-gallery-item overflow-hidden'
                          >
                            <img
                              src={item.img}
                              alt='services'
                              className='h-full w-full object-cover transition duration-300 hover:scale-105'
                            />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )} */}
              </li>
            ))}
          </ul>
          <div className='flex items-center gap-8 max-sm:h-fit sm:gap-[3rem]'>
            <LanguageSwitch />
            <div className='max-sm:hidden'>
              <Button onClick={() => navigate('/sign-in')}>login</Button>
            </div>
            <Menu
              color='var(--color-brand--2)'
              className='block cursor-pointer xl:hidden'
              onClick={() => setVisibleSidebar(true)}
            />
          </div>
        </div>
      </nav>
      <Sidebar visible={visibleSidebar} placement='right' onUpdateVisible={visible => setVisibleSidebar(visible)}>
        <div className='flex h-full flex-col overflow-auto bg-[--color-dark--2]'>
          <div className='flex items-center justify-between border-b p-[12px_16px]'>
            <Link to='/' onClick={() => setVisibleSidebar(false)}>
              <img src='/assets/icons/logo.png' alt='logo' className='h-[3.5rem] object-contain' loading='lazy' />
            </Link>
            <X
              className='-translate-x-3 cursor-pointer'
              size={20}
              color='var(--color-brand--2)'
              onClick={() => setVisibleSidebar(false)}
            />
          </div>
          <nav className='scrollbar h-full overflow-y-auto'>
            <div className='border-rare flex items-center justify-between border-b p-[6px_16px] text-[16px]'>
              <h2 className='py-2 font-medium uppercase'>Welcome</h2>
            </div>
            <MobileNavList onClose={() => setVisibleSidebar(false)} />
          </nav>

          <div className='my-10 border' />
          <div className='mb-10 flex flex-col justify-between gap-8 px-12 text-center text-[16px]'>
            <Button
              onClick={() => {
                navigate('/sign-in')
                setVisibleSidebar(false)
              }}
            >
              Login
            </Button>
          </div>
        </div>
      </Sidebar>
    </header>
  )
}

export default BaseHeader
