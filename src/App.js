import { useState } from 'react';
import Select from 'react-select'
import PhaseChart from './components/PhaseChart'
import './App.css'

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

      <div className='SelectContainer'>
        <label>
          X axis dimension
      <Select
            value={axesDims.x}
            options={axesOptions}
            onChange={e => {
              setAxesDims({
                ...axesDims,
                x: e,
              })
            }}
          />
        </label>
      </div>

      <div className='SelectContainer'>
        <label>
          Y axis dimension
      <Select
            value={axesDims.y}
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

      <p>Colours represent time with earlier entries being lighter and later entries darker</p>
      <div style={{
        height: '30px',
        width: '300px',
        backgroundImage: 'linear-gradient(to right, #fee8c8, #e34a33)',
      }}></div>
      <p>Data is taken from the <a href='https://coronavirus.data.gov.uk/'>Gov.Uk COVID dashboard</a>, via <a href='https://coronavirus.data.gov.uk/details/developers-guide'>the API</a></p>
    </div>
  );
}

export default App;
