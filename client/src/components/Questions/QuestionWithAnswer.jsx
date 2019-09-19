import React from 'react';
import moment from 'moment';

function QuestionWithAnswer({ questionAsked }) {
  const { question, answer, asker, dateAsked, dateAnswered, helpfulCount,
    unhelpfulCount, nameOfResponder, teamMember } = questionAsked;

  const relativeDateAsked = moment(dateAsked, moment.defaultFormat).fromNow();
  const relativeDateAnswered = moment(dateAnswered, moment.defaultFormat).fromNow();

  if (teamMember) {
    var teamText = '*Team Member*';
  } else {
    teamText = '';
  }

  // return (
  //   <div className="questionWithAnswer">
  //     <p><strong>Q: {question}</strong></p>
  //     <p className='askerAndDateAsked'>{asker}—{relativeDateAsked}</p>
  //     <div className='answerDiv'>
  //     <p><span className='a'><strong>A: </strong></span>{answer}</p>
  //     <p className='answerDetails'>{nameOfResponder}-{relativeDateAnswered}
  //       <a><u>Helpful({helpfulCount}) </u></a>
  //       <a><u>Unhelpful({unhelpfulCount}) </u></a>
  //       <a><u>Report</u></a>
  //     </p>
  //     <div className='teamMember'>{teamText}</div>
  //     <button className='answerIt'>Answer it</button>
  //     </div>
  //   </div>
  // );
  return (
    <div className="questionWithAnswer">
      <p><strong>Q: {question}</strong></p>
      <p className='askerAndDateAsked'>{dateAsked}</p>
      <div className='answerDiv'>
      <p><span className='a'><strong>A: </strong></span>{answer}</p>
      <p className='answerDetails'>{dateAnswered}
        <a><u>Helpful({helpfulCount}) </u></a>
        <a><u>Unhelpful({unhelpfulCount || 0}) </u></a>
        <a><u>Report</u></a>
      </p>
      <div className='teamMember'>{teamText}</div>
      <button className='answerIt'>Answer it</button>
      </div>
    </div>
  );
}

export default QuestionWithAnswer;
