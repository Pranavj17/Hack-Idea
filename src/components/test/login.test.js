import { fireEvent, render, screen } from '@testing-library/react';
import LoginComponent from '../login';
import userEvent from '@testing-library/user-event'


describe('Test the login component', () => {
  test('render login with button and input employee id', async () => {
    render(
      <LoginComponent
        error=""
        onSubmit={() => {}}
        updateError={() => {}}
      />
    );
    const input = await screen.findByTestId('employeeId');
    expect(input).toBeInTheDocument();
    // fireEvent.change(input, {target: { value: 1 }});
    userEvent.type(input, "1");
    expect(input.value).toMatch(/\d+/g);
    const buttonList = await screen.findByRole('button');
    expect(buttonList).toBeInTheDocument();
    fireEvent.click(buttonList);
  })
});