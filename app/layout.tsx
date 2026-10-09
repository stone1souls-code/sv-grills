import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Oswald } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin', 'cyrillic'], variable: '--font-inter' })
const oswald = Oswald({ subsets: ['latin', 'cyrillic'], variable: '--font-oswald' })

export const metadata: Metadata = {
  title: 'Сідай & Відпочивай — мангали, вугільні грилі BBQ та смокери',
  description:
    'Мангали ручної роботи, вуличні грилі та оффсетні реверсні смокери з товстої сталі. Каталог і калькулятор комплектації з миттєвим розрахунком ціни.',
  generator: 'v0.app',
  // 🎯 ВАШІ ПРЕМІАЛЬНІ PNG ЛОГОТИПИ ТЕПЕР ПРАЦЮЮТЬ БЕЗ ЖОДНИХ КОНФЛІКТІВ
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#1a1612',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="uk" className={`dark scroll-smooth ${inter.variable} ${oswald.variable}`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
