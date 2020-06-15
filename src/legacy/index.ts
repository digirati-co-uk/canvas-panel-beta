/* eslint-disable prettier/prettier */
// Ported.
require('./openseadragon-node-compatibility');
import Manifest from './manifesto/Manifest/Manifest';
import Annotation from './components/Annotation/Annotation';
import Bem, { useBemClassName, withBemClass } from './components/Bem/Bem';
import AnnotationListProvider from './manifesto/AnnotationListProvider/AnnotationListProvider';
import AnnotationProvider from './manifesto/AnnotationProvider/AnnotationProvider';
import CanvasProvider from './manifesto/CanvasProvider/CanvasProvider';
import SingleTileSource from './components/SingleTileSource/SingleTileSource';
import CanvasNavigation from './components/CanvasNavigation/CanvasNavigation';
import parseSelectorTarget from '../utility/parse-target-selector';
import CanvasRepresentation from './components/CanvasRepresentation/CanvasRepresentation';
import functionOrMapChildren from '../utility/function-or-map-children';
import { AnnotationSelector } from '../utility/annotation-selector';
import RangeNavigationProvider from './manifesto/RangeNavigationProvider/RangeNavigationProvider';
import AnnotationCanvasRepresentation from './components/AnnotationCanvasRepresentation/AnnotationCanvasRepresentation';
import AnnotationRepresentation from './components/AnnotationRepresentation/AnnotationRepresentation';
import AnnotationDetail from './components/AnnotationDetail/AnnotationDetail';

// Previous, untyped, still @todo.
const EditableAnnotation = require('@canvas-panel/core/lib/components/EditableAnnotation/EditableAnnotation')
  .default;
const Fullscreen = require('@canvas-panel/core/lib/components/Fullscreen/Fullscreen')
  .default;
const ObservableElement = require('@canvas-panel/core/lib/components/ObservableElement/ObservableElement')
  .default;
const LocaleString = require('@canvas-panel/core/lib/manifesto/LocaleString/LocaleString')
  .default;
const FullPageViewport = require('@canvas-panel/core/lib/viewers/FullPageViewport/FullPageViewport')
  .default;
const OpenSeadragonViewer = require('@canvas-panel/core/lib/viewers/OpenSeadragonViewer/OpenSeadragonViewer')
  .default;
const OpenSeadragonViewport = require('@canvas-panel/core/lib/viewers/OpenSeadragonViewport/OpenSeadragonViewport')
  .default;
const SizedViewport = require('@canvas-panel/core/lib/viewers/SizedViewport/SizedViewport')
  .default;
const StaticImageViewport = require('@canvas-panel/core/lib/viewers/StaticImageViewport/StaticImageViewport')
  .default;
const Viewport = require('@canvas-panel/core/lib/viewers/Viewport/Viewport')
  .default;
const htmlElementObserver = require('@canvas-panel/core/lib/utility/htmlElementObserver')
  .default;
const Responsive = require('@canvas-panel/core/lib/utility/Responsive').default;

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
