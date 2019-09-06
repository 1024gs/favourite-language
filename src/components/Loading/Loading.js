import React from 'react';

const Loading = ({isLoading}) => {
  const markup = () => {
    if (!isLoading) {
      return null;
    }

    return <h4>Please wait...</h4>;
  };

  return markup();
};

export default Loading;
