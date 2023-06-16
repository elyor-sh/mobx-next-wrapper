import {initStore, StoreProvider} from '@/store';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {

  const store = initStore(pageProps.initialState?.key, pageProps.initialState?.value);

  return (
      <StoreProvider value={store}>
        <Component {...pageProps} />
      </StoreProvider>
  )
}
