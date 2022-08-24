import { useState } from 'react'

const Button = (props) => <button onClick={props.handleClick}>{props.text}</button>

const Feedback = (props) => {
  return (
    <>
      <Button text="good" handleClick={props.addGood} />
      <Button text="neutral" handleClick={props.addNeutral} />
      <Button text="bad" handleClick={props.addBad} />
    </>
  )
}

const StatisticLine = ({ text, value , unit}) => {
  return (
    <tr>
      <td>{text}</td> 
      <td>{value}</td>
      <td>{unit}</td>
    </tr>
  )
}


const Statistics = ({good, neutral, bad}) => {
  let sum = good + neutral + bad
  let average = (good * 1 + bad * (-1)) / sum

  if (sum > 0) {
    return (
      <table>
        <tbody>
          <StatisticLine text="good" value ={good} />
          <StatisticLine text="neutral" value ={neutral} />
          <StatisticLine text="bad" value ={bad} />
          <StatisticLine text="all" value ={sum} />
          <StatisticLine text="average" value ={average} />
          <StatisticLine text="positive" value ={good / sum * 100} unit='%'/>
        </tbody>
      </table>
    )
  }
  return <p>No feedback given</p>
  
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () => setGood(good + 1)
  const addNeutral = () => setNeutral(neutral + 1)
  const addBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Feedback addGood={addGood} addNeutral={addNeutral} addBad={addBad} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App