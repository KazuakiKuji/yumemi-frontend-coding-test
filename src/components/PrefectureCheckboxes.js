// src/components/PrefectureCheckboxes.js
import React, { useState, useEffect } from 'react';
import { fetchPrefectures } from '../api/prefectures';

/**
 * 都道府県情報をチェックボックス付きで表示し、選択を管理する
 * @param {Object} props - コンポーネントのプロパティ
 * @param {Function} props.onChange - チェックボックス変更時に呼び出されるコールバック関数
 * @param {Array} props.selectedPrefectures - 選択された都道府県のリスト
 *
 * @returns {JSX.Element} - 都道府県チェックボックスを含むJSX要素
 */
export default function PrefectureCheckboxes({ onChange, selectedPrefectures }) {
    const [prefData, setPrefData] = useState([]);

    useEffect(() => {
        const loadPrefectures = async () => {
            try {
                const data = await fetchPrefectures();
                setPrefData(data);
            } catch (error) {
                console.error('都道府県データの取得に失敗しました。', error);
            }
        };

        loadPrefectures();
    }, []);

    return (
        <div className="navApp">
            <ul style={{ display: "flex", flexWrap: "wrap", listStyle: "none", userSelect: "none" }}>
                {prefData.map((pref, index) => (
                    <li key={index} className="pref_itemBox">
                        <label>
                            <input
                                type="checkbox"
                                checked={selectedPrefectures.some((item) => item.prefCode === pref.prefCode)}
                                onChange={() => onChange(pref)}
                            />
                            <span className="pref_text">{pref.prefName}</span>
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
}
