import * as React from 'react';
import {
  AnnotationCanvasRepresentation,
  AnnotationDetail,
  Bem,
  CanvasProvider,
  Manifest,
  OpenSeadragonViewer,
  OpenSeadragonViewport,
  SingleTileSource,
  Viewport,
} from '../../legacy';
import { Annotation } from 'manifesto.js';

export default { title: 'Legacy | Annotation Detail' };

export const detail = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [state, setState] = React.useState<{ annotation: Annotation | null }>({
    annotation: null,
  });
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const viewport = React.useRef();
  const animationSpeed = 1;

  return (
    <div style={{ padding: 10 }}>
      <div style={{ width: 450, display: 'inline-block' }}>
        <Bem cssClassMap={{ annotation: 'annotation-detail-md-annotation' }}>
          <Manifest url="https://iiif.library.nuigalway.ie/manifests/p135/memoir.json">
            <CanvasProvider startCanvas={72}>
              <Viewport
                maxWidth={450}
                setRef={(v: any) => {
                  viewport.current = v;
                }}
              >
                <SingleTileSource viewportController={true}>
                  <OpenSeadragonViewport>
                    <OpenSeadragonViewer maxHeight={1000} />
                  </OpenSeadragonViewport>
                </SingleTileSource>
                <AnnotationCanvasRepresentation
                  ratio={0.1}
                  growthStyle="fixed"
                  bemModifiers={annotation => ({
                    selected: state.annotation
                      ? state.annotation.id === annotation.id
                      : false,
                  })}
                  onClickAnnotation={(annotation, bounds) => {
                    setState({ annotation });
                    if (viewport.current) {
                      (viewport.current as any).goToRect(
                        bounds,
                        300,
                        animationSpeed
                      );
                    }
                  }}
                />
              </Viewport>
            </CanvasProvider>
          </Manifest>
        </Bem>
        <style>{`
          .annotation-detail-md-annotation {
            pointer-events: visible;
            outline: 2px solid purple;
          }
          .annotation-detail-md-annotation--selected {
            outline: 2px solid orange;
          }
      `}</style>
      </div>
      <div style={{ width: 300, display: 'inline-block', padding: 30 }}>
        {state.annotation ? (
          <AnnotationDetail
            annotation={state.annotation}
            onClose={() => {
              if (viewport.current) {
                setState({ annotation: null });
                (viewport.current as any).resetView(animationSpeed);
              }
            }}
          />
        ) : (
          'Click annotation to see more.'
        )}
      </div>
    </div>
  );
};
