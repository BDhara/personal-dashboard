import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { todoReducer } from "../redux/store";
import { configureStore } from '@reduxjs/toolkit';
import ToDoList from '../components/ToDoList';
import { Provider } from 'react-redux';

describe("GIVEN a Redux store created from the rootReducer", () => {
  let store;
  beforeEach(() => {
    store = configureStore({
      reducer: { todos: todoReducer }
    });
  });

  describe("WHEN this is passed to Root", () => {
    let getByLabelText, getByText, container, getByRole;
    beforeEach(() => {
      ({ getByLabelText, getByText, container, getByRole } = render(
        <Provider store={store}>
          <ToDoList />
        </Provider>
      ));
    });

    describe("AND when a todo is added", () => {
      beforeEach(() => {
        fireEvent.change(getByLabelText(/task-field/i), {
          target: { value: "My first todo" }
        });
        fireEvent.click(getByText(/add/i));
      });

      test("THEN the todo is visible", () => {
        expect(container).toHaveTextContent("My first todo");
      });
    });

    describe("AND when todos is removed", () => {
      beforeEach(() => {
        fireEvent.change(getByLabelText(/task-field/i), {
          target: { value: "My first todo" }
        });
        fireEvent.click(getByText(/add/i));
        fireEvent.click(getByText(/remove/i));
      });

      test("THEN the todo is not visible", () => {
        expect(container).not.toHaveTextContent("My first todo");
      });
    });

    describe("AND when todos is completed", () => {
      beforeEach(() => {
        fireEvent.change(getByLabelText(/task-field/i), {
          target: { value: "My first todo" }
        });
        fireEvent.click(getByText(/add/i));
        fireEvent.click(getByRole(/checkbox/i));        

      });

      test("THEN the todo is not visible", () => {    
        const listItems =  getByText(/My first todo/).closest('li');
        expect(listItems).toHaveClass('todoItem completed');
      });
    });
  });
});