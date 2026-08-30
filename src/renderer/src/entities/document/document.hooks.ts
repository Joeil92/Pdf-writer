import { useEffect, useState } from 'react'
import * as pdfjsLib from 'pdfjs-dist'
import '@renderer/shared/lib/v8-polyfill'
import { PdfPageThumbnail } from './document.types'

const THUMBNAIL_SCALE = 0.3
const PAGE_SCALE = 1.5

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

async function loadPdfDocument(file: File): Promise<pdfjsLib.PDFDocumentProxy> {
  const data = await file.arrayBuffer()
  return pdfjsLib.getDocument({ data, worker: getPdfWorker() }).promise
}

async function renderPageToDataUrl(
  pdf: pdfjsLib.PDFDocumentProxy,
  pageNumber: number,
  scale: number
): Promise<string> {
  const page = await pdf.getPage(pageNumber)
  const viewport = page.getViewport({ scale })
  const canvas = document.createElement('canvas')
  canvas.width = viewport.width
  canvas.height = viewport.height

  await page.render({ canvas, viewport }).promise
  return canvas.toDataURL()
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
        const pdf = await loadPdfDocument(pdfFile)
        const pages: PdfPageThumbnail[] = []

        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
          const dataUrl = await renderPageToDataUrl(pdf, pageNumber, THUMBNAIL_SCALE)
          pages.push({ pageNumber, dataUrl })
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

interface UsePdfPageResult {
  dataUrl: string | null
  pageCount: number | null
  isLoading: boolean
  error: string | null
}

export function usePdfPage(file: File | null, pageNumber: number): UsePdfPageResult {
  const [dataUrl, setDataUrl] = useState<string | null>(null)
  const [pageCount, setPageCount] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!file) {
      setDataUrl(null)
      setPageCount(null)
      setError(null)
      return
    }

    const pdfFile = file
    let cancelled = false

    async function renderPage(): Promise<void> {
      setIsLoading(true)
      setError(null)

      try {
        const pdf = await loadPdfDocument(pdfFile)
        const pageDataUrl = await renderPageToDataUrl(pdf, pageNumber, PAGE_SCALE)

        if (!cancelled) {
          setDataUrl(pageDataUrl)
          setPageCount(pdf.numPages)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Erreur de chargement de la page')
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    renderPage()

    return () => {
      cancelled = true
    }
  }, [file, pageNumber])

  return { dataUrl, pageCount, isLoading, error }
}
