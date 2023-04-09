import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Ranking extends Component {
  state = {
    local: [],
  };

  componentDidMount() {
    const local = JSON.parse(localStorage.getItem('ranking'));
    local.sort((a, b) => b.score - a.score);
    console.log(local);
    this.setState({
      local,
    });
  }

  render() {
    const { local } = this.state;
    return (
      <div data-testid="ranking-title" className="ranking">
        <ol>
          {
            local.map((player, index) => (
              <li key={ index }>
                <img src={ `https://www.gravatar.com/avatar/${md5(player.gravatarEmail).toString()}` } alt={ player.name } />
                <div className="name-ranking">
                  <p data-testid={ `player-name-${index}` }>{player.name}</p>
                </div>
                <div className="points-ranking">
                  <p data-testid={ `player-score-${index}` }>{player.score}</p>
                </div>
              </li>
            ))
          }
        </ol>
        <button
          data-testid="btn-go-home"
          type="button"
          onClick={ () => {
            const { history } = this.props;
            history.push('/');
          } }
        >
          Inicio

        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
const mapStateToProps = ({ player }) => ({
  player,
});
export default connect(mapStateToProps)(Ranking);
