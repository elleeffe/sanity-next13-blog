import Link from 'next/link';

export default async function Home() {
  return (
    <>
      <h1>Home page</h1>
      <Link href="/blog">Go to blog</Link>
    </>
  );
}
