import React from 'react';
import functionOrMapChildren, {
  RenderComponent,
} from '../../../utility/function-or-map-children';
import { useCanvas } from '../../../manifesto/Canvas/CanvasProvider';
import { useAnnotationLists } from '../../../hooks/use-annotation-lists';
import { AnnotationList, Canvas } from 'manifesto.js';
import { AnnotationListProvider as NewAnnotationListProvider } from '../../../manifesto/AnnotationList/AnnotationListProvider';

export const AnnotationListProvider: RenderComponent<{
  annotationList: AnnotationList;
  canvas: Canvas;
}> = ({ children, ...props }) => {
  const { canvas } = useCanvas();
  const [annotationLists] = useAnnotationLists();

  if (!canvas || !annotationLists) {
    return null;
  }

  return (
    <div>
      {annotationLists.map((annotationList, key) => (
        <div key={key}>
          <NewAnnotationListProvider annotationList={annotationList}>
            {functionOrMapChildren(children, {
              canvas,
              annotationList,
              ...props,
            })}
          </NewAnnotationListProvider>
        </div>
      ))}
    </div>
  );
};

export default AnnotationListProvider;
