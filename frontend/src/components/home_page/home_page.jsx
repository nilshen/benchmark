// import React, { useState, useEffect } from 'react';

// const HomePage = (props) => {
//     const[id, setId] = useState('')
//     console.log(id)
  
//     // const handleClick = () => {
//     //   fetch('/id')
//     //     .then(response => response.json()
//     //     .then(data => ({ data, response })))
//     //     .then(({ data, response }) =>  {
//     //       console.log(data)
//     // })}
    
//     // useEffect(() => {
//     //   console.log('render')
//     // }, [])
//     return (
//       <div>
//         <header>Welcome to the Benchmark Website, where you can check your percentile scores</header>
//           <form action = {"/percentiles"} method = "GET">
//             <div>Please enter your Candidate ID:   
//               <input 
//                 type ="text"
//                 name ="candidate_id" 
//                 placeholder="your candidate ID..."
//                 onChange={e => setId(e.target.value)}
//                 value={id}
//                 />
//                 <input type = "submit" value = "submit" />
//             </div>
  
//           </form>
//       </div>
//     )
// }

// export default HomePage;