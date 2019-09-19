import React from 'react';
import QuestionWithAnswer from './QuestionWithAnswer';
import QuestionWithoutAnswer from './QuestionWithoutAnswer';

function Questions({ details }) {
  const questions = details.map((question) => {
    if (question.answer === ' null' || question.answer === null) {
      return (
           <QuestionWithoutAnswer questionAsked={question} />
      );
    }
    return (
      <div>
       <QuestionWithAnswer questionAsked={question} />
      </div>
    );
  });
  return (
    <div>
    <div className="question">
      {questions}
    </div>
    <div className="questionButtons">
      <button className="seeAllQuestions">see all questions</button>
      <button className="askAQuestion">Ask a question</button>
    </div>
    </div>
  );
}

export default Questions;
