import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { siteConfig } from '@/config/site'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`
  },
  description: siteConfig.desc,
  icons:[
    {
      url: "/logo.png",
      href: "/logo.png"
    }
  ]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body 
        className={inter.className}
      >
          {children}
      </body>
    </html>
  )
}