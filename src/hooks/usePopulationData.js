import { useState, useEffect } from 'react';
import PopulationService from "../api/PopularionService";

const usePopulationData = (selectedPrefectures) => {
    const [populationData, setPopulationData] = useState({});

    useEffect(() => {
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
        updatePopulationData();
    }, [selectedPrefectures]);

    return populationData;
};

export default usePopulationData;
