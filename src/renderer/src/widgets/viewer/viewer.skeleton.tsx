import { Skeleton } from '@renderer/shared/ui/skeleton'

export default function ViewerSkeleton(): React.JSX.Element {
  return (
    <div className="flex flex-1 items-center justify-center p-8">
      <Skeleton className="aspect-210/297 h-[85vh] rounded-lg" />
    </div>
  )
}
