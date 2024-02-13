import { Navigate, Route, Routes } from 'react-router-dom'
import RootLayout from '@/_root/RootLayout'
import SigninForm from '@/_auth/forms/SigninForm'
import { Toaster } from 'sonner'
import ProtectedRoute from '@components/ProtectedRoute'
import { Suspense, lazy } from 'react'
import { City, CityList, Countries, Form } from '@/_app/pages'
import Loader from './components/shared/Loader'
import NotFound from './_root/NotFound'
import { Upload } from '@/_root/pages'
// import { Homepage, Pricing, Product } from '@/_root/pages'
// import NotFound from '@/_root/NotFound'
// import AppLayout from '@/_app/AppLayout'
// import AuthLayout from '@/_auth/AuthLayout'

const Homepage = lazy(() => import('./_root/pages/Homepage'))
const AppLayout = lazy(() => import('./_app/AppLayout'))
const AuthLayout = lazy(() => import('./_auth/AuthLayout'))
const Product = lazy(() => import('./_root/pages/Product'))
const Pricing = lazy(() => import('./_root/pages/Pricing'))

const App = () => {
  return (
    <>
      <main>
        <Routes>
          <Route
            element={
              <Suspense fallback={<Loader />}>
                <AuthLayout />
              </Suspense>
            }
          >
            <Route path='/sign-in' element={<SigninForm />} />
          </Route>

          <Route
            element={
              <Suspense fallback={<Loader />}>
                <RootLayout />
              </Suspense>
            }
          >
            <Route index element={<Homepage />} />
            <Route path='/product' element={<Product />} />
            <Route path='/pricing' element={<Pricing />} />
            <Route path='/upload' element={<Upload />} />
          </Route>
          <Route
            path='app'
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate replace to='cities' />} />
            <Route path='cities' element={<CityList />} />
            <Route path='cities/:cityId' element={<City />} />
            <Route path='countries' element={<Countries />} />
            <Route path='form' element={<Form />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
      <Toaster position='top-center' i18nIsDynamicList style={{ fontSize: '2rem !important', color: 'red' }} />
    </>
  )
}

export default App
