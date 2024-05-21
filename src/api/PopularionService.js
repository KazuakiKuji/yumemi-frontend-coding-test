import axios from 'axios';

class PopulationService {
    constructor() {
        this.apiUrl = process.env.REACT_APP_API_URL;
        this.apiKey = process.env.REACT_APP_API_KEY;
    }

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

export default new PopulationService();
