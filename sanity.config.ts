import {defineConfig} from 'sanity';
import {deskTool} from 'sanity/desk';
import {visionTool} from '@sanity/vision';
import Iframe from 'sanity-plugin-iframe-pane';
import {DefaultDocumentNodeResolver} from 'sanity/desk';
import {schemaTypes} from './schemas';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

const getDefaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  {schemaType}
) => {
  if (schemaType === 'post') {
    return S.document().views([
      S.view.form(),
      S.view
        .component(Iframe)
        .options({
          url: ({slug}: {slug: {current: string}}) => {
            return `${
              process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'
            }/api/preview/${slug.current}`;
          },
          defaultSize: 'desktop',
          reload: {
            button: true,
          },
        })
        .title('Preview'),
    ]);
  }
  return S.document().views([S.view.form()]);
};

export default defineConfig({
  basePath: '/studio',
  name: 'MyStudio',
  title: 'My Studio',

  projectId,
  dataset,

  plugins: [
    deskTool({defaultDocumentNode: getDefaultDocumentNode}),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
