import { cleanup } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import ReactDOM from 'react-dom/client';
import Home from '../containers/home';
import userEvent from '@testing-library/user-event';
import { wait } from '@testing-library/user-event/dist/utils';

let container;

beforeEach(() => {
  const mockIntersectionObserver = jest.fn()
  mockIntersectionObserver.mockReturnValue({
    observe: jest.fn().mockReturnValue(null),
    unobserve: jest.fn().mockReturnValue(null),
    disconnect: jest.fn().mockReturnValue(null)
  })
  window.IntersectionObserver = mockIntersectionObserver;
  container = document.createElement('div');
  document.body.appendChild(container);
})
afterEach(() => {
  document.body.removeChild(container);
  container = null;
  cleanup();
});
const getChallenges = () => {
  return JSON.parse(window.sessionStorage.getItem('challenges')) || {};
};
it('render addChallenge/ideas', async () => {
  await wait();
  act(() => {
    ReactDOM.createRoot(container).render(<Home />);
  });
  const button = container.querySelector('button');
  let modal = container.querySelector('#modal');
  expect(modal).toEqual(null);
  act(() => {
    button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });
  modal = container.querySelector('#modal');
  expect(modal).toBeInTheDocument();
  const saveButton = modal.querySelector('#save')
  act(() => {
    saveButton.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });
  const error = container.querySelector('#homeError');
  expect(error).toBeInTheDocument();
  const title = container.querySelector('#form-title');
  const description = container.querySelector('#form-description');
  const tags = container.querySelector('#form-tags');
  userEvent.type(title, 'Testing title');
  userEvent.type(description, 'Testing description');
  userEvent.selectOptions(tags,'tech');
  act(() => {
    saveButton.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });
  modal = container.querySelector('#modal');
  expect(modal).toEqual(null);
  const challenges = getChallenges();
  expect(Object.values(challenges).length).toBeGreaterThanOrEqual(1);
});

it('rerender after challenges add', () => {
  act(() => {
    ReactDOM.createRoot(container).render(<Home />);
  });
})