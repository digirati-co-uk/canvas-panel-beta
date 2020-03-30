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
      setEmbeddedAnnotationLists([]);
      getAnnotationsFromCanvas(canvas).then(annotations => {
        if (annotations.length === 0) {
          setExternalAnnotationLists([]);
          canvas
            .getOtherContent()
            .then(content => {
              setExternalAnnotationLists(content);
            })
            .catch(err => {
              console.log('Could not find annotations.');
              console.log(err);
            });
        } else {
          setEmbeddedAnnotationLists(annotations);
        }
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
