import { Manifest } from '../../manifesto/Manifest/Manifest';
import React from 'react';
import CanvasProvider from '../../manifesto/CanvasProvider/CanvasProvider';
import { OpenSeadragonViewer, Viewport, OpenSeadragonViewport } from '../..';
import SingleTileSource from '../../components/SingleTileSource/SingleTileSource';
import CanvasRepresentation from '../../components/CanvasRepresentation/CanvasRepresentation';

export default { title: 'Legacy | OpenSeadragon Viewer' };

export const example = () => (
  <Manifest url="https://stephenwf.github.io/ocean-liners.json">
    <CanvasProvider>
      <SingleTileSource>
        <Viewport maxWidth={500}>
          <OpenSeadragonViewport viewportController={true}>
            <OpenSeadragonViewer maxHeight={1000} />
          </OpenSeadragonViewport>
          <CanvasRepresentation ratio={0.1}>
            <div
              // @ts-ignore
              y={100}
              x={100}
              height={500}
              width={500}
              style={{ outline: '2px solid blue' }}
              onClick={() => alert('I was clicked')}
            >
              click me
            </div>
            <div
              // @ts-ignore
              y={2000}
              x={1000}
              height={200}
              width={500}
              style={{ outline: '2px solid blue' }}
            >
              two
            </div>
            <div
              // @ts-ignore
              y={1000}
              x={1900}
              height={200}
              width={500}
              style={{ outline: '2px solid blue' }}
            >
              three
            </div>
          </CanvasRepresentation>
        </Viewport>
      </SingleTileSource>
    </CanvasProvider>
  </Manifest>
);
