import 'normalize.css/normalize.css';
import '@/styles/globals.scss';

import type { AppProps } from 'next/app';
import { createTheme, NextUIProvider } from '@nextui-org/react';

export default function App({ Component, pageProps }: AppProps) {
    const theme = createTheme({ type: 'dark' });

    return (
        <NextUIProvider theme={theme}>
            <Component {...pageProps} />
        </NextUIProvider>
    );
}
