import type {NextApiRequest, NextApiResponse} from 'next';

const studioUrl = process.env.PUBLIC_URL || 'http://localhost:3000';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: {slug},
    rawHeaders,
  } = req;

  const check = rawHeaders.find((el) =>
    el.includes(`${studioUrl}/studio/desk/post;`)
  );

  if (!slug || !check) {
    res.writeHead(307, {Location: '/'});
    return res.end();
  }

  if (Array.isArray(slug)) {
    if (slug.length > 1) {
      res.writeHead(307, {Location: '/'});
    } else {
      res.writeHead(307, {Location: `/blog/${slug[0]}`});
    }
    return res.end();
  }

  res.setPreviewData({});
  res.writeHead(307, {Location: `/blog/${slug}`});
  return res.end();
}
