import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; 
import Faculty from './Faculty';
import { addConsoleHandler } from 'selenium-webdriver/lib/logging';

describe('Faculty Component', () => {
  test('renders the form elements correctly', () => {
    render(<Faculty />);
    
    // Assert that the form elements are rendered
    expect(screen.getByText('Select Subject:')).toBeInTheDocument();
    expect(screen.getByText('Select Timeslot:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Generate Captcha' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Generate Code' })).toBeInTheDocument();
    expect(screen.getByText('Generated Code:')).toBeInTheDocument();
  });
});
