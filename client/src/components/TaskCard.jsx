import React from 'react'
import { useTasks } from '../context/TaskContext';
import {Link} from 'react-router-dom'
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

function TaskCard({task}) {
    const {deleteTask} =useTasks();
  return (
    <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
        
        <header className='flex justify-between'>
        <h1 className='text-2xl font-bold'>{task.title}</h1>
        
            <div className="flex gap-x-2 items-center">
                <Link to={`/tasks/${task._id}`}
                  className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md'
                >edit</Link>
                <button
                onClick={()=>{
                   deleteTask(task._id);
                }}
                className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md'
                >delete</button>
            </div>
        </header>

        <p className='text-slate-300'>{task.description}</p>
        <p>{dayjs(task.date).utc().format("DD/MM/YYYY")}</p>
    </div>
  )
}

export default TaskCard;
