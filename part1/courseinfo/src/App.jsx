const App = () => {
  
  const course = {
  name: 'Half Stack application development',
  parts: [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
}

  const Header = (prop) => (
    <h1>{prop.course.name}</h1>
  );

  const Part = (part) => (
    <p>
      {part.name} {part.exercises}
    </p>
  );

  const Content = (prop) => {
    const parts = prop.course.parts
    return (
      <div>
        <Part name={parts[0].name} exercises={parts[0].exercises}/>
        <Part name={parts[1].name} exercises={parts[1].exercises}/>
        <Part name={parts[2].name} exercises={parts[2].exercises}/> 
      </div>
    )


  }
  const Total = (prop) => {
    const parts = prop.course.parts
    return (
    <p>
      Number of excercies {parts[0].exercises+parts[1].exercises+parts[2].exercises}
    </p>
    )
  };

  return (
    <div>
      <Header course={course}/>
      <Content course={course}/>
      <Total course={course}/>
      </div>
  )
}

export default App