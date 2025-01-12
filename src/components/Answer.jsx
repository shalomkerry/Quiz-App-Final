const AnswerQuestion = ({ question, index, onGuessAnswer }) => {
  const allAnswers = [question.answer, ...question.options].sort((a, b) => (a < b ? -1 : 1));

  return (

    <div className="answer-questions__card">

      <p className="answer-question__question">
         {question.question}
      </p>

        
      <ul className="answer-question__answers">
          
        <div className="answer-question__container">
        {allAnswers.map((answer) => (
<>

          <li key={answer}>

            <button onClick={() => onGuessAnswer(answer)}>{answer}</button>

          </li>


</>
        ))}

        </div>
          </ul>

    </div>
  );
};
export default AnswerQuestion