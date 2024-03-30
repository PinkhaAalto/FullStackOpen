
const Header = (prop) => (
    <h1>{prop.course.name}</h1>
  );
  
  const Part = (part) => (
    <p>
      {part.name} {part.exercises}
    </p>
  );
  
  const Content = (prop) => {
    const course = prop.course
    return (
      <div>
        {course.parts.map((part) => {
          return (<Part key={part.id} name={part.name} exercises={part.exercises}/>)
        })} 
      </div>
    )
  
  
  }
  const Total = (prop) => {
    const total = prop.course.parts.reduce((a, b) => ({exercises: a.exercises + b.exercises}));
    return (
    <p>
      <b>Total of {total.exercises} excercies</b>
    </p>
    )
  };
  
  const Course = (props) => {
    
    return (
      <div>
        <Header course={props.course}/>
        <Content course={props.course}/>
        <Total course={props.course}/>
        </div>
    )
  }

export default Course