import React from 'react';
import functionOrMapChildren, {
  RenderComponent,
} from '../../../utility/function-or-map-children';
import { useCanvas } from '../../../manifesto/Canvas/CanvasProvider';
import { useAnnotationLists } from '../../../hooks/use-annotation-lists';
import { AnnotationList, Canvas } from 'manifesto.js';
import { AnnotationListProvider as NewAnnotationListProvider } from '../../../manifesto/AnnotationList/AnnotationListProvider';

export const AnnotationListProvider: RenderComponent<
  {
    annotationList: AnnotationList;
    canvas: Canvas;
  },
  {
    height?: number;
    width?: number;
  }
> = ({ children, ...props }) => {
  const { canvas } = useCanvas();
  const [annotationLists] = useAnnotationLists();

  if (!canvas || !annotationLists) {
    return null;
  }

  return (
    <>
      {annotationLists.map((annotationList, key) => (
        <NewAnnotationListProvider annotationList={annotationList}>
          {functionOrMapChildren(children, {
            canvas,
            annotationList,
            ...props,
          })}
        </NewAnnotationListProvider>
      ))}
    </>
  );
};

export default AnnotationListProvider;
