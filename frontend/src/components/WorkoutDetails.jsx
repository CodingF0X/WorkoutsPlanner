import axios from "axios";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useAuthContext } from "../hooks/useAuthContext";
import WorkoutForm from "./WorkoutForm";


const WorkoutDetails = (props) => {
    const {dispatch} = useWorkoutsContext() 
    const {user} = useAuthContext()
    const {workouts} = useWorkoutsContext()


    const handleDelete=async ()=>{

        if(!user)
        return

         await axios.delete('/api/workouts/'+props.workout._id,{
            headers:{
                'Authorization' : `Bearer ${user.token}`
            }
         })
       
  
        .then(result=>{
            dispatch({type:'DELETE_WORKOUT', payload:result.data})
            
        })
        .catch(err=>{
            console.log(err.response.data.error)
        })
    }

  
    

    return ( 
    <div className="workout-details">
        <h2>{props.workout.title}</h2>
        <h4> <strong> Load (kg)</strong>  : {props.workout.load}</h4>
        <p> <strong>Reps :</strong> {props.workout.reps}</p>
        <div className="date">Added <span className="date-added">{formatDistanceToNow(new Date(props.workout.createdAt), {addSuffix:true})} </span> </div>
      
         <span 
         className="delete" >
         <i className="fa-solid fa-trash" onClick={handleDelete}></i> 
         {/* <i className="fa-solid fa-pen-to-square" ></i> */}
         </span>
    </div> );
}
 
export default WorkoutDetails;