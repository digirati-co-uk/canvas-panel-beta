/* eslint-disable prettier/prettier */
// Ported.
import Manifest from './manifesto/Manifest/Manifest';
import Annotation from './components/Annotation/Annotation';
import Bem, { useBemClassName } from './components/Bem/Bem';
import AnnotationListProvider from './manifesto/AnnotationListProvider/AnnotationListProvider';
import AnnotationProvider from './manifesto/AnnotationProvider/AnnotationProvider';
import CanvasProvider from './manifesto/CanvasProvider/CanvasProvider';
import SingleTileSource from './components/SingleTileSource/SingleTileSource';
import CanvasNavigation from './components/CanvasNavigation/CanvasNavigation';
import parseSelectorTarget from '../utility/parse-target-selector';
import CanvasRepresentation from './components/CanvasRepresentation/CanvasRepresentation';
import functionOrMapChildren from '../utility/function-or-map-children';
import { AnnotationSelector } from '../utility/annotation-selector';

// Previous, untyped, still @todo.
const AnnotationCanvasRepresentation = require('@canvas-panel/core/es/components/AnnotationCanvasRepresentation/AnnotationCanvasRepresentation').default;
const AnnotationDetail = require('@canvas-panel/core/es/components/AnnotationDetail/AnnotationDetail').default;
const AnnotationRepresentation = require('@canvas-panel/core/es/components/AnnotationRepresentation/AnnotationRepresentation').default;
const EditableAnnotation = require('@canvas-panel/core/es/components/EditableAnnotation/EditableAnnotation').default;
const Fullscreen = require('@canvas-panel/core/es/components/Fullscreen/Fullscreen').default;
const ObservableElement = require('@canvas-panel/core/es/components/ObservableElement/ObservableElement').default;
const LocaleString = require('@canvas-panel/core/es/manifesto/LocaleString/LocaleString').default;
const RangeNavigationProvider = require('@canvas-panel/core/es/manifesto/RangeNavigationProvider/RangeNavigationProvider').default;
const FullPageViewport = require('@canvas-panel/core/es/viewers/FullPageViewport/FullPageViewport').default;
const OpenSeadragonViewer = require('@canvas-panel/core/es/viewers/OpenSeadragonViewer/OpenSeadragonViewer').default;
const OpenSeadragonViewport = require('@canvas-panel/core/es/viewers/OpenSeadragonViewport/OpenSeadragonViewport').default;
const SizedViewport = require('@canvas-panel/core/es/viewers/SizedViewport/SizedViewport').default;
const StaticImageViewport = require('@canvas-panel/core/es/viewers/StaticImageViewport/StaticImageViewport').default;
const Viewport = require('@canvas-panel/core/es/viewers/Viewport/Viewport').default;
const htmlElementObserver = require('@canvas-panel/core/es/utility/htmlElementObserver').default;
const Responsive = require('@canvas-panel/core/es/utility/Responsive').default;

function withBemClass() {
  throw new Error(
    `with BEM Class removed, it has been replaced with useBemClassName('name') hook`
  );
}

export {
  // Components.
  Annotation,
  AnnotationCanvasRepresentation,
  AnnotationDetail,
  AnnotationRepresentation,
  Bem,
  useBemClassName,
  CanvasNavigation,
  CanvasRepresentation,
  Fullscreen,
  SingleTileSource,
  ObservableElement,
  EditableAnnotation,
  // Manifesto
  AnnotationListProvider,
  AnnotationProvider,
  CanvasProvider,
  LocaleString,
  Manifest,
  RangeNavigationProvider,
  // Viewers
  FullPageViewport,
  OpenSeadragonViewer,
  OpenSeadragonViewport,
  SizedViewport,
  StaticImageViewport,
  Viewport,
  // Utils
  AnnotationSelector,
  Responsive,
  functionOrMapChildren,
  htmlElementObserver,
  withBemClass,
  parseSelectorTarget,
};
