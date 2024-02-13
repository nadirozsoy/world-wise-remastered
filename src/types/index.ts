export type INavCategory = {
  id: number
  title: string
  slug: string
  subs?: INavCategory[]
}

export type ISidebarProps = {
  visible: boolean
  placement?: string
  children?: React.ReactNode
  onUpdateVisible: (visible: boolean) => void
}

export type IButtonProps = {
  className?: string
  onClick?: () => void
  children?: React.ReactNode
  type?: string
}

export type IMobileNavProps = {
  onClose: () => void
}

export type IAppLinks = {
  name: string
  path: string
}

export interface ICustomFile extends File {
  url: string
  isUploading?: boolean
}

export interface IFileUploadProps {
  files: ICustomFile[]
  setFiles: React.Dispatch<React.SetStateAction<ICustomFile[]>>
  removeFile: (fileName: string) => void
}

export interface IFileListProps {
  files: ICustomFile[]
  removeFile: (fileName: string) => void
  downloadFile: (fileName: string) => void
}

export interface IFileItemProps {
  file: ICustomFile
  deleteFile: (fileName: string) => void
  handleDownload: (fileName: string) => void
}

export type ITypeCities = {
  id: number
  cityName: string
  country: string
  emoji: string
  date: string
  notes: string
  position: {
    lat: number
    lng: number
  }
}

export type ITypeUser = {
  name: string
  email: string
  password: string
  avatar: string
}
