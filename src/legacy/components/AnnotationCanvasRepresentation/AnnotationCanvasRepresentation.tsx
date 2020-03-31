import React, { CSSProperties } from 'react';
import AnnotationListProvider from '../../manifesto/AnnotationListProvider/AnnotationListProvider';
import AnnotationProvider from '../../manifesto/AnnotationProvider/AnnotationProvider';
import { AnnotationRepresentation } from '../../';
import {
  Annotation,
  Annotation as ManifestoAnnotation,
  AnnotationList,
  Canvas,
} from 'manifesto.js';
import { Selector } from '../../../utility/annotation-selector';

export const AnnotationCanvasRepresentation: React.FC<{
  ratio?: number;
  annotationList?: AnnotationList;
  canvas?: Canvas;
  annotationStyle?: CSSProperties;
  onClickAnnotation: (annotation: Annotation, bounds: Selector) => void;
  growthStyle: 'fixed' | 'scaled' | 'absolute';
  bemModifiers?: (
    annotation: ManifestoAnnotation,
    props: any
  ) => { [key: string]: boolean };
}> = ({
  annotationStyle,
  onClickAnnotation,
  growthStyle,
  bemModifiers,
  ...props
}) => {
  return (
    <AnnotationListProvider {...props}>
      <AnnotationProvider>
        <AnnotationRepresentation
          onClickAnnotation={onClickAnnotation}
          annotationStyle={annotationStyle}
          growthStyle={growthStyle}
          bemModifiers={bemModifiers}
        />
      </AnnotationProvider>
    </AnnotationListProvider>
  );
};

export default AnnotationCanvasRepresentation;
