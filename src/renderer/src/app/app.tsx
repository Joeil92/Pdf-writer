import { HomePage } from '@pages/home'
import { queryClient } from '@renderer/shared/query-client'
import { QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'

export function App(): React.JSX.Element {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <HomePage />
      </QueryClientProvider>
    </StrictMode>
  )
}
