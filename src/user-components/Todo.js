import { useState } from 'react'
const Todo = ({ todo, updateTodo }) => {
  const [localTodo, setLocalTodo] = useState(todo)

  const markTaskCompleted = async () => {
    const obj = { ...todo, completed: true };
    setLocalTodo(obj);
    // await updateItem(todosUrl, todo.id, obj)
    updateTodo(localTodo);
  }


  return (
    <div className='todo'>
      <div className='todos-details'>
        <div className='post-text'>
          <span>Title:</span> <span>{localTodo?.title?.slice(0, 20)}</span> <br />
        </div>
        <div className='post-text'>
          <span>Completed:</span> <span>{localTodo?.completed?.toString()}</span> <br />
        </div>
      </div>

      <button onClick={markTaskCompleted} className={!localTodo.completed ? 'mark-complete-btn btn' : 'hidden'}>Mark Completed</button><br />
    </div>
  )
}

export default Todo