import { removeDocumentFromQueryClient } from '@renderer/entities/document/document.lib'
import { X } from 'lucide-react'

export default function CloseDocumentButton(): React.JSX.Element {
  return <BaseCloseDocumentButton />
}

function BaseCloseDocumentButton(): React.JSX.Element {
  return (
    <button
      className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-red-200 p-2 text-white shadow-lg transition-colors"
      onClick={() => removeDocumentFromQueryClient()}
    >
      <X className="h-4 w-4 text-red-500" />
    </button>
  )
}
