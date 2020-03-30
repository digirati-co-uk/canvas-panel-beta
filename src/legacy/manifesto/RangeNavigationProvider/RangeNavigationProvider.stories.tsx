import Manifest from '../Manifest/Manifest';
import RangeNavigationProvider from './RangeNavigationProvider';
import React from 'react';
import {
  CanvasRepresentation,
  OpenSeadragonViewer,
  OpenSeadragonViewport,
  SingleTileSource,
  Viewport,
} from '../..';

// The range navigation provider allows you to track navigating a manifest based on a
// range.

export default { title: 'Legacy | Range nav' };

export const wellcome = () => (
  <Manifest url="https://stephenwf.github.io/wellcome-range-test.json">
    <RangeNavigationProvider rangeId="https://wellcomelibrary.org/iiif/b18035723/range/illustrations">
      {({ canvas, previousRange, nextRange }) =>
        canvas ? (
          <div style={{ minHeight: 400 }}>
            <img key={canvas.id} src={canvas.getCanonicalImageUri(300)} />
            <p>
              <button onClick={previousRange}>Prev</button>
              {canvas.id}
              <button onClick={nextRange}>Next</button>
            </p>
          </div>
        ) : null
      }
    </RangeNavigationProvider>
  </Manifest>
);

export const vam = () => (
  <Manifest url="https://raw.githubusercontent.com/4d4mm/adam-digirati.github.io/master/balenciaga1-behaviors.json">
    <RangeNavigationProvider>
      {({
        canvas,
        previousRange,
        rangeId,
        region,
        currentIndex,
        nextRange,
        ...props
      }) => (
        <div style={{ minHeight: 500 }}>
          <div style={{ minHeight: 500 }}>
            <SingleTileSource canvas={canvas} {...props}>
              <Viewport width={500} height={500}>
                <OpenSeadragonViewport viewportController={true}>
                  <OpenSeadragonViewer maxHeight={500} />
                </OpenSeadragonViewport>
                {region ? (
                  <CanvasRepresentation ratio={0.02}>
                    <div
                      // @ts-ignore
                      y={region.x}
                      x={region.y}
                      height={region.height}
                      width={region.width}
                      style={{ outline: '2px solid blue' }}
                    />
                  </CanvasRepresentation>
                ) : null}
              </Viewport>
            </SingleTileSource>
          </div>
          {canvas ? (
            <ul>
              <li>
                <button onClick={previousRange}>Prev</button>
              </li>
              <li>
                <strong>id:</strong> {canvas.id}
              </li>
              <li>
                <strong>range:</strong> {rangeId}
              </li>
              <li>
                <strong>Index:</strong> {currentIndex}
              </li>
              <li>
                {region ? (
                  <ul>
                    <li>
                      <strong>x</strong> {region.x}
                    </li>
                    <li>
                      <strong>y</strong> {region.y}
                    </li>
                    <li>
                      <strong>width</strong> {region.width}
                    </li>
                    <li>
                      <strong>height</strong> {region.height}
                    </li>
                  </ul>
                ) : null}
              </li>
              <li>
                <button onClick={nextRange}>Next</button>
              </li>
            </ul>
          ) : null}
        </div>
      )}
    </RangeNavigationProvider>
  </Manifest>
);
