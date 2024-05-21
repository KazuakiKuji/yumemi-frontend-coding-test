import React from 'react';
import CreateChart from "./CreateChart";

export default function ChartGraphSection({ populationData, selectedPrefectures }) {
    return (
        <section>
            <CreateChart populationData={populationData} selectedPrefectures={selectedPrefectures} />
        </section>
    );
}
