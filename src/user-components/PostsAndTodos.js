import React, { useState, useEffect } from 'react'
import Todo from './Todo'
import Post from './Post'
import axios from 'axios';



const todosUrl = 'https://jsonplaceholder.typicode.com/todos';
const postsUrl = 'https://jsonplaceholder.typicode.com/posts';

const PostsAndTodos = ({ showPosts, showTodos, userId, updetTodosCompleted }) => {
    const [newTodo, setNewTodo] = useState({ userId: userId, id: Math.random(), title: '', completed: false });
    const [newPost, setNewPost] = useState({ userId: userId, id: Math.random(), title: '', body: '' });
    const [displayPostForm, setDisplayPostForm] = useState(false);
    const [displayTodoForm, setDisplayTodoForm] = useState(false);

    const [todos, setTodos] = useState([]);
    const [posts, setPosts] = useState([]);

    const fetchTodosAndPosts = async () => {
        const { data: todosData } = await axios.get(`${todosUrl}?userId=${userId}`);
        setTodos(todosData);
        const { data: postsData } = await axios.get(`${postsUrl}?userId=${userId}`);
        setPosts(postsData);
    }

    useEffect(() => {
        fetchTodosAndPosts();
    }, [])


    const addTodo = () => {
        const newTodos = todos;
        newTodos.push(newTodo);
        setTodos(newTodos);
        setDisplayTodoForm(false);
    }

    const addPost = () => {
        const newPosts = posts;
        newPosts.push(newPost);
        setPosts(newPosts);
        setDisplayPostForm(false);
    }

    const updateTodo = (updateTodo) => {

        let updatedTodos = todos;
        updatedTodos.forEach(todo => {
            if (todo?.id === updateTodo?.id) {
                todo.completed = true;
            }
        });
        updatedTodos = updatedTodos.slice(0, updatedTodos.length)
        setTodos(updatedTodos);
    }

    useEffect(() => {
        let flag = false;
        if (todos.length > 0) {
            flag = todos?.every(todo => {
                return todo?.completed == true;
            });
            if (flag) {
                updetTodosCompleted();
            }
        }
    }, [todos]);

    return (
        <div className='posts-and-todos'>



            <div className={showPosts && !displayPostForm ? 'posts' : 'hidden'}>
                <div className='posts-todos-title'>
                    Posts- User {userId}
                    <button className='btn' onClick={() => setDisplayPostForm(true)}>Add Post</button>
                </div>
                <div className='post-list'>
                    {
                        posts?.map(p => {
                            return <Post key={p.id} post={p} />
                        })
                    }
                </div>
            </div>
            <div className={displayPostForm ? 'add-post' : 'hidden'}>
                Title: <input type="text" value={newPost.title} onChange={(e) => { setNewPost({ ...newPost, title: e.target.value }) }} /><br />
                Body: <input type="text" value={newPost.body} onChange={(e) => { setNewPost({ ...newPost, body: e.target.value }) }} /><br />
                <button className='btn add-btn' onClick={addPost}>Add</button>
                <button className='btn cancel-btn' onClick={() => setDisplayPostForm(false)}>Cancel</button>
            </div>



            <div className={(showTodos && !displayTodoForm) ? 'todos' : 'hidden'}>
                <div className='posts-todos-title'>
                    Todos- User {userId}
                    <button className='btn' onClick={() => setDisplayTodoForm(true)}>Add Todo</button>
                </div>
                <div className='todo-list'>
                    {
                        todos?.map(t => {
                            return <Todo key={t.id} todo={t} updateTodo={updateTodo} />
                        })
                    }
                </div>
            </div>
            <div className={displayTodoForm ? 'add-todo' : 'hidden'}>
                Title: <input type="text" value={newTodo.title} onChange={(e) => { setNewTodo({ ...newTodo, title: e.target.value }) }} /><br />
                {newTodo.title}<br />
                <button className='btn add-btn' onClick={addTodo}>Add</button>
                <button className='btn cancel-btn' onClick={() => setDisplayTodoForm(false)}>Cancel</button>
            </div>
        </div >
    )
}

export default PostsAndTodos