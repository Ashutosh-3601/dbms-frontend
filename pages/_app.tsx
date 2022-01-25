import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const [pageLoading, setPageLoading] = useState<boolean>(false);
    useEffect(() => {
        const handleStart = () => { setPageLoading(true); };
        const handleComplete = () => { setPageLoading(false); };
    
        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleComplete);
        router.events.on('routeChangeError', handleComplete);
      }, [router]);
    return (
        <>
        <Head>
            <title>Question Paper Generator</title>
            <link rel="shortcut icon" href={'/public/logofavicon/favicon.ico'} />
            <meta property='og:title' content='Question Paper Genrator for BMSIT'/>
        </Head>
        <Layout>
            { pageLoading 
            ? (<><Loading /><Loading /><Loading /></>)
            : <Component {...pageProps} />
            }
        </Layout>
        </>
    );
}

export default MyApp;
