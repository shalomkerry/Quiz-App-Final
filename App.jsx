import React, { useEffect } from 'react';
import {useState, useRef} from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Select from 'react-select';
import getQuestions from './src/stores/getQuestions'
import makeAnimated, { MultiValue, ValueContainer } from 'react-select/animated'
import QuizPage from './src/components/ShowQuiz'
import ShowResult from './src/components/ShowResult';
const category= [
{value:'general_knowledge,geography,film_and_tv,science,society_and_culture,history,sport_and_leisure,music,food_and_drink,general_knowledge', label:'Random'}, 
  {value:"general_knowledge", label:'General Knowledge',color:'#00B8D9'  },
  {value:"food_and_drink", label:'Food and Drink'},
  {value:"music", label:'Music'},
  {value:"sport_and_leisure", label:'Sport'},
  {value:"history", label:'History'},
  {value:"society_and_culture", label:'Society and Culture'},
  {value:"science", label:'Science'},
  {value:"film_and_tv", label:'Film and Tv'},
  {value:"geography", label:'geography'},
]

const customStylesCategory = { control: (provided,state) => ({...provided,

  backgroundColor:state.isFocused?'lightblue':'white',
    maxWidth: '800px', 
    minWidth: '200px',
    cursor:'default',
    fontSize:'1.4em'
  }),
  valueContainer:(provided)=>({
    ...provided,

    maxWidth:'400px',
    overflowY:'auto',

    fontSize:'1.4em'
  }),
  menu:(provided)=>({
    ...provided,
    color:'black',
    theme:'primary',

    fontSize:'1.4em'

  }),
  multiValue:(provided)=>({
    ...provided,
      display:'inline-flex',
      flexDirection:'row'

  })
  }
  const customStylesDifficulty = {control:(provided,state)=>({
    ...provided,
    backgroundColor:state.isFocused?'lightblue':'white',

    fontSize:'1.4em'
  }),
  
  valueContainer:(provided)=>({
    ...provided,
    pointerEvents:'none',

    fontSize:'1.4em'

  }),
menu:(provided)=>({
  ...provided,
  color:'black',
  theme:'primary',
    fontSize:'1.4em'
})
}
const difficulty = [
  {value:"easy", label:'Easy'},
  {value:"medium", label:'Medium'},
  {value:"hard", label:'Hard'},
  {value:'easy,medium,hard', label:'Random'}
]

const App = () => {
  const navigate = useNavigate(); //to change page 
  const location = useLocation();
  const selectInputRefCategory = useRef();
  const selectInputRef = useRef();
//user state
  const [categoryChoices, setCategoryChoice] = useState([]);
  const [difficultyChoice, setDifficultyChoice] = useState();
  const [number, setNumber] = useState(5);
//global state
const resetGuess = getQuestions.getState().resetGuess
const resetQuestions = getQuestions.getState().resetQuestions
  
const animatedComponent = makeAnimated();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!difficultyChoice || categoryChoices.length === 0) {
      alert("Please fill in the the choices appropriately");
      return;
    }
    navigate("/quiz");
    resetQuestions()//leaving room for new questions
    //to clear inputs 
  };
 function handleChange (selected){
const isRandomPresent = selected?.some((options)=>options.value.length>20)
if(isRandomPresent){
  setCategoryChoice([{value:'general_knowledge,geography,film_and_tv,science,society_and_culture,history,sport_and_leisure,music,food_and_drink,general_knowledge', label:'Random'}]) //if random is selected no other choice can be selected
}//if random is selected for categories no other option can be selected 
else{
setCategoryChoice(selected||[])
}
 }

  useEffect(()=>{
    if(location.pathname=='/'){
      setCategoryChoice([])
      setDifficultyChoice(null)
      setNumber(5)
    }
  },[location,setCategoryChoice,setDifficultyChoice,setNumber]) //in return to home no option will be opened
  

useEffect(()=>{
  resetGuess()
},[])//the player guess resets
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className='home'>

          <div className="content">

            <h1>Quiz Craze</h1>
           <h3 className='challenge__text'>Challenge Your Mind <br/> with exciting questions</h3> 
            <form className="w-9" onSubmit={handleSubmit}>
             <div className='choice categoryChoice'>
             <p className='choice__text'>Categories</p> 
              <Select
                ref={selectInputRefCategory}
                options={category} 
                isMulti
                onChange={handleChange}
                value={categoryChoices}
                closeMenuOnSelect={false}
                components={animatedComponent}
                styles={customStylesCategory}

              placeholder='pick a category'
              />
              </div> 
              <div className='choice difficultyChoice'>

             <p className='choice__text'>Difficulty</p> 
              <Select
                ref={selectInputRef}
                options={difficulty}
                value={difficultyChoice}
                onChange={setDifficultyChoice}
              placeholder='choose level of difficulty'
                styles={customStylesDifficulty}
              />

              </div>
              <div className="choice numberChoice">
              <label htmlFor="number" className='choice__text'>Number of<br/> Questions:</label><br/>
              <input
              
              type="number"
                id="number"
                placeholder='Enter a number'
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                min={5}
                max={25}
              />
              </div>

    <button type='submit'>Start Quiz

    </button>

            </form>
          </div>
          </div>

        }
      />
      <Route
        path="/quiz"
        element={
          <QuizPage
            category={categoryChoices.map((c) => c.value).join(",")} // an array of the categories then changed to a string with ','
            difficulty={difficultyChoice?.value}//passing the value to Quizpage ?. checks if its not undefined first
            number={number}
          />
        }
      />

    <Route
    path="/result"
    element={
      <ShowResult/>
    }
    />
    </Routes>
  );
};

export default App;
