import Image from 'next/image';
import Link from 'next/link';
import urlFor from '@/utils/urlFor';

// https://www.sanity.io/plugins/react-portable-text

const PostBody = {
  h1: ({children}: any) => <h1 className="font-bold">{children}</h1>,
  h2: ({children}: any) => <h2 className="font-semibold">{children}</h2>,
  h3: ({children}: any) => <h3 className="font-medium">{children}</h3>,
  h4: ({children}: any) => <h4 className="font-medium">{children}</h4>,
  h5: ({children}: any) => <h5 className="font-normal">{children}</h5>,
  h6: ({children}: any) => <h6 className="font-normal">{children}</h6>,
  normal: ({children}: any) => <p className="font-light">{children}</p>,
  ul: ({children}: any) => <ul className="list-disc">{children}</ul>,
  ol: ({children}: any) => <ol className="list-decimal">{children}</ol>,
  li: ({children}: any) => <li>{children}</li>,
  blockquote: ({children}: any) => (
    <blockquote className="border-l-black border-l-4 pl-2">
      {children}
    </blockquote>
  ),
  link: ({href, children}: any) => {
    const rel = href.startsWith('/') ? 'noreferrer noopener' : undefined;
    return (
      <Link href={href} rel={rel}>
        {children}
      </Link>
    );
  },
};

export default PostBody;
