import React from 'react';
import { Manifest } from '../../manifesto/Manifest/Manifest';
import CanvasProvider from '../../manifesto/CanvasProvider/CanvasProvider';
import CanvasRepresentation from './CanvasRepresentation';

export default { title: 'Legacy | Canvas representation' };

export const example = () => (
  <Manifest url="https://iiif.library.nuigalway.ie/manifests/p135/memoir.json">
    <CanvasProvider startCanvas={4}>
      <CanvasRepresentation
        ratio={0.1}
        style={{
          border: '1px solid red',
        }}
      >
        <div
          // @ts-ignore
          y={1000}
          x={1000}
          height={500}
          width={500}
          style={{ outline: '1px solid green' }}
        >
          one
        </div>
        <div
          // @ts-ignore
          y={2000}
          x={1000}
          height={200}
          width={500}
          style={{ outline: '1px solid green' }}
        >
          two
        </div>
        <div
          // @ts-ignore
          y={1000}
          x={1900}
          height={200}
          width={500}
          style={{ outline: '1px solid green' }}
        >
          three
        </div>
      </CanvasRepresentation>
    </CanvasProvider>
  </Manifest>
);
