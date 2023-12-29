import { Inter } from 'next/font/google';
import { Lusitana } from 'next/font/google';
import { Noto_Sans_JP } from 'next/font/google';
import { Poppins } from 'next/font/google';

export const inter = Inter({ subsets: ['latin'] });
export const lusitana = Lusitana({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export const notoSansJp = Noto_Sans_JP({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const poppinss = Poppins({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});
