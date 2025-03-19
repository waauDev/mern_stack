import {useForm} from "react-hook-form";
import { useTasks } from "../context/TaskContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

function TaskFormPage() {
  const {register, handleSubmit, setValue} = useForm();
  const {createTask, getTask, updateTask} = useTasks();
  const navigate = useNavigate();

  const params = useParams();
  //console.log(createTask)

  useEffect(() => {
    async function loadTask(){
      if(params.id){
        const task = await getTask(params.id);
        console.log(params)
        setValue('title', task.title)
        setValue('description', task.description)
        setValue('date', dayjs.utc(task.date).format("YYYY-MM-DD"));
    }
    
    }
    loadTask()
  }, [])
  

  const onSubmit= handleSubmit( (data)=>{
    const dataValid ={
      ...data,
      date : data.date ? dayjs.utc(data.date).format() : dayjs.utc().format(),
    }

  
    if(params.id){
      updateTask(params.id, dataValid)
    }else{
    createTask(dataValid);
    
    }
    navigate('/tasks');

  });
  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      
      <form action="" onSubmit={onSubmit}>
        <label htmlFor="title">Tarea:</label>
        <input type="text" 
        placeholder="Título"
        {...register("title")}
        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        autoFocus
        />
        <label htmlFor="description">Descripción:</label>
      <textarea rows="3" 
      placeholder="Descripcion"
      className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
      {...register("description")}></textarea>

    <label htmlFor="date">Date:</label>
    <input type="date" {...register('date')}
    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
    ></input>
      <button className="bg-indigo-500 px-3 py-2 rounded-md">Guardar</button>
      </form>

    </div>
    </div>
  )
}

export default TaskFormPage
