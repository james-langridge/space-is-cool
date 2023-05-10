import './globals.css'
import Providers from './providers'

export const metadata = {
  title: 'Space Is Cool [sic]',
  description: 'A Cool [sic] UI to view NASA Mars Rover images.',
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
