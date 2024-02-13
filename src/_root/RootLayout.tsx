import { Outlet } from 'react-router-dom'
import BaseHeader from '@components/BaseHeader'
import Breadcrumb from '@components/shared/Breadcrumb'

const RootLayout = () => {
  return (
    <>
      <BaseHeader />
      <Breadcrumb />
      <Outlet />
    </>
  )
}

export default RootLayout
