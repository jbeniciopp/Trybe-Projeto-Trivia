import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App'
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Testes da página de Login', () => {
  it('Testando inputs de nome e email', async ()  => {
    const { history } =  renderWithRouterAndRedux(<App />)

    const inputPlayer = screen.getByTestId('input-player-name')
    expect(inputPlayer).toBeInTheDocument()

    const inputEmail = screen.getByTestId('input-gravatar-email')
    expect(inputEmail).toBeInTheDocument()
    

    const button = screen.getByRole('button', { name: 'Play' })
    expect(button).toBeInTheDocument()

    expect(button).toBeDisabled()

    const mockPlayer = 'Teste'
    userEvent.type(inputPlayer, mockPlayer)
    expect(inputPlayer.value).toBe('Teste')

    const mockEmail = 'teste@teste.com'
    userEvent.type(inputEmail, mockEmail)
    expect(inputEmail.value).toBe('teste@teste.com')

    const { pathname } = history.location
    expect(pathname).toBe('/')
    
    expect(button).toBeEnabled()
    userEvent.click(button)
    
    await waitFor(() => {
      expect(screen.getByRole('img', {
        name: /user/i
      })).toBeInTheDocument()
    })
    expect(history.location.pathname).toBe('/game')
  })
  it('Testando butão settings', async ()  => {
    const { history } =  renderWithRouterAndRedux(<App />)

    const btnSettings = screen.getByRole('button', { name: 'Configuração' })
    expect(btnSettings).toBeInTheDocument()
    
    userEvent.click(btnSettings)
    const { pathname } = history.location
    expect(pathname).toBe('/settings')
  })
})
