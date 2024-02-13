import React, { useCallback, useState } from 'react'
import { Loader2, Upload } from 'lucide-react'
import axios from 'axios'
import { ICustomFile, IFileUploadProps } from '@/types'
import { toast } from 'sonner'

const FileUpload: React.FC<IFileUploadProps> = ({ files, setFiles, removeFile }) => {
  const [isDraggingOver, setIsDraggingOver] = useState(false)
  const [uploadingFile, setUploadingFile] = useState<ICustomFile | null>(null)

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDraggingOver(true)
  }, [])

  const handleDragLeave = useCallback(() => {
    setIsDraggingOver(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()

      const droppedFiles = Array.from(e.dataTransfer.files) as ICustomFile[]
      droppedFiles.forEach(async file => {
        if (!file || files.some(existingFile => existingFile.name === file.name)) {
          toast.error('File already exists')
          setIsDraggingOver(false)
          return
        }
        file.isUploading = true

        const formData = new FormData()
        formData.append('files', file)

        await axios
          .post('https://cdn', formData)
          .then(() => {
            file.isUploading = false
            setIsDraggingOver(false)
            if (!files.some(existingFile => existingFile.name === file.name)) {
              setFiles([...files, file])
            }
            toast.success('File uploaded successfully')
            setUploadingFile(null)
          })
          .catch(err => {
            console.error(err)
            removeFile(file.name)
            setUploadingFile(null)
            setIsDraggingOver(false)
          })
      })
    },
    [setFiles, removeFile]
  )

  const uploadHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] as ICustomFile
    if (!file || files.some(existingFile => existingFile.name === file.name)) {
      toast.error('File already exists')
      return
    }
    file.isUploading = true

    setUploadingFile(file)

    const formData = new FormData()
    formData.append('files', file)

    await axios
      .post('https://cdn', formData)
      .then(() => {
        file.isUploading = false
        setIsDraggingOver(false)
        if (!files.some(existingFile => existingFile.name === file.name)) {
          setFiles([...files, file])
        }
        toast.success('File uploaded successfully')
        setUploadingFile(null)
      })
      .catch(err => {
        console.error(err)
        removeFile(file.name)
        setUploadingFile(null)
        setIsDraggingOver(false)
      })
  }

  return (
    <div
      className={`file-card flex-center min-h-[27rem] flex-col rounded-lg border-[3px] border-dashed border-slate-200  p-4 transition-all duration-300 ${isDraggingOver ? 'bg-slate-500' : 'bg-slate-800'}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {uploadingFile ? (
        <Loader2 size={32} className='animate-spin' />
      ) : (
        <>
          <div className='relative mb-6'>
            <input
              type='file'
              onChange={uploadHandler}
              className='relative z-[2] h-[4.5rem] max-w-[20rem] cursor-pointer text-right opacity-0'
            />
            <button className='flex-center absolute inset-0 z-[1] gap-2 rounded-lg bg-secondary/50 text-sm'>
              <Upload size={24} />
              Upload
            </button>
          </div>

          <p className='text-sm'>Supported files</p>
          <p className='mt-2 text-sm'>PDF, JPG, PNG, MP4... all of them</p>
        </>
      )}
    </div>
  )
}

export default FileUpload
