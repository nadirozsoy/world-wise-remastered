import { useAuth } from '@/context/AuthContext'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) navigate('/sign-in', { replace: true })
  }, [isAuthenticated, navigate])

  return isAuthenticated ? children : null
}

export default ProtectedRoute
