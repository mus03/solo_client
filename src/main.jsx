import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import ReactDOM from 'react-dom';
import { router } from './routes/Routes'
import { RouterProvider } from 'react-router-dom'
import AuthProvider from './provider/AuthProvider'
import { Toaster } from 'react-hot-toast'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      
        <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}>

        </RouterProvider>
        <ReactQueryDevtools initialIsOpen={false} ></ReactQueryDevtools>
        </QueryClientProvider>
      
      <Toaster></Toaster>
    </AuthProvider>/
  </StrictMode>,
)
