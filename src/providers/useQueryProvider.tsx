'use client'

import { PropsWithChildren, useState } from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient()

export function QueryProvider({ children }: PropsWithChildren) {
  const [client] = useState(queryClient)

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
