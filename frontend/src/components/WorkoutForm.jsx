import { useState } from "react";
import axios from 'axios'
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import WorkoutDetails from "./WorkoutDetails";


const WorkoutForm = ({handleEdit}) => {
    const {dispatch} = useWorkoutsContext()
    const {user} = useAuthContext()

    const [title, setTitle] = useState('')
    const [load,setLoad]= useState('')
    const [reps,setReps] = useState('')
    const [error,setError] = useState(null)
    const [emptyFields,setEmptyFields] =useState([])

    
    const handleSubmit = async(e)=>{
        e.preventDefault()

        if(!user){
            setError('you must be logged in ')
            return 
        }

         await axios.post('/api/workouts',{
            title,
            load,
            reps  
        },{
            headers:{
                'Authorization' : `Bearer ${user.token}`
            }
        })
        .then(data=>{
            setError(null)
            setTitle('')
            setLoad('')
            setReps('')
            setEmptyFields([])
            dispatch({type:'CREATE_WORKOUT', payload: data.data})

            return data
        })
        .catch(error =>{
            console.log(error.response)
            setError(error.response.data.errorMessage)
            setEmptyFields(error.response.data.emptyFields)
        })
             
        //    console.log(err.response.data.error)
        
      
       

        
    
      
    }
    
    return ( 
        <div>
            <form className="create" onSubmit={handleSubmit}>
                <h3>Create new workout</h3>
                <label>Exersize title : </label>
                <input 
                type="text"
                name="title"
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                className={emptyFields.includes('title') ? 'error' : ''}
                />

                <label>Exersize load (kg) : </label>
                <input 
                type="number"
                name="load"
                value={load}
                onChange={(e)=>setLoad(e.target.value)}
                className={emptyFields.includes('load') ? 'error' : ''}
                />

                <label>Exersize reps : </label>
                <input 
                type="number"
                name="reps"
                value={reps}
                onChange={(e)=>setReps(e.target.value)}
                className={emptyFields.includes('reps') ? 'error' : ''}
                />
                
                <button type="submit">Add Excersize</button>
            </form>

            {error && <p className="error">{error}</p>}

        </div>
     );
}
 
export default WorkoutForm;