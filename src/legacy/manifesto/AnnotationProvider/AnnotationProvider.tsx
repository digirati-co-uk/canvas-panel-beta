import React, { useMemo } from 'react';
import functionOrMapChildren, {
  RenderComponent,
} from '../../../utility/function-or-map-children';
import { Annotation, AnnotationList } from 'manifesto.js';
import {
  AnnotationSelector,
  parseAnnotation,
} from '../../../utility/annotation-selector';
import { useAnnotationList } from '../../../manifesto/AnnotationList/AnnotationListProvider';

export const AnnotationProvider: RenderComponent<{
  annotationList: AnnotationList;
  annotations: Array<{
    annotationList: AnnotationList;
    annotation: Annotation;
    on?: AnnotationSelector;
  }>;
}> & { parseAnnotation?: any } = ({ children, ...props }) => {
  const { annotationList } = useAnnotationList();

  const parsedList = useMemo(
    () =>
      annotationList.getResources().map(annotation => ({
        annotationList,
        annotation,
        on: parseAnnotation(annotation),
      })),
    [annotationList]
  );

  if (!annotationList || !parsedList) {
    return null;
  }

  return functionOrMapChildren(children, {
    annotationList,
    annotations: parsedList,
    ...props,
  });
};

export default AnnotationProvider;
