import {workoutsContext} from '../context/WorkoutsContext'
import {useContext} from 'react'

export const useWorkoutsContext =()=>{
    const context = useContext(workoutsContext)

    if(!context){
        throw Error('not within the scope of context')
    }

    return context
}