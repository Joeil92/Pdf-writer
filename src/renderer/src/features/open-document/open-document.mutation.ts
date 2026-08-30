import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import type { Document } from '@entities/document/document.types'
import { addDocumentToQueryClient } from '@renderer/entities/document/document.lib'

export function useOpenDocumentMutation(
  options: Pick<
    UseMutationOptions<Document, unknown, File, unknown>,
    'mutationKey' | 'onMutate' | 'onSuccess' | 'onError' | 'onSettled'
  > = {}
) {
  const { mutationKey = [], onMutate, onSuccess, onError, onSettled } = options

  return useMutation({
    mutationKey: ['open-document', 'create', ...mutationKey],

    mutationFn: async (file: File): Promise<Document> => ({
      id: crypto.randomUUID(),
      title: file.name,
      file,
      activePage: 1
    }),

    onMutate,

    onSuccess: async (data, variables, result, context) => {
      addDocumentToQueryClient(data)

      await onSuccess?.(data, variables, result, context)
    },

    onError,

    onSettled
  })
}
