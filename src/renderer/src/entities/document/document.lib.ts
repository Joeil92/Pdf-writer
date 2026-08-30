import { queryClient } from '@renderer/shared/query-client'
import { DOCUMENT_QUERY_KEY } from './document.api'
import type { Document } from './document.types'

export function addDocumentToQueryClient(document: Document): void {
  queryClient.setQueryData<Document>([DOCUMENT_QUERY_KEY.root], document)
}

export function setActiveDocumentPage(pageNumber: number): void {
  const document = queryClient.getQueryData<Document>([DOCUMENT_QUERY_KEY.root])
  if (!document) {
    return
  }

  addDocumentToQueryClient({ ...document, activePage: pageNumber })
}
