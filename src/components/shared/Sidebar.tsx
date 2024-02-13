import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import type { ISidebarProps } from '@/types'

const Sidebar = ({ visible, placement = 'right', onUpdateVisible, children }: ISidebarProps) => {
  const sidebarRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        onUpdateVisible(false)
      }
    }

    if (visible) {
      document.body.style.overflow = 'hidden'
      document.addEventListener('mousedown', handleOutsideClick)
    } else {
      document.body.style.overflow = 'auto'
      document.removeEventListener('mousedown', handleOutsideClick)
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [visible, onUpdateVisible])

  const handleClose = () => {
    onUpdateVisible(false)
  }

  const sidebarClasses = `sidebar ${visible ? 'visible' : ''} ${placement === 'top' ? 'sidebar-top' : ''}`

  return createPortal(
    <aside ref={sidebarRef} className={sidebarClasses}>
      <div className='sidebar-mask' onClick={handleClose} />
      <div className={`sidebar-content scrollbar flex flex-col overflow-y-auto sidebar-content-${placement}`}>
        {children}
      </div>
    </aside>,
    document.body
  )
}

export default Sidebar
