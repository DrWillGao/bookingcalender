import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Rental Booking Website',
  description: 'Luxury Serviced Apartments Booking Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
} 