import { Button } from '@renderer/shared/ui/button'
import { FileUp } from 'lucide-react'
import { ChangeEvent, useRef } from 'react'
import { useOpenDocumentMutation } from './open-document.mutation'

export default function OpenDocumentButton(): React.JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null)

  function handleFileChange(event: ChangeEvent<HTMLInputElement>): void {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }

    mutate(file)
  }

  const { mutate, isPending } = useOpenDocumentMutation({})

  return (
    <>
      <Button size="lg" onClick={() => inputRef.current?.click()} disabled={isPending}>
        <FileUp />
        Ouvrir un document
      </Button>

      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={handleFileChange}
      />
    </>
  )
}
