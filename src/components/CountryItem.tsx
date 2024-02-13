import { Link } from 'react-router-dom'

const CountryItem = ({ country }: { country: { country: string; emoji: string; id: string } }) => {
  const { country: countryName, emoji } = country

  return (
    <li className='rounded-xl border-l-4 border-secondary bg-dark--2'>
      <Link to={'#'} className='flex items-center justify-between px-6 py-4'>
        <div className='flex items-center gap-4'>
          <span className='rounded-xl bg-dark--1 px-4'>{emoji}</span>
          <h3>{countryName}</h3>
        </div>
      </Link>
    </li>
  )
}

export default CountryItem
