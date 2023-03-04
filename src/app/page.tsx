import {Metadata} from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Lorenzo Faenzi',
  description: 'Descrizione sito',
  openGraph: {
    title: 'Lorenzo Faenzi',
    description: 'Descrizione sito',
    url: process.env.PUBLIC_URL || 'http://localhost:3000',
    siteName: 'Lorenzo Faenzi',
    images: [
      {
        url: '/logo.svg',
        alt: 'My custom alt',
      },
    ],
    locale: 'it-IT',
    type: 'website',
  },
};

export default async function Home() {
  return (
    <>
      <h1>Home page</h1>
      <Link href="/blog">Go to blog</Link>
    </>
  );
}
