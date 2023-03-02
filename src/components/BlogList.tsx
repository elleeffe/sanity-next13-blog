import urlFor from '@/utils/urlFor';
import {formatDate} from '@/utils/utils';
import Image from 'next/image';
import ClientSidePostWrap from './ClientSidePostWrapper';

type Props = {
  posts: Post[];
};

const BlogList = ({posts}: Props) => {
  return (
    <div className="container mx-auto">
      {posts.map((post, i) => (
        <ClientSidePostWrap
          key={'post-' + i}
          route={'/blog/' + post.slug.current}
        >
          <div className="mx-auto w-full max-w-lg my-8 group cursor-pointer">
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
            <p>Titolo: {post.title}</p>
            <p>Descrizione: {post.description}</p>
            <p>Data di creazione: {formatDate(post._createdAt)}</p>
          </div>
        </ClientSidePostWrap>
      ))}
    </div>
  );
};

export default BlogList;
