import axios from "axios";
import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import {Link} from 'react-router-dom'

const Login = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [error, setError] = useState(null)
    const {dispatch} = useAuthContext()

    const handleSubmit = async (e)=>{
        e.preventDefault()

        try{

            const userLogin = await axios.post('/api/users/login',{
                email,
                password
            })

            if(userLogin){
                setEmail('')
                setPassword('')
                setError(null)

                localStorage.setItem('user',JSON.stringify(userLogin.data))
                dispatch({type:'LOGIN', payload:userLogin.data})
                
                
                return userLogin.data
            }

            

        }
        catch(error){
            setError(error.response.data.error)
        }
       
    
    }

    return ( 
        <div>
            <form className="login" onSubmit={handleSubmit}>

                <div className="login-logo">  
                <i className="fa-solid fa-right-to-bracket"></i>
                <br />
                LOGIN
                </div>

                <label>email</label>
                <input 
                type="email"
                name="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                 />

                <label >password</label>
                <input 
                type="password" 
                name="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                />

                <button className="user-form-btn" type="submit">Login</button>
                <p>not registered yet ? <Link to='/signup'>Register</Link></p>
                {error && <p>{error}</p>}
            </form>

            
        </div>
     );
}
 
export default Login;