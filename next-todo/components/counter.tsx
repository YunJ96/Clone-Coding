'use client';

import { ReactNode, useState } from 'react';
import { Button } from '@nextui-org/button';

export const Counter = ({
  initialCount,
  children,
}: {
  initialCount: number;
  children: ReactNode;
}) => {
  const [count, setCount] = useState(initialCount);

  return (
    <>
      <Button radius='full' onPress={() => setCount(count + 1)}>
        Count is {count}
      </Button>
      {children}
    </>
  );
};
