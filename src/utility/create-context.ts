import * as React from 'react';

export function createContext<A>(defaultValue?: A) {
  const ctx = React.createContext<A | undefined>(defaultValue);
  function useContext() {
    const c = React.useContext(ctx);
    if (!c) throw new Error('useCtx must be inside a Provider with a value');
    return c;
  }
  return [useContext, ctx.Provider] as const;
}
