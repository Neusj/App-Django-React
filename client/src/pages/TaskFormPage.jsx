import {useForm} from 'react-hook-form';
import { createTask, deleteTask, getTaskById, updateTask } from '../api/Task.api';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';


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
        } else {
            await createTask(data);
        }
        navigate('/tasks');
    })

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Título"
                    {...register('title', {required: true})}
                />
                {errors.title && <span>El título es requerido</span>}
                <textarea rows="3" placeholder="Descripción"
                    {...register('description', {required: true})}
                ></textarea>
                {errors.description && <span>La descripción es requerido</span>}

                <button>Guardar</button>
            </form>

            {id_task && <button 
                onClick={async () =>{
                    const validate_delete = window.confirm('¿Está seguro de eliminar la tarea?')
                    if (validate_delete) {
                        await deleteTask(id_task);
                        navigate('/tasks');
                    }
                }}
            >Borrar</button> }
        </div>
    )
}

