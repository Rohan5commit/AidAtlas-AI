import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AidAtlas AI',
  description: 'Social-good resource navigator with AI-guided action plans.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main className="mx-auto max-w-6xl p-6">{children}</main>
      </body>
    </html>
  );
}
