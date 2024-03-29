import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AppProvider from './context/AppContext'
import DrawerProvider from './context/DrawerContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'eleetcode',
  description:
    'daily leetcode practice with timer to get you consistent at solving algo problems!',
  icons: {
    icon: './favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          <DrawerProvider>{children}</DrawerProvider>
        </AppProvider>
      </body>
    </html>
  )
}
