// userprofile.test.jsx

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserProfile from '../components/UserProfile';

import { todoReducer } from "../redux/store";
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

describe('UserProfile Component', () => {
  test('renders dashboard with weather navigation active by default', () => {
    render(
      <UserProfile name="Dhara" email="dhara@gmail.com" />
    );
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();

    const weatherLinks = screen.getAllByText(/Weather/i);
    expect(weatherLinks[0]).toHaveClass('navItem active');
    expect(screen.getByText(/Todo/i)).not.toHaveClass('active');
  });

  test('displays user information popup on profile picture click', () => {
    render(
      <UserProfile name="Dhara" email="dhara@gmail.com" />
    );

    fireEvent.click(screen.getByAltText(/Profile/i));

    expect(screen.getByText(/Welcome, Dhara/i)).toBeInTheDocument();
    expect(screen.getByText(/dhara@gmail.com/i)).toBeInTheDocument();
  });

  test('switches to Todo page on Todo link click', async () => {
    let store = configureStore({
      reducer: { todos: todoReducer }
    });

    render(
      <Provider store={store}>
        <UserProfile name="Dhara" email="dhara@gmail.com" />
      </Provider>
    );

    userEvent.click(screen.getByText(/Todo/i));

    await waitFor(() => {
      expect(screen.getByText(/To-Do List/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/Todo/i)).toHaveClass('active');

    const weatherLinks = screen.getAllByText(/Weather/i);
    expect(weatherLinks[0]).not.toHaveClass('active');
  });
});
