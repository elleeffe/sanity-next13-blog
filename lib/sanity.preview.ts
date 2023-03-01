import {definePreview} from 'next-sanity/preview';
import {projectId, dataset} from './sanity.client';

function onPublicAccessOnly() {
  alert('You are not logged in. You will only see public data.');
}

if (!projectId || !dataset) {
  throw new Error(
    `Missing Sanity project ID and dataset mode, check .env file`
  );
}

export const usePreview = definePreview({
  projectId,
  dataset,
  onPublicAccessOnly,
});
