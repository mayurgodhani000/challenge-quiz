import React from 'react'
import { Row, Col } from 'reactstrap'
import StarRatings from 'react-star-ratings'

const Question = ({category, options, isCorrect, question, difficulty, onSelectOption, selectedOption, currentIndex = 0, correctIndex, total}) => {
  const onSelect = (index) => {
    if (!isCorrect && isCorrect !== false) {
      onSelectOption(index)
    }
  }
  const difficulties = {
    hard: 3,
    medium: 2,
    easy: 1,
  }
  return (
    <div className="question">
      <h2>Question {currentIndex + 1} of {total}</h2>
      <small>{decodeURIComponent(category)}</small>
      <div className="ratings mb-3">
        <StarRatings
          rating={difficulties[difficulty] || 0}
          starDimension="15px"
          starRatedColor="grey"
          numberOfStars={3}
          name='rating'
        />
      </div>
      <h4>{decodeURIComponent(question)}</h4>
      <Row className="options">
        { options.map((option, index) =>
          <Col md="6" sm="12" className="option" key={`option-${index}`}>
            <div
              className={`option-box ${(isCorrect || isCorrect === false) && correctIndex === index ? 'success' : (selectedOption === index ? 'failed' : 'default')}`}
              onClick={() => onSelect(index)}>
              {decodeURIComponent(option)}
            </div>
          </Col>
        ) }
      </Row>
    </div>
  )
}

export default Question
