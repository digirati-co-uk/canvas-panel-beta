import { Annotation, AnnotationBody, Service, Utils } from 'manifesto.js';

export function getImageServiceFromAnnotation(annotation: Annotation) {
  return annotation
    .getBody()
    .reduce((finalImageService: Service | null, body: AnnotationBody) => {
      return (
        finalImageService ||
        body
          .getServices()
          // @ts-ignore
          .reduce((imageService: Service | null, service: Service) => {
            return (
              imageService ||
              (Utils.isImageProfile(service.getProfile()) ||
              // @ts-ignore
              service.getProfile() === 'level1' ||
              // @ts-ignore
              service.getProfile() === 'level2'
                ? service
                : null)
            );
          }, finalImageService)
      );
    }, null);
}
