import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function PrefectureCheckboxes({ onChange, selectedPrefectures }) {
    const [prefData, setPrefData] = useState([]);

    useEffect(() => {
        const fetchPrefectures = async () => {
            const url = `${process.env.REACT_APP_API_URL}/api/v1/prefectures`;
            const api = process.env.REACT_APP_API_KEY
            try {
                const response = await axios.get(url, {
                    headers: { 'X-API-KEY': api },
                });
                console.log("成功", response.data)
                setPrefData(response.data.result);
            } catch (error) {
                console.error('エラー', error);
            }
        };

        fetchPrefectures();
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