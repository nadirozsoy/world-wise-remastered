import { useNavigate } from 'react-router-dom'
import Button from './Button'

const BackButton = () => {
  const navigate = useNavigate()

  return (
    <>
      <Button className='bg-light--1 px-6' onClick={() => navigate(-1)}>
        &larr; Back
      </Button>
    </>
  )
}

export default BackButton
