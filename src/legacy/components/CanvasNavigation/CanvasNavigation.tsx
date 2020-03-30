import React from 'react';
import { useBemClassName } from '../Bem/Bem';
import { useCanvas } from '../../../manifesto/Canvas/CanvasProvider';

export const CanvasNavigation: React.FC = () => {
  const { nextCanvas, prevCanvas } = useCanvas();
  const bem = useBemClassName('canvas-navigation');

  return (
    <div className={bem}>
      <button className={bem.element('previous')} onClick={nextCanvas}>
        Prev
      </button>
      <button className={bem.element('next')} onClick={prevCanvas}>
        Next
      </button>
    </div>
  );
};

export default CanvasNavigation;
