import React, { useState } from 'react';

const Test3: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <div>
      <h1>Counter: {count}</h1>
    </div>
  );
};

export default Test3;
