import { useTranslation } from 'react-i18next'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useState } from 'react'
import { Languages } from 'lucide-react'

const LanguageSwitch = () => {
  const { i18n } = useTranslation()

  const lngs: Record<string, { nativeName: string }> = {
    en: { nativeName: 'English' },
    tr: { nativeName: 'Türkçe' }
  }
  const [position, setPosition] = useState('bottom')

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className='aspect-square'>
          <div className='flex h-full cursor-pointer rounded-lg bg-dark--1 p-3'>
            <Languages className='size-8' color='var(--color-brand--2)' />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56'>
          <DropdownMenuLabel>Languages</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            {Object.keys(lngs).map(lng => (
              <DropdownMenuRadioItem
                key={lng}
                value={lng}
                onClick={() => i18n.changeLanguage(lng)}
                disabled={i18n.resolvedLanguage === lng}
                className='cursor-pointer rounded-lg'
              >
                {lngs[lng].nativeName}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default LanguageSwitch
