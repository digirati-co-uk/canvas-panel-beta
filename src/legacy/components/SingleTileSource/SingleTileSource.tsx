import { Component, useEffect, useState, useRef } from 'react';
import functionOrMapChildren, {
  RenderComponent,
} from '../../../utility/function-or-map-children';
import { useCanvas } from '../../../manifesto/Canvas/CanvasProvider';
import getDataUriFromCanvas from '../../../utility/get-data-uri-from-canvas';
import React from 'react';
import { Canvas } from 'manifesto.js';

export const SingleTileSource: RenderComponent<
  {
    canvas: Canvas;
  },
  {
    viewportController?: boolean;
    canvas?: Canvas | null;
    preLoad?: (props: any) => void;
    fallbackWidth?: number;
  }
> = allProps => {
  const { preLoad, fallbackWidth, children, ...props } = allProps;
  const { canvas } = useCanvas();

  const [imageUri, setImageUri] = useState<string | null>();
  const [tileSources, setTileSources] = useState<any[] | undefined>();
  const requestedId = useRef<string>();

  useEffect(() => {
    setImageUri(getDataUriFromCanvas(canvas));
    setTileSources(undefined);
  }, [canvas]);

  useEffect(() => {
    if (imageUri && !tileSources) {
      if (!imageUri.endsWith('/info.json')) {
        setTileSources([
          {
            type: 'image',
            url: imageUri,
          },
        ]);
        return;
      }

      requestedId.current = imageUri;
      fetch(imageUri)
        .then(resp => resp.json())
        .then(tileSource => {
          if (requestedId.current === imageUri) {
            setTileSources([tileSource]);
          }
        });

      return;
    }
  }, [imageUri, tileSources]);

  if (!tileSources || tileSources.length === 0) {
    return <React.Fragment />;
  }

  if (children) {
    return functionOrMapChildren(children, {
      canvas,
      imageUri,
      tileSources,
      ...props,
    } as any);
  }

  if (preLoad) {
    return preLoad(allProps);
  }

  const tileSource = tileSources ? tileSources[0] : null;

  const fallbackImageUrl =
    tileSource && tileSource.type === 'image'
      ? tileSource.url
      : canvas.getCanonicalImageUri(fallbackWidth);

  return (
    <div>
      <img width={fallbackWidth} src={fallbackImageUrl} />
    </div>
  );
};

export default SingleTileSource;
