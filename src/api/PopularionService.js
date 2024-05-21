import axios from 'axios';

/**
 * 都道府県の人口データを取得するためのクラス
 */
class PopulationService {
    /**
     * @constructor
     * APIのURLとAPIキーを環境変数から取得する
     */
    constructor() {
        this.apiUrl = process.env.REACT_APP_API_URL;
        this.apiKey = process.env.REACT_APP_API_KEY;
    }

    /**
     * 都道府県の人口データを取得するメソッド
     * 指定された都道府県コードに基づいてAPIから人口データを取得する
     * @param {string} prefCode - 都道府県コード
     * @returns {Promise<Object|null>} - 人口データオブジェクト、エラー時はnull
     */
    async fetchPopulationData(prefCode) {
        const url = `${this.apiUrl}/api/v1/population/composition/perYear?prefCode=${prefCode}&cityCode=-`;
        try {
            const response = await axios.get(url, {
                headers: { 'X-API-KEY': this.apiKey },
            });
            return response.data.result;
        } catch (error) {
            console.error('エラー', error);
            return null;
        }
    }
}

const populationService = new PopulationService();
export default populationService;
