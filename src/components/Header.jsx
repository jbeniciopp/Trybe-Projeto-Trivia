import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  state = {
    user: {
      name: '',
      gravatarEmail: '',
      image: '',
      score: 0,
    },
  };

  componentDidMount() {
    this.getUser();
  }

  getUser = () => {
    const { player: { name, gravatarEmail } } = this.props;
    // const hash = md5(gravatarEmail).toString();
    const image = `https://www.gravatar.com/avatar/${md5(gravatarEmail).toString()}`;

    this.setState({
      user: {
        name,
        gravatarEmail,
        image,
        score: 0,
      },
    });
  };

  render() {
    const { user } = this.state;
    const { player: { score } } = this.props;
    return (
      <header className="header-game">
        <div className="div-gravatar">
          <img
            src={ user.image }
            alt="user"
            data-testid="header-profile-picture"
            className="img-gravatar"
          />
          <h3 data-testid="header-player-name">{ user.name }</h3>
        </div>
        <div className="pontos">
          <h3>{'Pontos: '}</h3>
          <h3 data-testid="header-score">{ score }</h3>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    gravatarEmail: PropTypes.string,
    image: PropTypes.string,
  }),
}.isRequired;

const mapStateToProps = ({ player }) => ({
  player,
});

export default connect(mapStateToProps)(Header);
