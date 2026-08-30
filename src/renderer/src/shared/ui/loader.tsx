import { Loader2 } from 'lucide-react'
import type { ComponentProps } from 'react'
import { cn } from '@shared/lib/cn'

function Loader({ className, ...props }: ComponentProps<typeof Loader2>): React.JSX.Element {
  return <Loader2 data-slot="loader" className={cn('animate-spin', className)} {...props} />
}

export { Loader }
