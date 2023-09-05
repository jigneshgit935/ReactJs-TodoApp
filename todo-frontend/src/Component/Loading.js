import React from 'react';
import ReactLoading from 'react-loading';

const Loading = () => {
  return (
    <div className="d-flex flex-lg-column flex-row justify-content-center align-items-center">
      <div>
        <h2 className="py-3">Loading Todo...</h2>
      </div>
      <ReactLoading type={'spokes'} color={'#000'} height={60} width={60} />
    </div>
  );
};

export default Loading;
