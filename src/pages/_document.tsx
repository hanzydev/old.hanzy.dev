import React from 'react';
import Document, {
    Html,
    Head,
    Main,
    NextScript,
    type DocumentContext,
    type DocumentInitialProps,
} from 'next/document';
import { CssBaseline } from '@nextui-org/react';

export default class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
        const initialProps = await Document.getInitialProps(ctx);
        return {
            ...initialProps,
            styles: (
                <>
                    {initialProps.styles}
                    {CssBaseline.flush()}
                </>
            ),
        };
    }

    render() {
        return (
            <Html lang="en">
                <title>Deliever42</title>

                <Head>
                    <meta charSet="utf-8" />

                    <meta name="theme-color" content="#000000" />
                    <link rel="icon" href="/favicon.ico" />
                    <meta
                        name="description"
                        content="Hello, my name is Emirhan. I live in Istanbul/Turkey, I am interested in software."
                    />

                    <meta property="og:title" content="Deliever42" />
                    <meta
                        property="og:description"
                        content="Hello, my name is Emirhan. I live in Istanbul/Turkey, I am interested in software."
                    />
                    <meta property="og:image" content="/deliever.png" />
                    <meta property="og:type" content="website" />
                    <meta property="og:site_name" content="Deliever42" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
