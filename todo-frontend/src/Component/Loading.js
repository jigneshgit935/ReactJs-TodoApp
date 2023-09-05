import React from 'react';
import ReactLoading from 'react-loading';

const Loading = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <div>
        <h2 className="py-3">Loading Todo</h2>
      </div>
      <ReactLoading type={'spokes'} color={'#03fc4e'} height={80} width={80} />
    </div>
  );
};

export default Loading;
