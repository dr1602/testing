import { useState } from 'react';

export const useCounter = (initialCount: number = 0) => {
  const [count, setCount] = useState<number>(initialCount);

  const increment = () => {
    setCount((prev) => prev + 1);
  };

  return { count, increment };
};
