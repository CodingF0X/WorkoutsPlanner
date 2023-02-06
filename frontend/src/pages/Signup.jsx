import axios from "axios";
import { useState , useEffect } from "react";
import  { useNavigate } from 'react-router-dom'
import { useAuthContext } from "../hooks/useAuthContext";

const Signup = () => {
    const {dispatch} = useAuthContext()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [error, setError] = useState(null)
    // const [emptyFields,setEmptyFields]=useState([])
    const navigate = useNavigate();


    const handleSubmit =async (e)=>{
        e.preventDefault()

        try{

            const addUSer = await axios.post('/api/users/signup',{
                email,
                password
            })

           if(addUSer){
            setEmail('')
            setPassword('')
            setError('')
            localStorage.setItem('user',JSON.stringify(addUSer.data))           
            dispatch({type:'LOGIN', payload : addUSer.data})
            }

            return addUSer.data
        }

        catch(error){
            setError(error.response.data.error)
            // setEmptyFields(error.response.data.emptyFields)
            console.log(error)
        }


    }


        // useEffect(() => {
        //   setTimeout(() => {
        //     // 👇 Redirects to about page, note the `replace: true`
        //     navigate('/', { replace: true });
        //   }, 3000);
        // }, []);

        // return <div>Redirecting...</div>;



    return (
        <div>
            <form  className="signup" onSubmit={handleSubmit}>

                <div className="login-logo">
                <i className="fa-solid fa-user"></i>
                    <br />
                    Signup
                </div>


                <label >Email  </label>
                <input
                type="email"
                name="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                // className={emptyFields.includes('email') ?'error' : ''}
                />

                <label >Password </label>
                <input
                type="password"
                name="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                // className={emptyFields.includes('password') ?'error' : ''}

                />

                <button className="user-form-btn" type="submit">SignUp</button>

                {error && <p className="error">{error}</p>}


            </form>




        </div>
     );
}

export default Signup;