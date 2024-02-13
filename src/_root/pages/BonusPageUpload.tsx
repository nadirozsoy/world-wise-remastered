import { useState } from 'react'
import { ICustomFile } from '@/types'
import FileList from '@/components/shared/FileList'
import FileUploader from '@/components/shared/FileUploader'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export default function BonusPageUpload() {
  const [files, setFiles] = useState<ICustomFile[]>([])

  const removeFile = (filename: string) => {
    setFiles(files.filter(file => file.name !== filename))
  }

  const downloadFile = (filename: string) => {
    const file = files.find(file => file.name === filename)
    if (!file) return
    const blob = new Blob([file], { type: file.type || 'application/octet-stream' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = file.name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section className='bg-[--color-dark--1] py-12'>
      <div className='containerSmall grid min-h-[calc(100dvh-20.6rem)] place-items-center xl:grid-cols-2'>
        <div className='mx-auto grid gap-4 px-4 sm:w-[60rem]'>
          <div className='mb-12 text-center'>
            <h2 className='text-[4rem]'>Welcome to bonus page</h2>
            <p className='text-[1.8rem]'>You can upload any type of file all you need is a cdn server.</p>
          </div>
          <FileUploader files={files} setFiles={setFiles} removeFile={removeFile} />
          <FileList files={files} removeFile={removeFile} downloadFile={downloadFile} />
        </div>
        <div className='mt-4'>
          <Accordion type='single' collapsible>
            <AccordionItem value='item-1'>
              <AccordionTrigger>
                If you send a post request to the cdn server, it will show the file in the response like this
              </AccordionTrigger>
              <AccordionContent>
                <img src='/assets/images/FilesUpload.png' alt='' />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  )
}
