import React, { useState, useEffect } from 'react'
import { QuestionList } from '../component/QuestionList';
import { Api } from '../api'


const initialState = {
  questionList: [],
  isLoading: true,
  error: ''
}

export function QuizContainer() {
  const [state, setState] = useState(initialState)
  
  useEffect(() => {
    
    const fetchQuestionsList = async () => {
      const data = await Api.fetchQuestions()
      const newState = {isLoading: false}
      if (!data || data.error) {
        newState.error = 'Some error while fetching questions. please try again later!'
      } else {
        const questionList = (data || []).map(question => {
          const correctIndex = Math.floor(Math.random() * ((question.incorrect_answers || [])).length + 1)
          const options = (question.incorrect_answers || [])
          if (options.length) {
            options.splice(correctIndex, 0, question.correct_answer)
          }
          return {
            ...question,
            selectedOption: -1,
            options,
            correctIndex,
          }
        })
        newState.questionList = questionList
      }
      if (!newState.error) {
        setState({...state, ...newState})
      } else {
        console.log(newState.error)
        window.alert(newState.error)
      }
    }
    
    fetchQuestionsList();
    
  }, []);
  
  if (state.isLoading) {
    return <div>loading...</div>
  }
  
  if (state.error) {
    return (<div className="color-danger">{state.error}</div>);
  }
  
  return (
    <QuestionList questions={state.questionList} />
  );
};