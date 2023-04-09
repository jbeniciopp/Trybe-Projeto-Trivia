import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { requestAPI } from '../services/requestAPI';
import logo from '../images/logo trivia.png';
import trybe from '../images/ícone trybe.png';
import { login } from '../redux/actions/playerAction';

class Login extends Component {
  state = {
    disabled: true,
    player: '',
    email: '',
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState(
      {
        [name]: value,
      },
      this.validationButton,
    );
  };

  validationButton = () => {
    const { player, email } = this.state;
    this.setState({
      disabled: !(player && email),
    });
  };

  clickButton = async (e) => {
    e.preventDefault();
    const { history, dispatch } = this.props;
    const { email, player } = this.state;
    const api = await requestAPI();
    localStorage.setItem('token', api.token);
    dispatch(login({
      gravatarEmail: email,
      name: player }));
    history.push('/game');
  };

  render() {
    const { disabled } = this.state;
    const { history } = this.props;
    return (
      <form className="form-login">
        <img src={ logo } alt="logo" className="trivia-logo" />
        <div className="div-form">
          <input
            type="text"
            placeholder="Enter your name here"
            data-testid="input-player-name"
            name="player"
            onChange={ this.handleChange }
          />
          <input
            type="email"
            placeholder="Enter your email here"
            data-testid="input-gravatar-email"
            name="email"
            onChange={ this.handleChange }
          />
          <button
            className="button-play"
            type="submit"
            data-testid="btn-play"
            onClick={ this.clickButton }
            disabled={ disabled }
          >
            Play
          </button>
          <button
            className="button-config"
            type="button"
            data-testid="btn-settings"
            onClick={ () => history.push('/ranking') }
          >
            Ranking
          </button>
        </div>
        <img src={ trybe } alt="Logo da Trybe" />
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect()(Login);
