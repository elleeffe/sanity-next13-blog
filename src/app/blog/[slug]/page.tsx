type Props = {
  params: {
    slug: string;
  };
};

export default async function Post({params: {slug}}: Props) {
  return (
    <>
      <h1>Post: {slug}</h1>
    </>
  );
}
