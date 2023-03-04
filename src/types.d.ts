type Base = {
  _createdAt: string;
  _rev: string;
  _id: string;
  _type: string;
  _updatedAt: string;
};

interface Post extends Base {
  author: Author;
  body: Block[];
  categories: Category[];
  mainImage: Image;
  slug: Slug;
  title: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  ogDescription: string;
  ogTitle: string;
  ogImage: Image;
}

interface Author extends Base {
  bio: Block[];
  image: Image;
  name: string;
  slug: Slug;
}

interface Image {
  _type: 'image';
  asset: Reference;
}

interface Reference {
  _ref: string;
  _type: 'reference';
}

interface Slug {
  _type: 'slug';
  current: string;
}

interface Block {
  _key: string;
  _type: 'block';
  children: Span[];
  markDefs: any[];
  style: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'blockquote';
}

interface Span {
  _key: string;
  _type: 'span';
  marks: string[];
  text: string;
}

interface Category extends Base {
  description: string;
  title: string;
}

interface MainImage {
  _type: 'image';
  asset: Reference;
}

interface Title {
  _type: 'string';
  current: string;
}

interface Description {
  _type: 'string';
  current: string;
}

// ogDescription: 'open graph description',
//   ogImage: {
//     _type: 'image',
//     asset: {
//       _ref: 'image-3374b953c678baf9b7aafea6d16df9028f0714da-220x185-png',
//       _type: 'reference'
//     }
//   },
//   ogTitle: 'open graph title',
//   seoDescription: 'descrizione seo',
//   seoTitle: 'titolo seo',
