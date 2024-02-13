import Button from '@/components/shared/Button'
import { useNavigate } from 'react-router-dom'

const Homepage = () => {
  const navigate = useNavigate()

  // const queryClient = useQueryClient()

  // const cities = queryClient.getQueryData(['cities'])
  // console.log(cities)

  return (
    <section className='homepage-bg h-[calc(100vh-14.6rem)] bg-cover bg-center pt-12'>
      {/* {Array.isArray(cities) && cities.map((city: any) => <div key={city.id}>{city.cityName}</div>)} */}

      <div className='containerLarge flex-center h-full flex-col gap-[2.5rem] text-center md:h-[80%]'>
        <h1 className='text-[4.5rem] font-semibold leading-[1.3] text-white'>
          You travel the world.
          <br />
          WorldWise keeps track of your adventures.
        </h1>
        <h2 className='w-[90%] text-[2rem] text-[--color-light--1]'>
          A world map that tracks your footsteps into every city you can think of. Never forget your wonderful
          experiences, and show your friends how you have wandered the world.
        </h2>
        <Button onClick={() => navigate('/product')}>Start tracking now</Button>
      </div>
    </section>
  )
}

export default Homepage
