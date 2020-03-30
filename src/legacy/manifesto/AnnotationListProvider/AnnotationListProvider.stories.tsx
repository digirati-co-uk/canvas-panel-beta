import React from 'react';
import { Manifest } from '../Manifest/Manifest';
import { CanvasProvider } from '../CanvasProvider/CanvasProvider';
import { AnnotationListProvider } from './AnnotationListProvider';

export default { title: 'Legacy | Annotation List Provider' };

export const example = () => (
  <Manifest url="https://iiif.library.nuigalway.ie/manifests/p135/memoir.json">
    <CanvasProvider startCanvas={72}>
      <AnnotationListProvider>
        {({ annotationList }) =>
          annotationList.getResources().map((resource, key) => (
            <ul key={key}>
              <li>
                <strong>ID:</strong> {resource.getProperty('@id')}
              </li>
              <li>
                <strong>Motivation:</strong> {resource.getMotivation()}
              </li>
              <li>
                <strong>On:</strong> {resource.getOn()}
              </li>
            </ul>
          ))
        }
      </AnnotationListProvider>
    </CanvasProvider>
  </Manifest>
);
