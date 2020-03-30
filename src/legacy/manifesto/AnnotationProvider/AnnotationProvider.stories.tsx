import React from 'react';
import { Manifest } from '../Manifest/Manifest';
import { CanvasProvider } from '../CanvasProvider/CanvasProvider';
import { AnnotationProvider } from './AnnotationProvider';
// @ts-ignore
import { CanvasNavigation } from '@canvas-panel/core';
import { AnnotationListProvider } from '../AnnotationListProvider/AnnotationListProvider';

export default { title: 'Legacy | Annotation Provider' };

export const example = () => (
  <Manifest url="https://iiif.library.nuigalway.ie/manifests/p135/memoir.json">
    <CanvasProvider startCanvas={82}>
      <CanvasNavigation />
      <AnnotationListProvider>
        <AnnotationProvider>
          {({ annotations }) =>
            annotations.map(({ annotation, on }, key) => (
              <ul key={key}>
                <li>
                  <strong>ID:</strong> {annotation.getProperty('@id')}
                </li>
                <li>
                  <strong>Motivation:</strong> {annotation.getMotivation()}
                </li>
                {on && on.selector ? (
                  <li>
                    <strong>On:</strong> {on.source}
                    {typeof on.selector === 'string' ? (
                      on.selector
                    ) : (
                      <ul>
                        <li>
                          <strong>X: </strong> {on.selector.x}
                        </li>
                        <li>
                          <strong>Y: </strong> {on.selector.y}
                        </li>
                        <li>
                          <strong>Height: </strong> {on.selector.height}
                        </li>
                        <li>
                          <strong>Width: </strong> {on.selector.width}
                        </li>
                      </ul>
                    )}
                  </li>
                ) : null}
              </ul>
            ))
          }
        </AnnotationProvider>
      </AnnotationListProvider>
    </CanvasProvider>
  </Manifest>
);
