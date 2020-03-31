import React, { CSSProperties } from 'react';
import { useCanvas } from '../../../manifesto/Canvas/CanvasProvider';

function processChildStyle(
  reactElement: any,
  { position, ratio }: { position?: { zoom: number }; ratio: number }
) {
  const { maxHeight, ...style } = reactElement.props.style || {};

  const computedMaxHeight = maxHeight ? 'auto' : maxHeight * ratio;

  if (reactElement.props.growthStyle === 'fixed') {
    const zam = position ? position.zoom * (1 / ratio) : 1;
    const fixedMaxHeight = maxHeight && zam ? maxHeight / (1 / zam) : 'auto';
    return {
      ...style,
      position: 'absolute',
      top: reactElement.props.y * ratio,
      left: reactElement.props.x * ratio,
      height: reactElement.props.height * ratio * zam,
      width: reactElement.props.width * ratio * zam,
      maxHeight: fixedMaxHeight,
      transform: 'scale(' + 1 / zam + ')',
      transformOrigin: 'top left',
    };
  }

  if (reactElement.props.growthStyle === 'absolute') {
    // Do opposite of above, make double the size and scale it down.
  }

  return {
    ...style,
    position: 'absolute',
    top: reactElement.props.y * ratio,
    left: reactElement.props.x * ratio,
    height: reactElement.props.height * ratio,
    width: reactElement.props.width * ratio,
    maxHeight: computedMaxHeight,
  };
}

const CanvasRepresentation: React.FC<{
  position?: {
    x: number;
    y: number;
    width: number;
    zoom: number;
    scale: number;
    rotation: number;
  };
  width?: number;
  height?: number;
  maxWidth?: number;
  ratio?: number;
  style?: CSSProperties;
}> = ({
  ratio = 1,
  maxWidth = 500,
  width = 0,
  height = 0,
  style,
  children,
  ...props
}) => {
  const { canvas } = useCanvas();
  const { maxHeight, ...extraStyle } = style || {};

  return (
    <div
      style={{
        position: 'relative',
        height: height * ratio,
        width: width * ratio,
        pointerEvents: 'none',
        maxHeight: maxHeight ? (maxHeight as number) / ratio : undefined,
        ...extraStyle,
      }}
    >
      {React.Children.map(children, child => {
        if (child) {
          const propsForEl =
            // @ts-ignore
            child && child.type && child.type === 'div'
              ? {}
              : { canvas, ...props };

          return React.cloneElement(child as any, {
            style: processChildStyle(child, {
              position: props.position,
              ratio,
            }),
            ...propsForEl,
          });
        }
        return <React.Fragment />;
      })}
    </div>
  );
};

export default CanvasRepresentation;
