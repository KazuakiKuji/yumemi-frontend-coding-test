import React, { useState, useEffect } from 'react';
import { fetchPrefectures } from '../api/prefectures';
import { fetchUsers, addUser, updateUser, deleteUser } from '../db/users';
import PrefectureCheckboxes from './PrefectureCheckboxes';
import CreateChart from './CreateChart';
import usePopulationData from '../hooks/usePopulationData';

export default function RegisterLocation() {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [prefectures, setPrefectures] = useState([]);
    const [location, setLocation] = useState('');
    const [selectUserID, setSelectUserID] = useState('');
    const [selectedPrefectures, setSelectedPrefectures] = useState([]);

    useEffect(() => {
        const loadPrefectures = async () => {
            try {
                const data = await fetchPrefectures();
                setPrefectures(data);
            } catch (error) {
                console.error('都道府県データの取得に失敗しました。', error);
            }
        };

        loadPrefectures();
    }, []);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const usersData = await fetchUsers();
                setUsers(usersData);
            } catch (error) {
                console.error('ユーザーデータの取得に失敗しました。', error);
            }
        };

        loadUsers();
    }, []);

    useEffect(() => {
        if (selectUserID) {
            const selectedUser = users.find(user => user.id === parseInt(selectUserID, 10));
            if (selectedUser) {
                setName(selectedUser.name);
                setLocation(selectedUser.location);
                setSelectedPrefectures(prefectures.filter(pref => pref.prefName === selectedUser.location));
            }
        } else {
            setName('');
            setLocation('');
            setSelectedPrefectures([]);
        }
    }, [selectUserID, users, prefectures]);

    const handleAddUser = async () => {
        if (name === "" || location === "") {
            alert("氏名欄、都道府県欄 に値を入れてください");
            return;
        }

        const existingUser = users.find(user => user.name === name);

        try {
            if (existingUser) {
                const confirmUpdate = window.confirm("氏名が既に存在します。内容を更新しますか？");
                if (confirmUpdate) {
                    const updatedUser = await updateUser(existingUser.id, name, location);
                    setUsers(users.map(user => user.id === existingUser.id ? updatedUser : user));
                }
            } else {
                const newUser = await addUser(name, location);
                setUsers([...users, newUser]);
            }
            setName('');
            setLocation('');
            setSelectedPrefectures([]);
        } catch (error) {
            console.error('ユーザーの追加または更新に失敗しました。', error);
        }
    };

    const handleDeleteUser = async () => {
        if (!selectUserID) {
            alert("削除するユーザーを選択してください");
            return;
        }

        const confirmDelete = window.confirm("本当に削除しますか？");
        if (!confirmDelete) {
            return;
        }

        try {
            await deleteUser(selectUserID);
            setUsers(users.filter(user => user.id !== parseInt(selectUserID, 10)));
            setSelectUserID('');
            setName('');
            setLocation('');
            setSelectedPrefectures([]);
        } catch (error) {
            console.error('ユーザーの削除に失敗しました。', error);
        }
    };

    const handleCheckboxChange = (pref) => {
        const isExistencePref = selectedPrefectures.findIndex((item) => item.prefCode === pref.prefCode);
        if (isExistencePref === -1) {
            setSelectedPrefectures([...selectedPrefectures, pref]);
            setLocation(pref.prefName);
        } else {
            setSelectedPrefectures(selectedPrefectures.filter((item) => item.prefCode !== pref.prefCode));
            setLocation('');
        }
    };

    const populationData = usePopulationData(selectedPrefectures);

    return (
        <div>
            <h1>ユーザー登録</h1>
            <select id="users" value={selectUserID} onChange={(e) => setSelectUserID(e.target.value)}>
                <option value="">追加されたメンバー</option>
                {users.map((user, index) => (
                    <option key={user.id || index} value={user.id}>
                        name: {user.name}, location: {user.location}
                    </option>
                ))}
            </select>
            <button onClick={handleDeleteUser}>データから削除</button>
            <div>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="氏名"
                />
                <select id="prefecture" value={location} onChange={(e) => setLocation(e.target.value)}>
                    <option value="">出身地を選択してください</option>
                    {prefectures.map((pref) => (
                        <option key={pref.prefCode} value={pref.prefName}>
                            {pref.prefName}
                        </option>
                    ))}
                </select>
                <button onClick={handleAddUser}>ユーザー追加or更新</button>
            </div>
            <PrefectureCheckboxes onChange={handleCheckboxChange} selectedPrefectures={selectedPrefectures} />
            <CreateChart populationData={populationData} selectedPrefectures={selectedPrefectures} />
        </div>
    );
}
