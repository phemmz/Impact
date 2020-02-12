import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// const testData = [
//   {
//     id: '1',
//     name: 'TestName',
//     description: 'Lorem1 ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//     phoneNumber: '0802392389239',
//     email: 'test@gmail.com',
//     website: 'www.test.com',
//     category: ['mobile'],
//     images: [
//       'https://placeimg.com/288/164',
//       'https://placeimg.com/288/164',
//       'https://placeimg.com/288/164'
//     ]
//   },
// ]
localStorage.setItem('username', 'admin@email.com');
localStorage.setItem('password', '@Password123');
// localStorage.setItem('businesses', JSON.stringify(testData));

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
