import { createContext, useContext, useEffect,useState } from "react";
import { registerRequest, loginRequest, veriyTokenRequest } from '../api/auth.js';
import Cookies from 'js-cookie'

export const AuthContext = createContext();

export const useAuth = () =>{
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export const AuthProvider = ({children}) =>{
    const [user, setUser] =useState(null);
    const [isAuthenticated, setIsAuthenticated]= useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    const signup = async(user)=>{
        try {
            const res = await registerRequest(user)
            console.log(res.data);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            console.log(error);
            setErrors(error.response.data);
        }
      
    };

    

    const signin = async(user) =>{
        try {
            const res = await loginRequest(user);
            console.log(res)
            setIsAuthenticated(true);
            setUser(res.data);
        } catch (error) {
            if(Array.isArray(error.response.data)){
                return setErrors(error.response.data)
            }
            setErrors([error.response.data.message]);
        }
    };

    const logout = () =>{
        Cookies.remove('token');
        setIsAuthenticated(false);
        setUser(null);
    }

    useEffect(()=>{
        if(errors.length > 0){
          const timer=  setTimeout(()=>{
                setErrors([])
            },5000)

            return  () => clearTimeout(timer);
        }
    },[errors])

    useEffect(() => {
      async function checkLogin() {
        const cookies = Cookies.get();

        if (!cookies.token) {
            setIsAuthenticated(false)
            setLoading(false);
            return setUser(null)};
            try {
                const res = await veriyTokenRequest(cookies.token);
                console.log(res)
                if(!res.data) {
                    setIsAuthenticated(false);
                    setLoading(false)
                    return;
                }
                

                setIsAuthenticated(true)
                setUser(res.data);
                setLoading(false)
            } catch (error) {
                console.log(error)
                setIsAuthenticated(false)
                setUser(null)
                setLoading(false)
            }
      }

      checkLogin();
    }, []);
    

    return(
        <AuthContext.Provider value={{
            signup, 
            signin,
            logout,
            user,
            loading, 
            isAuthenticated,
            errors}}>
            {children}
        </AuthContext.Provider>
    )
}
