import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'react-datepicker/dist/react-datepicker.css'
import './assets/scss/main.scss'
import { BrowserRouter } from 'react-router-dom'
import './i18n.ts'
import Loading from './components/shared/Loading.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import { CitiesProvider } from './context/CitiesContext.tsx'
import { ThemeProvider } from './components/theme-provider.tsx'
import { SearchProvider } from './context/SearchBarContext.tsx'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import store from './store.ts'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000
      staleTime: 0
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <SearchProvider>
        <BrowserRouter>
          <Provider store={store}>
            <AuthProvider>
              <CitiesProvider>
                <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
                  <App />
                </ThemeProvider>
              </CitiesProvider>
            </AuthProvider>
          </Provider>
        </BrowserRouter>
      </SearchProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
