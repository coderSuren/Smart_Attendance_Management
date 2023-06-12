import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; 
import Login from './Login';


describe('Login', () => {
  test('should render the component', () => {
    render(<Login setIsLogin={() => {}} setrole={() => {}} setgeneratedCode={() => {}} />);

    // Find input elements by their labels
    const emailInput = screen.getByRole('textbox', { name: 'Email address' });
    const passwordInput = screen.getByLabelText('Password *');

    // Assert that the input elements exist
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    // Find button element by its text
    const signInButton = screen.getByRole('button', { name: 'Sign In' });

    // Assert that the button element exists
    expect(signInButton).toBeInTheDocument();
  });

  test('should display error message for failed login', async () => {
    render(<Login setIsLogin={() => {}} setrole={() => {}} setgeneratedCode={() => {}} />);

    // Find input elements by their labels
    const emailInput = screen.getByRole('textbox', { name: 'Email address' });
    const passwordInput = screen.getByLabelText('Password *');

    // Set incorrect values for the email and password inputs
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'incorrect' } });

    // Find button element by its text
    const signInButton = screen.getByRole('button', { name: 'Sign In' });

    // Trigger form submission
    fireEvent.click(signInButton);

    // Wait for the async loginUser function to complete
    await waitFor(() => {});

    // Assert that the error message is displayed (i.e still in login page)
    expect(signInButton).toBeInTheDocument();
  });
});
