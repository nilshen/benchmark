import React, { useState, useEffect } from 'react';
import { FiSearch } from "react-icons/fi"
import {Link} from 'react-router-dom';

function App() {

  const[id, setId] = useState('')
  console.log(id)

  const handleClick = () => {
    fetch(`http://localhost:5000/${id}`)
      .then(response => response.json()
      .then(data => ({ data, response })))
      .then(({ data, response }) =>  {
        console.log(data)
  })}
  
  // useEffect(() => {
  //   console.log('render')
  // }, [])
  return (
    <div>
      <header>Welcome to the Benchmark Website, where you can check your percentile scores</header>
        {/* <form> */}
        {/* <form action = {`http://127.0.0.1:5000/${id}`}> */}
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

        {/* </form> */}

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









