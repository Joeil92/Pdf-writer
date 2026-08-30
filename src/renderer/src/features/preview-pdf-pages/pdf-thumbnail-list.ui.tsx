import type { PdfPageThumbnail } from '@entities/document/document.types'

interface PdfThumbnailListProps {
  thumbnails: PdfPageThumbnail[]
}

export default function PdfThumbnailList({ thumbnails }: PdfThumbnailListProps): React.JSX.Element {
  return (
    <ul className="flex flex-col gap-3">
      {thumbnails.map((thumbnail) => (
        <li key={thumbnail.pageNumber} className="flex flex-col items-center gap-1">
          <img
            src={thumbnail.dataUrl}
            alt={`Page ${thumbnail.pageNumber}`}
            className="w-full rounded-sm border border-stone-200 bg-white shadow-sm"
          />
          <span className="text-xs text-muted-foreground">{thumbnail.pageNumber}</span>
        </li>
      ))}
    </ul>
  )
}
