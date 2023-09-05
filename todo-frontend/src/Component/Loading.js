import React from 'react';
import ReactLoading from 'react-loading';

const Loading = () => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <ReactLoading
        type={'spokes'}
        color={'#03fc4e'}
        height={100}
        width={100}
      />
      <div></div>
    </div>
  );
};

export default Loading;
