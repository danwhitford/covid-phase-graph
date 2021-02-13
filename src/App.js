import { useState } from 'react';
import Select from 'react-select'
import PhaseChart from './components/PhaseChart'

const axesOptions = [
  {
    value: 'newAdmissions',
    label: 'New admissions'
  },
  {
    value: 'covidOccupiedMVBeds',
    label: 'COVID-19 occupied beds with mechanical ventilators'
  },
  {
    value: 'newCasesByPublishDate',
    label: 'New cases by publication date'
  },
  {
    value: 'newCasesBySpecimenDate',
    label: 'New cases by specimen date'
  },
  {
    value: 'newDeaths28DaysByPublishDate',
    label: 'New deaths within 28 days of a positive test'
  },
  {
    value: 'newDeaths28DaysByDeathDate',
    label: 'New deaths within 28 days of a positive test by death date (very spiky)'
  }
]

function App() {
  const [axesDims, setAxesDims] = useState({ x: axesOptions[0], y: axesOptions[1] })

  return (
    <div className="App">
      <PhaseChart
        axesDims={axesDims}
      />

      <p>Colours represent time with earlier entries being lighter and later entries darker</p>
      <div style={{
        height: '30px',
        width: '300px',
        backgroundImage: 'linear-gradient(to right, #fafa6e, #2A4858)',
      }}></div>

      <label>
        X axis dimension
      <Select
        value={axesOptions.x}
        options={axesOptions}
        onChange={e => {
          setAxesDims({
            ...axesDims,
            x: e,
          })
        }}
      />
      </label>

      <label>
        Y axis dimension
      <Select
        value={axesOptions.y}
        options={axesOptions}
        onChange={e => {
          setAxesDims({
            ...axesDims,
            y: e,
          })
        }}
      />
      </label>
    </div>
  );
}

export default App;
