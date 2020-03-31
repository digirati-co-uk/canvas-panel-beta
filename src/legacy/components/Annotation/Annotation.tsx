import React, {CSSProperties, StyleHTMLAttributes, useCallback} from 'react';
import { BemBlockType, useBemClassName } from '../Bem/Bem';
import { Annotation as ManifestoAnnotation } from 'manifesto.js';

type Vector = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
};

type Props = Vector & {
  annotation: ManifestoAnnotation;
  style?: CSSProperties;
  growthStyle?: 'fixed' | 'scaled' | 'absolute';
  annotationContent?: (
    annotation: ManifestoAnnotation,
    bem: BemBlockType
  ) => any;
  bemModifiers?: (
    annotation: ManifestoAnnotation,
    props: Props
  ) => { [key: string]: boolean };
  onClick?: (
    annotation: ManifestoAnnotation,
    vect: Vector,
    e: MouseEvent
  ) => void;
};

export const Annotation: React.FC<Props> = props => {
  const {
    x,
    y,
    width,
    height,
    style,
    onClick,
    bemModifiers,
    annotation,
    annotationContent,
  } = props;

  console.log({x,y,width,height})

  const bem = useBemClassName('annotation');
  const modifiers = bemModifiers ? bemModifiers(annotation, props) : null;

  const handleClick = useCallback(
    e =>
      onClick
        ? onClick(
            annotation,
            {
              x: x || 0,
              y: y || 0,
              width: width,
              height: height,
            },
            e
          )
        : null,
    [annotation, height, onClick, width, x, y]
  );

  return (
    <div
      className={modifiers ? bem.modifiers(modifiers) : bem}
      style={style}
      onClick={handleClick}
    >
      {annotationContent ? annotationContent(annotation, bem) : null}
    </div>
  );
};

export default Annotation;
