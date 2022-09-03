import React, { useState } from 'react';
import { FiSearch } from "react-icons/fi";
import ProgressBar from 'react-customizable-progressbar'

function App() {

  const [id, setId] = useState('');
  const [comPercentile, setComPercentile] = useState(0);
  const [codingPercentile, setCodingPercentile] = useState(0);
  const [overallPercentile, setOverallPercentile] = useState(0);

  // console.log(id);

  const handleClick = () => {
    fetch(`/${id}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
          setComPercentile(data['com_percentile']);
          setCodingPercentile(data['coding_percentil']);
          setOverallPercentile(data['overall_percentile']);
          setId('');

        /// first try with data as array. Optimized with key pair data structure instead of index which is easier to read and reduce possible error/bugs
        // setComPercentile(data[0]);
        // setCodingPercentile(data[1]);
        // setOverallPercentile(data[2]);
        // setId('');

        /// no need after adding the chart
        // document.getElementById("com_percentile").style.display = 'block';
        // document.getElementById("coding_percentile").style.display = 'block';
        // document.getElementById("overall_percentile").style.display = 'block';

        /// inital try - set additional state instead of updating the innerHTML tags
        // document.getElementById("com_percentile").innerHTML = data[0]
        // document.getElementById("coding_percentile").innerHTML = data[1]

      })
      .catch(console.error);
  };



  return (
    <div className='page-container'>
      <div className='header'>
        Welcome to the Benchmark, where you can check your percentile against programmers with the same title and from similar companies
      </div>
      <br />

      <div className='body-container'>
        <div className='search-container'>
          <input className='input'
            type="text"
            // name ="candidate_id" 
            placeholder="Please enter your candidate ID..."
            onChange={e => setId(e.target.value)}
            value={id}
            onKeyDown={e => e.key === 'Enter' && handleClick()}
          />
          <FiSearch onClick={handleClick} className="searchbar-icon" />
        </div>
        <br />
        <div id='error'>No candidate ID found, please try again...</div>
        <br />

        
        <div className='percentiles-container'>

          <div className='percentiles-row'>
            <div id='com_percentile'>Communication Percentile</div>
            <div className='percentile-result'>

            <ProgressBar
            radius={100}
            progress={parseInt(comPercentile)}
            initialAnimation
            initialAnimationDelay={500}
            strokeWidth={18}
            strokeColor="#5d9cec"
            trackStrokeWidth={18}
            pointerRadius={8}
            pointerStrokeWidth={10}
            pointerStrokeColor="#5c75cd"
          >
            <div className="indicator">
                <div>{comPercentile}</div>
            </div>
            </ProgressBar>  
            </div>
          </div>
      
          <div className='percentiles-row'>
            <div id='coding_percentile'>Coding Percentile</div>
            <div className='percentile-result'>
              
            <ProgressBar
            radius={100}
            progress={parseInt(codingPercentile)}
            initialAnimation
            initialAnimationDelay={500}
            strokeWidth={18}
            strokeColor="#5d9cec"
            trackStrokeWidth={18}
            pointerRadius={8}
            pointerStrokeWidth={10}
            pointerStrokeColor="#5c75cd"
          >
            <div className="indicator">
                <div>{codingPercentile}</div>
            </div>
            </ProgressBar> 
              
              </div>
          </div>
          <div className='percentiles-row'>
            <div id='overall_percentile'>Overall Percentile</div>
            <div className='percentile-result'>
              
            <ProgressBar
            radius={100}
            progress={parseInt(overallPercentile)}
            initialAnimation
            initialAnimationDelay={500}
            strokeWidth={18}
            strokeColor="#5d9cec"
            trackStrokeWidth={18}
            pointerRadius={8}
            pointerStrokeWidth={10}
            pointerStrokeColor="#5c75cd"
          >
            <div className="indicator">
                <div>{overallPercentile}</div>
            </div>
            </ProgressBar> 
              
            </div>
          </div>

          
        </div>

      </div>
    </div>
  );
}

export default App;










