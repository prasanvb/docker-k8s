import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Hello Prasan, welcome to react app/i);
  expect(linkElement).toBeInTheDocument();
});
