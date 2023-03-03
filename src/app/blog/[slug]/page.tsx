import {client} from '@/utils/sanity.client';
import urlFor from '@/utils/urlFor';
import {formatDate} from '@/utils/utils';
import {groq} from 'next-sanity';
import Image from 'next/image';
import PortableText from 'react-portable-text';
import PostBody from '@/components/PostBody';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || '';

type Props = {
  params: {
    slug: string;
  };
};

const query = groq`
*[_type=='post' && slug.current == $slug][0] {
  ...,
  author->,
  categories[]->
}
`;

export default async function Post({params: {slug}}: Props) {
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
