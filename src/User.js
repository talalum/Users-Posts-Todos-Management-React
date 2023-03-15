import { useState } from 'react'
import Address from './Address';
import './Style.css'
import PostAndTodos from './PostAndTodos';

const User = ({ user, deleteUserCallback }) => {
    const [userData, setuserData] = useState({
        id: user.id,
        username: user.username,
        email: user.email,
        address: {}
    });

    const [newAddress, setNewAddress] = useState({});
    const [newUserData, setNewUserData] = useState(userData)

    const [taskCompleted, setTaskCompleted] = useState(false);
    const [displayAddress, setDisplayAddress] = useState(false);

    const [showPosts, setShowPosts] = useState(false);
    const [showTodos, setShowTodos] = useState(false);

    const updateUser = async () => {
        console.log(newAddress);
        setuserData({ ...newUserData, address: newAddress })
        setDisplayAddress(false);
    };

    const deleteUser = async () => {
        deleteUserCallback(user.id);
    };

    const addAddress = (address) => {
        setNewAddress(address)
    }

    const clickOnId = async () => {
        setShowPosts(!showPosts);
        setShowTodos(!showTodos);
    }

    const updetTodosCompleted = () => {
        setTaskCompleted(true);
    }

    return (
        <div className={taskCompleted ? 'all-completed user' : 'not-all-completed user'}>
            <div className='user-details'>
                <div onClick={clickOnId}>ID: {user.id}<br /></div>
                <div>Name: <input type="text" value={newUserData.username} onChange={(e) => setNewUserData({ ...newUserData, username: e.target.value })} /><br /></div>
                <div>Email: <input type="email" value={newUserData.email} onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })} /><br /></div>
                <div className='buttons'>
                    <div className='other-data'>
                        <button onMouseEnter={() => setDisplayAddress(true)} onClick={() => setDisplayAddress(false)} className=' btn address-btn'>Show More Data</button>
                        <Address userAddress={user.address} displayAddress={displayAddress} callback={addAddress} />
                    </div>
                    <div className='edit-buttons'>
                        <button className='btn' onClick={updateUser}>Update Details</button>
                        <button className='btn delete-btn' onClick={deleteUser}>Delete User</button>
                    </div>
                </div>
            </div>
            <PostAndTodos showPosts={showPosts} showTodos={showTodos} userId={user.id} updetTodosCompleted={updetTodosCompleted} />
        </div>
    )
}

export default User