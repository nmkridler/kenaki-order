import React from 'react';
import store from './app/store';
import { Provider } from "react-redux";
import MenuBody from './components/menuBody.js';

import './App.css';

export default function App() {
  
  return (
    <Provider store={store}>
      <MenuBody />
    </Provider>
  );
}
