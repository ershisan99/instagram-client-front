import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { wrapper } from '@/store'
import { Provider } from 'react-redux'
import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en'
import { Toaster } from 'sonner'

TimeAgo.addDefaultLocale(en)

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest)
  return (
    <Provider store={store}>
      <Layout>
        <Toaster />
        <Component {...props.pageProps} />
      </Layout>
    </Provider>
  )
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header>header</header>
      <main>{children}</main>
      <footer>footer</footer>
    </div>
  )
}
