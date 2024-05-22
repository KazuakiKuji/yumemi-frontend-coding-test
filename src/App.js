import React, { useState } from 'react';
import PrefectureCheckboxes from "./components/PrefectureCheckboxes";
import CreateChart from "./components/CreateChart";
import usePopulationData from './hooks/usePopulationData';
import RegisterLocation from './components/RegisterLocation';

function App() {
  const [selectedPrefectures, setSelectedPrefectures] = useState([]);

  const populationData = usePopulationData(selectedPrefectures);

  const handleCheckboxChange = (pref) => {
    const isExistencePref = selectedPrefectures.findIndex((item) => item.prefCode === pref.prefCode);
    if (isExistencePref === -1) { // チェックされたとき（新規で都道府県が追加されたとき）
      setSelectedPrefectures([...selectedPrefectures, pref]);
    } else {
      setSelectedPrefectures(selectedPrefectures.filter((item) => item.prefCode !== pref.prefCode));
    }
  }

  return (
    <div className="body">
      <header></header>
      <main>
        <RegisterLocation  />
        {/* <PrefectureCheckboxes onChange={handleCheckboxChange} selectedPrefectures={selectedPrefectures} />
        <CreateChart populationData={populationData} selectedPrefectures={selectedPrefectures} /> */}
      </main>
      <footer></footer>
    </div>
  )
}

export default App;
