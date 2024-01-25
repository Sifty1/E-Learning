import React from 'react';
import boy from "../assets/boy.mp4";
import "../styles/Home.css";

function Home() {
  return (
    <div className='main'>
      <video src={boy} autoPlay loop muted/>
      <div className="content">
        <h1>Learn and Play</h1>
       <p>To Gain Knowledge</p>
      </div>
      
    </div>
  )
}

export default Home
