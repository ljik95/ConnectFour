import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import '../public/style.css'; // for css
import Kittens from './components/kittens';

ReactDOM.render(
  <Provider store={store}>
    <Kittens />
  </Provider>,
  document.getElementById('app') // make sure this is the same as the id of the div in your index.html
);
