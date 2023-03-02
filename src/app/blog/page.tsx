import {Metadata} from 'next';
import {previewData} from 'next/headers';
import {groq} from 'next-sanity';
import {client} from '@/utils/sanity.client';
import PreviewSuspense from '@/components/PreviewSuspense';
import PreviewBlogList from '@/components/PreviewBlogList';
import BlogList from '@/components/BlogList';

export const metadata: Metadata = {
  title: 'Blog - Lorenzo Faenzi',
  description: 'Generated by create next app',
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

  const posts = await client.fetch(query);

  return (
    <>
      <h1>Not in preview mode</h1>
      <BlogList posts={posts} />
    </>
  );
}
