import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';

// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin();


ReactDOM.render(
  <App />,
  document.getElementById('root')
);
