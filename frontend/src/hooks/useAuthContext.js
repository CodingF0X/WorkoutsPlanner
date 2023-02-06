const { useContext } = require("react");
const { AuthContext } = require("../context/AuthContext");

export const useAuthContext = ()=>{
    const context = useContext(AuthContext)

    if(!context)
        throw Error ('context is outside the scope ')

        // console.log(context)
        return context
}