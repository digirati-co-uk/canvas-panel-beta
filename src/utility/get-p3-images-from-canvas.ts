import { Annotation, AnnotationBody, Canvas } from 'manifesto.js';
import { ExternalResourceType } from '@iiif/vocabulary';

export function getP3ImagesFromCanvas(canvas: Canvas) {
  return canvas.getContent().filter((annotation: Annotation) => {
    // Grab all bodies
    const bodies: AnnotationBody[] = annotation.getBody();
    // No bodies, definitely not an image.
    if (!bodies.length) {
      return false;
    }
    // Reduce all the bodies into a boolean
    return bodies.reduce((hasImage: boolean, body: AnnotationBody): boolean => {
      // Check for the image type in the body
      return (
        hasImage ||
        body.getIIIFResourceType().toString() ===
          ExternalResourceType.IMAGE.toString()
      );
    }, false);
  });
}
