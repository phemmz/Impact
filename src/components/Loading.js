import React from 'react';

const Loading = () => {
  return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <p>Loading...</p>
      </div>
    </div>
  );
}

export default Loading;
