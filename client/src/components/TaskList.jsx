import { useEffect, useState } from "react"
import { getAllTasks } from "../api/Task.api"
import { TaskCard } from "./TaskCrad";

export function Tasklist() {

    const [tasks, setTask] = useState([])

    useEffect(()=>{
        async function loadTask() {
            const res = await getAllTasks()
            setTask(res.data)
        }
        loadTask()
    }, []);
    return (
        <div className="grid grid-cols-3 gap-3">
            {
                tasks.map(task => (
                    <TaskCard key={task.id} task={task}/>
                ))
            }
        </div>
    )
}
