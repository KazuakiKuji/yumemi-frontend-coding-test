/**
 * ファイル概要
 * グラフ生成時、過去に生成した色に似ることが無いように設計されたフックを定義したファイル
 */

import { useState, useEffect } from 'react';
import generateRGBA from '../lib/generateRGBA';

/**
 * カスタムフック `useColorMap`
 * 選択された都道府県ごとにユニークな色を生成し、それをマッピングするフック
 * @param {Array} selectedPrefectures - 選択された都道府県のリスト。各都道府県は { prefCode: string, prefName: string } の形式
 *                                      例：[{prefCode:42, prefName:"長崎県"}, , ,]
 * @returns {Object} colorMap - 各都道府県コードに対応する色のマップ。
 *                              例: { '01': 'rgba(255, 99, 132, 0.8)', '02': 'rgba(54, 162, 235, 0.8)', ... }
 */
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
