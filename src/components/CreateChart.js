import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { options } from "../lib/ChartGraphOptions";
import useColorMap from '../hooks/useColorMap';
import { Container, Row, Col } from 'react-bootstrap';

/**
 * 選択された都道府県の人口データを基に、折れ線グラフを表示する
 * @param {Object} props - コンポーネントのプロパティ
 * @param {Object} props.populationData - 都道府県ごとの人口データ
 * @param {Array} props.selectedPrefectures - 選択された都道府県のリスト。各都道府県は { prefCode: string, prefName: string } の形式
 *
 * @returns {JSX.Element} - 折れ線グラフを含むJSX要素
 */
export default function CreateChart({ populationData, selectedPrefectures }) {
    const colorMap = useColorMap(selectedPrefectures);

    const labels = useMemo(() => { // ラベル（年）の生成
        return Object.keys(populationData).length > 0
            ? populationData[Object.keys(populationData)[0]].data[0].data.map((item) => item.year)
            : [];
    }, [populationData]);

    // データセットの生成
    const datasets = useMemo(() => {
        return selectedPrefectures.map((pref) => {
            const prefData = populationData[pref.prefCode]?.data[0]?.data || [];
            const data = prefData.map(item => item.value);
            const color = colorMap[pref.prefCode];

            return {
                label: pref.prefName,
                backgroundColor: color,
                borderColor: color,
                borderWidth: 1.5,
                hoverBackgroundColor: color,
                hoverBorderColor: color,
                data: data,
            };
        });
    }, [selectedPrefectures, populationData, colorMap]);

    // グラフデータの生成
    const data = useMemo(() => {
        return {
            labels: labels,
            datasets: datasets,
        };
    }, [labels, datasets]);

    return (
        <Container className="mt-4">
            <Row>
                <Col>
                    <h2 className="text-center">都道府県別 総人口推移</h2>
                    <Line data={data} options={options} />
                </Col>
            </Row>
        </Container>
    );

}
