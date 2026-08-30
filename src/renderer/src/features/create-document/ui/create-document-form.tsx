import { useForm } from 'react-hook-form'
import type { Document } from '@entities/document'

type CreateDocumentFormValues = Pick<Document, 'title'>

interface CreateDocumentFormProps {
  onSubmit: (values: CreateDocumentFormValues) => void
}

export function CreateDocumentForm({ onSubmit }: CreateDocumentFormProps): React.JSX.Element {
  const { register, handleSubmit } = useForm<CreateDocumentFormValues>({
    defaultValues: { title: '' }
  })

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 rounded-lg bg-slate-900 p-8 shadow-lg"
    >
      <h1 className="text-2xl font-semibold">PDF Writer</h1>
      <input
        {...register('title')}
        placeholder="Titre du document"
        className="rounded border border-slate-700 bg-slate-800 px-3 py-2 outline-none focus:border-slate-500"
      />
      <button
        type="submit"
        className="rounded bg-indigo-600 px-4 py-2 font-medium hover:bg-indigo-500"
      >
        Créer
      </button>
    </form>
  )
}
