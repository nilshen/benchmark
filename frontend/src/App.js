import React, { useState, useEffect } from 'react';
import { FiSearch } from "react-icons/fi"
import {Link} from 'react-router-dom';

function App() {

  const[id, setId] = useState('')
  console.log(id)

  const handleClick = () => {
    fetch(`/${id}`, {
    })
      .then(response => response.json()
      .then(data => ({ data, response })))
      .then(({ data, response }) =>  {
        document.getElementById("com_percentile").innerHTML = data[0]
        document.getElementById("coding_percentile").innerHTML = data[1]
        
        console.log(data[0])
        console.log(data[1])
  })}
    
    return (
    <div>
      <header>Welcome to the Benchmark Website, where you can check your percentile scores</header>
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
          <div id='com_percentile'></div>
        </div>
        <div>
          Coding Score Percentile: 
          <div id='coding_percentile'></div>
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









