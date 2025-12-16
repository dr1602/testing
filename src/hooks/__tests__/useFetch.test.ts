import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import axios from 'axios';

import { useFetch } from '../useFetch';
import { act } from 'react';

type useFetchReturn = [
  {
    response: any | null;
    isLoading: boolean;
    error: any | null;
  },
  (options?: any) => void
];

describe('useFetch', () => {
  it('should render initial values', () => {
    const { result } = renderHook(() => useFetch('/todos'));

    const [{ error, isLoading, response }, doFetch] =
      result.current as useFetchReturn;
    expect(error).toEqual(null);
    expect(isLoading).toEqual(false);
    expect(response).toEqual(null);
    expect(doFetch).toBeDefined();
  });

  it('should render success values after fetch', async () => {
    const mockResponse = {
      data: [{ id: '1', text: 'foo', isCompleted: false }],
    };

    vi.spyOn(axios, 'request').mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useFetch('/todos'));
    const [_, doFetch] = result.current as useFetchReturn;
    // agregamos el act porque tenemos que esperar a que se ejecute el useEffect
    // we also add async and await because inside the useEffect we have an async call
    await act(async () => {
      doFetch();
    });

    const [{ error, isLoading, response }] = result.current as useFetchReturn;

    expect(error).toEqual(null);
    expect(isLoading).toEqual(false);
    expect(response).toEqual(mockResponse.data);
  });

  it('should render error', async () => {
    const mockReponse = {
      response: { data: 'Server error' },
    };
    //mockRejectedValue es para simular que el servidor tiró un error
    vi.spyOn(axios, 'request').mockRejectedValue(mockReponse);
    const { result } = renderHook(() => useFetch('/todos'));
    const [_, doFetch] = result.current as useFetchReturn;
    await act(async () => {
      doFetch();
    });

    const [{ error, isLoading, response }] = result.current as useFetchReturn;

    expect(error).toEqual('Server error');
    expect(isLoading).toEqual(false);
    expect(response).toEqual(null);
  });
});
