import { Component, useEffect, useState } from 'react';
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
  const ctxCanvas = useCanvas();
  const canvas = (props.canvas ? props.canvas : ctxCanvas.canvas) as Canvas;

  const [imageUri, setImageUri] = useState<string | null>();
  const [tileSources, setTileSources] = useState<any[] | undefined>();

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
      }

      fetch(imageUri)
        .then(resp => resp.json())
        .then(tileSource => setTileSources([tileSource]));

      return;
    }
  }, [imageUri, tileSources]);

  if (!tileSources) {
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
