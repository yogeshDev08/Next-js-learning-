'use client'
import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Provider } from 'react-redux';
import { store } from './GlobalRedux/store';

// import { Providers } from './GlobalRedux/provider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-gradient-to-r from-slate-500 to-black`}>
      <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
