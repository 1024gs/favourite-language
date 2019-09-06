import React from 'react';
import ReactDOM from 'react-dom';
import MVFSpecial from './MVFSpecial';

const render = (component) => {
  const div = document.createElement('div');
  ReactDOM.render(component, div);
  return {
    container: div,
    unmount: ReactDOM.unmountComponentAtNode,
  };
};

describe('MVFSpecial', () => {
  const {container, unmount} = render(<MVFSpecial />);

  it('renders without crashing', () => {
    expect(container.innerHTML).toBeTruthy();
  });

  it('has class MVFSpecial', () => {
    expect(container.firstChild.classList.contains('MVFSpecial')).toBe(true);
  });

  afterAll(() => {
    unmount(container);
  });
});
