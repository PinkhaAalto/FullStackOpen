import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  
  const Header = (props) => (
    <h1>{props.title}</h1>
    
  )

  const Button = (props) => (
    <button onClick={() => props.function(props.value + 1)}>
      {props.name}
    </button>
  )

  const StatisticsLine = (props) => {
    if (props.unit){
      return (
        <tr>
          <td style={{ marginBottom: '5px' }}>
          {props.title} {props.total} %
          </td>
        </tr>
      )
    }else {
      return (
        <tr>
        <td style={{ marginBottom: '5px' }}>
          {props.title} {props.total}
        </td>
        </tr>
      )      
    }
  }

  const Statistics = () => {
    const all = good+neutral+bad
    const average = (good + (neutral*0) + (bad*(-1)))/all
    const posAvg = good / all || 0 

    if (all==0){
      return (
        <div>
          <Header title={"Statistics"}/>
          <p>No feedback given</p>
        </div>
      )
    }

    return (
      <div>
        <Header title={"Statistics"}/>
      <table>
        <tbody>
          <StatisticsLine title={"good"} total={good}/>
          <StatisticsLine title={"neutral"} total={neutral}/>
          <StatisticsLine title={"bad"} total={bad}/>
          <StatisticsLine title={"all"} total={all}/>
          <StatisticsLine title={"average"} total={average}/>
          <StatisticsLine title={"positive"} total={posAvg*100} unit={"%"}/> 
        </tbody>
      </table>
      </div>
    )
  }

  return (
    <div>
      <Header title={"Give Feedback"}/>
      <Button function={setGood} value={good} name={"good"}/> 
      <Button function={setNeutral} value={neutral} name={"neutral"}/> 
      <Button function={setBad} value={bad} name={"bad"}/>
      <Statistics/>
    </div>
  )
}

export default App