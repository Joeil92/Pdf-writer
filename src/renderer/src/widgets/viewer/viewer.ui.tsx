import { documentQueryOptions } from '@renderer/entities/document/document.api'
import OpenDocumentButton from '@renderer/features/open-document/open-document.ui'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Suspense } from 'react'
import ViewerSkeleton from './viewer.skeleton'

export default function Viewer(): React.JSX.Element {
  return (
    <Suspense fallback={<ViewerSkeleton />}>
      <BaseViewer />
    </Suspense>
  )
}

function BaseViewer(): React.JSX.Element {
  const { data: document } = useSuspenseQuery(documentQueryOptions)

  return (
    <div className="flex flex-1 items-center justify-center">
      {!document && <OpenDocumentButton />}
    </div>
  )
}
