import { fireEvent, render, screen } from '@testing-library/react';
import HomeComponent from '../home';

describe('Test home component', () => {
  test('render home component with header', () => {
    render(
      <HomeComponent
        handleNewEntry={() => {}}
        challenges={[]}
        updateChallenges={() => {}}
        isOpen={false}
        sortChallenges={() => {}}
      />
    );
    const linkElement = screen.getByText(/HACK IDEAS/i);
    expect(linkElement).toBeInTheDocument();
  });
});