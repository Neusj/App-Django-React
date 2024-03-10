import {useForm} from 'react-hook-form';
import { createTask, deleteTask, getTaskById, updateTask } from '../api/Task.api';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import toast from 'react-hot-toast';


export function TaskFormPage() {

    const {
        register,
        handleSubmit,
        formState: {errors},
        setValue
    } = useForm();
    const navigate = useNavigate();
    const params = useParams();
    const id_task = params.id;
    
    useEffect(()=>{
        async function loadTask() {
            if (id_task) {
                const res = await getTaskById(id_task);
                setValue('title', res.data.title);
                setValue('description', res.data.description);
            }
        }
        loadTask();
    })

    const onSubmit = handleSubmit(async data => {
        if (id_task) {
            await updateTask(id_task, data);
            toast.success('Tarea Editada', {position: 'bottom-center', })
        } else {
            await createTask(data);
            toast.success('Tarea creada', {position: 'bottom-center', })
        }
        navigate('/tasks');
    })

    return (
        <div className='max-w-xl mx-auto'>
            <form onSubmit={onSubmit}>
                <input 
                    type="text"
                    placeholder="Título"
                    {...register('title', {required: true})}
                    className='bg-zinc-900 p-3 rounded-lg block w-full mb-3'
                />
                {errors.title && <span>El título es requerido</span>}
                <textarea
                    rows="3" 
                    placeholder="Descripción"
                    {...register('description', {required: true})}
                    className='bg-zinc-900 p-3 rounded-lg block w-full mb-3'
                ></textarea>
                {errors.description && <span>La descripción es requerido</span>}

                <div className='flex justify-around'>
                    <button className='bg-green-600 p-3 rounded-lg block w-48 mt-3'>Guardar</button>
                    {id_task && <input type='button' value={'Borrar'}
                        className='bg-red-600 p-3 rounded-lg w-48 mt-3'
                        onClick={async () =>{
                            const validate_delete = window.confirm('¿Está seguro de eliminar la tarea?')
                            if (validate_delete) {
                                await deleteTask(id_task);
                                toast.success('Tarea Eliminada', {position: 'bottom-center', })
                                navigate('/tasks');
                            }
                        }}/>
                    }
                </div>
            </form>

            
        </div>
    )
}

