// src/hooks/useColorMap.js
import { useState, useEffect } from 'react';
import generateRGBA from '../lib/generateRGBA';

const useColorMap = (selectedPrefectures) => {
    const [colorMap, setColorMap] = useState({});

    useEffect(() => {
        const newColorMap = { ...colorMap };

        selectedPrefectures.forEach(pref => {
            if (!newColorMap[pref.prefCode]) {
                newColorMap[pref.prefCode] = generateRGBA();
            }
        });

        setColorMap(newColorMap);
    }, [selectedPrefectures]);

    return colorMap;
};

export default useColorMap;
