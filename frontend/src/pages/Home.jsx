import axios from 'axios'
import { useEffect } from 'react'
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import {useAuthContext} from '../hooks/useAuthContext'



const Home = () => {
     const {workouts,dispatch} = useWorkoutsContext()
     const {user} = useAuthContext()

    useEffect(()=>{
        const fetchWorkouts = async (req,res)=>{
            const response = await axios.get('/api/workouts',{
                headers: {
                    'Authorization' : `Bearer ${user.token}`
                }
            })
            
            
           if(response.data)
            dispatch({type:'SET_WORKOUTS',payload:response.data})
            

          
        }
        if(user)
            return fetchWorkouts
    },[dispatch,user])
   

    return ( 
        <div className="home">
        
            <div>
                {workouts && workouts.map(workout=>(
                    <WorkoutDetails key={workout._id} workout={workout} />
                ))}
            </div>

            <div>
                <WorkoutForm />
            </div>

        </div>
     );
}
 
export default Home;