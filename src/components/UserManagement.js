import React, { useState, useEffect } from 'react';
import { fetchPrefectures } from '../api/prefectures';
import { fetchUsers, addUser, updateUser, deleteUser } from '../db/users';
import PrefectureCheckboxes from './PrefectureCheckboxes';
import CreateChart from './CreateChart';
import usePopulationData from '../hooks/usePopulationData';
import UserForm from './UserForm';
import UserList from './UserList';
import { Container, Row, Col } from 'react-bootstrap';

/**
 * メインコンテンツにあたるコンポーネント。以下の処理を行う
 * １．ユーザーの登録・管理
 * ２．都道府県データの管理
 * ３．選択された都道府県を元に、グラフを表示する
 */
export default function UserManagement() {
    // ユーザーデータの状態管理
    const [users, setUsers] = useState([]);
    // ユーザー名の状態管理
    const [name, setName] = useState('');
    // 都道府県データの状態管理
    const [prefectures, setPrefectures] = useState([]);
    // 選択された都道府県の状態管理
    const [location, setLocation] = useState('');
    // 選択されたユーザーIDの状態管理
    const [selectUserID, setSelectUserID] = useState('');
    // 選択された都道府県リストの状態管理
    const [selectedPrefectures, setSelectedPrefectures] = useState([]);

    // 都道府県データを取得して設定する ※トリガー：マウント時
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

    // ユーザーデータを取得して設定する ※トリガー：マウント時
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

    // 選択されたユーザーIDに基づいてユーザー情報を設定する
    // トリガー：selectタグから値を変更したとき, ユーザーの追加,更新,削除の時, 都道府県データを取得したとき
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

    /**
     * ユーザー情報をデータベースに追加or更新する関数
     */
    const handleAddUser = async () => {
        if (name === "" || location === "") {
            alert("氏名欄、都道府県欄 に値を入れてください");
            return;
        }

        const existingUser = users.find(user => user.name === name);

        try {
            if (existingUser) { // 更新処理
                const confirmUpdate = window.confirm("氏名が既に存在します。内容を更新しますか？");
                if (confirmUpdate) {
                    const updatedUser = await updateUser(existingUser.id, name, location);
                    setUsers(users.map(user => user.id === existingUser.id ? updatedUser : user));
                }
            } else { // 新規追加処理
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

    /**
     * ユーザーをデータベースから削除する関数
     */
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

    /**
      * checkboxによって、都道府県の選択状態を更新する関数
      * @param {Array} newSelectedPrefectures - 新しい選択された都道府県リスト
      */
    const handlePrefectureChange = (newSelectedPrefectures) => {
        setSelectedPrefectures(newSelectedPrefectures);
        if (newSelectedPrefectures.length === 1) {
            setLocation(newSelectedPrefectures[0].prefName);
        } else if (newSelectedPrefectures.length === 0) {
            setLocation('');
        }
    };

    /**
     * selectタグによって、都道府県の選択状態を更新する関数
     * @param {Object} event - セレクトボックスのchangeイベント
     */
    const handleSelectChange = (event) => {
        const selectedPref = prefectures.find(pref => pref.prefName === event.target.value);
        setSelectedPrefectures(selectedPref ? [selectedPref] : []);
        setLocation(event.target.value);
    };

    // 選択された都道府県に基づいて人口データを取得する
    const populationData = usePopulationData(selectedPrefectures);

    return (
        <Container className='contents mt-4'>
            <Row>
                <Col>
                    <h1 className="text-center">ユーザー登録</h1>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <UserList
                        users={users}
                        selectUserID={selectUserID}
                        setSelectUserID={setSelectUserID}
                        handleDeleteUser={handleDeleteUser}
                    />
                </Col>
                <Col md={6}>
                    <UserForm
                        name={name}
                        setName={setName}
                        location={location}
                        setLocation={setLocation}
                        prefectures={prefectures}
                        handleAddUser={handleAddUser}
                        handleSelectChange={handleSelectChange}
                    />
                </Col>
            </Row>
            <Row className='mt-4'>
                <Col>
                    <h1 className="text-center">都道府県 選択欄</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <PrefectureCheckboxes
                        prefectures={prefectures}
                        selectedPrefectures={selectedPrefectures}
                        onChange={handlePrefectureChange}
                    />
                </Col>
            </Row>
            <Row className='mt-4'>
                <Col>
                    <CreateChart populationData={populationData} selectedPrefectures={selectedPrefectures} />
                </Col>
            </Row>
        </Container>
    );
}
