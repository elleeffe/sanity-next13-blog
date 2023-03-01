import {previewData} from 'next/headers';
import {groq} from 'next-sanity';
import {Inter} from 'next/font/google';
import {client} from '@/sanity.client';
import PreviewSuspense from '@/components/PreviewSuspense';
import PreviewBlogList from '@/components/PreviewBlogList';
import BlogList from '@/components/BlogList';

const inter = Inter({subsets: ['latin']});

const query = groq`
*[_type=='post'] {
  ...,
  author->,
  categories[]->
} | order(_createdAt desc)
`;

export default async function Home() {
  if (previewData()) {
    return (
      <PreviewSuspense
        fallback={
          <div className={inter.className}>
            <h1 className="text-3xl font-bold underline">Loading</h1>
          </div>
        }
      >
        <PreviewBlogList query={query} />
      </PreviewSuspense>
    );
  }

  const posts = await client.fetch(query);
  console.log(posts);

  return (
    <main className={inter.className}>
      <BlogList posts={posts} />
    </main>
  );
}
