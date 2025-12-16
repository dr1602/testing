import { useEffect, useState } from 'react';

export const Waiter = () => {
  const [waiter, setWaiter] = useState<string | null>(null);
  useEffect(() => {
    setTimeout(() => {
      setWaiter('passed');
    }, 2000);
  }, [setWaiter]);

  return <div role='alert'>{waiter}</div>;
};
