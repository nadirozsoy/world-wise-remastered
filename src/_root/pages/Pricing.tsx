import { setCities } from '@/services/apiCity'
import { useQuery } from '@tanstack/react-query'

export default function Product() {
  // const {
  //   isLoading,
  //   error,
  //   data: cities
  // } = useQuery({
  //   queryKey: ['cities'],
  //   queryFn: setCities
  // })

  return (
    <section className='grid min-h-[calc(100dvh-14.6rem)] place-items-center bg-[--color-dark--1] pt-12'>
      {/* {cities?.map(city => (
        <div key={city.id}>
          <h1>{city.cityName}</h1>
        </div>
      ))} */}
      <div className='containerSmall grid grid-cols-2 gap-20'>
        <div className='flex flex-col gap-5'>
          <h2 className='text-[5rem] leading-[1.2]'>
            Simple pricing.
            <br />
            Just $9/month.
          </h2>
          <p className='mt-8 text-[2.4rem]'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae vel labore mollitia iusto. Recusandae quos
            provident, laboriosam fugit voluptatem iste.
          </p>
        </div>
        <img src='assets/images/img-2.jpg' alt='overview of a large city with skyscrapers' />
      </div>
    </section>
  )
}
