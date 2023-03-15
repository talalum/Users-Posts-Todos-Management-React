import { useState, useEffect } from 'react'
import axios from 'axios'
import User from './user-components/User';
import { ErrorComponent } from './ErrorComponent';


const usersUrl = 'https://jsonplaceholder.typicode.com/users';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [usersOriginal, setusersOriginal] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [displayAddUserForm, setDisplayAddUserForm] = useState(false);
    const [newUser, setNewUser] = useState({ username: '', id: Math.random(), email: '', address: {} })

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

    const updateSearchValue = (e) => {
        setSearchValue(e.target.value);
    }

    const deleteUserFromUsersList = (id) => {
        const newUsers = users.filter(u => +u.id !== +id);
        setUsers(newUsers);
    }

    const addUser = async () => {
        if (newUser.username.length > 3 && newUser.email.includes('@')) {
            setInputError(false);
            const newUsers = users;
            newUsers.push(newUser);
            setUsers(users);
            setDisplayAddUserForm(false);
            setNewUser({ ...newUser, username: '', email: '', address: '', id: Math.random() });
        }
        setInputError(true);
    }
    const cancelAddUser = () => {
        setDisplayAddUserForm(false);
        setInputError(false);
        setNewUser({ ...newUser, username: '', email: '', address: '' });
    }

    return (
        <div className='container'>
            <div className='users'>
                <div className='search'>
                    Search: <input type="text" onChange={updateSearchValue} />
                    <button className='btn' onClick={() => setDisplayAddUserForm(true)}>Add User</button>
                </div>
                <div className={displayAddUserForm ? 'add-user-form' : 'hidden'}>
                    Name: <input type="text" value={newUser.username} onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} /><br /><br />
                    Email: <input type="email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} /><br />
                    <ErrorComponent title={'invalid name or email'} display={inputError} />
                    <div className='add-user-buttons'>
                        <button className='btn add-btn' onClick={addUser}>Add</button>
                        <button className='btn cancel-btn' onClick={cancelAddUser}>Cancel</button>
                    </div>
                </div>
                {
                    users.map(user => {
                        if (!!user) {
                            return <User key={user?.id} user={user} deleteUserCallback={deleteUserFromUsersList} />
                        }
                    })
                }
            </div>

        </div>
    )
}

export default Users