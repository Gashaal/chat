import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
        navigator.serviceWorker
            .register('/sw.js')
            .then(function(reg) {
                if (reg.installing) {
                    console.log('Service worker installing');
                } else if (reg.waiting) {
                    console.log('Service worker installed');
                } else if (reg.active) {
                    console.log('Service worker active');
                }
            })
            .catch(function(error) {
                console.log('Registration failed with ' + error);
            });
    });
}
