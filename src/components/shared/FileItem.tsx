import React from 'react'
import { Download, File, Loader2, Trash } from 'lucide-react'
import { IFileItemProps } from '@/types'

const FileItem: React.FC<IFileItemProps> = ({ file, deleteFile, handleDownload }) => {
  return (
    <li className='my-5 flex items-center rounded-lg bg-secondary/20 p-[1rem]' key={file.name}>
      <File size={24} className='mr-3 text-secondary' />
      <p className='flex-1 text-sm'>{file.name}</p>
      <div className='cursor-pointer justify-end'>
        {file.isUploading && <Loader2 className='animate-spin' size={24} onClick={() => deleteFile(file.name)} />}
        {!file.isUploading && (
          <div className='flex items-center gap-2 *:rounded-lg *:p-1 *:transition-all'>
            <div className='hover:bg-secondary/30' onClick={() => deleteFile(file.name)}>
              <Trash className='text-secondary' />
            </div>
            <div className='hover:bg-secondary/30' onClick={() => handleDownload(file.name)}>
              <Download className='text-secondary' />
            </div>
          </div>
        )}
      </div>
    </li>
  )
}

export default FileItem
