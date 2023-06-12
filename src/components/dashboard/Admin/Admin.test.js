import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Admin from './Admin';

describe('Admin component', () => {
  beforeEach(() => {
    render(<Admin />);
  });

  test('renders page title', () => {
    const pageTitle = screen.getByText(/Smart Attendance System/i);
    expect(pageTitle).toBeInTheDocument();
  });

  test('opens View Database menu', () => {
    const viewDatabaseButton = screen.getByText(/View Database/i);
    fireEvent.click(viewDatabaseButton);
    const viewStudentsOption = screen.getByText(/View Students/i);
    expect(viewStudentsOption).toBeInTheDocument();
    fireEvent.click(viewDatabaseButton);
  });

  test('selects View Students option', () => {
    const viewDatabaseButton = screen.getByText(/View Database/i);
    fireEvent.click(viewDatabaseButton);
    const viewStudentsOption = screen.getByText(/View Students/i);
    fireEvent.click(viewStudentsOption);
  });

  test('opens  Create new Entry menu', () => {
    const createEntryButton = screen.getByText(/Create new Entry/i);
    fireEvent.click(createEntryButton);
    const createStudentOption = screen.getByText(/Create Student/i);
    expect(createStudentOption).toBeInTheDocument();
    fireEvent.click(createEntryButton);
  });

  test('selects Create Student option', () => {
    const createEntryButton = screen.getByText(/Create new Entry/i);
    fireEvent.click(createEntryButton);
    const createStudentOption = screen.getByText(/Create Student/i);
    fireEvent.click(createStudentOption);
  });
});
