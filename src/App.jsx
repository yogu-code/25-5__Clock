import { useState , useEffect ,useRef } from 'react'
import './App.css'
function App() {
  const [Min , setMin] = useState(25)
  const [Break , setBreak] = useState(5)
  const [Sec , setSec] = useState(60)
  const [pause , setpause] = useState(false)
  const [clear , setClear] = useState(false)
  const [start , setStart] = useState(false)
  const [breaktime , setbreaktime] = useState(false)
  let countdownID = useRef()


  const handleIncrementMin = ()=>{
    setMin(Min+1)
  }
  const handleDecrementMin = ()=>{
    if(Min>0){
      setMin(Min-1)
    }
  }
  const handleIncrementbreak = ()=>{
    setBreak(Break+1)
  }
  const handleDecrementbreak = ()=>{
    if(Break>0){
      setBreak(Break-1)
    }
  }


  useEffect(()=>{
    if(start===true){
      countdownID.current = setInterval(() => {
        setSec(prev=>prev-1)
      }, 1000);
      return ()=>clearInterval(countdownID.current)
    }
  },[start])


  useEffect(()=>{
    if(Sec<=0 && breaktime===false){
      setSec(60)
      setMin(prev=>prev-1)
    }
    if(Min<=0 && Sec<=0 && breaktime===false){
      setMin(0)
      setbreaktime(true)
      alert("Time for a well-earned 5-minute break—relax and recharge!")
    }
    if(Sec<=0 && breaktime===true){
      setBreak(prev=>prev-1)
    }
    if(Break<=0 && Sec<=0){
      setClear(true)
      clearInterval(countdownID.current)
      setStart(false)
      alert("Starting a fresh session—stay focused")
    }
  },[Sec])

  useEffect(()=>{
    if(pause===true){
      alert("Session paused—take a moment and resume when ready!")
      setpause(false)
    }
  },[pause])

  useEffect(()=>{
    if(clear===true){
      setMin(25)
      setSec(60)
      setBreak(5)
      clearInterval(countdownID.current)
      setClear(false)
      setStart(false)
      setbreaktime(false)
    }
  },[clear])
  
  
  const handlePause = ()=>{
    setpause(true)
  }
  const handlClear = ()=>{
    setClear(true)
  }
  const handleStart = ()=>{
    setStart(true)
  }

  return(
    <>
    <div className='time-set-box'>
      <div className='session-time-box'>
        <div>session time</div>
        <button className='increment-btn' onClick={handleDecrementMin}>-</button>{Min}<button className='decrement-btn' onClick={handleIncrementMin}>+</button>
      </div>
      <div className='break-time-box'>
        <div>Break time</div>
        <button className='increment-btn' onClick={handleDecrementbreak}>-</button>{Break}<button className='decrement-btn'onClick={handleIncrementbreak}>+</button>
      </div>
    </div>
    <div className='time-display'>
      <div className='Min-time'>{!breaktime?Min:Break}</div> : <div className='Sec-time'>{Sec<10?"0"+Sec:Sec}</div>
    </div>
    <div className='controll-btns'>
      <button className='start-btn' onClick={handleStart}>start</button>
      <button className='pause-btn' onClick={handlePause}>pause</button>
      <button className='clear-btn' onClick={handlClear}>Reset</button>
    </div>
    </>
  )
}

export default App
