import { useState, useEffect } from 'react'
import axios from 'axios'
import User from './User';
import './Style.css'


const usersUrl = 'https://jsonplaceholder.typicode.com/users';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [usersOriginal, setusersOriginal] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [displayAddUserForm, setDisplayAddUserForm] = useState(false);
    const [newUser, setNewUser] = useState({ username: '', id: Math.random(), email: '', address: '' })

    const [inputError, setInputError] = useState(false)

    useEffect(() => {
        const fetchUsers = async () => {
            const { data: usersData } = await axios.get(usersUrl);
            setUsers(usersData);
            setusersOriginal(usersData);
        }
        fetchUsers();
    }, [])

    useEffect(() => {
        const afterSearch = usersOriginal.filter((user) => {
            return user.username.toLowerCase().includes(searchValue.toLowerCase())
        });
        setUsers(afterSearch);
    }, [searchValue]);

    // useEffect(() => {
    //     console.log(users);
    // }, [users]);

    const updateSearchValue = (e) => {
        setSearchValue(e.target.value);
    }

    const deleteUserFromUsersList = (id) => {
        const newUsers = users.filter(u => +u.id !== +id);
        setUsers(newUsers);
    }

    const addUser = async () => {
        const newUsers = users;
        newUsers.push(newUser);
        setUsers(users);
        setDisplayAddUserForm(false)
    }

    return (
        <div className='container'>
            <div className='users'>
                <div className='search'>
                    Search: <input type="text" onChange={updateSearchValue} />
                    <button className='btn' onClick={() => setDisplayAddUserForm(true)}>Add User</button>
                </div><br /><br />
                {
                    users.map(user => {
                        if (!!user) {
                            return <User key={user?.id} user={user} deleteUserCallback={deleteUserFromUsersList} />
                        }
                    })
                }
            </div>
            <div className={displayAddUserForm ? 'add-user-form' : 'hidden'}>
                Name: <input type="text" value={newUser.username} onChange={(e) => e.target.value !== '' ? setNewUser({ ...newUser, username: e.target.value }) : setInputError(true)} /><br /><br />
                Email: <input type="email" value={newUser.email} onChange={(e) => e.target.value !== '' ? setNewUser({ ...newUser, email: e.target.value }) : setInputError(true)} /><br />
                <div className='add-user-buttons'>
                    <button className='btn add-btn' onClick={addUser}>Add</button>
                    <button className='btn cancel-btn' onClick={() => setDisplayAddUserForm(false)}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default Users