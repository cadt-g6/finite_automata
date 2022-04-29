/**
 * Asynchronously loads the component for AddFaPage
 */

import { lazyLoad } from 'utils/loadable';

export const AddFaPage = lazyLoad(
  () => import('./index'),
  module => module.AddFaPage,
);
