import { Route, Router, Routes, useNavigate, Link, useLocation } from "react-router-dom";
import React,{useEffect, useMemo, useState} from "react";
import useQuiz from "../services/triviaApi";
import getQuestions from "../stores/getQuestions";
import AnswerQuestion from "./Answer";


const QuizPage = ({ category, difficulty, number }) => {

   const {pathname} = useLocation(); 
    const navigate = useNavigate();

    const wrongAnswer = getQuestions.getState().userIncorrectGuess; 
    const setWrongAnswer = getQuestions.getState().setUserGuess;
   const resetGuess = getQuestions.getState().resetGuess 
    const setQuestions = getQuestions.getState().setQuestions
    const questions = getQuestions.getState().questions
const [currentQuestionIndex,setCurrentQuestionIndex] =useState(0);
const [wrongGuess,setWrongGuess] = useState([]);
const [score, setScore] =useState(0)


useEffect(()=>{
    resetGuess()
    
},[])//the player guess resets on the first render
useEffect(()=>{
    window.scrollTo(0,0)
},[pathname])
function scrollUp(){
    window.scrollTo(0,0)
}
scrollUp();
if(category == null ||difficulty==null){
    return(
<>
<img src="./src/assets/images/error__desktop.png" className='error__desktop'alt="error message" />
      <button className='home__button' onClick={()=>navigate('/')}>Home</button>
</>
    )
}//if you have time make sure to use localStorage to get the questions even though they are refreshed
  const { quiz, isLoading, isError } = useQuiz(category, difficulty, number);//getting the questions from the api
    
  if (isLoading&&questions.length == 0) {
    return <div>Loading...
      <button onClick={()=>navigate('/')}>Home</button>
  </div>;
  }
if (isError && !questions.length == 0) return <div>Error loading questions.


      <button onClick={()=>navigate('/')}>Home</button>
  </div>;
  
let formattedQuestion = quiz?quiz.map((item,index)=>({
            id:index,
            category:item.category,
            question:item.question.text,
            answer:item.correctAnswer,
            options:item.incorrectAnswers,
            difficulty:item.difficulty
        })):[]

        const questionAll = !questions || questions.length === 0 ? formattedQuestion : questions; // if there are questions saved in state use them if get from the api(when the user replays a quiz)
        const numOfQuestions = quiz.length;
        console.log(quiz.length, questionAll.length, questions.length)
console.log(currentQuestionIndex)
let currentQuestion = questionAll[currentQuestionIndex];
let remainingNumberOfQuestions = questionAll.length-currentQuestionIndex
let gameState = 'not ready' | 'in progress' |'complete';
if(questionAll.length == 0){
    gameState = 'not ready'
}else if(remainingNumberOfQuestions>0){
    gameState = 'in progress'
}else {
    gameState = 'complete'
    setQuestions(questionAll)//saves all the questions to prepare for showing the correct and wrong answers
}
// 
const handleGuessAnswer = (guess)=>{
    if(guess === currentQuestion.answer){
        setScore(score+1)
    }else{
        setWrongGuess([...wrongGuess,guess])
        setWrongAnswer(guess)
    }


    setCurrentQuestionIndex(currentQuestionIndex+1)
}
const resetQuiz = ()=>{
    setCurrentQuestionIndex(0)
    setScore(0)
    console.log(wrongGuess)
    console.log(wrongAnswer)
    resetGuess();
    setWrongGuess([])
}
const newQuiz = ()=>{
    resetQuiz();
    navigate('/')
}
  return (

    <div>

      {currentQuestion && (

     
<>

<div className="questionMarkContainer">
<img className='questionMark' src="./src/assets/images/questionMark.png" alt="" />

     <div className="questionsBackground">

{currentQuestionIndex<numOfQuestions?
<h3 className="questionCount">{currentQuestionIndex+1}/{questionAll.length}</h3>:''
}
<AnswerQuestion
     key={currentQuestion.id}
     question={currentQuestion}
     index={currentQuestionIndex}
    onGuessAnswer={handleGuessAnswer} /> 

      <button className='home__button' onClick={()=>navigate('/')}>Quit</button>
    </div>

</div>
</>

      )}

{gameState === 'complete' && (
    
    <>
    <div className="showingResult">
<h1>The results are in</h1>
<div className="resultBackground">
{score==questionAll.length && (
    <p className="correctAnswer">You are on Fire</p>
)}
<p className="results"> You got {score} of {questionAll.length}</p>    
</div>
<div className="resultOptions">

{score!=questionAll.length &&(
<p className='choice__text'>Curios?</p> 
)}
<button className="resultOptionsButtons"><Link to='/result'>See Answers</Link></button>
{score!=questionAll.length &&(
<>

<p className='choice__text'>could do better?</p> 
<button className="resultOptionsButtons" onClick={resetQuiz}>Try the quiz Again</button>
</>
)}

<p className='choice__text'>try a new one?</p> 
<button className="resultOptionsButtons" onClick={newQuiz}>New Quiz</button>
</div>
    </div>
    </>
)}

        </div> 


  );
};

export default QuizPage;
