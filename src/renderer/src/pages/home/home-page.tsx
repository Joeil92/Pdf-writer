import Sidebar from '@renderer/widgets/sidebar/sidebar.ui'
import Viewer from '@renderer/widgets/viewer/viewer.ui'

export function HomePage(): React.JSX.Element {
  return (
    <main className="flex h-screen">
      <Sidebar />

      <Viewer />
    </main>
  )
}
