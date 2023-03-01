'use client';

import {NextStudio} from 'next-sanity/studio';
import {NextStudioHead} from 'next-sanity/studio/head';

import config from '../../../../sanity.config';

export default function StudioPage() {
  //  Supports the same props as `import {Studio} from 'sanity'`, `config` is required
  return (
    <>
      <NextStudioHead favicons={false} />
      <NextStudio config={config} />
    </>
  );
}
