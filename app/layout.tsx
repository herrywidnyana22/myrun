import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { siteConfig } from '@/config/site'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Toaster } from 'sonner'

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
          <div 
            className="
              w-full
              h-full
              bg-slate-100
            "
        >
            <Navbar/>
            <Toaster/>
            <main
                className="
                    w-full
                    h-full
                    pt-20
                    pb-20
                    bg-slate-100
                "
            >
                {children}             
            </main>
            <Footer/>
        </div>
      </body>
    </html>
  )
}