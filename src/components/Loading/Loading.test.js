import React from 'react';
import ReactDOM from 'react-dom';
import Loading from './Loading';

const render = (component) => {
  const div = document.createElement('div');
  ReactDOM.render(component, div);
  return {
    container: div,
    unmount: ReactDOM.unmountComponentAtNode,
  };
};

describe('LoadingIndicator', () => {
  describe('when isLoading is false', () => {
    const {container, unmount} = render(<Loading isLoading={false} />);

    it('should not render', () => {
      expect(container.innerHTML).toBeFalsy();
    });

    afterAll(() => {
      unmount(container);
    });
  });

  describe('when isLoading is true', () => {
    const {container, unmount} = render(<Loading isLoading={true} />);

    it('should render', () => {
      expect(container.innerHTML).toBeTruthy();
    });

    afterAll(() => {
      unmount(container);
    });
  });
});
