import { queryClient } from '@renderer/shared/query-client'
import { documentQueryOptions } from './document.api'
import type { Document } from './document.types'

export function addDocumentToQueryClient(document: Document): void {
  queryClient.setQueryData(documentQueryOptions.queryKey, document)
}

export function removeDocumentFromQueryClient(): void {
  queryClient.setQueryData(documentQueryOptions.queryKey, null)
}

export function setActiveDocumentPage(pageNumber: number): void {
  const document = queryClient.getQueryData(documentQueryOptions.queryKey)
  if (!document) {
    return
  }

  addDocumentToQueryClient({ ...document, activePage: pageNumber })
}
