import React, { useState, useEffect } from 'react';
import { FiSearch } from "react-icons/fi"

function App() {

  const[id, setId] = useState('')
  const[comPercentile, setComPercentile] = useState('')
  const[codingPercentile, setCodingPercentile] = useState('')
  const[overallPercentile, setOverallPercentile] = useState('')

  console.log(id)

  const handleClick = () => {
    fetch(`/${id}`)
      .then(response => {
        // testing
        // console.log(typeof response)
        return response.json()
      })
      .then(data =>  {
        setComPercentile(data[0])
        setCodingPercentile(data[1])
        setOverallPercentile(data[2])
      
        /// inital try - set additional state instead of updating the innerHTML tags
        // document.getElementById("com_percentile").innerHTML = data[0]
        // document.getElementById("coding_percentile").innerHTML = data[1]
        
        // testing
        // console.log(data[0])
        // console.log(data[1])
        // console.log(data)
  })}
    
    return (
    <div className='page_container'>
      <header>Welcome to the Benchmark Website, where you can check your percentile against programmers with the same title and from similar companies</header>
      <br/>
          <div>Please enter your Candidate ID:   
            <input 
              type ="text"
              // name ="candidate_id" 
              placeholder="your candidate ID..."
              onChange={e => setId(e.target.value)}
              value={id}
              />
              <input type = "submit" value = "submit" onClick={handleClick}/>
          </div>

        <br/>
        <div>
          Communication Score Percentile: 
          <div id='com_percentile'>{comPercentile}</div>
        </div>
        <div>
          Coding Score Percentile: 
          <div id='coding_percentile'>{codingPercentile}</div>
        </div>
        <div>
          Overall Score Percentile: 
          <div id='coding_percentile'>{overallPercentile}</div>
        </div>
    </div>
  )
}

export default App



// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// import HomePage from './components/home_page/home_page'
// import Percentiles from './components/percentiles/Percentiles'

// const App = () => (

//   <div className='full-page'>
//     <Router>
//       <Routes>
//         <Route exact path='/' element={<HomePage/>} />
//         <Route exact path='/percentiles' element={<Percentiles/>} />
//       </Routes>
//     </Router>
//   </div>
// )

// export default App;









