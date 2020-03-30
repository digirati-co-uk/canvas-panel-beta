import { Annotation, Canvas } from 'manifesto.js';

export function getImagesFromCanvas(canvas: Canvas) {
  return (canvas.getProperty('images') || []).reduce(
    (list: any, annotation: any) => {
      if (annotation.type === 'AnnotationPage') {
        return annotation.items.reduce((tList: any, tAnnotation: any) => {
          tList.push(new Annotation(tAnnotation, canvas.options));
          return tList;
        }, list);
      }
      list.push(new Annotation(annotation, canvas.options));

      return list;
    },
    []
  );
}
