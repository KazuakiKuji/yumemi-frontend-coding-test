import React from 'react';

const PrefectureCheckboxes = ({ onChange, selectedPrefectures }) => {
    const handleChange = (event) => {
        const pref = {
            prefCode: event.target.value,
            prefName: event.target.name,
        };
        onChange(pref);
    };

    return (
        <div>
            {selectedPrefectures.map((pref, index) => (
                <label key={index}>
                    <input
                        type="checkbox"
                        value={pref.prefCode}
                        name={pref.prefName}
                        checked={selectedPrefectures.some((item) => item.prefCode === pref.prefCode)}
                        onChange={handleChange}
                    />
                    {pref.prefName}
                </label>
            ))}
        </div>
    );
};

export default PrefectureCheckboxes;
