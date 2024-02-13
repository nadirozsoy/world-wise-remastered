import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useDispatch } from 'react-redux'
// import { setCities, getCities, getCitiesStatus } from '@/features/city/citySlice'
import { setCities } from '@/services/apiCity'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { UnknownAction } from '@reduxjs/toolkit'
import { Button } from '@/components/ui'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createCity } from '@/services/apiCity'
import { toast } from 'sonner'

// IMPORTANT! This page uses redux and tanstack query, it is not related to the main project, it is just a usage example.

type FormValues = {
  cityName: string
  age: number
  questions: {
    questionContent: string
    answers: {
      content: string
    }[]
    correctAnswer: {
      content: string
    }
  }[]
}

const schema = z.object({
  cityName: z.string().min(1, { message: 'Required' }),
  age: z.number().min(10),
  questions: z.array(
    z.object({
      questionContent: z.string(),
      answers: z.array(
        z.object({
          content: z.string().min(1, { message: 'Required' })
        })
      ),
      correctAnswer: z.object({
        content: z.string()
      })
    })
  )
})

const Product = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      questions: [
        {
          questionContent: '',
          answers: [{ content: '' }],
          correctAnswer: { content: '' }
        }
      ]
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions'
  })

  // const dispatch = useDispatch()
  // const cities = useSelector(getCities)
  // const citiesStatus = useSelector(getCitiesStatus)

  // const createCityForm = data => {
  //   dispatch(createCity(data) as unknown as UnknownAction)
  //   reset()
  // }

  const queryClient = useQueryClient()

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: createCity,
    onSuccess: () => {
      toast.success('City created successfully')
      queryClient.invalidateQueries({ queryKey: ['cities'] })
      reset()
    },
    onError: () => {
      toast.error('Something went wrong')
    }
  })

  // useEffect(() => {
  //   dispatch(setCities() as unknown as UnknownAction)
  // }, [dispatch])

  const { data: cities } = useQuery({
    queryKey: ['cities'],
    queryFn: setCities
  })

  return (
    <>
      {/* {citiesStatus === 'loading' && <div>Loading...</div>}
      {citiesStatus === 'error' && <div>Failed to load</div>}
      {citiesStatus === 'idle' && (
        <ul className='text-sm text-black'>
          {cities.map(city => (
            <li key={city.id}>{city.cityName}</li>
          ))}
        </ul>
      )} */}
      <section className='min-h-[calc(100vh-14.6rem)] bg-[--color-dark--1] pt-20'>
        <div className='containerLarge grid grid-cols-2 gap-[3rem] sm:gap-[6rem]'>
          <img src='/assets/images/img-1.jpg' alt='person with dog overlooking mountain with sunset' />
          <div className='flex flex-col gap-5'>
            <h2 className='text-[4rem] leading-[1.2]'>About WorldWide.</h2>
            <p className='text-sm'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo est dicta illum vero culpa cum quaerat
              architecto sapiente eius non soluta, molestiae nihil laborum, placeat debitis, laboriosam at fuga
              perspiciatis?
            </p>
            <p className='text-sm'>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis doloribus libero sunt expedita ratione
              iusto, magni, id sapiente sequi officiis et.
            </p>
          </div>
        </div>
      </section>
      <div className='min-h-dvh bg-slate-600'>
        <form onSubmit={handleSubmit(d => mutate(d))} className='mx-auto max-w-sm'>
          {fields.map((question, questionIndex) => (
            <div key={question.id}>
              <label>Question Content</label>
              <input
                {...register(`questions.${questionIndex}.questionContent`)}
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
              />

              {question.answers.map((answer, answerIndex) => (
                <div key={answerIndex}>
                  <label>Answer Content</label>
                  <input
                    {...register(`questions.${questionIndex}.answers.${answerIndex}.content`)}
                    className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                  />
                  {errors.questions?.[questionIndex]?.answers?.[answerIndex]?.content?.message && (
                    <p>{String(errors.questions?.[questionIndex]?.answers?.[answerIndex]?.content?.message)}</p>
                  )}
                </div>
              ))}

              <label>Correct Answer Content</label>
              <input
                {...register(`questions.${questionIndex}.correctAnswer.content`)}
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
              />

              <Button type='button' onClick={() => remove(questionIndex)}>
                Remove Question
              </Button>
              <Button
                type='button'
                onClick={() =>
                  append({ questionContent: '', answers: [{ content: '' }], correctAnswer: { content: '' } })
                }
              >
                Add Question
              </Button>
            </div>
          ))}
          <div className='mb-5'>
            <label htmlFor='cityName' className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'>
              Your city
            </label>
            <input
              {...register('cityName')}
              type='text'
              id='cityName'
              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
              placeholder='name@flowbite.com'
            />
            {errors.cityName?.message && <p>{String(errors.cityName?.message)}</p>}
          </div>
          <div className='mb-5'>
            <label htmlFor='age' className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'>
              Your age
            </label>
            <input
              {...register('age', { valueAsNumber: true })}
              type='number'
              id='age'
              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
            />
            {errors.age?.message && <p>{String(errors.age?.message)}</p>}
          </div>
          <div className='mb-5 flex items-start'>
            <div className='flex h-5 items-center'>
              <input
                id='remember'
                type='checkbox'
                value=''
                className='focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800'
              />
            </div>
            <label htmlFor='remember' className='ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
              Remember me
            </label>
          </div>
          <button
            type='submit'
            className='w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto'
          >
            Submit
          </button>
        </form>
      </div>
    </>
  )
}

export default Product
