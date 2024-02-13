import { useReducer } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import type { INavCategory, IMobileNavProps } from '@/types'

const navCategories: INavCategory[] = [
  {
    id: 1,
    title: 'HOME',
    slug: ''
  },
  {
    id: 2,
    title: 'PRICING',
    slug: 'pricing'
    // subs: [
    //   {
    //     id: 1,
    //     title: 'default',
    //     slug: '',
    //     subs: [
    //       {
    //         id: 1,
    //         title: 'sub1',
    //         slug: 'pricing'
    //       },
    //       {
    //         id: 2,
    //         title: 'nav.trainTransportation',
    //         slug: 'pricing'
    //       },
    //       {
    //         id: 3,
    //         title: 'nav.seaTransportation',
    //         slug: 'pricing'
    //       },
    //       {
    //         id: 4,
    //         title: 'nav.airTransportation',
    //         slug: 'pricing'
    //       }
    //     ]
    //   },
    //   {
    //     id: 2,
    //     title: 'default-2',
    //     slug: ''
    //   },
    //   {
    //     id: 3,
    //     title: 'default-3',
    //     slug: ''
    //   },
    //   {
    //     id: 4,
    //     title: 'default-4',
    //     slug: ''
    //   }
    // ]
  },
  {
    id: 3,
    title: 'PRODUCT',
    slug: 'product'
  },
  {
    id: 4,
    title: 'BONUS',
    slug: 'upload'
  }
]

const initialState = {
  openSublist: false,
  subCategories: []
}

type IState = {
  openSublist: boolean
  subCategories: INavCategory[]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reducer = (state: IState, action: any) => {
  switch (action.type) {
    case 'OPEN_SUBLIST':
      return {
        ...state,
        openSublist: true,
        subCategories: action.payload
      }
    case 'CLOSE_SUBLIST':
      return {
        ...state,
        openSublist: false,
        subCategories: []
      }
    default:
      return state
  }
}

const MobileNav = ({ onClose }: IMobileNavProps) => {
  const [{ openSublist, subCategories }, dispatch] = useReducer(reducer, initialState)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleTrigger = (subs: any) => {
    if (openSublist) {
      dispatch({ type: 'CLOSE_SUBLIST' })
    } else {
      dispatch({ type: 'OPEN_SUBLIST', payload: subs })
    }
  }

  return (
    <div className='relative min-h-[calc(100dvh-22.8rem)] overflow-x-hidden p-[6px_16px_0_16px]'>
      <div className='flex flex-col'>
        {navCategories.map(navCategory => (
          <div
            key={navCategory.id}
            className='flex items-center justify-between border-b border-b-[--color-dark--2] py-[8px] text-[16px] font-medium last:border-b-0'
          >
            <Link
              to={`/${navCategory.slug}`}
              className='whitespace-nowrap'
              onClick={() => {
                onClose()
              }}
            >
              {navCategory.title}
            </Link>
            {navCategory.subs && (
              <div className='w-full cursor-pointer py-[4px]' onClick={() => handleTrigger(navCategory.subs ?? [])}>
                <ChevronRight height='2rem' width='2rem' className='ml-auto' />
              </div>
            )}
          </div>
        ))}
      </div>
      <div
        className={`absolute -right-full bottom-0 top-0 w-full bg-[--color-dark--2] p-[6px_16px_0_16px] transition-[right] duration-300 ease-in-out ${
          openSublist ? 'right-0' : ''
        }`}
      >
        <div
          className='flex cursor-pointer items-center gap-[8px] border-b border-b-[--color-dark--2] py-[8px] text-[16px] last:border-b-0'
          onClick={() => handleTrigger([])}
        >
          <ChevronLeft size={20} className='rounded-full bg-[--color-dark--1] p-1' />
          <span>Back</span>
        </div>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {subCategories.map((subCategory: any) => (
          <Link
            key={subCategory.id}
            to={`/${subCategory.slug}`}
            className='flex items-center justify-between gap-[8px] whitespace-nowrap border-b border-b-[--color-dark--2] py-[8px] text-[16px] last:border-b-0'
            onClick={() => onClose()}
          >
            <span>{subCategory.title}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default MobileNav
