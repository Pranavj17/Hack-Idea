import { render, screen } from '@testing-library/react';
import App from './App';
import Login from './components/login';

test('renders HACK IDEAS', () => {
  render(<App />);
  const linkElement = screen.getByText(/HACK IDEAS/i);
  expect(linkElement).toBeInTheDocument();
});

test('render login component in document', () => {
  render(<Login />);
})