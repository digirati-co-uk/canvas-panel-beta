import {
  Annotation,
  AnnotationList,
  Canvas,
  IManifestoOptions,
} from 'manifesto.js';

class CustomAnnotationList extends AnnotationList {
  constructor(label: string, jsonld?: any, options?: IManifestoOptions) {
    super(label, jsonld, options);
    if (this.getResources().length) {
      this.isLoaded = true;
    }
  }

  getResources(): Annotation[] {
    const resources =
      this.getProperty('resources') || this.getProperty('items') || [];
    return resources.map(
      (resource: any) => new Annotation(resource, this.options)
    );
  }
}

export async function getAnnotationsFromCanvas(canvas: Canvas) {
  const annotationProperty = canvas.getProperty('annotations');
  if (!annotationProperty) {
    return Promise.resolve([]);
  }

  const annotations = Array.isArray(annotationProperty)
    ? annotationProperty
    : [annotationProperty];

  const annotationPromises: AnnotationList[] = annotations.map(
    (annotationList, i) =>
      new CustomAnnotationList(
        annotationList.label || `Annotation list ${i}`,
        annotationList,
        canvas.options
      )
  );

  return Promise.all(annotationPromises);
}
