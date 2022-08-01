
const reducer = (state , action) => {
    const { type, payload } = action
    switch (type) {
        case "ADD_TODO":
            return {
                ...state,
                todos: [...state.todos, payload]
            }
        case "REMOVE_TODO":
            const newTodos = state.todos.filter(todo => todo !== payload)
            return {
                ...state,
                todos: newTodos
            }
        default:
            return state
    }
}


export default reducer