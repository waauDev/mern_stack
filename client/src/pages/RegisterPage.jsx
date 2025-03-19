
import {useForm} from 'react-hook-form'
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';



function RegisterPage() {

    const {register, handleSubmit, formState:{
        errors
    }} = useForm();
    const {signup, isAuthenticated, errors:RegisterErrors} =useAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        if(isAuthenticated) navigate("/tasks");
    },[isAuthenticated])
    
    const onSubmit = handleSubmit(async(values)=>{
        signup(values);
        
        });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
    <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
        
          {
            RegisterErrors.map((error, i)=>(
                <div className='bg-red-500 p-2' key={i}>
                    {error}
                </div>
            ))
          }
          <h1 className="text-2xl font-bold">Registro</h1>
        <form action="" onSubmit={onSubmit}>

            <input type="text" {...register("username", {required:true})}
                className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                placeholder='username'
            />
            {errors.username && <p className='text-red-500'>Usuario es requerido</p>}
            <input type="email" {...register("email", {required:true})}
                className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                placeholder='email'
                />
            {errors.email && <p className='text-red-500'>Email es requerido</p>}
            <input type="password" {...register("password", {required:true})}
                className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                placeholder='password'/>
            {errors.password && <p className='text-red-500'>Contraseña es requerido</p>}
            <button type='submit'
                className='bg-sky-500 text-white px-4 py-2 rounded-md my-2'
            >
                Registrar
            </button>
        </form>
        <p className="flex gap-x-2 justify-between">
          Iniciar Sesion <Link to="/login" className="text-sky-500">
          Signin</Link>
        </p>
    </div>
    </div>
  )
}


export default RegisterPage