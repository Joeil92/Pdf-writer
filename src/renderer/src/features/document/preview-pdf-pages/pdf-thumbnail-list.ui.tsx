import type { PdfPageThumbnail } from '@entities/document/document.types'
import { cn } from '@shared/lib/cn'

interface PdfThumbnailListProps {
  thumbnails: PdfPageThumbnail[]
  activePage: number
  onSelectPage: (pageNumber: number) => void
}

export default function PdfThumbnailList({
  thumbnails,
  activePage,
  onSelectPage
}: PdfThumbnailListProps): React.JSX.Element {
  return (
    <ul className="flex flex-col gap-3">
      {thumbnails.map((thumbnail) => (
        <li key={thumbnail.pageNumber} className="flex flex-col items-center gap-1">
          <button
            type="button"
            className="w-full"
            onClick={() => onSelectPage(thumbnail.pageNumber)}
          >
            <img
              src={thumbnail.dataUrl}
              alt={`Page ${thumbnail.pageNumber}`}
              className={cn(
                'w-full rounded-sm border-2 bg-white shadow-sm',
                thumbnail.pageNumber === activePage ? 'border-primary' : 'border-stone-200'
              )}
            />
          </button>
          <span className="text-xs text-muted-foreground">{thumbnail.pageNumber}</span>
        </li>
      ))}
    </ul>
  )
}
