// src/dev/DEV_CreateChart.js
import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { options } from "../lib/ChartGraphOptions";
import useColorMap from '../hooks/useColorMap';

export default function DEV_CreateChart({ populationData, selectedPrefectures }) {
    const colorMap = useColorMap(selectedPrefectures);

    const labels = useMemo(() => {
        return Object.keys(populationData).length > 0
            ? populationData[Object.keys(populationData)[0]].data[0].data.map((item) => item.year)
            : [];
    }, [populationData]);

    const datasets = useMemo(() => {
        return selectedPrefectures.map((pref) => {
            const prefData = populationData[pref.prefCode]?.data[0]?.data || [];
            const data = prefData.map(item => item.value);
            const color = colorMap[pref.prefCode];

            return {
                label: pref.prefName,
                backgroundColor: color,
                borderColor: color,
                borderWidth: 1,
                hoverBackgroundColor: color,
                hoverBorderColor: color,
                data: data,
            };
        });
    }, [selectedPrefectures, populationData, colorMap]);

    const data = useMemo(() => {
        return {
            labels: labels,
            datasets: datasets,
        };
    }, [labels, datasets]);

    return (
        <div>
            <h2>人口増加 情報</h2>
            <Line data={data} options={options} />
        </div>
    );
}
