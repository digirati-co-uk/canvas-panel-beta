import { Canvas, Manifest, Range } from 'manifesto.js';
import React, { Component } from 'react';
import functionOrMapChildren from '../../../utility/function-or-map-children';
import extractCanvasAndRegionsFromRange from '../../../utility/extractCanvasAndRegionsFromRange';
import { CanvasProvider } from '../..';

type Props = {
  manifest?: Manifest;
  rangeId?: string; // defaults to top level.
  rangeViewingHint?: string; // @todo later for selecting range.
  fallbackToTop?: boolean;
  fallbackToSequence?: boolean;
  children: (ops: {
    nextRange: () => void;
    previousRange: () => void;
    getNextRange: () => null | undefined | Canvas;
    getPreviousRange: () => null | undefined | Canvas;
    goToRange: (key: number) => void;
    currentIndex: number;
    rangeId?: string;
    range?: Range;
    canvasList: string[];
    region: any;
    currentCanvasId: string | null;
    canvas?: Canvas | null;
  }) => any;
  // For controlled input
  currentIndex?: number;
  onNavigate?: (index: number, canvasId: string) => void;
  controlled?: boolean;
};

type State = {
  currentIndex: number;
  currentRange?: string;
  currentRangeObject?: Range;
  canvasList: Array<string>;
  regionList: Array<any>;
};

type RangeLike = {
  range?: Range;
  canvasList: Array<string>;
  regionList: Array<any>;
  id: string;
};

class RangeNavigationProvider extends Component<Props, State> {
  state = {
    currentIndex: 0,
    currentRangeObject: undefined,
    currentRange: undefined,
    canvasList: [],
    regionList: [],
  };

  static defaultProps = {
    fallbackToTop: true,
    fallbackToSequence: true,
    controlled: false,
  };

  componentWillMount() {
    const matchingRange = this.getMatchingRange(this.props);
    if (matchingRange) {
      return this.setState({
        currentRangeObject: matchingRange.range,
        currentRange: matchingRange.id,
        canvasList: matchingRange.canvasList,
        regionList: matchingRange.regionList || [],
      });
    }
  }

  getMatchingRange({ manifest, rangeId, rangeViewingHint }: Props): RangeLike {
    const allRanges: Array<Range> = manifest ? manifest.getAllRanges() : [];

    const matchingRange: Range | null = allRanges.reduce(
      (match: Range | null, next: Range) => {
        if (match) return match;

        // Allow exact match range.
        if (rangeId && next.id === rangeId) {
          return next;
        }

        const nextViewingHint = next.getViewingHint();
        // Allow by viewing hint.
        if (
          rangeViewingHint &&
          nextViewingHint &&
          nextViewingHint.toString() === rangeViewingHint
        ) {
          return next;
        }

        // Also allow sequences.
        const behavior = next.getBehavior();
        if (behavior && behavior.toString() === 'sequence') {
          return next;
        }

        return null;
      },
      null
    );

    if (matchingRange) {
      const { canvases, regions } = extractCanvasAndRegionsFromRange(
        matchingRange
      );

      return {
        range: matchingRange,
        id: matchingRange.id,
        canvasList: canvases,
        regionList: regions,
      };
    }

    if (!manifest) {
      throw new Error();
    }

    return {
      range: undefined,
      id: manifest.id,
      regionList: [], // @todo maybe points of interest will be somewhere else?
      canvasList: manifest
        .getSequenceByIndex(0)
        .getCanvases()
        .map((canvas: Canvas) => canvas.id),
    };
  }

  componentWillReceiveProps(newProps: Props, newContext: any) {
    if (
      newProps.currentIndex !== this.props.currentIndex &&
      newProps.currentIndex !== this.state.currentIndex
    ) {
      // We have a controlled input.
      this.setState({ currentIndex: newProps.currentIndex || 0 });
    }

    if (
      newProps.rangeId !== this.props.rangeId ||
      newProps.rangeViewingHint !== this.props.rangeViewingHint ||
      newProps.manifest !== this.props.manifest
    ) {
      const matchingRange = this.getMatchingRange(this.props);
      this.setState({
        currentRangeObject: matchingRange.range,
        currentRange: matchingRange.id,
        canvasList: matchingRange.canvasList,
        regionList: matchingRange.regionList || [],
      });
    }
  }

  nextRange = () => {
    const { currentIndex, canvasList } = this.state;

    if (currentIndex >= canvasList.length - 1) {
      return;
    }

    this.goToRange(currentIndex + 1);
  };

  previousRange = () => {
    const { currentIndex } = this.state;

    if (currentIndex === 0) {
      return;
    }

    this.goToRange(currentIndex - 1);
  };

  goToRange = (newIndex: number) => {
    const { controlled } = this.props;
    const { canvasList } = this.state;

    if (!controlled) {
      this.setState({
        currentIndex: newIndex,
      });
    }

    if (this.props.onNavigate) {
      this.props.onNavigate(newIndex, canvasList[newIndex]);
    }
  };

  getCanvasAtIndex = (currentIndex: number) => {
    const { manifest } = this.props;
    const { canvasList } = this.state;

    try {
      return manifest && canvasList.length !== 0
        ? manifest.getSequenceByIndex(0).getCanvasById(canvasList[currentIndex])
        : null;
    } catch (err) {
      return null;
    }
  };

  getNextRange = (currentIndex: number) => () => {
    const { canvasList } = this.state;

    if (currentIndex >= canvasList.length - 1) {
      return;
    }

    return this.getCanvasAtIndex(currentIndex + 1);
  };

  getPreviousRange = (currentIndex: number) => () => {
    if (currentIndex === 0) {
      return;
    }

    return this.getCanvasAtIndex(currentIndex - 1);
  };

  render() {
    const { children, ...props } = this.props;
    const {
      currentIndex,
      currentRange,
      canvasList,
      regionList,
      currentRangeObject,
    } = this.state;

    if (!props.manifest) {
      return null;
    }

    const canvas =
      canvasList.length !== 0
        ? props.manifest
            .getSequenceByIndex(0)
            .getCanvasById(canvasList[currentIndex])
        : null;

    const region = regionList.length !== 0 ? regionList[currentIndex] : null;

    return (
      <CanvasProvider currentCanvas={currentIndex}>
        {functionOrMapChildren(children, {
          ...props,
          nextRange: this.nextRange,
          previousRange: this.previousRange,
          getNextRange: this.getNextRange(currentIndex),
          getPreviousRange: this.getPreviousRange(currentIndex),
          goToRange: this.goToRange,
          currentIndex,
          rangeId: currentRange,
          range: currentRangeObject,
          canvasList,
          region,
          currentCanvasId: canvas ? canvas.id : null,
          canvas,
        })}
      </CanvasProvider>
    );
  }
}

export default RangeNavigationProvider;
