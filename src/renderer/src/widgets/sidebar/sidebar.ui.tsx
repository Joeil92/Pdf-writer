import { usePdfThumbnails } from '@entities/document/document.hooks'
import { documentQueryOptions } from '@renderer/entities/document/document.api'
import { setActiveDocumentPage } from '@renderer/entities/document/document.lib'
import PdfThumbnailList from '@renderer/features/document/preview-pdf-pages/pdf-thumbnail-list.ui'
import { Loader } from '@renderer/shared/ui/loader'
import { useQuery } from '@tanstack/react-query'

export default function Sidebar(): React.JSX.Element {
  const { data: document } = useQuery(documentQueryOptions)

  const { thumbnails, isLoading, error } = usePdfThumbnails(document?.file ?? null)

  const hasPdfLoaded = !isLoading && !error && thumbnails.length > 0

  return (
    <aside className="flex h-full w-56 shrink-0 flex-col border-r border-stone-200 bg-stone-50">
      <div className="flex items-center justify-between gap-2 border-b border-stone-200 p-3">
        <span className="text-sm font-medium text-foreground">PDF Writer</span>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        {isLoading && (
          <div className="flex justify-center">
            <Loader className="text-muted-foreground" />
          </div>
        )}

        {error && <p className="text-center text-sm text-destructive">{error}</p>}

        {hasPdfLoaded && (
          <PdfThumbnailList
            thumbnails={thumbnails}
            activePage={document?.activePage ?? 1}
            onSelectPage={setActiveDocumentPage}
          />
        )}
      </div>
    </aside>
  )
}
