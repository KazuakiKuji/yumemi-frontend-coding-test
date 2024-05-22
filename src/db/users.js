import axios from 'axios';

const DB_baseUrl = 'http://localhost:8080/api/users';

/**
 * ユーザー一覧を取得する
 * @returns {Promise<Array>} ユーザー一覧を含むPromise
 * @throws {Error} ユーザーデータの取得に失敗した場合のエラー
 */
export const fetchUsers = async () => {
    try {
        const response = await axios.get(DB_baseUrl);
        return response.data;
    } catch (error) {
        console.error('ユーザーデータの取得に失敗しました。', error);
        throw error;
    }
};

/**
 * 新しいユーザーを追加する
 * @param {string} name - ユーザーの名前
 * @param {string} location - ユーザーの出身地
 * @returns {Promise<Object>} 追加されたユーザーを含むPromise
 * @throws {Error} ユーザーの追加に失敗した場合のエラー
 */
export const addUser = async (name, location) => {
    try {
        const response = await axios.post(DB_baseUrl, { name, location });
        return response.data;
    } catch (error) {
        console.error('ユーザーの追加に失敗しました。', error);
        throw error;
    }
};

/**
 * ユーザー情報を更新する
 * @param {number} id - ユーザーのID
 * @param {string} name - 更新するユーザーの名前
 * @param {string} location - 更新するユーザーの出身地
 * @returns {Promise<Object>} 更新されたユーザーを含むPromise
 * @throws {Error} ユーザーの更新に失敗した場合のエラー
 */
export const updateUser = async (id, name, location) => {
    try {
        const response = await axios.put(`${DB_baseUrl}/${id}`, { name, location });
        return response.data;
    } catch (error) {
        console.error('ユーザーの更新に失敗しました。', error);
        throw error;
    }
};

/**
 * ユーザーを削除する
 * @param {number} id - 削除するユーザーのID
 * @returns {Promise<void>} 削除結果を含むPromise
 * @throws {Error} ユーザーの削除に失敗した場合のエラー
 */
export const deleteUser = async (id) => {
    try {
        const response = await axios.delete(`${DB_baseUrl}/${id}`);
        return response.data;
    } catch (error) {
        console.error('ユーザーの削除に失敗しました。', error);
        throw error;
    }
};
