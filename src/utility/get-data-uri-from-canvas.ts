import { ServiceProfile } from '@iiif/vocabulary';
import { getDataUriFromImages } from './get-data-uri-from-images';
import { Canvas } from 'manifesto.js';
import { getP3ImagesFromCanvas } from './get-p3-images-from-canvas';
import { getImageServiceFromAnnotation } from './get-image-service-from-annotation';

export default function getDataUriFromCanvas(canvas: Canvas) {
  const p3Images = getP3ImagesFromCanvas(canvas);

  console.log(p3Images);

  if (p3Images.length && p3Images[0]) {
    const firstP3Image = p3Images[0];
    const service = getImageServiceFromAnnotation(firstP3Image);
    if (service) {
      console.log(service);
      return service.getInfoUri();
    }
  }

  const images = canvas.getImages();
  if (images && images.length) {
    return getDataUriFromImages(images);
  }

  // Legacy IxIF
  const service = canvas.getService(ServiceProfile.IXIF);
  if (service) {
    return service.getInfoUri();
  }
  // return the canvas id.
  return canvas.id;
}
