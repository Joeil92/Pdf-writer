import { usePdfPage } from '@renderer/entities/document/document.hooks'
import { documentQueryOptions } from '@renderer/entities/document/document.api'
import OpenDocumentButton from '@renderer/features/document/open-document/open-document.ui'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Suspense } from 'react'
import ViewerSkeleton from './viewer.skeleton'
import CloseDocumentButton from '@renderer/features/document/close-document/close-document.ui'

export default function Viewer(): React.JSX.Element {
  return (
    <Suspense fallback={<ViewerSkeleton />}>
      <BaseViewer />
    </Suspense>
  )
}

function BaseViewer(): React.JSX.Element {
  const { data: document } = useSuspenseQuery(documentQueryOptions)
  const { dataUrl, pageCount, isLoading, error } = usePdfPage(
    document?.file ?? null,
    document?.activePage ?? 1
  )

  if (!document) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <OpenDocumentButton />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-destructive">{error}</p>
      </div>
    )
  }

  if (isLoading || !dataUrl) {
    return <ViewerSkeleton />
  }

  return (
    <div className="relative flex flex-1 items-center justify-center p-8">
      <img
        src={dataUrl}
        alt={`Page ${document.activePage}`}
        className="max-h-[85vh] max-w-full rounded-lg shadow-lg"
      />

      {pageCount && <ViewerToolbar />}
    </div>
  )
}

function ViewerToolbar(): React.JSX.Element {
  return (
    <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center rounded-full border border-stone-200 bg-white px-2 py-1.5 shadow-lg gap-2">
      <CloseDocumentButton />
    </div>
  )
}
