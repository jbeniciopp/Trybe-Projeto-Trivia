import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { login } from '../redux/actions/playerAction';
import { resetScore } from '../redux/actions/resetState';

class Feedback extends Component {
  handleClick = () => {
    const { player: { name, score, gravatarEmail } } = this.props;
    const prevStorage = JSON.parse(localStorage.getItem('ranking') || '[]');
    localStorage.setItem(
      'ranking',
      JSON.stringify([...prevStorage, { name, score, gravatarEmail }]),
    );
    const { dispatch } = this.props;
    dispatch(resetScore());
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    const { player: { score, assertions }, history, dispatch } = this.props;
    const tres = 3;
    // console.log(this.props);
    return (
      <div data-testid="feedback-text" className="feedback-div">
        <Header />
        <div className="feedback">
          <h2 data-testid="feedback-text">
            { assertions < tres ? 'Could be better...' : 'Well Done!' }
          </h2>
          <div>
            <h2>
              Seu score é:
              {' '}
              <span data-testid="feedback-total-score">{score}</span>
            </h2>
            <h2>
              Você acertou:
              {' '}
              <span data-testid="feedback-total-question">{assertions}</span>
            </h2>
          </div>
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ () => {
            // console.log('clicou');
              dispatch(login({
                name: '',
                assertions: 0,
                score: 0,
                gravatarEmail: '',
              }));
              history.push('/');
            } }
          >
            Play Again
          </button>
          <button
            data-testid="btn-ranking"
            onClick={ this.handleClick }
          >
            Ranking
          </button>
        </div>
      </div>
    );
  }
}

Feedback.propTypes = {
  user: PropTypes.shape({
    assertions: PropTypes.number,
  }),
}.isRequired;

const mapStateToProps = ({ player }) => ({
  player,
});

export default connect(mapStateToProps)(Feedback);
