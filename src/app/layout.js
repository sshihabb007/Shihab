import './globals.css';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Cursor from '@/components/Cursor';
import AosInit from '@/components/AosInit';

export const metadata = {
  title: 'Mehedi Hasan Shihab | Web & Software Developer',
  description: 'Portfolio of Mehedi Hasan Shihab. Senior Software Engineer at BERI with expertise in Web Development, AI, and IT Support. View my projects and skills.',
  manifest: '/manifest.json',
  appleTouchIcon: '/asset/fav.png',
  icons: {
    icon: '/asset/fav.png',
    apple: '/asset/fav.png',
  },
  openGraph: {
    title: 'Mehedi Hasan Shihab Portfolio',
    description: 'Explore the projects of Mehedi Hasan Shihab in React, Javascript, Node.js, php, AI based platform, C#, and AI research.',
    url: 'https://sshihabb007.github.io/',
    siteName: 'Mehedi Hasan Shihab Portfolio',
    images: [
      {
        url: 'https://sshihabb007.github.io/asset/Shihab.jpg',
        width: 800,
        height: 600,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export const viewport = {
  themeColor: '#6366f1',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Fonts */}
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        {/* Font Awesome Icons */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function (w, d, s, l, i) {
              w[l] = w[l] || []; w[l].push({
                  'gtm.start':
                      new Date().getTime(), event: 'gtm.js'
              }); var f = d.getElementsByTagName(s)[0],
                  j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
                      'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
          })(window, document, 'script', 'dataLayer', 'GTM-537NPQRV');`}
        </Script>
        {/* Google Analytics tag (gtag.js) */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-3JN6PYW17Z" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', 'G-3JN6PYW17Z');`}
        </Script>
      </head>
      <body className="flex flex-col min-h-screen" suppressHydrationWarning>
        {/* GTM noscript */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-537NPQRV" 
            height="0" 
            width="0" 
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        
        <AosInit />
        <Header />
        
        <div className="flex-grow">
          {children}
        </div>
        
        <Footer />
        <Cursor />
      </body>
    </html>
  );
}
