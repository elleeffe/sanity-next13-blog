import {client} from '@/utils/sanity.client';
import urlFor from '@/utils/urlFor';
import {formatDate} from '@/utils/utils';
import {groq} from 'next-sanity';
import Image from 'next/image';
import PortableText from 'react-portable-text';
import PostBody from '@/components/PostBody';
import {Metadata} from 'next';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || '';

type Props = {
  params: {
    slug: string;
  };
};

export const revalidate = 60 * 60 * 24; // revalidate this page every day

export const generateStaticParams = async () => {
  const query = groq`
  *[_type=='post'] {
    slug
  }
  `;
  const posts: Post[] = await client.fetch(query);
  return posts.map(({slug}) => ({slug: slug.current}));
};

export async function generateMetadata({
  params: {slug},
}: Props): Promise<Metadata> {
  const query = groq`
  *[_type=='post' && slug.current == $slug][0] {
    ...
}`;
  const {
    seoTitle,
    seoDescription,
    ogTitle,
    ogDescription,
    ogImage,
    _createdAt,
    author,
  }: Post = await client.fetch(query, {slug});

  const metadata: Metadata = {
    title: seoTitle + ' | Lorenzo Faenzi Blog',
    description: seoDescription,
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url:
        (process.env.PUBLIC_URL || 'http://localhost:3000') + '/blog/' + slug,
      siteName: 'Blog | Lorenzo Faenzi',
      type: 'article',
      publishedTime: _createdAt,
      authors: [author.name],
      images: [{url: urlFor(ogImage).url(), alt: 'post og image'}],
      locale: 'it-IT',
    },
  };

  return metadata;
}

export default async function Post({params: {slug}}: Props) {
  const query = groq`
*[_type=='post' && slug.current == $slug][0] {
  ...,
  author->,
  categories[]->
}
`;

  const post: Post = await client.fetch(query, {slug});

  return (
    <article className="mx-auto w-full max-w-5xl my-8">
      <div className="relative h-80 drop-shadow-xl group-hover:scale-105 transition-transform duration-200 ease-out">
        <Image
          className="object-cover object-left lg:object-center"
          src={urlFor(post.mainImage).url()}
          alt={post.author.name}
          fill
        />
      </div>
      <br />
      <p>Autore: {post.author.name}</p>
      <br />
      <p>Titolo: {post.title}</p>
      <br />
      <p>Descrizione: {post.description}</p>
      <br />
      <p>Data di creazione: {formatDate(post._createdAt)}</p>
      <br />
      <section>
        <PortableText
          projectId={projectId}
          dataset={dataset}
          content={post.body}
          serializers={PostBody}
        />
      </section>
    </article>
  );
}
