import React, { useMemo } from 'react';
import { createContext } from '../../utility/create-context';
import { AnnotationList } from 'manifesto.js';

type AnnotationListContext = {
  annotationList: AnnotationList;
};

const [useAnnotationList, InternalAnnotationListProvider] = createContext<
  AnnotationListContext
>();

export { useAnnotationList };

export const AnnotationListProvider: React.FC<{
  annotationList: AnnotationList;
}> = ({ annotationList, children }) => {
  return (
    <InternalAnnotationListProvider
      value={useMemo(() => ({ annotationList }), [annotationList])}
    >
      {children}
    </InternalAnnotationListProvider>
  );
};
