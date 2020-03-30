import parseSelectorTarget from './parse-target-selector';
import { Annotation } from 'manifesto.js';

export type TextDir = 'ltr' | 'rtl' | 'auto';

export type Selector = {
  type?: string;
  value?: string;
  x: number;
  y: number;
  width?: number | null;
  height?: number | null;
};

export function parseAnnotation(annotation: Annotation) {
  const on = annotation.getOn() || annotation.getTarget();
  return on ? AnnotationSelector.parse(on) || undefined : undefined;
}

export class AnnotationSelector {
  static DIRECTION_LTR = 'ltr';
  static DIRECTION_RTL = 'rtl';
  static DIRECTION_AUTO = 'auto';

  static fromJsonLD(jsonLd: any) {
    return AnnotationSelector.parse(jsonLd);
  }

  static fromArray(multipleSelectors: any[]) {
    return multipleSelectors.map(annotation =>
      AnnotationSelector.parse(annotation)
    );
  }

  id?: string;
  format?: string;
  language?: string;
  processingLanguage?: string;
  textDirection?: TextDir;
  selector?: Selector | string;
  source?: string;

  constructor(
    id?: string,
    scale?: number,
    format?: string,
    language?: string,
    processingLanguage?: string,
    textDirection?: TextDir,
    selector?: Selector
  ) {
    if (
      textDirection &&
      textDirection !== AnnotationSelector.DIRECTION_AUTO &&
      textDirection !== AnnotationSelector.DIRECTION_LTR &&
      textDirection !== AnnotationSelector.DIRECTION_RTL
    ) {
      throw new Error('textDirection must be ONE of [ltr, rtl, auto]');
    }

    this.id = id;
    this.source = (id || '').split('#')[0];
    this.format = format;
    this.language = language;
    this.processingLanguage = processingLanguage;
    this.textDirection = textDirection;
    this.selector = AnnotationSelector.parseTarget(id, scale, selector);
  }

  static fromTarget(target: string, selector?: Selector) {
    const annotationSelector = new AnnotationSelector();
    annotationSelector.source = target;
    annotationSelector.selector = selector;
    return annotationSelector;
  }

  static parse(
    text:
      | string
      | Partial<{
          id: string;
          format: string;
          language: string;
          processingLanguage: string;
          textDirection: TextDir;
          source: string;
          selector: Selector;
        }>,
    scale = 1
  ) {
    if (!text) {
      return null;
    }

    if (typeof text === 'string') {
      return new AnnotationSelector(text, scale);
    }

    // https://www.w3.org/TR/annotation-model/#bodies-and-targets
    if (text.id) {
      return new AnnotationSelector(
        text.id,
        scale,
        text.format,
        text.language,
        text.processingLanguage,
        text.textDirection
      );
    }

    // https://www.w3.org/TR/annotation-model/#selectors
    if (text.source) {
      return new AnnotationSelector(
        text.source,
        scale,
        text.format,
        text.language,
        text.processingLanguage,
        text.textDirection,
        text.selector
      );
    }

    return null;
  }

  static parseTarget(source?: string, scale = 1, selector?: Selector) {
    let toParse = source;
    if (selector && selector.type === 'FragmentSelector') {
      toParse = `${source}#${selector.value}`;
    }

    if (!toParse) {
      return undefined;
    }

    let target = parseSelectorTarget(toParse, scale);
    if (target !== toParse) {
      return target;
    }
    return source;
  }

  toJSON() {
    if (
      !this.selector ||
      typeof this.selector === 'string' ||
      this.selector.x === null ||
      isNaN(Math.floor(this.selector.x)) ||
      this.selector.y === null ||
      isNaN(Math.floor(this.selector.y))
    ) {
      return this.source;
    }

    if (
      this.selector.width === null ||
      typeof this.selector.width === 'undefined' ||
      isNaN(this.selector.width) ||
      this.selector.height === null ||
      typeof this.selector.height === 'undefined' ||
      isNaN(this.selector.height)
    ) {
      return `${this.source}#xywh=${Math.floor(this.selector.x)},${Math.floor(
        this.selector.y
      )},0,0`;
    }

    return `${this.source}#xywh=${Math.floor(this.selector.x)},${Math.floor(
      this.selector.y
    )},${Math.floor(this.selector.width)},${Math.floor(this.selector.height)}`;
  }

  toString() {
    return this.id;
  }
}
