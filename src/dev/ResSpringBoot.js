import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ResSpringBoot() {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/api/users')
            .then(response => {
                console.log("response.data", response.data);  // デバッグ用のログ出力
                setUsers(response.data);
            });
    }, []);

    const addUser = () => {
        axios.post('http://localhost:8080/api/users', { name, email })
            .then(response => {
                console.warn("response", response)
                console.log("...users, response.data", ...users, response.data)
                console.log("name, email", name, email)
                setUsers([...users, response.data]);
                setName('');
                setEmail('');
            });
    };

    return (
        <div>
            <h1>Users</h1>
            <ul>
                {users.map((user, index) => (
                    <li key={user.id || index}>{user.name} ({user.email})</li>
                ))}
            </ul>
            <div>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <button onClick={addUser}>Add User</button>
            </div>
        </div>
    );
}

export default ResSpringBoot;
