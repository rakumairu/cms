import Head from 'next/head';
import { IMeta } from '../../utils/interfaces';
import { defaultMeta } from '../../utils/StaticData';
import Footer from './Footer';
import Header from './Header';

interface IProps {
    meta?: IMeta
    children: React.ReactNode
}

const Main = ({ meta, children }: IProps) => {
    const { title, description, url, image } = meta || defaultMeta

    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="height=device-height,width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
                <title>{ title || ''}</title>
                <meta name="description" content={description || ''} />
                <meta name="author" content="Demaspira Aulia" />
                {/* <meta name="google-site-verification" content="pccnFefLIY5MklKIk9BIdTGGAAC5LuRk2anu3QubeE0" /> */}
                {/* <meta name="ahrefs-site-verification" content="efd9c5385600fd8425f75d006f556b4b271b88e54d114502e7ef46ecbd1de335" /> */}
                {/* <meta name="twitter:card" content="summary" />
                <meta name="twitter:site" content="@jendela360" />
                <meta name="twitter:creator" content="@jendela360" /> */}
                {/* <meta property="fb:app_id" content="260180081106004" /> */}
                <meta property="og:site_name" content="Rakumairu DEV" />
                <meta property="og:url" content={url || process.env.NEXT_PUBLIC_URL} />
                <meta property="og:title" content={title || ''} />
                <meta property="og:description" content={description || ''} />
                <meta property="og:image" content={image || `${process.env.NEXT_PUBLIC_URL}/assets/images/default-thumbnail.jpg`} />
                <meta name="base_url" content={process.env.NEXT_PUBLIC_URL} />
                {/* <meta name="_token" content="Fj60Ue3Gp0CGc9aPUUTQeT7XzeUyNyhZEAHohecS" /> */}


                <link rel="canonical" href={url} />
                <link rel="alternate" hrefLang="id" href={url} />
                <link rel="alternate" hrefLang="en" href={url} />
                <link rel="alternate" hrefLang="x-default" href={url} />

                <meta name="mobile-web-app-capable" content="yes" />
                <link rel="shortcut icon" href={`${process.env.NEXT_PUBLIC_URL}/favicon.ico`} type="image/x-icon" />
                <link rel="apple-touch-icon" href={`${process.env.NEXT_PUBLIC_URL}/assets/images/mobile-favicon.png`} />
                <link rel="apple-touch-icon" sizes="72x72" href={`${process.env.NEXT_PUBLIC_URL}/assets/images/mobile-favicon.png`} />
                <link rel="apple-touch-icon" sizes="114x114" href={`${process.env.NEXT_PUBLIC_URL}/assets/images/mobile-favicon.png`} />
                <link rel="apple-touch-icon" sizes="128x128" href={`${process.env.NEXT_PUBLIC_URL}/assets/images/mobile-favicon.png`} />

                <link rel="preconnect" href="https://fonts.gstatic.com/" />
                <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;1,400&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap" rel="stylesheet" />

                {/* <link rel="preconnect" href="https://www.google-analytics.com" /> */}

                {/* Google Analytics */}
                {/* <script async src={`https://www.googletagmanager.com/gtag/js?id=${ process.env.NEXT_PUBLIC_TRACKING_ID }`}></script>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                        
                            gtag('config', '${ process.env.NEXT_PUBLIC_TRACKING_ID }');
                        `
                    }}
                /> */}
            </Head>
            <div>
                <Header />
                <div className="min-h-screen">
                    { children }
                </div>
                <Footer />
            </div>
        </>
    )
}

export default Main