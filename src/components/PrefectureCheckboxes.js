import React from 'react';

/**
 * 都道府県のリストをチェックボックスとして表示し、選択された都道府県の状態を管理するコンポーネント
 * @param {Object[]} prefectures - 全ての都道府県のリスト
 * @param {Object[]} selectedPrefectures - 現在選択されている都道府県のリスト
 * @param {Function} onChange - 都道府県の選択状態が変わったときに呼ばれるコールバック関数
 */
const PrefectureCheckboxes = ({ prefectures, selectedPrefectures, onChange }) => {
    /**
     * 引数の都道府県が「チェックしたのか」「チェックを外したのか」を判断し、選択されたリスト(selectedPrefectures)を更新する関数
     * @param {Object} pref - チェックボックスが変更された都道府県。
     */
    const handleCheckboxChange = (pref) => {
        const isExistencePref = selectedPrefectures.findIndex((item) => item.prefCode === pref.prefCode);
        if (isExistencePref === -1) { // チェックによって都道府県をリストに追加する場合
            onChange([...selectedPrefectures, pref]);
        } else { // チェック外しによって都道府県リストから削除する場合
            onChange(selectedPrefectures.filter((item) => item.prefCode !== pref.prefCode));
        }
    };

    return (
        <div>
            {prefectures.map((pref) => (
                <label key={pref.prefCode}>
                    <input
                        type="checkbox"
                        value={pref.prefCode}
                        checked={selectedPrefectures.some((item) => item.prefCode === pref.prefCode)}
                        onChange={() => handleCheckboxChange(pref)}
                    />
                    {pref.prefName}
                </label>
            ))}
        </div>
    );
};

export default PrefectureCheckboxes;
