import {Metadata} from 'next';
import {previewData} from 'next/headers';
import {groq} from 'next-sanity';
import {client} from '@/utils/sanity.client';
import PreviewSuspense from '@/components/PreviewSuspense';
import PreviewBlogList from '@/components/PreviewBlogList';
import BlogList from '@/components/BlogList';

export const metadata: Metadata = {
  title: 'Blog | Lorenzo Faenzi',
  description: 'Descrizione sito',
  openGraph: {
    title: 'Blog | Lorenzo Faenzi',
    description: 'Descrizione sito',
    url: (process.env.PUBLIC_URL || 'http://localhost:3000') + '/blog',
    siteName: 'Blog | Lorenzo Faenzi',
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

const query = groq`
*[_type=='post'] {
  ...,
  author->,
  categories[]->
} | order(_createdAt desc)
`;

export default async function BlogHome() {
  if (previewData()) {
    return (
      <PreviewSuspense
        fallback={<h1 className="text-3xl font-bold underline">Loading</h1>}
      >
        <h1>Preview mode</h1>
        <PreviewBlogList query={query} />
      </PreviewSuspense>
    );
  }

  const posts: Post[] = await client.fetch(query);

  return (
    <>
      <h1>Not in preview mode</h1>
      <BlogList posts={posts} />
    </>
  );
}
