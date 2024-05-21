import axios from 'axios';

/**
 * 都道府県情報を取得する関数
 * @returns {Promise<Array>} - 都道府県情報の配列
 */
export const fetchPrefectures = async () => {
    const url = `${process.env.REACT_APP_API_URL}/api/v1/prefectures`;
    const api = process.env.REACT_APP_API_KEY;
    try {
        const response = await axios.get(url, {
            headers: { 'X-API-KEY': api },
        });
        return response.data.result;
    } catch (error) {
        console.error('エラー', error);
        throw error;
    }
};
