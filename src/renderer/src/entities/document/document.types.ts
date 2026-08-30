export interface PdfPageThumbnail {
  pageNumber: number
  dataUrl: string
}

export interface Document {
  id: string
  title: string
  file: File
  activePage: number
}
