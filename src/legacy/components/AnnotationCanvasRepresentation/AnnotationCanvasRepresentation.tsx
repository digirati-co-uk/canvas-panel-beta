import React, { CSSProperties } from 'react';
import AnnotationListProvider from '../../manifesto/AnnotationListProvider/AnnotationListProvider';
import AnnotationProvider from '../../manifesto/AnnotationProvider/AnnotationProvider';
import { AnnotationRepresentation } from '../../';
import { AnnotationList, Canvas } from 'manifesto.js';

export const AnnotationCanvasRepresentation: React.FC<{
  annotationList?: AnnotationList;
  canvas?: Canvas;
  annotationStyle?: CSSProperties;
  onClickAnnotation: (annotation: any) => void;
  growthStyle: 'fixed' | 'scaled' | 'absolute';
  bemModifiers: any;
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
