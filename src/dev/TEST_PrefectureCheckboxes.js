import React from 'react';

export default function TEST_PrefectureCheckboxes({ prefData, selectedPrefs, handleCheckboxChange }) {
    return (
        <div className="navApp">
            <ul style={{ display: "flex", flexWrap: "wrap", listStyle: "none", userSelect: "none" }}>
                {prefData.map((pref, index) => (
                    <li key={index} className="pref_itemBox">
                        <label>
                            <input
                                type="checkbox"
                                checked={selectedPrefs.some((item) => item.prefCode === pref.prefCode)}
                                onChange={() => handleCheckboxChange(pref)}
                            />
                            <span className="pref_text">{pref.prefName}</span>
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
}
