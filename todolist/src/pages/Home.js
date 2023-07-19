import { useEffect } from "react"
import TaskDetails from "../components/TaskDetails"
import { useTasksContext } from "../hooks/useTasksContext"
import AddTask from "../components/AddTask"
const Home = () => {
    const { tasks, dispatch } = useTasksContext()

    useEffect(() => {
        const fetchTasks = async () => {
            const response = await fetch('/api/tasks')
            const json = await response.json()
            if (response.ok) {
                dispatch({ type: 'SET_TASKS', payload: json })
            }
        }
        fetchTasks()
    }, [dispatch])

    return (
        <div>
            <AddTask />
            <div className="tasks">
                {tasks && tasks.map((task) => (
                    <TaskDetails task={task} key={task._id} />
                ))}
            </div>
        </div>
    )
}

export default Home