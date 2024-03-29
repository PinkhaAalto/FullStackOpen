import { useState } from 'react'


const RandomAnecdote = (anecdotes) => {
  const random = Math.floor((Math.random()*anecdotes.length))
  return anecdotes[random]
}

const incrementPoints = (points, index) => {
  const copy = [...points]
  copy[index]++;
  return copy;
}


const Next = (props) => (
  <button onClick={() => props.set(RandomAnecdote(props.anecdotes))}>
    Next anecdote
  </button>
)

const Vote = (props) => {
  return (
    <button onClick={() => props.set(incrementPoints(props.points, props.index))} >
      Vote
    </button>
  )
}

const CurrentVotes = (props) => {
  return (
    <p>
      has {props.votes} votes.
    </p>
  )
}

const Anecdote = (props) => (
  <p>
    {props.anecdote}
  </p> 
)

const Header = (props) => (
  <h1>
    {props.header}
  </h1>
)

const TopAnecdote = (props) => {
  const votes = Math.max(...props.votes)
  const top = props.anecdotes[props.votes.indexOf(votes)]

  return (
    <div>
      <Anecdote anecdote={top}/>
      <CurrentVotes votes={votes}/>
    </div>
    )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(RandomAnecdote(anecdotes))
  const [votes, setPoints] = useState(new Array(anecdotes.length).fill(0))

  return (
    <div>
      <Header header={"Anecdote of the day"}/>
      <Anecdote anecdote={selected}/>
      <CurrentVotes votes={votes[anecdotes.indexOf(selected)]}/>
      <Vote set={setPoints} points={votes} index={anecdotes.indexOf(selected)}/>
      <Next set={setSelected} anecdotes={anecdotes}/>
      <Header header={"Anecdote with the most votes"}/>
      <TopAnecdote anecdotes={anecdotes} votes={votes}/>
    </div>
  )


}

export default App  