import { describe, expect, it } from 'vitest';
import { act, renderHook } from '@testing-library/react';

import { useCounter } from '../useCounter';

describe('useCounter', () => {
  it('should render initial count', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toEqual(0);
  });

  it('should render count ten with initial value as ten', () => {
    const { result } = renderHook(() => useCounter(10));
    expect(result.current.count).toEqual(10);
  });

  it('should incremente count', () => {
    const { result } = renderHook(() => useCounter());
    // agregas el add para esperar a que el hook actualice su estado despues de ejecutarse la función
    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toEqual(1);
  });
});
