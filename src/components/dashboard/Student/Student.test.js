import React from 'react';
import { render, fireEvent,screen, waitFor } from '@testing-library/react';
import Student from './Student';
import '@testing-library/jest-dom/extend-expect'; 
import { getByLabelText, getByRole } from '@testing-library/dom';

describe('Student component', () => {
  it('should render the component and handle button click for enter attenadance', () => {
    const { getByText } = render(<Student />);
    
    // Assert that the component renders properly
    const enterAttendanceButton = screen.getByRole('button', { name: 'Enter Attendance' });

    expect(enterAttendanceButton).toBeInTheDocument();
    
    // Simulate button clicks and assert that the state is updated correctly
    fireEvent.click(enterAttendanceButton);
    expect(screen.getByRole('button', { name: 'Enter Code' })).toBeInTheDocument();
  });

  it('should render the component and handle button click for view attendance', () => {
    const { getByText } = render(<Student />);
    
    // Assert that the component renders properly
    const viewAttendanceButton = screen.getByRole('button', { name: 'View Attendance' });

    expect(viewAttendanceButton).toBeInTheDocument();
    
    // Simulate button clicks and assert that the state is updated correctly
    fireEvent.click(viewAttendanceButton);

    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });
  
  it('should render the component and handle button click for apply OD', () => {
    const { getByText } = render(<Student />);
    
    // Assert that the component renders properly
    const applyODButton = screen.getByRole('button', { name: 'Apply OD' });

    expect(applyODButton).toBeInTheDocument();
    
    // Simulate button clicks and assert that the state is updated correctly
    fireEvent.click(applyODButton);
    expect(screen.getByRole('button', { name: 'Apply' })).toBeInTheDocument();
  });
});
