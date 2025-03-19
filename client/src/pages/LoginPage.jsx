import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const {signin, errors:signinErrors, isAuthenticated} = useAuth();
  const navigate = useNavigate();
  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  useEffect(()=>{
    if(isAuthenticated) navigate('/tasks')
  },[isAuthenticated])
  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <h1 className="text-2xl font-bold">Login</h1>
        {
            signinErrors.map((error, i)=>(
                <div className='bg-red-500 p-2 text-white text-center my-2' key={i}>
                    {error}
                </div>
            ))
          }
        
        <form action="" onSubmit={onSubmit}>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="email"
          />
          {errors.email && <p className="text-red-500">Email es requerido</p>}
          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="password"
          />
          {errors.password && (
            <p className="text-red-500">Contraseña es requerido</p>
          )}
          <button type="submit"
          className='bg-sky-500 text-white px-4 py-2 rounded-md my-2'
          >Ingresar</button>
        </form>
        <p className="flex gap-x-2 justify-between">
          No tienes cuenta aún, <Link to="/register" className="text-sky-500">
          Registrate aquí</Link>
        </p>
      </div>
    </div>
  );
}
