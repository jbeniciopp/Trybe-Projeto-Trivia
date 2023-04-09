import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import sanitizeHtml from 'sanitize-html';
import { scorePoints } from '../redux/actions/scoreAction';
import { questionsAPI } from '../services/questionsAPI';

class Question extends Component {
  state = {
    question: {},
    // incorrect_answers: [],
    correctAnswer: '',
    answer: [],
    // category: '',
    // question: '',
    score: 0,
    // points: 0,
    isClicked: false,
    isDisabled: false,
    timer: 30,
    questionArray: [],
    round: 5,
    perguntasCertas: 0,
  };

  componentDidMount() {
    this.questionapi();
    this.countDowm();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  countDowm = () => {
    const time = 1000;
    this.interval = setInterval(() => {
      const { timer } = this.state;

      this.setState({ timer: timer - 1 });

      if (timer === 1) {
        clearInterval(this.interval);
        this.setState({ isDisabled: true });
      }
    }, time);
  };

  questionapi = async () => {
    const token = localStorage.getItem('token');
    const questionAPI = await questionsAPI(token);
    // console.log(questionAPI, 'questoes', token);
    if (questionAPI.response_code !== 0) {
      localStorage.removeItem('token');
      const { history } = this.props;
      history.push('/');
    } else {
      const { results } = questionAPI;
      const shuffleNumber = 0.5;
      const shuffleArray = [
        results[0].correct_answer,
        ...results[0].incorrect_answers,
      ];

      shuffleArray.sort(() => Math.random() - shuffleNumber);

      this.setState({
        questionArray: results,
        question: results[0],
        correctAnswer: results[0].correct_answer,
        answer: shuffleArray,
      });
    }
  };

  newQuestion = () => {
    const { round } = this.state;
    const { history } = this.props;
    this.setState({
      isClicked: false,
      isDisabled: false,
    });
    if (round !== 1) {
      return this.getNewQuestion();
    }
    history.push('/feedback');
  };

  getNewQuestion = () => {
    const { questionArray, question } = this.state;
    const newQuestion = questionArray.filter((e) => e !== question);

    const shuffleNumber = 0.5;
    const shuffleArray = [
      newQuestion[0].correct_answer,
      ...newQuestion[0].incorrect_answers,
    ];

    shuffleArray.sort(() => Math.random() - shuffleNumber);

    this.setState({
      questionArray: newQuestion,
      question: newQuestion[0],
      correctAnswer: newQuestion[0].correct_answer,
      answer: shuffleArray,
      round: newQuestion.length,
      timer: 30,
    });
  };

  onClickbutton = (e) => {
    const { dispatch } = this.props;
    const { correctAnswer, question: { difficulty }, timer } = this.state;
    const dez = 10;
    const answer = e.target.innerHTML;
    // console.log(difficulty);
    if (difficulty === 'hard' && correctAnswer === answer) {
      const difficultyPoints = 3;
      const pontos = dez + (timer * difficultyPoints);
      this.setState((prevState) => ({
        score: prevState.score + pontos,
        perguntasCertas: prevState.perguntasCertas + 1,
      }), () => {
        const { score, perguntasCertas } = this.state;
        dispatch(scorePoints({
          score,
          assertions: perguntasCertas,
        }));
      });
    } else if (difficulty === 'medium' && correctAnswer === answer) {
      const difficultyPoints = 2;
      const pontos = dez + (timer * difficultyPoints);
      this.setState((prevState) => ({
        score: prevState.score + pontos,
        perguntasCertas: prevState.perguntasCertas + 1,
      }), () => {
        const { score, perguntasCertas } = this.state;
        dispatch(scorePoints({
          score,
          assertions: perguntasCertas,
        }));
      });
    } else if (difficulty === 'easy' && correctAnswer === answer) {
      const difficultyPoints = 1;
      const pontos = dez + (timer * difficultyPoints);
      this.setState((prevState) => ({
        score: prevState.score + pontos,
        perguntasCertas: prevState.perguntasCertas + 1,
      }), () => {
        const { score, perguntasCertas } = this.state;
        dispatch(scorePoints({
          score,
          assertions: perguntasCertas,
        }));
      });
    }
    this.setState({
      isClicked: true,
      isDisabled: true,
    });
  };

  render() {
    const { question, correctAnswer, answer, isClicked, isDisabled, timer } = this.state;
    const clean = sanitizeHtml(question.question);
    return (
      <div className="games">
        <div className="game">
          <div className="categoria">
            <p data-testid="question-category">
              { question.category }
            </p>
          </div>
          <p
            className="pergunta"
            data-testid="question-text"
            // dangerouslySetInnerHTML={ { __html: clean } }
          >
            { clean }
          </p>
          <form
            data-testid="answer-options"
            className="button-question"
          >
            { answer.length > 0 && answer.map((element, idx) => {
              const clean1 = sanitizeHtml(element);
              return (
                <button
                  key={ idx }
                  data-testid={
                    correctAnswer === element
                      ? 'correct-answer'
                      : `wrong-answer-${idx}`
                  }
                  type="button"
                  className={
                    (isClicked && (correctAnswer === element
                      ? 'correct-answer'
                      : 'wrong-answer')).toString()
                    // toString Dica do Rafael Ribeiro
                  }
                  onClick={ this.onClickbutton }
                  disabled={ isDisabled }
                  // dangerouslySetInnerHTML={ { __html: clean1 } }
                >
                  { clean1 }
                </button>
              );
            })}
            <div>
              {
                isClicked && (
                  <button
                    data-testid="btn-next"
                    type="button"
                    onClick={ this.newQuestion }
                  >
                    Next
                  </button>)
              }
            </div>
            <p>{ `Tempo: ${timer}` }</p>
          </form>
        </div>
      </div>
    );
  }
}

Question.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect()(Question);
