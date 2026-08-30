import { queryClient } from '@renderer/shared/query-client'
import { DOCUMENT_QUERY_KEY } from './document.api'
import type { Document } from './document.types'

export function addDocumentToQueryClient(document: Document): void {
  queryClient.setQueryData<Document>([DOCUMENT_QUERY_KEY.root], document)
}
