import {useForm} from 'react-hook-form';
import { createTask } from '../api/Task.api';
import { useNavigate } from 'react-router-dom';


export function TaskFormPage() {

    const {register, handleSubmit, formState: {errors}} = useForm();
    const navigate = useNavigate();
    const onSubmit = handleSubmit(async data => {
        await createTask(data);
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
        </div>
    )
}

