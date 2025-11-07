import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: 'JARVIS - Context Resurrection',
  description: 'Your AI memory assistant that never forgets',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-black antialiased" style={{ background: '#000000' }}>
        {children}
        <Toaster 
          theme="dark"
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#000000',
              border: '1px solid #333333',
              color: '#F8F9FA',
            },
          }}
        />
      </body>
    </html>
  )
}