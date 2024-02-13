import React from 'react'
import FileItem from './FileItem'
import { IFileListProps } from '@/types'
import { useAutoAnimate } from '@formkit/auto-animate/react'

const FileList: React.FC<IFileListProps> = ({ files, removeFile, downloadFile }) => {
  const uniqueFileNames = new Set<string>()
  const [parent] = useAutoAnimate()

  return (
    <ul ref={parent}>
      {files &&
        files.map(f => {
          if (!uniqueFileNames.has(f.name)) {
            uniqueFileNames.add(f.name)
            return <FileItem key={f.name} file={f} deleteFile={removeFile} handleDownload={downloadFile} />
          } else {
            return null
          }
        })}
    </ul>
  )
}

export default FileList
