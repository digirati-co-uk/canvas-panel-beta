import { useEffect, useMemo, useState } from 'react';
import { getAnnotationsFromCanvas } from '../utility/get-annoations-from-canvas';
import { useCanvas } from '../manifesto/Canvas/CanvasProvider';
import { AnnotationList } from 'manifesto.js';

export function useAnnotationLists() {
  const { canvas } = useCanvas();
  const [embeddedAnnotationLists, setEmbeddedAnnotationLists] = useState<
    AnnotationList[]
  >([]);
  const [externalAnnotationLists, setExternalAnnotationLists] = useState<
    AnnotationList[]
  >([]);

  useEffect(() => {
    if (canvas) {
      setExternalAnnotationLists([]);
      canvas.getOtherContent().then(content => {
        setExternalAnnotationLists(content);
      });

      setEmbeddedAnnotationLists([]);
      getAnnotationsFromCanvas(canvas).then(annotations => {
        setEmbeddedAnnotationLists(annotations);
      });
    }
  }, [canvas]);

  const fullAnnotationList = useMemo(
    () => [...externalAnnotationLists, ...embeddedAnnotationLists],
    [embeddedAnnotationLists, externalAnnotationLists]
  );

  return [
    fullAnnotationList,
    {
      embeddedAnnotationLists,
      externalAnnotationLists,
    },
  ] as const;
}
