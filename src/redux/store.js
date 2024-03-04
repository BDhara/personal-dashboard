// store.js
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './reducer/todoReducer';

export { todoReducer };

const store = configureStore({
  reducer: {
    todos: todoReducer
  },
});

export default store;
