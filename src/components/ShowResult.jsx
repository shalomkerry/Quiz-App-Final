import { Link } from "react-router-dom"
import getQuestions from "../stores/getQuestions"

function ShowResult(){
    const questions = getQuestions.getState().questions
    let guess = getQuestions.getState().userIncorrectGuess

   console.log(guess.length) 
return(
    <>
    
    <h1>Answers</h1>
    <div className="showAnswer">
{questions && questions.map((item,index)=>(

<div key={item.id} className="showAnswerBackground">
        
    <p className="showAnswersQuestion">{item.question}</p>
    <ul className='answer-question__answers'>
        {[...item.options,item.answer].sort((a,b)=>(a<b?-1:1)).map((ele,ind)=>{
            if(ele===item.answer){
                return <li><button className="correctAnswerButton" >{ele}</button> </li>
            }
                if(!guess.includes(ele)){
return <li><button >{ele}</button></li>
                }

            return  <li><button className="incorrectAnswer">{ele}</button></li>
                
        }//show the options based on the answer given. incorrect answers will be different
)}
        
</ul>

    </div>
))}


    </div>
<div className="resultAnswerContainer">

    <Link to='/quiz'><button className="resultOptionsButtons">Go back <br/>to Quiz</button></Link>

 
    <Link to='/'> <button className="resultOptionsButtons">Go back <br/>to Home</button></Link>
    
</div>
    </>
    
)
}
export default ShowResult