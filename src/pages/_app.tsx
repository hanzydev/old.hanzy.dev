import 'normalize.css/normalize.css';
import '@/styles/globals.scss';

import type { AppProps } from 'next/app';
import { createTheme, NextUIProvider } from '@nextui-org/react';
import { ParallaxProvider } from 'react-scroll-parallax';

export default function App({ Component, pageProps }: AppProps) {
    const theme = createTheme({ type: 'dark' });

    return (
        <NextUIProvider theme={theme}>
            <ParallaxProvider>
                <Component {...pageProps} />
            </ParallaxProvider>
        </NextUIProvider>
    );
}
