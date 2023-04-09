import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Testes da página de Feedback', () => {
  it('Testando inputs de nome e email', ()  => {
    const { history } = renderWithRouterAndRedux(<App />, {
      player: {
        name: 'test',
        assertions: 1,
        score: 39,
        gravatarEmail: 'test@hotmail.com'
      }
    }, '/feedback')

    const playerName = screen.getByRole('heading', {level: 1,  name: /test/i})
    expect(playerName).toBeInTheDocument()

    const playerScore = screen.getByRole('heading', {level: 1,  name: /39/i})
    expect(playerScore).toBeInTheDocument()

    const playerImage = screen.getByRole('img', { name: /user/i })
    expect(playerImage).toBeInTheDocument()

    const message = screen.getByText("Could be better...")
    expect(message).toBeInTheDocument()

    const messageScore = screen.getByRole('heading', {  name: /seu score é: 39/i})
    expect(messageScore).toBeInTheDocument()
    
    const assertions = screen.getByRole('heading', {  name: /você acertou: 1/i})
    expect(assertions).toBeInTheDocument()

    const btnPlayAgain = screen.getByRole('button', { name: /play again/i })
    expect(btnPlayAgain).toBeInTheDocument()

    expect(history.location.pathname).toBe('/feedback')
    userEvent.click(btnPlayAgain)
    expect(history.location.pathname).toBe('/')
  })

  it('Testando inputs de nome e email', ()  => {
    const local = [
      {
          "name": "Bona",
          "score": 68,
          "gravatarEmail": "tryber@teste.com"
      },
      {
          "name": "asd",
          "score": 109,
          "gravatarEmail": "asdasdasdasd"
      },
      {
          "name": "João",
          "score": 0,
          "gravatarEmail": "j.beniciopp@gmail.com"
      },
  ]
    localStorage.setItem('ranking', JSON.stringify(local))

    const { history } = renderWithRouterAndRedux(<App />, {
      player: {
        name: 'test',
        assertions: 4,
        score: 153,
        gravatarEmail: 'test@hotmail.com'
      }
    }, '/feedback')

    const message = screen.getByText("Well Done!")
    expect(message).toBeInTheDocument()

    const btnRanking = screen.getByRole('button', {  name: /ranking/i})
    expect(btnRanking).toBeInTheDocument()

    expect(history.location.pathname).toBe('/feedback')
    userEvent.click(btnRanking)
    expect(history.location.pathname).toBe('/ranking')
    
    const player = screen.getByText("João")
    expect(player).toBeInTheDocument()

    const homeBtn = screen.getByTestId('btn-go-home')
    userEvent.click(homeBtn);
    expect(history.location.pathname).toBe('/')


  })
})
