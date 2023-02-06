import {Link} from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import useLogout from '../hooks/useLogout'

const Navbar = () => {
    const {user} = useAuthContext()
    //const {dispatch} = useAuthContext()
    const {logout} = useLogout()

    const handleLogout=  (e)=>{
       // e.preventDefault()

        // localStorage.removeItem('user')

        // dispatch({type:'LOGOUt'})

        logout()
    }

    return ( 
    <header>
        <div className="container">
            <Link to='/' className='logo'>
                <h1>WORKOUTS PAL </h1>
            </Link>
        </div>

        {user ? 
         <div className='user-logout'>
            {/* <span>{user.email}</span> */}
            <i onClick={handleLogout} className="fa-solid fa-right-from-bracket"></i>
         </div>

         :

         <div className='user-panel'>
         <Link to='/login'>
             <i className="fa-solid fa-right-to-bracket"></i>
         </Link>

         <Link to='/signup'>
             <i className="fa-solid fa-user"></i>
         </Link>
     </div>
        
        }
       
        
        
        

        

    </header> 
    );
}
 
export default Navbar;