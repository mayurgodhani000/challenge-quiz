import React, { useState } from 'react'
import { Progress, Button } from 'reactstrap'
import Question from './Question'
import ProgressBar from './ProgressBar'
import './quiz.css'

export function QuestionList ({questions}) {
  const [state, setState] = useState({questionsList: questions, currentIndex: 0})
  const {questionsList, currentIndex} = state

  if (!questionsList.length) {
    return (<div>No Questions found!</div>)
  }

  const onSelectOption = (index) => {
    questionsList[currentIndex].selectedOption = index
    questionsList[currentIndex].isCorrect = questionsList[currentIndex].correctIndex === questionsList[currentIndex].selectedOption
    setState({
      questionsList,
      currentIndex
    })
  }
  const onNextQuestion = () => {
    questionsList[currentIndex].isCorrect = questionsList[currentIndex].correctIndex === questionsList[currentIndex].selectedOption
    setState({
      currentIndex: currentIndex + 1,
      questionsList,
    })
  }

  const correctAnswers = questionsList.filter(x => x.isCorrect).length
  const totalQuestions = questionsList.length
  if (currentIndex >= totalQuestions) {
    return (
      <div className="questions-list">
        <h5>You've completed Quiz!</h5>
        <h5>Your score is <b>{correctAnswers}/{questionsList.length}</b>.</h5>
      </div>
    )
  }

  const currentQuestion = questionsList[currentIndex];
  const progress = ((currentIndex + 1) * 100) / totalQuestions
  const totalScore = (correctAnswers * 100) / totalQuestions
  const overallScore = parseFloat(((correctAnswers * 100) / ((currentIndex + (!currentQuestion.hasOwnProperty('isCorrect') ? 0 : 1)) || 1)) || 0).toFixed(2)
  const maxScore = ((correctAnswers + (totalQuestions - currentIndex - (!currentQuestion.hasOwnProperty('isCorrect') ? 0 : 1))) * 100) / totalQuestions
  
  return (
    <div className="questions-list">
      {
        currentIndex < totalQuestions &&
        <div className="mb-5">
          <Progress value={progress}/>
        </div>
      }
      
      <Question {...currentQuestion} total={questionsList.length} currentIndex={currentIndex}
                onSelectOption={onSelectOption}/>
      
      {
        !currentQuestion.hasOwnProperty('isCorrect') ? null :
          <h3 className="text-center mb-3 mt-3">
            { currentQuestion.isCorrect === false ? 'Sorry!' : 'Correct!' }
          </h3>
      }
      
      {
        currentIndex < totalQuestions && currentQuestion.hasOwnProperty('isCorrect') &&
        <div className="text-center">
          <Button
            disabled={((!currentQuestion.selectedOption && currentQuestion.selectedOption !== 0) || currentQuestion.selectedOption < 0) }
            color="secondary" size="md" onClick={onNextQuestion}>
            Next Question
          </Button>
        </div>
      }
      
      {
        currentIndex < totalQuestions &&
        <ProgressBar totalScore={totalScore} overallScore={overallScore} maxScore={maxScore}/>
      }
    </div>
  )
}