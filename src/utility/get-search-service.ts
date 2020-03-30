import { Manifest } from 'manifesto.js';
import { ServiceProfile } from '@iiif/vocabulary';

export function getSearchService(manifest: Manifest) {
  const services = manifest.getServices() || [];

  for (const service of services) {
    if (
      service.getProfile().toString() === ServiceProfile.SEARCH_0.toString() ||
      service.getProfile().toString() === ServiceProfile.SEARCH_1.toString()
    ) {
      return service;
    }
  }

  return null;
}
