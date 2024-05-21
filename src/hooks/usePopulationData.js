import { useState, useEffect } from 'react';
import PopulationService from "../api/PopularionService";

/**
 * 選択された都道府県の人口データを取得し、状態として管理するフック
 * @param {Array} selectedPrefectures - 選択された都道府県のリスト。各都道府県は { prefCode: string, prefName: string } の形式
 *
 * @returns {Object} populationData - 都道府県コードをキー、人口データを値とするオブジェクト
 */
const usePopulationData = (selectedPrefectures) => {
    const [populationData, setPopulationData] = useState({});

    useEffect(() => {
        /**
         * 選択された都道府県の人口データをAPIから取得し、状態を更新する関数
         */
        const updatePopulationData = async () => {
            const newPopulationData = {};
            for (const pref of selectedPrefectures) {
                const data = await PopulationService.fetchPopulationData(pref.prefCode);
                if (data) {
                    newPopulationData[pref.prefCode] = data;
                }
            }
            setPopulationData(newPopulationData);
        };
        // 選択された都道府県が変更されるたびに人口データを更新
        updatePopulationData();
    }, [selectedPrefectures]);

    return populationData;
};

export default usePopulationData;
