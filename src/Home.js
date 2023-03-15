import React from 'react'
import Users from './Users'

const todosUrl = 'https://jsonplaceholder.typicode.com/todos';
const postsUrl = 'https://jsonplaceholder.typicode.com/posts';


const Home = () => {   
    return (
        <div>
            <Users/>
        </div>
    )
}

export default Home