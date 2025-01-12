import {create} from 'zustand';
const quizStore= create((set)=>{
    return {
        categories:[],
        setCategory:(category)=>set((state)=>{
            if(!state.categories.includes(category)){
                console.log([...state.categories])
                return {categories:[...state.categories,category]}
           }
           return state.categories
        }),
        resetCategory:()=>set({categories:[]}),
        difficulty:'',
        setDifficulty:(level)=>set({difficulty:level}),
        number:'',
        setNo:(num)=>set({number:num}),
        }
    
    }
)
export default quizStore;