import React from 'react';
import CreateChart from "./CreateChart";

/**
 * ChartGraphSectionコンポーネント
 * 指定された人口データと選択された都道府県の情報をもとに、チャートを表示するセクションを提供します。
 * @param {Object} props - コンポーネントのプロパティ
 * @param {Object} props.populationData - 人口データのオブジェクト。各都道府県コードに対応する人口データが含まれる
 * @param {Array} props.selectedPrefectures - 選択された都道府県のリスト。各都道府県は { prefCode: string, prefName: string } の形式。
 * @returns {JSX.Element} - チャートを含むセクションのJSX要素
 */
export default function ChartGraphSection({ populationData, selectedPrefectures }) {
    return (
        <section>
            <CreateChart populationData={populationData} selectedPrefectures={selectedPrefectures} />
        </section>
    );
}
