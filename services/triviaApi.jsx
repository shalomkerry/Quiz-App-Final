import useSWR from "swr";
import quizStore from "../stores/getQuiz";
import { useMemo } from "react";

const fetcher = (...args) => fetch(...args).then((res) => res.json());
const useQuiz = (category, difficulty, number) => {

const key = useMemo(()=>{
    if(!category || !difficulty || !number ) return null;
    return `https://the-trivia-api.com/v2/questions?categories=${category}&difficulties=${difficulty}&limit=${number}`
 
},[category, difficulty, number])
   console.log(key) 

  const {
    data,      
    error,     
    isValidating, 
  } = useSWR(key,fetcher,{
    revalidateOnFocus:false,//to stop it from refetching the api again and again
  });

  return {
    quiz: data,      
    isLoading: !error && !data, // Loading when there's no error or data
    isError: error,     
  };
};

export default useQuiz;
