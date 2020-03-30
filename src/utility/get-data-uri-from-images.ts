import { Annotation, Utils } from 'manifesto.js';

export function getDataUriFromImages(images: Annotation[]) {
  let infoUri = null;
  const firstImage = images[0];
  const resource = firstImage.getResource();
  const services = resource.getServices();

  if (services.length) {
    for (let i = 0; i < services.length; i++) {
      const service = services[i];
      let id = service.id;
      if (!id.endsWith('/')) {
        id += '/';
      }
      if (Utils.isImageProfile(service.getProfile())) {
        infoUri = id + 'info.json';
      }
    }
    return infoUri;
  }
  // no image services. return the image id
  return resource.id;
}
