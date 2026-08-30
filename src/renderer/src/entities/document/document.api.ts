import { queryClient } from '@renderer/shared/query-client'
import { queryOptions } from '@tanstack/react-query'
import type { Document } from './document.types'

export const DOCUMENT_QUERY_KEY = {
  root: 'document'
}

export const documentQueryOptions = queryOptions({
  queryKey: [DOCUMENT_QUERY_KEY.root],

  queryFn: async () => {
    return null
  },

  initialData: queryClient.getQueryData<Document>([DOCUMENT_QUERY_KEY.root]),

  initialDataUpdatedAt: queryClient.getQueryState<Document>([DOCUMENT_QUERY_KEY.root])
    ?.dataUpdatedAt
})
