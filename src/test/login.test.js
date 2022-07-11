import { render, screen } from '@testing-library/react';
import Login from '../containers/login';
import { act } from 'react-dom/test-utils';
import ReactDOM from 'react-dom/client';
import userEvent from '@testing-library/user-event';

let container;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}))

test('render login component in document', () => {
  render(<Login />);
    const linkElement = screen.getByText(/HACK IDEAS/i);
    const EmployeeId = screen.getByText(/Employee ID/i);
    expect(EmployeeId).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
});

it('render button and check click event', () => {
  act(() => {
    ReactDOM.createRoot(container).render(<Login />);
  });
  const button = container.querySelector('button');
  const textInput = container.querySelector('input');
  expect(textInput).toBeInTheDocument();
  expect(button).toBeInTheDocument();
  act(() => {
    button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });
  expect(container.querySelector("#loginError")).toBeInTheDocument();
  userEvent.type(textInput, '1');
  act(() => {
    button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });
  expect(mockNavigate).toHaveBeenCalledTimes(1)
})