import React, { useState } from 'react';

export const UserName: React.FC = () => {
  const [username, setUserName] = useState<string>();
  return (
    <>
      <div role='contentinfo'>{username}</div>
      <button onClick={() => setUserName('bar')}></button>
      <input type='text' onChange={(e) => setUserName(e.target.value)} role='textbox'/>
    </>
  );
};
