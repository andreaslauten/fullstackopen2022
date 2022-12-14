import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const startArray = new Uint8Array(anecdotes.length); 
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(startArray)

  const getRndInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min) ) + min
  }

  const nextAnecdote = () => setSelected(getRndInteger(0, 6))
  
  const addVote = () => {
    const newVotes = [...votes]
    newVotes[selected] +=1
    setVotes(newVotes)
  }
    
  const getBestAnecdote = () => {
      let bestAnecdote = 0
      for (let i = 0; i < votes.length; i++) {
        const vote = votes[i];
        if (vote > votes[bestAnecdote]) {
          bestAnecdote = i
        }
      }
      return bestAnecdote
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>has {votes[selected]} votes</div>
      <button onClick={addVote}>vote</button>
      <button onClick={nextAnecdote}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <div>{anecdotes[getBestAnecdote()]}</div>
      <div>has {votes[getBestAnecdote()]} votes</div>
    </div>
  )
}

export default App