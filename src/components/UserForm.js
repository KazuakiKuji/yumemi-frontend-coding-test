import React from 'react';

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
        <div>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="氏名"
            />
            <select id="prefecture" value={location} onChange={handleSelectChange}>
                <option value="">出身地を選択してください</option>
                {prefectures.map((pref) => (
                    <option key={pref.prefCode} value={pref.prefName}>
                        {pref.prefName}
                    </option>
                ))}
            </select>
            <button onClick={handleAddUser}>ユーザー追加or更新</button>
        </div>
    );
};

export default UserForm;
