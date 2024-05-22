import React from 'react';
import { Form, Button } from 'react-bootstrap';

/**
 * データベースの内容から、ユーザー情報を管理するコンポーネント
 * @param {Array} users - DB内のユーザーリスト
 * @param {string} selectUserID - 現在選択されているユーザーID
 * @param {Function} setSelectUserID - ユーザーIDを設定する関数
 * @param {Function} handleDeleteUser - ユーザーを削除する関数
 */
const UserList = ({ users, selectUserID, setSelectUserID, handleDeleteUser }) => {
    return (
        <div className="container mt-4">
            <Form.Group controlId="users">
                <Form.Label>ユーザーリスト</Form.Label>
                <Form.Control
                    as="select"
                    value={selectUserID}
                    onChange={(e) => setSelectUserID(e.target.value)}
                >
                    <option value="">追加されたメンバー</option>
                    {users.map((user, index) => (
                        <option key={user.id || index} value={user.id}>
                            name: {user.name}, location: {user.location}
                        </option>
                    ))}
                </Form.Control>
            </Form.Group>
            <Button variant="danger" onClick={handleDeleteUser}>
                DBから削除
            </Button>
        </div>
    );

};

export default UserList;
