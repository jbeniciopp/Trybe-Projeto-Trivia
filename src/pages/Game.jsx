import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Question from '../components/Question';

export default class Game extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <Header />
        <Question history={ history } />
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({}),
}.isRequired;
