"use client"
import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'



function ReactQueryProvider({children}: {children: React.ReactNode}) {
  return (
    <QueryClientProvider client={new QueryClient()}>
      {children}
    </QueryClientProvider>
  )
}

export default ReactQueryProvider