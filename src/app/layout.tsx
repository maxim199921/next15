import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Theme, ThemeProvider } from '@/app/context/ThemeContext';
import { cookies } from 'next/headers';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let initialTheme: Theme = 'light';
  const cookieStore =  await cookies();
  const theme = cookieStore.get('theme');
  initialTheme = (theme?.value as Theme) || 'light';

  return (
    <ThemeProvider initialTheme={initialTheme}>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} ${initialTheme} antialiased`}>{children}</body>
      </html>
    </ThemeProvider>
  );
}
