import { CreateDocumentForm } from '@features/create-document'

export function HomePage(): React.JSX.Element {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-100">
      <CreateDocumentForm onSubmit={(values) => console.log(values)} />
    </main>
  )
}
