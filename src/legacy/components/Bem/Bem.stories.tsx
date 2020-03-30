import React from 'react';
import CanvasNavigation from '../CanvasNavigation/CanvasNavigation';
import Bem from './Bem';
import { CanvasProvider } from '../../manifesto/CanvasProvider/CanvasProvider';
import { Manifest } from '../../manifesto/Manifest/Manifest';

export default { title: 'Legacy | BEM' };

export const example = () => (
  <Manifest url="https://iiif.library.nuigalway.ie/manifests/p135/memoir.json">
    <CanvasProvider startCanvas={82}>
      <div>
        {/* No styles */}
        <CanvasNavigation />

        {/* Blue styles */}
        <Bem cssClassMap={{ 'canvas-navigation': 'blue' }}>
          <CanvasNavigation />
        </Bem>

        {/* Red styles */}
        <Bem cssClassMap={{ 'canvas-navigation': 'red' }}>
          <CanvasNavigation />

          {/* green styles, nested */}
          <Bem cssClassMap={{ 'canvas-navigation': 'green' }} prefix="t-">
            <CanvasNavigation />
          </Bem>

          {/* Red styles again */}
          <CanvasNavigation />
        </Bem>

        <style>{`
          .blue, .blue__next, .blue__previous { border: 2px solid blue }
          .red, .red__next, .red__previous { border: 2px solid red }
          .t-green, .t-green__next, .t-green__previous { border: 2px solid green }
        `}</style>
      </div>
    </CanvasProvider>
  </Manifest>
);
