import '../styles/globals.css'
import { Inter } from 'next/font/google'
import AuthProvider from './AuthContents/authContents'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'IContent',
  description: 'Ampliando seu jeito de aprender',
}

export default function RootLayout({children,}: {children: React.ReactNode}) 
{
  return (
    <html lang="en">
      <AuthProvider>
        <body className={inter.className}>{children}</body>
      </AuthProvider>
    </html>
  )
}
