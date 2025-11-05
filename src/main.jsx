import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router/dom";
import { router } from './router/router';
import AOS from 'aos';
import 'aos/dist/aos.css';
import AuthProvider from './context/AuthProvider';
import { Toaster } from 'react-hot-toast';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
AOS.init();
const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='font-urbanist'>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Toaster position="top-center" />
          <RouterProvider router={router} />,
        </AuthProvider>
      </QueryClientProvider>
    </div>
  </StrictMode>,
)
