import { useReducer } from 'react'
import {createContext} from 'react'

export const workoutsContext = createContext()

export const workoutsReducer =(state,action)=>{
    switch(action.type){
        case 'SET_WORKOUTS':
            return{
                workouts:action.payload
            }
        case 'CREATE_WORKOUT':
            return{
                workouts:[action.payload,...state.workouts]
            }
        
        case 'EDIT_WORKOUT' :
            return{
                workouts:[...state.workouts,action.payload]
            }

        case 'DELETE_WORKOUT':
            return{
                workouts: state.workouts.filter(w => w._id !== action.payload._id) 

            }
        default :
        return state
    }
}

export const WorkoutsContextProvider=({children})=>{
    const [state,dispatch] = useReducer(workoutsReducer,{
        workouts:null
    })

    return(
        <workoutsContext.Provider value={{...state,dispatch}}>
            {children}
        </workoutsContext.Provider>
    )
}

