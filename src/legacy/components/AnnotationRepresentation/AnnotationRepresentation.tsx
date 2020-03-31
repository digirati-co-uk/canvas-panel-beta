import React, { CSSProperties } from 'react';
import CanvasRepresentation from '../CanvasRepresentation/CanvasRepresentation';
import Annotation from '../Annotation/Annotation';
import { Annotation as ManifestoAnnotation } from 'manifesto.js';
import { AnnotationSelector } from '../../../utility/annotation-selector';
import { BemBlockType } from '../Bem/Bem';

type Props = {
  annotations?: Array<{
    annotation: ManifestoAnnotation;
    on: AnnotationSelector;
  }>;
  growthStyle?: 'fixed' | 'scaled' | 'absolute';
  annotationStyle?: CSSProperties;
  onClickAnnotation?: (
    annotation: ManifestoAnnotation,
    vect: any,
    e: MouseEvent
  ) => void;
  bemModifiers?: (
    annotation: ManifestoAnnotation,
    props: any
  ) => { [key: string]: boolean };
  annotationContent?: (
    annotation: ManifestoAnnotation,
    bem: BemBlockType
  ) => any;
};

const AnnotationRepresentation: React.FC<Props> = ({
  annotations = [],
  onClickAnnotation,
  annotationStyle,
  growthStyle,
  bemModifiers,
  annotationContent,
  ...props
}) => (
  <CanvasRepresentation {...props}>
    {annotations.map(({ annotation, on }, key) => {
      console.log(on);
      return typeof on.selector === 'string' ? null : (
        <Annotation
          key={key}
          x={on.selector && on.selector.x ? on.selector.x : undefined}
          y={on.selector && on.selector.y ? on.selector.y : undefined}
          width={
            on.selector && on.selector.width ? on.selector.width : undefined
          }
          height={
            on.selector && on.selector.height ? on.selector.height : undefined
          }
          annotation={annotation}
          style={annotationStyle}
          onClick={onClickAnnotation}
          growthStyle={growthStyle}
          bemModifiers={bemModifiers as any}
          annotationContent={annotationContent}
        />
      );
    })}
  </CanvasRepresentation>
);

export default AnnotationRepresentation;
