import { ITypeUser } from '@/types'
import { createContext, useContext, useReducer } from 'react'
import { toast } from 'sonner'

const INITIAL_STATE = {
  user: {
    name: '',
    email: '',
    password: '',
    avatar: ''
  },
  isAuthenticated: false,
  login: () => {},
  logout: () => {}
}

type IAuthContextType = {
  user: ITypeUser | null
  isAuthenticated: boolean
  login: (email: string, password: string) => void
  logout: () => void
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function reducer(state: IAuthContextType, action: any) {
  switch (action.type) {
    case 'login':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true
      }
    case 'logout':
      return {
        ...state,
        user: null,
        isAuthenticated: false
      }

    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

const FAKE_USER = {
  name: 'Jack',
  email: 'jack@example.com',
  password: 'qwerty',
  avatar: 'https://i.pravatar.cc/100?u=zz'
}

const AuthContext = createContext<IAuthContextType>(INITIAL_STATE)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const storedUser = localStorage.getItem('authUser')

  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    storedUser ? { ...INITIAL_STATE, user: JSON.parse(storedUser), isAuthenticated: true } : INITIAL_STATE
  )

  function login(email: string, password: string) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      const user = { ...FAKE_USER }
      dispatch({ type: 'login', payload: user })
      localStorage.setItem('authUser', JSON.stringify(user))
    } else {
      toast.error('Email or password is incorrect')
    }
  }

  function logout() {
    dispatch({ type: 'logout' })
    localStorage.removeItem('authUser')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
