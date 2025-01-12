import { create } from "zustand";
const getQuestions = create((set)=>{
    return{
     questions:[],
     setQuestions:(question)=>set(()=>{
       return {questions:question} 
     }),   
     resetQuestions:()=>set(()=>{
      return {questions:[]}
     }),
     userIncorrectGuess:[], //to show the wrong choices
     setUserGuess:(guess)=>set((state)=>{
      return {userIncorrectGuess:[...state.userIncorrectGuess,guess]}
     }),
     resetGuess:()=>set(()=>{
      return {userIncorrectGuess:[]}
     }),
     quizHistory:[],
     setQuizHistory:(answer,question)=>set((state)=>{
      return {quizHistory:[state.questions,userIncorrectGuess]}
     })
}
})
export default getQuestions;