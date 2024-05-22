import React from 'react';
import { Form, Button } from 'react-bootstrap';

/**
 * ユーザーが記述した内容を元に、データベースの更新を行うコンポーネント
 * @param {string} name - 入力されたユーザーの氏名
 * @param {Function} setName - ユーザーの氏名を設定するための関数
 * @param {string} location - 選択されたユーザーの出身地
 * @param {Function} setLocation - ユーザーの出身地を設定するための関数。
 * @param {Array} prefectures - 都道府県のリスト
 * @param {Function} handleAddUser - ユーザーを追加または更新するための関数
 * @param {Function} handleSelectChange - 出身地の選択が変更されたときに呼び出される関数
 */
const UserForm = ({ name, setName, location, setLocation, prefectures, handleAddUser, handleSelectChange }) => {
    return (
        <div className="container mt-4">
            <Form>
                <Form.Group controlId="formUserName">
                    <Form.Label>氏名</Form.Label>
                    <Form.Control
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="氏名"
                    />
                </Form.Group>
                <Form.Group controlId="formUserLocation">
                    <Form.Label>出身地</Form.Label>
                    <Form.Control
                        as="select"
                        value={location}
                        onChange={handleSelectChange}
                    >
                        <option value="">出身地を選択してください</option>
                        {prefectures.map((pref) => (
                            <option key={pref.prefCode} value={pref.prefName}>
                                {pref.prefName}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" onClick={handleAddUser}>
                    ユーザー追加or更新
                </Button>
            </Form>
        </div>
    );

};

export default UserForm;
