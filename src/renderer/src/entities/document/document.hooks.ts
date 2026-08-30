import { useEffect, useState } from 'react'
import * as pdfjsLib from 'pdfjs-dist'
import '@renderer/shared/lib/v8-polyfill'
import { PdfPageThumbnail } from './document.types'

const THUMBNAIL_SCALE = 0.3

let pdfWorker: pdfjsLib.PDFWorker | null = null

function getPdfWorker(): pdfjsLib.PDFWorker {
  if (!pdfWorker) {
    const worker = new Worker(new URL('./document.pdf-worker.ts', import.meta.url), {
      type: 'module'
    })
    pdfWorker = pdfjsLib.PDFWorker.create({ port: worker })
  }
  return pdfWorker
}

interface UsePdfThumbnailsResult {
  thumbnails: PdfPageThumbnail[]
  isLoading: boolean
  error: string | null
}

export function usePdfThumbnails(file: File | null): UsePdfThumbnailsResult {
  const [thumbnails, setThumbnails] = useState<PdfPageThumbnail[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!file) {
      setThumbnails([])
      setError(null)
      return
    }

    const pdfFile = file
    let cancelled = false

    async function renderThumbnails(): Promise<void> {
      setIsLoading(true)
      setError(null)

      try {
        const data = await pdfFile.arrayBuffer()
        const pdf = await pdfjsLib.getDocument({ data, worker: getPdfWorker() }).promise
        const pages: PdfPageThumbnail[] = []

        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
          const page = await pdf.getPage(pageNumber)
          const viewport = page.getViewport({ scale: THUMBNAIL_SCALE })
          const canvas = document.createElement('canvas')
          canvas.width = viewport.width
          canvas.height = viewport.height

          await page.render({ canvas, viewport }).promise
          pages.push({ pageNumber, dataUrl: canvas.toDataURL() })
        }

        if (!cancelled) {
          setThumbnails(pages)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Erreur de chargement du PDF')
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    renderThumbnails()

    return () => {
      cancelled = true
    }
  }, [file])

  return { thumbnails, isLoading, error }
}
