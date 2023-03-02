'use client';

import Link from 'next/link';

type Props = {
  children: React.ReactNode;
  route: string;
};

const ClientSidePostWrap = ({children, route}: Props) => {
  return <Link href={route}>{children}</Link>;
};

export default ClientSidePostWrap;
