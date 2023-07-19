import { createContext, useReducer } from "react";

export const TasksContext = createContext()
export const taskReducer = (state, action) => {
    switch (action.type) {
        case 'SET_TASKS':
            return {
                tasks: action.payload
            }
        case 'CREATE_TASK':
            return {
                tasks: [action.payload, ...state.tasks]
            }
        case 'DELETE_TASK':
            return {
                tasks: state.tasks.filter((task) => task._id !== action.payload._id)
            }
        case 'UPDATE_TASK':
            const index = state.tasks?.findIndex((task) => (task._id === action.payload._id))
            state.tasks.splice(index, 1, action.payload)
            return {
                tasks: state.tasks
            }
        default:
            return state
    }
}

export const TasksContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(taskReducer, {
        tasks: null
    })

    return (
        <TasksContext.Provider value={{ ...state, dispatch }}>
            {children}
        </TasksContext.Provider>
    )
}