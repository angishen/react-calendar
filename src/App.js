import React, { Component } from 'react';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import Calendar from './components/CalendarOld';
import './App.css';

import moment from 'moment';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Calendar!</h1>
      </div>
    );
  }
}

